import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface ActionButtonProps {
  onPress: () => void;
  text: string;
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
  flex?: number;
  style?: ViewStyle;
  disabled?: boolean;
}

export const ActionButton = ({ onPress, text, variant = 'primary', icon, flex, style, disabled }: ActionButtonProps) => {
  const { colors, mode } = useTheme();

  const isPrimary = variant === 'primary';

  const containerStyle = [
    styles.base,
    isPrimary 
        ? { backgroundColor: colors.accent, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10, elevation: 4 } 
        : { borderColor: colors.glassBorder, borderWidth: 1, backgroundColor: mode === 'dark' ? '#ffffff10' : '#00000005' },
    flex ? { flex } : {},
    disabled ? { opacity: 0.5 } : {},
    style
  ];

  const textStyle = [
    styles.text,
    { color: isPrimary ? '#fff' : colors.text }
  ];

  return (
    <TouchableOpacity style={containerStyle} onPress={onPress} activeOpacity={0.8} disabled={disabled}>
      {icon}
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
