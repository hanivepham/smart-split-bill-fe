import React from 'react';
import { Info } from 'lucide-react';

function Step4Rata({
  totalTagihan,
  participants,
  setCurrentStep
}) {
  return (
    <div className="bg-white p-4 sm:p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-pink-500 mb-2">
          Preview Split Sama Rata
        </h1>
        <p className="text-sm md:text-base text-slate-500">Setiap orang akan membayar jumlah yang sama</p>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3 mb-8">
        <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700">
          <span className="font-bold">Pembagian Otomatis: </span> 
          Semua biaya (diskon, ongkir, service, packaging) dibagi rata untuk semua orang
        </p>
      </div>

      {/* List Peserta */}
      <div className="space-y-4 mb-8">
        {participants.map((p, index) => {
          // Hitung pembagian rata
          const perPerson = (Number(totalTagihan) || 0) / participants.length;
          
          return (
            <div key={p.id} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-4">{p.name || `Orang ${index + 1}`}</h3>
              <div className="flex justify-between text-sm text-slate-500 mb-4">
                <span>Subtotal Makanan</span>
                <span>Rp {new Intl.NumberFormat('id-ID').format(perPerson || 0)}</span>
              </div>
              <div className="border-t border-slate-200 pt-4 flex justify-between items-center font-bold">
                <span className="text-slate-800">Total Bayar</span>
                <span className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
                  Rp {new Intl.NumberFormat('id-ID').format(perPerson || 0)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Box */}
      <div className="border-2 border-pink-100 rounded-2xl p-6 mb-8">
        <h3 className="font-bold text-slate-800 mb-4">Summary</h3>
        <div className="flex justify-between text-sm text-slate-500 mb-2">
          <span>Grand Total</span>
          <span>Rp {new Intl.NumberFormat('id-ID').format(Number(totalTagihan) || 0)}</span>
        </div>
        <div className="flex justify-between text-sm text-slate-500 mb-4">
          <span>Jumlah Orang</span>
          <span>{participants.length}</span>
        </div>
        <div className="border-t border-slate-200 pt-4 flex justify-between items-center font-bold">
          <span className="text-slate-800">Per Person</span>
          <span className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
            Rp {new Intl.NumberFormat('id-ID').format((Number(totalTagihan) || 0) / participants.length)}
          </span>
        </div>
      </div>

      {/* Tombol Lanjut ke Ringkasan */}
      <div>
        <button 
          onClick={() => setCurrentStep(5)}
          className="w-full bg-gradient-to-r from-pink-400 to-blue-400 text-white font-bold py-4 rounded-xl hover:opacity-90 transition shadow-md"
        >
          Lanjut ke Ringkasan
        </button>
      </div>
    </div>
  );
}

export default Step4Rata;
