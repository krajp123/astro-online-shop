import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, Heart, ShoppingBag } from 'lucide-react';

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

const topProducts = [
  { name: 'Lal Kitab Amrit Vashist Jyotish', price: 'Rs. 2,550.00', image: '/top%20products/1.png' },
  { name: 'Shakti Peeth Yantra', price: 'Rs. 21,000.00', image: '/top%20products/2.jpg' },
  { name: 'Shukra Amrit Soap', price: 'Rs. 479.00', image: '/top%20products/3.jpg' },
  { name: 'Shani Amrit Dhoop', price: 'Rs. 409.00', image: '/top%20products/4.jpg' },
  { name: 'Ashtasiddhi Yantra', price: 'Rs. 41,000.00', image: '/top%20products/5.jpg' },
  { name: 'Rahu Mantra Upchar Potli', price: 'Rs. 3,100.00', image: '/top%20products/6.png' },
];

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

const HomePage = () => {
  const [hoveredStone, setHoveredStone] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setHoveredStone(null);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const clampPopupPosition = (clientX, clientY) => {
    const popupWidth = 320;
    const popupHeight = 420;
    const margin = 18;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const preferredLeft = clientX + 26 > viewportWidth - popupWidth - margin
      ? clientX - popupWidth - 26
      : clientX + 26;

    const preferredTop = clientY + 18 > viewportHeight - popupHeight - margin
      ? clientY - popupHeight + 18
      : clientY + 18;

    return {
      x: Math.min(Math.max(preferredLeft, margin), viewportWidth - popupWidth - margin),
      y: Math.min(Math.max(preferredTop, margin), viewportHeight - popupHeight - margin),
    };
  };

  const popupOverlay = hoveredStone && typeof document !== 'undefined'
    ? createPortal(
        <div
          className="pointer-events-none fixed z-[99999] w-[320px] overflow-hidden rounded-[22px] border border-[#201b3a]/10 bg-[#fdfaf6] shadow-[0_22px_60px_rgba(22,17,47,0.18)]"
          style={{ left: popupPosition.x, top: popupPosition.y }}
        >
          <div className="flex items-start gap-4 border-b border-[#201b3a]/10 bg-[#f7f1e8] p-4">
            <img src={hoveredStone.image} alt={hoveredStone.name} className="h-20 w-20 rounded-xl object-contain bg-white/40 p-2 shadow-inner" />
            <div className="min-w-0 text-left">
              <p className="text-xl font-bold tracking-normal text-[#201b3a]">{hoveredStone.name}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-[#80758a]">{hoveredStone.scientificName}</p>
            </div>
          </div>

          <div className="space-y-4 p-4 text-left">
            <div>
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[#b8863c]">What is this stone</p>
              <p className="mt-1 text-sm leading-6 text-[#413b57]">{hoveredStone.description}</p>
            </div>
            <div>
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[#b8863c]">Benefits of wearing this stone</p>
              <p className="mt-1 text-sm leading-6 text-[#413b57]">{hoveredStone.benefits}</p>
            </div>
            <div>
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[#b8863c]">Who can wear this</p>
              <p className="mt-1 text-sm leading-6 text-[#413b57]">{hoveredStone.whoCanWear}</p>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;

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
            onMouseEnter={(event) => {
              setHoveredStone(stone);
              setPopupPosition(clampPopupPosition(event.clientX, event.clientY));
            }}
            onMouseMove={(event) => {
              setPopupPosition(clampPopupPosition(event.clientX, event.clientY));
            }}
            onMouseLeave={() => setHoveredStone(null)}
            onWheel={() => setHoveredStone(null)}
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

      {popupOverlay}
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

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 lg:gap-4">
          {topProducts.map((product) => (
            <article key={product.name} className="group overflow-hidden rounded-lg bg-white ring-1 ring-[#201b3a]/5 transition-shadow duration-300 hover:shadow-[0_12px_28px_rgba(32,27,58,0.12)]">
              <a href="/products" className="block">
                <div className="relative aspect-[1.15] overflow-hidden bg-[#f7f4ee]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-2 top-2 bg-[#201b3a] px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-white">Featured</span>

                  <button
                    type="button"
                    aria-label={`Save ${product.name} to wishlist`}
                    onClick={(event) => event.preventDefault()}
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#201b3a] transition duration-300 hover:bg-white hover:text-[#b23a52]"
                  >
                    <Heart className="h-4 w-4" />
                  </button>

                  <div className="absolute inset-x-2 bottom-2 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="flex w-full items-center justify-center gap-2 rounded-md bg-[#201b3a] py-2 text-xs font-semibold text-white shadow-lg">
                      <ShoppingBag className="h-3.5 w-3.5" />
                      Quick add
                    </span>
                  </div>
                </div>

                <div className="p-3">
                  <h3 className="text-sm font-medium leading-5 text-[#201b3a] sm:text-[15px]">{product.name}</h3>
                  <p className="mt-2 text-sm font-bold text-[#201b3a]">{product.price}</p>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>

    <div className="h-[1px] w-full bg-[#201b3a]/10" />

    {/* Shop by sign */}
    <section className="bg-[#f5f1eb] py-7">
      <div className="mx-auto max-w-[1440px] px-4 pb-3 sm:px-8">
        <p className="text-left text-[0.85rem] font-semibold uppercase tracking-[0.18em] text-[#201b3a]/70">Shop by Sign</p>
      </div>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <div className="flex w-full items-end justify-between gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4 md:gap-5 lg:gap-6">
          {ZODIAC.map((sign) => (
            <a
              key={sign.name}
              href={`/products?sign=${sign.name.toLowerCase()}`}
              className="group flex flex-shrink-0 flex-col items-center gap-2 px-2 py-1 transition duration-200 ease-out hover:-translate-y-1"
              title={sign.name}
            >
              <span
                className="flex h-16 w-16 items-center justify-center rounded-full border text-[2rem] shadow-[0_0_0_1px_rgba(32,27,58,0.04)] transition duration-200 ease-out group-hover:shadow-[0_8px_18px_rgba(32,27,58,0.10)] sm:h-[4.25rem] sm:w-[4.25rem]"
                style={{ borderColor: `${ELEMENT_COLORS[sign.element]}55`, color: ELEMENT_COLORS[sign.element], backgroundColor: 'rgba(255,255,255,0.05)' }}
              >
                {sign.glyph}
              </span>
              <span className="text-[0.72rem] font-medium tracking-normal text-[#201b3a] transition duration-200 group-hover:text-[#2b2250] sm:text-[0.8rem]">{sign.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>

    {/* Shop by energy */}
  </div>
  );
};

export default HomePage;