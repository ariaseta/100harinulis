import React from 'react';
import { Award, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface StreakCardProps {
  currentDay: number;
}

const StreakCard: React.FC<StreakCardProps> = ({ currentDay }) => {
  const { profile } = useAuthStore();
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold flex items-center mb-6">
        <Award className="mr-2 h-5 w-5 text-blue-600" />
        Status Streak
      </h2>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <div className="bg-green-100 p-2 rounded-full mr-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="font-medium">Streak Saat Ini</p>
            <p className="text-gray-600">{profile?.current_streak || currentDay} hari berturut-turut</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-full mr-4">
            <Award className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="font-medium">Streak Terpanjang</p>
            <p className="text-gray-600">{profile?.longest_streak || currentDay} hari berturut-turut</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="bg-yellow-100 p-2 rounded-full mr-4">
            <AlertCircle className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <p className="font-medium">Jangan Lupa Menulis Hari Ini!</p>
            <p className="text-gray-600">Deadline: 23:59 WIB</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakCard;