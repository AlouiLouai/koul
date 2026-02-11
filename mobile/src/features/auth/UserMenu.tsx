import { GlassView } from "@/components/GlassView";
import { useAuthState } from "./AuthState";
import { TouchableOpacity } from "react-native";
import { GoogleLogo } from "@/components/GoogleLogo";
import { router } from "expo-router";
import { Image } from "expo-image";





function AuthenticatedUserMenu() {
    const { user } = useAuthState();
    const avatar = user?.user_metadata.avatar_url ||
        user?.user_metadata.picture
    if (!user) return null;
    return (
        <GlassView style={{
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
        }} intensity={30} borderRadius={20}>
            <Image source={{ uri: avatar }} style={{ width: 40, height: 40 }} />
        </GlassView>);
}

function UnauthenticatedUserMenu() {
    return (
        <TouchableOpacity onPress={() => router.push('/login')} activeOpacity={0.8}>
            <GlassView style={{
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
            }} intensity={30} borderRadius={20}>
                <GoogleLogo size={20} />
            </GlassView>
        </TouchableOpacity>
    )
}
export function UserMenu() {
    const { isAuthenticated } = useAuthState();
    return isAuthenticated ? <AuthenticatedUserMenu /> : <UnauthenticatedUserMenu />;
}