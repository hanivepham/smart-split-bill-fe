import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calculator, CalendarDays } from 'lucide-react';
import HistoryCard from '../components/history/HistoryCard';

function History() {
  const [history, setHistory] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();

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

  const handleStartNewSplit = () => {
    sessionStorage.removeItem("split_currentStep");
    sessionStorage.removeItem("split_billData");
    sessionStorage.removeItem("split_participants");
    sessionStorage.removeItem("split_method");
    sessionStorage.removeItem("split_customSplits");
    
    // Sesuaikan juga dengan kunci dari versi yang lebih baru
    sessionStorage.removeItem("split_totalTagihan");
    sessionStorage.removeItem("split_jumlahOrang");
    sessionStorage.removeItem("split_splitMethod");

    navigate('/split');
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
            
            <button 
              onClick={handleStartNewSplit}
              className="bg-gradient-to-r from-pink-400 to-blue-400 text-white font-bold py-3 px-6 md:px-8 rounded-full hover:opacity-90 transition shadow-md shadow-blue-200/50 text-sm md:text-base"
            >
              Buat Pembagian Baru
            </button>
          </div>
        ) : (
          /* Jika Ada Riwayat */
          <div className="space-y-4">
            {history.map(bill => (
              <HistoryCard
                key={bill.id}
                bill={bill}
                isExpanded={expandedId === bill.id}
                onToggle={() => setExpandedId(expandedId === bill.id ? null : bill.id)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default History;
