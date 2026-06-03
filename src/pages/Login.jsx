import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Calculator } from 'lucide-react';
import api from '../api';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Cek parameter di URL untuk pesan sukses verifikasi
  const queryParams = new URLSearchParams(location.search);
  const isVerified = queryParams.get('verified') === '1';

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await api.post('/login', { email, password });

      const token = response.data.token || response.data.access_token;
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(response.data.user || response.data.data.user));
      }

      navigate('/home');
    } catch (err) {
      if (err.response?.status === 403) {
        alert('Email belum terdaftar atau terverifikasi. Silahkan cek kotak masuk/spam email Anda.');
        setError('Email belum terverifikasi.');
      } else {
        setError(err.response?.data?.message || 'Login gagal. Periksa kembali kredensial Anda.');
      }
    } finally {
      setIsLoading(false);
    }
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
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Login</h2>

        {isVerified && !error && (
          <div className="bg-green-50 text-green-600 text-xs font-semibold p-3 rounded-xl mb-4 border border-green-100 text-center">
            Email berhasil diverifikasi! Silahkan login.
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-500 text-xs font-semibold p-3 rounded-xl mb-4 border border-red-100 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-slate-100 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-pink-300 focus:ring-1 focus:ring-pink-300 transition"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-slate-100 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-pink-300 focus:ring-1 focus:ring-pink-300 transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-pink-400 to-blue-400 text-white font-bold py-3.5 rounded-full hover:opacity-90 transition shadow-md mt-4 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'LOGGING IN...' : 'LOG IN'}
          </button>
        </form>

        <div className="mt-8 border-t border-slate-100 pt-6 text-center text-xs text-slate-500 font-medium">
          Belum memiliki akun? <Link to="/register" className="text-pink-400 font-bold hover:text-pink-500 transition-colors">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
