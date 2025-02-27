import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import BottomNavbar from './components/BottomNavbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import HallOfFame from './pages/HallOfFame';
import SubCommunities from './pages/SubCommunities';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PrivacyPolicy from './pages/PrivacyPolicy';
import LoginSettings from './pages/admin/LoginSettings';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import { useAuthStore } from './store/authStore';
import { useSettingsStore } from './store/settingsStore';

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

function App() {
  const { initialize, isInitialized } = useAuthStore();
  const { fetchSettings } = useSettingsStore();
  
  useEffect(() => {
    // Only initialize if not already initialized
    if (!isInitialized) {
      initialize();
    }
    
    // Fetch app settings
    fetchSettings();
  }, [initialize, isInitialized, fetchSettings]);

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pb-16 md:pb-0">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hall-of-fame" element={<HallOfFame />} />
            <Route path="/sub-communities" element={<SubCommunities />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/admin/login-settings" element={
              <AdminRoute>
                <LoginSettings />
              </AdminRoute>
            } />
          </Routes>
        </main>
        <Footer />
        <BottomNavbar />
      </div>
    </Router>
  );
}

export default App;