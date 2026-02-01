import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Flame, TrendingUp, Activity, Trophy, ArrowUpRight, ArrowDownRight, Award, Droplets, Zap, Calendar, Star } from 'lucide-react-native';
import { GlassView } from '../../components/GlassView';
import { useTheme } from '../../theme/ThemeContext';

const { width } = Dimensions.get('window');
const TARGET_CALS = 2200;

// --- New Component: Trophy Badge ---
const TrophyBadge = ({ label, icon: Icon, color, locked }: any) => {
  const { colors } = useTheme();
  return (
    <GlassView 
      style={styles.trophyCard} 
      intensity={locked ? 20 : 40} 
      borderRadius={20}
    >
      <View style={[styles.trophyIconBox, { backgroundColor: locked ? colors.textSecondary + '20' : color + '20' }]}>
        <Icon size={24} color={locked ? colors.textSecondary : color} strokeWidth={2.5} />
      </View>
      <Text style={[styles.trophyLabel, { color: locked ? colors.textSecondary : colors.text }]}>{label}</Text>
    </GlassView>
  );
};

const StatCard = ({ label, value, subValue, icon: Icon, color, trend }: any) => {
  const { colors } = useTheme();
  return (
    <GlassView style={styles.statCard} intensity={50} borderRadius={24}>
      <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
        <Icon size={20} color={color} strokeWidth={2.5} />
      </View>
      <View>
        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{label}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 6 }}>
          <Text style={[styles.statValue, { color: colors.text }]}>{value}</Text>
          {trend && (
            <View style={[styles.trendBadge, { backgroundColor: trend === 'up' ? colors.success + '20' : colors.error + '20' }]}>
               {trend === 'up' ? <ArrowUpRight size={12} color={colors.success} /> : <ArrowDownRight size={12} color={colors.error} />}
               <Text style={[styles.trendText, { color: trend === 'up' ? colors.success : colors.error }]}>{subValue}</Text>
            </View>
          )}
        </View>
        {!trend && <Text style={[styles.statSub, { color: colors.textSecondary }]}>{subValue}</Text>}
      </View>
    </GlassView>
  );
};

