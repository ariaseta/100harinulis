import { create } from 'zustand';
import { supabase } from '../lib/supabaseClient';
import { useAuthStore } from './authStore';

interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  current_day: number;
  longest_streak: number;
  current_streak: number;
  last_post_date: string | null;
  [key: string]: any;
}

interface ProfileState {
  profile: Profile | null;
  isLoading: boolean;
  error: Error | null;
  
  fetchProfile: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<Profile | null>;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  isLoading: false,
  error: null,
  
  fetchProfile: async () => {
    const user = useAuthStore.getState().user;
    
    if (!user) {
      set({ profile: null, isLoading: false });
      return;
    }
    
    try {
      set({ isLoading: true });
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        throw error;
      }
      
      set({ profile: data });
    } catch (err) {
      console.error('Error fetching profile:', err);
      set({ error: err instanceof Error ? err : new Error('Unknown error occurred') });
    } finally {
      set({ isLoading: false });
    }
  },
  
  updateProfile: async (updates) => {
    const user = useAuthStore.getState().user;
    
    if (!user) {
      set({ error: new Error('No user logged in') });
      return null;
    }
    
    try {
      set({ isLoading: true });
      
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      set({ profile: data });
      
      // Update the profile in the auth store as well
      useAuthStore.setState({ profile: data });
      
      return data;
    } catch (err) {
      console.error('Error updating profile:', err);
      set({ error: err instanceof Error ? err : new Error('Unknown error occurred') });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  }
}));