import { BottomSheetModal, BottomSheetModalProvider, useBottomSheetModal } from "@gorhom/bottom-sheet"
import { createContext, PropsWithChildren, useContext, useEffect, useRef } from "react"
import { PremiumRequiredModal, MODAL_NAME as PREMIUM_REQUIRED_MODAL_NAME } from "./PremiumRequiredModal";
import { LoginModal, MODAL_NAME as LOGIN_MODAL_NAME } from "./LoginModal";
import { logger } from "@/lib/logger";
import { useSegments } from "expo-router";



type ModalName = typeof PREMIUM_REQUIRED_MODAL_NAME | typeof LOGIN_MODAL_NAME;

type ModalsContextType = {
    presentModal: (modalName: ModalName) => void;
    dismissModal: (modalName: ModalName) => void;
    dismissAllModals: () => void;
}

const ModalsContext = createContext<ModalsContextType | null>(null);


const InternalModalsProvider = ({
    children,
    modals
}: PropsWithChildren<{ modals: Record<ModalName, BottomSheetModal | null> }>) => {
    const { dismiss, dismissAll } = useBottomSheetModal()

    const dismissModal = (modalName: ModalName) => {
        dismiss(modalName)
    }
    const presentModal = (modalName: ModalName) => {
        logger.debug('presenting modal', modalName);
        logger.debug('modal', modals[modalName]);
        modals[modalName]?.present();
    }
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
    const segments = useSegments();
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


    const modals = {
        [PREMIUM_REQUIRED_MODAL_NAME]: premiumRequiredModal.current,
        [LOGIN_MODAL_NAME]: loginModal.current,
    }

    return (
        <BottomSheetModalProvider>
            <InternalModalsProvider modals={modals}>
                {children}
            </InternalModalsProvider>
            <PremiumRequiredModal ref={premiumRequiredModal} />
            <LoginModal ref={loginModal} />
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