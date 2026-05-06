import React from 'react';
import { CalendarDays, Users, ChevronDown, ChevronUp, Trash2, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function HistoryCard({ bill, isExpanded, onToggle, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-slate-100 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm transition-all duration-300">
      <div 
        className="flex justify-between items-start gap-3 md:gap-4 cursor-pointer" 
        onClick={onToggle}
      >
        <div className="flex gap-3 md:gap-4 min-w-0">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-purple-200 to-blue-200 flex items-center justify-center text-white shrink-0 shadow-inner">
            <CalendarDays className="w-6 h-6 md:w-7 md:h-7" />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-slate-800 text-base md:text-lg truncate">{bill.date}</h3>
            <p className="text-xs md:text-sm text-slate-500 mb-1 md:mb-2">{bill.time}</p>
            <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs font-medium text-slate-600">
              <span className="flex items-center gap-1 shrink-0"><Users className="w-3 h-3 md:w-4 md:h-4 text-slate-400"/> {bill.peopleCount} org</span>
              <span className="bg-blue-50 text-blue-600 px-2 md:px-3 py-1 rounded-full shrink-0 text-[10px] md:text-xs">{bill.method}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 md:gap-2 mt-1 shrink-0">
          {isExpanded ? <ChevronUp className="text-slate-400 w-4 h-4 md:w-5 md:h-5"/> : <ChevronDown className="text-slate-400 w-4 h-4 md:w-5 md:h-5"/>}
          <span className="font-bold text-sm md:text-xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500 mt-1 md:mt-2">
            Rp {new Intl.NumberFormat('id-ID').format(Number(bill.total) || 0)}
          </span>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 md:mt-6 border-t border-slate-100 pt-4 md:pt-6 animate-in slide-in-from-top-2">
          <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
            {bill.details.map((detail, idx) => (
              <div key={idx} className="flex justify-between items-center bg-slate-50 p-3 md:p-4 rounded-xl border border-slate-100 gap-2">
                <span className="font-bold text-slate-700 text-xs md:text-sm truncate min-w-0">{detail.name}</span>
                <span className="text-pink-500 font-bold text-xs md:text-sm shrink-0">Rp {new Intl.NumberFormat('id-ID').format(Number(detail.amount) || 0)}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <button
              onClick={() => navigate('/payment')}
              className="w-full bg-gradient-to-r from-emerald-400 to-teal-400 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm text-sm md:text-base"
            >
              <Wallet className="w-4 h-4 md:w-5 md:h-5" /> Lanjut Bayar
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(bill.id);
              }}
              className="w-full bg-white border border-red-200 text-red-500 font-semibold py-3 rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <Trash2 className="w-4 h-4 md:w-5 md:h-5" /> Hapus Riwayat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HistoryCard;
