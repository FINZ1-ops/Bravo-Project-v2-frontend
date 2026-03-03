import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { adminGetNews, adminCreateNews, adminUpdateNews, adminDeleteNews } from '../../api/news';
import { Plus, Pencil, Trash2, X, Save, Eye, EyeOff } from 'lucide-react';
import { getUser } from '../../utils/cookies';

const empty = { title:'', content:'', thumbnail:'', is_published:false, published_at:'' };

export default function AdminNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const canEdit = ['admin'].includes(getUser()?.role);

  const fetch = () => { setLoading(true); adminGetNews().then(r => { setNews(r.data.data); setLoading(false); }); };
  useEffect(() => { fetch(); }, []);

  const openCreate = () => { setEditing(null); setForm(empty); setError(''); setModal(true); };
  const openEdit = (n) => { setEditing(n.id); setForm({...empty, ...n, published_at: n.published_at || ''}); setError(''); setModal(true); };

  const save = async (e) => {
    e.preventDefault(); setSaving(true); setError('');
    try {
      if (editing) await adminUpdateNews(editing, form);
      else await adminCreateNews(form);
      setModal(false); fetch();
    } catch(err) { setError(err.response?.data?.message || 'Gagal menyimpan'); }
    finally { setSaving(false); }
  };

  const del = async (id, title) => {
    if (!confirm(`Hapus "${title}"?`)) return;
    await adminDeleteNews(id); fetch();
  };

  return (
    <AdminLayout>
      <div style={{ padding:'2.5rem' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem', flexWrap:'wrap', gap:'1rem' }}>
          <div>
            <h1 style={{ fontFamily:'var(--font-display)', fontSize:'2rem', letterSpacing:'0.05em' }}>KELOLA BERITA</h1>
            <p style={{ color:'var(--silver-dark)', fontSize:'0.85rem' }}>{news.length} artikel</p>
          </div>
          {canEdit && (<button onClick={openCreate} className="btn btn-red"><Plus size={16} /> Tambah Berita</button>)}
        </div>

        {loading ? <div className="spinner" /> :(
          <div style={{ background:'var(--black-light)', border:'1px solid #222', borderRadius:'8px', overflow:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', minWidth:600 }}>
              <thead>
                <tr style={{ borderBottom:'1px solid #1a1a1a' }}>
                  {['Judul', 'Tanggal', 'Status', ...(canEdit ? ['Aksi'] : [])].map(h => (
                    <th key={h} style={{ padding:'0.75rem 1.25rem', textAlign:'left', fontFamily:'var(--font-heading)', fontSize:'0.7rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--silver-dark)', fontWeight:600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {news.map((n, i) => (
                  <tr key={n.id} style={{ borderBottom: i < news.length-1 ? '1px solid #1a1a1a' : 'none' }}
                    onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.02)'}
                    onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                    <td style={{ padding:'0.875rem 1.25rem', fontFamily:'var(--font-heading)', fontWeight:600, fontSize:'0.875rem', maxWidth:320 }}>
                      <div style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{n.title}</div>
                    </td>
                    <td style={{ padding:'0.875rem 1.25rem', color:'var(--silver-dark)', fontSize:'0.8rem', whiteSpace:'nowrap' }}>{n.published_at || '—'}</td>
                    <td style={{ padding:'0.875rem 1.25rem' }}>
                      <span style={{ display:'inline-flex', alignItems:'center', gap:'0.3rem', padding:'0.2rem 0.6rem', borderRadius:'20px', fontSize:'0.68rem', fontFamily:'var(--font-heading)', fontWeight:600,
                        background: n.is_published ? 'rgba(0,200,100,0.1)' : 'rgba(136,136,136,0.1)',
                        color: n.is_published ? '#00c864' : 'var(--silver-dark)',
                        border: `1px solid ${n.is_published ? '#00c86433' : '#333'}` }}>
                        {n.is_published ? <Eye size={10} /> : <EyeOff size={10} />}
                        {n.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    {canEdit && (
                    <td style={{ padding:'0.875rem 1.25rem' }}>
                      <div style={{ display:'flex', gap:'0.5rem' }}>
                        <button onClick={() => openEdit(n)} style={{ padding:'0.4rem', color:'var(--silver-dark)', borderRadius:'4px', transition:'all 0.2s' }}
                          onMouseEnter={e => { e.currentTarget.style.color='var(--white)'; e.currentTarget.style.background='#333'; }}
                          onMouseLeave={e => { e.currentTarget.style.color='var(--silver-dark)'; e.currentTarget.style.background='transparent'; }}>
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => del(n.id, n.title)} style={{ padding:'0.4rem', color:'var(--silver-dark)', borderRadius:'4px', transition:'all 0.2s' }}
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

      {modal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', zIndex:2000, display:'flex', alignItems:'flex-start', justifyContent:'center', padding:'2rem 1rem', overflowY:'auto' }}>
          <div style={{ background:'var(--black-light)', border:'1px solid #333', borderRadius:'8px', width:'100%', maxWidth:560, animation:'fadeInUp 0.3s ease' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'1.5rem', borderBottom:'1px solid #1a1a1a' }}>
              <h2 style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'1.1rem' }}>{editing ? 'Edit Berita' : 'Tambah Berita'}</h2>
              <button onClick={() => setModal(false)} style={{ color:'var(--silver-dark)' }}><X size={20} /></button>
            </div>
            <form onSubmit={save} style={{ padding:'1.5rem' }}>
              {error && <div style={{ background:'rgba(204,0,0,0.1)', border:'1px solid var(--red-dark)', borderRadius:'4px', padding:'0.75rem', color:'#ff6b6b', fontSize:'0.8rem', marginBottom:'1rem' }}>{error}</div>}
              {[['title','Judul'],['thumbnail','Path Thumbnail']].map(([name,label]) => (
                <div key={name} style={{ marginBottom:'1rem' }}>
                  <label style={{ display:'block', fontFamily:'var(--font-heading)', fontSize:'0.72rem', letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--silver)', marginBottom:'0.35rem', fontWeight:600 }}>{label}</label>
                  <input value={form[name]} onChange={e => setForm({...form,[name]:e.target.value})} />
                </div>
              ))}
              <div style={{ marginBottom:'1rem' }}>
                <label style={{ display:'block', fontFamily:'var(--font-heading)', fontSize:'0.72rem', letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--silver)', marginBottom:'0.35rem', fontWeight:600 }}>Konten</label>
                <textarea value={form.content} onChange={e => setForm({...form,content:e.target.value})} rows={6} style={{ resize:'vertical' }} />
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginBottom:'1rem' }}>
                <div>
                  <label style={{ display:'block', fontFamily:'var(--font-heading)', fontSize:'0.72rem', letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--silver)', marginBottom:'0.35rem', fontWeight:600 }}>Tanggal Publish</label>
                  <input type="date" value={form.published_at} onChange={e => setForm({...form,published_at:e.target.value})} />
                </div>
                <div style={{ display:'flex', alignItems:'flex-end', paddingBottom:'0.25rem' }}>
                  <label style={{ display:'flex', alignItems:'center', gap:'0.5rem', cursor:'pointer' }}>
                    <input type="checkbox" checked={form.is_published} onChange={e => setForm({...form,is_published:e.target.checked})} style={{ width:'auto', accentColor:'var(--red)' }} />
                    <span style={{ fontFamily:'var(--font-heading)', fontSize:'0.8rem', color:'var(--silver)' }}>Publish Sekarang</span>
                  </label>
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
