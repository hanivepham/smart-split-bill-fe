import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calculator, CalendarDays, Loader2, Trash2, User } from 'lucide-react';
import HistoryCard from '../components/history/HistoryCard';
import api from '../api';

function History() {
  const [history, setHistory] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const userObj = JSON.parse(userStr);
        setUsername(userObj.username || userObj.name || null);
      } catch (e) {
        setUsername(userStr);
      }
    }
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get('/bills');
        setHistory(response.data.data);
      } catch (error) {
        console.error('Failed to fetch history from database:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus tagihan ini?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/bills/${id}`);
      const filtered = history.filter(item => item.id !== id);
      setHistory(filtered);
    } catch (error) {
      console.error('Gagal menghapus tagihan:', error);
      alert('Gagal menghapus tagihan dari database.');
    }
  };

  const handleDeleteAll = async () => {
    const confirmDelete = window.confirm("Yakin ingin menghapus semua riwayat tagihan? Aksi ini tidak dapat dibatalkan.");
    if (!confirmDelete) return;

    try {
      await api.delete('/bills/delete-all');
      setHistory([]);
    } catch (error) {
      console.error('Gagal menghapus semua tagihan:', error);
      alert('Gagal menghapus semua tagihan dari database.');
    }
  };

  const handleStartNewSplit = () => {
    // Bersihkan memori lama biar mulai dari nol
    sessionStorage.removeItem("split_currentStep");
    sessionStorage.removeItem("split_billData");
    sessionStorage.removeItem("split_participants");
    sessionStorage.removeItem("split_method");
    sessionStorage.removeItem("split_customSplits");
    sessionStorage.removeItem("split_totalTagihan");
    sessionStorage.removeItem("split_jumlahOrang");
    sessionStorage.removeItem("split_splitMethod");

    // LANSUNG TEMBAK KE /split (Bukan ke /input-method lagi)
    navigate('/split');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <header className="flex items-center justify-between px-4 py-4 md:px-8 md:py-6 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
        <div className="flex items-center gap-2 md:gap-4">
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
        </div>

        {username && (
          <div className="flex items-center gap-2.5 bg-white border-2 border-pink-100 hover:border-pink-300 shadow-sm hover:shadow-md px-2 py-1.5 rounded-full transition-all duration-300 ml-1 md:ml-2">
              <div className="bg-gradient-to-tr from-pink-400 to-blue-400 p-1.5 rounded-full shadow-sm shrink-0">
                  <User size={14} className="text-white" />
              </div>
              <span className="font-bold text-sm md:text-base bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500 pr-2 hidden sm:inline truncate max-w-[100px] md:max-w-[150px]">
                  {username}
              </span>
          </div>
        )}
      </header>

      <main className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 md:py-12">
        <div className="mb-8 md:mb-10 flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-pink-500 mb-2 md:mb-3">
              Riwayat Tagihan
            </h1>
            <p className="text-sm md:text-base text-slate-500">Lihat dan kelola riwayat pembagian tagihan Anda</p>
          </div>
          {history.length > 0 && !loading && (
            <button
              onClick={handleDeleteAll}
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-colors font-semibold shadow-sm w-full md:w-auto"
            >
              <Trash2 className="w-4 h-4" /> Hapus Semua
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
            <p className="text-slate-500">Memuat data dari database...</p>
          </div>
        ) : history.length === 0 ? (
          <div className="bg-white p-8 md:p-16 rounded-3xl md:rounded-[2rem] shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
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