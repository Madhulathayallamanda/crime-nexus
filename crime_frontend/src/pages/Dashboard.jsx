import React, { useEffect, useState, useCallback } from 'react';
import Layout from '../components/Layout';
import StatusBadge from '../components/StatusBadge';
import { getAllCrimes, getCases } from '../services/api';
import { AlertTriangle, Folder, CheckCircle, Clock, TrendingUp, MapPin } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, AreaChart, Area } from 'recharts';

const COLORS = ['#e53935','#1d4ed8','#16a34a','#d97706','#7c3aed','#0d9488'];

export default function Dashboard() {
  const [crimes, setCrimes] = useState([]);
  const [cases, setCases]   = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    Promise.all([getAllCrimes(), getCases()])
      .then(([cr,ca]) => { setCrimes(cr.data||[]); setCases(ca.data||[]); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const open   = crimes.filter(c => (c.status||'').toUpperCase() === 'OPEN').length;
  const closed = crimes.filter(c => (c.status||'').toUpperCase() === 'CLOSED').length;
  const active = cases.filter(c  => (c.status||'').toUpperCase() !== 'CLOSED').length;

  const monthMap = {};
  crimes.forEach(c => {
    if (!c.dateReported) return;
    const k = new Date(c.dateReported).toLocaleString('default',{month:'short'});
    monthMap[k] = (monthMap[k]||0)+1;
  });
  const barData = Object.entries(monthMap).map(([month,count]) => ({month,count}));

  const statusMap = {};
  crimes.forEach(c => { const s=c.status||'Unknown'; statusMap[s]=(statusMap[s]||0)+1; });
  const pieData = Object.entries(statusMap).map(([name,value]) => ({name,value}));

  const CustomTooltip = ({active,payload,label}) => active&&payload?.length ? (
    <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--r)',padding:'8px 12px',fontSize:'.8rem',boxShadow:'var(--shadow)'}}>
      <p style={{fontWeight:700,color:'var(--ink)',marginBottom:3}}>{label}</p>
      {payload.map((p,i) => <p key={i} style={{color:p.color}}>{p.name}: <strong>{p.value}</strong></p>)}
    </div>
  ) : null;

  return (
    <Layout title="Dashboard" subtitle="Overview" onRefresh={load}>
      <div className="stats-grid">
        {[
          {cls:'red',   icon:<AlertTriangle size={18}/>, val:crimes.length, label:'Total Reports'},
          {cls:'amber', icon:<Clock size={18}/>,         val:open,          label:'Open Incidents'},
          {cls:'green', icon:<CheckCircle size={18}/>,   val:closed,        label:'Cases Resolved'},
          {cls:'blue',  icon:<Folder size={18}/>,        val:cases.length,  label:'Total Cases'},
          {cls:'purple',icon:<TrendingUp size={18}/>,    val:active,        label:'Active Investigations'},
        ].map(s => (
          <div key={s.label} className={`stat-card ${s.cls}`}>
            <div className="stat-card-bg" />
            <div className="stat-top">
              <div className="stat-icon">{s.icon}</div>
            </div>
            <div className="stat-value">{loading ? '—' : s.val}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid-2 mb-24">
        <div className="card">
          <div className="card-header">
            <span className="card-title">📅 Reports by Month</span>
            <span className="badge gray">{barData.length} months</span>
          </div>
          <div className="card-body">
            {barData.length > 0 ? (
              <div className="chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={barData} margin={{top:4,right:4,left:-16,bottom:0}}>
                    <defs>
                      <linearGradient id="areafill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#e53935" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#e53935" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="month" tick={{fontSize:11,fill:'var(--ink-3)'}} />
                    <YAxis tick={{fontSize:11,fill:'var(--ink-3)'}} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="count" name="Reports" stroke="#e53935" fill="url(#areafill)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="empty-state"><AlertTriangle size={36}/><p>No monthly data yet — submit a crime report with a date</p></div>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">🥧 Status Breakdown</span>
            <span className="badge gray">{crimes.length} total</span>
          </div>
          <div className="card-body">
            {pieData.length > 0 ? (
              <div className="chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="48%" innerRadius={55} outerRadius={82} paddingAngle={3} dataKey="value">
                      {pieData.map((_,i) => <Cell key={i} fill={COLORS[i%COLORS.length]} />)}
                    </Pie>
                    <Legend iconType="circle" iconSize={8} wrapperStyle={{fontSize:11}} />
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="empty-state"><TrendingUp size={36}/><p>No status data — reports will appear here</p></div>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">🚨 Recent Crime Reports</span>
          <span className="badge red">{crimes.length} total</span>
        </div>
        {loading ? (
          <div className="empty-state"><span className="spinner"/></div>
        ) : crimes.length === 0 ? (
          <div className="empty-state"><AlertTriangle size={40}/><p>No reports yet — use "Crime Reports" to file one</p></div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>ID</th><th>Title</th><th>Location</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>
                {crimes.slice(0,10).map(c => (
                  <tr key={c.id}>
                    <td><span className="id-chip">#{c.id}</span></td>
                    <td style={{fontWeight:600,color:'var(--ink)'}}>{c.title}</td>
                    <td><span style={{display:'flex',alignItems:'center',gap:5}}><MapPin size={12} color="var(--ink-3)"/>{c.location}</span></td>
                    <td><StatusBadge status={c.status||'OPEN'}/></td>
                    <td style={{color:'var(--ink-3)',fontSize:'.82rem'}}>{c.dateReported ? new Date(c.dateReported).toLocaleDateString() : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}
