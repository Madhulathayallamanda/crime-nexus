import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Shield, LayoutDashboard, AlertTriangle, Folder, BarChart2, UserPlus, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NAV = [
  { label: 'Dashboard',     icon: LayoutDashboard, path: '/' },
  { label: 'Crime Reports', icon: AlertTriangle,   path: '/crimes' },
  { label: 'Case Records',  icon: Folder,          path: '/cases' },
  { label: 'Analytics',     icon: BarChart2,       path: '/analytics' },
  { label: 'Register User', icon: UserPlus,        path: '/register' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const initials = user?.name ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2) : 'CP';

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-badge">
          <div className="brand-icon"><Shield size={20} /></div>
          <div className="brand-text">
            <h1>CrimePortal</h1>
            <span>Law Enforcement System</span>
          </div>
        </div>
      </div>
      <nav className="sidebar-nav">
        <div className="nav-section-label">Navigation</div>
        {NAV.map(({ label, icon: Icon, path }) => (
          <button key={path} className={`nav-item${location.pathname === path ? ' active' : ''}`} onClick={() => navigate(path)}>
            <Icon size={16} />
            {label}
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="user-chip">
          <div className="user-avatar">{initials}</div>
          <div className="user-info">
            <div className="name">{user?.name || 'Guest'}</div>
            <div className="role">{user?.role || 'CITIZEN'}</div>
          </div>
          <button style={{background:'none',border:'none',cursor:'pointer',color:'rgba(255,255,255,.35)',display:'flex',alignItems:'center',padding:4}} title="Logout" onClick={() => { logout(); navigate('/auth'); }}>
            <LogOut size={14} />
          </button>
        </div>
        <div className="sidebar-version">v1.0.0 · Spring Boot 9060</div>
      </div>
    </aside>
  );
}
