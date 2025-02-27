import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Pencil, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuthStore();
  
  const isActive = (path: string) => location.pathname === path;
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Pencil className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">100HariNulis</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium ${isActive('/') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Beranda
            </Link>
            <Link 
              to="/hall-of-fame" 
              className={`font-medium ${isActive('/hall-of-fame') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Hall of Fame
            </Link>
            <Link 
              to="/sub-communities" 
              className={`font-medium ${isActive('/sub-communities') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Sub Komunitas
            </Link>
            
            {user ? (
              <div className="relative">
                <button 
                  onClick={toggleProfileMenu}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                >
                  {profile?.avatar_url ? (
                    <img 
                      src={profile.avatar_url} 
                      alt={profile?.full_name || 'User'} 
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                  )}
                  <span>{profile?.full_name || 'Pengguna'}</span>
                </button>
                
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link 
                      to="/dashboard" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button 
                      onClick={() => {
                        handleSignOut();
                        setIsProfileMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary">
                Masuk dengan LinkedIn
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button - Only visible on non-bottom-nav pages */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-600">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`font-medium px-2 py-1 ${isActive('/') ? 'text-blue-600' : 'text-gray-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Beranda
              </Link>
              <Link 
                to="/hall-of-fame" 
                className={`font-medium px-2 py-1 ${isActive('/hall-of-fame') ? 'text-blue-600' : 'text-gray-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Hall of Fame
              </Link>
              <Link 
                to="/sub-communities" 
                className={`font-medium px-2 py-1 ${isActive('/sub-communities') ? 'text-blue-600' : 'text-gray-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Sub Komunitas
              </Link>
              
              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="font-medium px-2 py-1 text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center font-medium px-2 py-1 text-gray-600 text-left"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Keluar
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="btn btn-primary w-full text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Masuk dengan LinkedIn
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;