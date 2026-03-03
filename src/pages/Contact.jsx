import { useState } from 'react';
import { sendContact } from '../api/contact';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', message:'' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault(); setLoading(true); setError('');
    try {
      await sendContact(form);
      setSuccess(true);
      setForm({ name:'', email:'', message:'' });
    } catch(err) {
      setError(err.response?.data?.message || 'Gagal mengirim pesan. Coba lagi.');
    } finally { setLoading(false); }
  };

  return (
    <div className="page-wrapper">
      <div style={{ padding:'4rem 0 3rem', background:'linear-gradient(180deg,#0f0f0f,var(--black))', borderBottom:'1px solid #1a1a1a' }}>
        <div className="container">
          <div className="tag">Hubungi Kami</div>
          <h1 className="section-title">GET IN <span>TOUCH</span></h1>
          <div className="divider" />
        </div>
      </div>

      <div className="container" style={{ padding:'4rem 1.5rem' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.5fr', gap:'4rem', alignItems:'start' }}>
          {/* Left Info */}
          <div>
            <h2 style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'1.3rem', marginBottom:'1rem' }}>Dealer Bravo Motor</h2>
            <p style={{ color:'var(--silver-dark)', fontSize:'0.9rem', lineHeight:1.8, marginBottom:'2rem' }}>
              Kami siap membantu kamu menemukan motor yang tepat, menjadwalkan test ride, atau menjawab pertanyaan apapun tentang lineup Bravo Motor.
            </p>
            {[
              [MapPin, 'Jl. Performa No. 1, Indonesia'],
              [Phone, '+62 800-BRAVO-1'],
              [Mail, 'info@bravomotor.com'],
            ].map(([Icon, text]) => (
              <div key={text} style={{ display:'flex', gap:'1rem', alignItems:'flex-start', marginBottom:'1.25rem' }}>
                <div style={{ width:38, height:38, background:'rgba(204,0,0,0.1)', border:'1px solid var(--red-dark)',
                  borderRadius:'6px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <Icon size={16} style={{ color:'var(--red)' }} />
                </div>
                <div style={{ paddingTop:'0.5rem', color:'var(--silver)', fontSize:'0.9rem' }}>{text}</div>
              </div>
            ))}

            {/* Jam operasional */}
            <div style={{ marginTop:'2rem', padding:'1.25rem', background:'var(--black-light)', border:'1px solid #222', borderRadius:'6px' }}>
              <h4 style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'0.85rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--silver)', marginBottom:'0.75rem' }}>Jam Operasional</h4>
              {[['Senin — Jumat','08:00 — 17:00'],['Sabtu','08:00 — 15:00'],['Minggu','Tutup']].map(([d,h]) => (
                <div key={d} style={{ display:'flex', justifyContent:'space-between', fontSize:'0.85rem', marginBottom:'0.4rem' }}>
                  <span style={{ color:'var(--silver-dark)' }}>{d}</span>
                  <span style={{ color: h === 'Tutup' ? 'var(--red)' : 'var(--white)', fontFamily:'var(--font-heading)', fontWeight:600 }}>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Form */}
          <div style={{ background:'var(--black-light)', border:'1px solid #222', borderRadius:'8px', padding:'2.5rem' }}>
            {success ? (
              <div style={{ textAlign:'center', padding:'2rem 0' }}>
                <CheckCircle size={48} style={{ color:'var(--red)', margin:'0 auto 1rem' }} />
                <h3 style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'1.3rem', marginBottom:'0.5rem' }}>Pesan Terkirim!</h3>
                <p style={{ color:'var(--silver-dark)', fontSize:'0.9rem' }}>Tim kami akan menghubungi kamu segera.</p>
                <button onClick={() => setSuccess(false)} className="btn btn-red" style={{ marginTop:'1.5rem' }}>Kirim Pesan Lain</button>
              </div>
            ) : (
              <form onSubmit={submit}>
                <h3 style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'1.2rem', marginBottom:'1.75rem' }}>Kirim Pesan</h3>
                {error && <div style={{ background:'rgba(204,0,0,0.1)', border:'1px solid var(--red-dark)', borderRadius:'4px', padding:'0.75rem 1rem', color:'var(--red)', fontSize:'0.85rem', marginBottom:'1.25rem' }}>{error}</div>}
                
                <div style={{ marginBottom:'1.25rem' }}>
                  <label style={{ display:'block', fontFamily:'var(--font-heading)', fontWeight:600, fontSize:'0.8rem', letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--silver)', marginBottom:'0.5rem' }}>Nama Lengkap</label>
                  <input name="name" value={form.name} onChange={handle} placeholder="Nama kamu" required />
                </div>
                <div style={{ marginBottom:'1.25rem' }}>
                  <label style={{ display:'block', fontFamily:'var(--font-heading)', fontWeight:600, fontSize:'0.8rem', letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--silver)', marginBottom:'0.5rem' }}>Email</label>
                  <input name="email" type="email" value={form.email} onChange={handle} placeholder="email@kamu.com" required />
                </div>
                <div style={{ marginBottom:'1.75rem' }}>
                  <label style={{ display:'block', fontFamily:'var(--font-heading)', fontWeight:600, fontSize:'0.8rem', letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--silver)', marginBottom:'0.5rem' }}>Pesan</label>
                  <textarea name="message" value={form.message} onChange={handle} placeholder="Tulis pesanmu di sini..." required rows={5} style={{ resize:'vertical' }} />
                </div>
                <button type="submit" className="btn btn-red" style={{ width:'100%', justifyContent:'center', padding:'0.9rem' }} disabled={loading}>
                  {loading ? 'Mengirim...' : <><Send size={16} /> Kirim Pesan</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){div[style*="grid-template-columns: 1fr 1.5fr"]{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}
