import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Award, Users, User } from 'lucide-react';

const BottomNavbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-4 h-16">
        <Link 
          to="/" 
          className={`flex flex-col items-center justify-center ${isActive('/') ? 'text-blue-600' : 'text-gray-600'}`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Beranda</span>
        </Link>
        
        <Link 
          to="/hall-of-fame" 
          className={`flex flex-col items-center justify-center ${isActive('/hall-of-fame') ? 'text-blue-600' : 'text-gray-600'}`}
        >
          <Award className="h-5 w-5" />
          <span className="text-xs mt-1">Hall of Fame</span>
        </Link>
        
        <Link 
          to="/sub-communities" 
          className={`flex flex-col items-center justify-center ${isActive('/sub-communities') ? 'text-blue-600' : 'text-gray-600'}`}
        >
          <Users className="h-5 w-5" />
          <span className="text-xs mt-1">Komunitas</span>
        </Link>
        
        <Link 
          to={"/dashboard"} 
          className={`flex flex-col items-center justify-center ${isActive('/dashboard') || isActive('/login') ? 'text-blue-600' : 'text-gray-600'}`}
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profil</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavbar;