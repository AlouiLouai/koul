import { BottomSheetModal, BottomSheetView, useBottomSheetModal } from "@gorhom/bottom-sheet";
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ShieldCheck } from 'lucide-react-native';
import { AppLogo } from '@/components/AppLogo';
import { GoogleLogo } from '@/components/GoogleLogo';
import { useTheme } from '@/theme/ThemeContext';
import { useGoogleLogin } from "@/features/auth/useGoogleLogin";
import { GlassView } from "@/components/GlassView";


const MODAL_NAME = 'login';
const LoginModal = React.forwardRef<BottomSheetModal>((_, ref) => {
    const { colors, mode } = useTheme();
    const { dismiss } = useBottomSheetModal();
    const { handleGoogleLogin, isLoading } = useGoogleLogin(() => dismiss(MODAL_NAME));
    return (
        <BottomSheetModal ref={ref} name={MODAL_NAME}
            backgroundStyle={{
                backgroundColor: 'transparent'
            }}>
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
                            onPress={handleGoogleLogin}
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
                                    minWidth: 160, // Ensure stable width during loading
                                    justifyContent: 'center'
                                }
                            ]}>
                                {isLoading ? (
                                    <ActivityIndicator color={colors.primary} size="small" />
                                ) : (
                                    <View style={styles.btnInner}>
                                        <View style={[styles.iconCircle, { shadowColor: '#000', elevation: 2 }]}>
                                            <GoogleLogo size={20} />
                                        </View>
                                        <Text style={[
                                            styles.btnText,
                                            { color: colors.text }
                                        ]}>
                                            Connecti
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>
                </GlassView>
            </BottomSheetView>
        </BottomSheetModal>
    )
})
LoginModal.displayName = 'LoginModal'
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
        alignSelf: 'center',
        marginTop: 10,
    },
    googleBtn: {
        height: 52,
        borderRadius: 26,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    btnInner: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 6,
        paddingRight: 24,
        gap: 12,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    btnText: {
        fontSize: 16,
        fontWeight: '700',
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

export { LoginModal, MODAL_NAME };