import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMotorcycleById } from '../api/motorcycles';
import { Zap, Gauge, ChevronLeft, Phone, Info } from 'lucide-react';

const fmt = (price, label) => {
  if (label === 'prototype') return 'Prototype — Tidak dijual';
  if (label === 'concept') return 'Concept Only';
  return 'Rp ' + Number(price).toLocaleString('id-ID');
};

export default function MotorcycleDetail() {
  const { id } = useParams();
  const [motor, setMotor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [priceDisplay, setPriceDisplay] = useState('');

  useEffect(() => {
    getMotorcycleById(id)
      .then(r => { setMotor(r.data.data); setPriceDisplay(r.data.data.price_display); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="page-wrapper"><div className="spinner" /></div>;
  if (!motor) return (
    <div className="page-wrapper" style={{ textAlign:'center', padding:'6rem 0' }}>
      <h2 style={{ fontFamily:'var(--font-display)', fontSize:'3rem' }}>MOTOR <span style={{color:'var(--red)'}}>TIDAK DITEMUKAN</span></h2>
      <Link to="/catalog" className="btn btn-red" style={{ marginTop:'2rem', display:'inline-flex' }}>Kembali ke Katalog</Link>
    </div>
  );

  return (
    <div className="page-wrapper">
      <div className="container" style={{ padding:'3rem 1.5rem' }}>
        {/* Breadcrumb */}
        <Link to="/catalog" style={{ display:'inline-flex', alignItems:'center', gap:'0.4rem', color:'var(--silver-dark)', fontSize:'0.85rem', marginBottom:'2rem',
          fontFamily:'var(--font-heading)', letterSpacing:'0.08em', textTransform:'uppercase' }}>
          <ChevronLeft size={14} /> Kembali ke Katalog
        </Link>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'start' }}>
          {/* Left: Image */}
          <div>
            <div style={{
              background:'linear-gradient(135deg,#111,#1a1a1a)', borderRadius:'8px',
              height:380, display:'flex', alignItems:'center', justifyContent:'center',
              border:'1px solid #222', position:'relative', overflow:'hidden',
            }}>
              <div style={{ position:'absolute', top:0, right:0, width:0, height:0,
                borderStyle:'solid', borderWidth:'0 120px 120px 0',
                borderColor:'transparent var(--red-dark) transparent transparent', opacity:0.2 }} />
              {motor.thumbnail
                ? <img src={`http://localhost:8000/storage/${motor.thumbnail}`} alt={motor.name_models}
                    style={{ width:'100%', height:'100%', objectFit:'cover', borderRadius:'8px' }}
                    onError={e => { e.target.style.display='none'; }} />
                : <span style={{ fontFamily:'var(--font-display)', fontSize:'5rem', color:'#222' }}>B</span>
              }
              {motor.stroke === '2T' && (
                <div style={{ position:'absolute', top:'1rem', left:'1rem', background:'var(--red)', color:'#fff',
                  fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'0.7rem', letterSpacing:'0.1em',
                  padding:'0.3rem 0.7rem', borderRadius:'3px' }}>2-TAK</div>
              )}
            </div>
          </div>

          {/* Right: Info */}
          <div>
            <div className="tag">{motor.type}</div>
            <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2rem, 4vw, 3rem)', lineHeight:1.1, marginBottom:'0.75rem' }}>
              {motor.name_models}
            </h1>
            {motor.brand && (
              <p style={{ color:'var(--silver-dark)', fontSize:'0.85rem', marginBottom:'1.5rem', fontFamily:'var(--font-heading)', letterSpacing:'0.08em' }}>
                by {motor.brand.name}
              </p>
            )}

            {/* Specs grid */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginBottom:'2rem' }}>
              {[
                { label:'Kapasitas Mesin', value:`${motor.engine_cc} cc`, icon: Gauge },
                { label:'Jenis Stroke', value: motor.stroke === '2T' ? '2-Tak' : '4-Tak', icon: Zap },
                ...(motor.power ? [{ label:'Tenaga', value:`${motor.power} HP`, icon: Zap }] : []),
                { label:'Tipe', value: motor.type, icon: Info },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} style={{ background:'var(--black-light)', border:'1px solid #222', borderRadius:'6px', padding:'1rem' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.4rem' }}>
                    <Icon size={13} style={{ color:'var(--red)' }} />
                    <span style={{ fontFamily:'var(--font-heading)', fontSize:'0.7rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--silver-dark)' }}>{label}</span>
                  </div>
                  <span style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'1rem', color:'var(--white)' }}>{value}</span>
                </div>
              ))}
            </div>

            {/* Price */}
            <div style={{ padding:'1.25rem', background:'rgba(204,0,0,0.07)', border:'1px solid var(--red-dark)', borderRadius:'6px', marginBottom:'2rem' }}>
              <div style={{ fontFamily:'var(--font-heading)', fontSize:'0.7rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--silver-dark)', marginBottom:'0.4rem' }}>Harga</div>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'2rem', color: motor.price_label === 'normal' ? 'var(--red)' : 'var(--silver)' }}>
                {priceDisplay || fmt(motor.price, motor.price_label)}
              </div>
            </div>

            {/* Description */}
            {motor.description && (
              <p style={{ color:'var(--silver-dark)', lineHeight:1.8, marginBottom:'2rem', fontSize:'0.9rem' }}>{motor.description}</p>
            )}

            <Link to="/contact" className="btn btn-red" style={{ width:'100%', justifyContent:'center', padding:'0.9rem' }}>
              <Phone size={16} /> Hubungi Dealer
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
