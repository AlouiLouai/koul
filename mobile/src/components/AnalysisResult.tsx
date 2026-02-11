import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RarityScoreCard } from '../features/scan/RarityScoreCard';
import { MacroGrid } from '../features/scan/MacroGrid';
import { OilEstimate } from '../features/scan/OilEstimate';
import { NutritionistInsight } from '../features/scan/NutritionistInsight';
import { MealItemList } from '../features/scan/MealItemList';
import type { AnalysisResponse } from '../types';

interface AnalysisResultProps {
  data: AnalysisResponse;
}

export const AnalysisResult = ({ data }: AnalysisResultProps) => {
  const getDerjaVerdict = (d: AnalysisResponse['totals'], s: number) => {
    if (s >= 9) return "W7ach protein! 💪 Hédhi mekla thez biha l'coupe 🏆";
    if (s >= 7) return "Sa7a! Mekla ndhifa, w mouch mcharwtra b'zit.";
    if (d.fat > 30) return "Rod belek mel zit! T9oul mekel 'Brik' 3la sbe7 🛢️";
    if (d.calories > 1000) return "Ouh! Hédhi 'Bomb' calorique... Barcha 3jin (Mlewi/Chapati?) 🥖";
    return "Mouch khayeb, ama rod belek 3la sa7tek. Na9es khobz!";
  };

  const verdictText = getDerjaVerdict(data.totals, data.health_score ?? 0);

  return (
    <View style={styles.container}>
      <RarityScoreCard
        score={data.health_score ?? 0}
        calories={data.totals.calories}
        verdict={verdictText}
      />

      <MacroGrid
        protein={data.totals.protein}
        carbs={data.totals.carbs}
        fat={data.totals.fat}
      />

      {data.oil_estimate && (
        <OilEstimate
          amount={data.oil_estimate.amount_tbsp}
          calories={data.oil_estimate.calories}
        />
      )}

      <NutritionistInsight />

      <MealItemList items={data.meal_analysis} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 16,
  },
});