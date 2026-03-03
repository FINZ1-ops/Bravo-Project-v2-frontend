import logoShield from '../assets/logo-shield.png';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LayoutDashboard, Bike, Newspaper, Tag, LogOut, Menu, X, ChevronRight } from 'lucide-react';
import { getUser } from '../utils/cookies';

export default function AdminLayout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  
  // Tambahan ini:
  const currentUser = getUser();
  const isAdmin = currentUser?.role === 'admin';

  const navItems = [
    { to:'/admin',             label:'Dashboard', icon:LayoutDashboard, exact:true },
    { to:'/admin/motorcycles', label:'Motor',     icon:Bike },
    { to:'/admin/news',        label:'Berita',    icon:Newspaper },
    // Brand hanya tampil untuk admin
    ...(isAdmin ? [{ to:'/admin/brands', label:'Brand', icon:Tag }] : []),
  ];

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'var(--black)' }}>
      {/* Sidebar */}
      <aside style={{
        width: collapsed ? 64 : 240, flexShrink:0,
        background:'var(--black-mid)', borderRight:'1px solid #1a1a1a',
        display:'flex', flexDirection:'column',
        transition:'width 0.3s ease', overflow:'hidden',
        position:'sticky', top:0, height:'100vh',
      }}>
        {/* Logo */}
        <div style={{ padding:'1.5rem 1.25rem', borderBottom:'1px solid #1a1a1a', display:'flex', alignItems:'center', gap:'0.75rem', minWidth:240 }}>
          <img src={logoShield} alt="Bravo Motor"
            style={{ height:32, width:'auto', flexShrink:0, filter:'drop-shadow(0 0 4px rgba(204,0,0,0.4))' }} />
          {!collapsed && <span style={{ fontFamily:'var(--font-display)', fontSize:'1.2rem', letterSpacing:'0.1em', whiteSpace:'nowrap' }}>
            BRAVO<span style={{color:'var(--red)'}}>.</span>
          </span>}
          <button onClick={() => setCollapsed(!collapsed)} style={{ marginLeft:'auto', color:'var(--silver-dark)', flexShrink:0 }}>
            {collapsed ? <ChevronRight size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:'1rem 0' }}>
          {navItems.map(({ to, label, icon:Icon, exact }) => (
            <Link key={to} to={to} title={label} style={{
              display:'flex', alignItems:'center', gap:'0.875rem',
              padding:'0.75rem 1.25rem', margin:'0.15rem 0.75rem', borderRadius:'6px',
              fontFamily:'var(--font-heading)', fontWeight:600, fontSize:'0.85rem',
              letterSpacing:'0.06em', whiteSpace:'nowrap', overflow:'hidden',
              background: isActive({to,exact}) ? 'rgba(204,0,0,0.12)' : 'transparent',
              color: isActive({to,exact}) ? 'var(--red)' : 'var(--silver-dark)',
              borderLeft: isActive({to,exact}) ? '2px solid var(--red)' : '2px solid transparent',
              transition:'all 0.2s',
            }}
            onMouseEnter={e => { if (!isActive({to,exact})) e.currentTarget.style.background='rgba(255,255,255,0.04)'; }}
            onMouseLeave={e => { if (!isActive({to,exact})) e.currentTarget.style.background='transparent'; }}>
              <Icon size={18} style={{ flexShrink:0 }} />
              {!collapsed && label}
            </Link>
          ))}
        </nav>

        {/* User + Logout */}
        <div style={{ padding:'1rem 1.25rem', borderTop:'1px solid #1a1a1a' }}>
                {!collapsed && currentUser && (
        <div style={{ marginBottom:'0.75rem' }}>
          <div style={{
            fontFamily:'var(--font-heading)', fontWeight:600,
            fontSize:'0.85rem', color:'var(--white)',
            whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'
          }}>
            {currentUser.name}
          </div>
          <div style={{
            display:'inline-block', marginTop:'0.3rem',
            fontSize:'0.65rem', fontFamily:'var(--font-heading)', fontWeight:700,
            letterSpacing:'0.1em', textTransform:'uppercase',
            padding:'0.15rem 0.5rem', borderRadius:'3px',
            background: isAdmin ? 'rgba(204,0,0,0.15)' : 'rgba(100,100,255,0.1)',
            color: isAdmin ? 'var(--red)' : '#8888ff',
            border: `1px solid ${isAdmin ? 'var(--red-dark)' : '#4444aa'}`,
          }}>
            {currentUser.role?.toUpperCase()}
          </div>
        </div>
      )}
          <button onClick={logout} title="Logout" style={{
            display:'flex', alignItems:'center', gap:'0.75rem', width:'100%',
            padding:'0.6rem 0', color:'var(--silver-dark)', fontFamily:'var(--font-heading)',
            fontSize:'0.8rem', letterSpacing:'0.08em', transition:'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color='var(--red)'}
          onMouseLeave={e => e.currentTarget.style.color='var(--silver-dark)'}>
            <LogOut size={16} style={{ flexShrink:0 }} />
            {!collapsed && 'Logout'}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex:1, overflow:'auto' }}>
        {children}
      </main>
    </div>
  );
}
