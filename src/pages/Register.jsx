import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calculator } from 'lucide-react';
import api from '../api';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (name.length < 4 || name.length > 15) {
      setError('Nama harus terdiri dari 4 hingga 15 karakter!');
      return;
    }

    if (password.length < 8) {
      setError('Password minimal harus 8 karakter!');
      return;
    }
    
    if (password !== passwordConfirmation) {
      setError('Password dan Konfirmasi Password tidak cocok!');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await api.post('/register', { 
        name, 
        email, 
        password, 
        password_confirmation: passwordConfirmation 
      });
      
      alert('Registrasi berhasil! Silahkan verifikasi email Anda sebelum login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registrasi gagal. Coba lagi nanti.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 to-blue-300 flex flex-col items-center justify-center p-4 font-sans py-12">
      {/* Logo Area */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-12 h-12 rounded-[1rem] bg-gradient-to-br from-pink-400 to-blue-400 flex items-center justify-center shadow-md">
          <Calculator className="w-7 h-7 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-2xl text-slate-800 leading-none mb-1">Smart</span>
          <span className="font-normal text-xl text-slate-800 leading-none">Bill Splitter</span>
        </div>
      </div>

      {/* Register Card */}
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Sign Up</h2>
        
        {error && (
          <div className="bg-red-50 text-red-500 text-xs font-semibold p-3 rounded-xl mb-4 border border-red-100 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">Nama</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-2 border-slate-100 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:border-pink-300 focus:ring-1 focus:ring-pink-300 transition"
              required
              minLength={4}
              maxLength={15}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-slate-100 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:border-pink-300 focus:ring-1 focus:ring-pink-300 transition"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-slate-100 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:border-pink-300 focus:ring-1 focus:ring-pink-300 transition"
              required
              minLength={8}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">Confirm Password</label>
            <input 
              type="password" 
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="w-full border-2 border-slate-100 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:border-pink-300 focus:ring-1 focus:ring-pink-300 transition"
              required
              minLength={8}
            />
          </div>
          
          <button 
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-pink-400 to-blue-400 text-white font-bold py-3.5 rounded-full hover:opacity-90 transition shadow-md mt-6 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'CREATING...' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <div className="mt-6 border-t border-slate-100 pt-6 text-center text-xs text-slate-500 font-medium">
          Sudah memiliki akun? <Link to="/login" className="text-pink-400 font-bold hover:text-pink-500 transition-colors">Log In</Link>
        </div>
      </div>
    </div>
  );
}
