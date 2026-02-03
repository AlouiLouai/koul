# Mobile Project Context for AI Assistants

## Overview

"KOUL" is a React Native (Expo) mobile application for food tracking and calorie
counting, specifically tailored for the Tunisian market. It allows users to take
pictures of their food to get instant nutritional analysis using AI.

## Tech Stack

- **Framework:** React Native with Expo (Managed Workflow).
- **Language:** TypeScript.
- **Navigation:** Custom state-based navigation (conditionally rendering
  components in `App.tsx`).

## Core Architecture

### Directory Structure

- `src/components/`: UI Components (Views and reusable elements).
- `src/hooks/`: Business logic and API integration custom hooks.
- `src/apiConfig.ts`: API endpoint configuration (handles Android Emulator
  localhost vs Production).

### Key Components

- `App.tsx`: Main entry point. Handles "Navigation" state (`activeTab`,
  `isAuthenticated`).
- `HomeView.tsx`: Main screen for image capture/upload.
- `StatsView.tsx`: Displays nutritional statistics.
- `ProfileView.tsx` & `UpgradeScreen.tsx`: User management and monetization.

### Data Flow

1. **Image Capture:** User selects image in `HomeView`.
2. **Analysis:** `useImageAnalysis` hook sends image to backend.
3. **Result:** Backend returns nutritional data (calories, macros).
4. **Logging:** User confirms, data is passed to `useStats` to update daily
   totals.

## API Integration

- **Endpoint:** `POST /api/analyze`
- **Content-Type:** `multipart/form-data` (field: `image`)
- **Response Type:** `AnalysisResponse` (see `src/types.ts`)
- **Base URL:** Defined in `src/apiConfig.ts`.

## Development Guidelines

- **Icons:** Use `lucide-react-native`.
- **State:** Keep state simple (hooks/Context). Avoid Redux unless necessary.
- **Type Safety:** Strict TypeScript usage.
