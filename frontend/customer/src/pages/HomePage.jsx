import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Heart, Plus, ShoppingCart } from 'lucide-react';
import { useCustomerStore } from '../store/useCustomerStore';
import { getProductImage, yantraProducts } from '../components/products/Yantra';
import { Link } from 'react-router-dom';
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';

// Real zodiac glyphs, ordered from Aries, grouped by classical element —
// used to color-code both the hero wheel and the sign-picker strip.
// Colors are deepened/muted versions suited to a light background.
const ELEMENT_COLORS = {
  fire: '#b25a3a',
  earth: '#6f7d43',
  air: '#a67c1e',
  water: '#3f6488',
};

const ZODIAC = [
  { glyph: '♈', name: 'Aries', element: 'fire' },
  { glyph: '♉', name: 'Taurus', element: 'earth' },
  { glyph: '♊', name: 'Gemini', element: 'air' },
  { glyph: '♋', name: 'Cancer', element: 'water' },
  { glyph: '♌', name: 'Leo', element: 'fire' },
  { glyph: '♍', name: 'Virgo', element: 'earth' },
  { glyph: '♎', name: 'Libra', element: 'air' },
  { glyph: '♏', name: 'Scorpio', element: 'water' },
  { glyph: '♐', name: 'Sagittarius', element: 'fire' },
  { glyph: '♑', name: 'Capricorn', element: 'earth' },
  { glyph: '♒', name: 'Aquarius', element: 'air' },
  { glyph: '♓', name: 'Pisces', element: 'water' },
];

const stoneShowcase = [
  {
    name: 'Pyrite',
    scientificName: 'Iron Pyrite (FeS₂)',
    image: '/1.png',
    description: 'A metallic golden stone known for its protective energy and abundance symbolism.',
    benefits: 'Boosts confidence, strengthens focus, and attracts clarity in business and decision-making.',
    whoCanWear: 'Ideal for entrepreneurs, professionals, and anyone seeking courage, discipline, and prosperity.',
  },
  {
    name: 'Garnet',
    scientificName: 'Grossular Garnet',
    image: '/2.png',
    description: 'A deep red gemstone associated with vitality, passion, and energetic renewal.',
    benefits: 'Improves motivation, supports heart health energy, and helps build emotional resilience.',
    whoCanWear: 'Best for students, professionals, and anyone who needs a fresh start or inner strength.',
  },
  {
    name: 'Citrine',
    scientificName: 'Silicon Dioxide / Quartz',
    image: '/3.png',
    description: 'A bright golden crystal linked with confidence, joy, and manifesting success.',
    benefits: 'Encourages optimism, helps attract wealth, and supports confident self-expression.',
    whoCanWear: 'Perfect for anyone working on career growth, abundance, and confidence-building.',
  },
  {
    name: 'Tiger Eye',
    scientificName: 'Quartz with Iron Inclusions',
    image: '/4.png',
    description: 'A grounding stone valued for courage, protection, and steady willpower.',
    benefits: 'Supports timing decisions, promotes calm focus, and defends against negativity.',
    whoCanWear: 'Great for leaders, risk-takers, and those who want strength during uncertain times.',
  },
  {
    name: 'Rose Quartz',
    scientificName: 'Silicon Dioxide / Quartz',
    image: '/5.png',
    description: 'A soft pink stone of love, compassion, and emotional balance.',
    benefits: 'Helps heal emotional wounds, improves self-love, and nurtures relationships.',
    whoCanWear: 'Recommended for anyone looking for love, harmony, or emotional gentleness in daily life.',
  },
  {
    name: 'Lapis Lazuli',
    scientificName: 'Lazurite',
    image: '/6.png',
    description: 'A royal blue crystal connected to wisdom, truth, and spiritual awareness.',
    benefits: 'Enhances intuition, improves communication, and deepens inner truth and self-expression.',
    whoCanWear: 'Ideal for thinkers, creatives, and anyone seeking honest communication and spiritual clarity.',
  },
  {
    name: 'Amethyst',
    scientificName: 'Quartz (Violet Variety)',
    image: '/7.png',
    description: 'A purple stone associated with calm, protection, and spiritual growth.',
    benefits: 'Eases stress, supports meditation, and helps calm the mind for deeper insight.',
    whoCanWear: 'Perfect for anyone needing emotional calm, spiritual focus, or better sleep.',
  },
  {
    name: 'Selenite',
    scientificName: 'Gypsum',
    image: '/8.png',
    description: 'A luminous white stone used for cleansing, serenity, and pure energy flow.',
    benefits: 'Purifies the aura, clears stagnant energy, and creates a peaceful environment.',
    whoCanWear: 'Best for spiritual practices, meditation, and anyone wanting mental calm and energetic clarity.',
  },
];

