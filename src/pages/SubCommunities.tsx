import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowRight, Globe, MessageSquare } from 'lucide-react';

const SubCommunities: React.FC = () => {
  // This would be fetched from Supabase in a real implementation
  const communities = [
    {
      id: 1,
      name: '100 Hari Nulis Tech',
      description: 'Komunitas untuk para profesional teknologi yang ingin berbagi pengetahuan dan pengalaman mereka di dunia tech melalui tulisan.',
      members: 850,
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
      leader: {
        name: 'Andi Wijaya',
        profilePic: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80'
      }
    },
    {
      id: 2,
      name: '100 Hari Nulis Marketing',
      description: 'Komunitas untuk para marketer yang ingin berbagi strategi, taktik, dan insight tentang dunia pemasaran digital.',
      members: 720,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
      leader: {
        name: 'Bella Sanjaya',
        profilePic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80'
      }
    },
    {
      id: 3,
      name: '100 Hari Nulis Finance',
      description: 'Komunitas untuk para profesional keuangan dan investasi yang ingin berbagi pengetahuan tentang dunia finansial.',
      members: 560,
      image: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
      leader: {
        name: 'Charlie Putra',
        profilePic: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80'
      }
    },
    {
      id: 4,
      name: '100 Hari Nulis HR',
      description: 'Komunitas untuk para profesional HR yang ingin berbagi pengetahuan tentang pengembangan SDM dan workplace culture.',
      members: 480,
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
      leader: {
        name: 'Diana Pratiwi',
        profilePic: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80'
      }
    },
    {
      id: 5,
      name: '100 Hari Nulis Leadership',
      description: 'Komunitas untuk para pemimpin dan manajer yang ingin berbagi pengalaman dan insight tentang kepemimpinan efektif.',
      members: 620,
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
      leader: {
        name: 'Eko Santoso',
        profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80'
      }
    },
    {
      id: 6,
      name: '100 Hari Nulis Creative',
      description: 'Komunitas untuk para kreator konten, desainer, dan seniman yang ingin berbagi karya dan proses kreatif mereka.',
      members: 750,
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
      leader: {
        name: 'Fiona Dewi',
        profilePic: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80'
      }
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container-custom py-16 md:py-24">
          <div className="text-center">
            <Users className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Sub Komunitas
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Temukan komunitas spesifik yang sesuai dengan minat dan bidang Anda. Bergabunglah dengan penulis yang memiliki passion yang sama.
            </p>
          </div>
        </div>
      </section>

      {/* Communities List */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communities.map((community) => (
              <div key={community.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={community.image} 
                    alt={community.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{community.name}</h3>
                  <p className="text-gray-600 mb-4 h-24 overflow-hidden text-ellipsis line-clamp-4">{community.description}</p>
                  
                  <div className="flex items-center mb-4">
                    <img 
                      src={community.leader.profilePic} 
                      alt={community.leader.name} 
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div>
                      <p className="text-sm text-gray-600">Dipimpin oleh</p>
                      <p className="font-medium">{community.leader.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-medium flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {community.members} Anggota
                    </span>
                    <button className="btn btn-secondary text-sm px-4 py-2">
                      Gabung
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Create Community Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="bg-blue-50 rounded-xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ingin Membuat Sub Komunitas Baru?</h2>
                <p className="text-gray-600 mb-6">
                  Jika Anda memiliki minat khusus dan ingin membuat sub komunitas baru, kami sangat mendukung inisiatif Anda. Buat komunitas untuk topik atau industri spesifik dan kembangkan bersama penulis lainnya.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Globe className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold">Bangun Jaringan Spesifik</h3>
                      <p className="text-gray-600">Terhubung dengan penulis yang memiliki minat yang sama dengan Anda.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MessageSquare className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold">Diskusi Mendalam</h3>
                      <p className="text-gray-600">Bahas topik spesifik dengan lebih mendalam bersama komunitas Anda.</p>
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary mt-6">
                  Ajukan Sub Komunitas Baru
                </button>
              </div>
              <div className="hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500&q=80" 
                  alt="Community collaboration" 
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Bergabung dengan Komunitas Utama</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Belum yakin ingin bergabung dengan sub komunitas mana? Mulai dengan komunitas utama 100 Hari Nulis.
          </p>
          <Link to="/login" className="btn bg-white text-blue-700 hover:bg-blue-50 text-lg px-8 py-4">
            Mulai Tantangan Sekarang
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SubCommunities;