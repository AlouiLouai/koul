import { queryClient, QueryClientProvider } from "@/lib/react-query";
import { ThemeProvider } from "@/theme/ThemeContext";
import { PropsWithChildren } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export function AppProviders({ children }: PropsWithChildren) {
    return (
        <SafeAreaProvider>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </QueryClientProvider>
        </SafeAreaProvider>
    )
}