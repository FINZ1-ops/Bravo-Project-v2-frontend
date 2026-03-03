import { Link } from 'react-router-dom';
import { Instagram, Youtube, Facebook, MapPin, Phone, Mail } from 'lucide-react';
import logoShield from '../assets/logo-shield.png';
import logoBravo from '../assets/logo-bravo.png';

export default function Footer() {
  return (
    <footer style={{ background:'var(--black-mid)', borderTop:'1px solid #1a1a1a', paddingTop:'4rem', paddingBottom:'1.5rem' }}>
      <div className="container">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'3rem', marginBottom:'3rem' }}>

          {/* Brand */}
          <div>
            {/* Logo utama (shield) */}
            <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1.25rem' }}>
              <img src={logoShield} alt="Bravo Motor"
                style={{ height:48, width:'auto', filter:'drop-shadow(0 0 8px rgba(204,0,0,0.35))' }} />
              <span style={{ fontFamily:'var(--font-display)', fontSize:'1.4rem', letterSpacing:'0.1em' }}>
                BRAVO<span style={{color:'var(--red)'}}>.</span>
              </span>
            </div>

            {/* Sub logo (bravo roda api) */}
            <img src={logoBravo} alt="Bravo"
              style={{
                height: 36, width:'auto', marginBottom:'1rem',
                filter:'brightness(0.9) drop-shadow(0 0 4px rgba(255,80,0,0.3))',
                opacity: 0.85,
              }} />

            <p style={{ color:'var(--silver-dark)', fontSize:'0.85rem', lineHeight:1.7, marginBottom:'1.5rem' }}>
              Brand motor performa tinggi buatan Indonesia.{' '}
              <em style={{color:'var(--silver)'}}>Performance Without Compromise.</em>
            </p>

            <div style={{ display:'flex', gap:'0.75rem' }}>
              {[Instagram, Youtube, Facebook].map((Icon, i) => (
                <a key={i} href="#" style={{
                  width:36, height:36, borderRadius:'3px',
                  border:'1px solid #333',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  color:'var(--silver-dark)', transition:'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='var(--red)'; e.currentTarget.style.color='var(--red)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='#333'; e.currentTarget.style.color='var(--silver-dark)'; }}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <h4 style={{ fontFamily:'var(--font-heading)', fontWeight:700, letterSpacing:'0.1em',
              textTransform:'uppercase', fontSize:'0.85rem', color:'var(--silver)', marginBottom:'1.25rem' }}>Navigasi</h4>
            {[['Home','/'],['Katalog Motor','/catalog'],['Berita','/news'],['Kontak','/contact']].map(([label, to]) => (
              <div key={label} style={{ marginBottom:'0.6rem' }}>
                <Link to={to} style={{ color:'var(--silver-dark)', fontSize:'0.9rem', transition:'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color='var(--red)'}
                  onMouseLeave={e => e.target.style.color='var(--silver-dark)'}>{label}</Link>
              </div>
            ))}
          </div>

          {/* Seri Motor */}
          <div>
            <h4 style={{ fontFamily:'var(--font-heading)', fontWeight:700, letterSpacing:'0.1em',
              textTransform:'uppercase', fontSize:'0.85rem', color:'var(--silver)', marginBottom:'1.25rem' }}>Seri Motor</h4>
            {['Evo Series','Leo Series','Trail Series','Bebek Sport','Cruiser','Prototype'].map(s => (
              <div key={s} style={{ marginBottom:'0.6rem' }}>
                <Link to="/catalog" style={{ color:'var(--silver-dark)', fontSize:'0.9rem', transition:'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color='var(--red)'}
                  onMouseLeave={e => e.target.style.color='var(--silver-dark)'}>{s}</Link>
              </div>
            ))}
          </div>

          {/* Kontak */}
          <div>
            <h4 style={{ fontFamily:'var(--font-heading)', fontWeight:700, letterSpacing:'0.1em',
              textTransform:'uppercase', fontSize:'0.85rem', color:'var(--silver)', marginBottom:'1.25rem' }}>Kontak</h4>
            {[
              [MapPin, 'Jl. Performa No. 1, Indonesia'],
              [Phone, '+62 800-BRAVO-1'],
              [Mail, 'info@bravomotor.com'],
            ].map(([Icon, text]) => (
              <div key={text} style={{ display:'flex', gap:'0.75rem', alignItems:'flex-start', marginBottom:'0.75rem' }}>
                <Icon size={15} style={{ color:'var(--red)', marginTop:'0.2rem', flexShrink:0 }} />
                <span style={{ color:'var(--silver-dark)', fontSize:'0.85rem' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop:'1px solid #1a1a1a', paddingTop:'1.5rem',
          display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
            <img src={logoShield} alt="" style={{ height:22, opacity:0.5 }} />
            <span style={{ color:'var(--silver-dark)', fontSize:'0.8rem' }}>
              © 2026 Bravo Motor. All rights reserved.
            </span>
          </div>
          <span style={{ color:'#333', fontSize:'0.75rem', fontFamily:'var(--font-heading)', letterSpacing:'0.12em' }}>
            PERFORMANCE WITHOUT COMPROMISE
          </span>
        </div>
      </div>
    </footer>
  );
}
