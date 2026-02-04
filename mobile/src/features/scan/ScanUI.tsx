import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, Dimensions, StatusBar, Easing } from 'react-native';
import { Image as ImageIcon, Zap, ZapOff, Trash2, CheckCircle2, Camera } from 'lucide-react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { GlassView } from '../../components/GlassView';
import { useTheme } from '../../theme/ThemeContext';
import AnalysisResult from '../../components/AnalysisResult';
import { LogSuccessModal } from '../../components/LogSuccessModal';
import type { AnalysisResponse } from '../../types';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 100;

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
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [flash, setFlash] = useState<'off' | 'on'>('off');
  
  // Loading State with Artificial Delay
  const [minLoadFinished, setMinLoadFinished] = useState(true);
  const [scanMessage, setScanMessage] = useState("Analyzing...");
  const scanningProgress = useRef(new Animated.Value(0)).current;

  // Animations
  const shutterScale = useRef(new Animated.Value(1)).current;
  const focusScale = useRef(new Animated.Value(1.2)).current;
  const resultSlide = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const rotateSlow = useRef(new Animated.Value(0)).current;
  const rotateFast = useRef(new Animated.Value(0)).current;

  useEffect(() => {
      if (loading) {
          setMinLoadFinished(false);
          scanningProgress.setValue(0);
          
          // 7s Progress Animation
          Animated.timing(scanningProgress, {
              toValue: 1,
              duration: 7000,
              useNativeDriver: false,
              easing: Easing.linear
          }).start();

          // Message Sequence
          setTimeout(() => setScanMessage("Detecting ingredients..."), 1500);
          setTimeout(() => setScanMessage("Calculating macros..."), 3500);
          setTimeout(() => setScanMessage("Checking for hidden oil... 🕵️‍♂️"), 5500);

          // Finish after 7s
          const timer = setTimeout(() => {
              setMinLoadFinished(true);
          }, 7000);
          return () => clearTimeout(timer);
      }
  }, [loading]);

  const showResult = result && minLoadFinished;
  const showLoading = loading || (result && !minLoadFinished);

  // Initial Entrance Animation
  useEffect(() => {
    Animated.spring(focusScale, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
    }).start();

    // Lens Rotations
    Animated.loop(
      Animated.timing(rotateSlow, { toValue: 1, duration: 12000, useNativeDriver: true, easing: Easing.linear })
    ).start();

    Animated.loop(
      Animated.timing(rotateFast, { toValue: 1, duration: 4000, useNativeDriver: true, easing: Easing.linear })
    ).start();
  }, []);

  const spinSlow = rotateSlow.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const spinFast = rotateFast.interpolate({ inputRange: [0, 1], outputRange: ['360deg', '0deg'] });

  // Result Transition
  useEffect(() => {
    if (result) {
        Animated.spring(resultSlide, {
            toValue: 0,
            friction: 10,
            tension: 60,
            useNativeDriver: true,
        }).start();
    } else {
        Animated.timing(resultSlide, {
            toValue: SCREEN_HEIGHT,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }
  }, [result]);

  const toggleFlash = () => {
    setFlash(prev => prev === 'off' ? 'on' : 'off');
  };

  const handleCapturePressIn = () => {
    Animated.spring(shutterScale, { toValue: 0.9, useNativeDriver: true }).start();
  };

  const handleCapturePressOut = () => {
    Animated.spring(shutterScale, { toValue: 1, useNativeDriver: true }).start();
    handleCapture();
  };

  const handleCapture = async () => {
      if (cameraRef.current && !loading) {
          try {
              const photo = await cameraRef.current.takePictureAsync({ 
                  quality: 0.8, 
                  skipProcessing: true 
              });
              if (photo) {
                  onImageSelected(photo.uri, 'image/jpeg', 'capture.jpg');
              }
          } catch (e) {
              console.log(e);
          }
      }
  };

  const handleGallery = async () => {
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
            allowsEditing: true,
            quality: 0.8,
        });
        if (!result.canceled && result.assets) {
            onImageSelected(result.assets[0].uri, 'image/jpeg', 'upload.jpg');
        }
      } catch (e) {}
  };

  // Permission Check
  if (!permission) return <View style={{flex:1, backgroundColor: '#000'}} />;
  if (!permission.granted) {
    return (
        <View style={styles.permContainer}>
            <Text style={[styles.permText, { color: colors.text }]}>Camera access is required.</Text>
            <TouchableOpacity onPress={requestPermission} style={[styles.permBtn, { backgroundColor: colors.primary }]}>
                <Text style={styles.permBtnText}>Grant Access</Text>
            </TouchableOpacity>
        </View>
    );
  }

  // Render Result View (Overlay)
  if (showResult) {
      return (
        <View style={[styles.container, { backgroundColor: colors.background[0] }]}>
            <Animated.ScrollView 
                style={[styles.resultScroll, { transform: [{ translateY: resultSlide }] }]}
                contentContainerStyle={{ paddingBottom: 180, paddingTop: 40 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Main Content */}
                <View style={styles.resultCardWrapper}>
                    {/* The Image Card */}
                    {currentImage && (
                        <View style={styles.previewCard}>
                            <Image source={{ uri: currentImage }} style={styles.previewImage} />
                            <TouchableOpacity onPress={onReset} style={styles.imageOverlayBtn}>
                                <GlassView intensity={40} borderRadius={20} style={[styles.iconBtn, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
                                    <Camera size={24} color="#fff" />
                                </GlassView>
                            </TouchableOpacity>
                        </View>
                    )}
                    
                    {/* Analysis Component */}
                    <AnalysisResult data={result} />

                    {/* Action Buttons (Inline) */}
                    <View style={styles.actionBar}> 
                        <TouchableOpacity 
                            style={[styles.actionBtnSecondary, { borderColor: colors.error, backgroundColor: 'transparent', borderWidth: 1 }]} 
                            onPress={onReset}
                        > 
                            <Trash2 size={20} color={colors.error} /> 
                            <Text style={[styles.actionBtnTextSecondary, { color: colors.error }]}>Fasakh</Text> 
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={[styles.actionBtnPrimary, styles.shadowMedium, { backgroundColor: colors.accent }]} 
                            onPress={onLogMeal}
                        >
                            <CheckCircle2 size={20} color="#fff" /> 
                            <Text style={styles.actionBtnTextPrimary}>Kayed Fatourek</Text> 
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.ScrollView>

            <LogSuccessModal visible={showLogSuccess} onClose={onCloseLogSuccess} onViewStats={onViewStats} />
        </View>
      );
  }

  // Render Camera View
  return (
    <View style={[styles.container, { backgroundColor: colors.background[0] }]}>
        <StatusBar barStyle="light-content" />
        
        {/* Constrained Camera */}
        <CameraView 
            ref={cameraRef}
            style={[styles.cameraBase, { bottom: TAB_BAR_HEIGHT }]}
            facing="back"
            flash={flash}
        />

        {/* --- LOADING OVERLAY --- */}
        {showLoading && (
            <View style={[styles.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center', zIndex: 100 }]}>
                <View style={{ width: 200, height: 200, justifyContent: 'center', alignItems: 'center' }}>
                    <Animated.View style={[
                        styles.hudRingOuter, 
                        { 
                            borderColor: colors.accent,
                            transform: [{ rotate: spinSlow }, { scale: 1.2 }]
                        }
                    ]} />
                </View>
                <Text style={{ color: '#fff', fontSize: 16, marginTop: 32, fontWeight: '600' }}>{scanMessage}</Text>
                
                <View style={{ width: '70%', height: 4, backgroundColor: '#333', borderRadius: 2, marginTop: 20 }}>
                    <Animated.View style={{ 
                        height: '100%', 
                        backgroundColor: colors.accent, 
                        width: scanningProgress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) 
                    }} />
                </View>
            </View>
        )}

        {/* --- UI OVERLAYS --- */}
        
        {/* 1. Focus Area (Center) */}
        <View style={[styles.focusContainer, { marginBottom: TAB_BAR_HEIGHT }]}>
            {/* Lens Animation */}
            <View style={styles.lensWrapper}>
                <Animated.View style={[
                    styles.hudRingOuter, 
                    { 
                        borderColor: '#ffffff40',
                        transform: [{ rotate: spinSlow }]
                    }
                ]} />
                <Animated.View style={[
                    styles.hudRingInner, 
                    { 
                        borderTopColor: colors.accent,
                        borderBottomColor: colors.accent,
                        borderLeftColor: 'transparent',
                        borderRightColor: 'transparent',
                        transform: [{ rotate: spinFast }]
                    }
                ]} />
            </View>

            <Text style={styles.focusHint}>Warina Sa7nek 📸</Text>
        </View>

        {/* 2. Controls (Bottom - Above Tabs) */}
        <GlassView style={[styles.controlsBar, { bottom: TAB_BAR_HEIGHT }]} intensity={20} borderRadius={0} noBorder>
            
            {/* Gallery */}
            <TouchableOpacity onPress={handleGallery} style={styles.sideBtn}>
                <ImageIcon size={28} color="#fff" />
            </TouchableOpacity>

            {/* Shutter */}
            <TouchableOpacity 
                activeOpacity={1}
                onPressIn={handleCapturePressIn}
                onPressOut={handleCapturePressOut}
                disabled={loading}
            >
                <View style={[styles.shutterOuter, { borderColor: '#fff' }]}>
                    <Animated.View style={[
                        styles.shutterInner, 
                        { 
                            backgroundColor: loading ? colors.textSecondary : colors.accent,
                            transform: [{ scale: shutterScale }]
                        }
                    ]} />
                </View>
            </TouchableOpacity>

            {/* Flash */}
            <TouchableOpacity onPress={toggleFlash} style={styles.sideBtn}>
                {flash === 'on' ? (
                    <Zap size={28} color={colors.warning} fill={colors.warning} />
                ) : (
                    <ZapOff size={28} color="#fff" />
                )}
            </TouchableOpacity>

        </GlassView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  absoluteFill: { ...StyleSheet.absoluteFillObject },
  cameraBase: { position: 'absolute', top: 0, left: 0, right: 0 },
  
  // Permission
  permContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 },
  permText: { fontSize: 16, fontWeight: '600' },
  permBtn: { paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  permBtnText: { color: '#fff', fontWeight: 'bold' },

  // Camera Overlay
  focusContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  focusFrame: { width: 280, height: 280, borderWidth: 1, borderRadius: 30, opacity: 0.8 },
  focusHint: { color: '#fff', fontSize: 18, fontWeight: '900', marginTop: 24, textShadowColor: 'rgba(0,0,0,0.5)', textShadowRadius: 10 },
  
  lensWrapper: { position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -160 }, { translateY: -160 }], width: 320, height: 320, justifyContent: 'center', alignItems: 'center', pointerEvents: 'none' },
  hudRingOuter: { position: 'absolute', width: 320, height: 320, borderRadius: 160, borderWidth: 2, borderStyle: 'dashed' },
  hudRingInner: { position: 'absolute', width: 240, height: 240, borderRadius: 120, borderWidth: 4 },

  corner: { position: 'absolute', width: 20, height: 20, borderColor: '#fff', borderWidth: 4, borderRadius: 2 },
  tl: { top: -1, left: -1, borderRightWidth: 0, borderBottomWidth: 0 },
  tr: { top: -1, right: -1, borderLeftWidth: 0, borderBottomWidth: 0 },
  bl: { bottom: -1, left: -1, borderRightWidth: 0, borderTopWidth: 0 },
  br: { bottom: -1, right: -1, borderLeftWidth: 0, borderTopWidth: 0 },

  // Controls
  controlsBar: { 
      position: 'absolute', 
      left: 0, 
      right: 0, 
      height: 120, 
      flexDirection: 'row', 
      justifyContent: 'space-around', 
      alignItems: 'center', 
      backgroundColor: 'rgba(0,0,0,0.3)'
  },
  sideBtn: { width: 60, height: 60, justifyContent: 'center', alignItems: 'center' },
  shutterOuter: { width: 84, height: 84, borderRadius: 42, borderWidth: 4, padding: 4, justifyContent: 'center', alignItems: 'center' },
  shutterInner: { width: '100%', height: '100%', borderRadius: 40 },

  // Result View
  resultScroll: { flex: 1 },
  imageOverlayBtn: { position: 'absolute', top: 16, left: 16, zIndex: 10 },
  iconBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  resultCardWrapper: { paddingHorizontal: 20, gap: 20 },
  previewCard: { height: 300, borderRadius: 32, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 20, elevation: 10 },
  previewImage: { width: '100%', height: '100%' },
  
  floatingActions: {
      position: 'absolute',
      bottom: TAB_BAR_HEIGHT + 20,
      left: 20,
      right: 20,
      flexDirection: 'row',
      gap: 12,
  },
  discardBtn: { width: 60, height: 60 },
  discardInner: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fee2e2' },
  saveBtn: { flex: 1, height: 60, borderRadius: 24, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10, elevation: 5 },
  saveBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

  actionBar: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 24 },
  actionBtnPrimary: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, borderRadius: 20 },
  actionBtnTextPrimary: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  actionBtnSecondary: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, paddingHorizontal: 24, borderRadius: 20 },
  actionBtnTextSecondary: { fontWeight: 'bold', fontSize: 14 },
  shadowMedium: { shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 20, elevation: 6 },
});
