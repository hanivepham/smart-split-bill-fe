import React from 'react';
import { CheckCircle2, Split as SplitIcon, PenLine } from 'lucide-react';

function Step3({
  splitMethod,
  setSplitMethod,
  onNext,
  onPrev // Added to satisfy prompt
}) {
  return (
    <div className="bg-white p-4 sm:p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-pink-500 mb-2">Pilih Metode Pembagian</h1>
        <p className="text-sm md:text-base text-slate-500">Bagaimana Anda ingin membagi tagihan?</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-center">
        <div 
          onClick={() => setSplitMethod('rata')}
          className={`relative p-8 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
            splitMethod === 'rata' 
              ? 'border-pink-300 bg-gradient-to-br from-pink-50 to-blue-50 shadow-md' 
              : 'border-slate-100 hover:border-pink-200 bg-white'
          }`}
        >
          {splitMethod === 'rata' && <CheckCircle2 className="absolute top-4 right-4 w-6 h-6 text-purple-400 fill-purple-100" />}
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-pink-300 to-blue-300 flex items-center justify-center mb-6 shadow-inner">
            <SplitIcon className="text-white w-8 h-8" />
          </div>
          <h3 className="font-bold text-xl text-slate-800 mb-2">Split Sama Rata</h3>
          <p className="text-sm text-slate-500">Bagi tagihan secara merata untuk semua orang</p>
        </div>
        <div 
          onClick={() => setSplitMethod('custom')}
          className={`relative p-8 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
            splitMethod === 'custom' 
              ? 'border-pink-300 bg-gradient-to-br from-pink-50 to-blue-50 shadow-md' 
              : 'border-slate-100 hover:border-pink-200 bg-white'
          }`}
        >
          {splitMethod === 'custom' && <CheckCircle2 className="absolute top-4 right-4 w-6 h-6 text-purple-400 fill-purple-100" />}
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-300 to-pink-300 flex items-center justify-center mb-6 shadow-inner">
            <PenLine className="text-white w-8 h-8" />
          </div>
          <h3 className="font-bold text-xl text-slate-800 mb-2">Custom Split</h3>
          <p className="text-sm text-slate-500">Atur pembagian sesuai kebutuhan masing-masing orang</p>
        </div>
      </div>
      <div>
        <button 
          onClick={onNext}
          className="w-full bg-gradient-to-r from-pink-400 to-blue-400 text-white font-bold py-4 rounded-xl hover:opacity-90 transition shadow-md"
        >
          Lanjut
        </button>
      </div>
    </div>
  );
}

export default Step3;
