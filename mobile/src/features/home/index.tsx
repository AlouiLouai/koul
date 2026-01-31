import React, { useCallback, useState } from 'react';
import { HomeUI } from './HomeUI';
import { useImageAnalysis } from '../../hooks/useImageAnalysis';
import { QuotaExceededModal } from '../../components/QuotaExceededModal';

interface HomeContainerProps {
  onLogMeal: (totals: any) => void;
  onShowLogSuccess: () => void;
  dailyScans: number;
  incrementScans: () => void;
  isPro: boolean;
  onShowUpgrade: () => void;
}

export const HomeContainer = ({ 
  onLogMeal, 
  onShowLogSuccess, 
  dailyScans, 
  incrementScans, 
  isPro, 
  onShowUpgrade 
}: HomeContainerProps) => {
  const [showQuotaModal, setShowQuotaModal] = useState(false);

  // Logic & State (The "Smart" Part)
  const { 
    loading, 
    result, 
    currentImage, 
    error, 
    analyzeImage, 
    resetAnalysis 
  } = useImageAnalysis();

  // Intercept the image selection to check limits
  const handleImageSelected = useCallback((uri: string, type: string, fileName: string) => {
    // FREEMIUM GUARD
    if (!isPro && dailyScans >= 3) {
      setShowQuotaModal(true);
      return;
    }

    // Proceed if allowed
    incrementScans();
    analyzeImage(uri, type, fileName);
  }, [isPro, dailyScans, incrementScans, analyzeImage]);

  // Handlers
  const handleLogMeal = useCallback(() => {
    if (result) {
      onLogMeal(result.totals);
      onShowLogSuccess();
    }
  }, [result, onLogMeal, onShowLogSuccess]);

  // Render the Dumb UI
  return (
    <>
      <HomeUI
        loading={loading}
        result={result}
        currentImage={currentImage}
        error={error}
        onImageSelected={handleImageSelected}
        onReset={resetAnalysis}
        onLogMeal={handleLogMeal}
      />
      
      <QuotaExceededModal 
        visible={showQuotaModal} 
        onClose={() => setShowQuotaModal(false)}
        onUpgrade={() => {
          setShowQuotaModal(false);
          onShowUpgrade();
        }}
      />
    </>
  );
};