const gemstoneProducts = [
  { name: 'Neelam (Blue Sapphire)', category: 'Gemstone - Standard', price: 'Rs. 31,100.00', image: '/Gemstone/Standard/neelam-standard.webp', hoverImage: '/Gemstone/Standard/neelam-standard1.webp' },
  { name: 'Pukhraj (Yellow Sapphire)', category: 'Gemstone - Standard', price: 'Rs. 31,100.00', image: '/Gemstone/Standard/pukhraj-standard.webp', hoverImage: '/Gemstone/Standard/pukhraj-standard-3.webp' },
  { name: 'Panna (Emerald)', category: 'Gemstone - Standard', price: 'Rs. 31,100.00', image: '/Gemstone/Standard/panna-standard-1.webp', hoverImage: '/Gemstone/Standard/panna-standard-2.webp' },
  { name: "Lahsuniya (Cat's Eye)", category: 'Gemstone - Standard', price: 'Rs. 8,900.00', image: '/Gemstone/Standard/cats-eye-standard-1.webp', hoverImage: '/Gemstone/Standard/cats-eye-standard-2.webp' },
  { name: 'Gomed (Hessonite Garnet)', category: 'Gemstone - Standard', price: 'Rs. 8,900.00', image: '/Gemstone/Standard/gomed-standard-1.webp', hoverImage: '/Gemstone/Standard/gomed-standard-2.webp' },
  { name: 'Moonga (Red Coral)', category: 'Gemstone - Standard', price: 'Rs. 11,000.00', image: '/Gemstone/Standard/moonga-standard-1.webp', hoverImage: '/Gemstone/Standard/moonga-standard-2.webp' },
  { name: 'Moti (Pearl)', category: 'Gemstone - Standard', price: 'Rs. 6,400.00', image: '/Gemstone/Standard/moti-standard-1.webp', hoverImage: '/Gemstone/Standard/moti-standard-2.webp' },
  { name: 'Manikya (Ruby)', category: 'Gemstone - Standard', price: 'Rs. 24,600.00', image: '/Gemstone/Standard/manikya-standard-1.webp' },
  { name: 'Emerald (Panna)', category: 'Gemstone - Premium', price: 'Rs. 66,800.00', image: '/Gemstone/Premium/panna-premium-1.webp', hoverImage: '/Gemstone/Premium/panna-premium-2.webp' },
  { name: "Cat's Eye (Lahsuniya)", category: 'Gemstone - Premium', price: 'Rs. 14,700.00', image: '/Gemstone/Premium/cats-eye-premium-1.webp', hoverImage: '/Gemstone/Premium/cats-eye-premium-2.webp' },
  { name: 'Ruby (Manikya)', category: 'Gemstone - Premium', price: 'Rs. 33,900.00', image: '/Gemstone/Premium/manikya-premium-1.webp', hoverImage: '/Gemstone/Premium/manikya-premium-2.webp' },
  { name: 'Pearl (Moti)', category: 'Gemstone - Premium', price: 'Rs. 8,900.00', image: '/Gemstone/Premium/moti-premium-1.webp' },
  { name: 'Hessonite Garnet (Gomed)', category: 'Gemstone - Premium', price: 'Rs. 11,400.00', image: '/Gemstone/Premium/gomed-premium-2.webp' },
  { name: 'Yellow Sapphire (Pukhraj)', category: 'Gemstone - Premium', price: 'Rs. 66,800.00', image: '/Gemstone/Premium/pukhraj-premium-1.webp', hoverImage: '/Gemstone/Premium/pukhraj-premium-2.webp' },
  { name: 'Red Coral (Moonga)', category: 'Gemstone - Premium', price: 'Rs. 17,400.00', image: '/Gemstone/Premium/moonga-premium-1.webp', hoverImage: '/Gemstone/Premium/moonga-premium-2.webp' },
  { name: 'Blue Sapphire (Neelam)', category: 'Gemstone - Premium', price: 'Rs. 66,800.00', image: '/Gemstone/Premium/neelam-premium-2.webp' },
];

const topProducts = [
  { name: 'Shakti Peeth Yantra', price: 'Rs. 2,550.00', image: '/top%20products/1.png' },
  { name: 'Ashtasiddhi Yantra ', price: 'Rs. 41,000.00', image: '/top%20products/4.jpg' },
  { name: 'Lal Kitab Amrit ', price: 'Rs. 2,550.00', image: '/top%20products/3.jpg' },
  { name: 'Shukra Amrit Soap', price: 'Rs. 479.00', image: '/top%20products/2.jpg' },
  { name: 'Rahu Mantra Upchar Potli', price: 'Rs. 3,100.00', image: '/top%20products/6.png' },
  { name: 'Shani Amrit Dhoop', price: 'Rs. 409.00', image: '/top%20products/5.jpg' },
  
];

const ShoppingCartPlus = () => (
  <span className="relative inline-flex h-4 w-4 shrink-0" aria-hidden="true">
    <ShoppingCart className="h-4 w-4" />
    <Plus className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[#4a0217]" strokeWidth={3} />
  </span>
);

/** Hand-built radial chart wheel — ink linework on ivory, glyphs color-coded
 * by element, so it reads as astrological rather than decorative. */
const ChartWheel = () => {
  const center = 200;
  const glyphRadius = 152;
  const outerRadius = 186;
  const innerRadius = 118;

  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" role="img" aria-label="Zodiac chart wheel">
      <circle cx={center} cy={center} r={outerRadius} fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1" />
      <circle cx={center} cy={center} r={innerRadius} fill="none" stroke="#ffffff" strokeOpacity="0.22" strokeWidth="1" />
      <circle cx={center} cy={center} r={28} fill="#ffffff" fillOpacity="0.9" stroke="#f3c969" strokeOpacity="0.8" strokeWidth="1" />
      <text x={center} y={center + 8} textAnchor="middle" fontSize="22" fill="#b8863c">☉</text>

      {ZODIAC.map((sign, i) => {
        const angle = (-90 + i * 30) * (Math.PI / 180);
        const tickInner = { x: center + innerRadius * Math.cos(angle), y: center + innerRadius * Math.sin(angle) };
        const tickOuter = { x: center + outerRadius * Math.cos(angle), y: center + outerRadius * Math.sin(angle) };
        const glyphPos = {
          x: center + glyphRadius * Math.cos(angle + Math.PI / 12),
          y: center + glyphRadius * Math.sin(angle + Math.PI / 12),
        };
        return (
          <g key={sign.name}>
            <line x1={tickInner.x} y1={tickInner.y} x2={tickOuter.x} y2={tickOuter.y} stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1" />
            <text
              x={glyphPos.x}
              y={glyphPos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="17"
              fill={ELEMENT_COLORS[sign.element]}
            >
              {sign.glyph}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const RotatingLalKitab = () => {
  const [rotation, setRotation] = useState(0);
  const isDragging = useRef(false);

  useEffect(() => {
    let animationFrame;
    let previousTime = performance.now();

    const animate = (time) => {
      const elapsed = time - previousTime;
      previousTime = time;

      if (!isDragging.current) {
        setRotation((currentRotation) => currentRotation + elapsed * 0.018);
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const handlePointerDown = (event) => {
    if (event.button !== 0) return;

    event.preventDefault();
    isDragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!isDragging.current) return;

    event.preventDefault();
    setRotation((currentRotation) => currentRotation + event.movementX * 0.8);
  };

  const stopDragging = (event) => {
    isDragging.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div
      className="pointer-events-auto absolute right-[4%] top-1/2 w-[42%] max-w-[520px] -translate-y-1/2 cursor-grab touch-none select-none active:cursor-grabbing sm:right-[3%] sm:w-[38%] lg:right-[5%] lg:w-[30%]"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onLostPointerCapture={() => {
        isDragging.current = false;
      }}
      role="slider"
      aria-label="Rotate Lal Kitab"
      aria-valuenow={Math.round(rotation % 360)}
      aria-valuemin="-360"
      aria-valuemax="360"
      tabIndex="0"
    >
      <img
        src="/lal-kitab%201.1.png"
        alt="Lal Kitab astrology book"
        draggable="false"
        className="pointer-events-none block w-full object-contain"
        style={{ transform: `rotate(${rotation}deg)` }}
      />
    </div>
  );
};

/* ---------------------------------------------------------------------------
 * Product card — "The Doorway"
 * A deep burgundy card with an arched niche (a temple doorway) holding the
 * product. Behind the arch a fine-line zodiac wheel turns like a slow sun, and
 * speeds up when you hover. The card tilts toward the cursor and a soft rose-gold light
 * follows it. Add to your index.html for the heading font (falls back to Georgia):
 *   <link href="https://fonts.googleapis.com/css2?family=Marcellus&display=swap" rel="stylesheet" />
 * ------------------------------------------------------------------------- */
const CARD_SERIF = "'Marcellus', Georgia, serif";
const CARD_GOLD = '#e8b4a0'; // rose gold
const CARD_EASE = [0.22, 1, 0.36, 1];
const ARCH_RADIUS = '50% 50% 20px 20px / 40% 40% 20px 20px';
const NICHE_RADIUS = '50% 50% 27px 27px / 39% 39% 27px 27px';

const makeVariants = (reduce) => {
  if (reduce) {
    return {
      card: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.3 } } },
      halo: {},
      arch: {},
      seal: {},
      text: {},
    };
  }
  return {
    card: {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.9, ease: CARD_EASE } },
    },
    halo: {
      hidden: { opacity: 0, scale: 0.6 },
      show: { opacity: 1, scale: 1, transition: { duration: 1.5, ease: CARD_EASE } },
    },
    // The doorway "opens" from the floor up.
    arch: {
      hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
      show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.9, ease: CARD_EASE } },
    },
    seal: {
      hidden: { opacity: 0, scale: 0.4 },
      show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 220, damping: 20, delay: 0.2 } },
    },
    text: {
      hidden: { opacity: 0, y: 14 },
      show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: CARD_EASE, delay: 0.15 } },
    },
  };
};

