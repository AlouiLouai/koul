import { logger } from "@/lib/logger";
import { supabase } from "@/lib/supabase";
import { AuthChangeEvent, AuthError, Session, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

type AuthState = {
    user: User | null;
    session: Session | null;
    isLoading: boolean;
    error: AuthError | null;
    lastEvent: AuthChangeEvent | null;
};

const AuthStateContext = createContext<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    error: null,
    lastEvent: null,
});

function AuthStateProvider({ children }: { children: React.ReactNode }) {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        session: null,
        isLoading: true,
        error: null,
        lastEvent: null,
    });


    useEffect(() => {
        logger.debug('authState', authState);
    }, [authState]);

    useEffect(() => {
        supabase.auth.initialize().then(({ error }) => {
            setAuthState((prev) => ({ ...prev, error: error }));
        });
    }, []);

    useEffect(() => {
        //  https://supabase.com/docs/reference/javascript/auth-onauthstatechange
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setAuthState((prev) => ({ ...prev, user: session?.user ?? null, session: session ?? null, isLoading: false, lastEvent: event }));
        });
        return () => subscription.unsubscribe();
    }, []);

    return <AuthStateContext.Provider value={authState}>{children}</AuthStateContext.Provider>;
}

function useAuthState(): AuthState {
    const context = useContext(AuthStateContext);
    if (!context) {
        throw new Error('useAuthState must be used within a AuthStateProvider');
    }
    return context;
}

export { AuthStateProvider, useAuthState };
