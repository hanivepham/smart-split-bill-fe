import React, { useState } from 'react';
import { QrCode, CreditCard, UploadCloud, Image as ImageIcon } from 'lucide-react';

const PaymentMethodInput = ({ onNext, onPrev, paymentData, setPaymentData }) => {
    // State untuk ngatur tab aktif (qr atau rekening)
    const [activeTab, setActiveTab] = useState(paymentData?.type || 'rekening');
    const [qrFileName, setQrFileName] = useState(paymentData?.qrFile?.name || '');

    // Handler untuk file upload
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setQrFileName(file.name);
            setPaymentData({ ...paymentData, qrFile: file, type: 'qr' });
        }
    };

    // Handler untuk input text rekening
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentData({ ...paymentData, [name]: value, type: 'rekening' });
    };

    // Logic Validasi
    const isBankSelected = Boolean(paymentData?.bankName);
    const isRekeningValid = Boolean(paymentData?.bankName && paymentData?.accountNumber && paymentData?.accountName);
    const isQrValid = Boolean(paymentData?.qrFile);
    const isValid = activeTab === 'rekening' ? isRekeningValid : isQrValid;

    return (
        <div className="max-w-md mx-auto bg-white p-6 sm:p-8 border border-slate-100 shadow-sm rounded-3xl">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Metode Pembayaran</h2>
                <p className="text-sm text-slate-500">
                    Kasih tau temen lo kemana mereka harus transfer duit patungannya.
                </p>
            </div>

            {/* Tabs Selector */}
            <div className="flex p-1 mb-6 bg-slate-100 rounded-xl">
                <button
                    onClick={() => {
                        setActiveTab('rekening');
                        setPaymentData({ ...paymentData, type: 'rekening' });
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all ${activeTab === 'rekening' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                        }`}
                >
                    <CreditCard size={18} />
                    Rekening / E-Wallet
                </button>
                <button
                    onClick={() => {
                        setActiveTab('qr');
                        setPaymentData({ ...paymentData, type: 'qr' });
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all ${activeTab === 'qr' ? 'bg-white text-pink-500 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                        }`}
                >
                    <QrCode size={18} />
                    Upload QRIS
                </button>
            </div>

            {/* Tab Content: Rekening / E-Wallet */}
            {activeTab === 'rekening' && (
                <div className="space-y-4 animate-fadeIn">
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                            Pilih Bank / E-Wallet
                        </label>
                        <select
                            name="bankName"
                            value={paymentData?.bankName || ''}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 outline-none transition-all"
                        >
                            <option value="">Pilih metode...</option>
                            <option value="BCA">BCA</option>
                            <option value="Mandiri">Mandiri</option>
                            <option value="BNI">BNI</option>
                            <option value="GoPay">GoPay</option>
                            <option value="DANA">DANA</option>
                            <option value="OVO">OVO</option>
                            <option value="ShopeePay">ShopeePay</option>
                        </select>
                    </div>
                    <div>
                        <label className={`block text-xs font-semibold mb-1.5 uppercase tracking-wider transition-colors ${!isBankSelected ? 'text-slate-400' : 'text-slate-600'}`}>
                            Nomor Rekening / HP
                        </label>
                        <input
                            type="text"
                            name="accountNumber"
                            value={paymentData?.accountNumber || ''}
                            onChange={(e) => {
                                const numericValue = e.target.value.replace(/\D/g, '');
                                setPaymentData({ ...paymentData, accountNumber: numericValue, type: 'rekening' });
                            }}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            placeholder="Contoh: 081234567890"
                            disabled={!isBankSelected}
                            className={`w-full border text-sm rounded-xl block p-3 outline-none transition-all ${!isBankSelected ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed' : 'bg-slate-50 border-slate-200 text-slate-800 focus:ring-blue-500 focus:border-blue-500'}`}
                        />
                    </div>
                    <div>
                        <label className={`block text-xs font-semibold mb-1.5 uppercase tracking-wider transition-colors ${!isBankSelected ? 'text-slate-400' : 'text-slate-600'}`}>
                            Atas Nama
                        </label>
                        <input
                            type="text"
                            name="accountName"
                            value={paymentData?.accountName || ''}
                            onChange={handleInputChange}
                            placeholder="Sesuai nama di rekening"
                            disabled={!isBankSelected}
                            className={`w-full border text-sm rounded-xl block p-3 outline-none transition-all ${!isBankSelected ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed' : 'bg-slate-50 border-slate-200 text-slate-800 focus:ring-blue-500 focus:border-blue-500'}`}
                        />
                    </div>
                </div>
            )}

            {/* Tab Content: Upload QR */}
            {activeTab === 'qr' && (
                <div className="animate-fadeIn">
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                        Upload Gambar QRIS
                    </label>
                    <div className="mt-2 flex justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-10 hover:bg-slate-100 transition-colors relative cursor-pointer">
                        <div className="text-center">
                            {qrFileName ? (
                                <ImageIcon className="mx-auto h-12 w-12 text-pink-400" />
                            ) : (
                                <UploadCloud className="mx-auto h-12 w-12 text-slate-400" />
                            )}
                            <div className="mt-4 flex text-sm leading-6 text-slate-600 justify-center">
                                <span className="relative cursor-pointer rounded-md font-semibold text-blue-600 hover:text-blue-500">
                                    {qrFileName ? qrFileName : 'Pilih file gambar'}
                                </span>
                            </div>
                            <p className="text-xs leading-5 text-slate-500 mt-1">PNG, JPG, JPEG up to 5MB</p>
                        </div>
                        {/* Input file memenuhi seluruh area box agar mudah di-klik */}
                        <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            accept="image/*"
                            onChange={handleFileUpload}
                        />
                    </div>
                </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8">
                <button
                    onClick={onNext}
                    disabled={!isValid}
                    className="w-full font-bold py-4 bg-gradient-to-r from-pink-400 to-blue-400 text-white rounded-xl shadow-md transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Lanjut Ringkasan
                </button>
            </div>
        </div>
    );
};

export default PaymentMethodInput;