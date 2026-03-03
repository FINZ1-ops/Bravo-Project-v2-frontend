import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getNews } from '../api/news';
import { Calendar, ArrowRight } from 'lucide-react';

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNews().then(r => { setNews(r.data.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const [featured, ...rest] = news;

  return (
    <div className="page-wrapper">
      <div style={{ padding:'4rem 0 3rem', background:'linear-gradient(180deg,#0f0f0f,var(--black))', borderBottom:'1px solid #1a1a1a' }}>
        <div className="container">
          <div className="tag">Update Terbaru</div>
          <h1 className="section-title">BERITA <span>& INFO</span></h1>
          <div className="divider" />
        </div>
      </div>

      <div className="container" style={{ padding:'3rem 1.5rem' }}>
        {loading ? <div className="spinner" /> : news.length === 0 ? (
          <p style={{ textAlign:'center', color:'var(--silver-dark)', padding:'4rem 0' }}>Belum ada berita.</p>
        ) : (
          <>
            {/* Featured */}
            {featured && (
              <Link to={`/news/${featured.id}`} style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'3rem',
                background:'var(--black-light)', border:'1px solid #222', borderRadius:'8px', overflow:'hidden',
                marginBottom:'3rem', transition:'border-color 0.3s', textDecoration:'none' }}
                onMouseEnter={e => e.currentTarget.style.borderColor='var(--red-dark)'}
                onMouseLeave={e => e.currentTarget.style.borderColor='#222'}>
                <div style={{ height:300, background:'linear-gradient(135deg,#111,#1a1a1a)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <span style={{ fontFamily:'var(--font-display)', fontSize:'4rem', color:'#222' }}>BRAVO</span>
                </div>
                <div style={{ padding:'2.5rem 2.5rem 2.5rem 0', display:'flex', flexDirection:'column', justifyContent:'center' }}>
                  <div className="tag">Berita Utama</div>
                  <h2 style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'1.5rem', lineHeight:1.3, marginBottom:'1rem' }}>{featured.title}</h2>
                  <p style={{ color:'var(--silver-dark)', fontSize:'0.875rem', lineHeight:1.7, marginBottom:'1.5rem' }}>
                    {featured.content?.substring(0, 160)}...
                  </p>
                  <div style={{ display:'flex', alignItems:'center', gap:'1rem', justifyContent:'space-between' }}>
                    <span style={{ display:'flex', alignItems:'center', gap:'0.4rem', color:'var(--silver-dark)', fontSize:'0.8rem' }}>
                      <Calendar size={12} /> {featured.published_at}
                    </span>
                    <span style={{ display:'flex', alignItems:'center', gap:'0.4rem', color:'var(--red)', fontFamily:'var(--font-heading)', fontSize:'0.8rem', fontWeight:700, letterSpacing:'0.08em' }}>
                      Baca Selengkapnya <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* Rest */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:'1.5rem' }}>
              {rest.map(n => (
                <Link key={n.id} to={`/news/${n.id}`} className="card" style={{ display:'block' }}>
                  <div style={{ height:180, background:'linear-gradient(135deg,#111,#1a1a1a)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <span style={{ fontFamily:'var(--font-display)', fontSize:'2.5rem', color:'#1e1e1e' }}>B</span>
                  </div>
                  <div style={{ padding:'1.25rem' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'0.4rem', color:'var(--silver-dark)', fontSize:'0.75rem', marginBottom:'0.5rem' }}>
                      <Calendar size={11} /> {n.published_at}
                    </div>
                    <h3 style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'1rem', lineHeight:1.3, marginBottom:'0.75rem' }}>{n.title}</h3>
                    <p style={{ color:'var(--silver-dark)', fontSize:'0.8rem', lineHeight:1.6 }}>{n.content?.substring(0, 100)}...</p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
      <style>{`@media(max-width:768px){a[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}
