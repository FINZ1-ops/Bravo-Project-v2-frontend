import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { getUser } from '../../utils/cookies';
import { adminGetMotorcycles, adminCreateMotorcycle, adminUpdateMotorcycle, adminDeleteMotorcycle } from '../../api/motorcycles';
import { adminGetBrands } from '../../api/brands';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';

const emptyForm = { brand_id:'1', name_models:'', type:'', engine_cc:'', stroke:'4T', power:'', price:'', price_label:'normal', description:'', thumbnail:'', is_active:true };

export default function AdminMotorcycles() {
  const [motors, setMotors] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const canEdit = ['admin'].includes(getUser()?.role);

  const fetch = async () => {
    setLoading(true);
    const [m, b] = await Promise.all([adminGetMotorcycles(), adminGetBrands()]);
    setMotors(m.data.data); setBrands(b.data.data); setLoading(false);
  };
  useEffect(() => { fetch(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setError(''); setModal(true); };
  const openEdit = (m) => { setEditing(m.id); setForm({...emptyForm, ...m, brand_id: m.brand_id||'1', price: m.price||'', power: m.power||''}); setError(''); setModal(true); };

  const save = async (e) => {
    e.preventDefault(); setSaving(true); setError('');
    try {
      const payload = { ...form, engine_cc: Number(form.engine_cc), brand_id: Number(form.brand_id), power: form.power ? Number(form.power) : null, price: form.price ? Number(form.price) : null };
      if (editing) await adminUpdateMotorcycle(editing, payload);
      else await adminCreateMotorcycle(payload);
      setModal(false); fetch();
    } catch(err) { setError(err.response?.data?.message || JSON.stringify(err.response?.data?.errors) || 'Gagal menyimpan'); }
    finally { setSaving(false); }
  };

  const del = async (id, name) => {
    if (!confirm(`Hapus ${name}?`)) return;
    await adminDeleteMotorcycle(id); fetch();
  };

  const fld = (name, label, type='text', opts=null) => (
    <div style={{ marginBottom:'1rem' }}>
      <label style={{ display:'block', fontFamily:'var(--font-heading)', fontSize:'0.72rem', letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--silver)', marginBottom:'0.35rem', fontWeight:600 }}>{label}</label>
      {opts ? (
        <select name={name} value={form[name]} onChange={e => setForm({...form, [name]:e.target.value})}>
          {opts.map(([v,l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      ) : type === 'textarea' ? (
        <textarea name={name} value={form[name]} onChange={e => setForm({...form, [name]:e.target.value})} rows={3} style={{resize:'vertical'}} />
      ) : (
        <input type={type} name={name} value={form[name]} onChange={e => setForm({...form, [name]: type==='checkbox' ? e.target.checked : e.target.value})} />
      )}
    </div>
  );

  return (
    <AdminLayout>
      <div style={{ padding:'2.5rem' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem', flexWrap:'wrap', gap:'1rem' }}>
          <div>
            <h1 style={{ fontFamily:'var(--font-display)', fontSize:'2rem', letterSpacing:'0.05em' }}>KELOLA MOTOR</h1>
            <p style={{ color:'var(--silver-dark)', fontSize:'0.85rem' }}>{motors.length} model terdaftar</p>
          </div>
          {canEdit && (
          <button onClick={openCreate} className="btn btn-red">
            <Plus size={16} /> Tambah Motor
          </button>
        )}
        </div>

        {loading ? <div className="spinner" /> :(
          <div style={{ background:'var(--black-light)', border:'1px solid #222', borderRadius:'8px', overflow:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', minWidth:700 }}>
              <thead>
                <tr style={{ borderBottom:'1px solid #1a1a1a' }}>
                  {['Model', 'Tipe', 'CC / Stroke', 'Tenaga', 'Harga', 'Status', ...(canEdit ? ['Aksi'] : [])].map(h => (
                    <th key={h} style={{ padding:'0.75rem 1.25rem', textAlign:'left', fontFamily:'var(--font-heading)', fontSize:'0.7rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--silver-dark)', fontWeight:600, whiteSpace:'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {motors.map((m, i) => (
                  <tr key={m.id} style={{ borderBottom: i < motors.length-1 ? '1px solid #1a1a1a' : 'none', transition:'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.02)'}
                    onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                    <td style={{ padding:'0.875rem 1.25rem', fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'0.875rem', whiteSpace:'nowrap' }}>{m.name_models}</td>
                    <td style={{ padding:'0.875rem 1.25rem', color:'var(--silver-dark)', fontSize:'0.8rem', whiteSpace:'nowrap' }}>{m.type}</td>
                    <td style={{ padding:'0.875rem 1.25rem', color:'var(--silver-dark)', fontSize:'0.8rem', whiteSpace:'nowrap' }}>{m.engine_cc}cc / {m.stroke}</td>
                    <td style={{ padding:'0.875rem 1.25rem', color:'var(--silver-dark)', fontSize:'0.8rem' }}>{m.power ? `${m.power} HP` : '-'}</td>
                    <td style={{ padding:'0.875rem 1.25rem', fontSize:'0.8rem', fontFamily:'var(--font-heading)', fontWeight:600, whiteSpace:'nowrap',
                      color: m.price_label==='normal' ? 'var(--red)' : 'var(--silver-dark)' }}>
                      {m.price_label !== 'normal' ? m.price_label : 'Rp '+Number(m.price).toLocaleString('id-ID')}
                    </td>
                    <td style={{ padding:'0.875rem 1.25rem' }}>
                      <span style={{ display:'inline-block', padding:'0.2rem 0.6rem', borderRadius:'20px', fontSize:'0.68rem', fontFamily:'var(--font-heading)', fontWeight:600,
                        background: m.is_active ? 'rgba(0,200,100,0.1)' : 'rgba(204,0,0,0.1)',
                        color: m.is_active ? '#00c864' : 'var(--red)',
                        border: `1px solid ${m.is_active ? '#00c86433' : 'var(--red-dark)'}` }}>
                        {m.is_active ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </td>
                  {canEdit && (
                    <td style={{ padding:'0.875rem 1.25rem' }}>
                      <div style={{ display:'flex', gap:'0.5rem' }}>
                        <button onClick={() => openEdit(m)} style={{ padding:'0.4rem', color:'var(--silver-dark)', borderRadius:'4px', transition:'all 0.2s' }}
                          onMouseEnter={e => { e.currentTarget.style.color='var(--white)'; e.currentTarget.style.background='#333'; }}
                          onMouseLeave={e => { e.currentTarget.style.color='var(--silver-dark)'; e.currentTarget.style.background='transparent'; }}>
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => del(m.id, m.name_models)} style={{ padding:'0.4rem', color:'var(--silver-dark)', borderRadius:'4px', transition:'all 0.2s' }}
                          onMouseEnter={e => { e.currentTarget.style.color='var(--red)'; e.currentTarget.style.background='rgba(204,0,0,0.1)'; }}
                          onMouseLeave={e => { e.currentTarget.style.color='var(--silver-dark)'; e.currentTarget.style.background='transparent'; }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', zIndex:2000, display:'flex', alignItems:'flex-start', justifyContent:'center', padding:'2rem 1rem', overflowY:'auto' }}>
          <div style={{ background:'var(--black-light)', border:'1px solid #333', borderRadius:'8px', width:'100%', maxWidth:560, animation:'fadeInUp 0.3s ease' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'1.5rem', borderBottom:'1px solid #1a1a1a' }}>
              <h2 style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'1.1rem' }}>{editing ? 'Edit Motor' : 'Tambah Motor Baru'}</h2>
              <button onClick={() => setModal(false)} style={{ color:'var(--silver-dark)' }}><X size={20} /></button>
            </div>
            <form onSubmit={save} style={{ padding:'1.5rem' }}>
              {error && <div style={{ background:'rgba(204,0,0,0.1)', border:'1px solid var(--red-dark)', borderRadius:'4px', padding:'0.75rem', color:'#ff6b6b', fontSize:'0.8rem', marginBottom:'1rem' }}>{error}</div>}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 1rem' }}>
                <div style={{ gridColumn:'1/-1' }}>{fld('name_models','Nama Model')}</div>
                {fld('type','Tipe Motor')}
                {fld('engine_cc','Kapasitas (CC)','number')}
                {fld('stroke','Stroke','text',[['4T','4-Tak'],['2T','2-Tak']])}
                {fld('power','Tenaga (HP)','number')}
                {fld('price_label','Label Harga','text',[['normal','Normal'],['prototype','Prototype'],['concept','Concept']])}
                {form.price_label === 'normal' && fld('price','Harga (Rp)','number')}
                {fld('brand_id','Brand','text', brands.map(b => [b.id, b.name]))}
                <div style={{ gridColumn:'1/-1' }}>{fld('description','Deskripsi','textarea')}</div>
                <div style={{ gridColumn:'1/-1' }}>{fld('thumbnail','Path Thumbnail')}</div>
                <div style={{ gridColumn:'1/-1', display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem' }}>
                  <input type="checkbox" id="is_active" checked={form.is_active} onChange={e => setForm({...form, is_active:e.target.checked})} style={{ width:'auto', accentColor:'var(--red)' }} />
                  <label htmlFor="is_active" style={{ fontFamily:'var(--font-heading)', fontSize:'0.8rem', color:'var(--silver)', cursor:'pointer' }}>Motor Aktif (tampil di katalog)</label>
                </div>
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
