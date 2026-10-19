import { ShoppingCart } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCustomerStore } from '../../store/useCustomerStore';
import gemstoneProducts, { getGemstoneProductSlug } from '../../data/gemstoneProducts';

const qualityOptions = [
  { value: 'all', label: 'All Gemstones' },
  { value: 'Standard', label: 'Standard' },
  { value: 'Premium', label: 'Premium' },
];

const GemstonePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const cart = useCustomerStore((state) => state.cart);
  const setCart = useCustomerStore((state) => state.setCart);
  const selectedQuality = qualityOptions.some((option) => option.value === searchParams.get('quality'))
    ? searchParams.get('quality')
    : 'all';
  const visibleProducts = selectedQuality === 'all'
    ? gemstoneProducts
    : gemstoneProducts.filter((product) => product.category === `Gemstone - ${selectedQuality}`);

  const handleQualityChange = (quality) => {
    if (quality === 'all') {
      setSearchParams({});
      return;
    }
    setSearchParams({ quality });
  };

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
      <section className="mx-auto w-full max-w-[1440px] px-4 pb-8 pt-10 sm:px-6 sm:pt-12 lg:px-8 lg:pb-10 lg:pt-14 2xl:px-12">
        <div className="mb-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="font-serif text-[1.45rem] font-bold leading-tight text-[#75665a] sm:text-[1.8rem] lg:text-[2.35rem]">Gemstone</h1>
            <p className="max-w-3xl text-sm leading-7 text-[#5b5470] sm:text-base">
              Explore our Standard and Premium gemstone collection.
            </p>
          </div>
          <div className="mt-3 flex justify-end">
            <div className="flex flex-wrap justify-end gap-2" aria-label="Filter gemstones by quality">
            {qualityOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleQualityChange(option.value)}
                aria-pressed={selectedQuality === option.value}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d001e]/40 focus-visible:ring-offset-2 ${
                  selectedQuality === option.value
                    ? 'border-[#4d001e] bg-[#4d001e] text-white'
                    : 'border-[#201b3a]/15 bg-white text-[#201b3a] hover:border-[#4d001e]/40'
                }`}
              >
                {option.label}
              </button>
            ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {visibleProducts.map((product) => {
            const isInCart = cart.some((item) => item.name === product.name);

            return (
              <article
                key={`${product.category}-${product.name}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#201b3a]/10 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#4d001e]/30 hover:shadow-[0_18px_40px_rgba(32,27,58,0.12)]"
              >
                <Link to={`/gemstone/${getGemstoneProductSlug(product.name)}`} className="block">
                  <div className="relative aspect-square overflow-hidden bg-[#f7f2ea]">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className={`h-full w-full object-contain object-center transition-opacity duration-1000 ease-in-out ${product.hoverImage ? 'group-hover:opacity-0' : ''}`}
                    />
                    {product.hoverImage && (
                      <img
                        src={product.hoverImage}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-contain object-center opacity-0 transition-opacity duration-1000 ease-in-out group-hover:opacity-100"
                      />
                    )}
                  </div>
                </Link>
                <div className="flex flex-1 flex-col p-2 sm:p-4">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#4d001e]/70 sm:text-[10px] sm:tracking-[0.16em]">
                    {product.category.replace('Gemstone - ', '')} Gemstone
                  </p>
                  <h3 className="mt-1 line-clamp-2 min-h-8 text-xs font-semibold leading-snug text-[#201b3a] sm:min-h-10 sm:text-sm">
                    <Link to={`/gemstone/${getGemstoneProductSlug(product.name)}`} className="hover:text-[#4d001e] focus-visible:outline-none focus-visible:underline">
                      {product.name}
                    </Link>
                  </h3>
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

export default GemstonePage;
