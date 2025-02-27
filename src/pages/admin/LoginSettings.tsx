import React, { useEffect, useState } from 'react';
import { useSettingsStore } from '../../store/settingsStore';
import { useAuthStore } from '../../store/authStore';
import { Settings, Save, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

const LoginSettings: React.FC = () => {
  const { settings, fetchSettings, updateSettings, isLoading } = useSettingsStore();
  const { profile } = useAuthStore();
  
  const [linkedinEnabled, setLinkedinEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  
  // Check if user is admin
  const isAdmin = profile?.is_admin || false;
  
  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);
  
  useEffect(() => {
    if (settings) {
      setLinkedinEnabled(settings.linkedin_login_enabled);
      setEmailEnabled(settings.email_login_enabled);
    }
  }, [settings]);
  
  const handleSaveSettings = async () => {
    try {
      setSaveSuccess(false);
      setSaveError(null);
      
      // Prevent disabling both login methods
      if (!linkedinEnabled && !emailEnabled) {
        setSaveError('Minimal satu metode login harus diaktifkan');
        return;
      }
      
      await updateSettings({
        linkedin_login_enabled: linkedinEnabled,
        email_login_enabled: emailEnabled
      });
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setSaveError('Terjadi kesalahan saat menyimpan pengaturan');
    }
  };
  
  if (!isAdmin) {
    return (
      <div className="bg-gray-50 min-h-screen p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Akses Ditolak</h1>
            <p className="text-gray-600">
              Anda tidak memiliki izin untuk mengakses halaman ini. Halaman ini hanya tersedia untuk administrator.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
        <div className="flex items-center mb-8">
          <Settings className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-2xl font-bold">Pengaturan Metode Login</h1>
        </div>
        
        {saveSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-lg flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
            <p className="text-green-700">Pengaturan berhasil disimpan!</p>
          </div>
        )}
        
        {saveError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
            <p className="text-red-700">{saveError}</p>
          </div>
        )}
        
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <p className="text-gray-600 mb-4">
            Gunakan pengaturan di bawah ini untuk mengaktifkan atau menonaktifkan metode login yang tersedia untuk pengguna.
            Minimal satu metode login harus diaktifkan.
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-bold text-lg">Login dengan LinkedIn</h3>
              <p className="text-gray-600">Izinkan pengguna masuk menggunakan akun LinkedIn mereka</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={linkedinEnabled}
                onChange={() => setLinkedinEnabled(!linkedinEnabled)}
                disabled={isLoading}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-bold text-lg">Login dengan Email</h3>
              <p className="text-gray-600">Izinkan pengguna masuk menggunakan email dan kode OTP</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={emailEnabled}
                onChange={() => setEmailEnabled(!emailEnabled)}
                disabled={isLoading}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
        
        <div className="mt-8">
          <button 
            onClick={handleSaveSettings}
            disabled={isLoading}
            className={`btn btn-primary flex items-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="h-5 w-5 mr-2" />
                Simpan Pengaturan
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSettings;