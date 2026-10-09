import { ShoppingCart } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useCustomerStore } from '../../store/useCustomerStore';
import pyriteProducts from '../../data/pyriteProducts';

const PyritePage = () => {
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
      {/* Hero */}
      <section className="relative isolate min-h-[360px] overflow-hidden bg-[#3a0d00] sm:min-h-[380px]">
        <img
          src="/Pyrite.png"
          alt="Pyrite hero"
          className="absolute inset-0 h-full w-full object-cover object-[center_65%] opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2b0b00]/80 via-[#3a0d00]/60 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[360px] max-w-[1440px] flex-col justify-center px-5 py-12 text-white sm:min-h-[380px] sm:px-8 sm:py-14 lg:px-11">
          <h1 className="font-serif text-3xl font-bold">Pyrite</h1>
          <p className="mt-2 max-w-2xl text-sm text-white/90">Iron Pyrite (FeS₂) — the metallic golden stone of protection, prosperity and confidence.</p>
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

      <section className="w-full px-4 pb-8 pt-10 sm:px-6 sm:pt-12 lg:px-8 lg:pb-10 lg:pt-14 2xl:px-12">
        <div className="mb-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="font-serif text-[1.45rem] font-bold leading-tight text-[#75665a] sm:text-[1.8rem] lg:text-[2.35rem]">Pyrite collection</h2>
            <p className="max-w-3xl text-sm leading-7 text-[#5b5470] sm:text-base">Carefully curated pyrite pieces for vastu, wealth attraction and personal adornment.</p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pyriteProducts.map((product) => {
            const isInCart = cart.some((item) => item.name === product.name);

            return (
              <article
                key={`${product.name}`}
                className="group overflow-hidden rounded-2xl border border-[#201b3a]/10 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#4d001e]/30 hover:shadow-[0_18px_40px_rgba(32,27,58,0.12)]"
              >
                <div className="relative aspect-square overflow-hidden bg-[#f7f2ea]">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className={`h-full w-full object-contain object-center transition-opacity duration-1000 ease-in-out`}
                  />
                </div>
                <div className="flex flex-col p-3 sm:p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#4d001e]/70">{product.category}</p>
                  <h3 className="mt-1 text-sm font-semibold leading-snug text-[#201b3a]">{product.name}</h3>
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

export default PyritePage;
