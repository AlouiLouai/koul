import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Animated, Easing, Alert } from 'react-native';
import { Trash2, CheckCircle2, RefreshCcw, Droplets, Camera, Image as ImageIcon } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import ImageUpload from '../../components/ImageUpload';
import AnalysisResult from '../../components/AnalysisResult';
import { GlassView } from '../../components/GlassView';
import { useTheme } from '../../theme/ThemeContext';
import { SuccessModal } from '../../components/SuccessModal';
import { HeroSection } from './components/HeroSection';
import { WaterTracker } from './components/WaterTracker';
import { DailyChallenge } from './components/DailyChallenge';
import { TipCard } from './components/TipCard';
import { TrendingDishCard } from './components/TrendingDishCard';
import { FeaturesList } from './components/FeaturesList';
import type { AnalysisResponse } from '../../types';

// --- Sub-Component: Result View ---
interface ResultViewProps {
  result: AnalysisResponse;
  currentImage: string | null;
  onReset: () => void;
  onLogMeal: () => void;
  opacity: Animated.Value;
}

const ResultView = ({ result, currentImage, onReset, onLogMeal, opacity }: ResultViewProps) => {
  const { colors } = useTheme();
  
  const translateY = opacity.interpolate({ 
    inputRange: [0, 1], 
    outputRange: [20, 0] 
  });

  return (
    <Animated.View style={[styles.resultContainer, { flex: 1, opacity, transform: [{ translateY }] }]}> 
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        
        {currentImage && (
            <GlassView style={styles.imageHeader} intensity={20} borderRadius={24} noBorder> 
                <Image source={{ uri: currentImage }} style={styles.scannedImage} resizeMethod="resize" /> 
                <View style={styles.imageOverlay} /> 
                <TouchableOpacity onPress={onReset} style={styles.closeBtn}>
                  <RefreshCcw size={20} color="#fff" />
                </TouchableOpacity>
            </GlassView>
        )}

        <View style={styles.resultContent}>
          <AnalysisResult data={result} />
        </View>

        <View style={styles.actionBar}> 
           <TouchableOpacity 
              style={[styles.actionBtnSecondary, styles.shadowSoft]} 
              onPress={onReset}
           > 
              <Trash2 size={20} color="#ef4444" /> 
              <Text style={styles.actionBtnTextSecondary}>Fasakh</Text> 
           </TouchableOpacity>
           
           <TouchableOpacity 
              style={[styles.actionBtnPrimary, styles.shadowMedium, { backgroundColor: colors.primary }]} 
              onPress={onLogMeal}
           >
              <CheckCircle2 size={20} color="#fff" /> 
              <Text style={styles.actionBtnTextPrimary}>Kayed Fatourek</Text> 
           </TouchableOpacity>
        </View>

      </ScrollView>
    </Animated.View>
  );
};

// --- Main Component: HomeUI ---
interface HomeUIProps {
  loading: boolean;
  result: AnalysisResponse | null;
  currentImage: string | null;
  error: string | null;
  onImageSelected: (uri: string, type: string, fileName: string) => void;
  onReset: () => void;
  onLogMeal: () => void;
  isGuest?: boolean;
  onTriggerAuth?: () => void;
}

