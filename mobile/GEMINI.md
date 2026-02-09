# KOUL Mobile - Project Specification & Developer Guide

This document serves as the primary technical specification and context for AI
assistants and developers working on the KOUL mobile application.

## 🌟 Project Vision

**KOUL** ("Eat" in Tunisian) is a high-end, AI-powered food tracking app
specifically engineered for the Tunisian market. It combines cutting-edge AI
analysis with a "Premium Glassmorphic" aesthetic to make calorie counting
intuitive and culturally relevant.

## 🛠 Tech Stack

- **Framework:** React Native + Expo (Managed Workflow, SDK 54).
- **Navigation:** Expo Router (File-based, `app/` directory).
- **Language:** TypeScript (Strict mode).
- **State Management:**
  - **Client State:** `zustand` + `react-native-mmkv` (v2.11.0 for stability).
  - **Server State:** `@tanstack/react-query` (v5).
- **UI/Styling:** `StyleSheet.create` (Standard RN) + `expo-blur`
  (Glassmorphism).
- **Icons:** `lucide-react-native`.

## 🏗 Architecture & Patterns

### 1. File-Based Routing (`app/`)

- Uses **Expo Router**.
- `app/_layout.tsx`: Root provider setup (Theme, UIContext, React Query) and
  Global UI (Header, Background).
- `app/(tabs)/`: Primary navigation hub.
- **Anti-Pattern Warning:** Do NOT nest standard Navigators inside Views in the
  root layout to avoid Fabric crashes; use `<Slot />`.

### 2. Feature-Based Structure (`src/features/`)

Each feature MUST follow the **Container/Presenter** pattern:

- `index.tsx`: The "Container". Handles logic, state, hooks, and API calls.
- `[Feature]UI.tsx`: The "Presenter". A pure UI component that receives data and
  callbacks via props.
- `components/`: Feature-specific sub-components.

### 3. State & Persistence (`src/store/`)

- **Persistence:** All global state (calories, water, Pro status) is stored in
  `useStatsStore.ts` using MMKV.
- **Daily Reset:** Logic is centralized in `app/_layout.tsx` to reset stats when
  the `lastResetDate` differs from today.

### 4. Design System (`src/theme/`)

- **ThemeContext:** Provides `mode` ('light' | 'dark') and `colors`.
- **Glassmorphism:** Use the `GlassView` component
  (`src/components/GlassView.tsx`) for all cards and interactive elements.
- **Color Palette (Source of Truth: `colors.ts`):**
  - **Primary:** `#2563eb` (Light) / `#38bdf8` (Dark).
  - **Accent:** `#e11d48` (Tunisian Red).
  - **Background:** Multi-stop gradients (Liquid Background).

## 🎨 UI/UX Guidelines for AI

- **Language:** Use **Tunisian Arabic (Derja)** for primary CTA and labels
  (e.g., "Connecti", "Abda l-Audit", "Mche"). Use French as a secondary
  fallback.
- **Visuals:** Maintain a "Premium" feel. Use `expo-linear-gradient` for
  backgrounds and `expo-blur` for overlays.
- **Layout:** Use `SafeAreaView` correctly (managed in `_layout.tsx`).
- **Feedback:** Use `useModals()` and `presentModal()` for modals (e.g. `logSuccess`, `quotaExceeded`, `guestQuota`). Modals live in `src/modals/` and are registered in `ModalsProvider`.

## 📋 Data Models (`src/types.ts`)

Always reference `AnalysisResponse` when handling AI results:

```typescript
interface AnalysisResponse {
  meal_analysis: MealItem[]; // Array of detected food items
  totals: Totals; // Aggregated macros
  oil_estimate?: OilEstimate; // Crucial for Tunisian cuisine (Olive Oil)
  health_score?: number; // 0-100 score
  verdict?: string; // Short AI advice in Derja/French
}
```

## 🚀 Developer Workflow

- **Type Checking:** Run `npm run typecheck` before pushing.
- **Adding Features:**
  1. Define types in `src/types.ts`.
  2. Create feature folder in `src/features/`.
  3. Implement Logic in `index.tsx`.
  4. Implement UI in `[Feature]UI.tsx`.
- **API Interaction:** Use `useImageAnalysis.ts` hook for food scanning.

## 🤖 Gemini CLI Best Practices

When asking Gemini to implement features:

1. **Contextualize:** "Follow the Container/UI pattern in `src/features/`."
2. **Style:** "Use `useTheme()` for colors and `GlassView` for the card
   container."
3. **Locale:** "Ensure all strings are in Tunisian Derja."
4. **Validation:** "Run `npm run typecheck` after the modification."

---

_Last Updated: February 2026_
