import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { adminGetMotorcycles } from '../../api/motorcycles';
import { adminGetNews } from '../../api/news';
import { adminGetBrands } from '../../api/brands';
import { getUser } from '../../utils/cookies';
import { Bike, Newspaper, Tag, TrendingUp, ArrowRight } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ motors:0, news:0, brands:0 });
  const [recentMotors, setRecentMotors] = useState([]);
  const user = getUser();

  useEffect(() => {
    Promise.all([adminGetMotorcycles(), adminGetNews(), adminGetBrands()])
      .then(([m, n, b]) => {
        setStats({ motors: m.data.total, news: n.data.total, brands: b.data.data.length });
        setRecentMotors(m.data.data.slice(-5).reverse());
      }).catch(() => {});
  }, []);

  const cards = [
    { label:'Total Motor', value:stats.motors, icon:Bike, to:'/admin/motorcycles', color:'#cc0000' },
    { label:'Total Berita', value:stats.news, icon:Newspaper, to:'/admin/news', color:'#888' },
    { label:'Brand', value:stats.brands, icon:Tag, to:'/admin/brands', color:'#555' },
  ];

  return (
    <AdminLayout>
      <div style={{ padding:'2.5rem' }}>
        {/* Header */}
        <div style={{ marginBottom:'2.5rem' }}>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'2.2rem', letterSpacing:'0.05em', marginBottom:'0.25rem' }}>
            DASHBOARD
          </h1>
          <p style={{ color:'var(--silver-dark)', fontSize:'0.875rem' }}>
            Selamat datang kembali, <span style={{ color:'var(--white)', fontWeight:600 }}>{user?.name || 'Admin'}</span>
          </p>
        </div>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'1.25rem', marginBottom:'3rem' }}>
          {cards.map(({ label, value, icon:Icon, to, color }) => (
            <Link key={label} to={to} style={{
              display:'block', background:'var(--black-light)', border:'1px solid #222', borderRadius:'8px',
              padding:'1.5rem', transition:'all 0.25s', textDecoration:'none',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor=color; e.currentTarget.style.transform='translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='#222'; e.currentTarget.style.transform='none'; }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1rem' }}>
                <div style={{ width:42, height:42, background:`rgba(${color==='#cc0000'?'204,0,0':'136,136,136'},0.1)`,
                  border:`1px solid ${color}33`, borderRadius:'8px',
                  display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <TrendingUp size={14} style={{ color:'var(--silver-dark)' }} />
              </div>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'2.5rem', color:'var(--white)', lineHeight:1 }}>{value}</div>
              <div style={{ fontFamily:'var(--font-heading)', fontSize:'0.75rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--silver-dark)', marginTop:'0.4rem' }}>{label}</div>
            </Link>
          ))}
        </div>

        {/* Recent Motors */}
        <div style={{ background:'var(--black-light)', border:'1px solid #222', borderRadius:'8px', overflow:'hidden' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'1.25rem 1.5rem', borderBottom:'1px solid #1a1a1a' }}>
            <h3 style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'0.9rem', letterSpacing:'0.08em', textTransform:'uppercase' }}>Motor Terbaru</h3>
            <Link to="/admin/motorcycles" style={{ display:'flex', alignItems:'center', gap:'0.3rem', color:'var(--red)', fontSize:'0.8rem', fontFamily:'var(--font-heading)', fontWeight:600, letterSpacing:'0.08em' }}>
              Lihat Semua <ArrowRight size={13} />
            </Link>
          </div>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ borderBottom:'1px solid #1a1a1a' }}>
                {['Model', 'Tipe', 'CC', 'Harga', 'Status'].map(h => (
                  <th key={h} style={{ padding:'0.75rem 1.5rem', textAlign:'left', fontFamily:'var(--font-heading)', fontSize:'0.7rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--silver-dark)', fontWeight:600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentMotors.map((m, i) => (
                <tr key={m.id} style={{ borderBottom: i < recentMotors.length-1 ? '1px solid #1a1a1a' : 'none' }}>
                  <td style={{ padding:'0.875rem 1.5rem', fontFamily:'var(--font-heading)', fontWeight:600, fontSize:'0.875rem' }}>{m.name_models}</td>
                  <td style={{ padding:'0.875rem 1.5rem', color:'var(--silver-dark)', fontSize:'0.8rem' }}>{m.type}</td>
                  <td style={{ padding:'0.875rem 1.5rem', color:'var(--silver-dark)', fontSize:'0.8rem' }}>{m.engine_cc}cc</td>
                  <td style={{ padding:'0.875rem 1.5rem', color: m.price_label==='normal' ? 'var(--red)' : 'var(--silver-dark)', fontFamily:'var(--font-heading)', fontWeight:600, fontSize:'0.8rem' }}>
                    {m.price_label !== 'normal' ? m.price_label : 'Rp '+Number(m.price).toLocaleString('id-ID')}
                  </td>
                  <td style={{ padding:'0.875rem 1.5rem' }}>
                    <span style={{ display:'inline-block', padding:'0.2rem 0.6rem', borderRadius:'20px', fontSize:'0.7rem', fontFamily:'var(--font-heading)', fontWeight:600, letterSpacing:'0.06em',
                      background: m.is_active ? 'rgba(0,200,100,0.1)' : 'rgba(204,0,0,0.1)',
                      color: m.is_active ? '#00c864' : 'var(--red)',
                      border: `1px solid ${m.is_active ? '#00c86433' : 'var(--red-dark)'}` }}>
                      {m.is_active ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
