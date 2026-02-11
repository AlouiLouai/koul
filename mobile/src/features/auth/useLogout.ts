import { logger } from "@/lib/logger";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

export function useLogout() {
    const [isLoading, setIsLoading] = useState(false);
    const handleLogout = async () => {
        setIsLoading(true);
        const { error } = await supabase.auth.signOut();
        if (error) {
            logger.error("handleLogout - signOut error", { error });
        }
        setIsLoading(false);
        return true;
    }
    return { handleLogout, isLoading };
}