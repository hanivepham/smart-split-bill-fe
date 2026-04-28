import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Features from './pages/Features';
import Dashboard from './pages/Dashboard';
import Split from './pages/Split';
import History from './pages/History';
import Login from './pages/Login';
import Register from './pages/Register';
import Payment from './pages/Payment';

function App() {
  return (
    <BrowserRouter>
      <div className="overflow-x-hidden w-full max-w-[100vw] min-h-screen flex flex-col relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/split" element={<Split />} />
          <Route path="/history" element={<History />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;