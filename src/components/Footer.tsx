import React from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Linkedin, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white md:block hidden">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Pencil className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">100HariNulis</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Komunitas menulis selama 100 hari di LinkedIn. Bergabunglah dengan ribuan penulis untuk meningkatkan konsistensi dan kualitas tulisan Anda.
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigasi</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Beranda</Link></li>
              <li><Link to="/hall-of-fame" className="text-gray-400 hover:text-white">Hall of Fame</Link></li>
              <li><Link to="/sub-communities" className="text-gray-400 hover:text-white">Sub Komunitas</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-white">Masuk</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Email: info@100harinulis.com</li>
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white">Kebijakan Privasi</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Syarat & Ketentuan</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} 100 Hari Nulis. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;