import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getNewsById } from '../api/news';
import { Calendar, ChevronLeft } from 'lucide-react';

export default function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNewsById(id).then(r => { setNews(r.data.data); setLoading(false); }).catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="page-wrapper"><div className="spinner" /></div>;
  if (!news) return (
    <div className="page-wrapper" style={{ textAlign:'center', padding:'6rem 0' }}>
      <h2 style={{ fontFamily:'var(--font-display)', fontSize:'3rem' }}>BERITA <span style={{color:'var(--red)'}}>TIDAK DITEMUKAN</span></h2>
      <Link to="/news" className="btn btn-red" style={{ marginTop:'2rem', display:'inline-flex' }}>Kembali</Link>
    </div>
  );

  return (
    <div className="page-wrapper">
      <div className="container" style={{ maxWidth:780, padding:'3rem 1.5rem' }}>
        <Link to="/news" style={{ display:'inline-flex', alignItems:'center', gap:'0.4rem', color:'var(--silver-dark)', fontSize:'0.85rem', marginBottom:'2rem',
          fontFamily:'var(--font-heading)', letterSpacing:'0.08em', textTransform:'uppercase' }}>
          <ChevronLeft size={14} /> Semua Berita
        </Link>
        <div style={{ height:300, background:'linear-gradient(135deg,#111,#1a1a1a)', borderRadius:'8px',
          display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'2.5rem', border:'1px solid #222' }}>
          <span style={{ fontFamily:'var(--font-display)', fontSize:'5rem', color:'#1e1e1e' }}>BRAVO</span>
        </div>
        <div className="tag">Berita</div>
        <h1 style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'clamp(1.5rem, 3vw, 2.5rem)', lineHeight:1.2, margin:'0.5rem 0 1rem' }}>{news.title}</h1>
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', color:'var(--silver-dark)', fontSize:'0.8rem', marginBottom:'2rem' }}>
          <Calendar size={13} /> {news.published_at}
        </div>
        <div className="divider" />
        <p style={{ color:'var(--silver)', fontSize:'1rem', lineHeight:1.9, whiteSpace:'pre-wrap' }}>{news.content}</p>
      </div>
    </div>
  );
}
