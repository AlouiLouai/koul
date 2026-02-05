import React, { useCallback, useState } from 'react';
import { ScanUI } from './ScanUI';
import { useImageAnalysis } from '../../hooks/useImageAnalysis';
import { QuotaExceededModal } from '../../components/QuotaExceededModal';
import { GuestQuotaModal } from '../../components/GuestQuotaModal';
import * as ImageManipulator from 'expo-image-manipulator';
import { useRouter } from 'expo-router';

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
  const [showQuotaModal, setShowQuotaModal] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [showLogSuccess, setShowLogSuccess] = useState(false);
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
        setShowGuestModal(true);
      } else {
        setShowQuotaModal(true);
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
      console.error('Image manipulation failed:', err);
      incrementScans();
      analyzeImage(uri, type, fileName);
    } finally {
      setIsProcessing(false);
    }
  }, [isPro, dailyScans, incrementScans, analyzeImage, isGuest]);

  const handleLogMeal = useCallback(() => {
    if (result) {
      onLogMeal(result.totals);
      setShowLogSuccess(true);
    }
  }, [result, onLogMeal]);

  const handleViewStats = () => {
      setShowLogSuccess(false);
      resetAnalysis();
      router.push('/stats');
  };

  const handleCloseSuccess = () => {
      setShowLogSuccess(false);
      resetAnalysis();
  };

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
        showLogSuccess={showLogSuccess}
        onCloseLogSuccess={handleCloseSuccess}
        onViewStats={handleViewStats}
      />
      
      <QuotaExceededModal 
        visible={showQuotaModal} 
        onClose={() => setShowQuotaModal(false)}
        onUpgrade={() => {
          setShowQuotaModal(false);
          onShowUpgrade();
        }}
      />

      <GuestQuotaModal
        visible={showGuestModal}
        onClose={() => setShowGuestModal(false)}
        onConnect={() => {
          setShowGuestModal(false);
          if (onTriggerAuth) onTriggerAuth();
        }}
      />
    </>
  );
};
