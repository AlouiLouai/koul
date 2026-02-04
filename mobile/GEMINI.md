# Mobile Project Context for AI Assistants

## Overview
"KOUL" is a React Native (Expo) mobile application for food tracking and calorie counting, specifically tailored for the Tunisian market. It leverages AI to provide instant nutritional analysis from food images, with a heavy focus on local Tunisian cuisine and culture.

## Tech Stack
- **Framework:** React Native with Expo (Managed Workflow).
- **Navigation:** Expo Router (File-based routing in `app/`).
- **Language:** TypeScript (Strict mode).
- **State Management:** 
  - **Global/App State:** `zustand` with `react-native-mmkv` for persistence (see `src/store/`).
  - **Server State:** `@tanstack/react-query` (React Query) for API mutations and caching.
- **Styling:** `StyleSheet.create` using standard React Native styles. 
- **Theming:** Custom `ThemeContext` (see `src/theme/`) providing `colors`, `spacing`, and `mode` (dark/light).
- **UI Components:** 
  - `expo-blur` for "Glassmorphism" effects (`GlassView`).
  - `lucide-react-native` for icons.
  - `expo-image-picker` & `expo-image-manipulator` for media handling.

## Core Architecture
### Directory Structure
- `app/`: Expo Router screens and layouts.
- `src/features/`: Feature-based logic (e.g., `home`, `stats`, `profile`, `auth`).
  - `index.tsx`: Feature container (logic, hooks).
  - `xxxUI.tsx`: Pure UI component for the feature.
  - `components/`: Sub-components specific to this feature.
- `src/components/`: Reusable, atomic UI elements (GlassView, AppLogo, etc.).
- `src/hooks/`: Shared business logic and API integration hooks.
- `src/store/`: Zustand stores for global persistence.
- `src/theme/`: Theme configuration and context.

### Key Patterns
1. **Container/UI Separation:** Large screens in `src/features/` are split into a logic container (`index.tsx`) and a presentation component (`xxxUI.tsx`).
2. **Persistence:** Use `useStatsStore` for user data that must survive app restarts.
3. **API Logic:** Encapsulated in hooks using React Query `useMutation` or `useQuery`.
4. **Localization:** UI text is primarily in **Tunisian Arabic (Derja)** or French, reflecting the local culture.

## Development Guidelines for AI
- **Strict Typing:** Always define interfaces for component props and API responses in `src/types.ts`.
- **Styling:** Do NOT use Tailwind classes (they are not configured). Use `StyleSheet` and pull colors from `useTheme()`.
- **Visual Style:** Maintain the "Modern/Glassmorphic" aesthetic. Use `GlassView` for cards and overlays.
- **Tunisian Context:** When generating UI text or examples, prioritize Tunisian food names (e.g., "Kousksi", "Brik", "Slata Mechouia") and local dialect.
- **Component Creation:** Prefer functional components with explicit prop types. Use `lucide-react-native` for all iconography.

## API Integration
- **Base URL:** Configured in `src/apiConfig.ts`.
- **Analyze Image:** `POST /api/analyze` (multipart/form-data).
- **Mocking:** For new features, favor React Query's `initialData` or local state before finalizing API integration.