import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calculator, 
  Receipt, 
  Users, 
  Tag, 
  Truck, 
  CircleDollarSign, 
  Package, 
  Percent,
  Check,
  User,
  X,
  Split as SplitIcon,
  PenLine,
  CheckCircle2,
  Info,
  AlertTriangle,
  Plus
} from 'lucide-react';

function Split() {
  const [totalTagihan, setTotalTagihan] = useState('');
  const [jumlahOrang, setJumlahOrang] = useState(2);
  const [participants, setParticipants] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [splitMethod, setSplitMethod] = useState('rata');

  const handleLanjutStep1 = () => {
    if (totalTagihan > 0 && jumlahOrang > 0) {
      // Buat array baru sesuai jumlah orang jika belum ada
      if (participants.length !== Number(jumlahOrang)) {
        const newParticipants = Array.from({ length: Number(jumlahOrang) }, (_, i) => ({
          id: i + 1,
          name: '',
          items: [{ menu: '', price: '' }]
        }));
        setParticipants(newParticipants);
      }
      setCurrentStep(2);
    }
  };

  const removeParticipant = (indexToRemove) => {
    const currentCount = Math.max(2, Number(jumlahOrang) || 2);
    if (currentCount <= 2) return; // minimal 2 orang tidak bisa dihapus lagi

    setJumlahOrang(currentCount - 1);
    const newParticipants = participants.filter((_, index) => index !== indexToRemove);
    setParticipants(newParticipants);
  };

  // Handler untuk form menu
  const handleAddItem = (pIndex) => {
    const newParticipants = [...participants];
    if (!newParticipants[pIndex].items) newParticipants[pIndex].items = [{ menu: '', price: '' }];
    newParticipants[pIndex].items.push({ menu: '', price: '' });
    setParticipants(newParticipants);
  };

  const handleRemoveItem = (pIndex, itemIndex) => {
    const newParticipants = [...participants];
    newParticipants[pIndex].items.splice(itemIndex, 1);
    setParticipants(newParticipants);
  };

  const handleItemChange = (pIndex, itemIndex, field, value) => {
    const newParticipants = [...participants];
    if (!newParticipants[pIndex].items) newParticipants[pIndex].items = [{ menu: '', price: '' }];
    newParticipants[pIndex].items[itemIndex][field] = value;
    setParticipants(newParticipants);
  };

  // Kalkulasi Custom Split
  const getParticipantSubtotal = (p) => {
    return p.items?.reduce((sum, item) => sum + (Number(item.price) || 0), 0) || 0;
  };

  const totalCustomSubtotal = participants.reduce((sum, p) => sum + getParticipantSubtotal(p), 0);
  const isSubtotalMatch = totalCustomSubtotal === Number(totalTagihan);

  // Validasi: Semua item harus ada nama menu dan harga, dan subtotal harus match
  const isCustomValid = isSubtotalMatch && participants.every(p => 
    p.items && p.items.length > 0 && p.items.every(item => item.menu.trim() !== '' && Number(item.price) > 0)
  );

  const filledCount = participants.filter(p => p.name.trim() !== '').length;
  const isAllFilled = filledCount > 0 && filledCount === Number(jumlahOrang);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12">
      {/* HEADER */}
      <header className="flex items-center gap-4 px-8 py-6 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
        {currentStep === 1 ? (
          <Link to="/dashboard" className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowLeft className="text-slate-600 w-5 h-5" />
          </Link>
        ) : (
          <button onClick={() => setCurrentStep(currentStep - 1)} className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowLeft className="text-slate-600 w-5 h-5" />
          </button>
        )}
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-pink-400 to-blue-400 p-1.5 rounded-lg">
            <Calculator className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
            Smart Bill Splitter
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 mt-8">
        
        {/* STEPPER INDICATOR */}
        <div className="flex items-center justify-center mb-10">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((step, index) => (
              <React.Fragment key={step}>
                <div className={`flex flex-col items-center ${currentStep < step ? 'opacity-50' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md transition-all duration-300 ${
                    currentStep > step 
                      ? 'bg-gradient-to-r from-pink-400 to-blue-400 text-white' 
                      : currentStep === step 
                        ? 'bg-gradient-to-r from-purple-300 to-blue-300 text-white'
                        : 'bg-white border-2 border-slate-200 text-slate-400'
                  }`}>
                    {currentStep > step ? <Check className="w-6 h-6" /> : step}
                  </div>
                  <span className={`text-xs mt-2 transition-colors duration-300 ${
                    currentStep > step ? 'text-pink-500 font-bold' : currentStep === step ? 'text-purple-500 font-bold' : 'text-slate-400 font-medium'
                  }`}>
                    Step {step}
                  </span>
                </div>
                {index < 4 && (
                  <div className={`w-12 h-[2px] mb-6 mx-2 transition-colors duration-300 ${
                    currentStep > step ? 'bg-gradient-to-r from-pink-400 to-blue-300' : 'bg-slate-200'
                  }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* STEP 1: INPUT TAGIHAN */}
        {currentStep === 1 && (
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100">
            <div className="mb-8">
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 mb-2">
                Input Tagihan
              </h1>
              <p className="text-slate-500">Masukkan detail tagihan Anda</p>
            </div>

            <form className="space-y-6">
              {/* Total Tagihan */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                  <Receipt className="w-4 h-4 text-pink-500" />
                  Total Tagihan / Subtotal Makanan (Rp)
                </label>
                <input 
                  type="number" 
                  placeholder="Contoh: 500000" 
                  value={totalTagihan}
                  onChange={(e) => setTotalTagihan(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
                />
              </div>

              {/* Jumlah Orang */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  Jumlah Orang
                </label>
                <input 
                  type="number" 
                  min="2"
                  placeholder="2" 
                  value={jumlahOrang}
                  onChange={(e) => setJumlahOrang(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                />
              </div>

              {/* DIVIDER: Penyesuaian Tagihan */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="flex items-center gap-2 font-bold text-slate-700 mb-4">
                  <Tag className="w-5 h-5 text-pink-500" />
                  Penyesuaian Tagihan (Opsional)
                </h3>
              </div>

              {/* Diskon */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                  <Tag className="w-4 h-4 text-green-500" />
                  Diskon
                </label>
                <div className="flex gap-3">
                  <input 
                    type="number" 
                    placeholder="Contoh: 50000 atau 10" 
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
                  />
                  <select className="bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-300 font-medium text-slate-700 outline-none cursor-pointer">
                    <option value="rp">Rp</option>
                    <option value="percent">%</option>
                  </select>
                </div>
              </div>

              {/* Ongkos Kirim */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                  <Truck className="w-4 h-4 text-blue-400" />
                  Ongkos Kirim / Delivery Fee (Rp)
                </label>
                <input 
                  type="number" 
                  placeholder="Contoh: 15000" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                />
              </div>

              {/* Biaya Layanan */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                  <CircleDollarSign className="w-4 h-4 text-purple-500" />
                  Biaya Layanan / Service Fee (Rp)
                </label>
                <input 
                  type="number" 
                  placeholder="Contoh: 5000" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
                />
              </div>

              {/* Biaya Kemasan */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                  <Package className="w-4 h-4 text-orange-400" />
                  Biaya Kemasan / Packaging Fee (Rp)
                </label>
                <input 
                  type="number" 
                  placeholder="Contoh: 2000" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
                />
              </div>

              {/* Pajak (PPN) */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                  <Percent className="w-4 h-4 text-fuchsia-500" />
                  Pajak (PPN %) - Opsional
                </label>
                <input 
                  type="number" 
                  placeholder="Contoh: 10" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-300 transition"
                />
                <p className="text-xs text-slate-400 mt-2 ml-1">Pajak akan dihitung setelah semua penyesuaian</p>
              </div>

              {/* Preview Perhitungan (Hanya muncul jika totalTagihan diisi) */}
              {totalTagihan > 0 && (
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mt-8 mb-6">
                  <h4 className="font-bold text-slate-700 mb-4">Preview Perhitungan</h4>
                  <div className="flex justify-between text-sm text-slate-600 mb-3">
                    <span>Subtotal Makanan</span>
                    <span>Rp {new Intl.NumberFormat('id-ID').format(totalTagihan)}</span>
                  </div>
                  <div className="border-t border-pink-100 my-3"></div>
                  <div className="flex justify-between font-bold text-pink-500 text-lg">
                    <span>Grand Total</span>
                    <span className="text-blue-500">Rp {new Intl.NumberFormat('id-ID').format(totalTagihan)}</span>
                  </div>
                </div>
              )}

              {/* Tombol Lanjut (Aktif bersinar jika totalTagihan > 0 dan jumlahOrang > 1, redup jika tidak) */}
              <div className={totalTagihan > 0 && jumlahOrang > 1 ? "pt-2" : "pt-8"}>
                {totalTagihan > 0 && jumlahOrang > 1 ? (
                  <button 
                    type="button"
                    onClick={handleLanjutStep1}
                    className="w-full block text-center bg-gradient-to-r from-pink-400 to-blue-400 text-white font-bold py-4 rounded-xl hover:opacity-90 transition shadow-md"
                  >
                    Lanjut
                  </button>
                ) : (
                  <button 
                    type="button"
                    disabled
                    className="w-full bg-gradient-to-r from-pink-300 to-blue-300 opacity-60 text-white font-bold py-4 rounded-xl cursor-not-allowed transition"
                  >
                    Lanjut
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: INPUT PESERTA */}
        {currentStep === 2 && (
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-pink-500 mb-2">
                Input Peserta
              </h1>
              <p className="text-slate-500">Masukkan nama {Math.max(2, Number(jumlahOrang) || 2)} orang yang akan membagi tagihan</p>
            </div>

            <div className="space-y-6">
              {participants.map((p, index) => (
                <div key={p.id} className="flex items-center gap-4">
                  {/* Ikon Avatar - Soft gradient jika kosong, Bright gradient jika terisi */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                    p.name.trim() !== '' 
                      ? 'bg-gradient-to-br from-pink-400 to-blue-400 shadow-md' 
                      : 'bg-gradient-to-br from-purple-200 to-blue-200'
                  }`}>
                    <User className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-grow">
                    <label className="text-xs font-bold text-slate-500 block mb-1">Orang {index + 1}</label>
                    <input 
                      type="text" 
                      placeholder={`Nama orang ${index + 1}`} 
                      value={p.name}
                      onChange={(e) => {
                        const newParticipants = [...participants];
                        newParticipants[index].name = e.target.value;
                        setParticipants(newParticipants);
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
                    />
                  </div>
                  {Number(jumlahOrang) > 2 ? (
                    <button 
                      type="button"
                      onClick={() => removeParticipant(index)}
                      className="text-red-400 hover:text-red-600 transition p-2 mt-4"
                      title="Hapus peserta ini"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  ) : (
                    <div className="w-9 mt-4"></div> /* Placeholder to keep alignment */
                  )}
                </div>
              ))}

              {/* Summary Box */}
              <div className="bg-slate-50 rounded-xl p-4 text-center mt-8 border border-slate-100">
                <p className="text-sm font-medium text-slate-600">
                  Total: {filledCount} dari {jumlahOrang} orang sudah diisi
                </p>
              </div>

              {/* Tombol Lanjut */}
              <div className="pt-4">
                <button 
                  type="button"
                  disabled={!isAllFilled}
                  onClick={() => setCurrentStep(3)}
                  className={`w-full font-bold py-4 rounded-xl transition shadow-md ${
                    isAllFilled 
                      ? 'bg-gradient-to-r from-pink-400 to-blue-400 text-white hover:opacity-90' 
                      : 'bg-gradient-to-r from-pink-300 to-blue-300 opacity-60 text-white cursor-not-allowed'
                  }`}
                >
                  Lanjut ke Pembagian
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: PILIH METODE */}
        {currentStep === 3 && (
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-pink-500 mb-2">
                Pilih Metode Pembagian
              </h1>
              <p className="text-slate-500">Bagaimana Anda ingin membagi tagihan?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-center">
              {/* Card: Split Sama Rata */}
              <div 
                onClick={() => setSplitMethod('rata')}
                className={`relative p-8 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
                  splitMethod === 'rata' 
                    ? 'border-pink-300 bg-gradient-to-br from-pink-50 to-blue-50 shadow-md' 
                    : 'border-slate-100 hover:border-pink-200 bg-white'
                }`}
              >
                {splitMethod === 'rata' && (
                  <CheckCircle2 className="absolute top-4 right-4 w-6 h-6 text-purple-400 fill-purple-100" />
                )}
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-pink-300 to-blue-300 flex items-center justify-center mb-6 shadow-inner">
                  <SplitIcon className="text-white w-8 h-8" />
                </div>
                <h3 className="font-bold text-xl text-slate-800 mb-2">Split Sama Rata</h3>
                <p className="text-sm text-slate-500">Bagi tagihan secara merata untuk semua orang</p>
              </div>

              {/* Card: Custom Split */}
              <div 
                onClick={() => setSplitMethod('custom')}
                className={`relative p-8 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
                  splitMethod === 'custom' 
                    ? 'border-pink-300 bg-gradient-to-br from-pink-50 to-blue-50 shadow-md' 
                    : 'border-slate-100 hover:border-pink-200 bg-white'
                }`}
              >
                {splitMethod === 'custom' && (
                  <CheckCircle2 className="absolute top-4 right-4 w-6 h-6 text-purple-400 fill-purple-100" />
                )}
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-300 to-pink-300 flex items-center justify-center mb-6 shadow-inner">
                  <PenLine className="text-white w-8 h-8" />
                </div>
                <h3 className="font-bold text-xl text-slate-800 mb-2">Custom Split</h3>
                <p className="text-sm text-slate-500">Atur pembagian sesuai kebutuhan masing-masing orang</p>
              </div>
            </div>

            {/* Tombol Lanjut */}
            <div>
              <button 
                onClick={() => setCurrentStep(4)}
                className="w-full bg-gradient-to-r from-pink-400 to-blue-400 text-white font-bold py-4 rounded-xl hover:opacity-90 transition shadow-md"
              >
                Lanjut
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: PREVIEW SPLIT SAMA RATA */}
        {currentStep === 4 && splitMethod === 'rata' && (
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-pink-500 mb-2">
                Preview Split Sama Rata
              </h1>
              <p className="text-slate-500">Setiap orang akan membayar jumlah yang sama</p>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3 mb-8">
              <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-sm text-blue-700">
                <span className="font-bold">Pembagian Otomatis: </span> 
                Semua biaya (diskon, ongkir, service, packaging) dibagi rata untuk semua orang
              </p>
            </div>

            {/* List Peserta */}
            <div className="space-y-4 mb-8">
              {participants.map((p, index) => {
                // Hitung pembagian rata
                const perPerson = Number(totalTagihan) / participants.length;
                
                return (
                  <div key={p.id} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h3 className="font-bold text-slate-800 mb-4">{p.name || `Orang ${index + 1}`}</h3>
                    <div className="flex justify-between text-sm text-slate-500 mb-4">
                      <span>Subtotal Makanan</span>
                      <span>Rp {new Intl.NumberFormat('id-ID').format(perPerson)}</span>
                    </div>
                    <div className="border-t border-slate-200 pt-4 flex justify-between items-center font-bold">
                      <span className="text-slate-800">Total Bayar</span>
                      <span className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
                        Rp {new Intl.NumberFormat('id-ID').format(perPerson)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary Box */}
            <div className="border-2 border-pink-100 rounded-2xl p-6 mb-8">
              <h3 className="font-bold text-slate-800 mb-4">Summary</h3>
              <div className="flex justify-between text-sm text-slate-500 mb-2">
                <span>Grand Total</span>
                <span>Rp {new Intl.NumberFormat('id-ID').format(Number(totalTagihan))}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-500 mb-4">
                <span>Jumlah Orang</span>
                <span>{participants.length}</span>
              </div>
              <div className="border-t border-slate-200 pt-4 flex justify-between items-center font-bold">
                <span className="text-slate-800">Per Person</span>
                <span className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
                  Rp {new Intl.NumberFormat('id-ID').format(Number(totalTagihan) / participants.length)}
                </span>
              </div>
            </div>

            {/* Tombol Lanjut ke Ringkasan */}
            <div>
              <button 
                onClick={() => setCurrentStep(5)}
                className="w-full bg-gradient-to-r from-pink-400 to-blue-400 text-white font-bold py-4 rounded-xl hover:opacity-90 transition shadow-md"
              >
                Lanjut ke Ringkasan
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: PREVIEW CUSTOM SPLIT */}
        {currentStep === 4 && splitMethod === 'custom' && (
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-pink-500 mb-2">Custom Split</h1>
              <p className="text-slate-500">Masukkan detail pembelian untuk setiap orang (harga makanan saja)</p>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3 mb-8">
              <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-sm text-blue-700">
                <span className="font-bold">Pembagian Otomatis Berdasarkan Porsi: </span> 
                Diskon, ongkir, service, dan packaging akan dibagi proporsional sesuai porsi makanan masing-masing orang
              </p>
            </div>

            {/* List Peserta & Form Menu */}
            <div className="space-y-6 mb-8">
              {participants.map((p, pIndex) => {
                const pSubtotal = getParticipantSubtotal(p);
                const porsi = totalCustomSubtotal > 0 ? ((pSubtotal / totalCustomSubtotal) * 100).toFixed(1) : 0;
                const items = p.items || [{ menu: '', price: '' }];

                return (
                  <div key={p.id} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h3 className="font-bold text-slate-800 mb-4">{p.name || `Orang ${pIndex + 1}`}</h3>
                    
                    {/* Form Items */}
                    <div className="space-y-3 mb-4">
                      {items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex gap-3 items-center">
                          <input 
                            type="text" 
                            placeholder="Nama menu" 
                            value={item.menu}
                            onChange={(e) => handleItemChange(pIndex, itemIndex, 'menu', e.target.value)}
                            className="flex-grow bg-white border border-pink-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300 transition text-sm"
                          />
                          <div className="flex items-center bg-white border border-blue-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-300 transition">
                            <span className="px-3 text-slate-400 text-sm border-r border-blue-100">Rp</span>
                            <input 
                              type="number" 
                              placeholder="Harga" 
                              value={item.price}
                              onChange={(e) => handleItemChange(pIndex, itemIndex, 'price', e.target.value)}
                              className="w-24 px-3 py-2 focus:outline-none text-sm"
                            />
                          </div>
                          {items.length > 1 && (
                            <button onClick={() => handleRemoveItem(pIndex, itemIndex)} className="text-red-400 hover:text-red-600 p-1 transition">
                              <X className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={() => handleAddItem(pIndex)}
                      className="w-full py-2 mb-6 border-2 border-dashed border-pink-200 text-pink-400 rounded-xl font-medium text-sm hover:bg-pink-50 hover:border-pink-300 transition flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Tambah Item
                    </button>

                    {/* Kalkulasi Per Orang */}
                    <div className="text-xs text-slate-400 mb-2">Porsi: {porsi}%</div>
                    <div className="flex justify-between text-sm text-slate-500 mb-2">
                      <span>Subtotal Makanan</span>
                      <span>Rp {new Intl.NumberFormat('id-ID').format(pSubtotal)}</span>
                    </div>
                    <div className="border-t border-slate-200 pt-3 flex justify-between items-center font-bold">
                      <span className="text-slate-800 text-sm">Total Bayar</span>
                      <span className="text-pink-500">Rp {new Intl.NumberFormat('id-ID').format(pSubtotal)}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Overall Summary */}
            <div className="border-2 border-pink-100 rounded-2xl p-6 mb-8">
              <h3 className="font-bold text-slate-800 mb-4">Overall Summary</h3>
              <div className="flex justify-between text-sm text-slate-500 mb-4">
                <span>Total Subtotal Makanan</span>
                <span>Rp {new Intl.NumberFormat('id-ID').format(totalCustomSubtotal)}</span>
              </div>
              <div className="border-t border-slate-200 pt-4 flex justify-between items-center font-bold mb-4">
                <span className="text-slate-800">Grand Total</span>
                <span className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
                  Rp {new Intl.NumberFormat('id-ID').format(totalCustomSubtotal)}
                </span>
              </div>

              {/* Warning Box jika tidak match */}
              {!isSubtotalMatch && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-yellow-700">
                    Total subtotal makanan tidak sesuai dengan tagihan awal. Expected: Rp {new Intl.NumberFormat('id-ID').format(Number(totalTagihan))}
                  </p>
                </div>
              )}
            </div>

            {/* Tombol Lanjut (Validasi) */}
            <div>
              <button 
                onClick={() => setCurrentStep(5)}
                disabled={!isCustomValid}
                className={`w-full font-bold py-4 rounded-xl transition shadow-md ${
                  isCustomValid 
                    ? 'bg-gradient-to-r from-pink-400 to-blue-400 text-white hover:opacity-90' 
                    : 'bg-gradient-to-r from-pink-300 to-blue-300 opacity-60 text-white cursor-not-allowed'
                }`}
              >
                Lanjut ke Ringkasan
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Split;