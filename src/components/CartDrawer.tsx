import { Minus, Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { CheckoutModal } from './CheckoutModal';

export function CartDrawer() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const { items, isCartOpen, closeCart, removeItem, updateQuantity, grandTotal } = useCartStore();

  if (!isCartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 drawer-scrim" onClick={closeCart} />
      <aside className="fixed right-0 top-0 z-50 flex h-dvh w-full max-w-md flex-col border-l border-ink-black bg-warm-parchment">
        <div className="flex items-center justify-between border-b border-ink-black px-15 py-10">
          <h2 className="text-caption font-bold uppercase">Cart</h2>
          <button aria-label="Close cart" className="focus-ring bg-transparent" onClick={closeCart} type="button">
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>
        <div className="flex-1 overflow-auto">
          {items.length === 0 ? (
            <p className="p-20 text-caption">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div className="grid grid-cols-[90px_1fr] gap-15 border-b border-ink-black p-15" key={`${item.productId}-${item.size}`}>
                <img alt={item.name} className="aspect-[4/5] w-full object-cover" src={item.image} />
                <div className="flex flex-col gap-10 text-caption">
                  <div>
                    <p className="font-bold uppercase">{item.brand}</p>
                    <p>{item.name}</p>
                    <p>{item.size}</p>
                    <p className="font-bold">${item.price}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-ink-black">
                      <button
                        aria-label={`Decrease ${item.name}`}
                        className="focus-ring grid h-30 w-30 place-items-center bg-transparent"
                        onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                        type="button"
                      >
                        <Minus size={14} strokeWidth={1.5} />
                      </button>
                      <span className="grid h-30 w-30 place-items-center border-x border-ink-black">{item.quantity}</span>
                      <button
                        aria-label={`Increase ${item.name}`}
                        className="focus-ring grid h-30 w-30 place-items-center bg-transparent"
                        onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                        type="button"
                      >
                        <Plus size={14} strokeWidth={1.5} />
                      </button>
                    </div>
                    <button
                      aria-label={`Remove ${item.name}`}
                      className="focus-ring bg-transparent"
                      onClick={() => removeItem(item.productId, item.size)}
                      type="button"
                    >
                      <Trash2 size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="border-t border-ink-black p-15">
          <div className="mb-15 flex justify-between text-caption font-bold uppercase">
            <span>Total</span>
            <span>${grandTotal()} USD</span>
          </div>
          <button
            className="focus-ring w-full border-b border-ink-black bg-transparent pb-5 text-left text-caption font-bold uppercase disabled:border-lilac-veil disabled:text-lilac-veil"
            disabled={items.length === 0}
            onClick={() => setCheckoutOpen(true)}
            type="button"
          >
            Proceed To WhatsApp Order
          </button>
        </div>
      </aside>
      {checkoutOpen && <CheckoutModal onClose={() => setCheckoutOpen(false)} />}
    </>
  );
}
