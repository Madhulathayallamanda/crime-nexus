import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

import { AuthProvider, useAuth } from './context/AuthContext';
import AuthPage    from './pages/AuthPage';
import Dashboard   from './pages/Dashboard';
import CrimesPage  from './pages/CrimesPage';
import CasesPage   from './pages/CasesPage';
import AnalyticsPage from './pages/AnalyticsPage';
import RegisterPage  from './pages/RegisterPage';

function Guard({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/auth" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/"          element={<Guard><Dashboard /></Guard>} />
          <Route path="/crimes"    element={<Guard><CrimesPage /></Guard>} />
          <Route path="/cases"     element={<Guard><CasesPage /></Guard>} />
          <Route path="/analytics" element={<Guard><AnalyticsPage /></Guard>} />
          <Route path="/register"  element={<Guard><RegisterPage /></Guard>} />
          <Route path="*"          element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="light"
        toastStyle={{ fontFamily: 'Sora, sans-serif', fontSize: '0.85rem' }}
      />
    </AuthProvider>
  );
}
