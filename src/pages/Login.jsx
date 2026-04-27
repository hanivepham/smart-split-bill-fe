import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calculator } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 to-blue-300 flex flex-col items-center justify-center p-4 font-sans">
      {/* Logo Area */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-[1rem] bg-gradient-to-br from-pink-400 to-blue-400 flex items-center justify-center shadow-md">
          <Calculator className="w-7 h-7 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-2xl text-slate-800 leading-none mb-1">Smart</span>
          <span className="font-normal text-xl text-slate-800 leading-none">Bill Splitter</span>
        </div>
      </div>

      <h1 className="text-xl font-bold text-slate-800 mb-6">Welcome!</h1>

      {/* Login Card */}
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold text-slate-800 mb-8">Login</h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2">Username</label>
            <input
              type="text"
              className="w-full border-2 border-slate-100 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-pink-300 focus:ring-1 focus:ring-pink-300 transition"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2">Password</label>
            <input
              type="password"
              className="w-full border-2 border-slate-100 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-pink-300 focus:ring-1 focus:ring-pink-300 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-400 to-blue-400 text-white font-bold py-3.5 rounded-full hover:opacity-90 transition shadow-md mt-4"
          >
            LOG IN
          </button>
        </form>

        <div className="mt-8 border-t border-slate-100 pt-6 text-center text-xs text-slate-500 font-medium">
          Belum memiliki akun? <Link to="/register" className="text-pink-400 font-bold hover:text-pink-500 transition-colors">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
