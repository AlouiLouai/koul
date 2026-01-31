import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Animated, Easing } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera, Upload, Loader2 } from 'lucide-react-native';

interface ImageUploadProps {
  onImageSelected: (uri: string, type: string, fileName: string) => void;
  isLoading?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected, isLoading }) => {
  const [isPressing, setIsPressing] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!isLoading) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.02,
            duration: 1500,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    } else {
      scaleAnim.setValue(1);
    }
  }, [isLoading]);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const type = asset.type === 'image' ? 'image/jpeg' : 'image/jpeg'; 
        const fileName = asset.fileName || 'upload.jpg';
        onImageSelected(asset.uri, type, fileName);
      }
    } catch (error) {
      Alert.alert('Error', 'Could not pick image');
    }
  };

  const takePhoto = async () => {
      try {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert("Permission to access camera is required!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.8,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const asset = result.assets[0];
            const type = 'image/jpeg';
            const fileName = 'camera_capture.jpg';
            onImageSelected(asset.uri, type, fileName);
        }
      } catch (error) {
          Alert.alert('Error', 'Could not take photo');
      }
  }

  const handlePress = () => {
      Alert.alert(
          "Ekhtar Taswira",
          "Mnin tحب tjibha?",
          [
              { text: "Kamera", onPress: takePhoto },
              { text: "Galerie", onPress: pickImage },
              { text: "Batel", style: "cancel" }
          ]
      );
  }

  const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

  return (
    <View style={styles.container}>
      <AnimatedTouchableOpacity
        onPress={handlePress}
        disabled={isLoading}
        activeOpacity={0.9}
        onPressIn={() => setIsPressing(true)}
        onPressOut={() => setIsPressing(false)}
        style={[
          styles.uploadBox,
          isPressing && styles.uploadBoxPressed,
          isLoading && styles.uploadBoxLoading,
          { transform: [{ scale: isPressing ? 0.98 : scaleAnim }] }
        ]}
      >
        {/* Decorative elements */}
        <View style={styles.decoTopRight} />
        <View style={styles.decoBottomLeft} />

        <View style={[
          styles.iconContainer,
          isPressing && styles.iconContainerPressed
        ]}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#10b981" />
          ) : (
            <Camera size={32} color={isPressing ? "#fff" : "#a1a1aa"} strokeWidth={1.5} />
          )}
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.titleText}>
            {isLoading ? "Ka3ed Y7allel..." : "Enzel Bach Tsawer"}
          </Text>
          <Text style={styles.subtitleText}>
            {isLoading ? "Yhadher fel AI..." : "Sawar wala telechargi"}
          </Text>
        </View>
      </AnimatedTouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  uploadBox: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: '#e4e4e7', // zinc-200
    borderStyle: 'dashed',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  uploadBoxPressed: {
    borderColor: '#34d399', // emerald-400
    backgroundColor: 'rgba(16, 185, 129, 0.05)', // emerald-50/10
  },
  uploadBoxLoading: {
    backgroundColor: '#fafafa', // zinc-50
    opacity: 0.8,
  },
  decoTopRight: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: 'rgba(16, 185, 129, 0.05)', // emerald-500/5
  },
  decoBottomLeft: {
    position: 'absolute',
    bottom: -32,
    left: -32,
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(249, 115, 22, 0.05)', // orange-500/5
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: '#fafafa', // zinc-50
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
  },
  iconContainerPressed: {
    backgroundColor: '#10b981', // emerald-500
    transform: [{ rotate: '3deg' }],
  },
  textContainer: {
    alignItems: 'center',
    zIndex: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#18181b', // zinc-900
    letterSpacing: -0.5,
  },
  subtitleText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#a1a1aa', // zinc-400
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 8,
  },
});

export default ImageUpload;