// --- REDESIGNED: Liquid Tube Chart ---
const LiquidChart = ({ data, labels, activeIndex }: { data: number[], labels: string[], activeIndex: number }) => {
  const { colors } = useTheme();
  const max = Math.max(...data, TARGET_CALS) * 1.1;
  
  return (
    <View style={styles.chartContainer}>
      {/* Target Line */}
      <View style={[styles.targetLine, { bottom: ((TARGET_CALS / max) * 100 + '%') as any, borderColor: colors.success }]} />
      
      <View style={styles.chartRow}>
        {data.map((val, i) => {
          const height = (val / max) * 100;
          const isActive = i === activeIndex;
          const barColor = isActive ? colors.primary : (val > TARGET_CALS + 200 ? colors.warning : colors.textSecondary);
          
          return (
            <View key={i} style={styles.barWrapper}>
              <View style={[styles.barTrack, { backgroundColor: colors.glassBorder }]}>
                <View 
                  style={[
                    styles.barFill, 
                    { 
                      height: `${height}%`,
                      backgroundColor: barColor,
                      opacity: isActive ? 1 : 0.5,
                      shadowColor: barColor,
                      shadowOpacity: isActive ? 0.5 : 0,
                      shadowRadius: 8,
                      shadowOffset: {width: 0, height: 0}
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.barLabel, { color: isActive ? colors.text : colors.textSecondary, fontWeight: isActive ? '900' : '500' }]}>
                  {labels[i]}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

interface StatsUIProps {
  timeframe: 'Week' | 'Month';
  onTimeframeChange: (t: 'Week' | 'Month') => void;
  selectedDayIndex: number;
  weeklyData: number[];
  daysLabels: string[];
  historyItems: any[];
}

const getWeekDerja = (t: string) => t === 'Week' ? 'Jom3a' : "Ch'har";

export const StatsUI = ({
  timeframe,
  onTimeframeChange,
  selectedDayIndex,
  weeklyData,
  daysLabels,
  historyItems
}: StatsUIProps) => {
  const { colors, mode } = useTheme();
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
      
      <View style={styles.header}>
        <View>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Statistik (Stats)</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>Chouf win waselt</Text>
        </View>
        <GlassView style={styles.toggleContainer} intensity={30} borderRadius={16}>
           {['Week', 'Month'].map((t) => (
             <TouchableOpacity 
               key={t} 
               style={[styles.toggleBtn, timeframe === t && { backgroundColor: colors.glass }]}
               onPress={() => onTimeframeChange(t as any)}
             >
               <Text style={[styles.toggleText, timeframe === t ? { color: colors.text } : { color: colors.textSecondary }]}>{getWeekDerja(t)}</Text>
             </TouchableOpacity>
           ))}
        </GlassView>
      </View>

      {/* --- PREMIUM STREAK BANNER --- */}
      <GlassView style={[styles.streakSection, { borderColor: colors.success }]} intensity={60} borderRadius={24}>
         <View style={styles.streakContent}>
             <View style={styles.streakLeft}>
                <View style={[styles.streakIcon, { backgroundColor: colors.success }]}>
                    <Flame size={20} color="#fff" fill="#fff" />
                </View>
                <View>
                    <Text style={[styles.streakTitle, { color: colors.text }]}>Sélselet Protein 💪</Text>
                    <Text style={[styles.streakSub, { color: colors.textSecondary }]}>5 Ayyém wara b3adhom!</Text>
                </View>
             </View>
             <Text style={[styles.streakCount, { color: colors.success }]}>+150 XP</Text>
         </View>
         <View style={[styles.streakTrack, { backgroundColor: colors.glassBorder }]}>
            <View style={[styles.streakFill, { width: '70%', backgroundColor: colors.success }]} />
         </View>
      </GlassView>

      <GlassView style={styles.chartCard} intensity={40} borderRadius={32}>
         <View style={styles.chartHeader}>
            <View>
               <Text style={[styles.chartTitle, { color: colors.text }]}>Mizan l'Calories</Text>
               <Text style={[styles.chartSub, { color: colors.textSecondary }]}>Moyenne: 2,140 kcal</Text>
            </View>
            <View style={[styles.legendBadge, { backgroundColor: colors.success + '20' }]}>
               <View style={[styles.dot, { backgroundColor: colors.success }]} />
               <Text style={[styles.legendText, { color: colors.success }]}>Hadaf (Target)</Text>
            </View>
         </View>
         
         <LiquidChart 
            data={weeklyData} 
            labels={daysLabels} 
            activeIndex={selectedDayIndex} 
         />
      </GlassView>

      {/* --- GRID STATS --- */}
      <View style={styles.statsGrid}>
         <StatCard 
            label="Moy. Protéine" 
            value="175g" 
            subValue="+12%" 
            icon={Flame} 
            color={colors.primary}
            trend="up"
         />
         <StatCard 
            label="El Mizén" 
            value="82.4kg" 
            subValue="-0.5kg" 
            icon={Activity} 
            color={colors.warning} 
            trend="down"
         />
      </View>

      {/* --- TROPHIES CABINET --- */}
      <View style={styles.trophySection}>
         <Text style={[styles.sectionTitle, { color: colors.text }]}>El Kou'ous (Awards) 🏆</Text>
         <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.trophyScroll}>
            <TrophyBadge label="Zero Mokli" icon={Award} color={colors.success} />
            <TrophyBadge label="Protein King" icon={Flame} color={colors.primary} />
            <TrophyBadge label="Mroui" icon={Droplets} color="#0ea5e9" />
            <TrophyBadge label="7arrai" icon={Zap} color={colors.warning} locked />
         </ScrollView>
      </View>

      {/* --- HISTORY AS CARDS --- */}
      <View style={styles.historySection}>
         <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Historique (Sjel)</Text>
            <TouchableOpacity>
               <Text style={[styles.seeAll, { color: colors.primary }]}>Chouf l'kol</Text>
            </TouchableOpacity>
         </View>
         
         {historyItems.map((item, idx) => (
            <GlassView key={idx} style={styles.historyItem} intensity={30} borderRadius={24}>
               <View style={styles.historyLeft}>
                  {/* Score Stamp */}
                  <View style={[
                    styles.scoreStamp, 
                    { borderColor: item.score >= 9 ? colors.success : item.score >= 7 ? colors.warning : colors.error }
                  ]}>
                     <Text style={[
                        styles.scoreText,
                        { color: item.score >= 9 ? colors.success : item.score >= 7 ? colors.warning : colors.error }
                     ]}>{item.score}</Text>
                  </View>
                  <View>
                     <Text style={[styles.historyDate, { color: colors.text }]}>{item.date === 'Today' ? 'Lyoum' : item.date === 'Yesterday' ? 'El bera7' : item.date}</Text>
                     <Text style={[styles.historyStatus, { color: colors.textSecondary }]}>{item.status}</Text>
                  </View>
               </View>
               
               <View style={styles.historyRight}>
                  <View style={[styles.macroTag, { backgroundColor: colors.glassBorder }]}>
                     <Text style={[styles.macroTagText, { color: colors.textSecondary }]}>{item.p}g P</Text>
                  </View>
                  <Text style={[styles.historyCals, { color: colors.text }]}>{item.cals} kcal</Text>
               </View>
            </GlassView>
         ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  toggleContainer: {
    flexDirection: 'row',
    padding: 4,
  },
  toggleBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '700',
  },
  
  // Trophy Section
  trophySection: {
    marginBottom: 32,
  },
  trophyScroll: {
    gap: 12,
    paddingRight: 24,
  },
  trophyCard: {
    padding: 16,
    alignItems: 'center',
    minWidth: 100,
    gap: 10,
  },
  trophyIconBox: {
    width: 52,
    height: 52,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trophyLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Streak Section
  streakSection: {
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
  },
  streakContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
  },
  streakLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
  },
  streakIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
  },
  streakTitle: {
    fontSize: 16,
    fontWeight: '900',
  },
  streakSub: {
    fontSize: 12,
    fontWeight: '600',
  },
  streakCount: {
    fontSize: 16,
    fontWeight: '900',
  },
  streakTrack: {
    height: 6,
    borderRadius: 3,
    width: '100%',
    overflow: 'hidden',
  },
  streakFill: {
    height: '100%',
    borderRadius: 3,
  },

  chartCard: {
    padding: 24,
    marginBottom: 24,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '900',
  },
  chartSub: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  legendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  dot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 11, fontWeight: 'bold' },
  
  // Liquid Chart
  chartContainer: {
    height: 200,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  targetLine: {
    position: 'absolute',
    left: 0, 
    right: 0,
    height: 2,
    borderTopWidth: 2,
    borderStyle: 'dashed',
    opacity: 0.3,
    zIndex: 0,
  },
  chartRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '100%',
    paddingBottom: 24,
  },
  barWrapper: {
    alignItems: 'center',
    width: 36,
    height: '100%',
    justifyContent: 'flex-end',
  },
  barTrack: {
    width: 12,
    height: '100%',
    borderRadius: 6,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  barFill: {
    borderRadius: 6,
    width: '100%',
  },
  barLabel: {
    position: 'absolute',
    bottom: -24,
    fontSize: 12,
  },
  
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1, 
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '900',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  trendText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  statSub: {
    fontSize: 11,
    fontWeight: '600',
  },
  
  historySection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
  },
  seeAll: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginBottom: 12,
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  scoreStamp: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    transform: [{ rotate: '-10deg' }],
  },
  scoreText: {
    fontWeight: '900',
    fontSize: 18,
  },
  historyDate: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  historyStatus: {
    fontSize: 13,
    fontWeight: '500',
  },
  historyRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  macroTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  macroTagText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  historyCals: {
    fontSize: 16,
    fontWeight: '900',
  },
});
