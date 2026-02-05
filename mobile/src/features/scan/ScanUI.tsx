import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, Dimensions, Easing, ScrollView } from 'react-native';
import { Image as ImageIcon, Trash2, CheckCircle2, Camera as CameraIcon, Scan, ChevronLeft, Upload, Sparkles } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { BlurView } from 'expo-blur';
import { GlassView } from '../../components/GlassView';
import { useTheme } from '../../theme/ThemeContext';
import AnalysisResult from '../../components/AnalysisResult';
import { LogSuccessModal } from '../../components/LogSuccessModal';
import type { AnalysisResponse } from '../../types';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

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

const Skeleton = ({ height, width = '100%', borderRadius = 24, style }: any) => {
    const opacity = useRef(new Animated.Value(0.3)).current;
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, { toValue: 0.6, duration: 1200, useNativeDriver: true }),
                Animated.timing(opacity, { toValue: 0.3, duration: 1200, useNativeDriver: true }),
            ])
        ).start();
    }, []);
    return <Animated.View style={[{ width, height, borderRadius, backgroundColor: 'rgba(150,150,150,0.1)', opacity }, style]} />;
};

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
  
  // Loading State Animations
  const [minLoadFinished, setMinLoadFinished] = useState(true);
  const [scanMessage, setScanMessage] = useState("3maliyet el ta7lil...");
  const scanningProgress = useRef(new Animated.Value(0)).current;
  const beamAnim = useRef(new Animated.Value(0)).current;
  
  // Floating & Rotating Animations
  const floatAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: 1, duration: 2000, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
        Animated.timing(floatAnim, { toValue: 0, duration: 2000, useNativeDriver: true, easing: Easing.inOut(Easing.sin) })
      ])
    ).start();

    Animated.loop(
      Animated.timing(rotateAnim, { toValue: 1, duration: 8000, useNativeDriver: true, easing: Easing.linear })
    ).start();
  }, []);

  useEffect(() => {
      if (loading) {
          setMinLoadFinished(false);
          scanningProgress.setValue(0);
          Animated.loop(
            Animated.sequence([
                Animated.timing(beamAnim, { toValue: 1, duration: 2000, useNativeDriver: true, easing: Easing.inOut(Easing.quad) }),
                Animated.timing(beamAnim, { toValue: 0, duration: 2000, useNativeDriver: true, easing: Easing.inOut(Easing.quad) })
            ])
          ).start();

          Animated.timing(scanningProgress, { toValue: 1, duration: 7000, useNativeDriver: false, easing: Easing.linear }).start();
          setTimeout(() => setScanMessage("9a3ed nthabet f'moukawinet..."), 1500);
          setTimeout(() => setScanMessage("Na7seb f'calories w protein..."), 3500);
          setTimeout(() => setScanMessage("Nthabet ken thamma zit mkhabbi... 🕵️‍♂️"), 5500);

          setTimeout(() => setMinLoadFinished(true), 7000);
      }
  }, [loading]);

  const showResult = result && minLoadFinished;
  const showLoading = loading || (result && !minLoadFinished);

  const handleCapture = async () => {
    if (!cameraPermission?.granted) {
      const permission = await requestCameraPermission();
      if (!permission.granted) return;
    }
    try {
      const res = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
        const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, quality: 0.7 });
        if (!res.canceled && res.assets) {
            onImageSelected(res.assets[0].uri, 'image/jpeg', 'upload.jpg');
        }
      } catch (e) {}
  };

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background[0] }]}>
        <ScrollView style={styles.resultScroll} contentContainerStyle={{ paddingBottom: 120, paddingTop: 10 }} showsVerticalScrollIndicator={false}>
            <View style={styles.resultCardWrapper}>
                
                {/* 1. COMPACT HERO SCAN BLOCK */}
                <View style={styles.previewCard}>
                    {currentImage ? (
                        <>
                            <Image source={{ uri: currentImage }} style={styles.previewImage} />
                            {showLoading && (
                                <>
                                    <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
                                    <Animated.View style={[styles.scanningBeam, { backgroundColor: colors.primary, transform: [{ translateY: beamAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 280] }) }] }]} />
                                    <View style={styles.loadingInfoSmall}>
                                        <Text style={styles.loadingTitleSmall}>Ta7lil AI...</Text>
                                        <Text style={styles.loadingMsgSmall}>{scanMessage}</Text>
                                        <View style={styles.progressContainerSmall}>
                                            <Animated.View style={[styles.progressBar, { backgroundColor: colors.primary, width: scanningProgress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }]} />
                                        </View>
                                    </View>
                                </>
                            )}
                            <TouchableOpacity onPress={onReset} style={styles.imageOverlayBtn}>
                                <GlassView intensity={40} borderRadius={20} style={styles.backBtn}>
                                    <ChevronLeft size={24} color="#fff" />
                                </GlassView>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <GlassView style={styles.uploadBlock} intensity={15} borderRadius={36}>
                            <View style={styles.uploadContent}>
                                <Animated.View style={[styles.heroIconContainer, { transform: [{ translateY }] }]}>
                                    <Animated.View style={[styles.rotateRing, { transform: [{ rotate: spin }] }]}>
                                        <View style={[styles.dot, { backgroundColor: colors.accent, top: -4 }]} />
                                    </Animated.View>
                                    <View style={[styles.iconCircle, { backgroundColor: colors.primary + '10' }]}>
                                       <CameraIcon size={32} color={colors.primary} strokeWidth={2} />
                                       <View style={styles.sparkleDot}>
                                          <Sparkles size={14} color={colors.accent} fill={colors.accent} />
                                       </View>
                                    </View>
                                </Animated.View>

                                <Text style={[styles.uploadTitle, { color: colors.text }]}>Sawar Sa7nek</Text>
                                <Text style={[styles.uploadSubtitle, { color: colors.textSecondary }]}>
                                    Iktachef chnoua mkhabbi f'makeltek 🇹🇳
                                </Text>
                                
                                <View style={styles.uploadActions}>
                                    <TouchableOpacity 
                                        style={[styles.mainAction, { backgroundColor: colors.primary }]} 
                                        onPress={handleCapture}
                                        activeOpacity={0.8}
                                    >
                                        <CameraIcon size={20} color="#fff" strokeWidth={2.5} />
                                        <Text style={styles.mainActionText}>Sawar Tawa</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity 
                                        style={[styles.secondaryAction, { backgroundColor: colors.primary + '08' }]} 
                                        onPress={handleGallery}
                                        activeOpacity={0.7}
                                    >
                                        <ImageIcon size={18} color={colors.primary} />
                                        <Text style={[styles.secondaryActionText, { color: colors.primary }]}>Gallerie</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </GlassView>
                    )}
                </View>

                {/* 2. SKELETONS / RESULTS */}
                {showResult ? (
                    <AnalysisResult data={result!} />
                ) : (
                    <View style={styles.skeletonWrapper}>
                        <Skeleton height={130} style={{ marginBottom: 12 }} />
                        <View style={styles.macroGridSkeleton}>
                            <Skeleton height={85} width="31%" />
                            <Skeleton height={85} width="31%" />
                            <Skeleton height={85} width="31%" />
                        </View>
                        <Skeleton height={55} borderRadius={16} style={{ marginBottom: 10 }} />
                        <Skeleton height={90} borderRadius={24} style={{ marginBottom: 20 }} />
                        <View style={{ gap: 10 }}>
                            <Skeleton height={20} width="40%" style={{ marginBottom: 6 }} />
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                                <Skeleton height={120} width="48%" borderRadius={16} />
                                <Skeleton height={120} width="48%" borderRadius={16} />
                            </View>
                        </View>
                    </View>
                )}

                {showResult && (
                    <View style={styles.actionBar}> 
                        <TouchableOpacity style={[styles.actionBtnSecondary, { borderColor: colors.error }]} onPress={onReset}> 
                            <Trash2 size={20} color={colors.error} /> 
                            <Text style={[styles.actionBtnTextSecondary, { color: colors.error }]}>Fasakh</Text> 
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionBtnPrimary, { backgroundColor: colors.accent }]} onPress={onLogMeal}>
                            <CheckCircle2 size={20} color="#fff" /> 
                            <Text style={styles.actionBtnTextPrimary}>Kayed Fatourek</Text> 
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </ScrollView>
        <LogSuccessModal visible={showLogSuccess} onClose={onCloseLogSuccess} onViewStats={onViewStats} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  resultScroll: { flex: 1 },
  resultCardWrapper: { paddingHorizontal: 20 },
  previewCard: { height: 300, borderRadius: 36, overflow: 'hidden', marginBottom: 16 },
  previewImage: { width: '100%', height: '100%' },
  imageOverlayBtn: { position: 'absolute', top: 16, left: 16 },
  backBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  
  // Compact Hero Block
  uploadBlock: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  uploadContent: { alignItems: 'center', paddingVertical: 16, width: '100%' },
  heroIconContainer: { marginBottom: 16, position: 'relative', alignItems: 'center', justifyContent: 'center' },
  rotateRing: { position: 'absolute', width: 90, height: 90, borderRadius: 45, borderWidth: 1.5, borderColor: 'rgba(150,150,150,0.1)', borderStyle: 'dashed', alignItems: 'center' },
  dot: { position: 'absolute', width: 8, height: 8, borderRadius: 4 },
  iconCircle: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center' },
  sparkleDot: { position: 'absolute', top: 2, right: 2, backgroundColor: '#fff', borderRadius: 10, padding: 3, elevation: 2 },
  uploadTitle: { fontSize: 24, fontWeight: '900', marginBottom: 4, letterSpacing: -0.5 },
  uploadSubtitle: { fontSize: 13, fontWeight: '600', textAlign: 'center', marginBottom: 24, opacity: 0.7 },
  uploadActions: { width: '85%', gap: 10 },
  mainAction: { flexDirection: 'row', height: 54, borderRadius: 20, alignItems: 'center', justifyContent: 'center', gap: 10, elevation: 4 },
  mainActionText: { color: '#fff', fontWeight: '900', fontSize: 16 },
  secondaryAction: { flexDirection: 'row', height: 48, borderRadius: 18, alignItems: 'center', justifyContent: 'center', gap: 8 },
  secondaryActionText: { fontWeight: '800', fontSize: 14 },

  // Skeletons
  skeletonWrapper: { gap: 14 },
  macroGridSkeleton: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },

  // Loading
  loadingInfoSmall: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 24 },
  loadingTitleSmall: { color: '#fff', fontSize: 18, fontWeight: '900', textAlign: 'center' },
  loadingMsgSmall: { color: 'rgba(255,255,255,0.7)', fontSize: 13, textAlign: 'center', marginTop: 4, marginBottom: 12 },
  progressContainerSmall: { width: '70%', height: 3, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 1.5, overflow: 'hidden' },
  progressBar: { height: '100%' },
  scanningBeam: { position: 'absolute', left: 0, right: 0, height: 4, zIndex: 5, opacity: 0.8 },

  // Results
  actionBar: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 16 },
  actionBtnPrimary: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 16, borderRadius: 20 },
  actionBtnTextPrimary: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  actionBtnSecondary: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, paddingHorizontal: 24, borderRadius: 20, borderWidth: 1.5 },
  actionBtnTextSecondary: { fontWeight: 'bold', fontSize: 14 },
});