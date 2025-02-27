import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Award, BookOpen, ArrowRight, CheckCircle } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container-custom py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Tulis Setiap Hari, Tumbuh Bersama
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Bergabunglah dengan ribuan penulis dalam tantangan 100 hari menulis di LinkedIn. Tingkatkan konsistensi, bangun jaringan, dan kembangkan keahlian menulis Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login" className="btn bg-white text-blue-700 hover:bg-blue-50">
                  Mulai Tantangan
                </Link>
                <a href="#how-it-works" className="btn bg-blue-700 text-white hover:bg-blue-600">
                  Pelajari Lebih Lanjut
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=500&q=80" 
                alt="Person writing" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">5,000+</h3>
              <p className="text-gray-600">Peserta Aktif</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">1,200+</h3>
              <p className="text-gray-600">Lulusan Tantangan</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">500,000+</h3>
              <p className="text-gray-600">Tulisan Dipublikasikan</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Bagaimana Cara Kerjanya?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tantangan 100 Hari Nulis dirancang untuk membantu Anda membangun kebiasaan menulis yang konsisten
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Daftar & Komitmen</h3>
              <p className="text-gray-600">
                Daftar dengan akun LinkedIn Anda dan berkomitmen untuk menulis setiap hari selama 100 hari berturut-turut.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Tulis & Publikasikan</h3>
              <p className="text-gray-600">
                Tulis konten Anda dan publikasikan di LinkedIn. Tandai dengan hashtag #100HariNulis dan catat di dashboard.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Lacak & Rayakan</h3>
              <p className="text-gray-600">
                Lacak kemajuan Anda di dashboard dan rayakan keberhasilan Anda setelah menyelesaikan tantangan 100 hari.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/login" className="btn btn-primary inline-flex items-center">
              Mulai Tantangan Anda <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Manfaat Bergabung dengan 100 Hari Nulis</h2>
              <p className="text-gray-600 mb-8">
                Tantangan ini dirancang untuk membantu Anda membangun kebiasaan menulis yang konsisten dan meningkatkan kehadiran profesional Anda di LinkedIn.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg">Konsistensi</h3>
                    <p className="text-gray-600">Bangun kebiasaan menulis yang konsisten melalui tantangan 100 hari.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg">Visibilitas</h3>
                    <p className="text-gray-600">Tingkatkan visibilitas dan personal branding Anda di LinkedIn.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg">Komunitas</h3>
                    <p className="text-gray-600">Terhubung dengan komunitas penulis yang bersemangat dan saling mendukung.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg">Peluang Karir</h3>
                    <p className="text-gray-600">Buka peluang karir baru melalui konten yang Anda buat dan jaringan yang Anda bangun.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=700&q=80" 
                alt="Community of writers" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Apa Kata Mereka?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dengarkan pengalaman dari para peserta yang telah menyelesaikan tantangan 100 Hari Nulis
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80" 
                  alt="Testimonial author" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold">Anita Wijaya</h4>
                  <p className="text-gray-600 text-sm">Content Creator</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Tantangan 100 Hari Nulis mengubah hidup saya. Saya membangun kebiasaan menulis yang konsisten dan mendapatkan klien baru melalui konten LinkedIn saya."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80" 
                  alt="Testimonial author" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold">Budi Santoso</h4>
                  <p className="text-gray-600 text-sm">Product Manager</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Setelah menyelesaikan tantangan ini, saya mendapatkan tawaran berbicara di beberapa konferensi. Personal branding saya di LinkedIn meningkat drastis."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80" 
                  alt="Testimonial author" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold">Citra Dewi</h4>
                  <p className="text-gray-600 text-sm">Digital Marketer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Komunitas 100 Hari Nulis sangat mendukung. Kami saling memberikan umpan balik dan mendorong satu sama lain untuk terus konsisten menulis."
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/hall-of-fame" className="btn btn-secondary inline-flex items-center">
              Lihat Hall of Fame <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Siap Untuk Memulai Tantangan?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Bergabunglah dengan ribuan penulis lainnya dan mulai perjalanan 100 hari menulis Anda hari ini.
          </p>
          <Link to="/login" className="btn bg-white text-blue-700 hover:bg-blue-50 text-lg px-8 py-4">
            Mulai Tantangan Sekarang
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;