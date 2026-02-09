import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { logger } from "@/lib/logger";
import { supabase } from "@/lib/supabase";
// NOTE: The following import triggers a lint error if the alias '@/app.json' is not resolvable.
// If you experience a module resolution error, consider importing expo config differently.
import { expo } from "../../../app.json";

WebBrowser.maybeCompleteAuthSession();

export function useGoogleLogin(onAuthenticated: (user: any) => void) {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        WebBrowser.warmUpAsync();
        return () => {
            WebBrowser.coolDownAsync();
        };
    }, []);


    function extractParamsFromUrl(url: string) {
        const parsedUrl = new URL(url);
        const hash = parsedUrl.hash.substring(1); // Remove the leading '#'
        const params = new URLSearchParams(hash);
        return {
            access_token: params.get("access_token"),
            expires_in: parseInt(params.get("expires_in") || "0"),
            refresh_token: params.get("refresh_token"),
            token_type: params.get("token_type"),
            provider_token: params.get("provider_token"),
            code: params.get("code"),
        };
    };



    const handleGoogleLogin = async () => {
        logger.debug('handleGoogleLogin - start');
        setIsLoading(true);
        const res = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${expo.scheme}://google-auth`,
                queryParams: { prompt: "consent" },
                skipBrowserRedirect: true,
            },
        });
        const googleOAuthUrl = res.data.url;
        if (!googleOAuthUrl) {
            logger.error("no oauth url found!");
            return;
        }
        const result = await WebBrowser.openAuthSessionAsync(
            googleOAuthUrl,
            `${expo.scheme}://google-auth`,
            { showInRecents: true },
        ).catch((err) => {
            logger.error('handleGoogleLogin - openAuthSessionAsync - error', { err });
            return;
        });

        logger.debug('handleGoogleLogin - openAuthSessionAsync - result', { result });


        if (result && result.type === "success") {
            logger.debug('handleGoogleLogin - openAuthSessionAsync - success');
            const params = extractParamsFromUrl(result.url);
            logger.debug('handleGoogleLogin - openAuthSessionAsync - success', { params });
            if (params.access_token && params.refresh_token) {
                logger.debug('handleGoogleLogin - setSession');
                const { data, error } = await supabase.auth.setSession({
                    access_token: params.access_token,
                    refresh_token: params.refresh_token,
                });
                if (error) {
                    logger.error('handleGoogleLogin - setSession - error', { error });
                    return;
                }
                logger.debug('handleGoogleLogin - setSession - success', { data, error });
                onAuthenticated(data.user);
            } else {
                logger.error('handleGoogleLogin - setSession - failed');
                // sign in/up failed
            }
        } else {
            logger.error('handleGoogleLogin - openAuthSessionAsync - failed');
        }
        setIsLoading(false);
    };

    return { handleGoogleLogin, isLoading };
}   