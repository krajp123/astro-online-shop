import { useEffect, useMemo, useRef, useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { useCustomerStore } from '../../store/useCustomerStore';

const rudrakshaProducts = Array.from({ length: 14 }, (_, mukhi) => ({
  mukhi,
  name: `${mukhi} Mukhi Rudraksha`,
  category: 'Authentic Rudraksha',
  price: 'Price on request',
  image: `/Rudraksha/${mukhi}%20${mukhi === 12 ? 'mukhi' : 'Mukhi'}.png`,
}));

const rudrakshaCategories = [
  { value: 'beads', label: 'Rudraksha Beads' },
  { value: 'bracelet', label: 'Rudraksha Bracelet' },
  { value: 'pendant', label: 'Rudraksha Pendant' },
];

const mukhiCategories = [
  { value: 'all', label: 'All Mukhi' },
  ...rudrakshaProducts.map((product) => ({
    value: String(product.mukhi),
    label: `${product.mukhi} Mukhi`,
  })),
];

const RudrakshaProductCard = ({ product }) => {
  const reduceMotion = useReducedMotion();
  const cart = useCustomerStore((state) => state.cart);
  const wishlist = useCustomerStore((state) => state.wishlist);
  const setCart = useCustomerStore((state) => state.setCart);
  const setWishlist = useCustomerStore((state) => state.setWishlist);
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
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#201b3a]/10 bg-white shadow-[0_4px_14px_rgba(32,27,58,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#4d001e]/30 hover:shadow-[0_18px_40px_rgba(32,27,58,0.12)]">
      <div className="relative aspect-[5/4] overflow-hidden bg-[#f7f2ea]">
        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={isWishlisted}
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#4d001e] shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d001e]"
        >
          <Heart className="h-5 w-5" fill={isWishlisted ? 'currentColor' : 'none'} aria-hidden="true" />
        </button>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            aria-hidden="true"
            className="absolute h-[58%] w-[58%] rounded-full bg-[#8b5e2a]/45 blur-2xl"
            animate={reduceMotion ? undefined : { opacity: [0.55, 0.9, 0.55], scale: [0.9, 1.08, 0.9] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full aspect-square w-auto max-w-full object-contain p-5"
            animate={reduceMotion ? undefined : { rotate: 360 }}
            whileHover={reduceMotion ? undefined : { scale: 1.05 }}
            transition={{ rotate: { duration: 30, repeat: Infinity, ease: 'linear' }, scale: { duration: 0.3 } }}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4d001e]/70">
          {product.category}
        </p>
        <h3 className="mt-1.5 line-clamp-2 min-h-[2.75rem] text-[15px] font-semibold leading-snug text-[#201b3a]">
          {product.name}
        </h3>

        <div className="mt-auto border-t border-[#201b3a]/10 pt-4">
          <div className="flex items-end justify-between gap-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#201b3a]/50">Price</p>
            <p className="text-sm font-bold leading-tight text-[#201b3a]">{product.price}</p>
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#4d001e] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#3a0016] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4d001e]/40 focus-visible:ring-offset-2"
          >
            <ShoppingCart className="h-4 w-4" aria-hidden="true" />
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
};

const Rudraksha = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const category = searchParams.get('category');
    return rudrakshaCategories.some((option) => option.value === category) ? category : 'beads';
  });
  const [selectedMukhi, setSelectedMukhi] = useState(() => {
    const mukhi = searchParams.get('mukhi');
    return rudrakshaProducts.some((product) => String(product.mukhi) === mukhi) ? mukhi : 'all';
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMukhiMenuOpen, setIsMukhiMenuOpen] = useState(false);
  const productsRef = useRef(null);
  const itemsPerPage = 12;

  useEffect(() => {
    const mukhi = searchParams.get('mukhi');
    const category = searchParams.get('category');
    const nextCategory = rudrakshaCategories.some((option) => option.value === category) ? category : 'beads';
    setSelectedCategory(nextCategory);
    setSelectedMukhi(rudrakshaProducts.some((product) => String(product.mukhi) === mukhi) ? mukhi : 'all');
    setCurrentPage(1);
  }, [searchParams]);

  const filteredProducts = useMemo(() => (
    selectedCategory !== 'beads'
      ? []
      : selectedMukhi === 'all'
      ? rudrakshaProducts
      : rudrakshaProducts.filter((product) => String(product.mukhi) === selectedMukhi)
  ), [selectedCategory, selectedMukhi]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProducts = filteredProducts.slice((safePage - 1) * itemsPerPage, safePage * itemsPerPage);

  const handleMukhiChange = (mukhi) => {
    setSelectedCategory('beads');
    setSelectedMukhi(mukhi);
    setCurrentPage(1);
    setIsFilterOpen(false);
    setIsMukhiMenuOpen(false);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedMukhi('all');
    setCurrentPage(1);
    setIsFilterOpen(false);
    setIsMukhiMenuOpen(false);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const selectedFilterLabel = selectedCategory !== 'beads'
    ? rudrakshaCategories.find((category) => category.value === selectedCategory)?.label
    : selectedMukhi === 'all'
      ? 'All Rudraksha'
      : mukhiCategories.find((category) => category.value === selectedMukhi)?.label;

  return (
    <div className="w-full max-w-[2000px] bg-[#f5f1eb]">
      <div className="mx-auto max-w-[1440px] bg-[#f5f1eb] px-4 pt-6 pb-10 sm:px-6 lg:pb-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-full max-w-2xl">
            <h1 className="w-full text-center font-serif text-4xl font-bold leading-tight text-[#75665a] sm:text-5xl">Rudraksha Beads</h1>
          </div>
          <p className="max-w-3xl text-center text-sm leading-7 text-[#5b5470] sm:text-base">
            Find the Mukhi that fits your spiritual path, from 0 Mukhi through 13 Mukhi.
          </p>
        </div>

        <div className="mt-3 flex justify-start">
          <div className="relative w-[230px]">
            <button
              type="button"
              onClick={() => setIsFilterOpen((value) => !value)}
              aria-expanded={isFilterOpen}
              className="flex w-full items-center justify-between border border-[#1f1f1f] bg-[#f7f1e8] px-2.5 py-1.5 text-left text-[0.76rem] font-semibold text-[#1f1f1f]"
            >
              <span>{selectedFilterLabel}</span>
              <svg viewBox="0 0 20 20" fill="none" className={`h-3 w-3 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} aria-hidden="true">
                <path d="M5.5 7.5 10 12l4.5-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {isFilterOpen && (
              <div className="absolute left-0 right-0 top-full z-40 mt-1 border border-[#1f1f1f] bg-[#f7f1e8] shadow-[0_4px_10px_rgba(0,0,0,0.08)]">
                {rudrakshaCategories.map((category) => category.value === 'beads' ? (
                  <div
                    key={category.value}
                    className="group relative"
                    onMouseEnter={() => setIsMukhiMenuOpen(true)}
                    onMouseLeave={() => setIsMukhiMenuOpen(false)}
                    onFocus={() => setIsMukhiMenuOpen(true)}
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget)) setIsMukhiMenuOpen(false);
                    }}
                  >
                    <div className="flex border-b border-[#1f1f1f]/15">
                      <button
                        type="button"
                        onClick={() => handleCategoryChange('beads')}
                        className="flex-1 px-3 py-2 text-left text-[0.8rem] font-medium text-[#1f1f1f] transition hover:bg-[#efe4d1]"
                      >
                        {category.label}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsMukhiMenuOpen((value) => !value)}
                        aria-label="Show Mukhi options"
                        aria-expanded={isMukhiMenuOpen}
                        className="px-3 text-[#1f1f1f] transition hover:bg-[#efe4d1]"
                      >
                        <svg viewBox="0 0 20 20" fill="none" className="h-3 w-3" aria-hidden="true">
                          <path d="m7.5 5.5 4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                    {isMukhiMenuOpen && (
                      <div className="absolute left-0 top-full z-50 max-h-72 w-full overflow-y-auto border border-[#1f1f1f] bg-[#f7f1e8] shadow-[0_4px_10px_rgba(0,0,0,0.08)] sm:left-full sm:top-0 sm:w-[150px]">
                        {mukhiCategories.map((mukhi) => (
                          <button
                            key={mukhi.value}
                            type="button"
                            onClick={() => handleMukhiChange(mukhi.value)}
                            className={`block w-full border-b border-[#1f1f1f]/15 px-3 py-2 text-left text-[0.8rem] font-medium text-[#1f1f1f] transition hover:bg-[#efe4d1] ${selectedCategory === 'beads' && selectedMukhi === mukhi.value ? 'bg-[#efe4d1]' : ''}`}
                          >
                            {mukhi.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    key={category.value}
                    type="button"
                    onClick={() => handleCategoryChange(category.value)}
                    className={`block w-full border-b border-[#1f1f1f]/15 px-3 py-2 text-left text-[0.8rem] font-medium text-[#1f1f1f] transition hover:bg-[#efe4d1] ${selectedCategory === category.value ? 'bg-[#efe4d1]' : ''}`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {paginatedProducts.length > 0 ? (
          <div ref={productsRef} className="mt-6 scroll-mt-28 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {paginatedProducts.map((product) => (
              <RudrakshaProductCard key={product.mukhi} product={product} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-center text-sm text-[#5b5470]">No products available in this category yet.</p>
        )}

        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-3 text-[#201b3a]">
            <button
              type="button"
              onClick={() => goToPage(Math.max(1, safePage - 1))}
              disabled={safePage === 1}
              className="text-sm font-medium transition hover:text-[#4d001e] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            <div className="flex items-center gap-4">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  type="button"
                  key={page}
                  onClick={() => goToPage(page)}
                  aria-current={safePage === page ? 'page' : undefined}
                  className={`text-sm font-bold transition ${safePage === page ? 'text-[#4d001e] underline decoration-[#4d001e] underline-offset-4' : 'text-[#201b3a]/80 hover:text-[#4d001e]'}`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => goToPage(Math.min(totalPages, safePage + 1))}
              disabled={safePage === totalPages}
              className="text-sm font-medium transition hover:text-[#4d001e] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rudraksha;
