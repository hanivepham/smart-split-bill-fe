import React, { useRef, useState } from 'react'; // Tambah useState
import { toBlob } from 'html-to-image';
import { CheckCircle, Share2, Save, RotateCcw, Home, Wallet, QrCode } from 'lucide-react';
import api from '../../api'; // Import kurir Axios kita

function Step5({
  billData,
  participants,
  splitMethod,
  paymentData,
  onSave,
  handleReset,
  navigate,
  onPrev,
  isViewingHistory
}) {
  const receiptRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false); // State buat nahan tombol biar ga di-klik 2x

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

      // 3. Bungkus Payload ke FormData
      const formData = new FormData();
      formData.append('subtotal', subtotal);
      formData.append('discount', Math.round(nominalDiscount));
      formData.append('delivery_fee', Number(billData.deliveryFee) || 0);
      formData.append('service_fee', Number(billData.serviceFee) || 0);
      formData.append('packaging_fee', Number(billData.packagingFee) || 0);
      formData.append('tax_amount', Math.round(nominalTax));
      formData.append('grand_total', Math.round(Number(billData.grandTotal) || 0));
      formData.append('split_method', splitMethod);
      
      // Karena FormData tidak bisa menerima array/object bersarang secara langsung, kita stringify participants
      formData.append('participants', JSON.stringify(formattedParticipants));

      // Append data pembayaran
      if (paymentData) {
        formData.append('payment_type', paymentData.type);
        if (paymentData.type === 'rekening') {
          formData.append('bank_name', paymentData.bankName || '');
          formData.append('account_number', paymentData.accountNumber || '');
          formData.append('account_name', paymentData.accountName || '');
        } else if (paymentData.type === 'qr' && paymentData.qrFile) {
          formData.append('qr_image', paymentData.qrFile);
        }
      }

      // 4. Tembak ke API Backend
      const response = await api.post('/bills', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
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

        {/* === INFO PEMBAYARAN === */}
        <div className="mb-8">
          <h3 className="font-bold text-slate-800 mb-4 text-left">Metode Pembayaran</h3>
          {paymentData?.type === 'qr' && (paymentData?.qrFile || paymentData?.qrImageUrl) ? (
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
              <img 
                src={isViewingHistory && paymentData.qrImageUrl ? paymentData.qrImageUrl : paymentData.qrFile ? URL.createObjectURL(paymentData.qrFile) : ''} 
                alt="QRIS Pembayaran" 
                className="w-48 h-48 object-cover rounded-xl shadow-md mb-4 border border-slate-100" 
              />
              <p className="text-sm text-slate-600 font-medium text-center">
                Pindai QRIS di atas untuk membayar ke <span className="font-bold text-slate-800">{participants[0]?.name || 'Penalang'}</span>.
              </p>
            </div>
          ) : paymentData?.type === 'rekening' ? (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-500">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider">Bank / E-Wallet</p>
                  <p className="font-bold text-slate-800">{paymentData.bankName || '-'}</p>
                </div>
              </div>
              
              <div className="bg-white/60 p-4 rounded-xl border border-white">
                <p className="text-xs text-slate-500 mb-1">Nomor Rekening / HP</p>
                <p className="font-mono text-lg font-bold text-slate-800 mb-3 tracking-wide">{paymentData.accountNumber || '-'}</p>
                
                <p className="text-xs text-slate-500 mb-1">Atas Nama</p>
                <p className="font-semibold text-slate-700">{paymentData.accountName || '-'}</p>
              </div>
            </div>
          ) : null}
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

          {!isViewingHistory ? (
            <>
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
            </>
          ) : (
            <button
              onClick={onPrev}
              className="w-full bg-slate-50 border border-slate-200 text-slate-600 font-semibold py-3 rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
            >
              <RotateCcw className="w-4 h-4" /> Kembali ke Riwayat
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Step5;