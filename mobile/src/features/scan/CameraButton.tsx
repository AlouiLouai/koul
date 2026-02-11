import { useTheme } from "@/theme/ThemeContext";
import { Camera } from "lucide-react-native"
import { TouchableOpacity, Text, Alert, Linking } from "react-native"
import { useCameraPermissions, PermissionStatus, launchCameraAsync } from 'expo-image-picker'
import { useProcessImage } from "./useProcessImage";
import { logger } from "@/lib/logger";

export const CameraButton = () => {
    const { colors } = useTheme();
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const { processImage, isProcessing } = useProcessImage();
    const alertPermissionRequired = () => {
        Alert.alert('Sma7na',
            'Na7tejou permission bech n7ellou el gallery! 📸',
            [{ text: 'OK', isPreferred: true }, { text: 'Settings', onPress: Linking.openSettings }]
        );
    }
    const requestPermission = async () => {
        if (!cameraPermission?.canAskAgain) {
            const permission = await requestCameraPermission();
            if (!permission.granted) {
                alertPermissionRequired();
            } else {
                handlePress();
            }
        } else {
            alertPermissionRequired();
        }
    }
    const pickImage = async () => {
        try {
            const res = await launchCameraAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                quality: 0.7
            });
            if (!res.canceled && res.assets) {
                processImage(res.assets[0].uri, 'image/jpeg', res.assets[0].fileName || 'upload.jpg');
            }
        } catch (error) {
            logger.error('Gallery Error:', error);
        }

    }
    const handlePress = async () => {
        switch (cameraPermission?.status) {
            case PermissionStatus.DENIED:
            case PermissionStatus.UNDETERMINED:
                await requestPermission()
                break;
            case PermissionStatus.GRANTED:
                pickImage()
                break;
            default:
                break;
        }
    }


    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.8}
            style={{
                backgroundColor: colors.primary,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 14,
                borderRadius: 24,
                gap: 10,
                elevation: 6,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.15,
                shadowRadius: 15,
            }}
            disabled={isProcessing}
        >
            <Camera size={22} color="#fff" strokeWidth={2.5} />
            <Text style={{
                color: '#fff',
                fontSize: 16,
                fontWeight: '900',
            }}>Sawar Tawa</Text>
        </TouchableOpacity>
    )
}