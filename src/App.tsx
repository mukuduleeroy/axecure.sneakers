import { Route, Routes } from 'react-router-dom';
import { CartDrawer } from './components/CartDrawer';
import { FooterWordmark } from './components/FooterWordmark';
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

      <FooterWordmark />

      <CartDrawer />
    </main>
  );
}
