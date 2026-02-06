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

const COMPOSITE_PATTERN = /\b(on|with|and|plus)\b|&|\/|\+/i;

const parseYamlContent = (content: string) => {
  const yamlMatch = content.match(/```(?:yaml)?([\s\S]*?)```/);
  let yamlString = yamlMatch ? yamlMatch[1].trim() : content.trim();
  yamlString = yamlString.replace(/```(?:yaml)?/g, '').replace(/```/g, '').trim();
  return yaml.load(yamlString) as any;
};

const hasCompositeItems = (items: any[] = []) =>
  items.some((i) => {
    const name = String(i?.name ?? '').trim();
    return name && COMPOSITE_PATTERN.test(name);
  });

const mapMealAnalysis = (result: any) => {
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
        fiber_g: i.fi || 0,
      });
    }
  });

  return Array.from(itemMap.values());
};

const buildResponse = (result: any) => {
  const meal_analysis = mapMealAnalysis(result);

  const totals = meal_analysis.reduce(
    (acc: any, curr: any) => ({
      calories: acc.calories + curr.calories,
      protein: acc.protein + curr.protein_g,
      carbs: acc.carbs + curr.carbs_g,
      fat: acc.fat + curr.fat_g,
      fiber: (acc.fiber || 0) + curr.fiber_g,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  );

    return {
      meal_analysis,
      totals,
      reasoning_log: result.analysis || `Identified ${meal_analysis.length} unique items.`,
      confidence_score: result.confidence || 0.9,
      // New fields
      oil_estimate: result.oil_estimate,
      health_score: result.health_score,
      goals: result.goals,
      verdict: result.verdict
    };
};

const callModel = async (userNotes: string, imageDataUrl: string, extraText?: string) => {
  const messageText = [
    `Analyze this image for nutrition items.`,
    userNotes ? `Notes: ${userNotes}` : null,
    extraText ? `Correction: ${extraText}` : null,
  ]
    .filter(Boolean)
    .join(' ');

  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        {
          role: "system",
          content: ANALYSIS_PROMPT,
        },
        {
          role: "user",
          content: [
            { type: "text", text: messageText },
            {
              type: "image_url",
              image_url: {
                url: imageDataUrl,
                detail: "low",
              },
            },
          ],
        },
      ],
      max_tokens: 450,
      temperature: 0.1,
      model: CONFIG.AZURE.DEPLOYMENT,
    },
  });

  if (response.status !== "200") {
    throw new Error(`AI API Error: ${response.status} - ${JSON.stringify(response.body)}`);
  }

  // @ts-ignore
  return response.body.choices[0].message.content || "";
};

export const analyzeImage = async (userNotes: string, imageDataUrl: string): Promise<any> => {
  try {
    const content = await callModel(userNotes, imageDataUrl);
    let result = parseYamlContent(content);

    if (hasCompositeItems(result.items)) {
      const compositeNames = (result.items || [])
        .map((i: any) => String(i?.name ?? '').trim())
        .filter((name: string) => name && COMPOSITE_PATTERN.test(name))
        .join(", ");

      const retryContent = await callModel(
        userNotes,
        imageDataUrl,
        `You returned composite items (${compositeNames}). Split them into single ingredients with separate nutrition. Include hidden oils/sauces as items.`
      );
      result = parseYamlContent(retryContent);
    }

    return buildResponse(result);
  } catch (error: any) {
    console.error("Analysis Failure:", error);
    throw new Error(`Failed to analyze image: ${error.message}`);       
  }
};
