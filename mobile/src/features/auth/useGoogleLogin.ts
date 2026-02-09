import { useState } from "react";

export function useGoogleLogin(onAuthenticated: (user: any) => void) {
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleLogin = () => {
        setIsLoading(true);
        // MOCK LOGIN FOR EXPO GO
        setTimeout(() => {
            setIsLoading(false);
            onAuthenticated({
                email: 'test@example.com',
                name: 'Test User',
                photo: 'https://via.placeholder.com/150'
            });
        }, 1500);
    };

    return { handleGoogleLogin, isLoading };
}   