import React from 'react';
import { Calculator, Users, Maximize, Percent, Clock, Share2 } from 'lucide-react';

function Features() {
  return (
    <div id="features" className="mt-32 scroll-mt-24">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500 inline-block pb-1">
                Fitur Unggulan
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <Calculator className="text-blue-500 w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Split Otomatis</h3>
                <p className="text-slate-500 text-sm">Bagi tagihan secara otomatis dalam hitungan detik</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <Users className="text-purple-500 w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Custom Split (Adil)</h3>
                <p className="text-slate-500 text-sm">Atur pembagian sesuai pesanan masing-masing orang</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="bg-pink-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <Maximize className="text-pink-500 w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Scan Struk</h3>
                <p className="text-slate-500 text-sm">Upload foto struk untuk input otomatis</p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="bg-indigo-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <Percent className="text-indigo-500 w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Tambah PPN & Service</h3>
                <p className="text-slate-500 text-sm">Hitung pajak dan service charge dengan mudah</p>
            </div>

            {/* Card 5 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="bg-violet-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <Clock className="text-violet-500 w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Riwayat Tagihan</h3>
                <p className="text-slate-500 text-sm">Simpan dan akses riwayat pembagian sebelumnya</p>
            </div>

            {/* Card 6 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="bg-fuchsia-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <Share2 className="text-fuchsia-500 w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Bagikan Hasil</h3>
                <p className="text-slate-500 text-sm">Share hasil pembagian ke teman dengan mudah</p>
            </div>
        </div>
    </div>
  );
}

export default Features;
