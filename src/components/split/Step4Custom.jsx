import React from 'react';
import { Info, X, Plus, AlertTriangle } from 'lucide-react';

function Step4Custom({
  totalTagihan,
  participants,
  handleItemChange,
  handleRemoveItem,
  handleAddItem,
  getParticipantSubtotal,
  totalCustomSubtotal,
  isSubtotalMatch,
  isCustomValid,
  setCurrentStep
}) {
  return (
    <div className="bg-white p-4 sm:p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-pink-500 mb-2">Custom Split</h1>
        <p className="text-sm md:text-base text-slate-500">Masukkan detail pembelian untuk setiap orang (harga makanan saja)</p>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3 mb-8">
        <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700">
          <span className="font-bold">Pembagian Otomatis Berdasarkan Porsi: </span> 
          Diskon, ongkir, service, dan packaging akan dibagi proporsional sesuai porsi makanan masing-masing orang
        </p>
      </div>

      {/* List Peserta & Form Menu */}
      <div className="space-y-6 mb-8">
        {participants.map((p, pIndex) => {
          const pSubtotal = getParticipantSubtotal(p);
          const porsi = totalCustomSubtotal > 0 ? ((pSubtotal / totalCustomSubtotal) * 100).toFixed(1) : 0;
          const items = p.items || [{ menu: '', price: '' }];

          return (
            <div key={p.id} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-4">{p.name || `Orang ${pIndex + 1}`}</h3>
              
              {/* Form Items */}
              <div className="space-y-3 mb-4">
                {(p.items || []).map((item, itemIndex) => (
                  <div key={itemIndex} className="flex gap-2 items-center">
                    <input 
                      type="text" 
                      placeholder="Nama menu" 
                      value={item.menu}
                      onChange={(e) => handleItemChange(pIndex, itemIndex, 'menu', e.target.value)}
                      className="w-full min-w-0 bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm md:text-base focus:ring-2 focus:ring-pink-300 outline-none"
                    />
                    <input 
                      type="number" 
                      placeholder="Harga" 
                      value={item.price}
                      onChange={(e) => handleItemChange(pIndex, itemIndex, 'price', e.target.value)}
                      className="w-24 md:w-32 shrink-0 bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm md:text-base focus:ring-2 focus:ring-pink-300 outline-none"
                    />
                    {items.length > 1 && (
                      <button 
                        onClick={() => handleRemoveItem(pIndex, itemIndex)} 
                        className="shrink-0 text-red-400 hover:text-red-600 p-1 md:p-2"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleAddItem(pIndex)}
                className="w-full py-2 mb-6 border-2 border-dashed border-pink-200 text-pink-400 rounded-xl font-medium text-sm hover:bg-pink-50 hover:border-pink-300 transition flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Tambah Item
              </button>

              {/* Kalkulasi Per Orang */}
              <div className="text-xs text-slate-400 mb-2">Porsi: {porsi}%</div>
              <div className="flex justify-between text-sm text-slate-500 mb-2">
                <span>Subtotal Makanan</span>
                <span>Rp {new Intl.NumberFormat('id-ID').format(pSubtotal || 0)}</span>
              </div>
              <div className="border-t border-slate-200 pt-3 flex justify-between items-center font-bold">
                <span className="text-slate-800 text-sm">Total Bayar</span>
                <span className="text-pink-500">Rp {new Intl.NumberFormat('id-ID').format(pSubtotal || 0)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall Summary */}
      <div className="border-2 border-pink-100 rounded-2xl p-6 mb-8">
        <h3 className="font-bold text-slate-800 mb-4">Overall Summary</h3>
        <div className="flex justify-between text-sm text-slate-500 mb-4">
          <span>Total Subtotal Makanan</span>
          <span>Rp {new Intl.NumberFormat('id-ID').format(totalCustomSubtotal || 0)}</span>
        </div>
        <div className="border-t border-slate-200 pt-4 flex justify-between items-center font-bold mb-4">
          <span className="text-slate-800">Grand Total</span>
          <span className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
            Rp {new Intl.NumberFormat('id-ID').format(totalCustomSubtotal || 0)}
          </span>
        </div>

        {/* Warning Box jika tidak match */}
        {!isSubtotalMatch && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
            <p className="text-xs text-yellow-700">
              Total subtotal makanan tidak sesuai dengan tagihan awal. Expected: Rp {new Intl.NumberFormat('id-ID').format(Number(totalTagihan) || 0)}
            </p>
          </div>
        )}
      </div>

      {/* Tombol Lanjut (Validasi) */}
      <div>
        <button 
          onClick={() => setCurrentStep(5)}
          disabled={!isCustomValid}
          className={`w-full font-bold py-4 rounded-xl transition shadow-md ${
            isCustomValid 
              ? 'bg-gradient-to-r from-pink-400 to-blue-400 text-white hover:opacity-90' 
              : 'bg-gradient-to-r from-pink-300 to-blue-300 opacity-60 text-white cursor-not-allowed'
          }`}
        >
          Lanjut ke Ringkasan
        </button>
      </div>
    </div>
  );
}

export default Step4Custom;
