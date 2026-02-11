import { useState } from "react";
import {
    GoogleSignin,
    isSuccessResponse,
    isErrorWithCode,
    statusCodes,
} from "@react-native-google-signin/google-signin";
import { logger } from "@/lib/logger";
import { supabase } from "@/lib/supabase";

// Configure Google Sign-In once at module level.
// webClientId is REQUIRED — it tells Google to issue an idToken for your
// Supabase (web) OAuth client so signInWithIdToken works server-side.
// iosClientId is needed for the native iOS sign-in flow.
GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    offlineAccess: false,
});

export function useGoogleLogin(onAuthenticated: (user: any) => void) {
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleLogin = async () => {
        logger.debug("handleGoogleLogin - start");
        setIsLoading(true);

        try {
            // Ensure Google Play Services are available (Android-only, no-op on iOS)
            await GoogleSignin.hasPlayServices();

            // Trigger native Google Sign-In UI
            const response = await GoogleSignin.signIn();

            if (isSuccessResponse(response)) {
                const idToken = response.data?.idToken;

                if (!idToken) {
                    logger.error("handleGoogleLogin - no idToken in response");
                    return;
                }

                logger.debug("handleGoogleLogin - got idToken, exchanging with Supabase");

                // Exchange the native Google idToken for a Supabase session
                const { data, error } = await supabase.auth.signInWithIdToken({
                    provider: "google",
                    token: idToken,
                });

                if (error) {
                    logger.error("handleGoogleLogin - signInWithIdToken error", { error });
                    return;
                }

                logger.debug("handleGoogleLogin - success", { userId: data.user?.id });
                onAuthenticated(data.user);
            } else {
                // User cancelled the sign-in flow
                logger.debug("handleGoogleLogin - cancelled by user");
            }
        } catch (error) {
            if (isErrorWithCode(error)) {
                switch (error.code) {
                    case statusCodes.IN_PROGRESS:
                        logger.debug("handleGoogleLogin - sign in already in progress");
                        break;
                    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                        logger.error("handleGoogleLogin - Google Play Services not available");
                        break;
                    default:
                        logger.error("handleGoogleLogin - error", {
                            code: error.code,
                            message: error.message,
                        });
                }
            } else {
                logger.error("handleGoogleLogin - unexpected error", { error });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return { handleGoogleLogin, isLoading };
}
