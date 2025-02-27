import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';

interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  current_day: number;
  longest_streak: number;
  current_streak: number;
  last_post_date: string | null;
  is_admin?: boolean;
  [key: string]: any;
}

interface AuthState {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  isInitialized: boolean;
  error: Error | null;
  
  initialize: () => Promise<void>;
  signInWithLinkedIn: () => Promise<void>;
  signInWithOTP: (email: string) => Promise<void>;
  verifyOTP: (email: string, token: string) => Promise<any>;
  signOut: () => Promise<void>;
  fetchProfile: (userId: string) => Promise<void>;
  createProfile: (userId: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      session: null,
      user: null,
      profile: null,
      isLoading: false,
      isInitialized: false,
      error: null,

      initialize: async () => {
        // If already initialized, don't re-initialize
        if (get().isInitialized && get().user) {
          return;
        }
        
        try {
          set({ isLoading: true });
          
          // Get initial session
          const { data: { session } } = await supabase.auth.getSession();
          
          // Set up auth state change listener
          const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, newSession) => {
              console.log('Auth state changed:', event, newSession?.user?.id);
              
              // Update session and user in state
              set({ 
                session: newSession, 
                user: newSession?.user ?? null 
              });
              
              // If we have a user, fetch their profile
              if (newSession?.user) {
                await get().fetchProfile(newSession.user.id);
              } else {
                set({ profile: null });
              }
            }
          );
          
          // Set initial session and user
          set({ 
            session, 
            user: session?.user ?? null,
            isInitialized: true 
          });
          
          // If we have a user, fetch their profile
          if (session?.user) {
            await get().fetchProfile(session.user.id);
          }
          
          // Cleanup function will be called when the store is destroyed
          return () => {
            subscription.unsubscribe();
          };
        } catch (error) {
          console.error('Error initializing auth:', error);
          set({ 
            error: error instanceof Error ? error : new Error('Unknown error occurred'),
            isInitialized: true
          });
        } finally {
          set({ isLoading: false });
        }
      },

      fetchProfile: async (userId: string) => {
        try {
          set({ isLoading: true });
          
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

          if (error) {
            console.error('Error fetching profile:', error);
            // Create a profile if it doesn't exist
            if (error.code === 'PGRST116') {
              await get().createProfile(userId);
            } else {
              throw error;
            }
          } else {
            set({ profile: data });
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
          set({ error: error instanceof Error ? error : new Error('Unknown error occurred') });
        } finally {
          set({ isLoading: false });
        }
      },

      createProfile: async (userId: string) => {
        try {
          set({ isLoading: true });
          
          const { data: userData } = await supabase.auth.getUser();
          const user = userData?.user;
          
          if (!user) return;
          
          const { data, error } = await supabase
            .from('profiles')
            .insert({
              id: userId,
              full_name: user.user_metadata?.full_name || user.email?.split('@')[0],
              avatar_url: user.user_metadata?.avatar_url,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              current_day: 0,
              longest_streak: 0,
              current_streak: 0,
              is_admin: false
            })
            .select()
            .single();
          
          if (error) {
            console.error('Error creating profile:', error);
            throw error;
          } else {
            set({ profile: data });
          }
        } catch (error) {
          console.error('Error creating profile:', error);
          set({ error: error instanceof Error ? error : new Error('Unknown error occurred') });
        } finally {
          set({ isLoading: false });
        }
      },

      signInWithLinkedIn: async () => {
        try {
          set({ isLoading: true, error: null });
          
          const { error } = await supabase.auth.signInWithOAuth({
            provider: 'linkedin',
            options: {
              redirectTo: `${window.location.origin}/dashboard`,
            },
          });
          
          if (error) {
            throw error;
          }
        } catch (error) {
          console.error('LinkedIn sign in error:', error);
          set({ error: error instanceof Error ? error : new Error('Unknown error occurred') });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      signInWithOTP: async (email: string) => {
        try {
          set({ isLoading: true, error: null });
          
          const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
              // Use the current URL as the redirect URL to ensure we come back to the same page
              emailRedirectTo: `${window.location.origin}${window.location.pathname}`,
            },
          });
          
          if (error) {
            throw error;
          }
        } catch (error) {
          console.error('Email OTP sign in error:', error);
          set({ error: error instanceof Error ? error : new Error('Unknown error occurred') });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      verifyOTP: async (email: string, token: string) => {
        try {
          set({ isLoading: true, error: null });
          
          const { data, error } = await supabase.auth.verifyOtp({
            email,
            token,
            type: 'email',
          });
          
          if (error) {
            throw error;
          }
          
          return data;
        } catch (error) {
          console.error('OTP verification error:', error);
          set({ error: error instanceof Error ? error : new Error('Unknown error occurred') });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      signOut: async () => {
        try {
          set({ isLoading: true, error: null });
          
          const { error } = await supabase.auth.signOut();
          
          if (error) {
            throw error;
          }
          
          set({ user: null, session: null, profile: null });
        } catch (error) {
          console.error('Sign out error:', error);
          set({ error: error instanceof Error ? error : new Error('Unknown error occurred') });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        // Persist the isInitialized flag to prevent unnecessary re-initialization
        isInitialized: state.isInitialized,
        user: state.user,
        session: state.session,
        profile: state.profile
      }),
    }
  )
);