import { Route, Routes } from 'react-router-dom';
import { CartDrawer } from './components/CartDrawer';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';

export default function App() {
  return (
    <main id="top">
      <Navigation />
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<ShopPage />} path="/shop" />
      </Routes>

      <footer className="brand-rail px-20 py-30 text-center text-caption uppercase text-ivory-mist">
        Axecure Sneakers Zimbabwe / First Street & Samora Machel Ave, Harare / WhatsApp 0781116954
      </footer>

      <CartDrawer />
    </main>
  );
}
