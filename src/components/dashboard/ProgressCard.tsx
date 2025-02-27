import React from 'react';
import { Calendar, CheckCircle, Loader2 } from 'lucide-react';

interface ProgressCardProps {
  currentDay: number;
  totalDays: number;
  days: Array<{ day: number; status: string }>;
  isUpdating: boolean;
  updateSuccess: boolean;
  handleDayClick: (day: number) => void;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ 
  currentDay, 
  totalDays, 
  days, 
  isUpdating, 
  updateSuccess,
  handleDayClick 
}) => {
  const progress = (currentDay / totalDays) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-blue-600" />
          Progress Tantangan
        </h2>
        <span className="text-sm font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
          {currentDay} / {totalDays} Hari
        </span>
      </div>
      
      {/* Success Message */}
      {updateSuccess && (
        <div className="mb-4 p-3 bg-green-50 border border-green-100 rounded-lg flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          <p className="text-green-700 text-sm">Progress berhasil diperbarui!</p>
        </div>
      )}
      
      {/* Instructions */}
      <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
        <p className="text-blue-700 text-sm">
          <span className="font-medium">Petunjuk:</span> Klik pada angka untuk memperbarui progress Anda.
        </p>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
        <div 
          className="bg-blue-600 h-4 rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-10 gap-2">
        {days.map((day) => (
          <button 
            key={day.day}
            onClick={() => handleDayClick(day.day)}
            disabled={isUpdating}
            className={`h-8 w-8 rounded-md flex items-center justify-center text-sm font-medium transition-all duration-200 ${
              day.status === 'completed' 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : day.status === 'current' 
                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-600 hover:bg-blue-200' 
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200 cursor-pointer'
            } ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {isUpdating && currentDay === day.day ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              day.day
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProgressCard;