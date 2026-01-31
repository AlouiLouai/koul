export interface MealItem {
  item: string;
  portion_estimate: string;
  mass_g: number;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g: number;
}

export interface Totals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface OilEstimate {
  type: string;
  amount_tbsp: number;
  calories: number;
}

export interface Goals {
  weight_loss: string;
  muscle_gain: string;
  diabetes_friendly: string;
}

export interface AnalysisResponse {
  meal_analysis: MealItem[];
  totals: Totals;
  reasoning_log: string;
  confidence_score: number;
  oil_estimate?: OilEstimate;
  health_score?: number;
  goals?: Goals;
  verdict?: string;
}