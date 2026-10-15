import { motion, useReducedMotion } from 'framer-motion';
import amethystProducts from '../../data/amethystProducts';
import citrineProducts from '../../data/citrineProducts';
import garnetProducts from '../../data/garnetProducts';
import lapisLazuliProducts from '../../data/lapisLazuliProducts';
import pyriteProducts from '../../data/pyriteProducts';
import roseQuartzProducts from '../../data/roseQuartzProducts';
import seleniteProducts from '../../data/seleniteProducts';
import tigerEyeProducts from '../../data/tigerEyeProducts';
import ProductCollectionGrid from '../common/ProductCollectionGrid';

const stoneProducts = [
  ...pyriteProducts,
  ...garnetProducts,
  ...citrineProducts,
  ...tigerEyeProducts,
  ...amethystProducts,
  ...seleniteProducts,
  ...roseQuartzProducts,
  ...lapisLazuliProducts,
];

const braceletProducts = stoneProducts.filter((product) => /\bbracelets?\b/i.test(product.name));

const BraceletsPage = () => {
  const reduceMotion = useReducedMotion();

  return (
    <main className="min-h-[60vh] bg-[#f8f6f1]">
      <section className="product-hero group relative isolate min-h-[440px] overflow-hidden bg-[#21100b] sm:min-h-[500px]">
      <img
        src="/bracelets-hero.png"
        alt="A collection of colorful stone and Karungali bracelets arranged in a warm temple setting"
        className="product-hero-image absolute inset-0 h-full w-full object-cover object-[68%_center] sm:object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(25,8,5,0.94)_0%,rgba(37,13,7,0.84)_34%,rgba(48,19,9,0.42)_62%,rgba(48,19,9,0.08)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(20,7,4,0.3),transparent_48%)]" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex min-h-[440px] w-full max-w-[1440px] flex-col justify-center px-5 py-16 text-white sm:min-h-[500px] sm:px-8 sm:py-20 lg:px-11">
        <div className="max-w-2xl">
          <p className="mb-5 inline-flex items-center gap-2 border border-[#e9c77f]/55 bg-black/25 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f1d89f] sm:text-xs sm:tracking-[0.22em]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e9c77f]" aria-hidden="true" />
            The stone bracelet collection
          </p>
          <h1 className="max-w-xl font-serif text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
            Find your stone.
            <span className="mt-1 block text-[#f1d89f]">Wear your story.</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-6 text-white/90 sm:text-base sm:leading-7">
            Explore {braceletProducts.length} bracelets across Pyrite, Garnet, Citrine, Tiger Eye, Amethyst, Selenite, Rose Quartz, and Lapis Lazuli.
          </p>
          <a
            href="#stone-products"
            className="mt-7 inline-flex min-h-12 items-center gap-3 border border-[#e9c77f] bg-[#e9c77f] px-5 text-sm font-semibold text-[#28130b] transition-colors hover:border-[#f5e3b7] hover:bg-[#f5e3b7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#28130b]"
          >
            Explore bracelets
            <span aria-hidden="true">↓</span>
          </a>
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
      <ProductCollectionGrid
        name="Stone Bracelets"
        description={`${braceletProducts.length} bracelets across all stone collections.`}
        products={braceletProducts}
      />
    </main>
  );
};

export default BraceletsPage;
