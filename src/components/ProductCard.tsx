import { useState } from 'react';
import type { Product } from '../types';

type ProductCardProps = {
  product: Product;
  onQuickView: (product: Product) => void;
};

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const isSoldOut = product.stock === 0;

  return (
    <article className="group">
      <button
        className="focus-ring block w-full bg-ivory-mist text-left"
        onClick={() => onQuickView(product)}
        type="button"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-ivory-mist">
          <img
            alt={`${product.brand} ${product.name}`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
            src={product.images[imageIndex]}
          />
          {product.images.length > 1 && (
            <div className="absolute bottom-10 left-10 flex gap-5">
              {product.images.map((image, index) => (
                <span
                  className={`h-5 w-5 border border-ink-black ${index === imageIndex ? 'bg-ink-black' : 'bg-ivory-mist'}`}
                  key={image}
                />
              ))}
            </div>
          )}
        </div>
      </button>
      {product.images.length > 1 && (
        <button
          className="focus-ring mt-5 text-caption text-link"
          onClick={() => setImageIndex((imageIndex + 1) % product.images.length)}
          type="button"
        >
          Next Image
        </button>
      )}
      <button className="mt-5 block text-left text-caption" onClick={() => onQuickView(product)} type="button">
        <span className="block font-bold uppercase">{product.brand}</span>
        <span className="block">{product.name}</span>
        <span className="font-bold">${product.price}</span>
        {isSoldOut && <span className="ml-5 text-lilac-veil">Sold Out</span>}
      </button>
    </article>
  );
}
