import React, { useState } from 'react';
import Layout from '../components/Layout';
import { register } from '../services/api';
import { toast } from 'react-toastify';
import { UserPlus, CheckCircle, Eye, EyeOff } from 'lucide-react';

const EMPTY = { name:'', email:'', password:'' };

export default function RegisterPage() {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const set = k => e => setForm(f => ({...f,[k]:e.target.value}));

  const submit = async e => {
    e.preventDefault();
    if (!form.name||!form.email||!form.password) { toast.error('All fields required'); return; }
    setLoading(true);
    try {
      const res = await register(form);
      setCreated(res.data);
      setForm(EMPTY);
      toast.success(`User "${res.data.name}" registered!`);
    } catch { toast.error('Registration failed — check backend'); }
    finally { setLoading(false); }
  };

  return (
    <Layout title="Register User" subtitle="Add Citizen">
      <div className="page-header">
        <div className="page-header-text">
          <h2>Register New User</h2>
          <p>Add a citizen account to the Crime Portal system</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <span className="card-title"><UserPlus size={16}/> New User Details</span>
          </div>
          <div className="card-body">
            <form onSubmit={submit}>
              <div className="form-grid cols-1" style={{marginBottom:18}}>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input placeholder="Jane Doe" value={form.name} onChange={set('name')}/>
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" placeholder="jane@example.com" value={form.email} onChange={set('email')}/>
                </div>
                <div className="form-group">
                  <label>Password *</label>
                  <div className="pass-wrap">
                    <input type={showPass?'text':'password'} placeholder="Min 8 characters" value={form.password} onChange={set('password')}/>
                    <button type="button" className="pass-toggle" onClick={()=>setShowPass(v=>!v)}>
                      {showPass?<EyeOff size={15}/>:<Eye size={15}/>}
                    </button>
                  </div>
                </div>
              </div>
              <div className="info-box blue" style={{marginBottom:16}}>
                <span>ℹ️</span>
                <span>New users are automatically assigned the <strong>CITIZEN</strong> role.</span>
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading} style={{width:'100%',justifyContent:'center'}}>
                {loading?<><span className="spinner" style={{width:14,height:14}}/> Registering…</>:<><UserPlus size={15}/> Register User</>}
              </button>
            </form>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">✅ Registration Result</span>
          </div>
          <div className="card-body">
            {created ? (
              <div>
                <div className="info-box green" style={{marginBottom:20}}>
                  <CheckCircle size={16}/>
                  <span>User created successfully via <strong>POST /api/auth/register</strong></span>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:0}}>
                  {[['User ID', `#${created.id}`],['Name',created.name],['Email',created.email],['Role',created.role]].map(([label,val])=>(
                    <div key={label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 0',borderBottom:'1px solid var(--surface-3)'}}>
                      <span style={{fontSize:'.75rem',color:'var(--ink-3)',fontWeight:700,textTransform:'uppercase',letterSpacing:'.06em'}}>{label}</span>
                      <span style={{fontSize:'.9rem',color:'var(--ink)',fontWeight:700,fontFamily:label==='User ID'?'var(--mono)':undefined}}>{val}</span>
                    </div>
                  ))}
                </div>
                <button className="btn btn-secondary" style={{marginTop:20,width:'100%',justifyContent:'center'}} onClick={()=>setCreated(null)}>
                  Register Another User
                </button>
              </div>
            ) : (
              <div className="empty-state">
                <UserPlus size={44}/>
                <p>Fill the form and submit</p>
                <p style={{fontSize:'.78rem'}}>Registration details appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
