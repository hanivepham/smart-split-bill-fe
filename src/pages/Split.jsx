import React, { useState } from 'react';
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
  Percent,
  Check,
  User,
  X
} from 'lucide-react';

function Split() {
  const [totalTagihan, setTotalTagihan] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12">
      {/* HEADER */}
      <header className="flex items-center gap-4 px-8 py-6 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
        {currentStep === 1 ? (
          <Link to="/dashboard" className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowLeft className="text-slate-600 w-5 h-5" />
          </Link>
        ) : (
          <button onClick={() => setCurrentStep(1)} className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowLeft className="text-slate-600 w-5 h-5" />
          </button>
        )}
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
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-blue-400 flex items-center justify-center text-white font-bold shadow-md">
                {currentStep > 1 ? <Check className="w-6 h-6" /> : "1"}
              </div>
              <span className="text-xs font-bold text-pink-500 mt-2">Step 1</span>
            </div>
            <div className={`w-12 h-[2px] mb-6 mx-2 ${currentStep > 1 ? 'bg-gradient-to-r from-pink-400 to-blue-300' : 'bg-slate-200'}`}></div>
            
            {/* Step 2 */}
            <div className={`flex flex-col items-center ${currentStep === 1 ? 'opacity-50' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentStep >= 2 ? 'bg-gradient-to-r from-purple-300 to-blue-300 text-white shadow-md' : 'bg-white border-2 border-slate-200 text-slate-400'}`}>
                2
              </div>
              <span className={`text-xs mt-2 ${currentStep >= 2 ? 'font-bold text-purple-500' : 'font-medium text-slate-400'}`}>Step 2</span>
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

        {/* STEP 1: INPUT TAGIHAN */}
        {currentStep === 1 && (
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
                  value={totalTagihan}
                  onChange={(e) => setTotalTagihan(e.target.value)}
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

              {/* Preview Perhitungan (Hanya muncul jika totalTagihan diisi) */}
              {totalTagihan > 0 && (
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mt-8 mb-6">
                  <h4 className="font-bold text-slate-700 mb-4">Preview Perhitungan</h4>
                  <div className="flex justify-between text-sm text-slate-600 mb-3">
                    <span>Subtotal Makanan</span>
                    <span>Rp {new Intl.NumberFormat('id-ID').format(totalTagihan)}</span>
                  </div>
                  <div className="border-t border-pink-100 my-3"></div>
                  <div className="flex justify-between font-bold text-pink-500 text-lg">
                    <span>Grand Total</span>
                    <span className="text-blue-500">Rp {new Intl.NumberFormat('id-ID').format(totalTagihan)}</span>
                  </div>
                </div>
              )}

              {/* Tombol Lanjut (Aktif bersinar jika totalTagihan > 0, redup jika kosong) */}
              <div className={totalTagihan > 0 ? "pt-2" : "pt-8"}>
                {totalTagihan > 0 ? (
                  <button 
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="w-full block text-center bg-gradient-to-r from-pink-400 to-blue-400 text-white font-bold py-4 rounded-xl hover:opacity-90 transition shadow-md"
                  >
                    Lanjut
                  </button>
                ) : (
                  <button 
                    type="button"
                    disabled
                    className="w-full bg-gradient-to-r from-pink-300 to-blue-300 opacity-60 text-white font-bold py-4 rounded-xl cursor-not-allowed transition"
                  >
                    Lanjut
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: INPUT PESERTA */}
        {currentStep === 2 && (
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-pink-500 mb-2">
                Input Peserta
              </h1>
              <p className="text-slate-500">Masukkan nama 2 orang yang akan membagi tagihan</p>
            </div>

            <div className="space-y-6">
              {/* Orang 1 */}
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-purple-200 to-blue-200 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                  <User className="text-white w-6 h-6" />
                </div>
                <div className="flex-grow">
                  <label className="text-xs font-bold text-slate-500 block mb-1">Orang 1</label>
                  <input 
                    type="text" 
                    placeholder="Nama orang 1" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
                  />
                </div>
                <button className="text-red-400 hover:text-red-600 transition p-2 mt-4">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Orang 2 */}
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-purple-200 to-blue-200 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                  <User className="text-white w-6 h-6" />
                </div>
                <div className="flex-grow">
                  <label className="text-xs font-bold text-slate-500 block mb-1">Orang 2</label>
                  <input 
                    type="text" 
                    placeholder="Nama orang 2" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
                  />
                </div>
                <button className="text-red-400 hover:text-red-600 transition p-2 mt-4">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Summary Box */}
              <div className="bg-slate-50 rounded-xl p-4 text-center mt-8 border border-slate-100">
                <p className="text-sm font-medium text-slate-600">Total: 0 dari 2 orang sudah diisi</p>
              </div>

              {/* Tombol Lanjut */}
              <div className="pt-4">
                <button 
                  type="button"
                  className="w-full bg-gradient-to-r from-pink-300 to-blue-300 text-white font-bold py-4 rounded-xl hover:opacity-90 transition shadow-md"
                >
                  Lanjut ke Pembagian
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Split;