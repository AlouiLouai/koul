import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Zap, Flame, Wheat, Droplets, Sparkles, Utensils, AlertTriangle, ThumbsUp, Activity, Gauge, Volume2 } from 'lucide-react-native';
import * as Speech from 'expo-speech';
import type { AnalysisResponse } from '../types';

interface AnalysisResultProps {
  data: AnalysisResponse;
}

const MacroCard = ({ label, value, unit, color, icon: Icon }: any) => (
  <View style={[styles.macroCard, { shadowColor: color.shadow || '#000' }]}>
    <View style={[styles.macroIconBg, { backgroundColor: color.bg }]}>
      <Icon size={16} color={color.text} strokeWidth={2.5} />
    </View>
    <Text style={styles.macroLabel}>{label}</Text>
    <View>
      <Text style={styles.macroValue}>{value}</Text>
      <Text style={styles.macroUnit}>{unit}</Text>
    </View>
  </View>
);

const SmartMetric = ({ label, value, icon: Icon, color }: any) => (
  <View style={[styles.smartMetric, { backgroundColor: color.bg, borderColor: color.border }]}>
    <Icon size={14} color={color.text} />
    <View>
        <Text style={[styles.smartLabel, { color: color.text }]}>{label}</Text>
        <Text style={[styles.smartValue, { color: color.text }]}>{value}</Text>
    </View>
  </View>
);

const GoalBadge = ({ label, level }: { label: string, level: string }) => {
  const getLevelDerja = (lvl: string) => {
    switch(lvl?.toLowerCase()) {
      case 'high': return '3ali';
      case 'medium': return 'Metwast';
      case 'low': return 'Na9es';
      default: return 'N/A';
    }
  };

  const getColor = (lvl: string) => {
    switch(lvl?.toLowerCase()) {
      case 'high': return { bg: '#ecfdf5', text: '#059669', border: '#a7f3d0' };
      case 'medium': return { bg: '#fffbeb', text: '#d97706', border: '#fcd34d' };
      case 'low': return { bg: '#fef2f2', text: '#dc2626', border: '#fecaca' };
      default: return { bg: '#f4f4f5', text: '#71717a', border: '#e4e4e7' };
    }
  };
  const theme = getColor(level);
  
  return (
    <View style={[styles.goalBadge, { backgroundColor: theme.bg, borderColor: theme.border }]}>
      <Text style={[styles.goalLabel, { color: theme.text }]}>{label}</Text>
      <Text style={[styles.goalLevel, { color: theme.text }]}>{getLevelDerja(level)}</Text>
    </View>
  );
};

