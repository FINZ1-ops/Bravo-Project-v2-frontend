import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { adminGetBrands, adminCreateBrand, adminUpdateBrand, adminDeleteBrand } from '../../api/brands';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';

const empty = { name:'', logo:'', description:'' };

export default function AdminBrands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetch = () => { setLoading(true); adminGetBrands().then(r => { setBrands(r.data.data); setLoading(false); }); };
  useEffect(() => { fetch(); }, []);

  const openCreate = () => { setEditing(null); setForm(empty); setError(''); setModal(true); };
  const openEdit = (b) => { setEditing(b.id); setForm({name:b.name, logo:b.logo||'', description:b.description||''}); setError(''); setModal(true); };

  const save = async (e) => {
    e.preventDefault(); setSaving(true); setError('');
    try {
      if (editing) await adminUpdateBrand(editing, form);
      else await adminCreateBrand(form);
      setModal(false); fetch();
    } catch(err) { setError(err.response?.data?.message || 'Gagal menyimpan'); }
    finally { setSaving(false); }
  };

  const del = async (id, name) => {
    if (!confirm(`Hapus brand "${name}"?`)) return;
    await adminDeleteBrand(id); fetch();
  };

  return (
    <AdminLayout>
      <div style={{ padding:'2.5rem' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem', flexWrap:'wrap', gap:'1rem' }}>
          <div>
            <h1 style={{ fontFamily:'var(--font-display)', fontSize:'2rem', letterSpacing:'0.05em' }}>KELOLA BRAND</h1>
            <p style={{ color:'var(--silver-dark)', fontSize:'0.85rem' }}>{brands.length} brand terdaftar</p>
          </div>
          <button onClick={openCreate} className="btn btn-red"><Plus size={16} /> Tambah Brand</button>
        </div>

        {loading ? <div className="spinner" /> : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:'1.25rem' }}>
            {brands.map(b => (
              <div key={b.id} className="card" style={{ padding:'1.5rem' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1rem' }}>
                  <div style={{ width:48, height:48, background:'linear-gradient(135deg,#cc0000,#880000)',
                    clipPath:'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontFamily:'var(--font-display)', fontSize:'1.25rem', color:'#fff' }}>B</div>
                  <div style={{ display:'flex', gap:'0.4rem' }}>
                    <button onClick={() => openEdit(b)} style={{ padding:'0.4rem', color:'var(--silver-dark)', borderRadius:'4px', transition:'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.color='var(--white)'; e.currentTarget.style.background='#333'; }}
                      onMouseLeave={e => { e.currentTarget.style.color='var(--silver-dark)'; e.currentTarget.style.background='transparent'; }}>
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => del(b.id, b.name)} style={{ padding:'0.4rem', color:'var(--silver-dark)', borderRadius:'4px', transition:'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.color='var(--red)'; e.currentTarget.style.background='rgba(204,0,0,0.1)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color='var(--silver-dark)'; e.currentTarget.style.background='transparent'; }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <h3 style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'1.1rem', marginBottom:'0.4rem' }}>{b.name}</h3>
                {b.motorcycles_count !== undefined && (
                  <span style={{ fontFamily:'var(--font-heading)', fontSize:'0.75rem', color:'var(--red)', letterSpacing:'0.08em' }}>{b.motorcycles_count} model</span>
                )}
                {b.description && <p style={{ color:'var(--silver-dark)', fontSize:'0.8rem', lineHeight:1.6, marginTop:'0.75rem' }}>{b.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      {modal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem 1rem' }}>
          <div style={{ background:'var(--black-light)', border:'1px solid #333', borderRadius:'8px', width:'100%', maxWidth:460, animation:'fadeInUp 0.3s ease' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'1.5rem', borderBottom:'1px solid #1a1a1a' }}>
              <h2 style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'1.1rem' }}>{editing ? 'Edit Brand' : 'Tambah Brand'}</h2>
              <button onClick={() => setModal(false)} style={{ color:'var(--silver-dark)' }}><X size={20} /></button>
            </div>
            <form onSubmit={save} style={{ padding:'1.5rem' }}>
              {error && <div style={{ background:'rgba(204,0,0,0.1)', border:'1px solid var(--red-dark)', borderRadius:'4px', padding:'0.75rem', color:'#ff6b6b', fontSize:'0.8rem', marginBottom:'1rem' }}>{error}</div>}
              {[['name','Nama Brand'],['logo','Path Logo']].map(([name,label]) => (
                <div key={name} style={{ marginBottom:'1rem' }}>
                  <label style={{ display:'block', fontFamily:'var(--font-heading)', fontSize:'0.72rem', letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--silver)', marginBottom:'0.35rem', fontWeight:600 }}>{label}</label>
                  <input value={form[name]} onChange={e => setForm({...form,[name]:e.target.value})} required={name==='name'} />
                </div>
              ))}
              <div style={{ marginBottom:'1.5rem' }}>
                <label style={{ display:'block', fontFamily:'var(--font-heading)', fontSize:'0.72rem', letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--silver)', marginBottom:'0.35rem', fontWeight:600 }}>Deskripsi</label>
                <textarea value={form.description} onChange={e => setForm({...form,description:e.target.value})} rows={3} style={{ resize:'vertical' }} />
              </div>
              <div style={{ display:'flex', gap:'0.75rem', justifyContent:'flex-end' }}>
                <button type="button" onClick={() => setModal(false)} className="btn btn-outline">Batal</button>
                <button type="submit" className="btn btn-red" disabled={saving}><Save size={15} /> {saving ? 'Menyimpan...' : 'Simpan'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
