import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calculator, 
  Receipt, 
  Scan, 
  Users, 
  Split, 
  PenTool, 
  Percent, 
  History, 
  Share2 
} from 'lucide-react';
import FeatureCard from '../components/features/FeatureCard';

function Features() {
  const featuresList = [
    {
      icon: Receipt,
      bgClass: 'bg-pink-100',
      iconClass: 'text-pink-500',
      title: 'Input Tagihan',
      description: 'Masukkan total tagihan dengan mudah. Tambahkan PPN dan service charge secara otomatis untuk perhitungan yang akurat.'
    },
    {
      icon: Scan,
      bgClass: 'bg-blue-100',
      iconClass: 'text-blue-500',
      title: 'Scan Struk (OCR)',
      description: 'Upload foto struk belanja Anda dan biarkan sistem otomatis mengenali item dan harga. (Fitur dalam pengembangan).'
    },
    {
      icon: Users,
      bgClass: 'bg-purple-100',
      iconClass: 'text-purple-500',
      title: 'Input Peserta',
      description: 'Tambahkan nama semua orang yang akan berbagi tagihan. Mudah dikelola dengan antarmuka yang intuitif.'
    },
    {
      icon: Split,
      bgClass: 'bg-indigo-100',
      iconClass: 'text-indigo-500',
      title: 'Split Otomatis',
      description: 'Bagi tagihan secara merata untuk semua orang dengan satu klik. Perhitungan otomatis termasuk pajak dan service.'
    },
    {
      icon: PenTool,
      bgClass: 'bg-red-100',
      iconClass: 'text-red-500',
      title: 'Custom Split (Proporsional)',
      description: 'Atur pembagian sesuai apa yang dipesan masing-masing orang. Sistem akan otomatis menghitung pajak dan service secara proporsional.'
    },
    {
      icon: Percent,
      bgClass: 'bg-cyan-100',
      iconClass: 'text-cyan-500',
      title: 'PPN & Service',
      description: 'Tambahkan pajak (PPN) dan service charge dengan persentase custom. Perhitungan otomatis untuk setiap orang.'
    },
    {
      icon: History,
      bgClass: 'bg-teal-100',
      iconClass: 'text-teal-500',
      title: 'Riwayat',
      description: 'Simpan dan akses riwayat pembagian tagihan sebelumnya. Tidak akan pernah lupa siapa yang harus bayar berapa.'
    },
    {
      icon: Share2,
      bgClass: 'bg-yellow-100',
      iconClass: 'text-yellow-600',
      title: 'Bagikan Hasil',
      description: 'Share hasil pembagian ke teman dengan mudah melalui berbagai platform. Transparansi total untuk semua pihak.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      {/* HEADER */}
      <header className="flex items-center gap-4 px-8 py-6 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
        <Link to="/" className="p-2 hover:bg-slate-100 rounded-full transition">
          <ArrowLeft className="text-slate-600 w-5 h-5" />
        </Link>
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-pink-400 to-blue-400 p-1 rounded-lg">
            <Calculator className="text-white w-4 h-4" />
          </div>
          <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
            Smart Bill Splitter
          </span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow px-8 py-12 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 mb-4 pb-2">
            Fitur-Fitur Unggulan
          </h1>
          <p className="text-slate-500">
            Solusi lengkap untuk membagi tagihan dengan teman. Cepat, akurat, dan transparan.
          </p>
        </div>

        {/* GRID FITUR */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {featuresList.map((feature, index) => (
            <FeatureCard 
              key={index} 
              icon={feature.icon}
              bgClass={feature.bgClass}
              iconClass={feature.iconClass}
              title={feature.title} 
              description={feature.description} 
            />
          ))}
        </div>

        {/* CALL TO ACTION SECTION */}
        <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Siap untuk Mencoba?</h2>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">
            Mulai bagi tagihan dengan teman-temanmu sekarang. Gratis dan mudah digunakan!
          </p>
          <Link to="/dashboard" className="inline-block bg-gradient-to-r from-pink-400 to-blue-400 text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition shadow-lg shadow-blue-200">
            Mulai Sekarang
          </Link>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-8 text-center text-slate-400 text-sm border-t border-slate-200 mt-auto">
        <p>© 2026 Smart Bill Splitter. Made with ❤️ for students and young adults.</p>
      </footer>
    </div>
  );
}

export default Features;