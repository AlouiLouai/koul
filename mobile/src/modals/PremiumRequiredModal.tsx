import React from 'react';
import { router } from 'expo-router';
import {
    BottomSheetModal,
    BottomSheetView,
} from '@gorhom/bottom-sheet';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Crown, X } from 'lucide-react-native';
import { ActionButton } from '@/components/ActionButton';
import { GlassView } from '@/components/GlassView';
import { useTheme } from '@/theme/ThemeContext';


const MODAL_NAME = 'premiumRequired';
const PremiumRequiredModal = React.forwardRef<BottomSheetModal>((_, ref) => {
    const { colors } = useTheme();
    return (
        <BottomSheetModal
            ref={ref}
            name={MODAL_NAME}
            enableDynamicSizing={false}
            snapPoints={[415]}
            enableOverDrag={false}
            enableHandlePanningGesture={false}
            enablePanDownToClose={false}
            enableContentPanningGesture={false}
            backgroundStyle={{
                backgroundColor: 'transparent'
            }}
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
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
                                <GlassView intensity={100} borderRadius={20} style={styles.closeIcon}>
                                    <X size={20} color={colors.accent} />
                                </GlassView>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.iconBg, { backgroundColor: colors.accent + '15', borderColor: colors.accent + '30' }]}>
                            <Crown size={40} color={colors.accent} fill={colors.accent} />
                        </View>

                        <Text style={[styles.title, { color: colors.text }]}>Statistiques Msakra</Text>
                        <Text style={[styles.message, { color: colors.textSecondary }]}>
                            Habit tchouf el progress mta3ek? Walli Premium bach t7allel makletek bel detay w taba3 el forma.
                        </Text>

                        <View style={styles.actions}>
                            <ActionButton
                                text="Walli Premium"
                                variant="primary"
                                onPress={() => router.push('/upgrade')}
                                flex={1}
                                style={{ backgroundColor: colors.accent }}
                            />
                        </View>

                        <TouchableOpacity onPress={() => router.replace('/(tabs)')} style={styles.secondaryAction}>
                            <Text style={[styles.secondaryText, { color: colors.accent }]}>Arja3 lel Home</Text>
                        </TouchableOpacity>
                    </View>
                </GlassView>
            </BottomSheetView>
        </BottomSheetModal>
    )
})
PremiumRequiredModal.displayName = 'PremiumRequiredModal';


const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        paddingBottom: 0,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: -10,
    },
    closeBtn: {
        zIndex: 10,
    },
    closeIcon: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconBg: {
        width: 72,
        height: 72,
        borderRadius: 36,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        borderWidth: 1.5,
    },
    title: {
        fontSize: 26,
        fontWeight: '900',
        marginBottom: 8,
        letterSpacing: -0.5,
    },
    message: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 20,
        maxWidth: '85%',
    },
    actions: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 16,
    },
    secondaryAction: {
        paddingVertical: 8,
    },
    secondaryText: {
        fontSize: 13,
        fontWeight: '700',
        textDecorationLine: 'underline',
    }
});

export { PremiumRequiredModal, MODAL_NAME };