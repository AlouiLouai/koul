import React from 'react';
import { BottomSheetModal, BottomSheetView, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Lock, Crown, Sparkles } from 'lucide-react-native';
import { ActionButton } from '@/components/ActionButton';
import { GlassView } from '@/components/GlassView';
import { useTheme } from '@/theme/ThemeContext';
import { router } from 'expo-router';
import { useAuthState } from '@/features/auth/AuthState';

const MODAL_NAME = 'quotaExceeded';

export type QuotaExceededModalOptions = {
  onUpgrade?: () => void;
};

const QuotaExceededModal = React.forwardRef<BottomSheetModal>((_, ref) => {
  const { colors } = useTheme();
  const { dismiss } = useBottomSheetModal();
  const { isGuest, isAuthenticated } = useAuthState();


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
            <View style={[styles.iconBg, { backgroundColor: colors.warning + '20', borderColor: colors.warning }]}>
              <Lock size={40} color={colors.warning} strokeWidth={2.5} />
              <View style={[styles.badge, isAuthenticated && { backgroundColor: colors.accent }]}>
                {
                  isGuest ?
                    <Sparkles size={12} color="#fff" fill="#fff" /> : <Crown size={12} color="#fff" fill="#fff" />
                }
              </View>
            </View>

            <Text style={[styles.title, { color: colors.text }]}>{isGuest ? 'Wfet l\'tjarib! 🛑' : 'Kammalt l\'Quota! 🛑'}</Text>
            {isGuest && <Text style={[styles.message, { color: colors.textSecondary }]}>
              Kammalt l&apos;3 scans mta3ek l&apos;youm. <Text style={[styles.highlight, { color: colors.primary }]}>Connecti</Text> tawa bach t7afedh 3la tsawrek w stats mta3ek!
            </Text>}
            {isAuthenticated && <Text style={[styles.message, { color: colors.textSecondary }]}>
              Yezzi ma sawart lyoum! 3 scans/jour houa l&apos;limit mta3ek.
              <Text style={[styles.highlight, { color: colors.accent }]}>Walli Premium</Text> bach t7allel makletek bla 7seb.
            </Text>}

            <View style={styles.actions}>
              {isAuthenticated && <ActionButton
                text="Walli Premium (5 TND)"
                variant="primary"
                onPress={() => router.push('/upgrade')}
                style={{ backgroundColor: colors.text, width: '50%' }}
              />}
              {isGuest && <ActionButton
                text="Connecti Tawa"
                variant="primary"
                onPress={() => router.push('/login')}

                style={{ width: '50%' }}
              />}
              <ActionButton
                text="Batel, ghodwa nkamal"
                variant="secondary"
                onPress={() => dismiss(MODAL_NAME)}

                style={{ width: '50%' }}
              />
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

export { QuotaExceededModal, MODAL_NAME };