/** Thin rose-gold zodiac wheel; upright glyphs face outward like an astrolabe rim. */
const HaloWheel = ({ rotation }) => (
  <motion.div style={{ rotate: rotation }} className="h-full w-full">
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
      <circle cx="100" cy="100" r="98" fill="none" stroke={CARD_GOLD} strokeOpacity="0.32" />
      <circle cx="100" cy="100" r="70" fill="none" stroke={CARD_GOLD} strokeOpacity="0.2" strokeDasharray="1 4" />
      {ZODIAC.map((sign, i) => {
        const tickAngle = (i * 30 * Math.PI) / 180;
        const glyphDeg = i * 30 + 15;
        const glyphAngle = (glyphDeg * Math.PI) / 180;
        const gx = 100 + 84 * Math.sin(glyphAngle);
        const gy = 100 - 84 * Math.cos(glyphAngle);
        return (
          <g key={sign.name}>
            <line
              x1={100 + 70 * Math.sin(tickAngle)}
              y1={100 - 70 * Math.cos(tickAngle)}
              x2={100 + 98 * Math.sin(tickAngle)}
              y2={100 - 98 * Math.cos(tickAngle)}
              stroke={CARD_GOLD}
              strokeOpacity="0.3"
            />
            <text
              x={gx}
              y={gy}
              fontSize="11"
              textAnchor="middle"
              dominantBaseline="central"
              fill={CARD_GOLD}
              fillOpacity="0.75"
              transform={`rotate(${glyphDeg} ${gx} ${gy})`}
            >
              {`${sign.glyph}\uFE0E`}
            </text>
          </g>
        );
      })}
    </svg>
  </motion.div>
);

