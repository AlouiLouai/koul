import { ClickToPayModal } from "@/components/ClickToPayModal";
import { router } from "expo-router";

export default function PaymentScreen() {
    const handlePaymentComplete = () => {
        router.back();
    }
    return (
        <ClickToPayModal
            visible={true}
            onClose={() => router.back()}
            onComplete={handlePaymentComplete}
        />
    );
}