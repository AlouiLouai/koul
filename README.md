# KOUL - AI Food Tracker 🇹🇳

**KOUL** is an intelligent food tracking application designed specifically for the Tunisian market. It leverages AI to analyze photos of food, identifying dishes with a deep understanding of Tunisian cuisine (e.g., Couscous, Kafteji, Lablabi) and providing detailed nutritional breakdowns.

## 📂 Project Structure

This repository is organized as a monorepo containing both the mobile client and the backend server:

| Directory | Description | Stack |
|-----------|-------------|-------|
| [`/mobile`](./mobile) | The user-facing mobile application. | **React Native (Expo)**, TypeScript, Tailwind CSS |
| [`/server`](./server) | The backend API handling image analysis. | **Node.js**, Express, Azure OpenAI (GPT-4o-mini) |

## 🚀 Quick Start

To get the full stack running locally, you will need two terminal instances.

### 1. Start the Server
Navigate to the server directory and start the development server:

```bash
cd server
npm install
# Ensure you have your .env file set up (see server/README.md)
npm run dev
```

### 2. Start the Mobile App
In a new terminal, navigate to the mobile directory and launch Expo:

```bash
cd mobile
npm install
npm start
```

## 🛠 Features

- **Snap & Analyze:** Take a photo of your meal, and the AI identifies ingredients and portion sizes.
- **Tunisian Context:** Specialized prompts ensure accurate recognition of local dishes and olive-oil-based cooking.
- **Nutritional Stats:** Tracks calories, proteins, carbs, and fats.
- **Dietary History:** Keep a log of your daily consumption.

## 📄 Documentation

For detailed setup instructions, environment variables, and architecture details, please refer to the specific READMEs in each directory:

- [**Mobile Documentation**](./mobile/README.md)
- [**Server Documentation**](./server/README.md)
