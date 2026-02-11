import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { AppState, AppStateStatus } from 'react-native';
import { createSecureStorage } from './mmkv';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;



let client: SupabaseClient;

export async function initializeSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables. Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY.',
    );
  }
  if (!client) {
    const key = 'supabase-encryption-key';
    const id = 'supabase-auth-storage';
    const secureStorage = await createSecureStorage(id, key)

    client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        storage: {
          getItem: async (key) => {
            return await secureStorage.getString(key) ?? null;
          },
          setItem: async (key, value) => {
            await secureStorage.set(key, value);
          },
          removeItem: async (key) => {
            await secureStorage.remove(key);
          },
        }
      },
    });
  }
  function handleAppStateChange(state: AppStateStatus) {
    if (state === 'active') {
      client.auth.startAutoRefresh()
    } else {
      client.auth.stopAutoRefresh()
    }
  }
  return AppState.addEventListener('change', handleAppStateChange)
}

export { client as supabase };
