import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHome } from '../api/home';
import MotorcycleCard from '../components/MotorcycleCard';
import { ChevronRight, Zap, Shield, Trophy, ArrowRight } from 'lucide-react';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHome().then(r => { setData(r.data.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* HERO */}
      <section style={{
        minHeight: '100vh', position:'relative', display:'flex', alignItems:'center',
        background:'linear-gradient(160deg, #0a0a0a 0%, #0f0f0f 40%, #140000 100%)',
        overflow:'hidden',
      }}>
        {/* BG decorative grid */}
        <div style={{
          position:'absolute', inset:0, zIndex:0,
          backgroundImage:`
            linear-gradient(rgba(204,0,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(204,0,0,0.04) 1px, transparent 1px)`,
          backgroundSize:'60px 60px',
        }} />
        {/* Red glow */}
        <div style={{
          position:'absolute', top:'20%', right:'10%',
          width:500, height:500, borderRadius:'50%',
          background:'radial-gradient(circle, rgba(204,0,0,0.12) 0%, transparent 70%)',
          filter:'blur(40px)', zIndex:0,
        }} />

        <div className="container" style={{ position:'relative', zIndex:1, paddingTop:'6rem', paddingBottom:'4rem' }}>
          <div style={{ maxWidth:720, animation:'fadeInUp 0.8s ease forwards' }}>
            <div className="tag">Brand Motor Indonesia</div>
            <h1 style={{
              fontFamily:'var(--font-display)',
              fontSize:'clamp(3.5rem, 8vw, 7rem)',
              lineHeight:0.9, letterSpacing:'0.02em',
              marginBottom:'1.5rem',
            }}>
              PERFORMA<br />
              <span style={{ color:'var(--red)', WebkitTextStroke:'1px var(--red-dark)' }}>TANPA</span><br />
              KOMPROMI
            </h1>
            <p style={{ color:'var(--silver)', fontSize:'1.05rem', maxWidth:520, lineHeight:1.8, marginBottom:'2.5rem' }}>
              Dari bebek sport hingga hyperbike 1400cc — setiap Bravo dirancang untuk mereka yang tidak pernah menerima yang biasa-biasa saja.
            </p>
            <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
              <Link to="/catalog" className="btn btn-red">
                Lihat Lineup <ChevronRight size={16} />
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Hubungi Kami
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div style={{
            display:'flex', gap:'3rem', marginTop:'5rem', flexWrap:'wrap',
            animation:'fadeInUp 1s 0.3s ease both',
          }}>
            {[
              { num: '22', label:'Model Motor' },
              { num: '1400', label:'CC Tertinggi' },
              { num: '295', label:'HP Tertinggi' },
            ].map(({ num, label }) => (
              <div key={label}>
                <div style={{ fontFamily:'var(--font-display)', fontSize:'3rem', color:'var(--red)', lineHeight:1 }}>{num}</div>
                <div style={{ fontFamily:'var(--font-heading)', fontSize:'0.75rem', color:'var(--silver-dark)', letterSpacing:'0.12em', textTransform:'uppercase' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position:'absolute', bottom:'2rem', left:'50%', transform:'translateX(-50%)',
          display:'flex', flexDirection:'column', alignItems:'center', gap:'0.5rem',
          animation:'fadeIn 2s ease',
        }}>
          <div style={{ width:1, height:50, background:'linear-gradient(to bottom, transparent, var(--red))' }} />
          <span style={{ fontFamily:'var(--font-heading)', fontSize:'0.65rem', letterSpacing:'0.2em', color:'var(--silver-dark)', textTransform:'uppercase' }}>Scroll</span>
        </div>
      </section>

      {/* FEATURED MOTORS */}
      <section style={{ padding:'6rem 0', background:'var(--black)' }}>
        <div className="container">
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'3rem', flexWrap:'wrap', gap:'1rem' }}>
            <div>
              <div className="tag">Lineup Terbaru</div>
              <h2 className="section-title">MOTOR <span>UNGGULAN</span></h2>
              <div className="divider" />
            </div>
            <Link to="/catalog" className="btn btn-ghost" style={{ gap:'0.4rem' }}>
              Lihat Semua <ArrowRight size={15} />
            </Link>
          </div>

          {loading ? <div className="spinner" /> : (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'1.5rem' }}>
              {(data?.featured_models || []).map(m => <MotorcycleCard key={m.id} motor={m} />)}
            </div>
          )}
        </div>
      </section>

      {/* WHY BRAVO */}
      <section style={{ padding:'6rem 0', background:'var(--black-mid)' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:'4rem' }}>
            <div className="tag">Mengapa Bravo?</div>
            <h2 className="section-title">DNA <span>KAMI</span></h2>
            <div className="divider" style={{ margin:'1rem auto 0' }} />
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))', gap:'2rem' }}>
            {[
              { Icon: Zap, title:'Performa Ekstrem', desc:'Dari 125cc hingga 1400cc, setiap mesin Bravo dirancang dengan standar balap untuk pengalaman berkendara yang tak terlupakan.' },
              { Icon: Shield, title:'Teknologi Terdepan', desc:'Suspensi fully adjustable, rem Brembo, dan sistem elektronik canggih menjadi standar di seluruh lineup kami.' },
              { Icon: Trophy, title:'Warisan Balap', desc:'Program MotoGP kami, Shark Q, membuktikan komitmen Bravo Motor dalam dunia motorsport tingkat dunia.' },
            ].map(({ Icon, title, desc }) => (
              <div key={title} style={{ padding:'2rem', background:'var(--black-light)', border:'1px solid #1e1e1e', borderRadius:'6px', transition:'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='var(--red-dark)'; e.currentTarget.style.transform='translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='#1e1e1e'; e.currentTarget.style.transform='none'; }}>
                <div style={{ width:48, height:48, background:'rgba(204,0,0,0.1)', border:'1px solid var(--red-dark)', borderRadius:'6px',
                  display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1.25rem' }}>
                  <Icon size={22} style={{ color:'var(--red)' }} />
                </div>
                <h3 style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'1.1rem', marginBottom:'0.75rem' }}>{title}</h3>
                <p style={{ color:'var(--silver-dark)', fontSize:'0.875rem', lineHeight:1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST NEWS */}
      {data?.latest_news?.length > 0 && (
        <section style={{ padding:'6rem 0', background:'var(--black)' }}>
          <div className="container">
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'3rem', flexWrap:'wrap', gap:'1rem' }}>
              <div>
                <div className="tag">Update Terbaru</div>
                <h2 className="section-title">BERITA <span>TERKINI</span></h2>
                <div className="divider" />
              </div>
              <Link to="/news" className="btn btn-ghost">Semua Berita <ArrowRight size={15} /></Link>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:'1.5rem' }}>
              {data.latest_news.map(n => (
                <Link key={n.id} to={`/news/${n.id}`} className="card" style={{ display:'block', overflow:'hidden' }}>
                  <div style={{ height:180, background:'linear-gradient(135deg,#111,#1a1a1a)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <span style={{ fontFamily:'var(--font-display)', fontSize:'2rem', color:'#222' }}>BRAVO</span>
                  </div>
                  <div style={{ padding:'1.25rem' }}>
                    <span style={{ fontFamily:'var(--font-heading)', fontSize:'0.7rem', color:'var(--red)', letterSpacing:'0.1em', textTransform:'uppercase' }}>
                      {n.published_at}
                    </span>
                    <h3 style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'1rem', marginTop:'0.4rem', lineHeight:1.3, color:'var(--white)' }}>{n.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{
        padding:'6rem 0', textAlign:'center',
        background:'linear-gradient(135deg, #0a0a0a 0%, #140000 50%, #0a0a0a 100%)',
        position:'relative', overflow:'hidden',
      }}>
        <div style={{
          position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
          width:600, height:600, borderRadius:'50%',
          background:'radial-gradient(circle, rgba(204,0,0,0.08) 0%, transparent 70%)',
        }} />
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div className="tag">Test Drive</div>
          <h2 className="section-title" style={{ marginBottom:'1rem' }}>RASAKAN <span>PERBEDAANNYA</span></h2>
          <p style={{ color:'var(--silver)', maxWidth:480, margin:'0 auto 2.5rem', fontSize:'1rem' }}>
            Kunjungi dealer Bravo Motor terdekat dan jadwalkan test ride motor impianmu hari ini.
          </p>
          <Link to="/contact" className="btn btn-red" style={{ fontSize:'1rem', padding:'1rem 2.5rem' }}>
            Jadwalkan Test Ride <ChevronRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
