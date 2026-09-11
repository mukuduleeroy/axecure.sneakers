import type { CartItem, CustomerDetails } from '../types';

export const WHATSAPP_NUMBER = '263781116954';

export function formatWhatsAppMessage(customer: CustomerDetails, items: CartItem[]) {
  const itemLines = items
    .map((item) => `• ${item.quantity}x ${item.name} - Size: [${item.size}] - $${item.price * item.quantity}`)
    .join('\n');
  const grandTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return `## 🛒 *NEW ORDER - AXECURE SNEAKERS*

*Customer:* ${customer.fullName}
*Phone:* ${customer.phone}
*Delivery:* ${customer.delivery}
----------------------

*Items:*
${itemLines}
----------------------------------------------

*Total:* $${grandTotal} USD`;
}

export function buildWhatsAppOrderUrl(customer: CustomerDetails, items: CartItem[]) {
  const encodedMessage = encodeURIComponent(formatWhatsAppMessage(customer, items));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}
