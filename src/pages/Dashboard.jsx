import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Plus, Clock } from 'lucide-react';

function Dashboard() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
            {/* HEADER */}
            <header className="flex items-center justify-between px-8 py-6 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
                <div className="flex items-center gap-4">


                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="bg-gradient-to-r from-pink-400 to-blue-400 p-1.5 rounded-lg">
                            <Calculator className="text-white w-5 h-5" />
                        </div>
                        <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
                            Smart Bill Splitter
                        </span>
                    </div>
                </div>

                <div className="text-sm font-medium text-slate-500">
                    <Link to="/" className="hover:text-blue-500">Home</Link>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="flex-grow flex flex-col items-center justify-center px-8 py-12 max-w-5xl mx-auto w-full">
                <div className="text-center mb-14">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-400 to-blue-500 inline-block pb-2">
                        Ready to split your bill?
                    </h1>
                    <p className="text-slate-500 text-lg">Pilih salah satu opsi di bawah untuk memulai</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                    {/* CARD 1: BUAT PEMBAGIAN BARU */}
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col items-start hover:shadow-xl transition-all duration-300 group">
                        <div className="bg-gradient-to-br from-pink-300 to-blue-300 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-105 transition-transform">
                            <Plus className="text-white w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold mb-3">Buat Pembagian Baru</h2>
                        <p className="text-slate-500 mb-10 flex-grow leading-relaxed">
                            Mulai pembagian tagihan baru dengan teman-temanmu
                        </p>
                        {/* Nanti ini diarahkan ke halaman Input Tagihan (/split) */}
                        <Link to="/split" className="w-full text-center bg-gradient-to-r from-pink-400 to-blue-400 text-white font-bold py-4 rounded-2xl hover:opacity-90 transition shadow-lg shadow-blue-200/50">
                            Start Splitting
                        </Link>
                    </div>

                    {/* CARD 2: RIWAYAT TAGIHAN */}
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col items-start hover:shadow-xl transition-all duration-300 group">
                        <div className="bg-gradient-to-br from-purple-300 to-pink-300 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-105 transition-transform">
                            <Clock className="text-white w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold mb-3">Riwayat Tagihan</h2>
                        <p className="text-slate-500 mb-10 flex-grow leading-relaxed">
                            Lihat dan kelola riwayat pembagian tagihan sebelumnya
                        </p>
                        {/* Nanti ini diarahkan ke halaman Riwayat (/history) */}
                        <Link to="/history" className="w-full text-center border-2 border-pink-300 text-pink-500 font-bold py-4 rounded-2xl hover:bg-pink-50 transition">
                            Lihat Riwayat
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;