import { motion, useReducedMotion } from 'framer-motion';

const StoneHero = ({ name, image, eyebrow, headline, description, imagePosition = '62%_center' }) => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="product-hero group relative isolate min-h-[420px] overflow-hidden bg-[#21100b] sm:min-h-[480px]">
      <img
        src={image}
        alt={`${name} collection`}
        style={{ objectPosition: imagePosition.replace('_', ' ') }}
        className="product-hero-image absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(25,8,5,0.92)_0%,rgba(37,13,7,0.82)_33%,rgba(48,19,9,0.44)_57%,rgba(48,19,9,0.03)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_45%,transparent_15%,rgba(20,7,4,0.16)_100%)]" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex min-h-[420px] w-full max-w-[1440px] flex-col justify-center px-5 py-14 text-white sm:min-h-[480px] sm:px-8 sm:py-16 lg:px-11">
        <div className="max-w-2xl">
          <p className="mb-4 inline-flex max-w-full flex-wrap items-center gap-2 border border-[#e9c77f]/50 bg-black/20 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f1d89f] sm:text-xs sm:tracking-[0.22em]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e9c77f]" aria-hidden="true" />
            {eyebrow}
          </p>
          <h1 className="max-w-xl font-serif text-[clamp(2rem,8vw,3rem)] font-semibold leading-[1.2] tracking-tight sm:text-5xl lg:text-6xl">
            {headline}
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-6 text-white/85 sm:text-base sm:leading-7">
            {description}
          </p>
          <a
            href="#stone-products"
            className="mt-7 inline-flex min-h-12 items-center gap-3 border border-[#e9c77f] bg-[#e9c77f] px-5 text-sm font-semibold text-[#28130b] transition-colors hover:border-[#f5e3b7] hover:bg-[#f5e3b7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#28130b]"
          >
            Explore the collection
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
  );
};

export default StoneHero;
