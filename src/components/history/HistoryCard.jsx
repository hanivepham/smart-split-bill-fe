import React, { useState } from 'react';
import { CalendarDays, Users, ChevronDown, ChevronUp, Trash2, Wallet, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function HistoryCard({ bill, isExpanded, onToggle, onDelete }) {
  const navigate = useNavigate();
  const [isPaid, setIsPaid] = useState(() => {
    const savedStatus = localStorage.getItem(`paidStatus_${bill.id}`);
    return savedStatus ? JSON.parse(savedStatus) : false;
  });

  const dateObj = new Date(bill.created_at);
  const formattedDate = dateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  const formattedTime = dateObj.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  const peopleCount = bill.participants ? bill.participants.length : 0;
  const methodText = bill.split_method === 'rata' ? 'Bagi Rata' : 'Bagi Sesuai Porsi';
  const grandTotal = Number(bill.grand_total) || 0;

  return (
    <div className={`bg-white border border-slate-100 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm transition-all duration-300 ${isPaid ? 'opacity-70 bg-slate-50/80 grayscale-[20%]' : ''}`}>
      <div
        className="flex justify-between items-start gap-3 md:gap-4 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex gap-3 md:gap-4 min-w-0">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-purple-200 to-blue-200 flex items-center justify-center text-white shrink-0 shadow-inner">
            <CalendarDays className="w-6 h-6 md:w-7 md:h-7" />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-slate-800 text-base md:text-lg truncate">{formattedDate}</h3>
            <p className="text-xs md:text-sm text-slate-500 mb-1 md:mb-2">{formattedTime}</p>
            <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs font-medium text-slate-600">
              <span className="flex items-center gap-1 shrink-0"><Users className="w-3 h-3 md:w-4 md:h-4 text-slate-400" /> {peopleCount} org</span>
              <span className="bg-blue-50 text-blue-600 px-2 md:px-3 py-1 rounded-full shrink-0 text-[10px] md:text-xs">{methodText}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 md:gap-2 mt-1 shrink-0">
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                const newStatus = !isPaid;
                setIsPaid(newStatus);
                localStorage.setItem(`paidStatus_${bill.id}`, JSON.stringify(newStatus));
              }}
              className={`p-1 md:p-1.5 rounded-full transition-colors ${isPaid ? 'text-emerald-500 bg-emerald-50' : 'text-slate-300 hover:text-slate-400 hover:bg-slate-50'}`}
              title={isPaid ? "Tandai Belum Lunas" : "Tandai Lunas"}
            >
              <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            {isExpanded ? <ChevronUp className="text-slate-400 w-4 h-4 md:w-5 md:h-5" /> : <ChevronDown className="text-slate-400 w-4 h-4 md:w-5 md:h-5" />}
          </div>
          <span className="font-bold text-sm md:text-xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500 mt-1 md:mt-2">
            Rp {new Intl.NumberFormat('id-ID').format(grandTotal)}
          </span>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 md:mt-6 border-t border-slate-100 pt-4 md:pt-6 animate-in slide-in-from-top-2">
          <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
            {bill.participants && bill.participants.map((detail, idx) => (
              <div key={idx} className="flex justify-between items-center bg-slate-50 p-3 md:p-4 rounded-xl border border-slate-100 gap-2">
                <span className="font-bold text-slate-700 text-xs md:text-sm truncate min-w-0">{detail.name}</span>
                <span className="text-pink-500 font-bold text-xs md:text-sm shrink-0">Rp {new Intl.NumberFormat('id-ID').format(Number(detail.amount_due) || 0)}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">

            {/* TOMBOL LIHAT DETAIL YANG UDAH DIPERBAIKI */}
            <button
              onClick={(e) => {
                e.stopPropagation();

                const splitMethod = bill.split_method || 'rata';

                // 1. Kita bikin "Fake Bill Data" biar perhitungan Step 5 nggak dobel pajak
                const reconstructedBillData = {
                  subtotal: grandTotal,
                  grandTotal: grandTotal,
                  discount: 0,
                  deliveryFee: 0,
                  serviceFee: 0,
                  packagingFee: 0,
                  taxPercentage: 0
                };

                // 2. Format ulang peserta biar Step 5 bisa ngebaca
                const participantsData = bill.participants?.map((d, i) => ({
                  id: Date.now() + i,
                  name: d.name,
                  amount_due: Number(d.amount_due),
                  items: [{ menu: 'Tagihan Riwayat', price: Number(d.amount_due) || 0 }]
                })) || [];

                // 3. Masukkan SEMUA KUNCI yang dibutuhkan ke SessionStorage
                sessionStorage.setItem("split_billData", JSON.stringify(reconstructedBillData));
                sessionStorage.setItem("split_participants", JSON.stringify(participantsData));
                sessionStorage.setItem("split_method", JSON.stringify(splitMethod));

                // (Untuk jaga-jaga kalau kodingan lama lo nyari ini)
                sessionStorage.setItem("split_totalTagihan", JSON.stringify(grandTotal));
                sessionStorage.setItem("split_jumlahOrang", JSON.stringify(peopleCount || 2));
                sessionStorage.setItem("split_splitMethod", JSON.stringify(splitMethod));

                sessionStorage.setItem("split_currentStep", JSON.stringify(6));

                const paymentData = {
                  type: bill.payment_type || 'rekening',
                  bankName: bill.bank_name || '',
                  accountNumber: bill.account_number || '',
                  accountName: bill.account_name || '',
                  qrImageUrl: bill.qr_image_url || ''
                };

                navigate('/split', { 
                  state: { 
                    fromHistory: true, 
                    isViewingHistory: true, 
                    billData: reconstructedBillData,
                    paymentData: paymentData
                  } 
                });
              }}
              disabled={isPaid}
              className={`w-full font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm text-sm md:text-base ${isPaid ? 'bg-slate-200 text-slate-400 opacity-50 pointer-events-none' : 'bg-gradient-to-r from-emerald-400 to-teal-400 text-white hover:opacity-90 transition-opacity'}`}
            >
              <Wallet className="w-4 h-4 md:w-5 md:h-5" /> Lihat Detail
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