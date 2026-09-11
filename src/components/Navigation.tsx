import { ShoppingBag } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { BrandMark } from './BrandMark';
import { BrandWordmark } from './BrandWordmark';

export function Navigation() {
  const openCart = useCartStore((state) => state.openCart);
  const totalItems = useCartStore((state) => state.totalItems());
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 border-b border-ink-black bg-ivory-mist">
      <nav className="mx-auto flex max-w-page items-center justify-between gap-10 px-15 py-6 text-caption uppercase md:px-30">
        <Link className="flex items-center gap-6 font-bold" to="/">
          <BrandMark compact />
          <BrandWordmark />
        </Link>
        <div className="flex shrink-0 items-center gap-10 md:gap-20">
          <NavLink className="hidden text-link md:inline" to="/shop">
            Shop
          </NavLink>
          <button className="text-link focus-ring hidden bg-transparent uppercase sm:inline" onClick={() => navigate('/shop')} type="button">
            Search
          </button>
          <button
            aria-label={`Open cart with ${totalItems} items`}
            className="focus-ring flex items-center gap-5 bg-transparent uppercase"
            onClick={openCart}
            type="button"
          >
            <ShoppingBag aria-hidden="true" size={16} strokeWidth={1.5} />
            <span>{totalItems}</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
