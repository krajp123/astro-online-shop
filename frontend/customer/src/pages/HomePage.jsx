import { Sparkles, Gem, Diamond, Leaf, ArrowRight } from 'lucide-react';

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

const shopCategories = [
  { name: 'Zodiac gems', icon: Sparkles, blurb: 'Matched to your sign' },
  { name: 'Birthstones', icon: Gem, blurb: 'Chosen by your month' },
  { name: 'Pendants', icon: Diamond, blurb: 'Worn close, every day' },
  { name: 'Rudraksha', icon: Leaf, blurb: 'Sacred and grounding' },
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

const HomePage = () => (
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
            Stones chosen by your chart, not by chance.
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

          <div className="mt-6 grid grid-cols-2 gap-2 sm:max-w-md">
            {shopCategories.map(({ name, icon: Icon, blurb }) => (
              <a
                key={name}
                href={`/products?category=${name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group flex items-start gap-2 rounded-lg border border-white/20 bg-white/10 p-2.5 backdrop-blur-md transition hover:border-[#f3c969]/70 hover:bg-white/20"
              >
                <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#f3c969]" aria-hidden="true" />
                <span>
                  <span className="block text-sm font-bold text-white">{name}</span>
                  <span className="block text-xs text-white/60">{blurb}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>

    {/* Trust strip */}
    <section className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 border-t border-[#201b3a]/10 px-4 py-8 sm:px-8">
      <p className="text-sm text-[#5b5470]">Certified natural stones, chosen with your birth chart in mind.</p>
      <div className="flex flex-wrap gap-6 text-xs font-semibold text-[#201b3a]/70">
        <span>Free shipping over $75</span>
        <span>Certificate of authenticity</span>
        <span>30-day returns</span>
      </div>
    </section>

    {/* Shop by sign */}
    <section className="border-y border-[#201b3a]/10 bg-white">
      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-8">
        <div className="flex items-center gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span className="flex-shrink-0 text-xs font-semibold text-[#5b5470]">Shop by sign</span>
          {ZODIAC.map((sign) => (
            <a
              key={sign.name}
              href={`/products?sign=${sign.name.toLowerCase()}`}
              className="group flex flex-shrink-0 flex-col items-center gap-1 rounded-lg px-2 py-1 transition hover:bg-[#f6f1e6]"
              title={sign.name}
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full border text-base"
                style={{ borderColor: `${ELEMENT_COLORS[sign.element]}55`, color: ELEMENT_COLORS[sign.element] }}
              >
                {sign.glyph}
              </span>
              <span className="text-[10px] font-medium text-[#5b5470] group-hover:text-[#201b3a]">{sign.name}</span>
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

export default HomePage;