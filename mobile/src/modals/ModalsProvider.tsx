import { BottomSheetModal, BottomSheetModalProvider, useBottomSheetModal } from "@gorhom/bottom-sheet"
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useRef, useState } from "react"
import { PremiumRequiredModal, MODAL_NAME as PREMIUM_REQUIRED_MODAL_NAME } from "./PremiumRequiredModal";
import { LoginModal, MODAL_NAME as LOGIN_MODAL_NAME } from "./LoginModal";
import { GuestQuotaModal, MODAL_NAME as GUEST_QUOTA_MODAL_NAME } from "./GuestQuotaModal";
import { LogSuccessModal, MODAL_NAME as LOG_SUCCESS_MODAL_NAME } from "./LogSuccessModal";
import { QuotaExceededModal, MODAL_NAME as QUOTA_EXCEEDED_MODAL_NAME } from "./QuotaExceededModal";
import { logger } from "@/lib/logger";
import { useSegments } from "expo-router";


type ModalName = typeof PREMIUM_REQUIRED_MODAL_NAME | typeof LOGIN_MODAL_NAME | typeof GUEST_QUOTA_MODAL_NAME | typeof LOG_SUCCESS_MODAL_NAME | typeof QUOTA_EXCEEDED_MODAL_NAME;

type ModalsContextType = {
    presentModal: (modalName: ModalName, options?: Record<string, unknown>) => void;
    dismissModal: (modalName: ModalName) => void;
    dismissAllModals: () => void;
    getModalOptions: (modalName: ModalName) => Record<string, unknown> | undefined;
}

const ModalsContext = createContext<ModalsContextType | null>(null);

type ModalRefs = Record<ModalName, React.RefObject<BottomSheetModal | null>>;
type ModalOptionsState = Record<string, Record<string, unknown>>;

const InternalModalsProvider = ({
    children,
    modalRefs,
    modalOptions,
    setModalOptions,
    modalElements,
}: PropsWithChildren<{
    modalRefs: ModalRefs;
    modalOptions: ModalOptionsState;
    setModalOptions: React.Dispatch<React.SetStateAction<ModalOptionsState>>;
    modalElements: React.ReactNode;
}>) => {
    const { dismiss, dismissAll } = useBottomSheetModal()

    const dismissModal = (modalName: ModalName) => {
        dismiss(modalName)
    }

    const presentModal = useCallback((modalName: ModalName, options?: Record<string, unknown>) => {
        if (options) {
            setModalOptions(prev => ({ ...prev, [modalName]: options }));
        }
        logger.debug('presenting modal', modalName);
        modalRefs[modalName].current?.present();
    }, [modalRefs, setModalOptions]);

    const getModalOptions = useCallback((modalName: ModalName) => {
        return modalOptions[modalName];
    }, [modalOptions]);

    const value: ModalsContextType = {
        presentModal,
        dismissModal,
        dismissAllModals: dismissAll,
        getModalOptions,
    }
    return (
        <ModalsContext.Provider value={value}>
            {children}
            {modalElements}
        </ModalsContext.Provider>
    )
}



export const ModalsProvider = ({ children }: PropsWithChildren) => {
    const premiumRequiredModal = useRef<BottomSheetModal>(null);
    const loginModal = useRef<BottomSheetModal>(null);
    const guestQuotaModal = useRef<BottomSheetModal>(null);
    const logSuccessModal = useRef<BottomSheetModal>(null);
    const quotaExceededModal = useRef<BottomSheetModal>(null);
    const [modalOptions, setModalOptions] = useState<ModalOptionsState>({});
    const segments = useSegments();

    const modalRefs: ModalRefs = {
        [PREMIUM_REQUIRED_MODAL_NAME]: premiumRequiredModal,
        [LOGIN_MODAL_NAME]: loginModal,
        [GUEST_QUOTA_MODAL_NAME]: guestQuotaModal,
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

    const modalElements = (
        <>
            <PremiumRequiredModal ref={premiumRequiredModal} />
            <LoginModal ref={loginModal} />
            <GuestQuotaModal ref={guestQuotaModal} />
            <LogSuccessModal ref={logSuccessModal} />
            <QuotaExceededModal ref={quotaExceededModal} />
        </>
    );

    return (
        <BottomSheetModalProvider>
            <InternalModalsProvider
                modalRefs={modalRefs}
                modalOptions={modalOptions}
                setModalOptions={setModalOptions}
                modalElements={modalElements}
            >
                {children}
            </InternalModalsProvider>
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