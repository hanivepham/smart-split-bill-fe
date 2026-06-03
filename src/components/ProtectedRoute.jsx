import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Jika tidak ada token, arahkan paksa ke halaman login
    return <Navigate to="/login" replace />;
  }

  // Jika token ada, izinkan akses ke komponen anak (halaman yang dilindungi)
  return children;
};

export default ProtectedRoute;
