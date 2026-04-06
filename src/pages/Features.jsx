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

function Features() {
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
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 mb-4">
            Fitur-Fitur Unggulan
          </h1>
          <p className="text-slate-500">
            Solusi lengkap untuk membagi tagihan dengan teman. Cepat, akurat, dan transparan.
          </p>
        </div>

        {/* GRID FITUR */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
            <div className="bg-pink-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <Receipt className="text-pink-500 w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Input Tagihan</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Masukkan total tagihan dengan mudah. Tambahkan PPN dan service charge secara otomatis untuk perhitungan yang akurat.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
            <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <Scan className="text-blue-500 w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Scan Struk (OCR)</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Upload foto struk belanja Anda dan biarkan sistem otomatis mengenali item dan harga. (Fitur dalam pengembangan).
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
            <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <Users className="text-purple-500 w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Input Peserta</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Tambahkan nama semua orang yang akan berbagi tagihan. Mudah dikelola dengan antarmuka yang intuitif.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
            <div className="bg-indigo-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <Split className="text-indigo-500 w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Split Otomatis</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Bagi tagihan secara merata untuk semua orang dengan satu klik. Perhitungan otomatis termasuk pajak dan service.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
            <div className="bg-red-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <PenTool className="text-red-500 w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Custom Split (Proporsional)</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Atur pembagian sesuai apa yang dipesan masing-masing orang. Sistem akan otomatis menghitung pajak dan service secara proporsional.
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
            <div className="bg-cyan-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <Percent className="text-cyan-500 w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">PPN & Service</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Tambahkan pajak (PPN) dan service charge dengan persentase custom. Perhitungan otomatis untuk setiap orang.
            </p>
          </div>

          {/* Card 7 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
            <div className="bg-teal-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <History className="text-teal-500 w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Riwayat</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Simpan dan akses riwayat pembagian tagihan sebelumnya. Tidak akan pernah lupa siapa yang harus bayar berapa.
            </p>
          </div>

          {/* Card 8 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
            <div className="bg-yellow-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <Share2 className="text-yellow-600 w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Bagikan Hasil</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Share hasil pembagian ke teman dengan mudah melalui berbagai platform. Transparansi total untuk semua pihak.
            </p>
          </div>

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