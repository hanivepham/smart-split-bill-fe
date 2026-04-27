import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calculator, CalendarDays, Users, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';

function History() {
  const [history, setHistory] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem('splitHistory') || '[]');
      setHistory(data);
    } catch (error) {
      console.error('Failed to parse history:', error);
      setHistory([]);
    }
  }, []);

  const handleDelete = (id) => {
    const filtered = history.filter(item => item.id !== id);
    setHistory(filtered);
    localStorage.setItem('splitHistory', JSON.stringify(filtered));
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      {/* HEADER */}
      <header className="flex items-center gap-2 md:gap-4 px-4 py-4 md:px-8 md:py-6 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
        <Link to="/dashboard" className="p-2 hover:bg-slate-100 rounded-full transition shrink-0">
          <ArrowLeft className="text-slate-600 w-5 h-5" />
        </Link>
        <div className="flex items-center gap-2 min-w-0">
          <div className="bg-gradient-to-r from-pink-400 to-blue-400 p-1.5 rounded-lg shrink-0">
            <Calculator className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-base md:text-lg bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500 truncate min-w-0">
            Smart Bill Splitter
          </span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 md:py-12">
        
        {/* Page Title */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-2xl md:text-4xl font-bold text-pink-500 mb-2 md:mb-3">
            Riwayat Tagihan
          </h1>
          <p className="text-sm md:text-base text-slate-500">Lihat dan kelola riwayat pembagian tagihan Anda</p>
        </div>

        {history.length === 0 ? (
          /* Empty State Card */
          <div className="bg-white p-8 md:p-16 rounded-3xl md:rounded-[2rem] shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
            
            {/* Icon Container */}
            <div className="bg-gradient-to-br from-purple-200 to-blue-200 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-6 shrink-0">
              <CalendarDays className="text-slate-500 w-10 h-10 md:w-12 md:h-12 opacity-70" />
            </div>
            
            <h2 className="text-xl md:text-2xl font-bold text-slate-700 mb-2 md:mb-3">Belum Ada Riwayat</h2>
            <p className="text-sm md:text-base text-slate-500 mb-8 max-w-md">
              Mulai buat pembagian tagihan untuk melihat riwayat
            </p>
            
            <Link 
              to="/split" 
              className="bg-gradient-to-r from-pink-400 to-blue-400 text-white font-bold py-3 px-6 md:px-8 rounded-full hover:opacity-90 transition shadow-md shadow-blue-200/50 text-sm md:text-base"
            >
              Buat Pembagian Baru
            </Link>
          </div>
        ) : (
          /* Jika Ada Riwayat */
          <div className="space-y-4">
            {history.map(item => (
              <div key={item.id} className="bg-white border border-slate-100 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm transition-all duration-300">
                <div 
                  className="flex justify-between items-start gap-3 md:gap-4 cursor-pointer" 
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                >
                  <div className="flex gap-3 md:gap-4 min-w-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-purple-200 to-blue-200 flex items-center justify-center text-white shrink-0 shadow-inner">
                      <CalendarDays className="w-6 h-6 md:w-7 md:h-7" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-slate-800 text-base md:text-lg truncate">{item.date}</h3>
                      <p className="text-xs md:text-sm text-slate-500 mb-1 md:mb-2">{item.time}</p>
                      <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs font-medium text-slate-600">
                        <span className="flex items-center gap-1 shrink-0"><Users className="w-3 h-3 md:w-4 md:h-4 text-slate-400"/> {item.peopleCount} org</span>
                        <span className="bg-blue-50 text-blue-600 px-2 md:px-3 py-1 rounded-full shrink-0 text-[10px] md:text-xs">{item.method}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 md:gap-2 mt-1 shrink-0">
                    {expandedId === item.id ? <ChevronUp className="text-slate-400 w-4 h-4 md:w-5 md:h-5"/> : <ChevronDown className="text-slate-400 w-4 h-4 md:w-5 md:h-5"/>}
                    <span className="font-bold text-sm md:text-xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500 mt-1 md:mt-2">
                      Rp {new Intl.NumberFormat('id-ID').format(Number(item.total) || 0)}
                    </span>
                  </div>
                </div>

                {expandedId === item.id && (
                  <div className="mt-4 md:mt-6 border-t border-slate-100 pt-4 md:pt-6 animate-in slide-in-from-top-2">
                    <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                      {item.details.map((detail, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-slate-50 p-3 md:p-4 rounded-xl border border-slate-100 gap-2">
                          <span className="font-bold text-slate-700 text-xs md:text-sm truncate min-w-0">{detail.name}</span>
                          <span className="text-pink-500 font-bold text-xs md:text-sm shrink-0">Rp {new Intl.NumberFormat('id-ID').format(Number(detail.amount) || 0)}</span>
                        </div>
                      ))}
                    </div>
                    <button 
                      onClick={() => handleDelete(item.id)} 
                      className="w-full border-2 border-red-100 text-red-500 font-bold text-sm md:text-base py-2 md:py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-red-50 transition"
                    >
                      <Trash2 className="w-4 h-4 md:w-5 md:h-5"/> Hapus Riwayat
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default History;
