import React, { useCallback, useState } from 'react';
import { ScanUI } from './ScanUI';
import { useImageAnalysis } from '../../hooks/useImageAnalysis';
import { useModals } from '@/modals/ModalsProvider';
import * as ImageManipulator from 'expo-image-manipulator';
import { useRouter } from 'expo-router';
import { logger } from '@/lib/logger';

interface ScanContainerProps {
  onLogMeal: (totals: any) => void;
  dailyScans: number;
  incrementScans: () => void;
  isPro: boolean;
  onShowUpgrade: () => void;
  isGuest?: boolean;
  onTriggerAuth?: () => void;
}

export const ScanContainer = ({
  onLogMeal,
  dailyScans,
  incrementScans,
  isPro,
  onShowUpgrade,
  isGuest = false,
  onTriggerAuth
}: ScanContainerProps) => {
  const { presentModal } = useModals();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const {
    loading,
    result,
    currentImage,
    error,
    analyzeImage,
    resetAnalysis
  } = useImageAnalysis();

  const handleImageSelected = useCallback(async (uri: string, type: string, fileName: string) => {
    // 3 SCANS LIMIT for both Guests and non-Pro Users
    if (!isPro && dailyScans >= 3) {
      if (isGuest) {
        presentModal('guestQuota', {
          onConnect: () => onTriggerAuth?.() ?? presentModal('login'),
        });
      } else {
        presentModal('quotaExceeded', { onUpgrade: onShowUpgrade });
      }
      return;
    }

    try {
      setIsProcessing(true);
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 1024 } }],
        { compress: 0.6, format: ImageManipulator.SaveFormat.JPEG }
      );

      incrementScans();
      analyzeImage(manipulatedImage.uri, 'image/jpeg', 'analyzed_meal.jpg');
    } catch (err) {
      logger.error('Image manipulation failed:', err);
      incrementScans();
      analyzeImage(uri, type, fileName);
    } finally {
      setIsProcessing(false);
    }
  }, [isPro, dailyScans, incrementScans, analyzeImage, isGuest, presentModal, onTriggerAuth]);

  const handleLogMeal = useCallback(() => {
    if (result) {
      onLogMeal(result.totals);
      presentModal('logSuccess', {
        onAddMore: () => resetAnalysis(),
        onViewStats: () => {
          resetAnalysis();
          router.push('/stats');
        },
      });
    }
  }, [result, onLogMeal, presentModal, resetAnalysis, router]);

  return (
    <>
      <ScanUI
        loading={loading || isProcessing}
        result={result}
        currentImage={currentImage}
        error={error}
        onImageSelected={handleImageSelected}
        onReset={resetAnalysis}
        onLogMeal={handleLogMeal}
      />
    </>
  );
};
