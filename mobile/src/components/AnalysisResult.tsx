import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { MacroGrid } from '../features/scan/MacroGrid';
import { OilEstimate } from '../features/scan/OilEstimate';
import { MealItemList } from '../features/scan/MealItemList';
import { Flame, Heart, Scale } from 'lucide-react-native';
import type { AnalysisResponse } from '../types';

interface AnalysisResultProps {
  data: AnalysisResponse;
}

export const AnalysisResult = ({ data }: AnalysisResultProps) => {
  return (
    <View style={[styles.container, { backgroundColor: '#fff' }]}>
      <View style={styles.badgeRow}>
          <View style={[styles.badge, { backgroundColor: '#10b981' }]}>
              <Heart size={14} color="#fff" fill="#fff" />
              <Text style={styles.badgeText}>SA77A</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#f59e0b' }]}>
              <Scale size={14} color="#fff" />
              <Text style={styles.badgeText}>TAN9IS</Text>
          </View>
      </View>

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

      <MealItemList items={data.meal_analysis} />
    </View>
  );
};

// Redesigned Calorie Gauge
export const CalorieCircle = ({ calories }: { calories: number }) => {
    const size = 160;
    const strokeWidth = 14;
    const center = size / 2;
    const radius = (size - strokeWidth) / 2;
    
    const startAngle = -210;
    const endAngle = 30;
    const maxCalories = 2000;
    const percentage = Math.min(calories / maxCalories, 1);
    const currentAngle = startAngle + (percentage * (endAngle - startAngle));

    const polarToCartesian = (centerX: number, centerY: number, r: number, angleInDegrees: number) => {
        const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
        return {
            x: centerX + r * Math.cos(angleInRadians),
            y: centerY + r * Math.sin(angleInRadians),
        };
    };

    const describeArc = (x: number, y: number, r: number, startA: number, endA: number) => {
        const start = polarToCartesian(x, y, r, endA);
        const end = polarToCartesian(x, y, r, startA);
        const largeArcFlag = endA - startA <= 180 ? "0" : "1";
        return [
            "M", start.x, start.y,
            "A", r, r, 0, largeArcFlag, 0, end.x, end.y
        ].join(" ");
    };

    const backgroundPath = describeArc(center, center, radius, startAngle, endAngle);
    const progressPath = describeArc(center, center, radius, startAngle, currentAngle);

    return (
        <View style={styles.gaugeWrapper}>
            <Svg width={size} height={size}>
                <Defs>
                    <LinearGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="0">
                        <Stop offset="0%" stopColor="#f97316" />
                        <Stop offset="100%" stopColor="#ef4444" />
                    </LinearGradient>
                </Defs>
                <Path
                    d={backgroundPath}
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                />
                <Path
                    d={progressPath}
                    stroke="url(#gaugeGradient)"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                />
            </Svg>
            
            <View style={styles.gaugeInnerContent}>
                <Flame size={24} color="#f97316" fill="#f97316" />
                <Text style={styles.gaugeValue}>{calories.toFixed(0)}</Text>
                <Text style={styles.gaugeUnit}>kcal</Text>
                <Text style={styles.gaugeTotalLabel}>Total Calories</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 30,
    marginTop: -40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  badgeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  gaugeWrapper: {
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeInnerContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 35,
  },
  gaugeValue: {
    fontSize: 42,
    fontWeight: '900',
    color: '#fff',
    marginTop: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  gaugeUnit: {
    fontSize: 16,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.8)',
    marginTop: -4,
  },
  gaugeTotalLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
  },
});