const ProductCard = ({ product, index }) => {
  const cart = useCustomerStore((state) => state.cart);
  const wishlist = useCustomerStore((state) => state.wishlist);
  const setCart = useCustomerStore((state) => state.setCart);
  const setWishlist = useCustomerStore((state) => state.setWishlist);
  const reduce = useReducedMotion();
  const cardRef = useRef(null);
  const variants = makeVariants(reduce);

  // Pointer position inside the card, 0..1, smoothed with springs.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 140, damping: 18 });
  const sy = useSpring(py, { stiffness: 140, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], [5, -5]);
  const rotateX = useTransform(sy, [0, 1], [-5, 5]);
  const imgX = useTransform(sx, [0, 1], [8, -8]);
  const imgY = useTransform(sy, [0, 1], [6, -6]);
  const glowX = useTransform(sx, (v) => `${v * 100}%`);
  const glowY = useTransform(sy, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(240px circle at ${glowX} ${glowY}, rgba(232,180,160,0.22), transparent 70%)`;
  const zoom = useSpring(1.1, { stiffness: 120, damping: 20 });

  // The halo wheel turns slowly and eases up to a faster spin on hover.
  const rotation = useMotionValue(index * 40);
  const speed = useRef(5);
  const targetSpeed = useRef(5);
  useAnimationFrame((_, delta) => {
    if (reduce) return;
    speed.current += (targetSpeed.current - speed.current) * 0.05;
    rotation.set(rotation.get() + (speed.current * delta) / 1000);
  });

  const handlePointerEnter = (event) => {
    if (reduce || event.pointerType !== 'mouse') return;
    targetSpeed.current = 30;
    zoom.set(1.18);
  };
  const handlePointerMove = (event) => {
    if (reduce || event.pointerType !== 'mouse' || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };
  const handlePointerLeave = () => {
    px.set(0.5);
    py.set(0.5);
    targetSpeed.current = 5;
    zoom.set(1.1);
  };

  const rawPrice = product.price.replace(/^Rs\.?\s*/i, '');
  const [whole, decimals] = rawPrice.split('.');
  const isInCart = cart.some((item) => item.name === product.name);
  const isWishlisted = wishlist.some((item) => item.name === product.name);

  const handleAddToCart = () => {
    const existingItem = cart.find((item) => item.name === product.name);
    setCart(existingItem
      ? cart.map((item) => item.name === product.name ? { ...item, quantity: (item.quantity || 1) + 1 } : item)
      : [...cart, { ...product, quantity: 1 }]);
  };

  const handleToggleWishlist = () => {
    setWishlist(isWishlisted
      ? wishlist.filter((item) => item.name !== product.name)
      : [...wishlist, product]);
  };

  return (
    <motion.article
      ref={cardRef}
      variants={variants.card}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={reduce ? undefined : { y: -6 }}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="group relative isolate overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#4a0217_0%,#430015_100%)] ring-1 ring-[#e8b4a0]/15"
    >
      {/* Cursor-following light */}
      <motion.div
        aria-hidden="true"
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-x-0 top-0 bottom-14 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Zodiac halo behind the doorway */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-[14%] top-[-8%] z-0 aspect-square w-[128%]">
        <motion.div variants={variants.halo} className="h-full w-full">
          <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.07]">
            <HaloWheel rotation={rotation} />
          </div>
        </motion.div>
      </div>

      <a
        href="/products"
        className="relative z-10 block rounded-[30px] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#e8b4a0]"
      >
        {/* The doorway */}
        <div className="px-[11%] pt-6">
          <div className="relative">
            <span
              aria-hidden="true"
              style={{ borderRadius: NICHE_RADIUS }}
              className="absolute -inset-[7px] border border-[#e8b4a0]/35 transition-colors duration-500 group-hover:border-[#e8b4a0]/70"
            />
            <motion.div
              variants={variants.arch}
              style={{ borderRadius: ARCH_RADIUS }}
              className="relative aspect-[6/7] overflow-hidden bg-[radial-gradient(circle_at_50%_30%,#fff4ee_0%,#f4d5c8_70%,#dfae9b_100%)]"
            >
              <motion.img
                src={product.image}
                alt={product.name}
                style={{ x: imgX, y: imgY, scale: zoom }}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3a0017]/45 via-transparent to-transparent" />
            </motion.div>

          </div>
        </div>

        {/* Name + price */}
        <motion.div variants={variants.text} className="relative px-4 pb-2 pt-4 sm:px-5">
          {/* Masks the zodiac halo behind the text so the name stays readable */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(67,0,21,0)_0%,#430015_20%)]" />
          <h3
            style={{ fontFamily: CARD_SERIF }}
            className="line-clamp-2 min-h-[2.3rem] text-[1rem] leading-[1.3] text-[#fbf3ee]"
          >
            {product.name}
          </h3>

        </motion.div>
      </a>

      <div className="relative z-10 flex items-center justify-between gap-2 px-4 pb-4 sm:px-5">
        <p style={{ fontFamily: CARD_SERIF }} className="min-w-0 flex-1 tabular-nums leading-none text-[#f7d3c4] text-[1.05rem] sm:text-[1.3rem]">
          <span className="mr-1 text-[0.65em] text-[#f7d3c4]/60">Rs.</span>
          {whole}
          {decimals && <span className="text-[0.65em] opacity-60">.{decimals}</span>}
        </p>
        <button
          type="button"
          onClick={handleAddToCart}
          aria-label={isInCart ? `Add another ${product.name} to cart` : `Add ${product.name} to cart`}
          title={isInCart ? 'Add another to cart' : 'Add to cart'}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#e8b4a0]/45 text-[#fbf3ee] transition hover:bg-[#e8b4a0]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8b4a0]"
        >
          <ShoppingCartPlus className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-pressed={isWishlisted}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#e8b4a0]/45 text-[#fbf3ee] transition hover:bg-[#e8b4a0]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8b4a0]"
        >
          <Heart className="h-4 w-4" fill={isWishlisted ? 'currentColor' : 'none'} aria-hidden="true" />
        </button>
      </div>
    </motion.article>
  );
};

const CatalogCard = ({ product, isDuplicate = false }) => {
  const gemstoneCategory = product.category?.startsWith('Gemstone -') ? product.category : null;
  const displayName = gemstoneCategory ? `${product.name} ${gemstoneCategory}` : product.name;
  const displayPrice = product.price?.startsWith('₹') && !product.price.includes('.')
    ? `${product.price}.00`
    : product.price;

  return (
    <article className="group h-full w-full overflow-hidden rounded-lg border border-[#201b3a]/10 bg-white transition duration-200 hover:border-[#201b3a]/20 hover:shadow-md">
      <a
        href="/products"
        aria-label={`View ${displayName}`}
        tabIndex={isDuplicate ? -1 : undefined}
        draggable="false"
        className="block outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#201b3a]/40"
      >
        <div className="aspect-square w-full overflow-hidden bg-[#f7f5f0] p-6">
          <div className="relative h-full w-full">
            <img
              src={product.image || getProductImage(product)}
              alt={displayName}
              draggable="false"
              loading="lazy"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = '/Yantra/yantra1.jpg';
              }}
              className={`h-full w-full object-contain transition ease-out group-hover:scale-105 ${product.hoverImage ? 'duration-700 group-hover:opacity-0' : 'duration-300'}`}
            />
            {product.hoverImage && (
              <img
                src={product.hoverImage}
                alt=""
                aria-hidden="true"
                draggable="false"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-contain opacity-0 transition duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
              />
            )}
          </div>
        </div>
        <div className="border-t border-[#201b3a]/10 px-4 py-4">
          <h3 className={`text-center text-[0.95rem] font-medium leading-[1.2] text-[#8a6a1f] ${gemstoneCategory ? 'line-clamp-3 min-h-[2.75rem]' : 'line-clamp-2 min-h-[2.25rem]'}`}>
            {gemstoneCategory ? (
              <>
                <span className="block">{product.name}</span>
                <span className="block">{gemstoneCategory}</span>
              </>
            ) : displayName}
          </h3>
          <p className="text-center text-[0.95rem] font-semibold text-[#201b3a]">
            {displayPrice || 'View details'}
          </p>
        </div>
      </a>
    </article>
  );
};

const ProductMarquee = ({ products, ariaLabel }) => {
  const marqueeRef = useRef(null);
  const dragState = useRef(null);
  const suppressClick = useRef(false);
  const offset = useRef(0);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let frameId;
    let previousTime;
    const advance = (time) => {
      if (previousTime !== undefined && !dragState.current) {
        const track = marquee.querySelector('.yantra-marquee__track');
        const loopWidth = marquee.querySelector('.yantra-marquee__group')?.getBoundingClientRect().width;
        const elapsed = Math.min(time - previousTime, 32);
        if (track && loopWidth > 0) {
          offset.current = (offset.current + elapsed * 0.025) % loopWidth;
          track.style.transform = `translate3d(${-offset.current}px, 0, 0)`;
        }
      }
      previousTime = time;
      frameId = requestAnimationFrame(advance);
    };

    frameId = requestAnimationFrame(advance);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const handlePointerDown = (event) => {
    if (!event.isPrimary || event.button !== 0) return;
    dragState.current = { isDragging: false, startOffset: offset.current, startX: event.clientX };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const drag = dragState.current;
    if (!drag) return;

    const deltaX = event.clientX - drag.startX;
    if (Math.abs(deltaX) > 4) drag.isDragging = true;
    if (!drag.isDragging) return;
    event.preventDefault();
    const track = marqueeRef.current.querySelector('.yantra-marquee__track');
    const loopWidth = marqueeRef.current.querySelector('.yantra-marquee__group')?.getBoundingClientRect().width;
    const nextOffset = drag.startOffset - deltaX;
    offset.current = loopWidth > 0
      ? ((nextOffset % loopWidth) + loopWidth) % loopWidth
      : Math.max(0, nextOffset);
    if (track) track.style.transform = `translate3d(${-offset.current}px, 0, 0)`;
  };

  const handlePointerUp = (event) => {
    if (!dragState.current) return;
    suppressClick.current = dragState.current.isDragging;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragState.current = null;
  };

  const handleClick = (event) => {
    if (!suppressClick.current) return;
    suppressClick.current = false;
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div
      ref={marqueeRef}
      className="yantra-marquee mt-4"
      role="region"
      aria-label={ariaLabel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClickCapture={handleClick}
    >
      <div className="yantra-marquee__track">
        {[false, true].map((isDuplicate) => (
          <div
            key={isDuplicate ? 'duplicate' : 'products'}
            className="yantra-marquee__group"
            aria-hidden={isDuplicate ? 'true' : undefined}
          >
            {products.map((product, index) => (
              <div className="yantra-marquee__item" key={`${product.name}-${product.image || index}-${isDuplicate ? 'duplicate' : 'original'}`}>
                <CatalogCard product={product} isDuplicate={isDuplicate} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
// --------------------Rudraksha Mandal Component--------------------

const rudrakshaMukhi = Array.from({ length: 13 }, (_, index) => {
  const mukhi = index + 1;
  return {
    mukhi,
    image: `/Rudraksha/${mukhi}%20${mukhi === 12 ? 'mukhi' : 'Mukhi'}.png`,
  };
});

const RudrakshaMandal = () => {
  const reduceMotion = useReducedMotion();
  const [hoveredMukhi, setHoveredMukhi] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const pointerPosition = useRef(null);
  const lastPointerCheck = useRef(0);

  const trackPointer = (event) => {
    pointerPosition.current = { x: event.clientX, y: event.clientY };
    setTooltipPosition({
      x: Math.max(8, Math.min(event.clientX + 12, window.innerWidth - 150)),
      y: Math.max(8, Math.min(event.clientY + 12, window.innerHeight - 42)),
    });
  };

  useAnimationFrame((time) => {
    const pointer = pointerPosition.current;
    if (!pointer || time - lastPointerCheck.current < 50) return;

    lastPointerCheck.current = time;
    const hoveredElement = document.elementFromPoint(pointer.x, pointer.y);
    const mukhiValue = hoveredElement?.closest('[data-mukhi]')?.getAttribute('data-mukhi');
    const nextMukhi = mukhiValue === null || mukhiValue === undefined ? null : Number(mukhiValue);

    setHoveredMukhi((currentMukhi) => currentMukhi === nextMukhi ? currentMukhi : nextMukhi);
  });

  return (
    <div
      className="relative mx-auto aspect-square w-[min(80vw,360px)] shrink-0 md:ml-auto md:mr-0 md:w-[min(42vw,360px)]"
      onPointerMove={trackPointer}
      onPointerLeave={() => {
        pointerPosition.current = null;
        setHoveredMukhi(null);
      }}
    >
      <motion.div
        className="absolute inset-0"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {rudrakshaMukhi.map(({ mukhi, image }, index) => {
          const angle = (index / rudrakshaMukhi.length) * Math.PI * 2 - Math.PI / 2;
          const left = `${50 + Math.cos(angle) * 44}%`;
          const top = `${50 + Math.sin(angle) * 44}%`;

          return (
            <div
              key={mukhi}
              data-mukhi={mukhi}
              className={`absolute h-[21%] w-[21%] -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ${hoveredMukhi === mukhi ? 'z-30 scale-125' : 'z-10'}`}
              style={{ left, top }}
            >
              <img
                src={image}
                alt={`${mukhi} Mukhi Rudraksha`}
                loading="lazy"
                className="h-full w-full rounded-full object-cover drop-shadow-[0_1px_5px_rgba(179,113,48,0.45)]"
              />
            </div>
          );
        })}
      </motion.div>
      <div
        data-mukhi="0"
        className={`absolute left-1/2 top-1/2 h-[40%] w-[40%] -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ${hoveredMukhi === 0 ? 'z-30 scale-110' : 'z-20'}`}
      >
        <motion.img
          src="/Rudraksha/0%20Mukhi.png"
          alt="0 Mukhi Rudraksha"
          loading="lazy"
          className="h-full w-full rounded-full object-cover drop-shadow-[0_1px_5px_rgba(179,113,48,0.45)]"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          whileHover={reduceMotion ? undefined : { scale: 1.12 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      {hoveredMukhi !== null && (
        <div
          role="tooltip"
          className="pointer-events-none fixed z-[100] rounded border border-[#f3c48c]/60 bg-[#1b0802]/95 px-2.5 py-1.5 text-xs font-semibold text-[#fff6e9] shadow-lg"
          style={{ left: tooltipPosition.x, top: tooltipPosition.y }}
        >
          {hoveredMukhi} Mukhi Rudraksha
        </div>
      )}
    </div>
  );
};

const RudrakshaBanner = () => (
  <section className="relative isolate min-h-[360px] overflow-hidden bg-[#1b0802] sm:min-h-[400px] lg:min-h-[420px]">
    <img
      src="/Rudra.jpg"
      alt=""
      aria-hidden="true"
      className="absolute inset-0 h-full w-full scale-[1.06] object-cover object-[72%_center] origin-[72%_center]"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-[#1b0802]/90 via-[#1b0802]/65 to-[#1b0802]/10" aria-hidden="true" />
    <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-6 py-12 sm:px-10 md:flex-row md:items-center md:gap-10 lg:min-h-[420px] lg:px-16 lg:py-7">
      <div className="w-full text-white md:flex-1 lg:-translate-y-3">
        <h2 className="max-w-2xl text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-normal">
          Discover the Divine Power of Authentic Rudraksha.
        </h2>
        <p className="mt-4 text-left text-sm font-normal leading-6 text-white sm:text-base sm:leading-7">
          Sourced directly from the pristine foothills of the Himalayas, our lab-certified, 100% genuine beads are meticulously selected and sacredly energized to bring peace, protection, and prosperity to your life. Whether you are seeking spiritual alignment, stress relief, or a powerful shield against negative energies, explore our premium collection to find the perfect Mukhi destined for your journey.
        </p>
        <Link
          to="/rudraksha"
          className="group mt-6 inline-flex min-h-11 items-center gap-3 rounded-full bg-[#f3c48c] px-6 py-3 text-sm font-semibold text-[#1b0802] transition-colors hover:bg-[#ffdbac] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1b0802]"
        >
          Shop now
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
      <RudrakshaMandal />
    </div>
  </section>
);

const contactVideoLayout = [
  { id: 5, size: 42, center: true },
  { id: 1, angle: 0, size: 16 },
  { id: 4, angle: 45, size: 16 },
  { id: 6, angle: 90, size: 16 },
  { id: 7, angle: 135, size: 16 },
  { id: 9, angle: 180, size: 16 },
  { id: 10, angle: 225, size: 16 },
  { id: 11, angle: 270, size: 16 },
  { id: 13, angle: 315, size: 16 },
];

const ContactVideoCluster = () => {
  const reduceMotion = useReducedMotion();
  const orbitTransition = { duration: 36, repeat: Infinity, ease: 'linear' };
  const centerVideo = contactVideoLayout.find(({ center }) => center);

  return (
    <div className="relative flex w-full items-center justify-center">
      <div className="relative aspect-square w-[min(86vw,460px)] sm:w-[min(70vw,540px)] lg:w-full lg:max-w-[min(580px,calc(100svh-7rem))]">
        <motion.div
          className="absolute inset-0"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={orbitTransition}
        >
          {contactVideoLayout.filter(({ center }) => !center).map(({ id, angle, size }) => {
            const x = 50 + Math.cos((angle * Math.PI) / 180) * 39;
            const y = 50 + Math.sin((angle * Math.PI) / 180) * 39;

            return (
              <div
                key={`${id}-${angle}`}
                className="absolute overflow-hidden rounded-full border-0 bg-transparent shadow-none"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: `${size}%`,
                  height: `${size}%`,
                  aspectRatio: '1 / 1',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <motion.div
                  className="h-full w-full"
                  animate={reduceMotion ? undefined : { rotate: -360 }}
                  transition={orbitTransition}
                >
                  <video
                    src={`/contact/${id}.mp4`}
                    aria-label={`Contact gallery video ${id}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="h-full w-full rounded-full object-cover object-center scale-[1.4]"
                    style={{ display: 'block', aspectRatio: '1 / 1', objectFit: 'cover', objectPosition: 'center' }}
                  />
                </motion.div>
              </div>
            );
          })}
        </motion.div>
        {centerVideo && (
          <div
            className="absolute left-1/2 top-1/2 overflow-hidden rounded-full"
            style={{
              width: `${centerVideo.size}%`,
              height: `${centerVideo.size}%`,
              aspectRatio: '1 / 1',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <video
              src={`/contact/${centerVideo.id}.mp4`}
              aria-label={`Contact gallery video ${centerVideo.id}`}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full rounded-full object-cover object-center scale-[1.4]"
              style={{ display: 'block', aspectRatio: '1 / 1', objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
  <div className="bg-[#f8f6f1]">
    {/* Hero */}
    <section className="relative overflow-hidden bg-[#15112f]">
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[70%_center] opacity-100"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      >
        <source src="/v2.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,#15112f_0%,#171432_28%,rgba(23,20,50,0.96)_45%,rgba(23,20,50,0.72)_60%,rgba(23,20,50,0)_78%)]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-66px)] max-w-[1440px] items-center px-4 py-6 sm:px-8 lg:py-8">
        <div className="w-full max-w-2xl lg:w-[58%] lg:pr-10">
          <p className="mb-3 text-[clamp(0.7rem,1vw,0.85rem)] font-bold uppercase tracking-[0.22em] text-[#f3c969]">Personalised gemstone guidance</p>
          <h1 className="max-w-xl text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.15] tracking-normal text-white">
            Unlock the power of your birth chart.
          </h1>
          <p className="mt-5 max-w-lg text-[clamp(0.9rem,1.2vw,1.05rem)] leading-6 text-white/70">
            Natural gemstones and sacred jewellery matched to your sign, planet and intention. Sourced responsibly and verified before it reaches you.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/products" className="inline-flex items-center gap-2 rounded-full bg-[#f3c969] px-6 py-3 text-sm font-bold text-[#17132d] transition hover:bg-white">
              Shop the collection <ArrowRight className="h-4 w-4" />
            </a>
            <a href="/quiz" className="rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:border-[#f3c969] hover:text-[#f3c969]">
              Find my stone
            </a>
          </div>

        </div>

      </div>
    </section>

    {/* Stone strip */}
    <section className="relative z-0 w-full overflow-visible bg-[#f5f1eb] px-0 pb-4 pt-2">
      <div className="mx-auto max-w-[1440px] px-4 pb-2 pt-1 sm:px-8">
        <p className="text-left text-[0.85rem] font-semibold uppercase tracking-[0.18em] text-[#201b3a]/70">Shop by Stones</p>
      </div>
      <div className="relative mx-auto flex w-full max-w-[1440px] items-end justify-between gap-3 overflow-x-auto px-4 sm:gap-4 sm:px-8 md:gap-5 lg:gap-6">
        {stoneShowcase.map((stone, index) => (
          <div
            key={stone.name + index}
            className="group relative flex min-w-[120px] flex-col items-center justify-end text-center transition duration-300 ease-out hover:-translate-y-1 sm:min-w-[140px]"
          >
            <img
              src={stone.image}
              alt={stone.name}
              className="h-20 w-auto object-contain transition duration-300 ease-out group-hover:scale-[1.04] sm:h-24 md:h-28 lg:h-32"
              style={{ background: 'transparent' }}
            />
            <span className="mt-1 pb-1 text-[0.82rem] font-medium tracking-normal text-[#201b3a] transition duration-300 group-hover:text-[#2b2250] sm:text-[0.95rem]">
              {stone.name}
            </span>
          </div>
        ))}
      </div>

    </section>

    <div className="h-8 bg-[#f5f1eb]" aria-hidden="true" />

    {/* Lal Kitab promotion */}
    <section className="relative isolate min-h-[360px] overflow-hidden bg-[#4d001e] sm:min-h-[400px] lg:min-h-[420px]">
      <img
        src="/lal-kitab%201.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[#3c0019]/20" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-[360px] max-w-[1440px] items-center px-6 py-12 sm:min-h-[400px] sm:px-10 lg:min-h-[420px] lg:px-16">
        <div className="max-w-xl text-white lg:max-w-[55%]">
          <h2 className="max-w-2xl text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-normal">
            Discover the Blueprint of Your Destiny
          </h2>
          <p className="mt-4 text-[clamp(1rem,1.4vw,1.25rem)] font-semibold leading-7 text-white">
            Now Just One Exclusive Click Away
          </p>
          <a
            href="/products"
            className="mt-12 inline-flex items-center rounded-md bg-[#ffd400] px-6 py-3 text-xs font-bold text-[#3d0017] transition hover:bg-white"
          >
            Get Your Exclusive Lal Kitab Now
          </a>
          <p className="mt-8 text-[0.68rem] font-semibold leading-5 text-[#ffd400] sm:text-xs">
            <span aria-hidden="true">★ </span>
            Over 1 Lakh Verified Predictions Delivered — A Standard of Trust &amp; Accuracy
            <span aria-hidden="true"> ★</span>
          </p>
        </div>

        <RotatingLalKitab />
      </div>
    </section>

    {/* Top products */}
    <section className="bg-[#f3efe9] px-4 py-6 sm:px-8 lg:py-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col items-center justify-between gap-3 pb-2 text-center">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold leading-tight tracking-normal text-[#201b3a] sm:text-3xl">
                Trusted essentials, chosen by thousands.
            </h2>
            <p className="mx-auto mt-2 max-w-3xl text-sm leading-5 text-[#5b5470]">
                Explore carefully selected products inspired by the timeless wisdom of Life, bringing traditional knowledge and modern quality together for balance, positivity, prosperity, and spiritual well-being.
            </p>
          </div>
        </div>

        <div className="mt-5 flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {topProducts.map((product, index) => (
            <div key={product.name} className="min-w-[220px] flex-1 lg:min-w-0">
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>

    <RudrakshaBanner />

    <div className="h-[1px] w-full bg-[#201b3a]/10" />

    {/* Yantra collection */}
    <section className="bg-[#f3efe9] px-4 py-7 sm:px-8 lg:py-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold leading-tight text-[#201b3a] sm:text-3xl">Buy Siddh Yantra</h2>
          <p className="mx-auto mt-3 max-w-5xl text-sm leading-6 text-[#5b5470] sm:text-base">
            Explore our collection of Siddh Yantras, prepared with authentic methods and guided by the wisdom of G.D. Vashist. Each Yantra is designed to help attract positive energy, overcome challenges, and support your journey toward success and harmony.
          </p>
          <div className="mt-2 flex justify-end">
            <a href="/products" className="inline-flex items-center gap-1 text-xs font-semibold text-[#201b3a] transition hover:text-[#cf092c]">
              View all products <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </div>

        <ProductMarquee
          products={yantraProducts.filter((product) => product.exclusive)}
          ariaLabel="Yantra products"
        />
      </div>
    </section>

    {/* Gemstone collection */}
    <section className="bg-[#f5f1eb] px-4 pb-7 pt-0 sm:px-8 lg:pb-10 lg:pt-0">
      <div className="mx-auto max-w-[1440px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold leading-tight text-[#201b3a] sm:text-3xl">Certified Auspicious Gemstone</h2>
          <p className="mx-auto mt-3 max-w-5xl text-sm leading-6 text-[#5b5470] sm:text-base">
            Explore our carefully curated collection of gemstones, Siddh Yantras, Rudraksha, and Vedic remedies, thoughtfully selected to help you strengthen positive planetary influences and bring peace, confidence, and prosperity into your life.
          </p>
          <div className="mt-2 flex justify-end">
            <a href="/products?category=Find%20your%20gemstone" className="inline-flex items-center gap-1 text-xs font-semibold text-[#201b3a] transition hover:text-[#cf092c]">
              View all gemstones <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </div>

        <ProductMarquee products={gemstoneProducts} ariaLabel="Gemstone products" />
      </div>
    </section>

    {/* Services banner */}
    <section
      className="relative isolate min-h-[480px] overflow-hidden bg-[#07131b] bg-fixed bg-cover bg-center bg-no-repeat px-6 py-12 sm:px-10 sm:py-14 lg:min-h-[600px] lg:px-16"
      style={{ backgroundImage: "url('/services.png')" }}
    >
      <div className="absolute inset-0 bg-[#041018]/55" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-[1440px]">
        <h2 className="text-center text-3xl font-bold leading-tight text-white sm:text-4xl">Designing Your Future, One Planet at a Time</h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-7 text-white/90 sm:text-lg">
          We interpret planetary patterns through precise astrology, offering clear insight to help you find balance and move toward a brighter future.
        </p>
        <div className="relative mt-6 min-h-[340px] sm:mt-8 sm:min-h-[380px] lg:min-h-[440px]">
          <div className="absolute inset-y-0 right-[-8%] flex w-[72%] translate-y-12 items-end justify-end md:right-[-10%] md:w-[64%] lg:right-[-16%]">
            <img
              src="/Sadhu.png"
              alt="Vedic sage in meditation"
              className="h-[300px] w-auto max-w-none object-contain sm:h-[380px] md:h-[500px] lg:h-[560px]"
            />
          </div>
        </div>
      </div>
    </section>

    {/* Services we offer */}
    <section className="bg-[#f5f1eb] px-4 py-7 sm:px-8 lg:py-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-[#201b3a] sm:text-4xl">
            Services We Offer
          </h2>
          <p className="mx-auto mt-3 max-w-6xl text-sm leading-6 text-[#5b5470] sm:text-base md:line-clamp-2">
            Explore expert astrology services including kundli analysis, Lal Kitab remedies, numerology guidance, and gemstone recommendations. Get personalized Vedic solutions to overcome challenges and bring clarity, success, and peace into your life.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: 'Horoscope & Kundali',
              image: '/horoscope-kundali-upload.jpg',
              alt: 'Horoscope and kundali reading',
            },
            {
              title: 'Lal Kitab Remedies',
              image: '/lal-kitab-card.png',
              alt: 'Lal Kitab remedies',
            },
            {
              title: 'Spiritual Poojas',
              image: '/spiritual-poojas-card.mp4',
              mediaType: 'video',
              alt: 'Spiritual pooja and astrology consultation',
            },
            {
              title: 'Spiritual Guidance',
              image: '/spiritual-guidance-card.jpg',
              alt: 'Spiritual guidance',
            },
          ].map((service) => (
            <a
              key={service.title}
              href="/products"
              className="group overflow-hidden rounded-2xl border border-[#e8ddd0] bg-white shadow-[0_4px_16px_rgba(61,39,21,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(61,39,21,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9a5c23] focus-visible:ring-offset-2"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#eee5da] to-[#f8f3ec]">
                {service.mediaType === 'video' ? (
                  <video
                    src={service.image}
                    aria-label={service.alt}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <img
                    src={service.image}
                    alt={service.alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                )}
              </div>
              <h3 className="flex min-h-16 items-center justify-center px-3 py-4 text-center text-base font-semibold text-[#4c3524] sm:text-lg">
                {service.title}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>

    {/* Guided destiny banner */}
    <section
      className="relative isolate flex min-h-[75svh] items-center justify-center overflow-hidden bg-[#081820] bg-fixed bg-cover bg-center bg-no-repeat px-4 py-8 sm:px-8 lg:min-h-[calc(100svh-6rem)] lg:px-16 lg:py-6"
      style={{ backgroundImage: "url('/Rudra.jpg')" }}
    >
      <div className="absolute inset-0 bg-[#050915]/25" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-[1440px]">
        <div className="-translate-x-4 grid items-center gap-6 lg:-translate-x-28 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-12">
          <div className="flex w-full items-center justify-center">
            <ContactVideoCluster />
          </div>

          <form
            className="w-full max-w-[420px] justify-self-center rounded-2xl border-2 border-white/80 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.35)] sm:p-8"
            aria-label="Contact inquiry form"
          >
            <h2 className="mb-5 text-center text-2xl font-bold tracking-tight text-white drop-shadow-lg sm:text-3xl">
              Contact Us
            </h2>
            <div className="space-y-5">
              <div>
                <label htmlFor="inquiry-name" className="sr-only">Name</label>
                <input
                  id="inquiry-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Name"
                  required
                  className="w-full border-0 border-b border-white/75 bg-transparent px-1 py-4 text-sm font-medium text-white outline-none placeholder:text-white/90 focus:border-[#fff] focus:ring-0"
                />
              </div>
              <div>
                <label htmlFor="inquiry-phone" className="sr-only">Phone number</label>
                <input
                  id="inquiry-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Phone number"
                  required
                  className="w-full border-0 border-b border-white/75 bg-transparent px-1 py-4 text-sm font-medium text-white outline-none placeholder:text-white/90 focus:border-[#fff] focus:ring-0"
                />
              </div>
              <div>
                <label htmlFor="inquiry-email" className="sr-only">Email</label>
                <input
                  id="inquiry-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email"
                  required
                  className="w-full border-0 border-b border-white/75 bg-transparent px-1 py-4 text-sm font-medium text-white outline-none placeholder:text-white/90 focus:border-[#fff] focus:ring-0"
                />
              </div>
              <div>
                <label htmlFor="inquiry-query" className="sr-only">Query</label>
                <textarea
                  id="inquiry-query"
                  name="query"
                  placeholder="Query"
                  rows={4}
                  required
                  className="w-full resize-y border-0 border-b border-white/75 bg-transparent px-1 py-4 text-sm font-medium text-white outline-none placeholder:text-white/90 focus:border-[#fff] focus:ring-0"
                />
              </div>
            </div>

            <button
              type="button"
              className="mt-6 w-full rounded-md bg-white px-4 py-3 text-sm font-semibold text-[#171326] transition hover:bg-[#f4ef8a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f4ef8a]"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>

    {/* Shop by energy */}
  </div>
  );
};

export default HomePage;