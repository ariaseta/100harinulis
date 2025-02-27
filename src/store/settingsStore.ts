import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabaseClient';

interface AppSettings {
  id?: string;
  linkedin_login_enabled: boolean;
  email_login_enabled: boolean;
}

interface SettingsState {
  settings: AppSettings | null;
  isLoading: boolean;
  error: Error | null;
  lastFetched: number | null;
  
  fetchSettings: () => Promise<void>;
  updateSettings: (updates: Partial<AppSettings>) => Promise<AppSettings | null>;
}

// Cache expiration time in milliseconds (5 minutes)
const CACHE_EXPIRATION = 5 * 60 * 1000;

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      settings: null,
      isLoading: false,
      error: null,
      lastFetched: null,
      
      fetchSettings: async () => {
        // Check if we have cached data that's still fresh
        const now = Date.now();
        const lastFetched = get().lastFetched;
        if (lastFetched && now - lastFetched < CACHE_EXPIRATION && get().settings) {
          // Use cached data
          return;
        }
        
        try {
          set({ isLoading: true });
          
          const { data, error } = await supabase
            .from('app_settings')
            .select('*')
            .limit(1)
            .single();
          
          if (error) {
            console.error('Error fetching app settings:', error);
            // If we can't fetch settings, default to enabling both methods
            set({ 
              settings: { 
                linkedin_login_enabled: true, 
                email_login_enabled: true 
              },
              lastFetched: Date.now()
            });
            return;
          }
          
          set({ 
            settings: {
              id: data.id,
              linkedin_login_enabled: data.linkedin_login_enabled,
              email_login_enabled: data.email_login_enabled
            },
            lastFetched: Date.now() 
          });
        } catch (err) {
          console.error('Error fetching app settings:', err);
          // If we can't fetch settings, default to enabling both methods
          set({ 
            settings: { linkedin_login_enabled: true, email_login_enabled: true },
            error: err instanceof Error ? err : new Error('Unknown error occurred')
          });
        } finally {
          set({ isLoading: false });
        }
      },
      
      updateSettings: async (updates) => {
        try {
          set({ isLoading: true });
          
          const { data, error } = await supabase
            .from('app_settings')
            .update({
              ...updates,
              updated_at: new Date().toISOString(),
            })
            .eq('id', get().settings?.id || '')
            .select()
            .single();
          
          if (error) {
            throw error;
          }
          
          set({ 
            settings: {
              id: data.id,
              linkedin_login_enabled: data.linkedin_login_enabled,
              email_login_enabled: data.email_login_enabled
            },
            lastFetched: Date.now()
          });
          
          return data;
        } catch (err) {
          console.error('Error updating app settings:', err);
          set({ error: err instanceof Error ? err : new Error('Unknown error occurred') });
          throw err;
        } finally {
          set({ isLoading: false });
        }
      }
    }),
    {
      name: 'settings-storage',
      partialize: (state) => ({ 
        settings: state.settings,
        lastFetched: state.lastFetched
      }),
    }
  )
);