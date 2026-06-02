import React, { useRef, useState } from 'react'; // Tambah useState
import { toBlob } from 'html-to-image';
import { CheckCircle, Share2, Save, RotateCcw, Home, Wallet } from 'lucide-react';
import QRCode from 'react-qr-code';
import api from '../../api'; // Import kurir Axios kita

function Step5({
  billData,
  participants,
  splitMethod,
  onSave,
  handleReset,
  navigate,
  onPrev
}) {
  const receiptRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false); // State buat nahan tombol biar ga di-klik 2x

  // Defensive programming untuk URL Payment
  const paymentLink = billData?.id ? `${window.location.origin}/payment?bill_id=${billData.id}` : '';

  const handleShare = async () => {
    // ... (Kodingan Share bawaan lo tetap aman nggak ada yang diubah)
    if (!receiptRef.current) return;
    try {
      const blob = await toBlob(receiptRef.current, {
        style: { padding: '30px', width: '100%', height: 'auto' },
        backgroundColor: '#ffffff',
        scale: 2,
        cacheBust: true,
      });
      if (!blob) return;

      const file = new File([blob], 'split-bill-receipt.png', { type: 'image/png' });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Tagihan Split Bill',
          text: 'Ini rincian patungan kita ya!',
          files: [file]
        });
      } else {
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

  // Helper perhitungan proporsional (Bawaan lo)
  const getParticipantTotalBayar = (p) => {
    const pSubtotal = p.items?.reduce((sum, item) => sum + (Number(item.price) || 0), 0) || 0;
    const globalSubtotal = Number(billData.subtotal) || 0;
    const porsi = globalSubtotal > 0 ? (pSubtotal / globalSubtotal) : 0;

    const globalDiscountVal = Number(billData.discount) || 0;
    let globalDiscount = billData.discountType === 'percent'
      ? globalSubtotal * (globalDiscountVal / 100)
      : globalDiscountVal;

    const globalDelivery = Number(billData.deliveryFee) || 0;
    const globalService = Number(billData.serviceFee) || 0;
    const globalPackaging = Number(billData.packagingFee) || 0;
    const globalTaxPercent = Number(billData.taxPercentage) || 0;
    const globalTax = (globalSubtotal - globalDiscount) * (globalTaxPercent / 100);

    const diskonOrang = globalDiscount * porsi;
    const ongkirOrang = globalDelivery * porsi;
    const serviceOrang = globalService * porsi;
    const packagingOrang = globalPackaging * porsi;
    const pajakOrang = globalTax * porsi;

    return pSubtotal - diskonOrang + ongkirOrang + serviceOrang + packagingOrang + pajakOrang;
  };

  // --- FUNGSI BARU: Nembak Data ke Laravel ---
  const handleSaveToDatabase = async () => {
    setIsSaving(true);

    try {
      // 1. Hitung ulang Pajak & Diskon Nominal untuk Backend
      const subtotal = Number(billData.subtotal) || 0;
      const discountVal = Number(billData.discount) || 0;
      const nominalDiscount = billData.discountType === 'percent'
        ? subtotal * (discountVal / 100)
        : discountVal;
      const taxPercent = Number(billData.taxPercentage) || 0;
      const nominalTax = (subtotal - nominalDiscount) * (taxPercent / 100);

      // 2. Format Array Partisipan sesuai database
      const formattedParticipants = participants.map((p, i) => {
        let amountDue = 0;
        if (splitMethod === 'rata') {
          amountDue = (Number(billData.grandTotal) || 0) / participants.length;
        } else {
          amountDue = getParticipantTotalBayar(p);
        }
        return {
          name: p.name || `Orang ${i + 1}`,
          amount_due: Math.round(amountDue) // Dibulatkan agar angka pas
        };
      });

      // 3. Bungkus Payload
      const payload = {
        subtotal: subtotal,
        discount: Math.round(nominalDiscount),
        delivery_fee: Number(billData.deliveryFee) || 0,
        service_fee: Number(billData.serviceFee) || 0,
        packaging_fee: Number(billData.packagingFee) || 0,
        tax_amount: Math.round(nominalTax),
        grand_total: Math.round(Number(billData.grandTotal) || 0),
        split_method: splitMethod,
        participants: formattedParticipants
      };

      // 4. Tembak ke API Backend
      const response = await api.post('/bills', payload);
      alert('✅ ' + response.data.message); // Notif sukses

      // 5. Bersihkan SessionStorage biar ga nyangkut
      sessionStorage.clear();

      // 6. Arahkan ke halaman riwayat
      navigate('/history');

    } catch (error) {
      // Tangkap Error Validasi 422
      if (error.response && error.response.status === 422) {
        const errorMessages = Object.values(error.response.data.errors).flat().join('\n');
        alert("Gagal menyimpan! Perbaiki data:\n" + errorMessages);
      } else {
        console.error("Terjadi kesalahan:", error);
        alert("Terjadi kesalahan pada server backend!");
      }
    } finally {
      setIsSaving(false);
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

        {/* === RINCIAN TAGIHAN (TIDAK ADA YANG DIUBAH) === */}
        <div className="bg-slate-50 rounded-2xl p-6 text-left border border-slate-100 mb-6">
          <h3 className="font-bold text-slate-800 mb-4">Total Tagihan</h3>
          <div className="flex justify-between text-sm text-slate-500 mb-4">
            <span>Subtotal Makanan</span>
            <span>Rp {new Intl.NumberFormat('id-ID').format(Number(billData.subtotal) || 0)}</span>
          </div>
          <div className="border-t border-slate-200 pt-4 flex justify-between items-center font-bold">
            <span className="text-slate-800">Grand Total</span>
            <span className="text-xl text-blue-500">Rp {new Intl.NumberFormat('id-ID').format(Number(billData.grandTotal) || 0)}</span>
          </div>
        </div>

        {/* === RINCIAN PARTISIPAN (TIDAK ADA YANG DIUBAH) === */}
        <div className="text-left mb-8">
          <div className="flex items-baseline gap-2 mb-4">
            <h3 className="font-bold text-slate-800">Rincian Per Orang</h3>
            {splitMethod === 'custom' && <span className="text-xs text-slate-500">(Pembagian Berdasarkan Porsi)</span>}
          </div>
          <div className="space-y-4">
            {participants.map((p, i) => {
              if (splitMethod === 'rata') {
                const perPerson = (Number(billData.grandTotal) || 0) / participants.length;
                return (
                  <div key={p.id || i} className="border border-slate-100 rounded-2xl p-6 shadow-sm">
                    {/* QR Code Murni */}
                    {i === 0 && (
                      <div className="mb-6 flex flex-col md:flex-row items-center gap-4 bg-purple-50/50 p-4 rounded-xl border border-purple-100">
                        <div className="bg-white p-3 rounded-xl shadow-sm shrink-0">
                          {billData?.id ? (
                            <QRCode value={paymentLink} size={80} />
                          ) : (
                            <div className="w-[80px] h-[80px] bg-slate-100 flex items-center justify-center text-[10px] text-slate-400 text-center rounded-lg border border-slate-200">
                              Memuat QR...
                            </div>
                          )}
                        </div>
                        <div className="text-left text-sm text-slate-600 leading-relaxed">
                          Pindai QR ini untuk membayar ke <span className="font-bold text-slate-800">{participants[0]?.name || 'Penalang'}</span>.
                          <br />
                          <span className="text-xs text-slate-500">Bisa transfer manual via GoPay, DANA, OVO, atau ShopeePay.</span>
                        </div>
                      </div>
                    )}
                    <div className="flex justify-between font-bold mb-4">
                      <span className="text-slate-800">{p.name || `Orang ${i + 1}`}</span>
                      <span className="text-blue-500">Rp {new Intl.NumberFormat('id-ID').format(perPerson || 0)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-500 mb-4">
                      <span>Bagian (Semua Termasuk)</span>
                      <span>Rp {new Intl.NumberFormat('id-ID').format(perPerson || 0)}</span>
                    </div>
                    <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-600">Total Bayar</span>
                      <span className="text-pink-500">Rp {new Intl.NumberFormat('id-ID').format(perPerson || 0)}</span>
                    </div>
                  </div>
                );
              } else {
                const pSubtotal = p.items?.reduce((sum, item) => sum + (Number(item.price) || 0), 0) || 0;
                const globalSubtotal = Number(billData.subtotal) || 0;
                const porsi = globalSubtotal > 0 ? ((pSubtotal / globalSubtotal) * 100).toFixed(1) : 0;
                const totalBayar = getParticipantTotalBayar(p);

                return (
                  <div key={p.id || i} className="border border-slate-100 rounded-2xl p-6 shadow-sm">
                    {/* QR Code Custom */}
                    {i === 0 && (
                      <div className="mb-6 flex flex-col md:flex-row items-center gap-4 bg-purple-50/50 p-4 rounded-xl border border-purple-100">
                        <div className="bg-white p-3 rounded-xl shadow-sm shrink-0">
                          {billData?.id ? (
                            <QRCode value={paymentLink} size={80} />
                          ) : (
                            <div className="w-[80px] h-[80px] bg-slate-100 flex items-center justify-center text-[10px] text-slate-400 text-center rounded-lg border border-slate-200">
                              Memuat QR...
                            </div>
                          )}
                        </div>
                        <div className="text-left text-sm text-slate-600 leading-relaxed">
                          Pindai QR ini untuk membayar ke <span className="font-bold text-slate-800">{participants[0]?.name || 'Penalang'}</span>.
                          <br />
                          <span className="text-xs text-slate-500">Bisa transfer manual via GoPay, DANA, OVO, atau ShopeePay.</span>
                        </div>
                      </div>
                    )}
                    <div className="flex justify-between font-bold mb-1">
                      <span className="text-slate-800">{p.name || `Orang ${i + 1}`}</span>
                      <span className="text-blue-500">Rp {new Intl.NumberFormat('id-ID').format(totalBayar || 0)}</span>
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
                      <span>Rp {new Intl.NumberFormat('id-ID').format(pSubtotal || 0)}</span>
                    </div>
                    <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-800">Total Bayar</span>
                      <span className="text-pink-500">Rp {new Intl.NumberFormat('id-ID').format(totalBayar || 0)}</span>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>

      {/* === TOMBOL AKSI === */}
      <div className="mt-8">
        <div className="grid grid-cols-2 gap-3 mb-5">
          <button
            onClick={handleShare}
            className="w-full bg-white border border-blue-200 text-blue-500 font-semibold py-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <Share2 className="w-4 h-4" /> Share
          </button>

          {/* TOMBOL SIMPAN DIUBAH MENGGUNAKAN handleSaveToDatabase */}
          <button
            onClick={handleSaveToDatabase}
            disabled={isSaving}
            className="w-full bg-white border border-green-200 text-green-500 font-semibold py-3 rounded-xl hover:bg-green-50 transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> {isSaving ? 'Menyimpan...' : 'Simpan'}
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