import { useState } from "react";
import { useScanState } from "./ScanState";
import { useStatsStore } from "@/features/stats/useStatsStore";
import { useAuthState } from "@/features/auth/AuthState";
import { useModals } from "@/modals/ModalsProvider";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
import { logger } from "@/lib/logger";
import { Alert } from "react-native";

export const useProcessImage = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const { dailyScans, incrementScans } = useStatsStore();
    const { resetAnalysis, analyzeImage, result, error } = useScanState()
    const { isPro } = useAuthState();
    const { presentModal } = useModals();
    const processImage = async (uri: string, type: string, fileName: string) => {
        resetAnalysis();
        // 3 SCANS LIMIT for both Guests and non-Pro Users
        if (!isPro && dailyScans >= 3) {
            presentModal('quotaExceeded');
            return;
        }
        setIsProcessing(true);
        try {
            const context = ImageManipulator.manipulate(uri);
            context.resize({ width: 1024 })
            const ref = await context.renderAsync()
            const { uri: ManipulatedUri } = await ref.saveAsync({ compress: 0.6, format: SaveFormat.JPEG })
            context.release()
            await analyzeImage(ManipulatedUri, 'image/jpeg', 'analyzed_meal.jpg');
            incrementScans();
        } catch (err) { logger.error('Image manipulation failed:', err) }
        if (error && !result) {
            logger.error('Manipulated Image analysis failed:', error);
            await analyzeImage(uri, type, fileName);
            incrementScans();
            if (error) {
                logger.error('Image analysis failed:', error);
                Alert.alert('Error', 'Could not analyze image. Check your connection.');
            }
        }
        setIsProcessing(false);
    }

    return { processImage, isProcessing };
}