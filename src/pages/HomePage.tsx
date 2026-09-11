import { Link } from 'react-router-dom';
import { ProductCatalog } from '../components/ProductCatalog';
import { ThreeShoeHero } from '../components/ThreeShoeHero';

export function HomePage() {
  return (
    <>
      <ThreeShoeHero />

      <section className="mx-auto max-w-[700px] px-20 py-60 text-center">
        <p>
          Axecure Sneakers is presented online as a Harare footwear and clothing destination around Samora Machel Avenue,
          with an in-store sneaker wall, streetwear basics, and daily trading hours. This app keeps that shop-first feel:
          pick a pair, choose your size, and send the full USD order to WhatsApp for confirmation.
        </p>
        <Link className="mt-20 inline-block text-caption uppercase text-link" to="/shop">
          Shop The Grid
        </Link>
      </section>
      <ProductCatalog />
    </>
  );
}
