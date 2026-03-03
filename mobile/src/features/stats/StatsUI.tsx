import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Flame, Dumbbell, Wheat, Droplets, Target, Lightbulb, TrendingUp, Calendar, Trophy, BarChart3, PieChart } from 'lucide-react-native';
import { GlassView } from '@/components/GlassView';
import { useTheme } from '@/theme/ThemeContext';
import { CalorieCircle } from '@/components/AnalysisResult';
import { MacroGrid } from '../scan/MacroGrid';

const { width } = Dimensions.get('window');

const DAYS_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const StatsUI = ({ todayStats }: any) => {
    const { colors, mode } = useTheme();
    const [selectedDay, setSelectedDay] = useState(6); // Default to Sunday (Today)
    const [viewMode, setViewMode] = useState<'Day' | 'Week' | 'Month'>('Day');

    // AI Advice Logic
    const getAIAdvice = () => {
        if (todayStats.protein < 50) return "Mizelt na9es Protein barcha l'youm! Zid ka3ba escalope wala 7out bech badnik yitbna kima t7eb. 💪";
        if (todayStats.calories > 2000) return "Rod belek, fot el budget mta3ik l'youm! 🥖 Na9es el 3jin w el khobz fel 3ché.";
        return "Jawwek mrigel 100% tounsi! Kamel haka w matansech techrob el maa. 🌟";
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
            {/* 1. ARTISTIC ROUND DAY SELECTOR */}
            <View style={styles.topSjelContainer}>
                <View style={styles.sjelHeader}>
                    <View>
                        <Text style={[styles.sjelTitle, { color: colors.text }]}>Sjel el-Wajbet</Text>
                        <Text style={[styles.sjelMonth, { color: colors.textSecondary }]}>MARS 2026</Text>
                    </View>
                    <View style={styles.viewToggle}>
                        {['Day', 'Week', 'Month'].map((m) => (
                            <TouchableOpacity key={m} onPress={() => setViewMode(m as any)}>
                                <View style={[
                                    styles.toggleBtn, 
                                    viewMode === m && { backgroundColor: colors.primary }
                                ]}>
                                    <Text style={[styles.toggleText, { color: viewMode === m ? '#fff' : colors.textSecondary }]}>{m}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sjelScroll}>
                    {DAYS_NAMES.map((day, index) => {
                        const isSelected = selectedDay === index;
                        const dayNum = 20 + index;
                        return (
                            <TouchableOpacity key={day} onPress={() => setSelectedDay(index)} activeOpacity={0.8}>
                                <GlassView 
                                    style={[
                                        styles.roundDayItem, 
                                        isSelected && { backgroundColor: colors.primary, borderColor: colors.primary }
                                    ]} 
                                    intensity={isSelected ? 100 : 30} 
                                    borderRadius={40}
                                >
                                    <Text style={[styles.dayNameInside, { color: isSelected ? 'rgba(255,255,255,0.8)' : colors.textSecondary }]}>{day}</Text>
                                    <Text style={[styles.dayNumberInside, { color: isSelected ? '#fff' : colors.text }]}>{dayNum}</Text>
                                </GlassView>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            {/* 2. GLOBAL METRICS CARD */}
            <GlassView style={styles.mainMetricsCard} intensity={40} borderRadius={36}>
                <View style={styles.cardHeader}>
                    <View style={styles.cardTitleGroup}>
                        <ActivityIndicatorIcon color={colors.primary} />
                        <Text style={[styles.cardTitle, { color: colors.text }]}>Formit el-{viewMode}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: colors.success + '20' }]}>
                        <Text style={[styles.statusText, { color: colors.success }]}>MRIGEL</Text>
                    </View>
                </View>

                <View style={styles.gaugeSection}>
                    <CalorieCircle calories={viewMode === 'Day' ? todayStats.calories : todayStats.calories * 6.2} />
                </View>

                <View style={styles.macroSection}>
                    <MacroGrid 
                        protein={viewMode === 'Day' ? todayStats.protein : todayStats.protein * 5.8} 
                        carbs={viewMode === 'Day' ? todayStats.carbs : todayStats.carbs * 6.1} 
                        fat={viewMode === 'Day' ? todayStats.fat : todayStats.fat * 5.5} 
                    />
                </View>
            </GlassView>

            {/* 3. PROGRESS TRENDS (Weekly/Monthly) */}
            <View style={styles.trendsRow}>
                <GlassView style={styles.trendCard} intensity={30} borderRadius={28}>
                    <View style={styles.trendHeader}>
                        <BarChart3 size={18} color={colors.primary} />
                        <Text style={[styles.trendTitle, { color: colors.text }]}>Nese9 el-Ousbou3</Text>
                    </View>
                    <View style={styles.miniBarChart}>
                        {[40, 70, 55, 90, 65, 80, 100].map((h, i) => (
                            <View key={i} style={[styles.bar, { height: h, backgroundColor: i === 6 ? colors.primary : colors.primary + '30' }]} />
                        ))}
                    </View>
                </GlassView>

                <GlassView style={styles.miniStatsCard} intensity={30} borderRadius={28}>
                    <PieChart size={18} color={colors.accent} />
                    <Text style={[styles.miniStatsValue, { color: colors.text }]}>+14%</Text>
                    <Text style={[styles.miniStatsLabel, { color: colors.textSecondary }]}>Protein Up</Text>
                </GlassView>
            </View>

            {/* 4. SMART USER GOAL */}
            <View style={styles.goalRow}>
                <GlassView style={styles.goalCard} intensity={30} borderRadius={24}>
                    <View style={styles.goalHeader}>
                        <Target size={18} color={colors.primary} />
                        <Text style={[styles.goalTitle, { color: colors.text }]}>Hadaf el-Koul</Text>
                    </View>
                    <View style={styles.goalBody}>
                        <View style={styles.goalTypeRow}>
                           <Text style={[styles.goalType, { color: colors.primary }]}>BULK MODE (Bni)</Text>
                           <Trophy size={16} color={colors.warning} />
                        </View>
                        <Text style={[styles.goalDesc, { color: colors.textSecondary }]}>
                            Tala3 el-Mizén 1kg/mhar. Focus 3la protein w healthy carbs.
                        </Text>
                    </View>
                    <View style={styles.progressSection}>
                        <View style={styles.miniProgressTrack}>
                             <View style={[styles.miniProgressFill, { width: '65%', backgroundColor: colors.primary }]} />
                        </View>
                        <View style={styles.progressInfo}>
                             <Text style={[styles.progressPercent, { color: colors.text }]}>65%</Text>
                             <Text style={[styles.progressLabel, { color: colors.textSecondary }]}>Advancement</Text>
                        </View>
                    </View>
                </GlassView>
            </View>

            {/* 5. AI ADVICE */}
            <GlassView style={styles.adviceCard} intensity={50} borderRadius={28}>
                <View style={[styles.adviceIcon, { backgroundColor: colors.primary + '15' }]}>
                    <Lightbulb size={26} color={colors.primary} />
                </View>
                <View style={styles.adviceContent}>
                    <Text style={[styles.adviceTitle, { color: colors.text }]}>Ray l'Expert AI 🧠</Text>
                    <Text style={[styles.adviceText, { color: colors.textSecondary }]}>
                        "{getAIAdvice()}"
                    </Text>
                </View>
            </GlassView>
        </ScrollView>
    );
};

const ActivityIndicatorIcon = ({ color }: { color: string }) => (
    <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: color + '20', alignItems: 'center', justifyContent: 'center' }}>
        <TrendingUp size={14} color={color} />
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollPadding: { paddingBottom: 120, paddingHorizontal: 16, paddingTop: 10 },
    
    // Top Sjel Section
    topSjelContainer: { marginBottom: 32 },
    sjelHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    sjelTitle: { fontSize: 22, fontWeight: '900', letterSpacing: -0.5 },
    sjelMonth: { fontSize: 11, fontWeight: '800', opacity: 0.5 },
    viewToggle: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 4 },
    toggleBtn: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
    toggleText: { fontSize: 10, fontWeight: '900' },
    sjelScroll: { gap: 14, paddingRight: 20 },
    roundDayItem: { width: 72, height: 72, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.1)' },
    dayNameInside: { fontSize: 10, fontWeight: '900', textTransform: 'uppercase', marginBottom: 2 },
    dayNumberInside: { fontSize: 22, fontWeight: '900' },

    // Metrics Card
    mainMetricsCard: { paddingVertical: 28, paddingHorizontal: 16, marginBottom: 20, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
    cardHeader: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
    cardTitleGroup: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    cardTitle: { fontSize: 18, fontWeight: '900' },
    statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14 },
    statusText: { fontSize: 10, fontWeight: '900' },
    gaugeSection: { marginBottom: 15, transform: [{ scale: 1.1 }] },
    macroSection: { width: '100%' },

    // Trends Section
    trendsRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
    trendCard: { flex: 1.8, padding: 16, height: 140, justifyContent: 'space-between' },
    trendHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    trendTitle: { fontSize: 12, fontWeight: '900' },
    miniBarChart: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 60 },
    bar: { width: 10, borderRadius: 5 },
    miniStatsCard: { flex: 1, padding: 16, height: 140, justifyContent: 'space-between', alignItems: 'flex-start' },
    miniStatsValue: { fontSize: 20, fontWeight: '900', marginTop: 8 },
    miniStatsLabel: { fontSize: 10, fontWeight: '800' },

    // Goal Section
    goalRow: { marginBottom: 20 },
    goalCard: { padding: 20, gap: 16 },
    goalHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    goalTitle: { fontSize: 12, fontWeight: '900', opacity: 0.6 },
    goalBody: { gap: 4 },
    goalTypeRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    goalType: { fontSize: 18, fontWeight: '900' },
    goalDesc: { fontSize: 12, fontWeight: '600', lineHeight: 18 },
    progressSection: { gap: 8 },
    miniProgressTrack: { height: 8, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden' },
    miniProgressFill: { height: '100%', borderRadius: 4 },
    progressInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    progressPercent: { fontSize: 14, fontWeight: '900' },
    progressLabel: { fontSize: 9, fontWeight: '800' },

    // AI Advice
    adviceCard: { flexDirection: 'row', padding: 20, gap: 16, alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
    adviceIcon: { width: 52, height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
    adviceContent: { flex: 1, gap: 4 },
    adviceTitle: { fontSize: 15, fontWeight: '900' },
    adviceText: { fontSize: 13, lineHeight: 18, fontWeight: '600', fontStyle: 'italic' },
});
