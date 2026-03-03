import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { isLoggedIn } from '../utils/cookies';
import logoShield from '../assets/logo-shield.png';

const links = [
  { to: '/',        label: 'Home' },
  { to: '/catalog', label: 'Motor' },
  { to: '/news',    label: 'Berita' },
  { to: '/contact', label: 'Kontak' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  const isActive = (to) => to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? '0.6rem 0' : '1.1rem 0',
        background: scrolled ? 'rgba(10,10,10,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #1e1e1e' : '1px solid transparent',
        transition: 'all 0.35s ease',
      }}>
        <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>

          {/* Logo */}
          <Link to="/" style={{ display:'flex', alignItems:'center', gap:'0.6rem' }}>
            <img
              src={logoShield}
              alt="Bravo Motor"
              style={{
                height: scrolled ? 38 : 44,
                width: 'auto',
                transition: 'height 0.35s ease',
                filter: 'drop-shadow(0 0 6px rgba(204,0,0,0.4))',
              }}
            />
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: scrolled ? '1.4rem' : '1.6rem',
              letterSpacing: '0.12em',
              color: 'var(--white)',
              transition: 'font-size 0.35s ease',
              lineHeight: 1,
            }}>
              BRAVO<span style={{ color:'var(--red)' }}>.</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div style={{ display:'flex', alignItems:'center', gap:'0.25rem' }} className="desktop-nav">
            {links.map(({ to, label }) => (
              <Link key={to} to={to} style={{
                fontFamily: 'var(--font-heading)', fontWeight: 600,
                fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '0.5rem 1rem', borderRadius: '3px',
                color: isActive(to) ? 'var(--red)' : 'var(--silver)',
                borderBottom: isActive(to) ? '2px solid var(--red)' : '2px solid transparent',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { if (!isActive(to)) e.target.style.color = 'var(--white)'; }}
              onMouseLeave={e => { if (!isActive(to)) e.target.style.color = 'var(--silver)'; }}
              >{label}</Link>
            ))}
            <Link
              to={isLoggedIn() ? '/admin' : '/admin/login'}
              style={{
                fontFamily: 'var(--font-heading)', fontWeight: 700,
                fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '0.45rem 1.1rem', marginLeft: '0.5rem',
                border: '1px solid var(--red)', borderRadius: '3px',
                color: 'var(--red)', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.target.style.background = 'var(--red)'; e.target.style.color = '#fff'; }}
              onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--red)'; }}
            >{isLoggedIn() ? 'Dashboard' : 'Admin'}</Link>
          </div>

          {/* Mobile Burger */}
          <button onClick={() => setOpen(!open)} className="mobile-burger"
            style={{ color:'var(--white)', display:'none' }}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div style={{
          position:'fixed', inset:0, zIndex:999,
          background:'rgba(0,0,0,0.97)',
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
          gap:'2rem', animation:'fadeIn 0.2s ease',
        }}>
          <button onClick={() => setOpen(false)}
            style={{ position:'absolute', top:'1.5rem', right:'1.5rem', color:'var(--silver)' }}>
            <X size={28} />
          </button>

          {/* Logo di drawer */}
          <img src={logoShield} alt="Bravo Motor" style={{ height:72, filter:'drop-shadow(0 0 12px rgba(204,0,0,0.5))' }} />

          {links.map(({ to, label }) => (
            <Link key={to} to={to} style={{
              fontFamily:'var(--font-display)', fontSize:'2.5rem', letterSpacing:'0.1em',
              color: isActive(to) ? 'var(--red)' : 'var(--white)',
            }}>{label}</Link>
          ))}
          <Link to={isLoggedIn() ? '/admin' : '/admin/login'}
            style={{
              fontFamily:'var(--font-heading)', fontSize:'1rem', letterSpacing:'0.12em',
              textTransform:'uppercase', padding:'0.6rem 2rem',
              border:'1px solid var(--red)', color:'var(--red)', borderRadius:'3px',
            }}>
            {isLoggedIn() ? 'Dashboard' : 'Admin'}
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-burger { display: block !important; }
        }
      `}</style>
    </>
  );
}
