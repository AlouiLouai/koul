import React from 'react';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Lock, Crown } from 'lucide-react-native';
import { ActionButton } from '@/components/ActionButton';
import { GlassView } from '@/components/GlassView';
import { useTheme } from '@/theme/ThemeContext';
import { useModals } from './ModalsProvider';

const MODAL_NAME = 'quotaExceeded';

export type QuotaExceededModalOptions = {
  onUpgrade?: () => void;
};

const QuotaExceededModal = React.forwardRef<BottomSheetModal>((_, ref) => {
  const { colors } = useTheme();
  const { dismissModal, getModalOptions } = useModals();
  const options = getModalOptions(MODAL_NAME) as QuotaExceededModalOptions | undefined;

  const handleUpgrade = () => {
    options?.onUpgrade?.();
    dismissModal(MODAL_NAME);
  };

  const handleCancel = () => {
    dismissModal(MODAL_NAME);
  };

  return (
    <BottomSheetModal
      ref={ref}
      name={MODAL_NAME}
      enableDynamicSizing={false}
      snapPoints={[420]}
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
            <View style={[styles.iconBg, { backgroundColor: colors.warning + '20', borderColor: colors.warning }]}>
              <Lock size={40} color={colors.warning} strokeWidth={2.5} />
              <View style={[styles.badge, { backgroundColor: colors.accent }]}>
                <Crown size={12} color="#fff" fill="#fff" />
              </View>
            </View>

            <Text style={[styles.title, { color: colors.text }]}>Kammalt l&apos;Quota! 🛑</Text>
            <Text style={[styles.message, { color: colors.textSecondary }]}>
              Yezzi ma sawart lyoum! 3 scans/jour houa l&apos;limit mta3ek.
              <Text style={[styles.highlight, { color: colors.accent }]}>Walli Premium</Text> bach t7allel makletek bla 7seb.
            </Text>

            <View style={styles.actions}>
              <ActionButton
                text="Walli Premium (5 TND)"
                variant="primary"
                onPress={handleUpgrade}
                flex={1}
                style={{ backgroundColor: colors.text }}
              />
              <TouchableOpacity onPress={handleCancel} style={styles.cancelBtn}>
                <Text style={[styles.cancelBtnText, { color: colors.textSecondary }]}>Batel, ghodwa nkamal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </GlassView>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

QuotaExceededModal.displayName = 'QuotaExceededModal';

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
    borderWidth: 2,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
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
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  highlight: {
    fontWeight: 'bold',
  },
  actions: {
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
  cancelBtn: {
    paddingVertical: 12,
  },
  cancelBtnText: {
    fontWeight: '600',
    fontSize: 14,
  },
});

export { QuotaExceededModal, MODAL_NAME };
