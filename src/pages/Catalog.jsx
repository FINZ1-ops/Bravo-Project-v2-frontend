import { useState, useEffect } from 'react';
import { getMotorcycles, getMotorcycleTypes } from '../api/motorcycles';
import MotorcycleCard from '../components/MotorcycleCard';
import { Search, Filter, X } from 'lucide-react';

export default function Catalog() {
  const [motors, setMotors] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState('');
  const [activeStroke, setActiveStroke] = useState('');

  const fetchMotors = async () => {
    setLoading(true);
    const params = {};
    if (search) params.search = search;
    if (activeType) params.type = activeType;
    if (activeStroke) params.stroke = activeStroke;
    try {
      const r = await getMotorcycles(params);
      setMotors(r.data.data);
    } finally { setLoading(false); }
  };

  useEffect(() => {
    getMotorcycleTypes().then(r => setTypes(r.data.data)).catch(() => {});
  }, []);

  useEffect(() => { fetchMotors(); }, [activeType, activeStroke]);

  const handleSearch = (e) => { e.preventDefault(); fetchMotors(); };
  const clearFilters = () => { setSearch(''); setActiveType(''); setActiveStroke(''); };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ padding:'4rem 0 3rem', background:'linear-gradient(180deg,#0f0f0f,var(--black))', borderBottom:'1px solid #1a1a1a' }}>
        <div className="container">
          <div className="tag">Lineup Lengkap</div>
          <h1 className="section-title">KATALOG <span>MOTOR</span></h1>
          <div className="divider" />
          <p style={{ color:'var(--silver-dark)', maxWidth:500 }}>22 model dari berbagai kelas — temukan Bravo yang cocok untukmu.</p>
        </div>
      </div>

      <div className="container" style={{ padding:'3rem 1.5rem' }}>
        {/* Search + Filter Bar */}
        <div style={{ marginBottom:'2.5rem' }}>
          <form onSubmit={handleSearch} style={{ display:'flex', gap:'0.75rem', marginBottom:'1.25rem', flexWrap:'wrap' }}>
            <div style={{ position:'relative', flex:1, minWidth:240 }}>
              <Search size={16} style={{ position:'absolute', left:'0.9rem', top:'50%', transform:'translateY(-50%)', color:'var(--silver-dark)' }} />
              <input placeholder="Cari motor..." value={search} onChange={e => setSearch(e.target.value)}
                style={{ paddingLeft:'2.5rem' }} />
            </div>
            <button type="submit" className="btn btn-red">Cari</button>
            {(activeType || activeStroke || search) && (
              <button type="button" onClick={clearFilters} className="btn btn-outline" style={{ gap:'0.4rem' }}>
                <X size={14} /> Reset
              </button>
            )}
          </form>

          {/* Type filter chips */}
          <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap', alignItems:'center' }}>
            <Filter size={14} style={{ color:'var(--silver-dark)' }} />
            <button onClick={() => setActiveType('')} style={{
              fontFamily:'var(--font-heading)', fontWeight:600, fontSize:'0.75rem', letterSpacing:'0.08em',
              padding:'0.35rem 0.9rem', borderRadius:'20px', textTransform:'uppercase',
              background: !activeType ? 'var(--red)' : 'transparent',
              color: !activeType ? '#fff' : 'var(--silver-dark)',
              border: `1px solid ${!activeType ? 'var(--red)' : '#333'}`,
              transition:'all 0.2s',
            }}>Semua</button>
            {types.map(t => (
              <button key={t} onClick={() => setActiveType(t)} style={{
                fontFamily:'var(--font-heading)', fontWeight:600, fontSize:'0.75rem', letterSpacing:'0.08em',
                padding:'0.35rem 0.9rem', borderRadius:'20px', textTransform:'uppercase',
                background: activeType === t ? 'var(--red)' : 'transparent',
                color: activeType === t ? '#fff' : 'var(--silver-dark)',
                border: `1px solid ${activeType === t ? 'var(--red)' : '#333'}`,
                transition:'all 0.2s',
              }}>{t}</button>
            ))}
            <div style={{ width:1, height:20, background:'#333', margin:'0 0.25rem' }} />
            {['', '2T', '4T'].map(s => (
              <button key={s} onClick={() => setActiveStroke(s)} style={{
                fontFamily:'var(--font-heading)', fontWeight:600, fontSize:'0.75rem', letterSpacing:'0.08em',
                padding:'0.35rem 0.9rem', borderRadius:'20px', textTransform:'uppercase',
                background: activeStroke === s ? 'var(--red-dark)' : 'transparent',
                color: activeStroke === s ? '#fff' : 'var(--silver-dark)',
                border: `1px solid ${activeStroke === s ? 'var(--red-dark)' : '#333'}`,
                transition:'all 0.2s',
              }}>{s || 'Semua Stroke'}</button>
            ))}
          </div>
        </div>

        {/* Results count */}
        {!loading && (
          <p style={{ color:'var(--silver-dark)', fontSize:'0.85rem', marginBottom:'1.5rem', fontFamily:'var(--font-heading)' }}>
            Menampilkan <span style={{ color:'var(--red)', fontWeight:700 }}>{motors.length}</span> motor
          </p>
        )}

        {/* Grid */}
        {loading ? <div className="spinner" /> : motors.length === 0 ? (
          <div style={{ textAlign:'center', padding:'5rem 0', color:'var(--silver-dark)' }}>
            <p style={{ fontFamily:'var(--font-display)', fontSize:'2rem', marginBottom:'0.5rem' }}>TIDAK ADA HASIL</p>
            <p style={{ fontSize:'0.875rem' }}>Coba kata kunci atau filter yang berbeda.</p>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'1.5rem' }}>
            {motors.map(m => <MotorcycleCard key={m.id} motor={m} />)}
          </div>
        )}
      </div>
    </div>
  );
}
