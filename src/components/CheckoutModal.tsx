import { MessageCircle, X } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { buildWhatsAppOrderUrl } from '../utils/whatsapp';

type CheckoutModalProps = {
  onClose: () => void;
};

export function CheckoutModal({ onClose }: CheckoutModalProps) {
  const { items, clearCart } = useCartStore();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [delivery, setDelivery] = useState('');

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const url = buildWhatsAppOrderUrl({ fullName, phone, delivery }, items);
    window.open(url, '_blank', 'noopener,noreferrer');
    clearCart();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[60] grid place-items-end bg-black/40 md:place-items-center md:p-30">
      <form className="w-full max-w-lg border border-ink-black bg-warm-parchment" onSubmit={submitOrder}>
        <div className="flex items-center justify-between border-b border-ink-black px-15 py-10">
          <h2 className="text-caption font-bold uppercase">WhatsApp Order</h2>
          <button aria-label="Close checkout" className="focus-ring bg-transparent" onClick={onClose} type="button">
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>
        <div className="grid gap-15 p-20">
          <label className="grid gap-5 text-caption font-bold uppercase">
            Customer Full Name
            <input
              className="border border-ink-black bg-ivory-mist px-10 py-10 font-normal"
              onChange={(event) => setFullName(event.target.value)}
              required
              value={fullName}
            />
          </label>
          <label className="grid gap-5 text-caption font-bold uppercase">
            Delivery Address / City
            <input
              className="border border-ink-black bg-ivory-mist px-10 py-10 font-normal"
              onChange={(event) => setDelivery(event.target.value)}
              placeholder="Harare CBD, Avondale, Bulawayo"
              required
              value={delivery}
            />
          </label>
          <label className="grid gap-5 text-caption font-bold uppercase">
            Contact Phone Number
            <input
              className="border border-ink-black bg-ivory-mist px-10 py-10 font-normal"
              onChange={(event) => setPhone(event.target.value)}
              required
              type="tel"
              value={phone}
            />
          </label>
          <button className="focus-ring mt-5 flex items-center gap-10 border-b border-ink-black bg-transparent pb-5 text-left text-caption font-bold uppercase" type="submit">
            <MessageCircle size={16} strokeWidth={1.5} />
            Send Order On WhatsApp
          </button>
        </div>
      </form>
    </div>
  );
}
