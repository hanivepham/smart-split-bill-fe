import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Wallet, ExternalLink, ShieldCheck, Receipt } from 'lucide-react';

export default function Payment() {
  const navigate = useNavigate();
  const [totalTagihan, setTotalTagihan] = useState(0);

  useEffect(() => {
    const savedBill = sessionStorage.getItem("split_totalTagihan");
    if (savedBill) {
      const parsed = JSON.parse(savedBill);
      setTotalTagihan(Number(parsed) || 0);
    }
  }, []);

  const ewallets = [
    { name: 'GoPay', url: 'https://gopay.co.id/', accent: 'text-blue-500', bgIcon: 'bg-blue-50', borderHover: 'hover:border-blue-500' },
    { name: 'DANA', url: 'https://dana.id/', accent: 'text-blue-400', bgIcon: 'bg-blue-50', borderHover: 'hover:border-blue-400' },
    { name: 'OVO', url: 'https://www.ovo.id/', accent: 'text-purple-600', bgIcon: 'bg-purple-50', borderHover: 'hover:border-purple-600' },
    { name: 'ShopeePay', url: 'https://shopeepay.co.id/', accent: 'text-orange-500', bgIcon: 'bg-orange-50', borderHover: 'hover:border-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 py-10 px-4 font-sans flex items-center justify-center relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Main Container - Glassmorphism, Rounded Besar */}
        <div className="bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] shadow-2xl border border-white/50">

          {/* Header - Tombol back disesuaikan, Ikon Wallet Gradasi */}
          <div className="flex items-center mb-8 relative">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-0 p-2.5 bg-white text-slate-400 rounded-full hover:bg-pink-50 hover:text-pink-500 transition-all shadow-sm border border-slate-100 z-10"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-full flex justify-center items-center gap-2">
              <div className="p-2.5 rounded-full bg-gradient-to-br from-pink-300 to-blue-300 flex items-center justify-center shadow-md">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-800">
                Pembayaran
              </h2>
            </div>
          </div>

          {/* Total Tagihan Card - Hapus Card Gelap, Ganti Card Abu-abu Muda Bersih */}
          {totalTagihan > 0 && (
            <div className="bg-slate-50 rounded-2xl p-6 mb-4 text-center shadow-inner border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/50 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
              <Receipt className="w-5 h-5 text-slate-400 mx-auto mb-2 relative z-10" />
              <p className="text-slate-400 text-xs font-medium mb-1 relative z-10">Total yang harus dibayar</p>
              <p className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent relative z-10">
                Rp {totalTagihan.toLocaleString('id-ID')}
              </p>
            </div>
          )}

          {/* Teks Deskripsi Dipertahankan dan Ditata Rapi */}
          <div className="px-2 mb-8 text-center">
            <p className="text-slate-500 text-sm font-medium">Pilih metode pembayaran (E-Wallet) di bawah ini.</p>
            <p className="text-slate-400 text-xs font-medium mt-1">Anda akan diarahkan ke halaman resmi aplikasi terkait.</p>
          </div>

          {/* Payment Options - Card Putih Bersih dengan Efek Hover Selaras */}
          <div className="space-y-3">
            {ewallets.map((wallet, index) => (
              <button
                key={index}
                onClick={() => window.open(wallet.url, '_blank')}
                className={`w-full group bg-white border border-slate-100 py-4 px-5 rounded-2xl transition-all duration-300 flex items-center justify-between shadow-sm hover:shadow-md ${wallet.borderHover}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl ${wallet.bgIcon} border border-slate-100 flex items-center justify-center group-hover:bg-white transition-colors shadow-inner`}>
                    <Wallet className={`w-5 h-5 ${wallet.accent}`} />
                  </div>
                  <span className="font-bold text-slate-700 text-sm md:text-base">{wallet.name}</span>
                </div>
                <ExternalLink className={`w-5 h-5 text-slate-300 group-hover:${wallet.accent} transition-colors`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
