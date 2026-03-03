import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home             from './pages/Home';
import Catalog          from './pages/Catalog';
import MotorcycleDetail from './pages/MotorcycleDetail';
import News             from './pages/News';
import NewsDetail       from './pages/NewsDetail';
import Contact          from './pages/Contact';

import AdminLogin       from './pages/admin/AdminLogin';
import AdminDashboard   from './pages/admin/AdminDashboard';
import AdminMotorcycles from './pages/admin/AdminMotorcycles';
import AdminNews        from './pages/admin/AdminNews';
import AdminBrands      from './pages/admin/AdminBrands';

// Layout untuk halaman publik (dengan Navbar + Footer)
function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/catalog" element={<PublicLayout><Catalog /></PublicLayout>} />
        <Route path="/catalog/:id" element={<PublicLayout><MotorcycleDetail /></PublicLayout>} />
        <Route path="/news" element={<PublicLayout><News /></PublicLayout>} />
        <Route path="/news/:id" element={<PublicLayout><NewsDetail /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/motorcycles" element={<ProtectedRoute><AdminMotorcycles /></ProtectedRoute>} />
        <Route path="/admin/news" element={<ProtectedRoute><AdminNews /></ProtectedRoute>} />
        <Route path="/admin/brands" element={<ProtectedRoute roles={['admin']}><AdminBrands /></ProtectedRoute>} />

        {/* 404 */}
        <Route path="*" element={
          <PublicLayout>
            <div style={{ minHeight:'80vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center' }}>
              <h1 style={{ fontFamily:'var(--font-display)', fontSize:'8rem', color:'var(--red)', lineHeight:1 }}>404</h1>
              <p style={{ fontFamily:'var(--font-heading)', fontSize:'1.2rem', color:'var(--silver-dark)', marginBottom:'2rem' }}>Halaman tidak ditemukan</p>
              <a href="/" className="btn btn-red">Kembali ke Home</a>
            </div>
          </PublicLayout>
        } />
      </Routes>
    </BrowserRouter>
  );
}
