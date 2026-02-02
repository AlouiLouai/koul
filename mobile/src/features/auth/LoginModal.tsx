import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  Dimensions, 
  Animated,
  ActivityIndicator,
  TouchableWithoutFeedback
} from 'react-native';
import { X, ArrowRight, ShieldCheck } from 'lucide-react-native';
import { GlassView } from '../../components/GlassView';
import { AppLogo } from '../../components/AppLogo';
import { useTheme } from '../../theme/ThemeContext';

const { height } = Dimensions.get('window');

interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
  onLogin: () => void;
  isLoading: boolean;
}

export const LoginModal = ({ visible, onClose, onLogin, isLoading }: LoginModalProps) => {
  const { colors } = useTheme();
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        damping: 20,
        stiffness: 100,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        {/* Close on tapping background */}
        <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        {/* Bottom Sheet */}
        <Animated.View style={[
            styles.sheet, 
            { 
                backgroundColor: colors.background[1], // Slightly lighter than base
                transform: [{ translateY: slideAnim }] 
            }
        ]}>
            
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                    <X size={24} color={colors.textSecondary} />
                </TouchableOpacity>
            </View>

            {/* Content */}
            <View style={styles.content}>
                <AppLogo size={64} borderRadius={20} inverted />
                
                <View style={styles.textGroup}>
                    <Text style={[styles.title, { color: colors.text }]}>
                        Connecti Bch Tkamml
                    </Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                        Bch tnajjem tsawer w tkhabi ma3loumetek, lazmek compte!
                    </Text>
                </View>

                {/* Secure Note */}
                <View style={styles.secureNote}>
                    <ShieldCheck size={16} color={colors.success} />
                    <Text style={[styles.secureText, { color: colors.success }]}>Données mte3ek mahfoutha 100%</Text>
                </View>

                {/* Action Button */}
                <TouchableOpacity
                    onPress={onLogin}
                    disabled={isLoading}
                    activeOpacity={0.8}
                    style={{ width: '100%' }}
                >
                    <GlassView style={[styles.googleBtn, { backgroundColor: colors.text }]} intensity={20} borderRadius={24}>
                        {isLoading ? (
                        <View style={styles.loadingWrapper}>
                            <ActivityIndicator color={colors.background[0]} size="small" />
                            <Text style={[styles.btnText, { color: colors.background[0], flex: 0 }]}>Lahtha...</Text>
                        </View>
                        ) : (
                        <>
                            <View style={styles.iconCircle}>
                                <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.text}}>G</Text>
                            </View>
                            <Text style={[styles.btnText, { color: colors.background[0] }]}>Connecti b' Google</Text>
                            <ArrowRight size={20} color={colors.background[0]} />
                        </>
                        )}
                    </GlassView>
                </TouchableOpacity>
            </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  backdrop: {
      ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingBottom: 48,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
  },
  header: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginBottom: 0,
  },
  closeBtn: {
      padding: 8,
  },
  content: {
      width: '100%',
      alignItems: 'center',
      gap: 24,
  },
  textGroup: {
      alignItems: 'center',
      gap: 8,
      marginBottom: 8,
  },
  title: {
      fontSize: 24,
      fontWeight: '900',
      textAlign: 'center',
  },
  subtitle: {
      fontSize: 15,
      textAlign: 'center',
      fontWeight: '500',
      lineHeight: 22,
      maxWidth: '80%',
  },
  secureNote: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      backgroundColor: 'rgba(16, 185, 129, 0.1)', // Light green
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
      marginBottom: 8,
  },
  secureText: {
      fontSize: 12,
      fontWeight: '700',
  },
  googleBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 60,
      paddingHorizontal: 8,
      gap: 16,
      width: '100%',
  },
  loadingWrapper: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
  },
  iconCircle: {
      width: 44,
      height: 44,
      borderRadius: 18,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },
  btnText: {
      fontSize: 16,
      fontWeight: '700',
      flex: 1,
  },
});
