import React from 'react';
import { Edit3 } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface WelcomeBannerProps {
  currentDay: number;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ currentDay }) => {
  const { profile } = useAuthStore();

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 md:p-8 text-white mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Selamat Datang{profile?.full_name ? `, ${profile.full_name}` : ''}!
          </h1>
          <p className="text-blue-100">
            Anda berada di hari ke-{currentDay} dari tantangan 100 Hari Nulis. Terus konsisten!
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="btn bg-white text-blue-700 hover:bg-blue-50 flex items-center">
            <Edit3 className="mr-2 h-5 w-5" />
            Catat Tulisan Hari Ini
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;