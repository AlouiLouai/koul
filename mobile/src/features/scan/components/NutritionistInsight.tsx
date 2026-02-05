import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Scale, Dumbbell, Heart } from 'lucide-react-native';



export const NutritionistInsight = () => {

  return (
    <View style={styles.wrapper}>
        <View style={styles.badgeRow}>
            <View style={[styles.goalBadge, { backgroundColor: '#fff7ed', borderColor: '#fdba74' }]}>
                <Scale size={12} color="#f97316" />
                <Text style={[styles.goalText, { color: '#f97316' }]}>TAN9IS</Text>
            </View>
            <View style={[styles.goalBadge, { backgroundColor: '#fefce8', borderColor: '#fde047' }]}>
                <Dumbbell size={12} color="#ca8a04" />
                <Text style={[styles.goalText, { color: '#ca8a04' }]}>MUSCLE</Text>
            </View>
            <View style={[styles.goalBadge, { backgroundColor: '#f0fdf4', borderColor: '#86efac' }]}>
                <Heart size={12} color="#16a34a" />
                <Text style={[styles.goalText, { color: '#16a34a' }]}>SA77A</Text>
            </View>
        </View>

        
    </View>
  );
};

const styles = StyleSheet.create({
    wrapper: { marginBottom: 24 },
    badgeRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
    goalBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, borderWidth: 1 },
    goalText: { fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
    container: { padding: 20, borderLeftWidth: 4, borderLeftColor: '#8b5cf6' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
    headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    title: { fontSize: 10, fontWeight: '900', color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: 1 },
    score: { fontSize: 14, fontWeight: '900' },
    advice: { fontSize: 13, fontWeight: '700', fontStyle: 'italic', lineHeight: 18 }
});