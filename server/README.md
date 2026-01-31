# KOUL Backend Server 🧠

The backend for the **KOUL** application, responsible for processing food images and generating nutritional data using AI. It is optimized to recognize Tunisian cuisine and cooking methods.

## 🏗 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **AI Engine:** GPT-4o-mini (via Azure OpenAI)
- **Image Processing:** `sharp` (compression/resizing), `multer` (file uploads)

## ⚙️ Configuration

Create a `.env` file in the `server` directory with the following variables:

```env
# Server Port (default: 3002)
PORT=3002

# Azure OpenAI Configuration
AZURE_INFERENCE_ENDPOINT=https://<your-resource-name>.openai.azure.com/openai/deployments/<deployment-name>/chat/completions?api-version=...
AZURE_INFERENCE_API_KEY=<your-api-key>
```

> **Note:** The prompt logic in `src/services/prompts.ts` is specifically tuned to output data in YAML format for reliability and enforces a "Tunisian Context" (e.g., defaulting to olive oil, recognizing local serving sizes).

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
cd server
npm install
```

### Development
Runs the server with `nodemon` for hot-reloading:

```bash
npm run dev
```

### Production Build
Compiles TypeScript to JavaScript in `dist/`:

```bash
npm run build
npm start
```

## 🔌 API Endpoints

### `POST /api/analyze`

Accepts a food image and returns nutritional analysis.

- **Content-Type:** `multipart/form-data`
- **Body:**
    - `image`: The image file (JPEG/PNG).
- **Response:** JSON object containing meal items, portion estimates, and total macros.

**Response Example:**
```json
{
  "meal_analysis": [
    {
      "item": "Kafteji",
      "portion_estimate": "1 plate (350g)",
      "calories": 520,
      "protein_g": 12,
      "carbs_g": 45,
      "fat_g": 32
    }
  ],
  "totals": {
    "calories": 520,
    "protein": 12,
    "carbs": 45,
    "fat": 32
  },
  "verdict": "Moderate calorie meal, high in healthy fats (olive oil)."
}
```

## 📂 Project Structure

- `src/controllers/`: Route handlers.
- `src/services/`: Core business logic (AI integration, image optimization).
- `src/prompts.ts`: System prompts for the AI model.
