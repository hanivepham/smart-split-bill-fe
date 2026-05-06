import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Calculator, Check
} from 'lucide-react';

import Step1 from '../components/split/Step1';
import Step2 from '../components/split/Step2';
import Step3 from '../components/split/Step3';
import Step4 from '../components/split/Step4';
import Step5 from '../components/split/Step5';

function Split() {
  const navigate = useNavigate();
  
  const [totalTagihan, setTotalTagihan] = useState(() => {
    const saved = sessionStorage.getItem("split_totalTagihan");
    return saved ? JSON.parse(saved) : '';
  });
  
  const [jumlahOrang, setJumlahOrang] = useState(() => {
    const saved = sessionStorage.getItem("split_jumlahOrang");
    return saved ? JSON.parse(saved) : 2;
  });

  const [participants, setParticipants] = useState(() => {
    const saved = sessionStorage.getItem("split_participants");
    return saved ? JSON.parse(saved) : [];
  });

  const [currentStep, setCurrentStep] = useState(() => {
    const saved = sessionStorage.getItem("split_currentStep");
    return saved ? JSON.parse(saved) : 1;
  });

  const [splitMethod, setSplitMethod] = useState(() => {
    const saved = sessionStorage.getItem("split_splitMethod");
    return saved ? JSON.parse(saved) : 'rata';
  });

  useEffect(() => {
    sessionStorage.setItem("split_totalTagihan", JSON.stringify(totalTagihan));
  }, [totalTagihan]);

  useEffect(() => {
    sessionStorage.setItem("split_jumlahOrang", JSON.stringify(jumlahOrang));
  }, [jumlahOrang]);

  useEffect(() => {
    sessionStorage.setItem("split_participants", JSON.stringify(participants));
  }, [participants]);

  useEffect(() => {
    sessionStorage.setItem("split_currentStep", JSON.stringify(currentStep));
  }, [currentStep]);

  useEffect(() => {
    sessionStorage.setItem("split_splitMethod", JSON.stringify(splitMethod));
  }, [splitMethod]);

  const handleLanjutStep1 = () => {
    if (totalTagihan > 0 && jumlahOrang > 0) {
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
    if (currentCount <= 2) return;

    setJumlahOrang(currentCount - 1);
    const newParticipants = participants.filter((_, index) => index !== indexToRemove);
    setParticipants(newParticipants);
  };

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

  const getParticipantSubtotal = (p) => {
    return p.items?.reduce((sum, item) => sum + (Number(item.price) || 0), 0) || 0;
  };

  const totalCustomSubtotal = participants.reduce((sum, p) => sum + getParticipantSubtotal(p), 0);
  const isSubtotalMatch = totalCustomSubtotal === (Number(totalTagihan) || 0);

  const isCustomValid = isSubtotalMatch && participants.every(p => 
    p.items && p.items.length > 0 && p.items.every(item => item.menu.trim() !== '' && Number(item.price) > 0)
  );

  const filledCount = participants.filter(p => p.name.trim() !== '').length;
  const isAllFilled = filledCount > 0 && filledCount === Number(jumlahOrang);

  const handleShare = () => {
    let text = `📊 Hasil Pembagian Tagihan\n\nGrand Total: Rp ${new Intl.NumberFormat('id-ID').format(Number(totalTagihan) || 0)}\n\n`;
    participants.forEach((p, i) => {
      const name = p.name || `Orang ${i+1}`;
      if (splitMethod === 'rata') {
        const perPerson = (Number(totalTagihan) || 0) / participants.length;
        text += `${name}: Rp ${new Intl.NumberFormat('id-ID').format(perPerson || 0)}\n`;
      } else {
        const personTotal = p.items?.reduce((sum, item) => sum + (Number(item.price) || 0), 0) || 0;
        text += `${name}: Rp ${new Intl.NumberFormat('id-ID').format(personTotal || 0)}\n`;
      }
    });
    text += `\n💡 Dibuat dengan Smart Bill Splitter`;
    navigator.clipboard.writeText(text);
    alert('Hasil berhasil disalin ke clipboard!');
  };

  const handleSimpan = () => {
    const newRecord = {
      id: Date.now(),
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      total: totalTagihan,
      peopleCount: participants.length,
      method: splitMethod === 'rata' ? 'Split Rata' : 'Custom Split',
      details: participants.map((p, i) => {
        const name = p.name || `Orang ${i+1}`;
        if (splitMethod === 'rata') {
          return { name, amount: (Number(totalTagihan) || 0) / participants.length };
        } else {
          const amount = p.items?.reduce((sum, item) => sum + (Number(item.price) || 0), 0) || 0;
          return { name, amount };
        }
      })
    };
    const existing = JSON.parse(localStorage.getItem('splitHistory') || '[]');
    localStorage.setItem('splitHistory', JSON.stringify([newRecord, ...existing]));
    alert('Berhasil disimpan ke riwayat!');
  };

  const handleReset = () => {
    setTotalTagihan('');
    setJumlahOrang(2);
    setParticipants([]);
    setSplitMethod('rata');
    sessionStorage.removeItem("split_totalTagihan");
    sessionStorage.removeItem("split_jumlahOrang");
    sessionStorage.removeItem("split_participants");
    sessionStorage.removeItem("split_currentStep");
    sessionStorage.removeItem("split_splitMethod");
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12">
      <header className="flex items-center gap-2 md:gap-4 px-4 py-4 md:px-8 md:py-6 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
        {currentStep === 1 ? (
          <Link to="/dashboard" className="p-2 hover:bg-slate-100 rounded-full transition shrink-0">
            <ArrowLeft className="text-slate-600 w-5 h-5" />
          </Link>
        ) : (
          <button onClick={() => setCurrentStep(currentStep - 1)} className="p-2 hover:bg-slate-100 rounded-full transition shrink-0">
            <ArrowLeft className="text-slate-600 w-5 h-5" />
          </button>
        )}
        <div className="flex items-center gap-2 min-w-0">
          <div className="bg-gradient-to-r from-pink-400 to-blue-400 p-1.5 rounded-lg shrink-0">
            <Calculator className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-base md:text-lg bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500 truncate min-w-0">
            Smart Bill Splitter
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 mt-6 md:mt-8">
        <div className="w-full px-2 max-w-[320px] md:max-w-none mx-auto flex items-center justify-center mb-8 md:mb-10 overflow-hidden">
          <div className="flex items-center justify-between w-full md:justify-center">
            {[1, 2, 3, 4, 5].map((step, index) => (
              <React.Fragment key={step}>
                <div className={`flex flex-col items-center ${currentStep < step ? 'opacity-50' : ''}`}>
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold shadow-md transition-all duration-300 text-sm md:text-base ${
                    currentStep > step 
                      ? 'bg-gradient-to-r from-pink-400 to-blue-400 text-white' 
                      : currentStep === step 
                        ? 'bg-gradient-to-r from-purple-300 to-blue-300 text-white'
                        : 'bg-white border-2 border-slate-200 text-slate-400'
                  }`}>
                    {currentStep > step ? <Check className="w-4 h-4 md:w-6 md:h-6" /> : step}
                  </div>
                  <span className={`text-[10px] md:text-xs mt-1 md:mt-2 transition-colors duration-300 ${
                    currentStep > step ? 'text-pink-500 font-bold' : currentStep === step ? 'text-purple-500 font-bold' : 'text-slate-400 font-medium'
                  }`}>
                    Step {step}
                  </span>
                </div>
                {index < 4 && (
                  <div className={`w-4 sm:w-8 md:w-12 h-[2px] mb-4 md:mb-6 mx-1 md:mx-2 transition-colors duration-300 ${
                    currentStep > step ? 'bg-gradient-to-r from-pink-400 to-blue-300' : 'bg-slate-200'
                  }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* STEP 1 */}
        {currentStep === 1 && (
          <Step1 
            totalTagihan={totalTagihan}
            setTotalTagihan={setTotalTagihan}
            jumlahOrang={jumlahOrang}
            setJumlahOrang={setJumlahOrang}
            onNext={handleLanjutStep1}
          />
        )}

        {/* STEP 2 */}
        {currentStep === 2 && (
          <Step2 
            jumlahOrang={jumlahOrang}
            participants={participants}
            setParticipants={setParticipants}
            removeParticipant={removeParticipant}
            filledCount={filledCount}
            isAllFilled={isAllFilled}
            onNext={() => setCurrentStep(3)}
            onPrev={() => setCurrentStep(1)}
          />
        )}

        {/* STEP 3 */}
        {currentStep === 3 && (
          <Step3 
            splitMethod={splitMethod}
            setSplitMethod={setSplitMethod}
            onNext={() => setCurrentStep(4)}
            onPrev={() => setCurrentStep(2)}
          />
        )}

        {/* STEP 4 */}
        {currentStep === 4 && (
          <Step4 
            splitMethod={splitMethod}
            totalTagihan={totalTagihan}
            participants={participants}
            handleItemChange={handleItemChange}
            handleRemoveItem={handleRemoveItem}
            handleAddItem={handleAddItem}
            getParticipantSubtotal={getParticipantSubtotal}
            totalCustomSubtotal={totalCustomSubtotal}
            isSubtotalMatch={isSubtotalMatch}
            isCustomValid={isCustomValid}
            onNext={() => setCurrentStep(5)}
            onPrev={() => setCurrentStep(3)}
          />
        )}

        {/* STEP 5 */}
        {currentStep === 5 && (
          <Step5 
            totalTagihan={totalTagihan}
            participants={participants}
            splitMethod={splitMethod}
            handleShare={handleShare}
            onSave={handleSimpan}
            handleReset={handleReset}
            navigate={navigate}
            onPrev={() => setCurrentStep(4)}
          />
        )}
      </main>
    </div>
  );
}

export default Split;