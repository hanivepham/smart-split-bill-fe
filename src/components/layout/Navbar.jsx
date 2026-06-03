import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, User } from 'lucide-react';

function Navbar() {
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
        <div className="flex items-center gap-4">
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
            <button
                onClick={() => {
                  sessionStorage.clear();
                  localStorage.clear();
                  navigate('/');
                }}
                className="px-5 py-2 text-sm md:text-base bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 text-white font-bold rounded-full shadow-md transition-all transform hover:-translate-y-0.5"
            >
                Log Out
            </button>
        </div>
    </nav>
  );
}

export default Navbar;
