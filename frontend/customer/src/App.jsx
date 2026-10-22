// Root app component for the customer frontend.
// Serves the buyer-facing routes and app shell.
import { useLayoutEffect, useRef } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigationType } from 'react-router-dom';
import CartPage from './pages/Cart';
import HomePage from './pages/Home';
import OrdersPage from './pages/Orders';
import Rudraksha from './components/products/Rudraksha';
import RudrakshaDetails from './components/products/RudrakshaDetails';
import Yantra from './components/products/Yantra';
import YantraDetails from './components/products/YantraDetails';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import LoginPage from './pages/Login';
import MantraUpcharPage from './components/products/MantraUpchar';
import MantraUpcharDetailsPage from './components/products/MantraUpcharDetails';
import LalKitabPage from './components/products/LalKitab';
import LalKitabDetailsPage from './components/products/LalKitabDetails';
import LalKitabRemediesPage from './pages/LalKitabRemedies';
import LalKitabPlanetRemediesPage from './pages/LalKitabPlanetRemedies';
import ProblemWiseLalKitabRemediesPage from './pages/ProblemWiseLalKitabRemedies';
import GemstonePage from './components/products/Gemstone';
import GemstoneDetailsPage from './components/products/GemstoneDetails';
import SoapPage from './components/products/Soap';
import SoapDetailsPage from './components/products/SoapDetails';
import DhoopPage from './components/products/Dhoop';
import DhoopDetailsPage from './components/products/DhoopDetails';
import PyritePage from './components/products/Pyrite';
import PyriteDetails from './components/products/PyriteDetails';
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
import FeaturedProductDetails from './components/products/FeaturedProductDetails';

function ScrollToTop() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const scrollPositions = useRef(new Map());
  const activeLocationKey = useRef(location.key);

  useLayoutEffect(() => {
    if (activeLocationKey.current !== location.key) {
      scrollPositions.current.set(activeLocationKey.current, window.scrollY);
    }

    if (navigationType === 'POP') {
      window.scrollTo({
        top: scrollPositions.current.get(location.key) || 0,
        left: 0,
        behavior: 'instant',
      });
    } else {
      scrollPositions.current.set(location.key, 0);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }

    activeLocationKey.current = location.key;
  }, [location.key, navigationType]);

  return null;
}

function App() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-[#f8f6f1] text-[#201b3a]">
      <ScrollToTop />
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products" element={<Yantra />} />
          <Route path="/products/:slug" element={<YantraDetails />} />
          <Route path="/featured-products/:slug" element={<FeaturedProductDetails />} />
          <Route path="/lal-kitab" element={<LalKitabPage />} />
          <Route path="/lal-kitab-remedies/details" element={<LalKitabPlanetRemediesPage />} />
          <Route path="/lal-kitab-remedies/problems/:problemSlug" element={<ProblemWiseLalKitabRemediesPage />} />
          <Route path="/lal-kitab-remedies/problems" element={<Navigate to="/lal-kitab-remedies" replace />} />
          <Route path="/lal-kitab-remedies" element={<LalKitabRemediesPage />} />
          <Route path="/lal-kitab-details" element={<LalKitabDetailsPage />} />
          <Route path="/gemstone/:slug" element={<GemstoneDetailsPage />} />
          <Route path="/gemstone" element={<GemstonePage />} />
          <Route path="/soap/:slug" element={<SoapDetailsPage />} />
          <Route path="/soap" element={<SoapPage />} />
          <Route path="/dhoop/:slug" element={<DhoopDetailsPage />} />
          <Route path="/dhoop" element={<DhoopPage />} />
          <Route path="/pyrite/:slug" element={<PyriteDetails />} />
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
          <Route path="/mantra-upchar/:slug" element={<MantraUpcharDetailsPage />} />
          <Route path="/rudraksha/:slug" element={<RudrakshaDetails />} />
          <Route path="/rudraksha" element={<Rudraksha />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </main>

      <Footer className={pathname === '/' || pathname === '/mantra-upchar' || pathname === '/lal-kitab' || pathname === '/lal-kitab-remedies' || pathname === '/lal-kitab-remedies/details' || pathname.startsWith('/lal-kitab-remedies/problems') || pathname === '/lal-kitab-details' || pathname === '/gemstone' || pathname === '/soap' || pathname === '/dhoop' || pathname === '/citrine' || pathname === '/tiger-eye' || pathname === '/garnet' || pathname === '/amethyst' || pathname === '/selenite' || pathname === '/rose-quartz' || pathname === '/lapis-lazuli' || pathname === '/bracelets' || pathname === '/pendants' || pathname === '/karungali' || pathname === '/about' ? 'mt-0' : pathname === '/login' ? 'mt-2' : undefined} />
    </div>
  );
}

export default App;
