import React from 'react';
import { Calculator, Users, Maximize, Percent, Clock, Share2 } from 'lucide-react';

function Home() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
            {/* NAVBAR */}
            <nav className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md fixed top-0 w-full z-50 border-b border-slate-100">
                <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-r from-pink-400 to-blue-400 p-1.5 rounded-lg">
                        <Calculator className="text-white w-5 h-5" />
                    </div>
                    <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
                        Smart Bill Splitter
                    </span>
                </div>
                <div className="hidden md:flex gap-8 text-sm font-medium text-slate-500">
                    <a href="#" className="hover:text-blue-500">Home</a>
                    <a href="#" className="hover:text-blue-500">Features</a>
                    <a href="#" className="hover:text-blue-500">About</a>
                </div>
                <button className="bg-gradient-to-r from-pink-400 to-blue-400 text-white px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition shadow-md shadow-blue-200">
                    Start Now
                </button>
            </nav>

            {/* HERO SECTION */}
            <main className="pt-28 pb-20 px-8 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="flex-1 space-y-6">
                        <h1 className="text-5xl md:text-6xl font-black leading-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">Split Tagihan</span>
                            <br />
                            Jadi Lebih Mudah &<br />
                            Tanpa Ribet
                        </h1>
                        <p className="text-slate-500 text-lg md:text-xl max-w-md">
                            Hitung dan bagi tagihan bersama teman secara cepat, akurat, dan transparan
                        </p>
                        <div className="flex gap-4 pt-4">
                            <button className="bg-gradient-to-r from-pink-400 to-blue-400 text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition shadow-lg shadow-blue-200">
                                Mulai Sekarang
                            </button>
                            <button className="border-2 border-pink-200 text-pink-500 px-6 py-3 rounded-full font-semibold hover:bg-pink-50 transition">
                                Pelajari Fitur
                            </button>
                        </div>
                    </div>

                    <div className="flex-1">
                        <img
                            src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop"
                            alt="Teman nongkrong"
                            className="rounded-3xl shadow-2xl object-cover w-full h-[400px]"
                        />
                    </div>
                </div>

                {/* FITUR SECTION */}
                <div className="mt-32">
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
            </main>

            {/* FOOTER */}
            <footer className="py-8 text-center text-slate-400 text-sm border-t border-slate-200 mt-12">
                <p>© 2026 Smart Bill Splitter. Made with ❤️ for students and young adults.</p>
            </footer>
        </div>
    );
}

export default Home;