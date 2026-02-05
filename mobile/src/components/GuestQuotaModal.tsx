import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UserPlus, Sparkles } from 'lucide-react-native';
import { BottomSheetModal } from './BottomSheetModal';
import { ActionButton } from './ActionButton';
import { useTheme } from '../theme/ThemeContext';

interface GuestQuotaModalProps {
  visible: boolean;
  onClose: () => void;
  onConnect: () => void;
}

export const GuestQuotaModal = ({ visible, onClose, onConnect }: GuestQuotaModalProps) => {
  const { colors } = useTheme();

  return (
    <BottomSheetModal visible={visible} onClose={onClose}>
      <View style={styles.content}>
        <View style={[styles.iconBg, { backgroundColor: colors.primary + '20', borderColor: colors.primary }]}>
           <UserPlus size={36} color={colors.primary} strokeWidth={2.5} />
           <View style={styles.badge}>
              <Sparkles size={12} color="#fff" fill="#fff" />
           </View>
        </View>

        <Text style={[styles.title, { color: colors.text }]}>Wfet l'tjarib! 🛑</Text>
        <Text style={[styles.message, { color: colors.textSecondary }]}>
          Kammalt l'3 scans mta3ek l'youm. <Text style={[styles.highlight, { color: colors.primary }]}>Connecti</Text> tawa bach t7afedh 3la tsawrek w stats mta3ek!
        </Text>

        <View style={styles.actions}>
          <ActionButton 
            text="Connecti Tawa" 
            variant="primary" 
            onPress={() => { onClose(); onConnect(); }} 
            flex={1}
          />
          <ActionButton 
            text="Batel, ghodwa nkamal" 
            variant="secondary" 
            onPress={onClose} 
            flex={1}
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
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3b82f6',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
    maxWidth: '85%',
  },
  highlight: {
    color: '#2563eb',
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
});
