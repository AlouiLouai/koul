import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Flame, TrendingUp, Activity, Trophy, ArrowUpRight, ArrowDownRight, Award, Droplets, Zap } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const TARGET_CALS = 2200;

// --- New Component: Trophy Badge ---
const TrophyBadge = ({ label, icon: Icon, color, locked }: any) => (
  <View style={[styles.trophyCard, locked && styles.trophyLocked]}>
    <View style={[styles.trophyIconBox, { backgroundColor: locked ? '#f4f4f5' : color + '20' }]}>
      <Icon size={24} color={locked ? '#d4d4d8' : color} strokeWidth={2.5} />
    </View>
    <Text style={[styles.trophyLabel, locked && styles.textLocked]}>{label}</Text>
  </View>
);

const StatCard = ({ label, value, subValue, icon: Icon, color, trend }: any) => (
  <View style={styles.statCard}>
    <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
      <Icon size={20} color={color} strokeWidth={2.5} />
    </View>
    <View>
      <Text style={styles.statLabel}>{label}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 6 }}>
        <Text style={styles.statValue}>{value}</Text>
        {trend && (
          <View style={[styles.trendBadge, { backgroundColor: trend === 'up' ? '#ecfdf5' : '#fef2f2' }]}>
             {trend === 'up' ? <ArrowUpRight size={12} color="#10b981" /> : <ArrowDownRight size={12} color="#ef4444" />}
             <Text style={[styles.trendText, { color: trend === 'up' ? '#10b981' : '#ef4444' }]}>{subValue}</Text>
          </View>
        )}
      </View>
      {!trend && <Text style={styles.statSub}>{subValue}</Text>}
    </View>
  </View>
);

