import React, { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import { usePostsStore } from '../store/postsStore';
import LoadingScreen from '../components/LoadingScreen';
import { supabase } from '../lib/supabaseClient';

// Dashboard Components
import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import ProgressCard from '../components/dashboard/ProgressCard';
import RecentPostsCard from '../components/dashboard/RecentPostsCard';
import StatsCard from '../components/dashboard/StatsCard';
import StreakCard from '../components/dashboard/StreakCard';
import MilestoneCard from '../components/dashboard/MilestoneCard';

const Dashboard: React.FC = () => {
  const { user, profile, isLoading: authLoading, isInitialized } = useAuthStore();
  const { posts, isLoading: postsLoading, fetchPosts } = usePostsStore();
  
  const [currentDay, setCurrentDay] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const totalDays = 100;
  
  // Use useCallback to prevent unnecessary re-renders
  const loadPosts = useCallback(() => {
    if (user) {
      fetchPosts();
    }
  }, [user, fetchPosts]);
  
  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    if (profile) {
      setCurrentDay(profile.current_day || 0);
    }
  }, [profile]);
  
  // Generate days array based on current day
  const days = Array.from({ length: totalDays }, (_, i) => {
    if (i < currentDay) {
      return { day: i + 1, status: 'completed' };
    } else if (i === currentDay) {
      return { day: i + 1, status: 'current' };
    } else {
      return { day: i + 1, status: 'upcoming' };
    }
  });

  // Handle day click to update progress
  const handleDayClick = async (day: number) => {
    if (!user || isUpdating) return;
    
    try {
      setIsUpdating(true);
      
      // Update the profile in the database
      const { error } = await supabase
        .from('profiles')
        .update({
          current_day: day,
          current_streak: day,
          longest_streak: Math.max(day, profile?.longest_streak || 0),
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) {
        throw error;
      }
      
      // Update local state
      setCurrentDay(day);
      
      // Show success message
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
      
      // Refresh the profile in the auth store
      await useAuthStore.getState().fetchProfile(user.id);
      
    } catch (error) {
      console.error('Error updating day:', error);
    } finally {
      setIsUpdating(false);
    }
  };
  
  // Use posts from the hook or fallback to mock data if empty
  const recentPosts = posts && posts.length > 0 
    ? posts.slice(0, 3).map(post => ({
        id: post.id,
        title: post.title || `Tulisan Hari ke-${post.day_number}`,
        date: new Date(post.created_at).toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        likes: post.likes_count || 0,
        comments: post.comments_count || 0,
        url: post.post_url
      }))
    : [
        {
          id: 1,
          title: 'Bagaimana Saya Meningkatkan Produktivitas dengan Teknik Pomodoro',
          date: '2 jam yang lalu',
          likes: 45,
          comments: 12,
          url: 'https://linkedin.com/post/1'
        },
        {
          id: 2,
          title: 'Tips Menulis Konten LinkedIn yang Menarik Perhatian Recruiter',
          date: '1 hari yang lalu',
          likes: 78,
          comments: 23,
          url: 'https://linkedin.com/post/2'
        },
        {
          id: 3,
          title: '5 Kesalahan yang Sering Dilakukan Penulis Pemula di LinkedIn',
          date: '2 hari yang lalu',
          likes: 56,
          comments: 18,
          url: 'https://linkedin.com/post/3'
        }
      ];
  
  // Calculate stats based on posts or use mock data - memoize this calculation
  const stats = React.useMemo(() => {
    if (!posts || posts.length === 0) {
      return {
        totalLikes: 1245,
        totalComments: 342,
        totalShares: 156,
        averageEngagement: 24.5
      };
    }
    
    const totalLikes = posts.reduce((sum, post) => sum + (post.likes_count || 0), 0);
    const totalComments = posts.reduce((sum, post) => sum + (post.comments_count || 0), 0);
    const totalShares = Math.floor(totalLikes * 0.12); // Estimate shares as 12% of likes
    const averageEngagement = posts.length > 0 
      ? ((totalLikes + totalComments + totalShares) / posts.length).toFixed(1)
      : 0;
    
    return {
      totalLikes,
      totalComments,
      totalShares,
      averageEngagement
    };
  }, [posts]);

  // Only show loading on initial load, not on subsequent data fetches
  if (!isInitialized && (authLoading || postsLoading)) {
    return <LoadingScreen />;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container-custom py-8">
        {/* Welcome Banner */}
        <WelcomeBanner currentDay={currentDay} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Card */}
            <ProgressCard 
              currentDay={currentDay}
              totalDays={totalDays}
              days={days}
              isUpdating={isUpdating}
              updateSuccess={updateSuccess}
              handleDayClick={handleDayClick}
            />
            
            {/* Recent Posts */}
            <RecentPostsCard posts={recentPosts} />
          </div>
          
          {/* Right Column */}
          <div className="space-y-8">
            {/* Stats Card */}
            <StatsCard stats={stats} />
            
            {/* Streak Status */}
            <StreakCard currentDay={currentDay} />
            
            {/* Upcoming Milestones */}
            <MilestoneCard currentDay={currentDay} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default React.memo(Dashboard);