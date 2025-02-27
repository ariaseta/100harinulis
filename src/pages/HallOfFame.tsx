import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Search, ChevronDown } from 'lucide-react';

const HallOfFame: React.FC = () => {
  // This would be fetched from Supabase in a real implementation
  const graduates = [
    {
      id: 1,
      name: 'Anita Wijaya',
      profilePic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80',
      linkedinUrl: 'https://linkedin.com',
      completionDate: 'Januari 2025',
      topics: ['Content Marketing', 'Personal Branding'],
      testimonial: 'Tantangan ini mengubah cara saya menulis dan membangun personal brand di LinkedIn.'
    },
    {
      id: 2,
      name: 'Budi Santoso',
      profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80',
      linkedinUrl: 'https://linkedin.com',
      completionDate: 'Februari 2025',
      topics: ['Product Management', 'Leadership'],
      testimonial: 'Saya mendapatkan banyak koneksi baru dan peluang karir setelah menyelesaikan tantangan ini.'
    },
    {
      id: 3,
      name: 'Citra Dewi',
      profilePic: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80',
      linkedinUrl: 'https://linkedin.com',
      completionDate: 'Maret 2025',
      topics: ['Digital Marketing', 'Social Media'],
      testimonial: 'Konsistensi menulis selama 100 hari membuat saya lebih percaya diri dalam berbagi pengetahuan.'
    },
    {
      id: 4,
      name: 'Denny Pratama',
      profilePic: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80',
      linkedinUrl: 'https://linkedin.com',
      completionDate: 'April 2025',
      topics: ['Software Development', 'Tech Career'],
      testimonial: 'Menulis tentang pengalaman saya dalam pengembangan software membuka banyak peluang baru.'
    },
    {
      id: 5,
      name: 'Eka Putri',
      profilePic: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80',
      linkedinUrl: 'https://linkedin.com',
      completionDate: 'Mei 2025',
      topics: ['HR', 'Career Development'],
      testimonial: 'Tantangan ini membantu saya membangun otoritas di bidang HR dan pengembangan karir.'
    },
    {
      id: 6,
      name: 'Fajar Ramadhan',
      profilePic: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80',
      linkedinUrl: 'https://linkedin.com',
      completionDate: 'Juni 2025',
      topics: ['Finance', 'Investment'],
      testimonial: 'Berbagi pengetahuan tentang keuangan selama 100 hari membuat saya mendapatkan klien baru.'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container-custom py-16 md:py-24">
          <div className="text-center">
            <Award className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Hall of Fame
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Menampilkan para penulis luar biasa yang telah berhasil menyelesaikan tantangan 100 Hari Nulis. Mereka adalah inspirasi bagi komunitas kami.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-white py-8 border-b">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Cari berdasarkan nama atau topik..."
                className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <select className="appearance-none bg-white border rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Semua Periode</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
              
              <div className="relative">
                <select className="appearance-none bg-white border rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Semua Topik</option>
                  <option value="marketing">Marketing</option>
                  <option value="tech">Technology</option>
                  <option value="career">Career</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Graduates List */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {graduates.map((graduate) => (
              <div key={graduate.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={graduate.profilePic} 
                      alt={graduate.name} 
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-bold text-lg">{graduate.name}</h3>
                      <p className="text-gray-600 text-sm">Lulus: {graduate.completionDate}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-700 italic">"{graduate.testimonial}"</p>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Topik Utama:</p>
                    <div className="flex flex-wrap gap-2">
                      {graduate.topics.map((topic, index) => (
                        <span key={index} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <a 
                    href={graduate.linkedinUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
                  >
                    Lihat Profil LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button className="btn btn-secondary">
              Muat Lebih Banyak
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ingin Nama Anda Muncul di Sini?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Bergabunglah dengan tantangan 100 Hari Nulis dan jadilah bagian dari Hall of Fame kami.
          </p>
          <Link to="/login" className="btn bg-white text-blue-700 hover:bg-blue-50 text-lg px-8 py-4">
            Mulai Tantangan Sekarang
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HallOfFame;