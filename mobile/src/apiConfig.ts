import { Platform } from 'react-native';

// --- Configuration Constants ---
const PROD_API_URL = 'https://nutriscan-api.politepond-83da7402.eastus2.azurecontainerapps.io';
const LOCAL_ANDROID_URL = 'http://10.0.2.2:3001';
const LOCAL_IOS_URL = 'http://localhost:3001';

/**
 * Determines the Base URL based on the environment and platform.
 * Priority:
 * 1. Production -> Always PROD_API_URL
 * 2. Dev -> process.env.EXPO_PUBLIC_API_URL (if set)
 * 3. Dev -> Platform specific localhost
 */
const getBaseUrl = (): string => {
  // 1. Production Environment -> Always PROD
  if (!__DEV__) {
    return PROD_API_URL;   
  }

  // 2. Development Override (Allow forcing local if needed)
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }

  // 3. Default to PROD for Development (Since backend is on Azure)
  // We skip localhost detection because you are testing against the cloud API.
  return PROD_API_URL;
};

export const API_CONFIG = {
  BASE_URL: getBaseUrl(),
  TIMEOUT: 30000, // 30s
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // Feature flags or versioning can go here
  VERSION: 'v1',
} as const;
