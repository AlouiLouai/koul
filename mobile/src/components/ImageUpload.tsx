import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Animated, Easing } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';

interface ImageUploadProps {
  onImageSelected: (uri: string, type: string, fileName: string) => void;
  isLoading?: boolean;
  onPressStart?: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected, isLoading, onPressStart }) => {
  const [isPressing, setIsPressing] = useState(false);
  const { colors } = useTheme();
  
  // Animations
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateSlow = useRef(new Animated.Value(0)).current;
  const rotateFast = useRef(new Animated.Value(0)).current;
  const scannerY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Idle Pulse (Breathing effect)
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 3000,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
      ])
    ).start();

    // 2. Slow Rotation (Outer Ring)
    Animated.loop(
      Animated.timing(rotateSlow, {
        toValue: 1,
        duration: 12000,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();

    // 3. Fast Rotation (Inner HUD)
    Animated.loop(
      Animated.timing(rotateFast, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();

    // 4. Scanner Line
    Animated.loop(
      Animated.sequence([
        Animated.timing(scannerY, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
        Animated.timing(scannerY, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.ease,
        })
      ])
    ).start();
  }, []);
  
  const normalizeAsset = (asset: ImagePicker.ImagePickerAsset) => ({
    uri: asset.uri,
    type: asset.mimeType ?? 'image/jpeg',
    fileName: asset.fileName ?? `upload-${Date.now()}.jpg`,
  });

  const takePhoto = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Permission required", "Lazmek ta3tina permission l'camera.");
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.7,
        aspect: [4, 3],
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const payload = normalizeAsset(result.assets[0]);
        onImageSelected(payload.uri, payload.type, payload.fileName);
      }
    } catch (error) {
      Alert.alert('Error', 'Could not take photo');
    }
  };

  const pickImage = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const hasAccess = permission.granted || permission.accessPrivileges === 'limited';
      if (!hasAccess) {
        Alert.alert("Permission required", "Lazmek ta3tina permission l'galerie.");
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.7,
        aspect: [4, 3],
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const payload = normalizeAsset(result.assets[0]);
        onImageSelected(payload.uri, payload.type, payload.fileName);
      }
    } catch (error) {
      Alert.alert('Error', 'Could not pick image');
    }
  };

  const handlePress = () => {
      if (onPressStart) {
          onPressStart();
          return;
      }
      // Default Fallback
      Alert.alert(
          "Sawar Sahnek 📸",
          "Kifech t7eb t3adiha?",
          [
              { text: "Camera (Sawar)", onPress: takePhoto },
              { text: "Galerie (Telechargi)", onPress: pickImage },
              { text: "Batel", style: "cancel" }
          ]
      );
  }

  const spinSlow = rotateSlow.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const spinFast = rotateFast.interpolate({ inputRange: [0, 1], outputRange: ['360deg', '0deg'] });
  const scanTranslate = scannerY.interpolate({ inputRange: [0, 1], outputRange: [-60, 60] });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handlePress}
        disabled={isLoading}
        activeOpacity={1}
        onPressIn={() => setIsPressing(true)}
        onPressOut={() => setIsPressing(false)}
      >
        <View 
            style={[styles.lensContainer, { borderColor: colors.glassBorder, borderRadius: 48, overflow: 'hidden' }]}
        >
            {/* --- LAYERS OF HOLOGRAPHIC LENS --- */}

            {/* 1. Base Grid (Static Background) */}
            <View style={styles.gridOverlay}>
                <View style={[styles.gridLineVertical, { backgroundColor: colors.textSecondary + '10' }]} />
                <View style={[styles.gridLineHorizontal, { backgroundColor: colors.textSecondary + '10' }]} />
            </View>

            {/* 2. Rotating Outer HUD Ring (Dashed) */}
            <Animated.View style={[
                styles.hudRingOuter, 
                { 
                    borderColor: colors.textSecondary,
                    transform: [{ rotate: spinSlow }, { scale: pulseAnim }],
                    opacity: 0.15
                }
            ]} />

            {/* 3. Rotating Inner HUD Ring (Techy) */}
            <Animated.View style={[
                styles.hudRingInner, 
                { 
                    borderTopColor: colors.primary,
                    borderBottomColor: colors.primary,
                    borderLeftColor: 'transparent',
                    borderRightColor: 'transparent',
                    transform: [{ rotate: spinFast }],
                    opacity: isLoading ? 0.8 : 0.4
                }
            ]} />

            {/* 4. Scanning Laser Line */}
            <Animated.View style={[
                styles.scanLine,
                {
                    backgroundColor: colors.accent,
                    transform: [{ translateY: scanTranslate }],
                    opacity: isLoading ? 0 : 0.6 // Hide scanner when loading
                }
            ]} />

            {/* 5. Main Aperture Button (Center) */}
            <Animated.View style={[
                styles.shutterBtn,
                { 
                    backgroundColor: isPressing ? colors.accent : colors.glass,
                    borderColor: colors.glassBorder,
                    transform: [{ scale: isPressing ? 0.9 : 1 }],
                    shadowColor: colors.accent,
                }
            ]}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={colors.primary} />
                ) : (
                    <View style={styles.lensReflection}>
                        <Camera size={36} color={isPressing ? '#fff' : colors.text} strokeWidth={1.5} />
                    </View>
                )}
            </Animated.View>

            {/* 6. Context Text (Right Side) */}
            <View style={styles.infoContainer}>
                {/* Removed AI Badge per request */}
                <Text style={[styles.mainText, { color: colors.text }]}>
                    {isLoading ? "Jarry el t7lil..." : "Warina Sa7nek 📸"}
                </Text>
                <Text style={[styles.subText, { color: colors.textSecondary }]}>
                    {isLoading ? "Moments..." : "Chnoua tayyebt lyoum?"}
                </Text>
            </View>

            {/* 7. Corner Brackets (HUD Look) */}
            <View style={[styles.corner, styles.tl, { borderColor: colors.primary }]} />
            <View style={[styles.corner, styles.tr, { borderColor: colors.primary }]} />
            <View style={[styles.corner, styles.bl, { borderColor: colors.primary }]} />
            <View style={[styles.corner, styles.br, { borderColor: colors.primary }]} />

        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
  lensContainer: {
    height: 160,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
  },
  // HUD Elements
  hudRingOuter: {
    position: 'absolute',
    left: -20,
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderStyle: 'dashed',
    zIndex: 0,
  },
  hudRingInner: {
    position: 'absolute',
    left: 5,
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    zIndex: 1,
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
  gridLineVertical: {
    width: 1,
    height: '100%',
    position: 'absolute',
  },
  gridLineHorizontal: {
    width: '100%',
    height: 1,
    position: 'absolute',
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    zIndex: 2,
    shadowColor: '#fff',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  // Shutter
  shutterBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    zIndex: 10,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  lensReflection: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  // Text
  infoContainer: {
    flex: 1,
    paddingLeft: 40, // Space for the rings
    justifyContent: 'center',
    zIndex: 10,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  mainText: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  subText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  // Corners
  corner: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderWidth: 2,
    zIndex: 20,
    opacity: 0.5,
  },
  tl: { top: 16, left: 16, borderRightWidth: 0, borderBottomWidth: 0 },
  tr: { top: 16, right: 16, borderLeftWidth: 0, borderBottomWidth: 0 },
  bl: { bottom: 16, left: 16, borderRightWidth: 0, borderTopWidth: 0 },
  br: { bottom: 16, right: 16, borderLeftWidth: 0, borderTopWidth: 0 },
});

export default ImageUpload;
