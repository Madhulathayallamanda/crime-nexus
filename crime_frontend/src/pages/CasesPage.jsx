import React, { useEffect, useState, useCallback } from 'react';
import Layout from '../components/Layout';
import StatusBadge from '../components/StatusBadge';
import { getCases, assignCase } from '../services/api';
import { Plus, X, Folder, Search } from 'lucide-react';
import { toast } from 'react-toastify';

const EMPTY = { crimeId:'', officerId:'', status:'OPEN', remarks:'' };

export default function CasesPage() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    getCases().then(r=>setCases(r.data||[])).catch(()=>toast.error('Failed to load — is backend running?')).finally(()=>setLoading(false));
  },[]);

  useEffect(() => { load(); }, [load]);

  const set = k => e => setForm(f => ({...f,[k]:e.target.value}));

  const submit = async e => {
    e.preventDefault();
    if (!form.crimeId||!form.officerId) { toast.error('Crime ID and Officer ID required'); return; }
    setSaving(true);
    try {
      await assignCase({...form, crimeId:parseInt(form.crimeId), officerId:parseInt(form.officerId)});
      toast.success('Case assigned!');
      setShowModal(false); setForm(EMPTY); load();
    } catch { toast.error('Assignment failed'); }
    finally { setSaving(false); }
  };

  const filtered = cases.filter(c =>
    String(c.crimeId).includes(search) ||
    String(c.officerId).includes(search) ||
    (c.remarks||'').toLowerCase().includes(search.toLowerCase())
  );

  const count = s => cases.filter(c=>(c.status||'').toUpperCase()===s).length;

  return (
    <Layout title="Case Records" subtitle="Manage Investigations" onRefresh={load}>
      <div className="page-header">
        <div className="page-header-text">
          <h2>Case Records</h2>
          <p>Assign cases to officers and track investigations</p>
        </div>
        <div className="page-actions">
          <div className="search-wrap">
            <Search size={14}/>
            <input placeholder="Search cases…" value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
          <button className="btn btn-primary" onClick={()=>setShowModal(true)}>
            <Plus size={15}/> Assign Case
          </button>
        </div>
      </div>

      <div style={{display:'flex',gap:10,marginBottom:20,flexWrap:'wrap'}}>
        {[{l:'All Cases',v:cases.length,c:'gray'},{l:'Open',v:count('OPEN'),c:'red'},{l:'In Progress',v:count('IN_PROGRESS'),c:'amber'},{l:'Closed',v:count('CLOSED'),c:'green'}].map(p=>(
          <div key={p.l} style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--r)',padding:'9px 16px',display:'flex',alignItems:'center',gap:8,boxShadow:'var(--shadow-xs)'}}>
            <span className={`badge ${p.c}`}>{p.v}</span>
            <span style={{fontSize:'.82rem',color:'var(--ink-2)',fontWeight:600}}>{p.l}</span>
          </div>
        ))}
      </div>

      <div className="card">
        {loading ? (
          <div className="empty-state"><span className="spinner"/><p>Loading cases…</p></div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <Folder size={44}/>
            <p>{search?'No cases match your search':'No cases assigned yet'}</p>
            {!search && <button className="btn btn-primary" style={{marginTop:8}} onClick={()=>setShowModal(true)}><Plus size={14}/> Assign First Case</button>}
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Case ID</th><th>Crime ID</th><th>Officer</th><th>Status</th><th>Remarks</th></tr></thead>
              <tbody>
                {filtered.map(c=>(
                  <tr key={c.id}>
                    <td><span className="id-chip">#{c.id}</span></td>
                    <td>
                      <span style={{display:'flex',alignItems:'center',gap:6}}>
                        <span style={{background:'var(--red-light)',color:'var(--red)',borderRadius:6,width:24,height:24,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.7rem',fontWeight:800}}>{c.crimeId}</span>
                        <span style={{fontWeight:600,color:'var(--ink)'}}>Crime #{c.crimeId}</span>
                      </span>
                    </td>
                    <td>
                      <span style={{display:'flex',alignItems:'center',gap:8}}>
                        <span style={{background:'var(--blue-light)',color:'var(--blue)',borderRadius:7,width:28,height:28,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.75rem',fontWeight:800}}>
                          {c.officerId}
                        </span>
                        <span style={{color:'var(--ink-2)'}}>Officer #{c.officerId}</span>
                      </span>
                    </td>
                    <td><StatusBadge status={c.status||'OPEN'}/></td>
                    <td style={{color:'var(--ink-2)',maxWidth:280}}>{c.remarks||<span style={{color:'var(--ink-4)'}}>No remarks</span>}</td>
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
              <h3>📁 Assign Case</h3>
              <button className="btn-icon" onClick={()=>setShowModal(false)}><X size={16}/></button>
            </div>
            <form onSubmit={submit}>
              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group"><label>Crime ID *</label><input type="number" placeholder="e.g. 1" value={form.crimeId} onChange={set('crimeId')}/></div>
                  <div className="form-group"><label>Officer ID *</label><input type="number" placeholder="e.g. 42" value={form.officerId} onChange={set('officerId')}/></div>
                  <div className="form-group full"><label>Status</label><select value={form.status} onChange={set('status')}><option value="OPEN">Open</option><option value="IN_PROGRESS">In Progress</option><option value="UNDER_INVESTIGATION">Under Investigation</option><option value="CLOSED">Closed</option></select></div>
                  <div className="form-group full"><label>Remarks</label><textarea placeholder="Add investigation notes…" value={form.remarks} onChange={set('remarks')}/></div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={()=>setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving?<><span className="spinner" style={{width:14,height:14}}/> Saving…</>:<><Plus size={14}/> Assign Case</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
