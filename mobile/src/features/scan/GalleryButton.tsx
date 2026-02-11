import { GlassView } from "@/components/GlassView"
import { ImageIcon, } from "lucide-react-native"
import { TouchableOpacity, Text, Alert, Linking } from "react-native"
import { useTheme } from "@/theme/ThemeContext"
import { useMediaLibraryPermissions, PermissionStatus, launchImageLibraryAsync } from 'expo-image-picker'
import { logger } from "@/lib/logger"
import { useProcessImage } from "./useProcessImage"

export const GalleryButton = () => {
    const { colors } = useTheme();
    const [mediaLibraryPermissions, requestMediaLibraryPermissions] = useMediaLibraryPermissions();
    const { processImage, isProcessing } = useProcessImage();
    const alertPermissionRequired = () => {
        Alert.alert('Sma7na',
            'Na7tejou permission bech n7ellou el gallery! 📸',
            [{ text: 'OK', isPreferred: true }, { text: 'Settings', onPress: Linking.openSettings }]
        );
    }
    const requestPermission = async () => {
        if (!mediaLibraryPermissions?.canAskAgain) {
            const permission = await requestMediaLibraryPermissions();
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
            const res = await launchImageLibraryAsync({
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
        switch (mediaLibraryPermissions?.status) {
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
            activeOpacity={0.7}
            style={{ width: '100%', }}
            disabled={isProcessing}
        >
            <GlassView intensity={20} borderRadius={28} style={{
                borderColor: colors.primary,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 12,
                gap: 8,
                borderWidth: 1.5,
            }}>
                <ImageIcon size={20} color={colors.textSecondary} />
                <Text style={{
                    color: colors.text,
                    fontSize: 15,
                    fontWeight: '800',
                }}>Gallery</Text>
            </GlassView>
        </TouchableOpacity>
    )
}