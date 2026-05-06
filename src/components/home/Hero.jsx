import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
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
                <Link to="/dashboard" className="bg-gradient-to-r from-pink-400 to-blue-400 text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition shadow-lg shadow-blue-200 text-center flex items-center justify-center">
                    Mulai Sekarang
                </Link>
                <Link to="/features" className="border-2 border-pink-200 text-pink-500 px-6 py-3 rounded-full font-semibold hover:bg-pink-50 transition text-center flex items-center justify-center">
                    Pelajari Fitur
                </Link>
            </div>
        </div>

        <div className="flex-1 w-full relative mt-8 lg:mt-0 overflow-hidden rounded-[2rem] p-4">
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-300 to-blue-300 blur-2xl opacity-50 scale-105 rounded-[3rem]"></div>
            <img
                src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop"
                alt="Teman nongkrong"
                className="relative rounded-3xl shadow-2xl object-cover w-full h-[400px]"
            />
        </div>
    </div>
  );
}

export default Hero;
