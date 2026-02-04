import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { X, ShieldCheck, ArrowRight } from 'lucide-react-native';
import { BottomSheetModal } from '../../components/BottomSheetModal';
import { AppLogo } from '../../components/AppLogo';
import { useTheme } from '../../theme/ThemeContext';

interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
  onLogin: () => void;
  isLoading: boolean;
}

export const LoginModal = ({ visible, onClose, onLogin, isLoading }: LoginModalProps) => {
  const { colors, mode } = useTheme();

  return (
    <BottomSheetModal visible={visible} onClose={onClose}>
        <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <X size={24} color={colors.textSecondary} />
            </TouchableOpacity>
        </View>

        <View style={styles.content}>
            <AppLogo size={64} borderRadius={20} inverted={true} />
            
            <View style={styles.textGroup}>
                <Text style={[styles.title, { color: colors.text }]}>
                    Connecti Bch Tkamml
                </Text>
                <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                    Bch tnajjem tsawer w tkhabi ma3loumetek, lazmek compte!
                </Text>
            </View>

            <View style={[styles.secureNote, { backgroundColor: colors.accent + '15' }]}>
                <ShieldCheck size={16} color={colors.accent} />
                <Text style={[styles.secureText, { color: colors.accent }]}>Données mte3ek mahfoutha 100%</Text>
            </View>

            <TouchableOpacity
                onPress={onLogin}
                disabled={isLoading}
                activeOpacity={0.8}
                style={styles.googleBtnWrapper}
            >
                <View style={[
                    styles.googleBtn, 
                    { 
                        backgroundColor: mode === 'dark' ? '#18181b' : '#fff',
                        borderColor: colors.text + '20',
                        borderWidth: 1,
                        shadowColor: colors.accent,
                    }
                ]}>
                    {isLoading ? (
                        <ActivityIndicator color={colors.text} />
                    ) : (
                        <>
                            <View style={[styles.iconCircle, { shadowColor: '#000', elevation: 2 }]}>
                                {/* Using distinct colors for the G parts would require SVG, 
                                    falling back to a very clean branded look. */}
                                <Text style={{fontSize: 24, fontWeight: '900', color: '#4285F4'}}>G</Text>
                            </View>
                            <Text style={[
                                styles.btnText, 
                                { color: colors.text }
                            ]}>
                                Connecti b' Google
                            </Text>
                            <ArrowRight size={20} color={colors.text} opacity={0.4} />
                        </>
                    )}
                </View>
            </TouchableOpacity>
        </View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  header: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginBottom: -10,
  },
  closeBtn: {
      padding: 8,
  },
  content: {
      width: '100%',
      alignItems: 'center',
      gap: 20,
  },
  textGroup: {
      alignItems: 'center',
      gap: 8,
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
      maxWidth: '85%',
  },
  secureNote: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
  },
  secureText: {
      fontSize: 12,
      fontWeight: '700',
  },
  googleBtnWrapper: {
      width: '100%',
      marginTop: 10,
  },
  googleBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 64,
      paddingHorizontal: 8,
      borderRadius: 24,
      gap: 16,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 5,
  },
  iconCircle: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
  },
  btnText: {
      fontSize: 17,
      fontWeight: '700',
      flex: 1,
  },
  googleGContainer: {
      position: 'relative',
  },
  gText: {
      fontSize: 22,
      fontWeight: '900',
  },
  gOverlay: {
      ...StyleSheet.absoluteFillObject,
  }
});
