import { X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useCartStore } from '../store/cartStore';
import type { Product, ShoeSize } from '../types';

type QuickViewModalProps = {
  product: Product | null;
  onClose: () => void;
};

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const addItem = useCartStore((state) => state.addItem);
  const firstAvailableSize = useMemo(() => product?.sizes[0], [product]);
  const [selectedSize, setSelectedSize] = useState<ShoeSize | undefined>(firstAvailableSize);

  useEffect(() => {
    setSelectedSize(firstAvailableSize);
  }, [firstAvailableSize]);

  if (!product) return null;

  const size = selectedSize ?? product.sizes[0];
  const isSoldOut = product.stock === 0;

  return (
    <div className="fixed inset-0 z-40 grid place-items-end bg-black/40 p-0 md:place-items-center md:p-30">
      <section className="max-h-[90vh] w-full overflow-auto border border-ink-black bg-warm-parchment md:max-w-3xl">
        <div className="flex items-center justify-between border-b border-ink-black px-15 py-10">
          <h2 className="text-caption font-bold uppercase">Quick View</h2>
          <button aria-label="Close quick view" className="focus-ring bg-transparent" onClick={onClose} type="button">
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>
        <div className="grid md:grid-cols-[1fr_320px]">
          <img alt={`${product.brand} ${product.name}`} className="aspect-[4/5] h-full w-full object-cover" src={product.images[0]} />
          <div className="flex flex-col gap-20 p-20">
            <div className="text-caption">
              <p className="font-bold uppercase">{product.brand}</p>
              <h3 className="text-subheading font-bold">{product.name}</h3>
              <p className="font-bold">${product.price} USD</p>
              <p>{product.category}</p>
              <p>{isSoldOut ? 'Currently sold out' : `${product.stock} pairs ready`}</p>
            </div>
            <div>
              <p className="mb-10 text-caption font-bold uppercase">Size</p>
              <div className="grid grid-cols-3 gap-5">
                {product.sizes.map((productSize) => (
                  <button
                    className={`focus-ring border border-ink-black px-10 py-10 text-caption ${
                      size === productSize ? 'bg-ink-black text-ivory-mist' : 'bg-transparent'
                    }`}
                    key={productSize}
                    onClick={() => setSelectedSize(productSize)}
                    type="button"
                  >
                    {productSize}
                  </button>
                ))}
              </div>
            </div>
            <button
              className="focus-ring mt-auto border-b border-ink-black bg-transparent pb-5 text-left text-caption font-bold uppercase disabled:border-lilac-veil disabled:text-lilac-veil"
              disabled={isSoldOut}
              onClick={() => {
                addItem(product, size);
                onClose();
              }}
              type="button"
            >
              {isSoldOut ? 'Sold Out' : 'Add To Cart'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
