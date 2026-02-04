import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Modal, Linking } from 'react-native';
import { AlertTriangle, Settings, X } from 'lucide-react-native';
import { GlassView } from './GlassView';
import { useTheme } from '../theme/ThemeContext';

interface PermissionModalProps {
  visible: boolean;
  onClose: () => void;
}

export const PermissionModal = ({ visible, onClose }: PermissionModalProps) => {
  const { colors } = useTheme();
  
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 7,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [visible]);

  const handleSettings = () => {
      onClose();
      Linking.openSettings();
  };

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {/* Dark overlay without blur as requested */}
        <Animated.View style={[styles.backdrop, { opacity: opacityAnim }]} />

        <Animated.View 
          style={[
            styles.container, 
            { transform: [{ scale: scaleAnim }], opacity: opacityAnim }
          ]}
        >
          <GlassView 
            style={styles.content} 
            intensity={95} 
            borderRadius={24}
            noBorder={false}
          >
            <View style={[styles.iconContainer, { backgroundColor: colors.warning + '20' }]}>
                <AlertTriangle size={32} color={colors.warning} />
            </View>

            <Text style={[styles.title, { color: colors.text }]}>7achtna bik! 🤝</Text>
            
            <Text style={[styles.message, { color: colors.textSecondary }]}>
                Bach l'AI ychouf sa7nek, lazmek t7oll l'camera.
            </Text>

            <View style={styles.actions}>
                <TouchableOpacity 
                    style={[styles.btnSecondary, { borderColor: colors.glassBorder }]} 
                    onPress={onClose}
                >
                    <Text style={[styles.btnTextSecondary, { color: colors.text }]}>Batel</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.btnPrimary, { backgroundColor: colors.primary }]} 
                    onPress={handleSettings}
                >
                    <Settings size={18} color="#fff" />
                    <Text style={styles.btnTextPrimary}>Riguel Settings</Text>
                </TouchableOpacity>
            </View>

          </GlassView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
    padding: 24,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)', // Simple dark overlay, no blur
  },
  container: {
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
  },
  content: {
    width: '100%',
    padding: 24,
    alignItems: 'center',
  },
  iconContainer: {
      width: 64,
      height: 64,
      borderRadius: 32,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
  },
  title: {
      fontSize: 20,
      fontWeight: '900',
      marginBottom: 8,
      textAlign: 'center',
  },
  message: {
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 24,
      lineHeight: 20,
  },
  actions: {
      flexDirection: 'row',
      gap: 12,
      width: '100%',
  },
  btnSecondary: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 16,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
  },
  btnPrimary: {
      flex: 1.5,
      paddingVertical: 12,
      borderRadius: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
  },
  btnTextSecondary: {
      fontWeight: '700',
      fontSize: 14,
  },
  btnTextPrimary: {
      color: '#fff',
      fontWeight: '700',
      fontSize: 14,
  },
});
