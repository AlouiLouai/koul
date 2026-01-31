import React, { useRef, useEffect, memo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Animated, Easing, Alert, Platform } from 'react-native';
import { ChefHat, Leaf, History, ArrowRight, Trash2, CheckCircle2, RefreshCcw, Lightbulb, Utensils, Droplets, Flame, Check } from 'lucide-react-native';
import ImageUpload from '../../components/ImageUpload';
import AnalysisResult from '../../components/AnalysisResult';
import type { AnalysisResponse } from '../../types';

interface HomeUIProps {
  loading: boolean;
  result: AnalysisResponse | null;
  currentImage: string | null;
  error: string | null;
  onImageSelected: (uri: string, type: string, fileName: string) => void;
  onReset: () => void;
  onLogMeal: () => void;
}

// --- Sub-components (Memoized) ---

const FeatureCard = memo(({ title, desc, icon: Icon, bg, iconColor }: any) => (
  <View style={[styles.featureCard, styles.shadowSoft]}> 
    <View style={[styles.featureCardHeader]}> 
      <View style={[styles.featureIcon, { backgroundColor: bg }]}> 
        <Icon size={22} color={iconColor} /> 
      </View>
      <ArrowRight size={16} color="#e5e5e5" /> 
    </View>
    <View> 
      <Text style={styles.featureTitle}>{title}</Text> 
      <Text style={styles.featureDesc}>{desc}</Text> 
    </View>
  </View>
));

// --- NEW: Interactive Water Tracker (Golla l'Mé) ---
const WaterTracker = () => {
  const [cups, setCups] = useState(0);
  const target = 8;
  const fillAnim = useRef(new Animated.Value(0)).current;

  const addWater = () => {
    if (cups < target) {
      setCups(prev => prev + 1);
      Animated.spring(fillAnim, {
        toValue: (cups + 1) / target,
        useNativeDriver: false,
        friction: 6,
        tension: 40
      }).start();
    }
  };

  return (
    <View style={[styles.waterCard, styles.shadowMedium]}>
      <View style={styles.waterLeft}>
        <View style={styles.waterHeader}>
           <View style={styles.waterIconBg}>
             <Droplets size={18} color="#3b82f6" fill="#3b82f6" />
           </View>
           <Text style={styles.waterTitle}>Golla l'Mé</Text>
        </View>
        <Text style={styles.waterDesc}>
          {cups >= target ? "Mrayguel! Rwit 3atchek." : `${target - cups} kiesen bach tkamel el Golla.`}
        </Text>
        <View style={styles.waterProgressBg}>
           <Animated.View style={[styles.waterProgressFill, { 
              width: fillAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%']
              }) 
           }]} />
        </View>
      </View>
      <TouchableOpacity style={styles.addWaterBtn} onPress={addWater} activeOpacity={0.8}>
         <Text style={styles.addWaterText}>+1 Kès</Text>
      </TouchableOpacity>
    </View>
  );
};

