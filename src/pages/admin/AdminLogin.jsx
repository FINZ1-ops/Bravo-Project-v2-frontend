import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Eye, EyeOff, LogIn } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@bravomotor.com');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (ok) navigate('/admin');
  };

  return (
    <div style={{
      minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
      background:'radial-gradient(ellipse at 50% 0%, rgba(204,0,0,0.1) 0%, var(--black) 60%)',
      position:'relative', overflow:'hidden',
    }}>
      {/* BG grid */}
      <div style={{ position:'absolute', inset:0,
        backgroundImage:`linear-gradient(rgba(204,0,0,0.03) 1px, transparent 1px),linear-gradient(90deg, rgba(204,0,0,0.03) 1px, transparent 1px)`,
        backgroundSize:'50px 50px' }} />

      <div style={{ position:'relative', zIndex:1, width:'100%', maxWidth:420, padding:'0 1.5rem' }}>
        {/* Logo */}
        <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
          <div style={{ width:64, height:64, background:'linear-gradient(135deg,#cc0000,#880000)',
            clipPath:'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontFamily:'var(--font-display)', fontSize:'1.75rem', color:'#fff',
            margin:'0 auto 1rem' }}>B</div>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'2rem', letterSpacing:'0.1em' }}>
            BRAVO<span style={{color:'var(--red)'}}>.</span>
          </h1>
          <p style={{ color:'var(--silver-dark)', fontSize:'0.8rem', fontFamily:'var(--font-heading)', letterSpacing:'0.12em', textTransform:'uppercase' }}>Admin Dashboard</p>
        </div>

        {/* Card */}
        <div style={{ background:'var(--black-light)', border:'1px solid #222', borderRadius:'8px', padding:'2.5rem' }}>
          <h2 style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'1.2rem', marginBottom:'0.25rem' }}>Selamat Datang</h2>
          <p style={{ color:'var(--silver-dark)', fontSize:'0.85rem', marginBottom:'2rem' }}>Masuk untuk mengelola Bravo Motor</p>

          {error && <div style={{ background:'rgba(204,0,0,0.1)', border:'1px solid var(--red-dark)', borderRadius:'4px',
            padding:'0.75rem 1rem', color:'#ff6b6b', fontSize:'0.85rem', marginBottom:'1.25rem' }}>{error}</div>}

          <form onSubmit={submit}>
            <div style={{ marginBottom:'1.25rem' }}>
              <label style={{ display:'block', fontFamily:'var(--font-heading)', fontWeight:600, fontSize:'0.75rem',
                letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--silver)', marginBottom:'0.5rem' }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="admin@bravomotor.com" />
            </div>
            <div style={{ marginBottom:'2rem' }}>
              <label style={{ display:'block', fontFamily:'var(--font-heading)', fontWeight:600, fontSize:'0.75rem',
                letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--silver)', marginBottom:'0.5rem' }}>Password</label>
              <div style={{ position:'relative' }}>
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" style={{ paddingRight:'3rem' }} />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position:'absolute', right:'0.9rem', top:'50%', transform:'translateY(-50%)', color:'var(--silver-dark)' }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-red" style={{ width:'100%', justifyContent:'center', padding:'0.9rem' }} disabled={loading}>
              {loading ? 'Memproses...' : <><LogIn size={16} /> Masuk</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
