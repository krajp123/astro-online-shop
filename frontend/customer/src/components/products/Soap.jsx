import { ShoppingCart } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useCustomerStore } from '../../store/useCustomerStore';

const soapProducts = [
  { name: 'Budh Amrit Soap', image: '/Soap/budh1.jpg', hoverImage: '/Soap/budh1.1.jpg', price: 'Rs. 479.00' },
  { name: 'Chandra Amrit Soap', image: '/Soap/chandra1.jpg', hoverImage: '/Soap/chandra1.1.jpg', price: 'Rs. 479.00' },
  { name: 'Ketu Amrit Soap', image: '/Soap/ketu1.jpg', hoverImage: '/Soap/ketu1.1.jpg', price: 'Rs. 479.00' },
  { name: 'Mangal Amrit Soap', image: '/Soap/mangal1.jpg', hoverImage: '/Soap/mangal1.1.jpg', price: 'Rs. 479.00' },
  { name: 'Rahu Amrit Soap', image: '/Soap/rahu1.jpg', hoverImage: '/Soap/rahu1.1.jpg', price: 'Rs. 479.00' },
  { name: 'Shani Amrit Soap', image: '/Soap/sani1.jpg', hoverImage: '/Soap/sani1.1.jpg', price: 'Rs. 479.00' },
  { name: 'Shukra Amrit Soap', image: '/Soap/sukr1.jpg', hoverImage: '/Soap/sukr1.1.jpg', price: 'Rs. 479.00' },
  { name: 'Surya Amrit Soap', image: '/Soap/surya1.jpg', hoverImage: '/Soap/surya1.1.jpg', price: 'Rs. 479.00' },
  { name: 'Brihaspati Amrit Soap', image: '/Soap/viraspath1.jpg', hoverImage: '/Soap/viraspath1.1.jpg', price: 'Rs. 479.00' },
];

const SoapPage = () => {
  const reduceMotion = useReducedMotion();
  const cart = useCustomerStore((state) => state.cart);
  const setCart = useCustomerStore((state) => state.setCart);

  const handleAddToCart = (product) => {
    const existingItem = cart.find((item) => item.name === product.name);
    setCart(existingItem
      ? cart.map((item) => item.name === product.name
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item)
      : [...cart, { ...product, quantity: 1 }]);
  };

  return (
    <main className="min-h-[60vh] bg-[#f5f1eb]">
      <section className="relative isolate min-h-[360px] overflow-hidden bg-[#4d0010] sm:min-h-[380px]">
        <img
          src="/soap-hero.png"
          alt=""
          aria-hidden="true"
          fetchpriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[72%_center] sm:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0718]/75 via-[#0b0718]/45 to-transparent" aria-hidden="true" />
        <div className="relative z-10 mx-auto flex min-h-[360px] max-w-[1440px] items-center px-5 py-10 sm:min-h-[380px] sm:px-8 lg:px-11">
          <div className="max-w-[680px] text-left text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.95)]">
            <div className="mb-3 flex items-center gap-4">
              <h1 className="font-serif text-[1.45rem] font-bold leading-tight sm:text-[1.8rem] lg:text-[2.35rem]">Soap</h1>
              <span className="hidden h-px w-full max-w-[22rem] bg-[#f4d69a] md:block" aria-hidden="true" />
            </div>
            <div className="space-y-3 text-sm leading-6 sm:text-base sm:leading-7">
              <p>
                Our special planet-related soaps available on our website help reduce negative energy in your aura, improving your daily life. Just as supplements gradually strengthen the body, regular use of the specific planet soap reduces the adverse effects of that planet, yielding desired results. These soaps help organize your thoughts and assist you in performing tasks with discipline. They are fully effective in reducing the negative impact of unfavorable planets in your horoscope.
              </p>
              <p>
                Through the <strong>Astroscience App</strong> you can access the Luck Meter to identify your inauspicious planets and use the related soap for planetary peace treatment.
              </p>
            </div>
          </div>
        </div>
        <svg
          className="absolute inset-x-0 bottom-0 z-20 h-8 w-full sm:h-10"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <motion.path
            d="M0 40 C180 86 330 8 520 38 C700 68 850 78 1030 38 C1200 8 1320 20 1440 44 V100 H0Z"
            animate={reduceMotion ? undefined : {
              d: [
                'M0 40 C180 86 330 8 520 38 C700 68 850 78 1030 38 C1200 8 1320 20 1440 44 V100 H0Z',
                'M0 44 C180 8 330 88 520 44 C700 10 850 12 1030 44 C1200 88 1320 72 1440 40 V100 H0Z',
                'M0 40 C180 86 330 8 520 38 C700 68 850 78 1030 38 C1200 8 1320 20 1440 44 V100 H0Z',
              ],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            fill="#f5f1eb"
          />
        </svg>
      </section>

      <section className="w-full px-4 pb-8 pt-10 sm:px-6 sm:pt-12 lg:px-8 lg:pb-10 lg:pt-14">
        {/* <h2 className="mb-6 text-center font-serif text-3xl font-bold text-[#32111a] sm:text-4xl">Our Soap Collection</h2> */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {soapProducts.map((product) => {
            const isInCart = cart.some((item) => item.name === product.name);

            return (
              <article
                key={product.name}
                className="group overflow-hidden rounded-2xl border border-[#201b3a]/10 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#4d001e]/30 hover:shadow-[0_18px_40px_rgba(32,27,58,0.12)]"
              >
                <div className="relative aspect-square overflow-hidden bg-[#f7f2ea]">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-contain object-center transition-opacity duration-1000 ease-in-out group-hover:opacity-0"
                  />
                  <img
                    src={product.hoverImage}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-contain object-center opacity-0 transition-opacity duration-1000 ease-in-out group-hover:opacity-100"
                  />
                </div>
                <div className="flex flex-col p-3 sm:p-4">
                  <h3 className="text-sm font-semibold leading-snug text-[#201b3a]">{product.name}</h3>
                  <div className="mt-1.5 flex items-center gap-2" aria-label="Rated 5 out of 5, 11 reviews">
                    <span className="text-sm leading-none tracking-tight text-[#c9962b]" aria-hidden="true">★★★★★</span>
                    <span className="text-xs text-[#201b3a]/75">(11 reviews)</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3 border-t border-[#201b3a]/10 pt-3">
                    <p className="text-base font-bold text-[#201b3a]">{product.price}</p>
                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      aria-label={isInCart ? `Add another ${product.name} to cart` : `Add ${product.name} to cart`}
                      className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg bg-[#4d001e] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#3a0016] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d001e]/40 focus-visible:ring-offset-2"
                    >
                      <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                      {isInCart ? 'Add another' : 'Add to cart'}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default SoapPage;
