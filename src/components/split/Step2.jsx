import React from 'react';
import { User, X } from 'lucide-react';

function Step2({
  jumlahOrang,
  participants,
  setParticipants,
  removeParticipant,
  filledCount,
  isAllFilled,
  onNext,
  onPrev
}) {
  return (
    <div className="bg-white p-4 sm:p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-pink-500 mb-2">
          Input Peserta
        </h1>
        <p className="text-sm md:text-base text-slate-500">
          Masukkan nama {Math.max(2, Number(jumlahOrang) || 2)} orang yang akan membagi tagihan
        </p>
      </div>

      <div className="space-y-6">
        {participants.map((p, index) => (
          <div key={p.id} className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
              p.name.trim() !== '' 
                ? 'bg-gradient-to-br from-pink-400 to-blue-400 shadow-md' 
                : 'bg-gradient-to-br from-purple-200 to-blue-200'
            }`}>
              <User className="w-6 h-6 text-white" />
            </div>
            
            <div className="flex-grow min-w-0">
              <label className="text-xs font-bold text-slate-500 block mb-1">Orang {index + 1}</label>
              <input 
                type="text" 
                placeholder={`Nama orang ${index + 1}`} 
                value={p.name}
                onChange={(e) => {
                  const newParticipants = [...participants];
                  newParticipants[index].name = e.target.value;
                  setParticipants(newParticipants);
                }}
                className="w-full min-w-0 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 md:px-4 md:py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
              />
            </div>
            {Number(jumlahOrang) > 2 ? (
              <button 
                type="button"
                onClick={() => removeParticipant(index)}
                className="shrink-0 text-red-400 hover:text-red-600 transition p-2 mt-4"
                title="Hapus peserta ini"
              >
                <X className="w-5 h-5 shrink-0" />
              </button>
            ) : (
              <div className="w-9 mt-4 shrink-0"></div>
            )}
          </div>
        ))}

        <div className="bg-slate-50 rounded-xl p-4 text-center mt-8 border border-slate-100">
          <p className="text-sm font-medium text-slate-600">
            Total: {filledCount} dari {jumlahOrang} orang sudah diisi
          </p>
        </div>

        <div className="pt-4">
          <button 
            type="button"
            disabled={!isAllFilled}
            onClick={onNext}
            className={`w-full font-bold py-4 rounded-xl transition shadow-md ${
              isAllFilled 
                ? 'bg-gradient-to-r from-pink-400 to-blue-400 text-white hover:opacity-90' 
                : 'bg-gradient-to-r from-pink-300 to-blue-300 opacity-60 text-white cursor-not-allowed'
            }`}
          >
            Lanjut ke Pembagian
          </button>
        </div>
      </div>
    </div>
  );
}

export default Step2;
