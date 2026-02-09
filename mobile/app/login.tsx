import { AuthContainer } from "@/features/auth"
import { router } from "expo-router";

export default function LoginScreen() {
    return (
        <AuthContainer onAuthenticated={() => router.back()} />
    );
}