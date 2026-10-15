import { ShoppingCart } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useCustomerStore } from '../../store/useCustomerStore';

const dhoopProducts = [
  { name: 'Budh Amrit Dhoop', image: '/Dhoop/budh1.1.jpg', hoverImage: '/Dhoop/budh1.jpg', price: 'Rs. 409.00' },
  { name: 'Chandra Amrit Dhoop', image: '/Dhoop/chandra1.jpg', hoverImage: '/Dhoop/chandra1.1.jpg', price: 'Rs. 409.00' },
  { name: 'Ketu Amrit Dhoop', image: '/Dhoop/ketu1.jpg', hoverImage: '/Dhoop/ketu1.1.jpg', price: 'Rs. 409.00' },
  { name: 'Mangal Amrit Dhoop', image: '/Dhoop/Mangal1.jpg', hoverImage: '/Dhoop/Mangal1.1.jpg', price: 'Rs. 409.00' },
  { name: 'Rahu Amrit Dhoop', image: '/Dhoop/rahu1.jpg', hoverImage: '/Dhoop/rahu1.1.jpg', price: 'Rs. 409.00' },
  { name: 'Shani Amrit Dhoop', image: '/Dhoop/shani1.1.jpg', hoverImage: '/Dhoop/shani1.jpg', price: 'Rs. 409.00' },
  { name: 'Shukra Amrit Dhoop', image: '/Dhoop/sukra1.jpg', hoverImage: '/Dhoop/sukra1.1.jpg', price: 'Rs. 409.00' },
  { name: 'Surya Amrit Dhoop', image: '/Dhoop/surya1.jpg', hoverImage: '/Dhoop/surya1.1.jpg', price: 'Rs. 409.00' },
  { name: 'Brihaspati Amrit Dhoop', image: '/Dhoop/brahspati1.jpg', hoverImage: '/Dhoop/brahspati2.jpg', price: 'Rs. 409.00' },
];

const DhoopPage = () => {
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
    <main className="min-h-[60vh] bg-[#f8f6f1]">
      <section className="product-hero group relative isolate min-h-[360px] overflow-hidden bg-[#4d0010] sm:min-h-[380px]">
        <img
          src="/Dhoop.png"
          alt=""
          aria-hidden="true"
          fetchpriority="high"
          className="product-hero-image absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0718]/80 via-[#0b0718]/55 to-transparent" aria-hidden="true" />
        <div className="relative z-10 mx-auto flex min-h-[360px] max-w-[1440px] items-center px-5 py-12 sm:min-h-[380px] sm:px-8 sm:py-14 lg:px-11">
          <div className="max-w-[1100px] text-left text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.95)]">
            <div className="mb-3 flex items-center gap-4">
              <h1 className="font-serif text-[1.45rem] font-bold leading-tight sm:text-[1.8rem] lg:text-[2.35rem]">Dhoop</h1>
              <span className="hidden h-px w-full max-w-[22rem] bg-[#f4d69a] md:block" aria-hidden="true" />
            </div>
            <div className="space-y-3 text-sm leading-6 sm:text-base sm:leading-7">
              <p>
                Dhoop is a set of nine distinct incense variants, each dedicated to a different planet (graha) as per Lal Kitab astrology. These incense sticks are meticulously formulated using traditional ingredients and methods to harness the beneficial energies associated with each planet. Whether you seek to appease a malefic influence or enhance the auspicious effects of a benefic planet, Dhoop provides a spiritual tool to align your surroundings with cosmic harmony.
              </p>
              <p>
                Click on Luck Meter on <strong>Astroscience App</strong> to locate the auspicious planets and purchase the related incense sticks given below to strengthen them further.
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
            fill="#f8f6f1"
          />
        </svg>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-4 pb-8 pt-10 sm:px-6 sm:pt-12 lg:px-8 lg:pb-10 lg:pt-14">
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {dhoopProducts.map((product) => {
            const isInCart = cart.some((item) => item.name === product.name);

            return (
              <article
                key={product.name}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#201b3a]/10 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#4d001e]/30 hover:shadow-[0_18px_40px_rgba(32,27,58,0.12)]"
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
                <div className="flex flex-1 flex-col p-2 sm:p-4">
                  <h2 className="line-clamp-2 min-h-8 text-xs font-semibold leading-snug text-[#201b3a] sm:min-h-10 sm:text-sm">{product.name}</h2>
                  <div className="mt-1.5 flex items-center gap-1.5 sm:gap-2" aria-label="Rated 5 out of 5, 11 reviews">
                    <span className="text-xs leading-none tracking-tight text-[#c9962b] sm:text-sm" aria-hidden="true">★★★★★</span>
                    <span className="hidden text-xs text-[#201b3a]/75 sm:inline">(11 reviews)</span>
                  </div>
                  <div className="mt-auto flex flex-col items-stretch gap-2 border-t border-[#201b3a]/10 pt-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:pt-3">
                    <p className="text-sm font-bold text-[#201b3a] sm:text-base">{product.price}</p>
                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      aria-label={isInCart ? `Add another ${product.name} to cart` : `Add ${product.name} to cart`}
                      className="inline-flex min-h-8 items-center justify-center gap-1 rounded-lg bg-[#4d001e] px-2 py-1.5 text-[10px] font-semibold text-white transition hover:bg-[#3a0016] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d001e]/40 focus-visible:ring-offset-2 sm:min-h-9 sm:gap-1.5 sm:px-3 sm:py-2 sm:text-xs"
                    >
                      <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
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

export default DhoopPage;
