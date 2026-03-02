import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { RarityScoreCard } from '../features/scan/RarityScoreCard';
import { MacroGrid } from '../features/scan/MacroGrid';
import { OilEstimate } from '../features/scan/OilEstimate';
import { NutritionistInsight } from '../features/scan/NutritionistInsight';
import { MealItemList } from '../features/scan/MealItemList';
import { useTheme } from '../theme/ThemeContext';
import type { AnalysisResponse } from '../types';

interface AnalysisResultProps {
  data: AnalysisResponse;
}

export const AnalysisResult = ({ data }: AnalysisResultProps) => {
  const { colors } = useTheme();
  
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
      {/* Restore Rarity Score Card & Verdict */}
      <RarityScoreCard
        score={data.health_score ?? 0}
        calories={data.totals.calories}
        verdict={verdictText}
      />

      {/* Macro Grid with Circular Bars */}
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

      {/* Moukawinet Sa7n - Keep as is */}
      <MealItemList items={data.meal_analysis} />
    </View>
  );
};

// Exported for use in ScanHeader overlay
export const CalorieCircle = ({ calories }: { calories: number }) => {
    const { colors } = useTheme();
    const size = 90;
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const maxCalories = 2000;
    const percentage = Math.min(calories / maxCalories, 1);
    const strokeDashoffset = circumference - (percentage * circumference);

    return (
        <View style={styles.calorieCircleContainer}>
            <Svg width={size} height={size}>
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth={strokeWidth}
                    fill="rgba(0,0,0,0.4)"
                />
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#fbbf24" // Amber
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
            </Svg>
            <View style={styles.calorieTextWrapper}>
                <Text style={styles.calorieValue}>{calories.toFixed(0)}</Text>
                <Text style={styles.calorieUnit}>KCAL</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 8,
  },
  calorieCircleContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calorieTextWrapper: {
    position: 'absolute',
    alignItems: 'center',
  },
  calorieValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
  },
  calorieUnit: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 10,
    fontWeight: '800',
  }
});
