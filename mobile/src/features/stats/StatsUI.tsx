import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { Circle, Svg, Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import { Flame, TrendingUp, Activity, ArrowUpRight, ChevronRight, Calendar, Info, Zap, Dumbbell, Share2, Watch, Lightbulb } from 'lucide-react-native';
import { GlassView } from '../../components/GlassView';
import { useTheme } from '../../theme/ThemeContext';
import type { TimeFrame } from './index';

const { width } = Dimensions.get('window');
const SCORE_SIZE = width * 0.65;
const STROKE_WIDTH = 20;
const RADIUS = (SCORE_SIZE - STROKE_WIDTH) / 2;
// 220 degrees arc for Speedometer look
const ARC_ANGLE = 220; 
const ARC_LENGTH = (2 * Math.PI * RADIUS) * (ARC_ANGLE / 360);

const Speedometer = ({ score }: { score: number }) => {
    const { colors } = useTheme();
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: score / 10,
            duration: 1500,
            useNativeDriver: true, 
        }).start();
    }, [score]);

    // Calculate color based on gym levels - Unified Blue Palette
    const getScoreColor = () => {
        if (score >= 9) return colors.primary; // Brand Blue (Beast Mode)
        if (score >= 7) return colors.primary + 'CC'; // Slightly lighter Blue (Forma)
        if (score >= 5) return colors.warning; // Yellow (Average)
        return colors.textSecondary; // Gray (Weak)
    };

    const getScoreLabel = () => {
        if (score >= 9) return 'W7ACH 🦁';
        if (score >= 7) return 'FORMA 💪';
        if (score >= 5) return 'CA VA 😐';
        return 'KABESS 📉';
    };
    
    const scoreColor = getScoreColor();
    const rotation = (360 - ARC_ANGLE) / 2 + 180; 
    const dashOffset = ARC_LENGTH * (1 - (score / 10));

    return (
        <View style={{ width: SCORE_SIZE, height: SCORE_SIZE, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
             {/* Speedometer Arc */}
             <Svg width={SCORE_SIZE} height={SCORE_SIZE} viewBox={`0 0 ${SCORE_SIZE} ${SCORE_SIZE}`} style={{ position: 'absolute' }}>
                 {/* Background Track */}
                 <Circle
                    cx={SCORE_SIZE / 2}
                    cy={SCORE_SIZE / 2}
                    r={RADIUS}
                    stroke={colors.glassBorder}
                    strokeWidth={STROKE_WIDTH}
                    strokeDasharray={`${ARC_LENGTH} ${1000}`}
                    strokeLinecap="round"
                    fill="transparent"
                    rotation={rotation}
                    origin={`${SCORE_SIZE / 2}, ${SCORE_SIZE / 2}`}
                 />
                 {/* Active Score Arc */}
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
             
             {/* Center Content - The "Cockpit" */}
             <View style={{ alignItems: 'center', gap: 4, marginTop: -20 }}>
                <Text style={[styles.scoreLabelText, { color: colors.textSecondary }]}>Jahziya (Readiness)</Text>
                <Text style={[styles.scoreBig, { color: colors.text }]}>{score}</Text>
                <View style={[styles.scoreLabelBadge, { backgroundColor: scoreColor + '20' }]}>
                    <Text style={[styles.scoreRankText, { color: scoreColor }]}>
                        {getScoreLabel()}
                    </Text>
                </View>
             </View>
        </View>
    );
};

interface StatsUIProps {
  timeframe: TimeFrame;
  onTimeframeChange: (t: TimeFrame) => void;
  selectedDayIndex: number;
  weeklyData: number[];
  daysLabels: string[];
  historyItems: any[];
}

export const StatsUI = ({
  timeframe,
  onTimeframeChange,
  historyItems
}: StatsUIProps) => {
  const { colors } = useTheme();
  const avgScore = 8.7;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
      
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>El Forma 🏋️‍♂️</Text>
            <View style={[styles.streakBadge, { backgroundColor: colors.primary + '20' }]}>
                <Flame size={16} color={colors.primary} fill={colors.primary} />
                <Text style={[styles.streakText, { color: colors.primary }]}>5 Jours</Text>
            </View>
        </View>

        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.tabsScroll}
        >
           {['Week', 'Month', '3M', '6M', 'Year'].map((t) => (
             <TouchableOpacity 
               key={t} 
               style={[styles.tabBtn, timeframe === t && { backgroundColor: colors.text, borderColor: colors.text }]}
               onPress={() => onTimeframeChange(t as TimeFrame)}
             >
               <Text style={[
                   styles.tabText, 
                   { color: timeframe === t ? colors.background[0] : colors.textSecondary }
               ]}>
                   {t}
               </Text>
             </TouchableOpacity>
           ))}
        </ScrollView>
      </View>

      {/* --- HERO DASHBOARD --- */}
      <View style={styles.heroSection}>
          <GlassView style={styles.heroCard} intensity={20} borderRadius={40}>
              {/* Share Button (Gamification) */}
              <TouchableOpacity style={[styles.shareBtn, { backgroundColor: colors.glassBorder }]}>
                  <Share2 size={20} color={colors.text} />
              </TouchableOpacity>

              <View style={styles.ringWrapper}>
                 <Speedometer score={avgScore} />
              </View>

              {/* Gym-Specific Summary - 2026 Trends */}
              <View style={styles.gymGrid}>
                  
                  {/* Protein Dominance (Full Width) */}
                  <View style={[styles.gymCard, styles.proteinCard, { backgroundColor: colors.primary + '10', borderColor: colors.primary + '30', borderWidth: 1 }]}>
                      <View style={styles.cardRow}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                              <View style={[styles.iconBoxSmall, { backgroundColor: colors.primary }]}>
                                  <Dumbbell size={16} color="#fff" />
                              </View>
                              <Text style={[styles.gymLabel, { color: colors.text }]}>El Bnai (Prot)</Text>
                          </View>
                          {/* Efficiency Badge */}
                          <View style={[styles.badge, { backgroundColor: colors.primary + '20' }]}>
                              <Text style={[styles.badgeText, { color: colors.primary }]}>High Efficiency</Text>
                          </View>
                      </View>
                      
                      <View style={[styles.cardRow, { marginTop: 8, alignItems: 'flex-end' }]}>
                          <Text style={[styles.gymValueLarge, { color: colors.text }]}>180g</Text>
                          <Text style={[styles.gymTarget, { color: colors.textSecondary }]}>/ 200g Goal</Text>
                      </View>
                      
                      <View style={styles.miniBarTrack}>
                          <View style={[styles.miniBarFill, { width: '90%', backgroundColor: colors.primary }]} />
                      </View>
                  </View>

                  {/* Net Calories & Wearable Sync */}
                  <View style={styles.dualRow}>
                      <View style={[styles.gymCardSmall, { backgroundColor: colors.background[0] }]}>
                          <View style={styles.cardHeaderSmall}>
                              <Text style={[styles.gymLabelSmall, { color: colors.textSecondary }]}>W7ach Ghodwa?</Text>
                              <Zap size={14} color={colors.warning} fill={colors.warning} />
                          </View>
                          <Text style={[styles.gymValueSmall, { color: colors.text }]}>Ready ⚡</Text>
                      </View>

                      <View style={[styles.gymCardSmall, { backgroundColor: colors.background[0] }]}>
                          <View style={styles.cardHeaderSmall}>
                              <Text style={[styles.gymLabelSmall, { color: colors.textSecondary }]}>Net Cals</Text>
                              <Watch size={14} color={colors.primary} />
                          </View>
                          <Text style={[styles.gymValueSmall, { color: colors.text }]}>1,850</Text>
                          <Text style={{ fontSize: 9, color: colors.textSecondary }}>-450 Active</Text>
                      </View>
                  </View>

              </View>
          </GlassView>
      </View>

      {/* --- SMART INSIGHT (Klem Coach) --- */}
      <View style={styles.section}>
         <GlassView style={styles.insightCard} intensity={40} borderRadius={24}>
             <View style={[styles.insightIcon, { backgroundColor: colors.primary }]}>
                 <Lightbulb size={20} color="#fff" fill="#fff" />
             </View>
             <View style={{ flex: 1 }}>
                 <Text style={[styles.insightTitle, { color: colors.primary }]}>Nasi7a (Tip)</Text>
                 <Text style={[styles.insightText, { color: colors.text }]}>
                    Rak na9ess chwaya Protein lyoum. Zid ka3ba escalope fel 3ché bch tkoun <Text style={{fontWeight:'bold'}}>W7ach</Text> ghodwa!
                 </Text>
             </View>
         </GlassView>
      </View>

      {/* --- HISTORY --- */}
      <View style={styles.section}>
         <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Sjel (History)</Text>
            <TouchableOpacity><Text style={[styles.link, { color: colors.primary }]}>Chouf el kol</Text></TouchableOpacity>
         </View>
         
         <View style={{ gap: 12 }}>
             {historyItems.map((item, idx) => (
                 <GlassView key={idx} style={styles.historyRow} intensity={25} borderRadius={16}>
                     <View style={styles.rowLeft}>
                         <View style={[
                             styles.statusDot, 
                             { backgroundColor: item.score >= 7 ? colors.primary : colors.warning }
                         ]} />
                         <View>
                            <Text style={[styles.rowTitle, { color: colors.text }]}>{item.date === 'Today' ? 'Lyoum' : item.date}</Text>
                            <Text style={[styles.rowSub, { color: colors.textSecondary }]}>{item.status}</Text>
                         </View>
                     </View>

                     <View style={styles.rowRight}>
                         <Text style={[styles.historyValue, { color: colors.text }]}>{item.p}g P</Text>
                         <View style={[
                             styles.scoreBadge, 
                             { backgroundColor: item.score >= 7 ? colors.primary + '20' : colors.warning + '20' }
                         ]}>
                            <Text style={[
                                styles.scoreBadgeText,
                                { color: item.score >= 7 ? colors.primary : colors.warning }
                            ]}>{item.score}</Text>
                         </View>
                     </View>
                 </GlassView>
             ))}
         </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
  },
  header: {
    marginBottom: 24,
    paddingHorizontal: 0,
  },
  headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 4,
      marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  streakBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
  },
  streakText: {
      fontWeight: 'bold',
      fontSize: 13,
  },
  tabsScroll: {
    gap: 8,
    paddingHorizontal: 4,
  },
  tabBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(150,150,150,0.2)',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
  },
  
  heroSection: {
      marginBottom: 24,
  },
  heroCard: {
      padding: 24,
      alignItems: 'center',
      position: 'relative',
  },
  shareBtn: {
      position: 'absolute',
      top: 20,
      right: 20,
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
  },
  ringWrapper: {
      marginBottom: 16,
  },
  scoreBig: {
      fontSize: 56,
      fontWeight: '900',
      letterSpacing: -2,
      lineHeight: 60,
  },
  scoreLabelText: {
      fontSize: 11,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 1,
  },
  scoreLabelBadge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
      marginTop: 4,
  },
  scoreRankText: {
      fontSize: 14,
      fontWeight: '900',
      textTransform: 'uppercase',
  },
  
  gymGrid: {
      width: '100%',
      gap: 12,
  },
  gymCard: {
      padding: 16,
      borderRadius: 20,
  },
  proteinCard: {
      width: '100%',
  },
  cardRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  iconBoxSmall: {
      width: 28,
      height: 28,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
  },
  gymLabel: {
      fontSize: 14,
      fontWeight: 'bold',
  },
  badge: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 8,
  },
  badgeText: {
      fontSize: 10,
      fontWeight: '800',
      textTransform: 'uppercase',
  },
  gymValueLarge: {
      fontSize: 28,
      fontWeight: '900',
      lineHeight: 32,
  },
  gymTarget: {
      fontSize: 12,
      fontWeight: '600',
      marginBottom: 4,
  },
  miniBarTrack: {
      height: 6,
      backgroundColor: 'rgba(0,0,0,0.05)',
      borderRadius: 3,
      overflow: 'hidden',
      marginTop: 8,
  },
  miniBarFill: {
      height: '100%',
      borderRadius: 3,
  },
  
  dualRow: {
      flexDirection: 'row',
      gap: 12,
  },
  gymCardSmall: {
      flex: 1,
      padding: 12,
      borderRadius: 16,
  },
  cardHeaderSmall: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 6,
  },
  gymLabelSmall: {
      fontSize: 11,
      fontWeight: '600',
  },
  gymValueSmall: {
      fontSize: 16,
      fontWeight: '900',
  },

  insightCard: {
      flexDirection: 'row',
      padding: 20,
      gap: 16,
      alignItems: 'flex-start',
  },
  insightIcon: {
      width: 40,
      height: 40,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
  },
  insightTitle: {
      fontSize: 13,
      fontWeight: '900',
      textTransform: 'uppercase',
      marginBottom: 4,
  },
  insightText: {
      fontSize: 13,
      lineHeight: 20,
      fontWeight: '500',
  },

  section: {
      marginBottom: 32,
  },
  sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
      paddingHorizontal: 4,
  },
  sectionTitle: {
      fontSize: 20,
      fontWeight: '900',
  },
  link: {
      fontSize: 13,
      fontWeight: '700',
  },
  
  // History Rows
  historyRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
  },
  rowLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
  },
  statusDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
  },
  rowTitle: {
      fontSize: 15,
      fontWeight: '700',
  },
  rowSub: {
      fontSize: 12,
      fontWeight: '500',
  },
  rowRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
  },
  historyValue: {
      fontSize: 14,
      fontWeight: '700',
  },
  scoreBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
  },
  scoreBadgeText: {
      fontSize: 13,
      fontWeight: '900',
  },
});