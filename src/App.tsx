import { Search } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { CartDrawer } from './components/CartDrawer';
import { Navigation } from './components/Navigation';
import { ProductCard } from './components/ProductCard';
import { QuickViewModal } from './components/QuickViewModal';
import { ThreeShoeHero } from './components/ThreeShoeHero';
import { products } from './data/products';
import type { Product, ShoeSize } from './types';

const brands = ['All', ...Array.from(new Set(products.map((product) => product.brand)))];
const categories = ['All', ...Array.from(new Set(products.map((product) => product.category)))];
const sizes = ['All', ...Array.from(new Set(products.flatMap((product) => product.sizes)))];

export default function App() {
  const [brand, setBrand] = useState('All');
  const [category, setCategory] = useState('All');
  const [size, setSize] = useState<ShoeSize | 'All'>('All');
  const [maxPrice, setMaxPrice] = useState(180);
  const [search, setSearch] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesSearch = `${product.brand} ${product.name}`.toLowerCase().includes(search.toLowerCase());
        const matchesBrand = brand === 'All' || product.brand === brand;
        const matchesCategory = category === 'All' || product.category === category;
        const matchesSize = size === 'All' || product.sizes.includes(size);
        return matchesSearch && matchesBrand && matchesCategory && matchesSize && product.price <= maxPrice;
      }),
    [brand, category, maxPrice, search, size],
  );

  return (
    <main id="top">
      <Navigation onSearchFocus={() => searchRef.current?.focus()} />
      <ThreeShoeHero />

      <section className="mx-auto max-w-[700px] px-20 py-60 text-center">
        <p>
          Axecure Sneakers is presented online as a Harare footwear and clothing destination around Samora Machel Avenue,
          with an in-store sneaker wall, streetwear basics, and daily trading hours. This app keeps that shop-first feel:
          pick a pair, choose your size, and send the full USD order to WhatsApp for confirmation.
        </p>
        <a className="mt-20 inline-block text-caption uppercase text-link" href="#shop">
          Shop The Grid
        </a>
      </section>

      <section className="mx-auto max-w-page px-5 pb-80" id="shop">
        <div className="mb-20 grid gap-10 border-y border-ink-black py-15 md:grid-cols-[1.3fr_repeat(4,1fr)]">
          <label className="flex items-center gap-10 border border-ink-black bg-ivory-mist px-10 text-caption">
            <Search size={15} strokeWidth={1.5} />
            <input
              className="min-w-0 flex-1 bg-transparent py-10 outline-none"
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search sneakers"
              ref={searchRef}
              value={search}
            />
          </label>
          <select className="border border-ink-black bg-ivory-mist px-10 py-10 text-caption" onChange={(event) => setBrand(event.target.value)} value={brand}>
            {brands.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <select className="border border-ink-black bg-ivory-mist px-10 py-10 text-caption" onChange={(event) => setCategory(event.target.value)} value={category}>
            {categories.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <select className="border border-ink-black bg-ivory-mist px-10 py-10 text-caption" onChange={(event) => setSize(event.target.value as ShoeSize | 'All')} value={size}>
            {sizes.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <label className="grid gap-5 text-caption">
            <span className="font-bold uppercase">Up to ${maxPrice}</span>
            <input max="180" min="70" onChange={(event) => setMaxPrice(Number(event.target.value))} step="5" type="range" value={maxPrice} />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} onQuickView={setQuickViewProduct} product={product} />
          ))}
        </div>
      </section>

      <footer className="brand-rail px-20 py-30 text-center text-caption uppercase text-ivory-mist">
        Axecure Sneakers Zimbabwe / First Street & Samora Machel Ave, Harare / WhatsApp 0781116954
      </footer>

      <QuickViewModal onClose={() => setQuickViewProduct(null)} product={quickViewProduct} />
      <CartDrawer />
    </main>
  );
}
