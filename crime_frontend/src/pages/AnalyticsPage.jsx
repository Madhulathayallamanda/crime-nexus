import React, { useEffect, useState, useCallback } from 'react';
import Layout from '../components/Layout';
import { getAllCrimes, getCases, getStats } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, AreaChart, Area } from 'recharts';
import { TrendingUp, AlertTriangle, Folder, Activity, Users } from 'lucide-react';

const COLORS = ['#e53935','#1d4ed8','#16a34a','#d97706','#7c3aed','#0d9488'];

const Tip = ({active,payload,label}) => active&&payload?.length ? (
  <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--r)',padding:'8px 12px',fontSize:'.8rem',boxShadow:'var(--shadow)'}}>
    <p style={{fontWeight:700,color:'var(--ink)',marginBottom:3}}>{label}</p>
    {payload.map((p,i)=><p key={i} style={{color:p.color||'var(--ink-2)'}}>{p.name}: <strong>{p.value}</strong></p>)}
  </div>
) : null;

export default function AnalyticsPage() {
  const [crimes, setCrimes] = useState([]);
  const [cases, setCases]   = useState([]);
  const [serverMsg, setServerMsg] = useState('');
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    Promise.all([getAllCrimes(), getCases(), getStats()])
      .then(([cr,ca,st]) => { setCrimes(cr.data||[]); setCases(ca.data||[]); setServerMsg(st.data||''); })
      .catch(()=>{})
      .finally(()=>setLoading(false));
  },[]);

  useEffect(()=>{ load(); },[load]);

  const statusMap={}, caseStatusMap={}, monthMap={}, officerMap={};
  crimes.forEach(c => {
    const s=c.status||'Unknown'; statusMap[s]=(statusMap[s]||0)+1;
    if(c.dateReported){const k=new Date(c.dateReported).toLocaleString('default',{month:'short',year:'2-digit'}); monthMap[k]=(monthMap[k]||0)+1;}
  });
  cases.forEach(c => {
    const s=c.status||'Unknown'; caseStatusMap[s]=(caseStatusMap[s]||0)+1;
    const id=`Officer #${c.officerId}`; officerMap[id]=(officerMap[id]||0)+1;
  });

  const pieData     = Object.entries(statusMap).map(([name,value])=>({name,value}));
  const casePieData = Object.entries(caseStatusMap).map(([name,value])=>({name,value}));
  const trendData   = Object.entries(monthMap).map(([month,reports])=>({month,reports}));
  const officerData = Object.entries(officerMap).map(([officer,count])=>({officer,count})).sort((a,b)=>b.count-a.count).slice(0,7);

  const resRate = crimes.length > 0 ? Math.round(crimes.filter(c=>(c.status||'').toUpperCase()==='CLOSED').length/crimes.length*100) : 0;

  return (
    <Layout title="Analytics" subtitle="Insights" onRefresh={load}>
      <div className="page-header">
        <div className="page-header-text">
          <h2>Analytics & Insights</h2>
          <p>Visual overview of crime data and case performance</p>
        </div>
        {serverMsg && (
          <div style={{background:'var(--teal-light)',border:'1px solid rgba(13,148,136,.2)',borderRadius:'var(--r)',padding:'7px 14px',fontSize:'.78rem',color:'var(--teal)',display:'flex',alignItems:'center',gap:6,fontWeight:600}}>
            <Activity size={12}/> {serverMsg}
          </div>
        )}
      </div>

      <div className="stats-grid mb-24">
        {[
          {cls:'red',   icon:<AlertTriangle size={18}/>, val:crimes.length, label:'Total Reports'},
          {cls:'blue',  icon:<Folder size={18}/>,        val:cases.length,  label:'Total Cases'},
          {cls:'green', icon:<TrendingUp size={18}/>,    val:`${resRate}%`, label:'Resolution Rate'},
          {cls:'purple',icon:<Users size={18}/>,         val:Object.keys(officerMap).length, label:'Active Officers'},
        ].map(s=>(
          <div key={s.label} className={`stat-card ${s.cls}`}>
            <div className="stat-card-bg"/>
            <div className="stat-top"><div className="stat-icon">{s.icon}</div></div>
            <div className="stat-value">{loading?'—':s.val}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid-2 mb-20">
        <div className="card">
          <div className="card-header"><span className="card-title">📈 Crime Trend</span></div>
          <div className="card-body">
            {trendData.length>0 ? (
              <div className="chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData} margin={{top:4,right:4,left:-16,bottom:0}}>
                    <defs><linearGradient id="tf" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#e53935" stopOpacity={0.2}/><stop offset="95%" stopColor="#e53935" stopOpacity={0}/></linearGradient></defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
                    <XAxis dataKey="month" tick={{fontSize:11,fill:'var(--ink-3)'}}/>
                    <YAxis tick={{fontSize:11,fill:'var(--ink-3)'}}/>
                    <Tooltip content={<Tip/>}/>
                    <Area type="monotone" dataKey="reports" name="Reports" stroke="#e53935" fill="url(#tf)" strokeWidth={2}/>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : <div className="empty-state"><p>No monthly trend data</p></div>}
          </div>
        </div>

        <div className="card">
          <div className="card-header"><span className="card-title">🥧 Crime Status</span></div>
          <div className="card-body">
            {pieData.length>0 ? (
              <div className="chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="48%" cy="48%" innerRadius={50} outerRadius={78} paddingAngle={3} dataKey="value">
                      {pieData.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
                    </Pie>
                    <Legend iconType="circle" iconSize={8} wrapperStyle={{fontSize:11}}/>
                    <Tooltip content={<Tip/>}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : <div className="empty-state"><p>No status data yet</p></div>}
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header"><span className="card-title">👮 Officer Workload</span></div>
          <div className="card-body">
            {officerData.length>0 ? (
              <div className="chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={officerData} layout="vertical" margin={{top:4,right:16,left:20,bottom:0}}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false}/>
                    <XAxis type="number" tick={{fontSize:11,fill:'var(--ink-3)'}}/>
                    <YAxis type="category" dataKey="officer" tick={{fontSize:10,fill:'var(--ink-2)'}} width={75}/>
                    <Tooltip content={<Tip/>}/>
                    <Bar dataKey="count" name="Cases" fill="#1d4ed8" radius={[0,4,4,0]}/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : <div className="empty-state"><p>No officer data</p></div>}
          </div>
        </div>

        <div className="card">
          <div className="card-header"><span className="card-title">📊 Case Status</span></div>
          <div className="card-body">
            {casePieData.length>0 ? (
              <div className="chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={casePieData} cx="48%" cy="48%" outerRadius={78} paddingAngle={3} dataKey="value">
                      {casePieData.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
                    </Pie>
                    <Legend iconType="circle" iconSize={8} wrapperStyle={{fontSize:11}}/>
                    <Tooltip content={<Tip/>}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : <div className="empty-state"><p>Assign cases to see breakdown</p></div>}
          </div>
        </div>
      </div>
    </Layout>
  );
}
