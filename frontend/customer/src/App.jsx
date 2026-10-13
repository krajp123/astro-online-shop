// Root app component for the customer frontend.
// Serves the buyer-facing routes and app shell.
import { useLayoutEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import CartPage from './pages/Cart';
import HomePage from './pages/Home';
import OrdersPage from './pages/Orders';
import Rudraksha from './components/products/Rudraksha';
import Yantra from './components/products/Yantra';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import LoginPage from './pages/Login';
import MantraUpcharPage from './components/products/MantraUpchar';
import LalKitabPage from './components/products/LalKitab';
import GemstonePage from './components/products/Gemstone';
import SoapPage from './components/products/Soap';
import DhoopPage from './components/products/Dhoop';
import PyritePage from './components/products/Pyrite';
import CitrinePage from './components/products/Citrine';
import TigerEyePage from './components/products/TigerEye';
import GarnetPage from './components/products/Garnet';
import AmethystPage from './components/products/Amethyst';
import SelenitePage from './components/products/Selenite';
import RoseQuartzPage from './components/products/RoseQuartz';
import LapisLazuliPage from './components/products/LapisLazuli';
import KarungaliPage from './components/products/Karungali';
import BraceletsPage from './components/products/Bracelets';
import PendantsPage from './components/products/Pendants';
import AboutPage from './pages/About';

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function App() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-[#f5f1eb] text-[#201b3a]">
      <ScrollToTop />
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products" element={<Yantra />} />
          <Route path="/lal-kitab" element={<LalKitabPage />} />
          <Route path="/gemstone" element={<GemstonePage />} />
          <Route path="/soap" element={<SoapPage />} />
          <Route path="/dhoop" element={<DhoopPage />} />
          <Route path="/pyrite" element={<PyritePage />} />
          <Route path="/citrine" element={<CitrinePage />} />
          <Route path="/tiger-eye" element={<TigerEyePage />} />
          <Route path="/garnet" element={<GarnetPage />} />
          <Route path="/amethyst" element={<AmethystPage />} />
          <Route path="/selenite" element={<SelenitePage />} />
          <Route path="/rose-quartz" element={<RoseQuartzPage />} />
          <Route path="/lapis-lazuli" element={<LapisLazuliPage />} />
          <Route path="/bracelets" element={<BraceletsPage />} />
          <Route path="/pendants" element={<PendantsPage />} />
          <Route path="/karungali" element={<KarungaliPage />} />
          <Route path="/mantra-upchar" element={<MantraUpcharPage />} />
          <Route path="/rudraksha" element={<Rudraksha />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </main>

      <Footer className={pathname === '/' || pathname === '/mantra-upchar' || pathname === '/lal-kitab' || pathname === '/gemstone' || pathname === '/soap' || pathname === '/dhoop' || pathname === '/citrine' || pathname === '/tiger-eye' || pathname === '/garnet' || pathname === '/amethyst' || pathname === '/selenite' || pathname === '/rose-quartz' || pathname === '/lapis-lazuli' || pathname === '/bracelets' || pathname === '/pendants' || pathname === '/karungali' || pathname === '/about' ? 'mt-0' : pathname === '/login' ? 'mt-2' : undefined} />
    </div>
  );
}

export default App;
