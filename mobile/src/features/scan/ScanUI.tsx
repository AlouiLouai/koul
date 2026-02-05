import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, ScrollView, Platform } from 'react-native';
import { Trash2, CheckCircle2, ChevronLeft } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { MediaType } from 'expo-image-picker';
import { GlassView } from '../../components/GlassView';
import { useTheme } from '../../theme/ThemeContext';
import AnalysisResult from '../../components/AnalysisResult';
import { LogSuccessModal } from '../../components/LogSuccessModal';
import { ScanHero } from './components/ScanHero';
import { ScanLoading } from './components/ScanLoading';
import type { AnalysisResponse } from '../../types';

interface ScanUIProps {
  loading: boolean;
  result: AnalysisResponse | null;
  currentImage: string | null;
  error: string | null;
  onImageSelected: (uri: string, type: string, fileName: string) => void;
  onReset: () => void;
  onLogMeal: () => void;
  showLogSuccess: boolean;
  onCloseLogSuccess: () => void;
  onViewStats: () => void;
}

export const ScanUI = ({ 
  loading, 
  result, 
  currentImage, 
  onImageSelected, 
  onReset, 
  onLogMeal,
  showLogSuccess,
  onCloseLogSuccess,
  onViewStats
}: ScanUIProps) => { 
  
  const { colors } = useTheme();
  const [cameraPermission, requestCameraPermission] = ImagePicker.useCameraPermissions();
  
  // Animation Values
  const [scanMessage, setScanMessage] = useState("3maliyet el ta7lil...");
  const scanningProgress = useRef(new Animated.Value(0)).current;
  const beamAnim = useRef(new Animated.Value(0)).current;

  // Button Entrance Animations
  const buttonsOpacity = useRef(new Animated.Value(0)).current;
  const buttonsTranslateY = useRef(new Animated.Value(30)).current;
  const logBtnScale = useRef(new Animated.Value(1)).current;
  const resetBtnScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
      if (result && !loading) {
          Animated.parallel([
              Animated.timing(buttonsOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
              Animated.spring(buttonsTranslateY, { toValue: 0, friction: 8, tension: 40, useNativeDriver: true })
          ]).start();
      } else {
          buttonsOpacity.setValue(0);
          buttonsTranslateY.setValue(30);
      }
  }, [result, loading]);

  const handlePressIn = (scaleVar: Animated.Value) => {
    Animated.spring(scaleVar, { toValue: 0.92, useNativeDriver: true, friction: 4, tension: 100 }).start();
  };

  const handlePressOut = (scaleVar: Animated.Value) => {
    Animated.spring(scaleVar, { toValue: 1, useNativeDriver: true, friction: 4, tension: 100 }).start();
  };

  useEffect(() => {
      if (loading) {
          scanningProgress.setValue(0);
          
          Animated.loop(
            Animated.sequence([
                Animated.timing(beamAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
                Animated.timing(beamAnim, { toValue: 0, duration: 2000, useNativeDriver: true })
            ])
          ).start();

          // Smooth progress animation while waiting for API
          Animated.timing(scanningProgress, { toValue: 0.9, duration: 15000, useNativeDriver: false }).start();
          
          const msg1 = setTimeout(() => setScanMessage("9a3ed nthabet f'moukawinet..."), 2000);
          const msg2 = setTimeout(() => setScanMessage("Na7seb f'calories w protein..."), 5000);
          
          return () => {
              clearTimeout(msg1);
              clearTimeout(msg2);
          };
      } else {
          scanningProgress.setValue(1);
      }
  }, [loading]);

  const handleCapture = async () => {
    if (!cameraPermission?.granted) {
      const permission = await requestCameraPermission();
      if (!permission.granted) return;
    }
    try {
      const res = await ImagePicker.launchCameraAsync({
        mediaTypes: MediaType.Images,
        allowsEditing: true,
        quality: 0.7,
      });
      if (!res.canceled && res.assets) {
        onImageSelected(res.assets[0].uri, 'image/jpeg', 'capture.jpg');
      }
    } catch (e) { console.log(e); }
  };

  const handleGallery = async () => {
      try {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sma7na, n7atjou permission bch na7lou el gallery! 📸');
          return;
        }

        const res = await ImagePicker.launchImageLibraryAsync({ 
          mediaTypes: ['images'], 
          allowsEditing: true, 
          quality: 0.7 
        });
        
        if (!res.canceled && res.assets) {
            onImageSelected(res.assets[0].uri, 'image/jpeg', 'upload.jpg');
        }
      } catch (e) {
        console.error('Gallery Error:', e);
      }
  };

  return (
    <View style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={styles.padding}>
                
                <View style={[styles.imageContainer, { height: (currentImage && !loading) ? 220 : 500 }]}>
                    {currentImage ? (
                        <>
                            <Image source={{ uri: currentImage }} style={styles.fullImage} />
                            {!loading && (
                                <TouchableOpacity onPress={onReset} style={styles.backBtn}>
                                    <GlassView intensity={40} borderRadius={20} style={styles.iconBtn}>
                                        <ChevronLeft size={24} color="#fff" />
                                    </GlassView>
                                </TouchableOpacity>
                            )}
                        </>
                    ) : (
                        <GlassView intensity={20} borderRadius={36} style={styles.heroWrapper}>
                            <ScanHero onCapture={handleCapture} onGallery={handleGallery} />
                        </GlassView>
                    )}
                </View>

                {loading && (
                    <ScanLoading 
                        scanMessage={scanMessage} 
                        scanningProgress={scanningProgress} 
                        beamAnim={beamAnim}
                        backgroundImage={currentImage}
                    />
                )}

                {result && !loading && (
                    <View style={styles.resultAnimationWrapper}>
                        <AnalysisResult data={result} />
                        
                        <Animated.View style={[
                            styles.actionRow, 
                            { opacity: buttonsOpacity, transform: [{ translateY: buttonsTranslateY }] }
                        ]}> 
                            <TouchableOpacity 
                              style={styles.resetBtnWrapper} 
                              onPress={onReset}
                              onPressIn={() => handlePressIn(resetBtnScale)}
                              onPressOut={() => handlePressOut(resetBtnScale)}
                              activeOpacity={1}
                            > 
                                <Animated.View style={{ transform: [{ scale: resetBtnScale }] }}>
                                    <View style={[styles.resetBtn, { borderColor: colors.error }]}>
                                        <Trash2 size={22} color={colors.error} /> 
                                        <Text style={[styles.resetText, { color: colors.error }]}>Fasakh</Text> 
                                    </View>
                                </Animated.View>
                            </TouchableOpacity>

                            <TouchableOpacity 
                              style={styles.logBtnWrapper} 
                              onPress={onLogMeal}
                              onPressIn={() => handlePressIn(logBtnScale)}
                              onPressOut={() => handlePressOut(logBtnScale)}
                              activeOpacity={1}
                            >
                                <Animated.View style={{ transform: [{ scale: logBtnScale }] }}>
                                    <View style={[styles.logBtn, { backgroundColor: '#e11d48' }]}>
                                        <CheckCircle2 size={22} color="#fff" strokeWidth={2} /> 
                                        <Text style={styles.logText}>Kayed Fatourek</Text> 
                                    </View>
                                </Animated.View>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                )}
            </View>
        </ScrollView>
        <LogSuccessModal 
            visible={showLogSuccess} 
            onClose={onCloseLogSuccess} 
            onViewStats={onViewStats} 
            onAddMore={onReset}
        />
    </View>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollView: { flex: 1 },
    scrollContent: { paddingBottom: 140, paddingTop: 10 },
    padding: { paddingHorizontal: 20 },
    imageContainer: { borderRadius: 32, overflow: 'hidden', marginBottom: 16, elevation: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.25, shadowRadius: 15 },
    fullImage: { width: '100%', height: '100%' },
    backBtn: { position: 'absolute', top: 12, left: 12 },
    iconBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
    heroWrapper: { width: '100%', height: '100%' },
    resultAnimationWrapper: { width: '100%' },
    actionRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 24, marginBottom: 40 },
    resetBtnWrapper: { flex: 0.4 },
    resetBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 18, borderWidth: 2, borderRadius: 24 },
    resetText: { fontWeight: '900', fontSize: 16 },
    logBtnWrapper: { flex: 0.6 },
    logBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 18, borderRadius: 24 },
    logText: { color: '#fff', fontWeight: '900', fontSize: 16 }
});