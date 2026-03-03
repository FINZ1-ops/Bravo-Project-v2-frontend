import { Link } from 'react-router-dom';
import { Zap, ChevronRight } from 'lucide-react';

const formatPrice = (price, label) => {
  if (label === 'prototype') return 'Prototype';
  if (label === 'concept') return 'Concept Only';
  if (!price) return 'Hubungi Dealer';
  return 'Rp ' + Number(price).toLocaleString('id-ID');
};

export default function MotorcycleCard({ motor }) {
  return (
    <Link to={`/catalog/${motor.id}`} className="card" style={{ display:'block' }}>
      {/* Image area */}
      <div style={{
        height: 200, background:'linear-gradient(135deg, #111 0%, #1a1a1a 100%)',
        display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden',
      }}>
        {/* decorative diagonal line */}
        <div style={{
          position:'absolute', top:0, right:0,
          width:0, height:0,
          borderStyle:'solid', borderWidth:'0 80px 80px 0',
          borderColor:`transparent var(--red-dark) transparent transparent`,
          opacity:0.3,
        }} />
        {motor.thumbnail ? (
          <img src={`http://localhost:8000/storage/${motor.thumbnail}`} alt={motor.name_models}
            style={{ width:'100%', height:'100%', objectFit:'cover' }}
            onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
        ) : null}
        <div style={{
          display: motor.thumbnail ? 'none' : 'flex',
          flexDirection:'column', alignItems:'center', justifyContent:'center',
          position:'absolute', inset:0,
        }}>
          <span style={{ fontFamily:'var(--font-display)', fontSize:'3rem', color:'#222' }}>B</span>
          <span style={{ fontFamily:'var(--font-heading)', fontSize:'0.7rem', color:'#333', letterSpacing:'0.1em' }}>NO IMAGE</span>
        </div>

        {/* Badge stroke */}
        {motor.stroke === '2T' && (
          <div style={{
            position:'absolute', top:'0.75rem', left:'0.75rem',
            background:'var(--red)', color:'#fff',
            fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'0.65rem',
            letterSpacing:'0.1em', padding:'0.2rem 0.5rem', borderRadius:'2px',
          }}>2-TAK</div>
        )}

        {/* Badge prototype/concept */}
        {(motor.price_label === 'prototype' || motor.price_label === 'concept') && (
          <div style={{
            position:'absolute', bottom:'0.75rem', left:'0.75rem',
            background:'rgba(0,0,0,0.8)', color:'var(--silver)',
            fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'0.65rem',
            letterSpacing:'0.1em', padding:'0.2rem 0.5rem', border:'1px solid #444', borderRadius:'2px',
          }}>{motor.price_label.toUpperCase()}</div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding:'1.25rem' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'0.5rem' }}>
          <span style={{ fontFamily:'var(--font-heading)', fontSize:'0.7rem', fontWeight:600,
            letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--silver-dark)' }}>
            {motor.type}
          </span>
          <span style={{ display:'flex', alignItems:'center', gap:'0.2rem', color:'var(--silver-dark)', fontSize:'0.75rem' }}>
            <Zap size={11} style={{color:'var(--red)'}} />
            {motor.engine_cc}cc
          </span>
        </div>

        <h3 style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'1.1rem',
          color:'var(--white)', marginBottom:'0.75rem', lineHeight:1.2 }}>
          {motor.name_models}
        </h3>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{
            fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'0.95rem',
            color: motor.price_label === 'normal' ? 'var(--red)' : 'var(--silver-dark)',
          }}>
            {formatPrice(motor.price, motor.price_label)}
          </span>
          <ChevronRight size={16} style={{ color:'var(--red)' }} />
        </div>
      </div>
    </Link>
  );
}