const AnalysisResult: React.FC<AnalysisResultProps> = ({ data }) => {
  const getScoreTheme = (score: number = 0) => {
    if (score >= 8) return '#10b981';
    if (score >= 5) return '#f59e0b';
    return '#ef4444';
  };
  const verdictColor = getScoreTheme(data.health_score ?? 0);

  // Logic for "Mokli Meter"
  const isHighFat = data.totals.fat > 20;
  const mokliLevel = isHighFat ? "Mokli Barcha" : "Moch Mokli";
  const mokliColor = isHighFat ? { bg: '#fef2f2', border: '#fecaca', text: '#dc2626' } : { bg: '#ecfdf5', border: '#a7f3d0', text: '#059669' };

  // Logic for "Chba3t?"
  const satietyScore = (data.totals.protein * 2) + data.totals.calories / 50;
  const satietyLevel = satietyScore > 100 ? "Techba3" : "Light";

  // Tounsi Personality Logic
  const getDerjaVerdict = (d: AnalysisResponse['totals'], score: number) => {
    if (score >= 9) return "Sa7a w bechfé! Mla3eb ya m3allem.";
    if (d.fat > 35) return "Yezi mel zit! Barra a3mel doura 🏃‍♂️";
    if (d.protein > 40) return "W7a4ch! (Beast Mode) 💪";
    if (d.calories < 300) return "Koul mli7, mazelt jayi3? 🥖";
    if (score >= 7) return "Moch khayeb, ama tnajem t7asen.";
    return "Rod belek 3la sa7tek, na9es mel 'Mokli'.";
  };

  const verdictText = getDerjaVerdict(data.totals, data.health_score);

  const handleSpeak = () => {
    Speech.speak(verdictText, { language: 'fr-FR' });
  };

  return (
    <View style={styles.container}>
      
      {/* Verdict & Score Header */}
      <View style={styles.headerRow}>
        <View style={styles.scoreCard}>
           <Text style={styles.scoreLabel}>Score Se7i</Text>
           <View style={[styles.scoreCircle, { borderColor: verdictColor }]}>
              <Text style={[styles.scoreValue, { color: verdictColor }]}>{data.health_score ?? 0}</Text>
              <Text style={styles.scoreMax}>/10</Text>
           </View>
        </View>
        
        <View style={[styles.verdictCard, { backgroundColor: verdictColor }]}>
            <View style={styles.verdictHeader}>
               <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                 <ThumbsUp size={16} color="#fff" fill="#fff" />
                 <Text style={styles.verdictLabel}>EL 7OKM</Text>
               </View>
               <TouchableOpacity onPress={handleSpeak}>
                 <Volume2 size={20} color="#fff" />
               </TouchableOpacity>
            </View>
            <Text style={styles.verdictText} numberOfLines={3}>
              "{verdictText}"
            </Text>
        </View>
      </View>

      {/* Hero: Total Calories */}
      <View style={styles.heroCard}>
         <View style={styles.heroDeco} />
         <View style={styles.heroContent}>
            <View>
              <Text style={styles.heroLabel}>Taka l'kol</Text>
              <Text style={styles.heroValue}>{data.totals.calories}</Text>
              <Text style={styles.heroUnit}>kcal</Text>
            </View>
            <View style={styles.donutPlaceholder}>
                 <Zap size={28} color="#10b981" fill="#10b981" />
            </View>
         </View>
      </View>

      {/* Oil Estimate Warning */}
      {data.oil_estimate && (
        <View style={styles.oilCard}>
           <View style={styles.oilHeader}>
             <AlertTriangle size={18} color="#f59e0b" />
             <Text style={styles.oilTitle}>Zit Khoféy</Text>
           </View>
           <View style={styles.oilDetails}>
              <Text style={styles.oilText}>
                 Fama <Text style={{fontWeight: 'bold'}}>{data.oil_estimate.type === 'olive oil' ? 'Zit Zitouna' : data.oil_estimate.type}</Text>. 
                 T9riban <Text style={{fontWeight: 'bold'}}>{data.oil_estimate.amount_tbsp} mgharfa</Text> zayda 
                 <Text style={{fontWeight: 'bold', color: '#ea580c'}}> +{data.oil_estimate.calories} kcal</Text>.
              </Text>
           </View>
        </View>
      )}

      {/* Macro Bento Grid */}
      <View style={styles.gridContainer}>
        <MacroCard 
            label="Protéine" 
            value={data.totals.protein} 
            unit="g" 
            color={{ bg: "#eff6ff", text: "#3b82f6", shadow: "#dbeafe" }} 
            icon={Flame} 
        />
        <MacroCard 
            label="Carbs" 
            value={data.totals.carbs} 
            unit="g" 
            color={{ bg: "#ecfdf5", text: "#10b981", shadow: "#d1fae5" }} 
            icon={Wheat} 
        />
        <MacroCard 
            label="Dhoune" 
            value={data.totals.fat} 
            unit="g" 
            color={{ bg: "#fff7ed", text: "#f97316", shadow: "#ffedd5" }} 
            icon={Droplets} 
        />
      </View>

      {/* Smart Metrics */}
      <View style={styles.goalsContainer}>
           <Text style={styles.sectionTitle}>Mizanek (Smart Metrics) 🇹🇳</Text>
           <View style={styles.goalsRow}>
              <SmartMetric 
                label="Mokli Meter" 
                value={mokliLevel} 
                icon={Activity} 
                color={mokliColor} 
              />
              <SmartMetric 
                label="Chba3t?" 
                value={satietyLevel} 
                icon={Gauge} 
                color={{ bg: '#f0f9ff', border: '#bae6fd', text: '#0284c7' }} 
              />
           </View>
      </View>

      {/* Suitability (Gym Goals) */}
      {data.goals && (
        <View style={styles.goalsContainer}>
           <Text style={styles.sectionTitle}>Ahdef Es-se7a</Text>
           <View style={styles.goalsRow}>
              <GoalBadge label="Tan9is Mizen" level={data.goals.weight_loss} />
              <GoalBadge label="Bné 3adhlat" level={data.goals.muscle_gain} />
              <GoalBadge label="Sokri" level={data.goals.diabetes_friendly} />
           </View>
        </View>
      )}

      {/* AI Insight */}
      {data.reasoning_log ? (
        <View style={styles.insightCard}>
          <View style={styles.insightHeader}>
              <Sparkles size={14} color="#8b5cf6" fill="#8b5cf6" />
              <Text style={styles.insightTitle}>T7lil l'Chef</Text>
          </View>
          <Text style={styles.insightText}>
              {data.reasoning_log}
          </Text>
        </View>
      ) : null}

      {/* Item List */}
      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>Tafaçil l'Mekla</Text>
        <View style={styles.list}>
            {data.meal_analysis.map((item, idx) => (
                <View key={idx} style={styles.itemCard}>
                    <View style={styles.itemHeader}>
                        <View style={styles.itemNameContainer}>
                           <View style={styles.dot} />
                           <Text style={styles.itemNameText}>{item.item}</Text>
                        </View>
                        <View style={styles.calsBadge}>
                           <Text style={styles.calsText}>{item.calories} kcal</Text>
                        </View>
                    </View>
                    
                    <View style={styles.itemDetails}>
                       <View style={styles.detailRow}>
                          <Text style={styles.detailLabel}>Kemya:</Text>
                          <Text style={styles.detailValue}>{item.portion_estimate} ({item.mass_g}g)</Text>
                       </View>
                       
                       <View style={styles.miniMacros}>
                          <View style={styles.miniMacroItem}>
                             <View style={[styles.miniBar, { backgroundColor: '#3b82f6', width: Math.min((item.protein_g / 30) * 40, 40) }]} />
                             <Text style={styles.miniMacroText}>{item.protein_g}g P</Text>
                          </View>
                          <View style={styles.miniMacroItem}>
                             <View style={[styles.miniBar, { backgroundColor: '#10b981', width: Math.min((item.carbs_g / 50) * 40, 40) }]} />
                             <Text style={styles.miniMacroText}>{item.carbs_g}g C</Text>
                          </View>
                          <View style={styles.miniMacroItem}>
                             <View style={[styles.miniBar, { backgroundColor: '#f97316', width: Math.min((item.fat_g / 20) * 40, 40) }]} />
                             <Text style={styles.miniMacroText}>{item.fat_g}g F</Text>
                          </View>
                       </View>
                    </View>
                </View>
            ))}
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
    height: 120,
  },
  scoreCard: {
    flex: 0.4,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#f4f4f5',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  scoreLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#a1a1aa',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  scoreCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: '900',
    color: '#10b981',
    lineHeight: 24,
  },
  scoreMax: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#d4d4d8',
  },
  verdictCard: {
    flex: 0.6,
    backgroundColor: '#10b981',
    borderRadius: 24,
    padding: 20,
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#10b981',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  verdictHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
    opacity: 0.9,
  },
  verdictLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 10,
    letterSpacing: 1,
  },
  verdictText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    lineHeight: 18,
  },
  heroCard: {
    backgroundColor: '#18181b',
    borderRadius: 32,
    padding: 28,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
    marginBottom: 16,
  },
  heroDeco: {
    position: 'absolute',
    top: -64,
    right: -64,
    width: 256,
    height: 256,
    borderRadius: 128,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  heroContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  heroLabel: {
    color: '#71717a',
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 4,
  },
  heroValue: {
    color: '#fff',
    fontSize: 56,
    fontWeight: '900',
    letterSpacing: -2,
    lineHeight: 60,
  },
  heroUnit: {
    color: '#10b981',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
  donutPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  oilCard: {
    backgroundColor: '#fffbeb',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#fcd34d',
    flexDirection: 'column',
    gap: 8,
  },
  oilHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  oilTitle: {
    color: '#d97706',
    fontWeight: 'bold',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  oilDetails: {
    paddingLeft: 26,
  },
  oilText: {
    color: '#92400e',
    fontSize: 13,
    lineHeight: 18,
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 24,
  },
  macroCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f4f4f5',
    height: 110,
    justifyContent: 'space-between',
    elevation: 3,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  macroIconBg: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  macroLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#a1a1aa',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  macroValue: {
    fontSize: 22,
    fontWeight: '900',
    color: '#18181b',
    letterSpacing: -0.5,
  },
  macroUnit: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#a1a1aa',
  },
  goalsContainer: {
    marginBottom: 24,
  },
  goalsRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  goalBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    flex: 1,
    minWidth: 100,
  },
  goalLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  goalLevel: {
    fontSize: 14,
    fontWeight: '900',
  },
  smartMetric: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    minWidth: 140,
  },
  smartLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2,
    textTransform: 'uppercase',
    opacity: 0.7,
  },
  smartValue: {
    fontSize: 14,
    fontWeight: '900',
  },
  insightCard: {
    backgroundColor: '#f5f3ff',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ddd6fe',
    marginBottom: 24,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  insightTitle: {
    fontSize: 11,
    fontWeight: '900',
    color: '#7c3aed',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  insightText: {
    color: '#5b21b6',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22,
  },
  listContainer: {},
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#18181b',
    marginBottom: 12,
    paddingHorizontal: 4,
    letterSpacing: -0.5,
  },
  list: {
    gap: 16,
  },
  itemCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#f4f4f5',
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
  },
  itemNameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#18181b',
    flex: 1,
  },
  calsBadge: {
    backgroundColor: '#18181b',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  calsText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  itemDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailLabel: {
    fontSize: 12,
    color: '#a1a1aa',
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 12,
    color: '#52525b',
    fontWeight: 'bold',
  },
  miniMacros: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f4f4f5',
  },
  miniMacroItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  miniBar: {
    height: 4,
    borderRadius: 2,
  },
  miniMacroText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#71717a',
  },
});

export default AnalysisResult;