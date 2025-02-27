import React from 'react';
import { Clock } from 'lucide-react';

interface MilestoneCardProps {
  currentDay: number;
}

const MilestoneCard: React.FC<MilestoneCardProps> = ({ currentDay }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold flex items-center mb-6">
        <Clock className="mr-2 h-5 w-5 text-blue-600" />
        Milestone Berikutnya
      </h2>
      
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <p className="font-medium">50 Hari</p>
            <span className="text-sm bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
              {Math.max(0, 50 - currentDay)} hari lagi
            </span>
          </div>
          <p className="text-gray-600 text-sm">Setengah perjalanan! Anda akan mendapatkan badge khusus.</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <p className="font-medium">75 Hari</p>
            <span className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              {Math.max(0, 75 - currentDay)} hari lagi
            </span>
          </div>
          <p className="text-gray-600 text-sm">Hampir sampai! Anda akan mendapatkan sertifikat digital.</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <p className="font-medium">100 Hari</p>
            <span className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              {Math.max(0, 100 - currentDay)} hari lagi
            </span>
          </div>
          <p className="text-gray-600 text-sm">Finish line! Anda akan masuk Hall of Fame dan mendapatkan merchandise eksklusif.</p>
        </div>
      </div>
    </div>
  );
};

export default MilestoneCard;