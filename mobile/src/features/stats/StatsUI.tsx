import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { FlashList as ShopifyFlashList } from '@shopify/flash-list';
import { Circle, Svg } from 'react-native-svg';
import { Flame, Zap, Dumbbell, Watch, Lightbulb, ChevronRight, TrendingUp } from 'lucide-react-native';
import { GlassView } from '@/components/GlassView';
import { useTheme } from '@/theme/ThemeContext';
const FlashList = ShopifyFlashList as any;

const { width } = Dimensions.get('window');
const SCORE_SIZE = width * 0.65;
const STROKE_WIDTH = 16;
const RADIUS = (SCORE_SIZE - STROKE_WIDTH) / 2;
const ARC_ANGLE = 220;
const ARC_LENGTH = (2 * Math.PI * RADIUS) * (ARC_ANGLE / 360);

const Speedometer = ({ score }: { score: number }) => {
  const { colors, mode } = useTheme();
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: score / 10,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [score]);

  const getScoreColor = () => {
    if (score >= 9) return '#e11d48'; // Tunisian Red / Accent
    if (score >= 7) return colors.primary;
    if (score >= 5) return '#f59e0b';
    return colors.textSecondary;
  };

  const getScoreLabel = () => {
    if (score >= 9) return 'W7ACH 🦁';
    if (score >= 7) return 'FORMA 💪';
    if (score >= 5) return 'LABES 🌤️';
    return 'TE3EB 😴';
  };

  const scoreColor = getScoreColor();
  const rotation = (360 - ARC_ANGLE) / 2 + 180;
  const dashOffset = ARC_LENGTH * (1 - (score / 10));

  return (
    <View style={{ width: SCORE_SIZE, height: SCORE_SIZE - 40, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={SCORE_SIZE} height={SCORE_SIZE} viewBox={`0 0 ${SCORE_SIZE} ${SCORE_SIZE}`} style={{ position: 'absolute', top: 0 }}>
        <Circle
          cx={SCORE_SIZE / 2}
          cy={SCORE_SIZE / 2}
          r={RADIUS}
          stroke={mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={`${ARC_LENGTH} ${1000}`}
          strokeLinecap="round"
          fill="transparent"
          rotation={rotation}
          origin={`${SCORE_SIZE / 2}, ${SCORE_SIZE / 2}`}
        />
        <Circle
          cx={SCORE_SIZE / 2}
          cy={SCORE_SIZE / 2}
          r={RADIUS}
          stroke={scoreColor}
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={`${ARC_LENGTH} ${1000}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          fill="transparent"
          rotation={rotation}
          origin={`${SCORE_SIZE / 2}, ${SCORE_SIZE / 2}`}
        />
      </Svg>

      <View style={{ alignItems: 'center', gap: 2, marginTop: 20 }}>
        <Text style={[styles.scoreLabelText, { color: colors.textSecondary }]}>Readiness</Text>
        <Text style={[styles.scoreBig, { color: colors.text }]}>{score}</Text>
        <View style={[styles.scoreLabelBadge, { backgroundColor: scoreColor + '15', borderColor: scoreColor + '30', borderWidth: 1 }]}>
          <Text style={[styles.scoreRankText, { color: scoreColor }]}>
            {getScoreLabel()}
          </Text>
        </View>
      </View>
    </View>
  );
};
type TimeFrame = 'Week' | 'Month' | '3M' | '6M' | 'Year';
interface StatsUIProps {
  timeframe: TimeFrame;
  onTimeframeChange: (t: TimeFrame) => void;
  selectedDayIndex: number;
  weeklyData: number[];
  daysLabels: string[];
  historyItems: any[];
  todayStats: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export const StatsUI = ({
  timeframe,
  onTimeframeChange,
  historyItems,
  todayStats
}: StatsUIProps) => {
  const { colors, mode } = useTheme();
  const avgScore = Math.min(10, Math.round((todayStats.protein / 150) * 10 * 10) / 10) || 0.1;

  const renderHistoryItem = ({ item }: { item: any }) => (
    <GlassView style={[styles.historyRow, { backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.4)' }]} intensity={20} borderRadius={20}>
      <View style={styles.rowLeft}>
        <View style={[styles.iconBoxMini, { backgroundColor: item.score >= 7 ? colors.primary + '20' : '#f59e0b20' }]}>
          <TrendingUp size={14} color={item.score >= 7 ? colors.primary : '#f59e0b'} />
        </View>
        <View>
          <Text style={[styles.rowTitle, { color: colors.text }]}>{item.date === 'Today' ? 'Lyoum' : item.date}</Text>
          <Text style={[styles.rowSub, { color: colors.textSecondary }]}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.rowRight}>
        <View style={styles.historyStats}>
          <Text style={[styles.historyValue, { color: colors.text }]}>{item.p}g P</Text>
          <Text style={[styles.historyCals, { color: colors.textSecondary }]}>{item.cals || 0} kcal</Text>
        </View>
        <ChevronRight size={18} color={colors.textSecondary} />
      </View>
    </GlassView>
  );

  const listHeader = (
    <View style={styles.padding}>
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>El Forma <Text style={{ color: '#e11d48' }}>🏋️‍♂️</Text></Text>
          <GlassView style={styles.streakBadge} intensity={20} borderRadius={20}>
            <Flame size={14} color="#e11d48" fill="#e11d48" />
            <Text style={[styles.streakText, { color: colors.text }]}>5 Jours</Text>
          </GlassView>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
          {['Week', 'Month', '3M', '6M', 'Year'].map((t) => (
            <TouchableOpacity
              key={t}
              style={[
                styles.tabBtn,
                timeframe === t && { backgroundColor: mode === 'dark' ? '#fff' : '#000', borderColor: mode === 'dark' ? '#fff' : '#000' }
              ]}
              onPress={() => onTimeframeChange(t as TimeFrame)}
            >
              <Text style={[styles.tabText, { color: timeframe === t ? (mode === 'dark' ? '#000' : '#fff') : colors.textSecondary }]}>
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* --- SPEEDOMETER CARD --- */}
      <GlassView style={styles.heroCard} intensity={30} borderRadius={36}>
        <Speedometer score={avgScore} />
        <View style={styles.heroFooter}>
          <View style={styles.footerItem}>
            <Text style={[styles.footerLabel, { color: colors.textSecondary }]}>WEEKLY AVG</Text>
            <Text style={[styles.footerValue, { color: colors.text }]}>8.2</Text>
          </View>
          <View style={[styles.footerDivider, { backgroundColor: colors.glassBorder }]} />
          <View style={styles.footerItem}>
            <Text style={[styles.footerLabel, { color: colors.textSecondary }]}>PR STREAK</Text>
            <Text style={[styles.footerValue, { color: colors.text }]}>12d</Text>
          </View>
        </View>
      </GlassView>

      {/* --- BENTO GRID FOR STATS --- */}
      <View style={styles.bentoGrid}>
        {/* PROTEIN (Left) */}
        <GlassView style={styles.proteinCard} intensity={20} borderRadius={28}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconBox, { backgroundColor: colors.primary + '20' }]}>
              <Dumbbell size={18} color={colors.primary} />
            </View>
            <Text style={[styles.cardLabel, { color: colors.textSecondary }]}>BUILD</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={[styles.valueBig, { color: colors.text }]}>{Math.round(todayStats.protein)}<Text style={styles.unitSmall}>g</Text></Text>
            <Text style={[styles.targetLabel, { color: colors.textSecondary }]}>of 200g</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${Math.min(100, (todayStats.protein / 200) * 100)}%`, backgroundColor: colors.primary }]} />
          </View>
        </GlassView>

        {/* DUAL COLS (Right) */}
        <View style={styles.rightCol}>
          <GlassView style={styles.smallCard} intensity={20} borderRadius={24}>
            <Zap size={16} color="#f59e0b" fill="#f59e0b" />
            <View>
              <Text style={[styles.smallCardValue, { color: colors.text }]}>{Math.round(todayStats.calories)}</Text>
              <Text style={[styles.smallCardLabel, { color: colors.textSecondary }]}>KCAL</Text>
            </View>
          </GlassView>
          <GlassView style={styles.smallCard} intensity={20} borderRadius={24}>
            <Watch size={16} color={colors.primary} />
            <View>
              <Text style={[styles.smallCardValue, { color: colors.text }]}>Ready</Text>
              <Text style={[styles.smallCardLabel, { color: colors.textSecondary }]}>SYNC</Text>
            </View>
          </GlassView>
        </View>
      </View>

      {/* --- COACH INSIGHT --- */}
      <GlassView style={styles.insightCard} intensity={40} borderRadius={28}>
        <View style={[styles.insightIcon, { backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]}>
          <Lightbulb size={20} color={colors.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.insightTitle, { color: colors.text }]}>Klem Coach <Text style={{ color: colors.primary }}>AI</Text></Text>
          <Text style={[styles.insightText, { color: colors.textSecondary }]}>
            Rak na9ess chwaya Protein lyoum. Zid ka3ba escalope fel 3ché bch tkoun <Text style={{ fontWeight: 'bold', color: colors.text }}>W7ach</Text> ghodwa!
          </Text>
        </View>
      </GlassView>

      {/* --- HISTORY TITLE --- */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Sjel (History)</Text>
        <ChevronRight size={20} color={colors.textSecondary} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlashList
        data={historyItems}
        keyExtractor={(item: any, index: number) => String(item?.id ?? item?.date ?? index)}
        renderItem={renderHistoryItem}
        estimatedItemSize={90}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={listHeader}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  padding: { paddingHorizontal: 20 },
  listContent: { paddingBottom: 140, paddingTop: 10 },
  header: { marginBottom: 24 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 32, fontWeight: '900', letterSpacing: -1 },
  streakBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: 'rgba(150,150,150,0.1)' },
  streakText: { fontWeight: '800', fontSize: 13 },
  tabsScroll: { gap: 8 },
  tabBtn: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 24, borderWidth: 1, borderColor: 'rgba(150,150,150,0.2)' },
  tabText: { fontSize: 13, fontWeight: '800' },

  heroCard: { padding: 24, alignItems: 'center', marginBottom: 24 },
  heroFooter: { flexDirection: 'row', width: '100%', marginTop: 20, paddingTop: 20, borderTopWidth: 1, borderTopColor: 'rgba(150,150,150,0.1)' },
  footerItem: { flex: 1, alignItems: 'center' },
  footerLabel: { fontSize: 10, fontWeight: '900', letterSpacing: 1, marginBottom: 4 },
  footerValue: { fontSize: 18, fontWeight: '900' },
  footerDivider: { width: 1, height: '60%', alignSelf: 'center' },

  scoreBig: { fontSize: 64, fontWeight: '900', letterSpacing: -3, lineHeight: 68 },
  scoreLabelText: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.5 },
  scoreLabelBadge: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 14, marginTop: 4 },
  scoreRankText: { fontSize: 13, fontWeight: '900', textTransform: 'uppercase' },

  bentoGrid: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  proteinCard: { flex: 1.4, padding: 20, justifyContent: 'space-between' },
  rightCol: { flex: 1, gap: 12 },
  smallCard: { flex: 1, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 },
  smallCardValue: { fontSize: 18, fontWeight: '900' },
  smallCardLabel: { fontSize: 10, fontWeight: '900' },

  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  iconBox: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  cardLabel: { fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  valueContainer: { marginBottom: 12 },
  valueBig: { fontSize: 32, fontWeight: '900' },
  unitSmall: { fontSize: 14, fontWeight: '700', marginLeft: 2 },
  targetLabel: { fontSize: 12, fontWeight: '600' },
  progressTrack: { height: 8, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4 },

  insightCard: { flexDirection: 'row', padding: 20, gap: 16, alignItems: 'center', marginBottom: 32 },
  insightIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  insightTitle: { fontSize: 14, fontWeight: '900', marginBottom: 2 },
  insightText: { fontSize: 13, lineHeight: 18, fontWeight: '500' },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingHorizontal: 4 },
  sectionTitle: { fontSize: 22, fontWeight: '900' },
  separator: { height: 10 },

  historyRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 18, marginHorizontal: 2 },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBoxMini: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  rowTitle: { fontSize: 16, fontWeight: '800' },
  rowSub: { fontSize: 12, fontWeight: '500', opacity: 0.6 },
  rowRight: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  historyStats: { alignItems: 'flex-end' },
  historyValue: { fontSize: 15, fontWeight: '800' },
  historyCals: { fontSize: 11, fontWeight: '600' }
});
