import React, { useEffect, useState, useCallback } from 'react';
import Layout from '../components/Layout';
import StatusBadge from '../components/StatusBadge';
import { getAllCrimes, reportCrime } from '../services/api';
import { Plus, X, AlertTriangle, Search, MapPin, FileText } from 'lucide-react';
import { toast } from 'react-toastify';

const EMPTY = {
  title: '',
  description: '',
  location: '',
  latitude: '',
  longitude: '',
  evidenceFile: '',
  status: 'OPEN',
  dateReported: new Date().toISOString().slice(0,10)
};

export default function CrimesPage() {

  const [crimes, setCrimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [coords, setCoords] = useState({ lat: null, lon: null });

  // 🔹 Load crimes
  const load = useCallback(() => {
    setLoading(true);
    getAllCrimes()
      .then(r => setCrimes(r.data || []))
      .catch(() => toast.error('Backend not running'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  // 🔹 Get user GPS
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        });
      },
      () => toast.error("Enable location access")
    );
  }, []);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  // 🔹 Submit
  const submit = async e => {
    e.preventDefault();

    if (!form.title || !form.location) {
      toast.error('Title & Location required');
      return;
    }

    setSaving(true);

    try {
      await reportCrime({
        ...form,
        latitude: coords.lat,
        longitude: coords.lon
      });

      toast.success('Crime reported!');
      setShowModal(false);
      setForm(EMPTY);
      load();

    } catch {
      toast.error('Submission failed');
    } finally {
      setSaving(false);
    }
  };

  const filtered = crimes.filter(c =>
    (c.title||'').toLowerCase().includes(search.toLowerCase()) ||
    (c.location||'').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout title="Crime Reports" subtitle="All Incidents" onRefresh={load}>

      {/* HEADER */}
      <div className="page-header">
        <h2>Crime Reports</h2>
        <button className="btn btn-primary" onClick={() => {
          setShowModal(true);
          setForm(f => ({
            ...f,
            latitude: coords.lat || '',
            longitude: coords.lon || ''
          }));
        }}>
          <Plus size={15}/> Report Crime
        </button>
      </div>

      {/* TABLE */}
      <div className="card">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Location</th>
                <th>Coords</th>
                <th>Station</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id}>
                  <td>#{c.id}</td>
                  <td>{c.title}</td>
                  <td>{c.location}</td>
                  <td>{c.latitude?.toFixed(4)}, {c.longitude?.toFixed(4)}</td>
                  <td>{c.assignedStation || "Auto Assigning..."}</td>
                  <td><StatusBadge status={c.status}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">

            <div className="modal-header">
              <h3>Report Crime</h3>
              <button onClick={() => setShowModal(false)}><X /></button>
            </div>

            <form onSubmit={submit}>
              <input placeholder="Title" value={form.title} onChange={set('title')} />
              <input placeholder="Location" value={form.location} onChange={set('location')} />
              <textarea placeholder="Description" value={form.description} onChange={set('description')} />

              {/* 🔥 AUTO COORDS */}
              <input value={form.latitude} readOnly placeholder="Latitude" />
              <input value={form.longitude} readOnly placeholder="Longitude" />

              {/* 🗺 GOOGLE MAP */}
              {coords.lat && (
                <iframe
                  title="map"
                  width="100%"
                  height="250"
                  style={{border:0, marginTop:"10px"}}
                  loading="lazy"
                  src={`https://maps.google.com/maps?q=${coords.lat},${coords.lon}&z=15&output=embed`}
                />
              )}

              <button type="submit" disabled={saving}>
                {saving ? "Submitting..." : "Submit"}
              </button>

            </form>

          </div>
        </div>
      )}

    </Layout>
  );
}