export const HomeUI = ({ 
  loading, 
  result, 
  currentImage, 
  error, 
  onImageSelected, 
  onReset, 
  onLogMeal,
  isGuest = false,
  onTriggerAuth
}: HomeUIProps) => { 
  
  const { colors } = useTheme();
  const [showWaterModal, setShowWaterModal] = useState(false);
  const [showCameraChoice, setShowCameraChoice] = useState(false);
  const resultOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (result) {
      Animated.timing(resultOpacity, { 
        toValue: 1, 
        duration: 500, 
        useNativeDriver: true, 
        easing: Easing.out(Easing.quad) 
      }).start();
    } else {
      resultOpacity.setValue(0);
    }
  }, [result]);

  const handleUploadStart = () => {
      // If guest, trigger auth (handled by parent logic usually, but here we can check too)
      if (isGuest && onTriggerAuth) {
          onTriggerAuth();
          return;
      }
      setShowCameraChoice(true);
  };

  const handleCamera = async () => {
      setShowCameraChoice(false);
      try {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync();
        if (!granted) {
            Alert.alert("Permission required", "Lazmek ta3tina permission l'camera.");
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.8,
        });
        if (!result.canceled && result.assets && result.assets.length > 0) {
            onImageSelected(result.assets[0].uri, 'image/jpeg', 'camera_capture.jpg');
        }
      } catch (error) {
          Alert.alert('Error', 'Could not take photo');
      }
  };

  const handleGallery = async () => {
      setShowCameraChoice(false);
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.8,
        });
        if (!result.canceled && result.assets && result.assets.length > 0) {
            onImageSelected(result.assets[0].uri, 'image/jpeg', result.assets[0].fileName || 'upload.jpg');
        }
      } catch (error) {
          Alert.alert('Error', 'Could not pick image');
      }
  };

  if (result) {
    return (
      <ResultView 
        result={result} 
        currentImage={currentImage} 
        onReset={onReset} 
        onLogMeal={onLogMeal} 
        opacity={resultOpacity} 
      />
    );
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.webContentContainer} showsVerticalScrollIndicator={false} bounces={false}> 
        <HeroSection />

        <View style={styles.uploadContainer}>
          <ImageUpload 
            onImageSelected={onImageSelected} 
            isLoading={loading} 
            onPressStart={handleUploadStart}
          />
        </View>

        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* --- BENTO GRID LAYOUT --- */}
        <View style={styles.bentoGrid}>
            <View style={styles.leftCol}>
               <WaterTracker 
                  onGoalReached={() => setShowWaterModal(true)} 
                  isGuest={isGuest} 
                  onTriggerAuth={onTriggerAuth} 
               />
            </View>

            <View style={styles.rightCol}>
               <DailyChallenge />
               <TipCard />
            </View>
        </View>

        <View style={styles.sectionSpacing}>
          <TrendingDishCard />
        </View>

        <View style={styles.featuresContainer}> 
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>3lech KOUL?</Text>
          </View>
          <FeaturesList />
        </View>
        
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Water Success Modal */}
      <SuccessModal 
        visible={showWaterModal} 
        onClose={() => setShowWaterModal(false)}
        title="Sa7a w Bechfé! 🌊"
        message={<Text>M3allem! Kamelt <Text style={{color: colors.primary, fontWeight: '900'}}>3 Litrat</Text> kamla lyoum.</Text>}
        icon={<Droplets size={40} color="#fff" fill="#fff" />}
        btnText="Tayara, Yar7em Weldik!"
        onButtonPress={() => setShowWaterModal(false)}
        badges={[
            { text: "+50 XP", color: colors.primary, bg: colors.primary + '15' },
            { text: "Goal Reached", color: colors.success, bg: colors.success + '15' }
        ]}
      />

      {/* Camera Choice Modal */}
      <SuccessModal 
        visible={showCameraChoice} 
        onClose={() => setShowCameraChoice(false)}
        title="Sawar Sahnek 📸"
        message="Kifech t7eb t3adi taswira?"
        icon={<Camera size={40} color="#fff" />}
        btnText="Camera (Sawar)"
        onButtonPress={handleCamera}
        secondaryBtnText="Galerie (Telechargi)"
        onSecondaryPress={handleGallery}
      />
    </>
  );
};

const styles = StyleSheet.create({
  webContentContainer: { paddingBottom: 20 },
  shadowSoft: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 12, elevation: 2 },
  shadowMedium: { shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 20, elevation: 6 },
  
  uploadContainer: { width: '100%', marginBottom: 24 },
  errorBox: { backgroundColor: '#fef2f2', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#fecaca', marginBottom: 24, width: '100%' },
  errorText: { color: '#dc2626', fontSize: 14, fontWeight: 'bold' },
  
  // BENTO GRID
  bentoGrid: { flexDirection: 'row', gap: 12, marginBottom: 24, width: '100%' },
  leftCol: { flex: 1 },
  rightCol: { flex: 1, gap: 12 },
  sectionSpacing: { width: '100%', marginBottom: 24 },

  sectionTitle: { fontSize: 20, fontWeight: '900' },
  featuresContainer: { width: '100%' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingHorizontal: 4 },
  
  // Result View Styles
  resultContainer: { width: '100%', paddingBottom: 100 },
  resultContent: { marginTop: 16 },
  imageHeader: { width: '100%', height: 240, borderRadius: 24, overflow: 'hidden', position: 'relative', marginBottom: 8, backgroundColor: '#fff' },
  scannedImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  imageOverlay: { 
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)' 
  },
  closeBtn: { position: 'absolute', top: 16, right: 16, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  actionBar: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 24, marginBottom: 32 },
  actionBtnPrimary: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, borderRadius: 20 },
  actionBtnTextPrimary: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  actionBtnSecondary: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#fee2e2', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 20 },
  actionBtnTextSecondary: { color: '#ef4444', fontWeight: 'bold', fontSize: 14 },
});

export default HomeUI;