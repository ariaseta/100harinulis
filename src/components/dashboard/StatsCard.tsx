import React from 'react';
import { BarChart3 } from 'lucide-react';

interface StatsCardProps {
  stats: {
    totalLikes: number;
    totalComments: number;
    totalShares: number;
    averageEngagement: number | string;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold flex items-center mb-6">
        <BarChart3 className="mr-2 h-5 w-5 text-blue-600" />
        Statistik Engagement
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-500 text-sm">Total Likes</p>
          <p className="text-2xl font-bold">{stats.totalLikes}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-500 text-sm">Total Komentar</p>
          <p className="text-2xl font-bold">{stats.totalComments}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-500 text-sm">Total Shares</p>
          <p className="text-2xl font-bold">{stats.totalShares}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-500 text-sm">Rata-rata Engagement</p>
          <p className="text-2xl font-bold">{stats.averageEngagement}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;