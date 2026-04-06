import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calculator, 
  Receipt, 
  Users, 
  Tag, 
  Truck, 
  CircleDollarSign, 
  Package, 
  Percent 
} from 'lucide-react';

function Split() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12">
      {/* HEADER */}
      <header className="flex items-center gap-4 px-8 py-6 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
        <Link to="/dashboard" className="p-2 hover:bg-slate-100 rounded-full transition">
          <ArrowLeft className="text-slate-600 w-5 h-5" />
        </Link>
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-pink-400 to-blue-400 p-1.5 rounded-lg">
            <Calculator className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
            Smart Bill Splitter
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 mt-8">
        
        {/* STEPPER INDICATOR */}
        <div className="flex items-center justify-center mb-10">
          <div className="flex items-center">
            {/* Step 1 (Active) */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-blue-400 flex items-center justify-center text-white font-bold shadow-md">
                1
              </div>
              <span className="text-xs font-bold text-pink-500 mt-2">Step 1</span>
            </div>
            <div className="w-12 h-[2px] bg-slate-200 mb-6 mx-2"></div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center opacity-50">
              <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 font-bold">
                2
              </div>
              <span className="text-xs font-medium text-slate-400 mt-2">Step 2</span>
            </div>
            <div className="w-12 h-[2px] bg-slate-200 mb-6 mx-2"></div>

            {/* Step 3 */}
            <div className="flex flex-col items-center opacity-50">
              <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 font-bold">
                3
              </div>
              <span className="text-xs font-medium text-slate-400 mt-2">Step 3</span>
            </div>
            <div className="w-12 h-[2px] bg-slate-200 mb-6 mx-2"></div>

            {/* Step 4 */}
            <div className="flex flex-col items-center opacity-50">
              <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 font-bold">
                4
              </div>
              <span className="text-xs font-medium text-slate-400 mt-2">Step 4</span>
            </div>
            <div className="w-12 h-[2px] bg-slate-200 mb-6 mx-2"></div>

            {/* Step 5 */}
            <div className="flex flex-col items-center opacity-50">
              <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 font-bold">
                5
              </div>
              <span className="text-xs font-medium text-slate-400 mt-2">Step 5</span>
            </div>
          </div>
        </div>

        {/* FORM CARD */}
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100">
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 mb-2">
              Input Tagihan
            </h1>
            <p className="text-slate-500">Masukkan detail tagihan Anda</p>
          </div>

          <form className="space-y-6">
            {/* Total Tagihan */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                <Receipt className="w-4 h-4 text-pink-500" />
                Total Tagihan / Subtotal Makanan (Rp)
              </label>
              <input 
                type="number" 
                placeholder="Contoh: 500000" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
              />
            </div>

            {/* Jumlah Orang */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                <Users className="w-4 h-4 text-blue-500" />
                Jumlah Orang
              </label>
              <input 
                type="number" 
                placeholder="2" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
            </div>

            {/* DIVIDER: Penyesuaian Tagihan */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="flex items-center gap-2 font-bold text-slate-700 mb-4">
                <Tag className="w-5 h-5 text-pink-500" />
                Penyesuaian Tagihan (Opsional)
              </h3>
            </div>

            {/* Diskon */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                <Tag className="w-4 h-4 text-green-500" />
                Diskon
              </label>
              <div className="flex gap-3">
                <input 
                  type="number" 
                  placeholder="Contoh: 50000 atau 10" 
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
                />
                <select className="bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-300 font-medium text-slate-700 outline-none cursor-pointer">
                  <option value="rp">Rp</option>
                  <option value="percent">%</option>
                </select>
              </div>
            </div>

            {/* Ongkos Kirim */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                <Truck className="w-4 h-4 text-blue-400" />
                Ongkos Kirim / Delivery Fee (Rp)
              </label>
              <input 
                type="number" 
                placeholder="Contoh: 15000" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
            </div>

            {/* Biaya Layanan */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                <CircleDollarSign className="w-4 h-4 text-purple-500" />
                Biaya Layanan / Service Fee (Rp)
              </label>
              <input 
                type="number" 
                placeholder="Contoh: 5000" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
              />
            </div>

            {/* Biaya Kemasan */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                <Package className="w-4 h-4 text-orange-400" />
                Biaya Kemasan / Packaging Fee (Rp)
              </label>
              <input 
                type="number" 
                placeholder="Contoh: 2000" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
              />
            </div>

            {/* Pajak (PPN) */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                <Percent className="w-4 h-4 text-fuchsia-500" />
                Pajak (PPN %) - Opsional
              </label>
              <input 
                type="number" 
                placeholder="Contoh: 10" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-300 transition"
              />
              <p className="text-xs text-slate-400 mt-2 ml-1">Pajak akan dihitung setelah semua penyesuaian</p>
            </div>

            {/* Tombol Lanjut */}
            <div className="pt-6">
              <button 
                type="button"
                className="w-full bg-gradient-to-r from-pink-300 to-blue-300 text-white font-bold py-4 rounded-xl hover:opacity-90 transition shadow-md"
              >
                Lanjut
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Split;