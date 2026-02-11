import { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import { GlassView } from "@/components/GlassView";
import { useAuthState } from "./AuthState";
import { GoogleLogo } from "@/components/GoogleLogo";
import { useLogout } from "./useLogout";
import { LogOut } from "lucide-react-native";
import { useTheme } from "@/theme/ThemeContext";





function AuthenticatedUserMenu() {
    const { user } = useAuthState();
    const { handleLogout, isLoading } = useLogout();
    const [isOpen, setIsOpen] = useState(false);
    const { colors } = useTheme();
    const avatar = user?.user_metadata.avatar_url ||
        user?.user_metadata.picture;

    if (!user) return null;

    const toggleMenu = () => setIsOpen((prev) => !prev);

    const logout = async () => {
        setIsOpen(false);
        await handleLogout();
    };

    return (
        <View style={{ position: 'relative' }}>
            <TouchableOpacity onPress={toggleMenu} activeOpacity={0.8}>
                <GlassView
                    style={{
                        width: 40,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    intensity={30}
                    borderRadius={20}
                >
                    <Image source={{ uri: avatar }} style={{ width: 40, height: 40, borderRadius: 20 }} />
                </GlassView>
            </TouchableOpacity>

            {isOpen && (
                <GlassView
                    style={{
                        position: 'absolute',
                        top: 48,
                        right: 0,
                        paddingVertical: 4,
                        paddingHorizontal: 8,
                        borderRadius: 16,
                        minWidth: 140,
                        zIndex: 1000,
                    }}
                    intensity={40}
                    borderRadius={16}
                >
                    <TouchableOpacity
                        onPress={logout}
                        disabled={isLoading}
                        style={{
                            paddingVertical: 8,
                            paddingHorizontal: 8,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8,
                        }}
                        activeOpacity={0.7}
                    >
                        <LogOut size={16} color={colors.error} />
                        <Text style={{ fontSize: 14, fontWeight: '600' }}>Logout</Text>
                    </TouchableOpacity>
                </GlassView>
            )}
        </View>
    );
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