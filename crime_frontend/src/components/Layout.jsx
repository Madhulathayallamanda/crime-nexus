import React from 'react';
import Sidebar from './Sidebar';
import { Bell, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Layout({ title, subtitle, children, onRefresh }) {
  const now = new Date().toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric', year:'numeric' });
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-content">
        <header className="topbar">
          <div className="topbar-breadcrumb">
            <span className="page-name">{title}</span>
            {subtitle && <><span className="sep">›</span><span className="sub">{subtitle}</span></>}
          </div>
          <div className="topbar-actions">
            {onRefresh && (
              <button className="btn-icon" onClick={onRefresh} title="Refresh">
                <RefreshCw size={14} />
              </button>
            )}
            <button className="btn-icon"><Bell size={15} /></button>
            <div className="topbar-date">{now}</div>
          </div>
        </header>
        <main className="page-body">{children}</main>
      </div>
    </div>
  );
}
