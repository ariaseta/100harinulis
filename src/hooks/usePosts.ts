import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';

export function usePosts() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) {
      setPosts([]);
      setLoading(false);
      return;
    }

    async function fetchPosts() {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('user_id', user.id)
          .order('day_number', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        setPosts(data || []);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [user]);

  const addPost = async (postData: { post_url: string; day_number: number; title?: string }) => {
    try {
      if (!user) throw new Error('No user logged in');
      
      setLoading(true);
      
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
      
      setPosts(prevPosts => [data, ...prevPosts]);
      
      // Update user's current_day and streak in profiles table
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
      
      return data;
    } catch (err) {
      console.error('Error adding post:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    posts,
    loading,
    error,
    addPost,
  };
}