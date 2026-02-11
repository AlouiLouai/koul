import { BottomSheetModal, BottomSheetModalProvider, useBottomSheetModal } from "@gorhom/bottom-sheet"
import { createContext, PropsWithChildren, useContext, useEffect, useRef } from "react"
import { PremiumRequiredModal, MODAL_NAME as PREMIUM_REQUIRED_MODAL_NAME } from "./PremiumRequiredModal";
import { LoginModal, MODAL_NAME as LOGIN_MODAL_NAME } from "./LoginModal";
import { LogSuccessModal, MODAL_NAME as LOG_SUCCESS_MODAL_NAME } from "./LogSuccessModal";
import { QuotaExceededModal, MODAL_NAME as QUOTA_EXCEEDED_MODAL_NAME } from "./QuotaExceededModal";
import { logger } from "@/lib/logger";
import { useSegments } from "expo-router";


type ModalName = typeof PREMIUM_REQUIRED_MODAL_NAME | typeof LOGIN_MODAL_NAME | typeof LOG_SUCCESS_MODAL_NAME | typeof QUOTA_EXCEEDED_MODAL_NAME;

type ModalsContextType = {
    presentModal: (modalName: ModalName, options?: Record<string, unknown>) => void;
    dismissModal: (modalName: ModalName) => void;
    dismissAllModals: () => void;
}

const ModalsContext = createContext<ModalsContextType | null>(null);

type ModalRefs = Record<ModalName, React.RefObject<BottomSheetModal | null>>;


const InternalModalsProvider = ({
    children,
    modalRefs,
}: PropsWithChildren<{
    modalRefs: ModalRefs;
}>) => {
    const { dismiss, dismissAll } = useBottomSheetModal()

    const dismissModal = (modalName: ModalName) => {
        dismiss(modalName)
    }
    const presentModal = (modalName: ModalName) => {
        logger.debug('presenting modal', modalName);
        modalRefs[modalName].current?.present();
    };

    const value: ModalsContextType = {
        presentModal,
        dismissModal,
        dismissAllModals: dismissAll,
    }
    return (
        <ModalsContext.Provider value={value}>
            {children}
        </ModalsContext.Provider>
    )
}



export const ModalsProvider = ({ children }: PropsWithChildren) => {
    const premiumRequiredModal = useRef<BottomSheetModal>(null);
    const loginModal = useRef<BottomSheetModal>(null);
    const logSuccessModal = useRef<BottomSheetModal>(null);
    const quotaExceededModal = useRef<BottomSheetModal>(null);
    const segments = useSegments();

    const modalRefs: ModalRefs = {
        [PREMIUM_REQUIRED_MODAL_NAME]: premiumRequiredModal,
        [LOGIN_MODAL_NAME]: loginModal,
        [LOG_SUCCESS_MODAL_NAME]: logSuccessModal,
        [QUOTA_EXCEEDED_MODAL_NAME]: quotaExceededModal,
    };

    // when the user is on the stats tab, we present the premium required modal
    useEffect(() => {
        const modal = premiumRequiredModal.current
        if (segments[0] === '(tabs)' && segments[1] === 'stats') {
            logger.debug('presenting premium required modal');
            modal?.present();
        }
        return () => {
            if (segments[0] === '(tabs)' && segments[1] === 'stats') {
                logger.debug('dismissing premium required modal');
                modal?.dismiss();
            }
        }
    }, [segments]);

    return (
        <BottomSheetModalProvider>
            <InternalModalsProvider
                modalRefs={modalRefs}
            >
                {children}
            </InternalModalsProvider>
            <PremiumRequiredModal ref={premiumRequiredModal} />
            <LoginModal ref={loginModal} />
            <LogSuccessModal ref={logSuccessModal} />
            <QuotaExceededModal ref={quotaExceededModal} />
        </BottomSheetModalProvider>
    )
}

export const useModals = () => {
    const context = useContext(ModalsContext);
    if (!context === undefined) {
        throw new Error('useModals must be used within a ModalsProvider');
    }
    return context as ModalsContextType;
}