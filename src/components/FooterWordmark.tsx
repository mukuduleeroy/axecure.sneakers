import { Link } from 'react-router-dom';
import { WHATSAPP_NUMBER } from '../utils/whatsapp';

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hello, I came from your website and I'm interested in your sneakers.",
)}`;

export function FooterWordmark() {
  return (
    <footer aria-label="Axecure Sneakers footer" className="footer-wordmark">
      <div className="footer-links">
        <div>
          <h2>Shop</h2>
          <Link to="/">Home</Link>
          <Link to="/shop">Sneaker Catalog</Link>
          <a href={whatsappUrl} rel="noreferrer" target="_blank">
            WhatsApp Order
          </a>
        </div>
        <div>
          <h2>Social</h2>
          <a href="https://www.instagram.com/axecure_sneakers/" rel="noreferrer" target="_blank">
            Instagram
          </a>
          <a href="https://www.facebook.com/AxeCureSneakers/" rel="noreferrer" target="_blank">
            Facebook
          </a>
          <a href="https://x.com/Axecure_sneaker" rel="noreferrer" target="_blank">
            X
          </a>
        </div>
        <div>
          <h2>Visit</h2>
          <p>First Street, Samora Machel Ave</p>
          <p>Harare, Zimbabwe</p>
          <p>WhatsApp 0781116954</p>
        </div>
      </div>
      <img alt="AxeCure" className="footer-wordmark-image" src="/brand mark logo.png" />
    </footer>
  );
}
