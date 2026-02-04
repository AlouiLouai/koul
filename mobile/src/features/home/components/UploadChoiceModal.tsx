import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, Image as ImageIcon, X } from 'lucide-react-native';
import { BottomSheetModal } from '../../../components/BottomSheetModal';
import { useTheme } from '../../../theme/ThemeContext';

interface UploadChoiceModalProps {
  visible: boolean;
  onClose: () => void;
  onCameraPress: () => void;
  onGalleryPress: () => void;
}

export const UploadChoiceModal = ({ 
  visible, 
  onClose, 
  onCameraPress, 
  onGalleryPress 
}: UploadChoiceModalProps) => {
  const { colors, mode } = useTheme();

  return (
    <BottomSheetModal visible={visible} onClose={onClose}>
        {/* Header with Close Button */}
        <View style={styles.header}>
            <View>
                <Text style={[styles.title, { color: colors.text }]}>Winou Sa7nek? 🕵️‍♂️</Text>
                <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                    Khtar kifech t7eb twarrina l'mekla.
                </Text>
            </View>
            <TouchableOpacity 
                onPress={onClose} 
                style={[styles.closeBtn, { backgroundColor: colors.background[0] }]}
            >
                <X size={20} color={colors.text} />
            </TouchableOpacity>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
            <TouchableOpacity 
                style={[styles.actionCard, { backgroundColor: colors.accent + '15', borderColor: colors.accent }]}
                onPress={onCameraPress}
                activeOpacity={0.7}
            >
                <View style={[styles.iconCircle, { backgroundColor: colors.accent }]}>
                    <Camera size={24} color="#fff" />
                </View>
                <View style={styles.actionTextContainer}>
                    <Text style={[styles.actionTitle, { color: colors.accent }]}>Sawar Taw Taw 📸</Text>
                    <Text style={[styles.actionDesc, { color: colors.textSecondary }]}>Direct mel koujina</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.actionCard, { backgroundColor: mode === 'dark' ? '#ffffff10' : '#00000005', borderColor: colors.glassBorder }]}
                onPress={onGalleryPress}
                activeOpacity={0.7}
            >
                <View style={[styles.iconCircle, { backgroundColor: colors.textSecondary }]}>
                    <ImageIcon size={24} color="#fff" />
                </View>
                <View style={styles.actionTextContainer}>
                    <Text style={[styles.actionTitle, { color: colors.text }]}>Jib mel Galerie 🖼️</Text>
                    <Text style={[styles.actionDesc, { color: colors.textSecondary }]}>Taswira 9dima?</Text>
                </View>
            </TouchableOpacity>
        </View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 32,
  },
  title: {
      fontSize: 22,
      fontWeight: '900',
      marginBottom: 4,
  },
  subtitle: {
      fontSize: 14,
      fontWeight: '500',
  },
  closeBtn: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
  },
  actionsContainer: {
      gap: 16,
  },
  actionCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderRadius: 24,
      borderWidth: 1,
      gap: 16,
  },
  iconCircle: {
      width: 48,
      height: 48,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
  },
  actionTextContainer: {
      flex: 1,
  },
  actionTitle: {
      fontSize: 16,
      fontWeight: '800',
      marginBottom: 2,
  },
  actionDesc: {
      fontSize: 12,
  },
});