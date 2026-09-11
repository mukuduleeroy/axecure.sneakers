import { Search } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { products } from '../data/products';
import type { Product, ShoeSize } from '../types';
import { ProductCard } from './ProductCard';
import { QuickViewModal } from './QuickViewModal';

const brands = ['All', ...Array.from(new Set(products.map((product) => product.brand)))];
const categories = ['All', ...Array.from(new Set(products.map((product) => product.category)))];
const sizes = ['All', ...Array.from(new Set(products.flatMap((product) => product.sizes)))];

export function ProductCatalog() {
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
    <>
      <section className="mx-auto max-w-page px-5 py-60" id="shop">
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

      <QuickViewModal onClose={() => setQuickViewProduct(null)} product={quickViewProduct} />
    </>
  );
}
