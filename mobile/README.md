# KOUL Mobile App 📱

The client-side mobile application for **KOUL**, built with React Native and
Expo. It allows users to snap photos of their food and receive instant
nutritional feedback tailored to the Tunisian diet.

## 🛠 Tech Stack

- **Framework:** React Native (Expo Managed Workflow)
- **Language:** TypeScript
- **Icons:** Lucide React Native
- **Navigation:** Custom state-based navigation for simplicity.

## 🚀 Getting Started

### Prerequisites

- Node.js
- [Expo Go](https://expo.dev/client) app installed on your physical device
  (Android/iOS) OR an Android Emulator/iOS Simulator.

### Installation

```bash
cd mobile
npm install
```

### Running the App

Start the Expo development server:

```bash
npm start
```

From here, you can:

- **Scan the QR code** with your phone (using the Expo Go app).
- **Press `a`** to open in the Android Emulator.
- **Press `i`** to open in the iOS Simulator (macOS only).

## 📱 Architecture & Key Features

### Navigation

The app uses a lightweight, custom state-based navigation system located in
`App.tsx` to switch between views:

- **Home:** Image capture and upload interface.
- **Stats:** Visualization of daily/weekly nutritional intake.
- **Profile:** User settings and goal management.

### API Integration

The app communicates with the backend via `src/hooks/useImageAnalysis.ts`.

> **Configuration:** API endpoints are defined in `src/apiConfig.ts`. This file
> handles the difference between `localhost` (for iOS simulator) and `10.0.2.2`
> (for Android emulator) automatically.

### Screens

- **`HomeView.tsx`**: Main entry point for capturing food photos.
- **`AnalysisResult.tsx`**: Displays the AI-generated nutritional breakdown.
- **`StatsView.tsx`**: Charts and summaries of user progress.

## 📦 Building for Production

To create a production build (APK/IPA) using EAS Build:

```bash
npm install -g eas-cli
eas build --profile production --platform android
# or
eas build --profile production --platform ios
```
