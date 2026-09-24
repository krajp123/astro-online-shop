import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight } from 'lucide-react';

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

const energyCategories = [
  { name: 'Love & harmony', stone: 'Rose Quartz', element: 'water', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=700&q=85' },
  { name: 'Courage & focus', stone: 'Tiger Eye', element: 'fire', image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=700&q=85' },
  { name: 'Prosperity', stone: 'Emerald', element: 'earth', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=700&q=85' },
  { name: 'Protection', stone: 'Blue Sapphire', element: 'air', image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=700&q=85' },
];

const products = [
  { name: 'Natural Blue Sapphire', category: 'Saturn / Shani', price: '$249', oldPrice: '$299', tag: 'Bestseller', image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=85' },
  { name: 'Emerald Zodiac Pendant', category: 'Mercury / Budh', price: '$129', oldPrice: '', tag: 'New arrival', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85' },
  { name: 'Rose Quartz Tumble Set', category: 'Venus / Shukra', price: '$48', oldPrice: '$64', tag: '25% off', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85' },
  { name: 'Tiger Eye Protection Mala', category: 'Sun / Surya', price: '$86', oldPrice: '', tag: 'Handcrafted', image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85' },
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
              <p className="text-xl font-bold tracking-[-0.03em] text-[#201b3a]">{hoveredStone.name}</p>
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
        <source src="/astrology-hero.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,#15112f_0%,#171432_28%,rgba(23,20,50,0.96)_45%,rgba(23,20,50,0.72)_60%,rgba(23,20,50,0)_78%)]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-66px)] max-w-[1440px] items-center px-4 py-6 sm:px-8 lg:py-8">
        <div className="w-full max-w-2xl lg:w-[58%] lg:pr-10">
          <p className="mb-3 text-[clamp(0.7rem,1vw,0.85rem)] font-bold uppercase tracking-[0.22em] text-[#f3c969]">Personalised gemstone guidance</p>
          <h1 className="max-w-xl font-['Cormorant_Garamond',serif] text-[clamp(2.75rem,5vw,5.5rem)] font-bold leading-[0.9] tracking-[-0.03em] text-white">
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
            <span className="mt-1 pb-1 text-[0.82rem] font-medium tracking-[-0.02em] text-[#201b3a] transition duration-300 group-hover:text-[#2b2250] sm:text-[0.95rem]">
              {stone.name}
            </span>
          </div>
        ))}
      </div>

      {popupOverlay}
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
              <span className="text-[0.72rem] font-medium tracking-[-0.02em] text-[#201b3a] transition duration-200 group-hover:text-[#2b2250] sm:text-[0.8rem]">{sign.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>

    {/* Shop by energy */}
    <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-8">
      <div className="mb-8">
        <h2 className="font-['Cormorant_Garamond',serif] text-3xl font-bold tracking-[-0.02em] text-[#201b3a] sm:text-4xl">Find the stone for what you need</h2>
        <p className="mt-2 max-w-md text-sm text-[#5b5470]">Every stone carries a different energy — start with what you're looking for.</p>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {energyCategories.map((cat) => (
          <a href="/products" key={cat.name} className="group relative aspect-[0.85] overflow-hidden rounded-xl bg-[#201b3a]">
            <img src={cat.image} alt={cat.stone} className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent px-4 pb-4 pt-14">
              <p className="text-lg font-bold text-white">{cat.name}</p>
              <p className="mt-1 text-xs font-medium" style={{ color: ELEMENT_COLORS[cat.element] === '#3f6488' ? '#8fb3d6' : '#f0d9a8' }}>{cat.stone}</p>
            </div>
          </a>
        ))}
      </div>
    </section>

    {/* Most loved stones */}
    <section className="border-t border-[#201b3a]/10 bg-white">
      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-8">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-['Cormorant_Garamond',serif] text-3xl font-bold tracking-[-0.02em] text-[#201b3a] sm:text-4xl">Most loved stones</h2>
          <a href="/products" className="hidden text-sm font-bold text-[#b8863c] sm:block">Shop all</a>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-4 sm:gap-x-5">
          {products.map((product) => (
            <article key={product.name} className="group">
              <div className="relative aspect-[0.82] overflow-hidden rounded-xl border border-[#201b3a]/10 bg-[#f6f1e6]">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute left-3 top-3 bg-[#2b2250] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">{product.tag}</span>
                <button aria-label={`Add ${product.name} to wishlist`} className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-sm text-[#201b3a] shadow-sm transition hover:bg-[#b8863c] hover:text-white">♡</button>
                <button className="absolute inset-x-3 bottom-3 translate-y-2 rounded-full bg-[#2b2250] py-2.5 text-xs font-bold text-white opacity-0 shadow-sm transition group-hover:translate-y-0 group-hover:opacity-100">Add to bag</button>
              </div>
              <p className="mt-4 text-xs font-medium text-[#b8863c]">{product.category}</p>
              <h3 className="mt-1 text-sm font-bold text-[#201b3a] sm:text-base">{product.name}</h3>
              <div className="mt-2 flex gap-2 text-sm font-bold text-[#201b3a]">
                <span>{product.price}</span>
                {product.oldPrice && <span className="font-normal text-[#5b5470]/60 line-through">{product.oldPrice}</span>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* Chart quiz CTA */}
    <section className="w-full py-16">
      <div className="mx-auto grid max-w-[1440px] overflow-hidden rounded-2xl border border-[#201b3a]/10 bg-[#ece4f2] px-4 sm:px-8 md:grid-cols-2 md:px-0">
        <div className="flex flex-col justify-center px-3 py-12 sm:px-6 md:px-14">
          <h2 className="max-w-md font-['Cormorant_Garamond',serif] text-4xl font-bold leading-tight tracking-[-0.02em] text-[#201b3a]">Not sure which stone is yours?</h2>
          <p className="mt-5 max-w-md leading-7 text-[#5b5470]">
            Answer a few questions about your sign and what you're looking for — we'll match you with a stone in under two minutes.
          </p>
          <a href="/quiz" className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-[#2b2250] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#3a2f68]">
            Start your reading <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <img className="h-80 w-full object-cover md:h-full" src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85" alt="Crystal and moonlight inspired astrology scene" />
      </div>
    </section>
  </div>
  );
};

export default HomePage;