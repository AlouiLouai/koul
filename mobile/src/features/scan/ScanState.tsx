import { AnalysisResponse } from "@/types";
import { createContext, PropsWithChildren, useContext } from "react";
import { useImageAnalysis } from "./useImageAnalysis";




interface ScanContextType {
    loading: boolean;
    result: AnalysisResponse | null;
    currentImage: string | null;
    error: string | null;
    analyzeImage: (uri: string, type: string, fileName: string) => Promise<void>;
    resetAnalysis: () => void;
}


const ScanContext = createContext<ScanContextType | undefined>(undefined);


export const ScanStateProvider = ({ children }: PropsWithChildren) => {
    const {
        loading,
        result,
        currentImage,
        error,
        analyzeImage,
        resetAnalysis
    } = useImageAnalysis();


    const value = {
        loading,
        result,
        currentImage,
        error,
        analyzeImage,
        resetAnalysis,
    }


    return (
        <ScanContext.Provider value={value}>
            {children}
        </ScanContext.Provider>
    )
}

export const useScanState = () => {
    const context = useContext(ScanContext);
    if (!context) {
        throw new Error('useScanState must be used within a ScanStateProvider');
    }
    return context;
}