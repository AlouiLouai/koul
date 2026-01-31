import yaml from 'js-yaml';
import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { createSseStream } from "@azure/core-sse";
import { CONFIG } from '../config';
import { ANALYSIS_PROMPT } from './prompts';

// Initialize the client
// @azure-rest/ai-inference exports a factory function, so we might not need 'new'
// However, sticking to the user's request, if 'new' fails in TS, we cast or adjust.
// Trying without 'new' first as is standard for azure-rest.
const client = ModelClient(
  CONFIG.AZURE.ENDPOINT!,
  new AzureKeyCredential(CONFIG.AZURE.KEY!)
);

export const analyzeImage = async (userNotes: string, imageDataUrl: string): Promise<any> => {
  try {
    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          {
            role: "system",
            content: ANALYSIS_PROMPT
          },
          {
            role: "user",
            content: [
              { type: "text", text: `Analyze this image for nutrition items. Notes: ${userNotes}` },
              {
                type: "image_url",
                image_url: {
                  url: imageDataUrl,
                  detail: "low"
                }
              }
            ]
          },
        ],
        max_tokens: 400, // Reduced from 1000 for speed
        temperature: 0.1,
        model: CONFIG.AZURE.DEPLOYMENT,
        // stream: true // Streaming removed for lower latency in request/response model
      }
    });

    if (response.status !== "200") {
      throw new Error(`AI API Error: ${response.status} - ${JSON.stringify(response.body)}`);
    }

    // @ts-ignore
    const content = response.body.choices[0].message.content || "";

    // Robust Extraction: Find YAML block or fallback to full text
    const yamlMatch = content.match(/```(?:yaml)?([\s\S]*?)```/);
    let yamlString = yamlMatch ? yamlMatch[1].trim() : content.trim();
    
    // Extra safety: Remove any remaining markdown code block artifacts
    yamlString = yamlString.replace(/```(?:yaml)?/g, '').replace(/```/g, '').trim();

    const result: any = yaml.load(yamlString);

    // Deduplicate and Map
    const itemMap = new Map();

    (result.items || []).forEach((i: any) => {
      const name = i.name?.trim();
      if (!name) return;

      if (!itemMap.has(name)) {
        itemMap.set(name, {
          item: name,
          portion_estimate: i.portion || "1 serving",
          mass_g: i.mass_g || 0,
          calories: i.cals || 0,
          protein_g: i.p || 0,
          carbs_g: i.c || 0,
          fat_g: i.f || 0,
          fiber_g: 0,
        });
      }
    });

    const meal_analysis = Array.from(itemMap.values());

    // Calculate Totals
    const totals = meal_analysis.reduce((acc: any, curr: any) => ({
      calories: acc.calories + curr.calories,
      protein: acc.protein + curr.protein_g,
      carbs: acc.carbs + curr.carbs_g,
      fat: acc.fat + curr.fat_g,
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

    return {
      meal_analysis,
      totals,
      reasoning_log: result.analysis || `Identified ${meal_analysis.length} unique items.`,
      confidence_score: 0.95,
      // New fields
      oil_estimate: result.oil_estimate,
      health_score: result.health_score,
      goals: result.goals,
      verdict: result.verdict
    };

  } catch (error: any) {
    console.error("Analysis Failure:", error);
    throw new Error(`Failed to analyze image: ${error.message}`);       
  }
};
