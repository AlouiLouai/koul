import React, { useEffect, useRef } from 'react';
import { StyleSheet, Modal, Animated, Dimensions, Pressable, View } from 'react-native';
import { GlassView } from './GlassView';

const { height } = Dimensions.get('window');

interface BottomSheetModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const BottomSheetModal = ({ visible, onClose, children }: BottomSheetModalProps) => {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          friction: 8,
          tension: 65,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!visible && fadeAnim === new Animated.Value(0)) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlayWrapper}>
        <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
          <Pressable style={{ flex: 1 }} onPress={onClose} />
        </Animated.View>

        <Animated.View
          style={[
            styles.sheetContainer,
            { transform: [{ translateY: slideAnim }] }
          ]}
        >
          <GlassView
            style={styles.sheetContent}
            intensity={95}
            borderRadius={32}
            noBorder={false}
          >
            {children}
            <View style={{ height: 20 }} />
          </GlassView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlayWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    zIndex: 2000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheetContainer: {
    width: '100%',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  sheetContent: {
    width: '100%',
    padding: 24,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
});
