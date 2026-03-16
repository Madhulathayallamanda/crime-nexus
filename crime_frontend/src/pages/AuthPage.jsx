import React, { useState } from 'react';
import { Shield, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { toast.error('Please fill in all fields'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    login({ name: form.email.split('@')[0], email: form.email, role: 'CITIZEN' });
    toast.success('Welcome back!');
    navigate('/');
    setLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { toast.error('All fields are required'); return; }
    setLoading(true);
    try {
      const res = await register({ name: form.name, email: form.email, password: form.password });
      login({ name: res.data.name, email: res.data.email, role: res.data.role });
      toast.success('Account created successfully!');
      navigate('/');
    } catch {
      toast.error('Registration failed. Check your connection.');
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-shell">
      {/* Left Panel */}
      <div className="auth-left">
        <div className="auth-left-content">
          <div className="auth-brand">
            <div className="auth-brand-icon"><Shield size={24} /></div>
            <div className="auth-brand-text">
              <h1>Crime Portal</h1>
              <span>Law Enforcement System</span>
            </div>
          </div>
          <div className="auth-left-headline">
            Safer cities<br />start with <em>better data</em>
          </div>
          <p className="auth-left-sub">
            A unified platform for citizens and officers to report, track, and resolve criminal incidents efficiently.
          </p>
          <div className="auth-features">
            {['Real-time crime reporting & tracking','Case assignment & officer management','Analytics dashboards & insights','Secure citizen registration'].map(f => (
              <div className="auth-feature" key={f}>
                <div className="auth-feature-dot" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-right">
        <div className="auth-card">
          <div className="auth-card-header">
            <h2>{mode === 'login' ? 'Sign in' : 'Create account'}</h2>
            <p>{mode === 'login' ? 'Welcome back — enter your credentials to continue' : 'Join the portal and start reporting incidents'}</p>
          </div>
          <div className="auth-form-box">
            <form className="auth-form" onSubmit={mode === 'login' ? handleLogin : handleRegister}>
              {mode === 'register' && (
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Jane Doe" value={form.name} onChange={set('name')} />
                </div>
              )}
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} />
              </div>
              <div className="form-group">
                <label>Password</label>
                <div className="pass-wrap">
                  <input type={showPass ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={set('password')} />
                  <button type="button" className="pass-toggle" onClick={() => setShowPass(v => !v)}>
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? <><span className="spinner" style={{width:16,height:16}} /> Processing…</> : <>{mode === 'login' ? 'Sign In' : 'Create Account'} <ArrowRight size={15} /></>}
              </button>
            </form>
          </div>
          <div className="auth-switch">
            {mode === 'login'
              ? <>Don't have an account? <button onClick={() => setMode('register')}>Sign up free</button></>
              : <>Already have an account? <button onClick={() => setMode('login')}>Sign in</button></>}
          </div>
        </div>
      </div>
    </div>
  );
}
