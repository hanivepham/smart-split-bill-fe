import React from 'react';
import { 
  Receipt, 
  Users, 
  Tag, 
  Truck, 
  CircleDollarSign, 
  Package, 
  Percent 
} from 'lucide-react';

function Step1({
  totalTagihan,
  setTotalTagihan,
  jumlahOrang,
  setJumlahOrang,
  onNext
}) {
  return (
    <div className="bg-white p-4 sm:p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 mb-2">
          Input Tagihan
        </h1>
        <p className="text-sm md:text-base text-slate-500">Masukkan detail tagihan Anda</p>
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
            min="2"
            placeholder="2" 
            value={jumlahOrang}
            onChange={(e) => setJumlahOrang(e.target.value)}
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
          <div className="flex gap-2 md:gap-3 min-w-0">
            <input 
              type="number" 
              placeholder="Contoh: 50000" 
              className="flex-1 min-w-0 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 md:px-4 md:py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-300 transition"
            />
            <select className="bg-white border border-slate-200 rounded-xl px-2 md:px-4 py-2 md:py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-300 font-medium text-slate-700 outline-none cursor-pointer shrink-0">
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
              <span>Rp {new Intl.NumberFormat('id-ID').format(Number(totalTagihan) || 0)}</span>
            </div>
            <div className="border-t border-pink-100 my-3"></div>
            <div className="flex justify-between font-bold text-pink-500 text-lg">
              <span>Grand Total</span>
              <span className="text-blue-500">Rp {new Intl.NumberFormat('id-ID').format(Number(totalTagihan) || 0)}</span>
            </div>
          </div>
        )}

        {/* Tombol Lanjut */}
        <div className={totalTagihan > 0 && jumlahOrang > 1 ? "pt-2" : "pt-8"}>
          {totalTagihan > 0 && jumlahOrang > 1 ? (
            <button 
              type="button"
              onClick={onNext}
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
  );
}

export default Step1;