// --- NEW: Daily Challenge (Tahadi l'Youm) ---
const DailyChallenge = () => {
  const [completed, setCompleted] = useState(false);

  return (
    <TouchableOpacity 
      activeOpacity={0.9} 
      onPress={() => setCompleted(!completed)}
      style={[styles.challengeCard, completed && styles.challengeCardActive, styles.shadowSoft]}
    >
      <View style={[styles.challengeIconBox, completed && { backgroundColor: 'rgba(255,255,255,0.2)' }]}> 
         {completed ? <CheckCircle2 size={24} color="#fff" /> : <Flame size={24} color="#f97316" fill="#f97316" />}
      </View>
      <View style={{flex: 1}}>
         <Text style={[styles.challengeLabel, completed && styles.textWhite]}>Tahadi l'Youm 🔥</Text>
         <Text style={[styles.challengeTitle, completed && styles.textWhite]}>
            {completed ? "Bravo! 3malt l'impossible!" : "Na9es 1/2 khobza fel 3ché"}
         </Text>
      </View>
      {completed && (
        <View style={styles.rewardBadge}> 
           <Text style={styles.challengeReward}>+50 XP</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const TipCard = memo(() => (
  <View style={[styles.tipCard, styles.shadowSoft]}>
    <View style={styles.tipHeader}>
      <View style={styles.tipIconBox}>
        <Lightbulb size={20} color="#f59e0b" fill="#f59e0b" />
      </View>
      <Text style={styles.tipTitle}>Nasi7a Lyawm</Text>
    </View>
    <Text style={styles.tipText}>
      "Zit zitouna fih barcha manfa3, ama rod belek men l'quantité! Mgharfa kbira fiha 120 calories."
    </Text>
  </View>
));

const TrendingDishCard = memo(() => (
  <View style={[styles.dishCard, styles.shadowMedium]}>
    <View style={styles.dishContent}>
        <View style={styles.dishBadge}>
            <Text style={styles.dishBadgeText}>TOP #1</Text>
        </View>
        <Text style={styles.dishTitle}>Couscous Bel 7out</Text>
        <Text style={styles.dishDesc}>Bnin w s7i, ama kather m'lkhodhra w na9es mel sauce!</Text>
    </View>
    <View style={styles.dishIconBox}>
        <Utensils size={32} color="#fff" />
    </View>
  </View>
));

const FeaturesList = memo(() => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuresScroll}> 
    <FeatureCard 
      title="T7lil Chef" 
      desc="Details 3al tatyib w l'ingredients mté3ek."
      icon={ChefHat}
      bg="#fff7ed"
      iconColor="#f97316"
    />
    <FeatureCard 
      title="Dké Istina3i" 
      desc="Ya3ref l'quantity w el calories bel taswira."
      icon={Leaf}
      bg="#ecfdf5"
      iconColor="#10b981"
    />
    <FeatureCard 
      title="Historique Dki" 
      desc="Taba3 makletek w progress mté3ek kol youm."
      icon={History}
      bg="#eff6ff"
      iconColor="#3b82f6"
    />
  </ScrollView>
));

// --- Main Component ---

export const HomeUI = ({ 
  loading, 
  result, 
  currentImage, 
  error, 
  onImageSelected, 
  onReset, 
  onLogMeal 
}: HomeUIProps) => { 
  
  const resultOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (result) {
      Animated.timing(resultOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.out(Easing.quad),
      }).start();
    } else {
      resultOpacity.setValue(0);
    }
  }, [result]);

  if (result) {
    return (
      <Animated.View style={[ 
        styles.resultContainer, 
        { 
          flex: 1, // Ensure it takes full height
          opacity: resultOpacity, 
          transform: [{ translateY: resultOpacity.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }]
        }
      ]}> 
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }} // Space for tabs
        >
          {/* Scanned Image Header */}
          {currentImage && (
              <View style={[styles.imageHeader, styles.shadowMedium]}> 
                  <Image 
                    source={{ uri: currentImage }} 
                    style={styles.scannedImage} 
                    resizeMethod="resize" // Android perf boost
                  /> 
                  <View style={styles.imageOverlay} /> 
                  <TouchableOpacity 
                    onPress={onReset}
                    style={styles.closeBtn}
                  >
                      <RefreshCcw size={20} color="#fff" /> 
                  </TouchableOpacity>
              </View>
          )}

          <View style={styles.resultContent}> 
             <AnalysisResult data={result} /> 
          </View>

          {/* Floating Action Bar for Result */}
          <View style={styles.actionBar}> 
             <TouchableOpacity 
                style={[styles.actionBtnSecondary, styles.shadowSoft]}
                onPress={onReset}
             > 
                <Trash2 size={20} color="#ef4444" /> 
                <Text style={styles.actionBtnTextSecondary}>Fasakh</Text> 
             </TouchableOpacity>

             <TouchableOpacity 
                style={[styles.actionBtnPrimary, styles.shadowMedium]}
                onPress={onLogMeal}
             >
                <CheckCircle2 size={20} color="#fff" /> 
                <Text style={styles.actionBtnTextPrimary}>Kayed Fatourek</Text> 
             </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
    );
  }

  return (
    <ScrollView 
        contentContainerStyle={styles.webContentContainer} 
        showsVerticalScrollIndicator={false}
        bounces={false}
    > 
      {/* Enhanced Hero Section */}
      <View style={styles.heroSection}> 
        <View style={styles.heroTopRow}>
           <Text style={styles.heroTitle}> 
             Koul Mli7,
             <Text style={styles.heroHighlight}> 
               T3ich Mli7 🇹🇳.
             </Text>
           </Text>
           {/* Sélsela (Streak) Badge */}
           <View style={styles.streakBadge}>
              <Flame size={18} color="#f97316" fill="#f97316" />
              <Text style={styles.streakText}>3 Jours</Text>
           </View>
        </View>
        <Text style={styles.heroSubtitle}> 
          Sawar sahnek, na3tiwek el s7i7 bel AI fi thawéni.
        </Text>
      </View>

      {/* Daily Challenge (Engagement) */}
      <View style={styles.sectionSpacing}>
         <DailyChallenge />
      </View>

      {/* Main Action */}
      <View style={styles.uploadContainer}> 
        <ImageUpload onImageSelected={onImageSelected} isLoading={loading} /> 
      </View>

      {error && (
          <View style={styles.errorBox}> 
              <Text style={styles.errorText}>{error}</Text> 
          </View>
      )}

      {/* Interactive Water Tracker */}
      <View style={styles.sectionSpacing}>
         <WaterTracker />
      </View>

      {/* Daily Content Section */}
      <View style={styles.dailySection}>
         <TipCard />
         <TrendingDishCard />
      </View>

      {/* Feature Cards (Carousel style) */}
      <View style={styles.featuresContainer}> 
        <View style={styles.sectionHeader}> 
           <Text style={styles.sectionTitle}>3lech KOUL?</Text> 
        </View>
        
        <FeaturesList />
      </View>
      
      {/* Bottom Spacer for Tab Bar */}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  webContentContainer: { 
      alignItems: 'center',
      paddingBottom: 20,
  },
  // Shadow Helpers (Pixel Perfect Depth)
  shadowSoft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  shadowMedium: {
    shadowColor: '#10b981', // Tinted shadow
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 6,
  },

  heroSection: { 
      width: '100%',
      marginBottom: 32, 
      marginTop: 8,
  },
  heroTopRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
  },
  heroTitle: { 
      fontSize: 32, 
      lineHeight: 40,
      fontWeight: '900',
      color: '#18181b',
      letterSpacing: -0.5,
  },
  heroHighlight: { 
      color: '#10b981',
      fontSize: 38,
      lineHeight: 46,
  },
  streakBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff7ed',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 16,
      gap: 6,
      borderWidth: 1,
      borderColor: '#ffedd5',
  },
  streakText: {
      color: '#c2410c',
      fontWeight: '800',
      fontSize: 12,
  },
  heroSubtitle: { 
      color: '#71717a',
      fontSize: 15,
      fontWeight: '500',
      marginTop: 12,
      maxWidth: 280,
      lineHeight: 24,
  },
  
  sectionSpacing: {
      width: '100%',
      marginBottom: 24,
  },

  // Daily Challenge Styles
  challengeCard: {
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: 28,
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      borderWidth: 1,
      borderColor: '#f4f4f5',
  },
  challengeCardActive: {
      backgroundColor: '#10b981', 
      borderColor: '#10b981',
  },
  challengeIconBox: {
      width: 52,
      height: 52,
      borderRadius: 20,
      backgroundColor: '#fffbeb', // Amber 50
      alignItems: 'center',
      justifyContent: 'center',
  },
  challengeLabel: {
      fontSize: 11,
      fontWeight: '800',
      color: '#a1a1aa',
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginBottom: 4,
  },
  challengeTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#18181b',
  },
  textWhite: {
      color: '#fff',
  },
  rewardBadge: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 12,
  },
  challengeReward: {
      fontSize: 13,
      fontWeight: '900',
      color: '#fff',
  },

  // Water Tracker Styles
  waterCard: {
      width: '100%',
      backgroundColor: '#eff6ff', // Blue 50
      borderRadius: 28,
      padding: 24,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#dbeafe',
  },
  waterLeft: {
      flex: 1,
      gap: 10,
  },
  waterHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
  },
  waterIconBg: {
      backgroundColor: '#fff',
      padding: 6,
      borderRadius: 10,
  },
  waterTitle: {
      fontSize: 18,
      fontWeight: '900',
      color: '#1e40af', 
  },
  waterDesc: {
      fontSize: 13,
      color: '#60a5fa',
      fontWeight: '600',
  },
  waterProgressBg: {
      height: 10,
      backgroundColor: '#dbeafe',
      borderRadius: 5,
      width: '85%',
      overflow: 'hidden',
  },
  waterProgressFill: {
      height: '100%',
      backgroundColor: '#3b82f6',
      borderRadius: 5,
  },
  addWaterBtn: {
      backgroundColor: '#3b82f6',
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderRadius: 18,
      shadowColor: '#3b82f6',
      shadowOpacity: 0.4,
      shadowRadius: 10,
      elevation: 6,
  },
  addWaterText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 15,
  },

  uploadContainer: { 
    width: '100%',
    marginBottom: 24,
  },
  errorBox: { 
      backgroundColor: '#fef2f2',
      padding: 16,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#fecaca',
      marginBottom: 24,
      width: '100%',
  },
  errorText: { 
      color: '#dc2626',
      fontSize: 14,
      fontWeight: 'bold',
  },
  
  // Daily Section
  dailySection: {
    width: '100%',
    gap: 20,
    marginBottom: 32,
  },
  tipCard: {
    backgroundColor: '#fffbeb',
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: '#fcd34d',
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  tipIconBox: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 12,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#d97706',
  },
  tipText: {
    fontSize: 14,
    color: '#b45309',
    fontWeight: '600',
    lineHeight: 22,
  },
  dishCard: {
    backgroundColor: '#18181b',
    borderRadius: 28,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dishContent: {
    flex: 1,
    paddingRight: 16,
  },
  dishBadge: {
    backgroundColor: '#3f3f46',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    marginBottom: 10,
  },
  dishBadgeText: {
    color: '#10b981',
    fontSize: 11,
    fontWeight: '900',
  },
  dishTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  dishDesc: {
    fontSize: 13,
    color: '#a1a1aa',
    lineHeight: 18,
  },
  dishIconBox: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: '#27272a',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#3f3f46',
  },

  // Features
  sectionTitle: { 
    fontSize: 20,
    fontWeight: '900',
    color: '#18181b',
  },
  featuresContainer: { 
    width: '100%',
  },
  sectionHeader: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  seeAllText: { 
    fontSize: 14,
    color: '#10b981',
    fontWeight: 'bold',
  },
  featuresScroll: { 
      gap: 16,
      paddingBottom: 24,
      paddingRight: 24,
  },
  featureCard: { 
      width: 170, 
      height: 160,
      backgroundColor: '#fff',
      borderRadius: 28,
      padding: 20,
      borderWidth: 1,
      borderColor: '#f4f4f5',
      justifyContent: 'space-between',
  },
  featureCardHeader: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  featureIcon: { 
      width: 48,
      height: 48,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
  },
  featureTitle: { 
      fontSize: 16,
      fontWeight: '800',
      color: '#18181b',
      marginBottom: 6,
  },
  featureDesc: { 
      fontSize: 12,
      color: '#71717a',
      lineHeight: 18,
      fontWeight: '500',
  },
  resultContainer: { 
      width: '100%',
      paddingBottom: 100, 
  },
  resultContent: { 
      marginTop: 16,
  },
  imageHeader: { 
      width: '100%',
      height: 240,
      borderRadius: 24,
      overflow: 'hidden',
      position: 'relative',
      marginBottom: 8,
      backgroundColor: '#fff',
  },
  scannedImage: { 
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
  },
  imageOverlay: { 
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.2)',
  },
  closeBtn: { 
      position: 'absolute',
      top: 16,
      right: 16,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(0,0,0,0.4)',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.2)',
  },
  actionBar: { 
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginTop: 24,
      marginBottom: 32,
  },
  actionBtnPrimary: { 
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      backgroundColor: '#10b981',
      paddingVertical: 16,
      borderRadius: 20,
  },
  actionBtnTextPrimary: { 
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
  },
  actionBtnSecondary: { 
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      backgroundColor: '#fee2e2',
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 20,
  },
  actionBtnTextSecondary: { 
      color: '#ef4444',
      fontWeight: 'bold',
      fontSize: 14,
  },
});
