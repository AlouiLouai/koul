import { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@/lib/react-query';
import { API_CONFIG } from '@/apiConfig';
import type { AnalysisResponse } from '@/types';
import { logger } from '@/lib/logger';

export const useImageAnalysis = () => {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResponse | null>(null);

  const mutation = useMutation({
    mutationFn: async ({ uri, type, fileName }: { uri: string; type: string; fileName: string }) => {
      const formData = new FormData();
      formData.append('image', {
        uri,
        type,
        name: fileName,
      } as any);

      logger.log('Sending request to:', `${API_CONFIG.BASE_URL}/api/analyze`);
      const response = await axios.post(`${API_CONFIG.BASE_URL}/api/analyze`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000,
      });

      return response.data as AnalysisResponse;
    },
    retry: 0,
    onSuccess: (data) => {
      setResult(data);
    },
  });

  const analyzeImage = async (uri: string, type: string, fileName: string) => {
    mutation.reset();
    setResult(null);
    setCurrentImage(uri);
    try {
      await mutation.mutateAsync({ uri, type, fileName });
    } catch {
      // Error state is surfaced via mutation.isError.
    }
  };

  const resetAnalysis = () => {
    setResult(null);
    setCurrentImage(null);
  };

  return {
    loading: mutation.isPending,
    result,
    currentImage,
    error: mutation.isError ? 'Could not analyze image. Check your connection.' : null,
    analyzeImage,
    resetAnalysis
  };
};
