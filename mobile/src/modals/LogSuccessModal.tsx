import React from 'react';
import { BottomSheetModal, BottomSheetView, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { View, Text, StyleSheet } from 'react-native';
import { CheckCircle2, ArrowRight, Camera } from 'lucide-react-native';
import { ActionButton } from '@/components/ActionButton';
import { GlassView } from '@/components/GlassView';
import { useTheme } from '@/theme/ThemeContext';
import { router } from 'expo-router';

const MODAL_NAME = 'logSuccess';

const LogSuccessModal = React.forwardRef<BottomSheetModal>((_, ref) => {
  const { colors } = useTheme();
  const { dismiss } = useBottomSheetModal()

  return (
    <BottomSheetModal
      ref={ref}
      name={MODAL_NAME}
      enableDynamicSizing={false}
      snapPoints={[380]}
      enableOverDrag={false}
      enableHandlePanningGesture={false}
      enablePanDownToClose={false}
      enableContentPanningGesture={false}
      backgroundStyle={{ backgroundColor: 'transparent' }}
    >
      <BottomSheetView>
        <GlassView
          style={{
            width: '100%',
            padding: 24,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
          }}
          intensity={40}
          borderRadius={0}
          noBorder={true}
        >
          <View style={styles.content}>
            <View style={[styles.iconBg, { backgroundColor: colors.success + '20', borderColor: colors.success }]}>
              <CheckCircle2 size={40} color={colors.success} fill={colors.success} />
            </View>

            <Text style={[styles.title, { color: colors.text }]}>C&apos;est Bon! ✅</Text>
            <Text style={[styles.message, { color: colors.textSecondary }]}>
              Fatourek tkayed. Taba3 progress mte3ek kol youm bach tousel l&apos;ahdafek.
            </Text>

            <View style={styles.actions}>
              <ActionButton
                text="Zid Sawer"
                variant="secondary"
                onPress={() => {
                  dismiss(MODAL_NAME)
                }}
                icon={<Camera size={18} color={colors.text} />}
                flex={1}
              />
              <ActionButton
                text="Chouf l'Stats"
                variant="primary"
                onPress={() => {
                  router.push('/(tabs)/stats')
                }}
                icon={<ArrowRight size={18} color="#fff" />}
                flex={1.5}
              />
            </View>
          </View>
        </GlassView>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

LogSuccessModal.displayName = 'LogSuccessModal';

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

export { LogSuccessModal, MODAL_NAME };
