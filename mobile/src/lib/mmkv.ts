import { Buffer } from "buffer";
import * as Crypto from "expo-crypto";
import * as SecureStore from "expo-secure-store";
// import { createMMKV, existsMMKV } from "react-native-mmkv";

const DEFAULT_ENCRYPTION_KEY_NAME = "mmkv_encryption_key";
const DEFAULT_STORAGE_ID = "default_secure";
const DEFAULT_SECURE_STORAGE_ID = "secure_storage";

// In-memory fallback for Expo Go
const memoryStorage = new Map<string, string>();

async function getOrCreateMMKVKey(keyName: string): Promise<string> {
    const existing = await SecureStore.getItemAsync(keyName);
    if (existing) return existing;
    const bytes = await Crypto.getRandomBytesAsync(32); // 256-bit
    const key = Buffer.from(bytes).toString("base64");
    await SecureStore.setItemAsync(keyName, key);
    return key;
}

export function createStorage(id: string = DEFAULT_STORAGE_ID) {
    // return createMMKV({ id: id });
    return {
        getString: (key: string) => memoryStorage.get(`${id}:${key}`),
        set: (key: string, value: string) => memoryStorage.set(`${id}:${key}`, value),
        remove: (key: string) => memoryStorage.delete(`${id}:${key}`),
    };
}

export async function createSecureStorage(id: string = DEFAULT_SECURE_STORAGE_ID, keyName: string = DEFAULT_ENCRYPTION_KEY_NAME) {
    // return createMMKV({ id: id, encryptionKey: await getOrCreateMMKVKey(keyName) });
    return {
        getString: (key: string) => memoryStorage.get(`${id}:${key}`),
        set: (key: string, value: string) => memoryStorage.set(`${id}:${key}`, value),
        remove: (key: string) => memoryStorage.delete(`${id}:${key}`),
    };
}

export function existsStorage(id: string) {
    // return existsMMKV(id);
    return Array.from(memoryStorage.keys()).some(k => k.startsWith(`${id}:`));
}
