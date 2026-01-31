import { useState } from 'react';
import axios from 'axios';
import { API_CONFIG } from '../apiConfig';
import type { AnalysisResponse } from '../types';

export const useImageAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeImage = async (uri: string, type: string, fileName: string) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setCurrentImage(uri);

    const formData = new FormData();
    formData.append('image', {
      uri,
      type,
      name: fileName,
    } as any);

    try {
      console.log('Sending request to:', `${API_CONFIG.BASE_URL}/api/analyze`);
      const response = await axios.post(`${API_CONFIG.BASE_URL}/api/analyze`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000, 
      });

      setResult(response.data);
    } catch (err: any) {
      console.error('API Error:', err);
      setError('Could not analyze image. Check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setResult(null);
    setCurrentImage(null);
    setError(null);
  };

  return {
    loading,
    result,
    currentImage,
    error,
    analyzeImage,
    resetAnalysis
  };
};
