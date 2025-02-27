import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Linkedin, ArrowRight, CheckCircle, AlertCircle, Mail } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useSettingsStore } from '../store/settingsStore';
import { supabase } from '../lib/supabaseClient';

const Login: React.FC = () => {
  const { user, signInWithLinkedIn, signInWithOTP, isLoading: authLoading, initialize, isInitialized } = useAuthStore();
  const { settings, fetchSettings, isLoading: settingsLoading } = useSettingsStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  // Fetch login settings on component mount
  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // Check for auth redirect (OTP email link)
  useEffect(() => {
    const handleAuthRedirect = async () => {
      // Parse the URL hash for auth info
      const hash = location.hash;
      if (hash && hash.includes('access_token')) {
        setIsLoading(true);
        try {
          // The hash contains the auth credentials from the email link
          const { data, error } = await supabase.auth.getSession();
          
          if (error) {
            throw error;
          }
          
          if (data.session) {
            // Force refresh the auth state
            await initialize();
            // Session is valid, redirect to dashboard
            navigate('/dashboard');
          }
        } catch (error) {
          console.error('Error processing auth redirect:', error);
          setError('Terjadi kesalahan saat memproses login. Silakan coba lagi.');
        } finally {
          setIsLoading(false);
        }
      }
    };

    handleAuthRedirect();
  }, [location, navigate, initialize]);

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // If email login is the only option enabled, show email form by default
  useEffect(() => {
    if (settings && !settings.linkedin_login_enabled && settings.email_login_enabled) {
      setShowEmailForm(true);
    }
  }, [settings]);

  const handleLinkedInLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await signInWithLinkedIn();
      // The redirect will be handled by Supabase OAuth
    } catch (error) {
      console.error('Login error:', error);
      setError('Terjadi kesalahan saat login. Silakan coba lagi. Pastikan LinkedIn OAuth sudah diaktifkan di Supabase.');
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email harus diisi');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      await signInWithOTP(email);
      setOtpSent(true);
      setSuccess('Kode OTP telah dikirim ke email Anda. Silakan periksa kotak masuk Anda.');
      
    } catch (error: any) {
      console.error('Email auth error:', error);
      setError(error.message || 'Terjadi kesalahan saat mengirim OTP. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while fetching settings
  if (settingsLoading && !settings) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // If both login methods are disabled, show a message
  if (settings && !settings.linkedin_login_enabled && !settings.email_login_enabled) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Login Tidak Tersedia</h1>
          <p className="text-gray-600 mb-6">
            Sistem login sedang dalam pemeliharaan. Silakan coba lagi nanti atau hubungi administrator.
          </p>
          <Link to="/" className="btn btn-primary w-full">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container-custom py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Login Form */}
            <div className="bg-white p-8 md:p-10 rounded-xl shadow-sm">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-4">
                  {showEmailForm 
                    ? (otpSent ? 'Verifikasi Email' : 'Masuk dengan Email') 
                    : 'Masuk ke Akun Anda'}
                </h1>
                <p className="text-gray-600">
                  Bergabunglah dengan ribuan penulis dalam tantangan 100 Hari Nulis
                </p>
              </div>
              
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}
              
              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-lg flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-green-700 text-sm">{success}</p>
                </div>
              )}
              
              {!showEmailForm ? (
                <>
                  {settings?.linkedin_login_enabled && (
                    <>
                      <button 
                        onClick={handleLinkedInLogin}
                        disabled={isLoading || authLoading}
                        className={`w-full btn bg-[#0A66C2] text-white hover:bg-[#084e96] flex items-center justify-center py-4 ${(isLoading || authLoading) ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        {(isLoading || authLoading) ? (
                          <>
                            <span className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full"></span>
                            Memproses...
                          </>
                        ) : (
                          <>
                            <Linkedin className="mr-2 h-5 w-5" />
                            Masuk dengan LinkedIn
                          </>
                        )}
                      </button>
                      
                      {settings?.email_login_enabled && (
                        <>
                          <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                              <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                              <span className="px-2 bg-white text-gray-500">atau</span>
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => setShowEmailForm(true)}
                            className="w-full btn bg-gray-100 text-gray-800 hover:bg-gray-200 flex items-center justify-center py-4"
                          >
                            <Mail className="mr-2 h-5 w-5" />
                            Masuk dengan Email
                          </button>
                        </>
                      )}
                    </>
                  )}
                  
                  {!settings?.linkedin_login_enabled && settings?.email_login_enabled && (
                    <button 
                      onClick={() => setShowEmailForm(true)}
                      className="w-full btn bg-gray-100 text-gray-800 hover:bg-gray-200 flex items-center justify-center py-4"
                    >
                      <Mail className="mr-2 h-5 w-5" />
                      Masuk dengan Email
                    </button>
                  )}
                </>
              ) : (
                <form onSubmit={handleEmailAuth}>
                  {!otpSent ? (
                    <>
                      <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="email@example.com"
                        />
                      </div>
                      
                      <button 
                        type="submit"
                        disabled={isLoading || authLoading}
                        className={`w-full btn btn-primary ${(isLoading || authLoading) ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        {(isLoading || authLoading) ? (
                          <>
                            <span className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full"></span>
                            Mengirim OTP...
                          </>
                        ) : (
                          'Kirim Kode OTP'
                        )}
                      </button>
                    </>
                  ) : (
                    <div className="text-center">
                      <p className="text-gray-600 mb-6">
                        Kami telah mengirimkan kode OTP ke email Anda. Silakan periksa kotak masuk Anda dan klik tautan yang dikirimkan untuk masuk.
                      </p>
                      
                      <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                        <p className="text-blue-700 text-sm">
                          <span className="font-medium">Catatan:</span> Jika Anda tidak menerima email dalam beberapa menit, periksa folder spam atau coba kirim ulang.
                        </p>
                      </div>
                      
                      <button 
                        type="button"
                        onClick={() => {
                          setOtpSent(false);
                          setSuccess(null);
                        }}
                        className="text-blue-600 font-medium hover:underline"
                      >
                        Kirim ulang kode OTP
                      </button>
                    </div>
                  )}
                  
                  {settings?.linkedin_login_enabled && (
                    <div className="mt-4 text-center">
                      <button 
                        type="button"
                        onClick={() => {
                          setShowEmailForm(false);
                          setOtpSent(false);
                          setError(null);
                          setSuccess(null);
                        }}
                        className="text-gray-600 text-sm hover:underline"
                      >
                        Kembali ke pilihan login
                      </button>
                    </div>
                  )}
                </form>
              )}
              
              <div className="mt-8 text-center">
                <p className="text-gray-500 text-sm">
                  Dengan masuk, Anda menyetujui <a href="#" className="text-blue-600 hover:underline">Syarat & Ketentuan</a> dan <Link to="/privacy-policy" className="text-blue-600 hover:underline">Kebijakan Privasi</Link> kami.
                </p>
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Catatan:</span> Kami menggunakan autentikasi email untuk memastikan keamanan akun Anda. Kode OTP hanya berlaku untuk satu kali login.
                </p>
              </div>
            </div>
            
            {/* Right Column - Benefits */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Mengapa Bergabung dengan 100 Hari Nulis?</h2>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-lg">Bangun Kebiasaan Menulis</h3>
                    <p className="text-gray-600">
                      Tantangan 100 hari membantu Anda membangun kebiasaan menulis yang konsisten dan berkelanjutan.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-lg">Tingkatkan Personal Branding</h3>
                    <p className="text-gray-600">
                      Menulis secara konsisten di LinkedIn akan meningkatkan visibilitas dan personal branding Anda.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-lg">Bergabung dengan Komunitas</h3>
                    <p className="text-gray-600">
                      Terhubung dengan ribuan penulis lain yang akan memberikan dukungan dan inspirasi.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-lg">Dapatkan Peluang Karir</h3>
                    <p className="text-gray-600">
                      Banyak peserta mendapatkan peluang karir baru melalui tulisan mereka di LinkedIn.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" 
                      alt="Testimonial author" 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="italic text-gray-700 mb-2">
                      "Tantangan 100 Hari Nulis mengubah hidup saya. Saya mendapatkan klien baru dan peluang berbicara di konferensi melalui tulisan LinkedIn saya."
                    </p>
                    <p className="font-medium">Anita Wijaya</p>
                    <p className="text-sm text-gray-600">Content Creator & LinkedIn Top Voice</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Pertanyaan yang Sering Diajukan</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2">Apakah saya harus menulis setiap hari?</h3>
                <p className="text-gray-600">
                  Ya, tantangan ini mengharuskan Anda menulis dan mempublikasikan konten di LinkedIn setiap hari selama 100 hari berturut-turut.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2">Apa yang terjadi jika saya melewatkan satu hari?</h3>
                <p className="text-gray-600">
                  Jika Anda melewatkan satu hari, streak Anda akan terputus. Namun, Anda dapat memulai kembali dan tetap melanjutkan tantangan.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2">Apakah ada tema tertentu yang harus saya tulis?</h3>
                <p className="text-gray-600">
                  Tidak, Anda bebas menulis tentang topik apa pun yang sesuai dengan minat, keahlian, atau industri Anda.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2">Bagaimana cara kerja login dengan email?</h3>
                <p className="text-gray-600">
                  Kami menggunakan sistem OTP (One-Time Password) yang dikirim ke email Anda. Cukup masukkan email Anda, dan kami akan mengirimkan tautan login yang aman.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Link to="/" className="text-blue-600 font-medium inline-flex items-center">
                Pelajari lebih lanjut tentang tantangan <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;