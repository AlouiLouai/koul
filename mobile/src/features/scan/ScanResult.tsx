import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Alert, } from 'react-native';
import { Trash2, CheckCircle2, } from 'lucide-react-native';
import { useTheme } from '@/theme/ThemeContext';
import { AnalysisResult } from '@/components/AnalysisResult';
import { useScanState } from './ScanState';
import { useResultAnimation } from './useResultAnimation';
import { useModals } from '@/modals/ModalsProvider';
import { useStatsStore } from '@/features/stats/useStatsStore';

export function ScanResult() {
    const { result, loading, resetAnalysis } = useScanState();
    const { buttonsOpacity, buttonsTranslateY, handlePressIn, handlePressOut, logBtnScale, resetBtnScale } = useResultAnimation();
    const { colors } = useTheme();
    const { logMeal } = useStatsStore()
    const { presentModal } = useModals();
    if (!result || loading) return null;
    return <View style={styles.resultAnimationWrapper}>
        <AnalysisResult data={result} />

        <Animated.View style={[
            styles.actionRow,
            { opacity: buttonsOpacity, transform: [{ translateY: buttonsTranslateY }] }
        ]}>
            <TouchableOpacity
                style={styles.resetBtnWrapper}
                onPress={resetAnalysis}
                onPressIn={() => handlePressIn(resetBtnScale)}
                onPressOut={() => handlePressOut(resetBtnScale)}
                activeOpacity={1}
            >
                <Animated.View style={{ transform: [{ scale: resetBtnScale }] }}>
                    <View style={[styles.resetBtn, { borderColor: colors.error }]}>
                        <Trash2 size={22} color={colors.error} />
                        <Text style={[styles.resetText, { color: colors.error }]}>Fasakh</Text>
                    </View>
                </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.logBtnWrapper}
                onPress={() => {
                    if (result) {
                        logMeal(result.totals)
                        presentModal('logSuccess');
                    } else {
                        Alert.alert('Error', 'You need to analyze an image first.')
                    }
                }}
                onPressIn={() => handlePressIn(logBtnScale)}
                onPressOut={() => handlePressOut(logBtnScale)}
                activeOpacity={1}
            >
                <Animated.View style={{ transform: [{ scale: logBtnScale }] }}>
                    <View style={[styles.logBtn, { backgroundColor: '#e11d48' }]}>
                        <CheckCircle2 size={22} color="#fff" strokeWidth={2} />
                        <Text style={styles.logText}>Kayed Fatourek</Text>
                    </View>
                </Animated.View>
            </TouchableOpacity>
        </Animated.View>
    </View>
}
const styles = StyleSheet.create({
    resultAnimationWrapper: { width: '100%' },
    actionRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 24, marginBottom: 40 },
    resetBtnWrapper: { flex: 0.4 },
    resetBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 18, borderWidth: 2, borderRadius: 24 },
    resetText: { fontWeight: '900', fontSize: 16 },
    logBtnWrapper: { flex: 0.6 },
    logBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 18, borderRadius: 24 },
    logText: { color: '#fff', fontWeight: '900', fontSize: 16 }
});