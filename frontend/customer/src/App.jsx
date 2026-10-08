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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products" element={<Yantra />} />
          <Route path="/lal-kitab" element={<LalKitabPage />} />
          <Route path="/gemstone" element={<GemstonePage />} />
          <Route path="/soap" element={<SoapPage />} />
          <Route path="/dhoop" element={<DhoopPage />} />
          <Route path="/mantra-upchar" element={<MantraUpcharPage />} />
          <Route path="/rudraksha" element={<Rudraksha />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </main>

      <Footer className={pathname === '/' || pathname === '/mantra-upchar' || pathname === '/lal-kitab' || pathname === '/gemstone' || pathname === '/soap' || pathname === '/dhoop' ? 'mt-0' : pathname === '/login' ? 'mt-2' : undefined} />
    </div>
  );
}

export default App;
