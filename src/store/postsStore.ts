import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabaseClient';
import { useAuthStore } from './authStore';

interface Post {
  id: string;
  created_at: string;
  user_id: string;
  post_url: string;
  day_number: number;
  likes_count: number | null;
  comments_count: number | null;
  title: string | null;
}

interface PostsState {
  posts: Post[];
  isLoading: boolean;
  error: Error | null;
  lastFetched: number | null;
  
  fetchPosts: () => Promise<void>;
  addPost: (postData: { post_url: string; day_number: number; title?: string }) => Promise<Post | null>;
}

// Cache expiration time in milliseconds (5 minutes)
const CACHE_EXPIRATION = 5 * 60 * 1000;

export const usePostsStore = create<PostsState>()(
  persist(
    (set, get) => ({
      posts: [],
      isLoading: false,
      error: null,
      lastFetched: null,
      
      fetchPosts: async () => {
        const user = useAuthStore.getState().user;
        
        if (!user) {
          set({ posts: [], isLoading: false });
          return;
        }
        
        // Check if we have cached data that's still fresh
        const now = Date.now();
        const lastFetched = get().lastFetched;
        if (lastFetched && now - lastFetched < CACHE_EXPIRATION && get().posts.length > 0) {
          // Use cached data
          return;
        }
        
        try {
          set({ isLoading: true });
          
          const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('user_id', user.id)
            .order('day_number', { ascending: false });
          
          if (error) {
            throw error;
          }
          
          set({ posts: data || [], lastFetched: Date.now() });
        } catch (err) {
          console.error('Error fetching posts:', err);
          set({ error: err instanceof Error ? err : new Error('Unknown error occurred') });
        } finally {
          set({ isLoading: false });
        }
      },
      
      addPost: async (postData) => {
        const user = useAuthStore.getState().user;
        
        if (!user) {
          set({ error: new Error('No user logged in') });
          return null;
        }
        
        try {
          set({ isLoading: true });
          
          const { data, error } = await supabase
            .from('posts')
            .insert({
              user_id: user.id,
              ...postData,
            })
            .select()
            .single();
          
          if (error) {
            throw error;
          }
          
          set(state => ({ 
            posts: [data, ...state.posts],
            lastFetched: Date.now()
          }));
          
          // Update user's current_day and streak in profiles table
          const { posts } = get();
          await supabase
            .from('profiles')
            .update({
              current_day: postData.day_number,
              current_streak: postData.day_number,
              longest_streak: Math.max(postData.day_number, posts[0]?.longest_streak || 0),
              last_post_date: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq('id', user.id);
          
          // Refresh the profile data
          await useAuthStore.getState().fetchProfile(user.id);
          
          return data;
        } catch (err) {
          console.error('Error adding post:', err);
          set({ error: err instanceof Error ? err : new Error('Unknown error occurred') });
          throw err;
        } finally {
          set({ isLoading: false });
        }
      }
    }),
    {
      name: 'posts-storage',
      partialize: (state) => ({ 
        posts: state.posts,
        lastFetched: state.lastFetched
      }),
    }
  )
);