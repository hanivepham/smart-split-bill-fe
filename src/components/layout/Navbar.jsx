import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator } from 'lucide-react';

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md fixed top-0 w-full z-50 border-b border-slate-100">
        <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-pink-400 to-blue-400 p-1.5 rounded-lg">
                <Calculator className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
                Smart Bill Splitter
            </span>
        </div>
        <button
            onClick={() => navigate('/login')}
            className="px-5 py-2 text-sm md:text-base bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 text-white font-bold rounded-full shadow-md transition-all transform hover:-translate-y-0.5"
        >
            Log Out
        </button>
    </nav>
  );
}

export default Navbar;
