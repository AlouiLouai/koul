# Server Project Context for AI Assistants

## Overview
This is the backend for the "KOUL" food tracking application. It provides an API to analyze food images using AI (GPT-4o-mini) and return structured nutritional data with a Tunisian cuisine context.

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **AI Provider:** Azure OpenAI Service (Model: `gpt-4o-mini`) via `@azure-rest/ai-inference`.
- **Image Processing:** `sharp` (for optimization), `multer` (for uploads).

## Architecture
- `src/index.ts`: Entry point, middleware setup, routes.
- `src/controllers/`: Request handling logic.
- `src/services/`: Business logic (AI interaction, Image processing).
- `src/config.ts`: Configuration and Environment variables.

## Core Logic
### Image Analysis (`/api/analyze`)
1. **Upload:** Image received via `multer` (memory storage).
2. **Optimization:** Image resized/compressed using `sharp` (Target: 384px, Quality: 50) to reduce latency and token usage.
3. **AI Request:** 
   - Prompt: `src/services/prompts.ts` (Enforces Tunisian context, YAML output).
   - Model: GPT-4o-mini.
   - Input: User notes + Optimized Image Base64.
4. **Parsing:** YAML response is parsed into JSON, calculating totals (calories, macros).

## AI Prompt Context
The AI is instructed to:
- Act as an "API Data Extractor".
- Assume **Tunisian context** (Tunisian dishes, olive oil default).
- Output strict **YAML**.
- Estimate portions based on local serving sizes.

## Environment Variables
Required in `.env`:
- `AZURE_INFERENCE_ENDPOINT`
- `AZURE_INFERENCE_API_KEY`
- `PORT` (Optional, default 3002)

## API Response Schema
```json
{
  "meal_analysis": [
    {
      "item": "String",
      "portion_estimate": "String",
      "calories": Number,
      "protein_g": Number,
      "carbs_g": Number,
      "fat_g": Number
    }
  ],
  "totals": {
    "calories": Number,
    "protein": Number,
    "carbs": Number,
    "fat": Number
  },
  "reasoning_log": "String",
  "confidence_score": Number,
  "health_score": Number,
  "verdict": "String"
}
```
