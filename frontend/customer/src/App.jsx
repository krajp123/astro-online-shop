// Root app component for the customer frontend.
// Serves the buyer-facing routes and app shell.
import { useEffect } from 'react';
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
import StoneCollectionPage from './components/products/StoneCollectionPage';
import amethystProducts from './data/amethystProducts';
import seleniteProducts from './data/seleniteProducts';
import roseQuartzProducts from './data/roseQuartzProducts';
import lapisLazuliProducts from './data/lapisLazuliProducts';
import AboutPage from './pages/About';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
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
          <Route path="/amethyst" element={<StoneCollectionPage name="Amethyst" heroImage="/Amthyst/Amethyst.png" description="Explore Amethyst crystals, jewellery, and Aquarius designs." products={amethystProducts} />} />
          <Route path="/selenite" element={<StoneCollectionPage name="Selenite" heroImage="/Selenite/Selenite.png" description="Explore Selenite crystals, cleansing plates, and spiritual collections." products={seleniteProducts} />} />
          <Route path="/rose-quartz" element={<StoneCollectionPage name="Rose Quartz" heroImage="/Rose Quartz/Rose Quartz.png" description="Shop Rose Quartz crystals, jewellery, and love-attraction designs." products={roseQuartzProducts} />} />
          <Route path="/lapis-lazuli" element={<StoneCollectionPage name="Lapis Lazuli" heroImage="/Lapis lazuli/Lapis Lazuli.png" description="Explore Lapis Lazuli crystals, zodiac jewellery, and symbolic designs." products={lapisLazuliProducts} />} />
          <Route path="/mantra-upchar" element={<MantraUpcharPage />} />
          <Route path="/rudraksha" element={<Rudraksha />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </main>

      <Footer className={pathname === '/' || pathname === '/mantra-upchar' || pathname === '/lal-kitab' || pathname === '/gemstone' || pathname === '/soap' || pathname === '/dhoop' || pathname === '/citrine' || pathname === '/tiger-eye' || pathname === '/garnet' || pathname === '/amethyst' || pathname === '/selenite' || pathname === '/rose-quartz' || pathname === '/lapis-lazuli' || pathname === '/about' ? 'mt-0' : pathname === '/login' ? 'mt-2' : undefined} />
    </div>
  );
}

export default App;
