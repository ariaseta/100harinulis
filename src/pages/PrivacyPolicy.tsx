import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-10 text-center">
            <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Kebijakan Privasi</h1>
            <p className="text-gray-600">
              Terakhir diperbarui: 1 Juli 2025
            </p>
          </div>
          
          {/* Content */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">
                100 Hari Nulis ("kami", "kita", atau "100HariNulis") berkomitmen untuk melindungi privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan membagikan informasi tentang Anda ketika Anda menggunakan layanan kami.
              </p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">1. Informasi yang Kami Kumpulkan</h2>
              
              <h3 className="text-lg font-bold mt-6 mb-3">1.1 Informasi yang Anda Berikan Kepada Kami</h3>
              <p className="text-gray-600 mb-4">
                Kami mengumpulkan informasi yang Anda berikan secara langsung kepada kami ketika Anda:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-600">
                <li className="mb-2">Membuat akun (seperti nama, alamat email, foto profil)</li>
                <li className="mb-2">Menghubungkan akun LinkedIn Anda</li>
                <li className="mb-2">Mengirimkan URL postingan LinkedIn Anda</li>
                <li className="mb-2">Berpartisipasi dalam komunitas atau forum diskusi</li>
                <li className="mb-2">Menghubungi tim dukungan kami</li>
              </ul>
              
              <h3 className="text-lg font-bold mt-6 mb-3">1.2 Informasi yang Kami Kumpulkan Secara Otomatis</h3>
              <p className="text-gray-600 mb-4">
                Ketika Anda menggunakan layanan kami, kami secara otomatis mengumpulkan informasi tertentu, termasuk:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-600">
                <li className="mb-2">Informasi perangkat (seperti jenis perangkat, sistem operasi, pengidentifikasi perangkat unik)</li>
                <li className="mb-2">Log dan penggunaan (seperti alamat IP, tanggal dan waktu akses, fitur yang digunakan)</li>
                <li className="mb-2">Informasi lokasi (jika Anda mengizinkan)</li>
                <li className="mb-2">Informasi yang dikumpulkan melalui cookies dan teknologi pelacakan serupa</li>
              </ul>
              
              <h2 className="text-xl font-bold mt-8 mb-4">2. Bagaimana Kami Menggunakan Informasi</h2>
              <p className="text-gray-600 mb-4">
                Kami menggunakan informasi yang kami kumpulkan untuk:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-600">
                <li className="mb-2">Menyediakan, memelihara, dan meningkatkan layanan kami</li>
                <li className="mb-2">Memproses dan melacak partisipasi Anda dalam tantangan 100 Hari Nulis</li>
                <li className="mb-2">Mengirimkan pemberitahuan, pembaruan, dan informasi lain yang terkait dengan layanan</li>
                <li className="mb-2">Menanggapi komentar, pertanyaan, dan permintaan Anda</li>
                <li className="mb-2">Memantau dan menganalisis tren, penggunaan, dan aktivitas</li>
                <li className="mb-2">Mendeteksi, menyelidiki, dan mencegah aktivitas penipuan dan pelanggaran lainnya</li>
              </ul>
              
              <h2 className="text-xl font-bold mt-8 mb-4">3. Berbagi Informasi</h2>
              <p className="text-gray-600 mb-4">
                Kami dapat membagikan informasi tentang Anda sebagai berikut:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-600">
                <li className="mb-2">Dengan penyedia layanan pihak ketiga yang melakukan layanan atas nama kami</li>
                <li className="mb-2">Dengan peserta lain dalam tantangan (seperti nama dan URL postingan LinkedIn Anda)</li>
                <li className="mb-2">Jika kami yakin bahwa pengungkapan diperlukan untuk mematuhi hukum atau proses hukum</li>
                <li className="mb-2">Dalam hubungannya dengan, atau selama negosiasi, merger, penjualan aset perusahaan, pembiayaan, atau akuisisi seluruh atau sebagian bisnis kami oleh perusahaan lain</li>
              </ul>
              
              <h2 className="text-xl font-bold mt-8 mb-4">4. Integrasi LinkedIn</h2>
              <p className="text-gray-600 mb-4">
                Layanan kami terintegrasi dengan LinkedIn untuk autentikasi dan berbagi konten. Ketika Anda menghubungkan akun LinkedIn Anda, kami mengumpulkan informasi dari profil LinkedIn Anda sesuai dengan izin yang Anda berikan. Penggunaan data LinkedIn Anda oleh kami tunduk pada kebijakan privasi ini, sementara penggunaan data oleh LinkedIn tunduk pada kebijakan privasi LinkedIn.
              </p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">5. Keamanan Data</h2>
              <p className="text-gray-600 mb-4">
                Kami mengambil langkah-langkah yang wajar untuk membantu melindungi informasi tentang Anda dari kehilangan, pencurian, penyalahgunaan, dan akses, pengungkapan, perubahan, dan penghancuran yang tidak sah. Namun, tidak ada sistem keamanan yang tidak dapat ditembus dan kami tidak dapat menjamin keamanan absolut informasi Anda.
              </p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">6. Hak Privasi Anda</h2>
              <p className="text-gray-600 mb-4">
                Tergantung pada yurisdiksi Anda, Anda mungkin memiliki hak tertentu terkait dengan data pribadi Anda, termasuk:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-600">
                <li className="mb-2">Hak untuk mengakses data pribadi Anda</li>
                <li className="mb-2">Hak untuk memperbaiki data yang tidak akurat</li>
                <li className="mb-2">Hak untuk menghapus data Anda</li>
                <li className="mb-2">Hak untuk membatasi pemrosesan data Anda</li>
                <li className="mb-2">Hak untuk portabilitas data</li>
                <li className="mb-2">Hak untuk menolak pemrosesan data Anda</li>
              </ul>
              <p className="text-gray-600 mb-4">
                Untuk menggunakan hak-hak ini, silakan hubungi kami di info@100harinulis.com.
              </p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">7. Perubahan pada Kebijakan Privasi Ini</h2>
              <p className="text-gray-600 mb-4">
                Kami dapat mengubah kebijakan privasi ini dari waktu ke waktu. Jika kami membuat perubahan, kami akan memberi tahu Anda dengan merevisi tanggal di bagian atas kebijakan dan, dalam beberapa kasus, kami mungkin memberi Anda pemberitahuan tambahan (seperti menambahkan pernyataan di halaman beranda kami atau mengirimkan pemberitahuan).
              </p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">8. Hubungi Kami</h2>
              <p className="text-gray-600 mb-4">
                Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami di:
              </p>
              <p className="text-gray-600 mb-4">
                Email: info@100harinulis.com<br />
                Alamat: Jl. Sudirman No. 123, Jakarta 12190, Indonesia
              </p>
            </div>
          </div>
          
          {/* Back Button */}
          <div className="text-center">
            <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;