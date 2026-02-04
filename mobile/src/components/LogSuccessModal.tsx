import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckCircle2, ArrowRight, Camera } from 'lucide-react-native';
import { BottomSheetModal } from './BottomSheetModal';
import { ActionButton } from './ActionButton';
import { useTheme } from '../theme/ThemeContext';

interface LogSuccessModalProps {
  visible: boolean;
  onClose: () => void;
  onViewStats: () => void;
}

export const LogSuccessModal = ({ visible, onClose, onViewStats }: LogSuccessModalProps) => {
  const { colors } = useTheme();

  return (
    <BottomSheetModal visible={visible} onClose={onClose}>
        <View style={styles.content}>
            <View style={[styles.iconBg, { backgroundColor: colors.success + '20', borderColor: colors.success }]}>
                <CheckCircle2 size={40} color={colors.success} fill={colors.success} />
            </View>
            
            <Text style={[styles.title, { color: colors.text }]}>C'est Bon! ✅</Text>
            <Text style={[styles.message, { color: colors.textSecondary }]}>
                Fatourek tkayed. Taba3 progress mte3ek kol youm bach tousel l'ahdafek.
            </Text>

            <View style={styles.actions}>
                <ActionButton 
                    text="Zid Sawer" 
                    variant="secondary" 
                    onPress={onClose} 
                    icon={<Camera size={18} color={colors.text} />}
                    flex={1}
                />
                <ActionButton 
                    text="Chouf l'Stats" 
                    variant="primary" 
                    onPress={onViewStats} 
                    icon={<ArrowRight size={18} color="#fff" />}
                    flex={1.5}
                />
            </View>
        </View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  content: {
      alignItems: 'center',
  },
  iconBg: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
    maxWidth: '80%',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
});