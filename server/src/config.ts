import dotenv from 'dotenv';

dotenv.config();

export const CONFIG = {
  PORT: process.env.PORT || 3002,
  AZURE: {
    ENDPOINT: process.env.AZURE_INFERENCE_ENDPOINT, 
    KEY: process.env.AZURE_INFERENCE_API_KEY, 
    DEPLOYMENT: "gpt-4o-mini",
  },
  IMAGE: {
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
        // AGGRESSIVE OPTIMIZATION FOR SPEED
        // 384px is sufficient for food recognition and significantly faster
        TARGET_SIZE: 384,
        QUALITY: 50 // Lower quality for speed
  }
};

if (!CONFIG.AZURE.KEY || !CONFIG.AZURE.ENDPOINT) {
  console.error("⚠️ Missing Azure AI Inference API Key or Endpoint in .env");
}