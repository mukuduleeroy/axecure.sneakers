import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { BrandMark } from './BrandMark';
import { BrandWordmark } from './BrandWordmark';

type NavigationProps = {
  onSearchFocus: () => void;
};

export function Navigation({ onSearchFocus }: NavigationProps) {
  const openCart = useCartStore((state) => state.openCart);
  const totalItems = useCartStore((state) => state.totalItems());

  return (
    <header className="sticky top-0 z-30 border-b border-ink-black bg-ivory-mist">
      <nav className="mx-auto flex max-w-page items-center justify-between gap-10 px-15 py-10 text-caption uppercase md:px-30">
        <a className="flex items-center gap-10 font-bold" href="#top">
          <BrandMark compact />
          <BrandWordmark />
        </a>
        <div className="flex shrink-0 items-center gap-10 md:gap-20">
          <a className="hidden text-link md:inline" href="#shop">
            Shop
          </a>
          <button className="text-link focus-ring hidden bg-transparent uppercase sm:inline" onClick={onSearchFocus} type="button">
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
