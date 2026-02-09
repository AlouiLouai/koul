import { useState } from 'react';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@/lib/react-query';
import { API_CONFIG } from '../apiConfig';
import type { AnalysisResponse } from '../types';
import { logger } from '@/lib/logger';

export const useImageAnalysis = () => {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: result } = useQuery<AnalysisResponse | null>({
    queryKey: ['analysis', 'last'],
    queryFn: async () => null,
    initialData: null,
    enabled: false,
  });

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
      queryClient.setQueryData(['analysis', 'last'], data);
    },
  });

  const analyzeImage = async (uri: string, type: string, fileName: string) => {
    mutation.reset();
    setCurrentImage(uri);
    queryClient.setQueryData(['analysis', 'last'], null);
    try {
      await mutation.mutateAsync({ uri, type, fileName });
    } catch {
      // Error state is surfaced via mutation.isError.
    }
  };

  const resetAnalysis = () => {
    queryClient.setQueryData(['analysis', 'last'], null);
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