const BarChart = ({ data, labels, activeIndex }: { data: number[], labels: string[], activeIndex: number }) => {
  const max = Math.max(...data, TARGET_CALS) * 1.1;
  
  return (
    <View style={styles.chartContainer}>
      <View style={[styles.targetLine, { bottom: ((TARGET_CALS / max) * 100 + '%') as any }]} />
      <View style={styles.chartRow}>
        {data.map((val, i) => {
          const height = (val / max) * 100;
          const isActive = i === activeIndex;
          
          return (
            <View key={i} style={styles.barWrapper}>
              <View style={styles.barTrack}>
                <View 
                  style={[
                    styles.barFill, 
                    { 
                      height: `${height}%`,
                      backgroundColor: isActive ? '#10b981' : (val > TARGET_CALS + 200 ? '#f59e0b' : '#3f3f46'),
                      opacity: isActive ? 1 : 0.7
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.barLabel, isActive && styles.barLabelActive]}>{labels[i]}</Text>
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
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
      
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Progress mte3ek</Text>
          <Text style={styles.headerSubtitle}>22 Jan - 28 Jan</Text>
        </View>
        <View style={styles.toggleContainer}>
           {['Week', 'Month'].map((t) => (
             <TouchableOpacity 
               key={t} 
               style={[styles.toggleBtn, timeframe === t && styles.toggleBtnActive]}
               onPress={() => onTimeframeChange(t as any)}
             >
               <Text style={[styles.toggleText, timeframe === t && styles.toggleTextActive]}>{getWeekDerja(t)}</Text>
             </TouchableOpacity>
           ))}
        </View>
      </View>

      {/* --- NEW: Kou'ous (Trophies) Section --- */}
      <View style={styles.trophySection}>
         <Text style={styles.sectionTitle}>El Kou'ous 🏆</Text>
         <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.trophyScroll}>
            <TrophyBadge label="Zero Mokli" icon={Award} color="#10b981" />
            <TrophyBadge label="Protein King" icon={Flame} color="#3b82f6" />
            <TrophyBadge label="Mroui" icon={Droplets} color="#0ea5e9" />
            <TrophyBadge label="7arrai" icon={Zap} color="#f59e0b" locked />
         </ScrollView>
      </View>

      {/* --- NEW: Protein Streak (Gym Bro Feature) --- */}
      <View style={styles.streakSection}>
         <View style={styles.streakHeader}>
            <Text style={styles.streakTitle}>Sélselet Protein 💪</Text>
            <Text style={styles.streakCount}>5 Ayyém</Text>
         </View>
         <View style={styles.streakTrack}>
            <View style={[styles.streakFill, { width: '70%' }]} />
         </View>
         <Text style={styles.streakSub}>Mazelek 2 ayyém 3al "Goule" badge!</Text>
      </View>

      <View style={styles.chartCard}>
         <View style={styles.chartHeader}>
            <View>
               <Text style={styles.chartTitle}>Entidham l'Calories</Text>
               <Text style={styles.chartSub}>Moyenne 2,140 kcal</Text>
            </View>
            <View style={styles.legend}>
               <View style={styles.legendItem}>
                  <View style={[styles.dot, { backgroundColor: '#10b981' }]} />
                  <Text style={styles.legendText}>Hadaf</Text>
               </View>
            </View>
         </View>
         
         <BarChart 
            data={weeklyData} 
            labels={daysLabels} 
            activeIndex={selectedDayIndex} 
         />
      </View>

      <View style={styles.statsGrid}>
         <StatCard 
            label="Moy. Protéine" 
            value="175g" 
            subValue="+12%" 
            icon={Flame} 
            color="#3b82f6" 
            trend="up"
         />
         <StatCard 
            label="El Mizén" 
            value="82.4kg" 
            subValue="-0.5kg" 
            icon={Activity} 
            color="#f59e0b" 
            trend="down"
         />
         <StatCard 
            label="Entrainement" 
            value="5 Ayyém" 
            subValue="Série" 
            icon={TrendingUp} 
            color="#ec4899" 
         />
         <StatCard 
            label="Score" 
            value="8.8" 
            subValue="Tayara" 
            icon={Trophy} 
            color="#10b981" 
         />
      </View>

      <View style={styles.historySection}>
         <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Historique</Text>
            <TouchableOpacity>
               <Text style={styles.seeAll}>Chouf l'kol</Text>
            </TouchableOpacity>
         </View>
         
         {historyItems.map((item, idx) => (
            <View key={idx} style={styles.historyItem}>
               <View style={styles.historyLeft}>
                  <View style={[
                    styles.scoreBadge, 
                    { backgroundColor: item.score >= 9 ? '#ecfdf5' : item.score >= 7 ? '#fffbeb' : '#fef2f2' }
                  ]}>
                     <Text style={[
                        styles.scoreText,
                        { color: item.score >= 9 ? '#059669' : item.score >= 7 ? '#d97706' : '#dc2626' }
                     ]}>{item.score}</Text>
                  </View>
                  <View>
                     <Text style={styles.historyDate}>{item.date === 'Today' ? 'Lyoum' : item.date === 'Yesterday' ? 'El bera7' : item.date}</Text>
                     <Text style={styles.historyStatus}>{item.status}</Text>
                  </View>
               </View>
               
               <View style={styles.historyRight}>
                  <View style={styles.macroTag}>
                     <Text style={styles.macroTagText}>{item.p}g Protéine</Text>
                  </View>
                  <Text style={styles.historyCals}>{item.cals} kcal</Text>
               </View>
            </View>
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
    fontSize: 24,
    fontWeight: '900',
    color: '#18181b',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#a1a1aa',
    fontWeight: '600',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f5',
    padding: 4,
    borderRadius: 14,
  },
  toggleBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  toggleBtnActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#71717a',
  },
  toggleTextActive: {
    color: '#18181b',
  },
  
  // Trophy Section
  trophySection: {
    marginBottom: 24,
  },
  trophyScroll: {
    gap: 12,
    paddingRight: 24,
  },
  trophyCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f4f4f5',
    alignItems: 'center',
    minWidth: 90,
    gap: 8,
  },
  trophyLocked: {
    backgroundColor: '#fafafa',
    borderColor: '#e4e4e7',
  },
  trophyIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trophyLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#18181b',
    textAlign: 'center',
  },
  textLocked: {
    color: '#a1a1aa',
  },

  // Streak Section
  streakSection: {
    backgroundColor: '#18181b', // Dark theme for Gym Bros
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  streakHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  streakTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
  },
  streakCount: {
    color: '#10b981', // Emerald
    fontSize: 16,
    fontWeight: '900',
  },
  streakTrack: {
    height: 8,
    backgroundColor: '#3f3f46', // Zinc 700
    borderRadius: 4,
    width: '100%',
    overflow: 'hidden',
    marginBottom: 8,
  },
  streakFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 4,
  },
  streakSub: {
    color: '#a1a1aa',
    fontSize: 12,
    fontWeight: '600',
  },

  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#f4f4f5',
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 10,
    marginBottom: 24,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#18181b',
  },
  chartSub: {
    fontSize: 12,
    color: '#a1a1aa',
    marginTop: 2,
  },
  legend: {
    flexDirection: 'row',
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 10, color: '#71717a', fontWeight: 'bold' },
  chartContainer: {
    height: 180,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  targetLine: {
    position: 'absolute',
    left: 0, 
    right: 0,
    height: 2,
    backgroundColor: '#10b981',
    opacity: 0.2,
    borderStyle: 'dashed',
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
    width: 32,
    height: '100%',
    justifyContent: 'flex-end',
  },
  barTrack: {
    width: 8,
    height: '100%',
    backgroundColor: '#f4f4f5',
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  barFill: {
    borderRadius: 4,
    width: '100%',
  },
  barLabel: {
    position: 'absolute',
    bottom: -24,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#d4d4d8',
  },
  barLabelActive: {
    color: '#18181b',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    width: (width - 40 - 12) / 2, 
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f4f4f5',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statLabel: {
    fontSize: 10,
    color: '#a1a1aa',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#18181b',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  trendText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  statSub: {
    fontSize: 10,
    color: '#71717a',
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
    fontSize: 18,
    fontWeight: '900',
    color: '#18181b',
  },
  seeAll: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#10b981',
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f4f4f5',
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  scoreBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    fontWeight: '900',
    fontSize: 14,
  },
  historyDate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#18181b',
  },
  historyStatus: {
    fontSize: 12,
    color: '#a1a1aa',
    fontWeight: '500',
  },
  historyRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  macroTag: {
    backgroundColor: '#f4f4f5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  macroTagText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#71717a',
  },
  historyCals: {
    fontSize: 14,
    fontWeight: '900',
    color: '#18181b',
  },
});
