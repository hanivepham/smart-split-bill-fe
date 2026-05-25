import React, { useRef } from 'react';
import { toBlob } from 'html-to-image';
import { CheckCircle, Share2, Save, RotateCcw, Home, Wallet, QrCode } from 'lucide-react';

function Step5({
  totalTagihan,
  participants,
  splitMethod,
  onSave,
  handleReset,
  navigate,
  onPrev // Added to satisfy prompt
}) {
  const receiptRef = useRef(null);

  const handleShare = async () => {
    if (!receiptRef.current) return;
    try {
      const blob = await toBlob(receiptRef.current, {
        style: {
          padding: '30px',
          width: '100%',
          height: 'auto',
        },
        backgroundColor: '#ffffff',
        scale: 2,
        cacheBust: true,
      });
      if (!blob) return;
      
      const file = new File([blob], 'split-bill-receipt.png', { type: 'image/png' });
      
      // Cek apakah browser mendukung Web Share API beserta file sharing
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Tagihan Split Bill',
          text: 'Ini rincian patungan kita ya!',
          files: [file]
        });
      } else {
        // Fallback otomatis download jika di PC yang tidak support Web Share
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'tagihan-split-bill.png';
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Gagal membagikan struk:', error);
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 text-center">
      <div ref={receiptRef} className="bg-white p-2 sm:p-4 -mx-2 sm:-mx-4 rounded-xl">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-300 to-blue-300 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-md shrink-0">
          <CheckCircle className="text-white w-8 h-8 md:w-10 md:h-10" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-purple-500 mb-2">Pembagian Selesai!</h1>
        <p className="text-sm md:text-base text-slate-500 mb-6 md:mb-8">Berikut adalah ringkasan pembagian tagihan</p>
      
      <div className="bg-slate-50 rounded-2xl p-6 text-left border border-slate-100 mb-6">
        <h3 className="font-bold text-slate-800 mb-4">Total Tagihan</h3>
        <div className="flex justify-between text-sm text-slate-500 mb-4">
          <span>Subtotal Makanan</span>
          <span>Rp {new Intl.NumberFormat('id-ID').format(Number(totalTagihan) || 0)}</span>
        </div>
        <div className="border-t border-slate-200 pt-4 flex justify-between items-center font-bold">
          <span className="text-slate-800">Grand Total</span>
          <span className="text-xl text-blue-500">Rp {new Intl.NumberFormat('id-ID').format(Number(totalTagihan) || 0)}</span>
        </div>
      </div>
      
      <div className="text-left mb-8">
        <div className="flex items-baseline gap-2 mb-4">
          <h3 className="font-bold text-slate-800">Rincian Per Orang</h3>
          {splitMethod === 'custom' && <span className="text-xs text-slate-500">(Pembagian Berdasarkan Porsi)</span>}
        </div>
        <div className="space-y-4">
          {participants.map((p, i) => {
            if (splitMethod === 'rata') {
              const perPerson = (Number(totalTagihan) || 0) / participants.length;
              return (
                <div key={p.id} className="border border-slate-100 rounded-2xl p-6 shadow-sm">
                  {i === 0 && (
                    <div className="mb-6 flex flex-col md:flex-row items-center gap-4 bg-purple-50/50 p-4 rounded-xl border border-purple-100">
                      <div className="bg-white p-3 rounded-xl shadow-sm shrink-0">
                        <QrCode className="w-16 h-16 md:w-20 md:h-20 text-slate-800" strokeWidth={1.5} />
                      </div>
                      <div className="text-left text-sm text-slate-600 leading-relaxed">
                        Pindai QR ini untuk membayar ke <span className="font-bold text-slate-800">{participants[0]?.name || 'Penalang'}</span>.
                        <br/>
                        <span className="text-xs text-slate-500">Bisa transfer manual via GoPay, DANA, OVO, atau ShopeePay.</span>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between font-bold mb-4">
                    <span className="text-slate-800">{p.name || `Orang ${i+1}`}</span>
                    <span className="text-blue-500">Rp {new Intl.NumberFormat('id-ID').format(perPerson || 0)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-500 mb-4">
                    <span>Subtotal Makanan</span>
                    <span>Rp {new Intl.NumberFormat('id-ID').format(perPerson || 0)}</span>
                  </div>
                  <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-600">Total Bayar</span>
                    <span className="text-pink-500">Rp {new Intl.NumberFormat('id-ID').format(perPerson || 0)}</span>
                  </div>
                </div>
              );
            } else {
              const personTotal = p.items?.reduce((sum, item) => sum + (Number(item.price) || 0), 0) || 0;
              const porsi = totalTagihan > 0 ? ((personTotal / totalTagihan) * 100).toFixed(1) : 0;
              return (
                <div key={p.id} className="border border-slate-100 rounded-2xl p-6 shadow-sm">
                  {i === 0 && (
                    <div className="mb-6 flex flex-col md:flex-row items-center gap-4 bg-purple-50/50 p-4 rounded-xl border border-purple-100">
                      <div className="bg-white p-3 rounded-xl shadow-sm shrink-0">
                        <QrCode className="w-16 h-16 md:w-20 md:h-20 text-slate-800" strokeWidth={1.5} />
                      </div>
                      <div className="text-left text-sm text-slate-600 leading-relaxed">
                        Pindai QR ini untuk membayar ke <span className="font-bold text-slate-800">{participants[0]?.name || 'Penalang'}</span>.
                        <br/>
                        <span className="text-xs text-slate-500">Bisa transfer manual via GoPay, DANA, OVO, atau ShopeePay.</span>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-slate-800">{p.name || `Orang ${i+1}`}</span>
                    <span className="text-blue-500">Rp {new Intl.NumberFormat('id-ID').format(personTotal || 0)}</span>
                  </div>
                  <div className="text-xs text-slate-400 mb-4">Porsi: {porsi}%</div>
                  {p.items && p.items.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-bold text-slate-500 mb-2">Items:</p>
                      {p.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm text-slate-600 mb-1">
                          <span>{item.menu || 'Item'}</span>
                          <span>Rp {new Intl.NumberFormat('id-ID').format(Number(item.price) || 0)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-slate-500 mb-4 border-t border-slate-100 pt-4">
                    <span>Subtotal Makanan</span>
                    <span>Rp {new Intl.NumberFormat('id-ID').format(personTotal || 0)}</span>
                  </div>
                  <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-800">Total Bayar</span>
                    <span className="text-pink-500">Rp {new Intl.NumberFormat('id-ID').format(personTotal || 0)}</span>
                  </div>
                </div>
              );
            }
          })}
        </div>
        </div>
      </div>
      
      <div className="mt-8">
        <div className="grid grid-cols-2 gap-3 mb-5">
          <button 
            onClick={handleShare}
            className="w-full bg-white border border-blue-200 text-blue-500 font-semibold py-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button 
            onClick={onSave}
            className="w-full bg-white border border-green-200 text-green-500 font-semibold py-3 rounded-xl hover:bg-green-50 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <Save className="w-4 h-4" /> Simpan
          </button>
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full bg-slate-50 border border-slate-200 text-slate-600 font-semibold py-3 rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
          >
            <Home className="w-4 h-4" /> Ke Dashboard
          </button>
          <button 
            onClick={handleReset}
            className="w-full bg-gradient-to-r from-pink-400 to-blue-400 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-sm shadow-sm"
          >
            <RotateCcw className="w-4 h-4" /> Buat Lagi
          </button>
        </div>
      </div>
    </div>
  );
}

export default Step5;
