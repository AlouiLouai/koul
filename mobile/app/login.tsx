import { AuthUI } from "@/features/auth/AuthUI";
import { useGoogleLogin } from "@/features/auth/useGoogleLogin";
import { router } from "expo-router";

export default function LoginScreen() {
    const { handleGoogleLogin, isLoading } = useGoogleLogin(() => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/(tabs)/profile');
        }
    });
    return (
        <AuthUI
            onGoogleLogin={handleGoogleLogin}
            isLoading={isLoading}
        />
    );
}