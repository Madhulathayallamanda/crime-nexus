import React, { useEffect, useState, useCallback } from 'react';
import Layout from '../components/Layout';
import StatusBadge from '../components/StatusBadge';
import { getAllCrimes, reportCrime } from '../services/api';
import { Plus, X, AlertTriangle, Search, MapPin, FileText } from 'lucide-react';
import { toast } from 'react-toastify';

const EMPTY = { title:'', description:'', location:'', latitude:'', longitude:'', evidenceFile:'', status:'OPEN', dateReported:new Date().toISOString().slice(0,10) };

export default function CrimesPage() {
  const [crimes, setCrimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    getAllCrimes().then(r => setCrimes(r.data||[])).catch(() => toast.error('Failed to load — is the backend running?')).finally(() => setLoading(false));
  },[]);

  useEffect(() => { load(); }, [load]);

  const set = k => e => setForm(f => ({...f, [k]: e.target.value}));

  const submit = async e => {
    e.preventDefault();
    if (!form.title || !form.location) { toast.error('Title and Location are required'); return; }
    setSaving(true);
    try {
      await reportCrime({...form, latitude:parseFloat(form.latitude)||0, longitude:parseFloat(form.longitude)||0});
      toast.success('Crime report submitted!');
      setShowModal(false); setForm(EMPTY); load();
    } catch { toast.error('Submission failed — check backend connection'); }
    finally { setSaving(false); }
  };

  const filtered = crimes.filter(c =>
    (c.title||'').toLowerCase().includes(search.toLowerCase()) ||
    (c.location||'').toLowerCase().includes(search.toLowerCase()) ||
    (c.description||'').toLowerCase().includes(search.toLowerCase())
  );

  const counts = { total:crimes.length, open:crimes.filter(c=>(c.status||'').toUpperCase()==='OPEN').length, closed:crimes.filter(c=>(c.status||'').toUpperCase()==='CLOSED').length };

  return (
    <Layout title="Crime Reports" subtitle="All Incidents" onRefresh={load}>
      <div className="page-header">
        <div className="page-header-text">
          <h2>Crime Reports</h2>
          <p>Submit, search and track all reported incidents</p>
        </div>
        <div className="page-actions">
          <div className="search-wrap">
            <Search size={14}/>
            <input placeholder="Search by title or location…" value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={15}/> Report Crime
          </button>
        </div>
      </div>

      {/* Summary pills */}
      <div style={{display:'flex',gap:10,marginBottom:20,flexWrap:'wrap'}}>
        {[{label:'All Reports',val:counts.total,cls:'gray'},{label:'Open',val:counts.open,cls:'red'},{label:'Closed',val:counts.closed,cls:'green'}].map(p=>(
          <div key={p.label} style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--r)',padding:'9px 16px',display:'flex',alignItems:'center',gap:8,boxShadow:'var(--shadow-xs)'}}>
            <span className={`badge ${p.cls}`}>{p.val}</span>
            <span style={{fontSize:'.82rem',color:'var(--ink-2)',fontWeight:600}}>{p.label}</span>
          </div>
        ))}
      </div>

      <div className="card">
        {loading ? (
          <div className="empty-state"><span className="spinner"/><p>Loading reports…</p></div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <AlertTriangle size={44}/>
            <p>{search ? 'No reports match your search' : 'No crime reports yet'}</p>
            {!search && <button className="btn btn-primary" style={{marginTop:8}} onClick={()=>setShowModal(true)}><Plus size={14}/> File First Report</button>}
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>ID</th><th>Title</th><th>Description</th><th>Location</th><th>Coordinates</th><th>Status</th><th>Date</th><th>Evidence</th></tr></thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.id}>
                    <td><span className="id-chip">#{c.id}</span></td>
                    <td style={{fontWeight:700,color:'var(--ink)',whiteSpace:'nowrap'}}>
                      <span style={{display:'flex',alignItems:'center',gap:6}}><AlertTriangle size={13} color="var(--red)"/>{c.title}</span>
                    </td>
                    <td style={{maxWidth:200,color:'var(--ink-2)'}}>{c.description?.length>55?c.description.slice(0,55)+'…':c.description||'—'}</td>
                    <td><span style={{display:'flex',alignItems:'center',gap:5,whiteSpace:'nowrap'}}><MapPin size={12} color="var(--ink-3)"/>{c.location}</span></td>
                    <td style={{fontFamily:'var(--mono)',fontSize:'.72rem',color:'var(--ink-3)'}}>{c.latitude?.toFixed(4)}, {c.longitude?.toFixed(4)}</td>
                    <td><StatusBadge status={c.status||'OPEN'}/></td>
                    <td style={{color:'var(--ink-3)',fontSize:'.82rem',whiteSpace:'nowrap'}}>{c.dateReported?new Date(c.dateReported).toLocaleDateString():'—'}</td>
                    <td>{c.evidenceFile?<span className="badge blue"><FileText size={10}/>File</span>:<span style={{color:'var(--ink-4)',fontSize:'.8rem'}}>—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-backdrop" onClick={e=>e.target===e.currentTarget&&setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <h3>🚨 Report a Crime</h3>
              <button className="btn-icon" onClick={()=>setShowModal(false)}><X size={16}/></button>
            </div>
            <form onSubmit={submit}>
              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group full"><label>Crime Title *</label><input placeholder="e.g. Burglary on Main Street" value={form.title} onChange={set('title')}/></div>
                  <div className="form-group full"><label>Description</label><textarea placeholder="Describe what happened…" value={form.description} onChange={set('description')}/></div>
                  <div className="form-group full"><label>Location *</label><input placeholder="e.g. 123 Main St, Downtown" value={form.location} onChange={set('location')}/></div>
                  <div className="form-group"><label>Latitude</label><input type="number" step="any" placeholder="17.3850" value={form.latitude} onChange={set('latitude')}/></div>
                  <div className="form-group"><label>Longitude</label><input type="number" step="any" placeholder="78.4867" value={form.longitude} onChange={set('longitude')}/></div>
                  <div className="form-group"><label>Status</label><select value={form.status} onChange={set('status')}><option value="OPEN">Open</option><option value="PENDING">Pending</option><option value="IN_PROGRESS">In Progress</option><option value="CLOSED">Closed</option></select></div>
                  <div className="form-group"><label>Date Reported</label><input type="date" value={form.dateReported} onChange={set('dateReported')}/></div>
                  <div className="form-group full"><label>Evidence File URL</label><input placeholder="https://… or leave blank" value={form.evidenceFile} onChange={set('evidenceFile')}/></div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={()=>setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving?<><span className="spinner" style={{width:14,height:14}}/> Submitting…</>:<><Plus size={14}/> Submit Report</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
