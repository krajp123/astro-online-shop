import { useEffect, useMemo, useState } from 'react';
import { Minus, Package, Plus, ShoppingBag, Star, Truck } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCustomerStore } from '../../store/useCustomerStore';
import { getMantraProductBySlug, mantraProducts } from '../../data/mantraUpcharProducts';

const getRandomRelatedProducts = (currentSlug) => {
  const products = mantraProducts.filter((item) => item.slug !== currentSlug);

  for (let index = products.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [products[index], products[randomIndex]] = [products[randomIndex], products[index]];
  }

  return products.slice(0, 5);
};

const MantraUpcharDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = useMemo(() => getMantraProductBySlug(slug), [slug]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [descriptionLanguage, setDescriptionLanguage] = useState('en');
  const [relatedProducts, setRelatedProducts] = useState(() => getRandomRelatedProducts(product.slug));
  const cart = useCustomerStore((state) => state.cart);
  const setCart = useCustomerStore((state) => state.setCart);
  const gallery = useMemo(
    () => [...new Set([product.detailImage || product.image, product.hoverImage].filter(Boolean))],
    [product],
  );

  useEffect(() => {
    setActiveImage(0);
    setDescriptionLanguage('en');
    setRelatedProducts(getRandomRelatedProducts(product.slug));
  }, [product]);

  const handleAddToCart = () => {
    const existingItem = cart.find((item) => item.name === product.name);
    setCart(
      existingItem
        ? cart.map((item) =>
            item.name === product.name
              ? { ...item, quantity: (item.quantity || 1) + quantity }
              : item,
          )
        : [...cart, { ...product, quantity }],
    );
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  return (
    <main className="min-h-screen bg-[#f8f6f1] px-4 text-[#231416] sm:px-6 xl:px-10">
      <style>{`
        .mantra-audio {
          accent-color: #7A1519;
        }
        .mantra-audio::-webkit-media-controls-panel {
          background-color: #f8f6f1;
        }
      `}</style>
      <div className="mx-auto max-w-[1440px]">
        <section className="grid items-start gap-6 py-6 pb-2 sm:gap-8 sm:py-8 sm:pb-3 lg:grid-cols-2 lg:gap-8 lg:py-10 lg:pb-4 xl:gap-10">
          <div className="mx-auto min-w-0 w-full max-w-md lg:max-w-none">
            <div className="flex flex-col gap-3">
              <div className="flex aspect-square items-center justify-center overflow-hidden bg-transparent">
                <img
                  key={gallery[activeImage]}
                  src={gallery[activeImage]}
                  alt={product.name}
                  className="h-full w-full object-contain p-0 sm:p-0"
                />
              </div>
              {gallery.length > 1 && (
                <div className="flex justify-center gap-2">
                  {gallery.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      aria-label={`Show product image ${index + 1}`}
                      aria-pressed={activeImage === index}
                      className={`h-14 w-14 shrink-0 overflow-hidden border bg-white transition sm:h-16 sm:w-16 xl:h-[72px] xl:w-[72px] ${
                        activeImage === index
                          ? 'border-[#7A1519] ring-1 ring-[#7A1519]'
                          : 'border-[#231416]/10 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={image} alt="" className="h-full w-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="min-w-0">
            <h1
              className="font-sans font-bold leading-[1.12] tracking-tight"
              style={{ color: '#925C2D', fontSize: 'clamp(1.75rem, 2.4vw, 2.25rem)' }}
            >
              {product.name}
            </h1>

            <p
              lang="hi"
              className="mt-3"
              style={{
                color: '#302522',
                fontFamily: "'Nirmala UI', 'Mangal', sans-serif",
                fontSize: '16px',
                letterSpacing: 'normal',
                lineHeight: 1.5,
                textAlign: 'left',
                whiteSpace: 'pre-line',
              }}
            >
              {product.description}
            </p>

            {product.keyBenefits?.length > 0 && (
              <section className="mt-4" aria-labelledby="product-key-benefits">
                <h2
                  id="product-key-benefits"
                  className="font-serif text-lg font-semibold text-[#925C2D]"
                >
                  Key Benefits:
                </h2>
                <ul className="mt-1 list-disc pl-5 text-sm leading-5 text-[#231416]">
                  {product.keyBenefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
              </section>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <span
                className="flex items-center gap-0.5 text-[#C9973A]"
                aria-label={`${product.rating} out of 5 stars`}
              >
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`h-4 w-4 fill-current ${
                      index < Math.round(product.rating) ? 'text-[#C9973A]' : 'text-[#d8d4d0]'
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </span>
              <span className="text-xs font-semibold">{product.rating}</span>
              <span className="text-xs text-[#7A1519]">{product.reviews} reviews</span>
            </div>

            <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-base font-semibold text-[#231416]">{product.price}</span>
            </div>

            <div className="mt-5 border-y border-[#231416]/15 py-3 sm:mt-6 sm:py-4">
              <audio
                key={product.audio}
                controls
                preload="metadata"
                aria-label={`${product.name} audio`}
                className="mantra-audio block h-12 w-full"
              >
                <source src={product.audio} type="audio/mpeg" />
                Your browser does not support audio playback.
              </audio>
            </div>

            <div className="mt-4 grid grid-cols-[auto_minmax(0,1fr)] items-stretch gap-2 sm:mt-5 sm:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)] sm:gap-3">
              <div className="flex h-11 items-center border border-[#231416]/20">
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  aria-label="Decrease quantity"
                  className="flex h-full w-10 items-center justify-center text-[#4B0F14] transition hover:bg-[#F5ECE9]"
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </button>
                <span className="min-w-9 text-center text-sm font-semibold" aria-live="polite">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((current) => current + 1)}
                  aria-label="Increase quantity"
                  className="flex h-full w-10 items-center justify-center text-[#4B0F14] transition hover:bg-[#F5ECE9]"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="inline-flex min-h-11 min-w-0 items-center justify-center gap-1.5 bg-[#7A1519] px-2.5 py-2.5 text-xs font-semibold text-[#FBEBC4] transition hover:bg-[#5E0F13] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1519]/40 focus-visible:ring-offset-2 sm:gap-2 sm:px-4 sm:text-sm"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                Add to cart
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="col-span-2 min-h-11 min-w-0 border border-[#7A1519] px-2.5 py-2.5 text-xs font-semibold text-[#7A1519] transition hover:bg-[#F8F1EF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1519]/40 focus-visible:ring-offset-2 sm:col-span-1 sm:px-4 sm:text-sm"
              >
                Buy it now
              </button>
            </div>

            <div
              className="mt-4 space-y-3 text-[#231416] sm:mt-5"
              style={{ fontSize: '15px', lineHeight: 1.4 }}
            >
              <p className="flex items-center gap-3">
                <Truck className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>Estimated Delivery: 7-10 Days</span>
              </p>
              <p className="flex items-center gap-3">
                <Package className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>Free shipping on all orders across the website</span>
              </p>
            </div>
          </div>
        </section>
      </div>

      <section aria-label="Product description">
        <div className="mx-auto max-w-[1440px] pt-2 pb-8 sm:pt-3 sm:pb-10 lg:pt-4">
          <div role="tablist" aria-label="Description language" className="flex gap-6 border-b border-[#231416]/10">
            {[
              { id: 'en', label: 'English Description' },
              { id: 'hi', label: 'हिंदी विवरण' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`mantra-description-tab-${tab.id}`}
                aria-selected={descriptionLanguage === tab.id}
                aria-controls="mantra-description-panel"
                onClick={() => setDescriptionLanguage(tab.id)}
                className={`border-b-2 px-1 pb-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1519] ${
                  descriptionLanguage === tab.id
                    ? 'border-[#7A1519] text-[#7A1519]'
                    : 'border-transparent text-[#6F6063] hover:text-[#231416]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div
            id="mantra-description-panel"
            role="tabpanel"
            aria-labelledby={`mantra-description-tab-${descriptionLanguage}`}
            lang={descriptionLanguage === 'hi' ? 'hi' : 'en'}
            className="space-y-5 pt-5 text-base leading-7 text-[#3a2c2e]"
            style={descriptionLanguage === 'hi' ? { fontFamily: "'Nirmala UI', 'Mangal', sans-serif" } : undefined}
          >
            {(descriptionLanguage === 'hi'
              ? product.descriptionHindi || product.description
              : product.descriptionEnglish || product.description
            )
              .split(/\n+/)
              .map((paragraph, index) => paragraph.trim() && <p key={index}>{paragraph.trim()}</p>)}
          </div>
        </div>
      </section>

      <section aria-labelledby="mantra-related-products-heading" className="bg-[#f8f6f1]">
        <div className="mx-auto max-w-[1440px] border-t border-[#231416]/10 px-4 pt-12 pb-8 sm:px-6 sm:pt-14 sm:pb-10 xl:px-10">
          <h2
            id="mantra-related-products-heading"
            className="mb-6 text-center text-[1.6rem] font-extrabold tracking-[-0.03em] text-[#201b3a] sm:text-[2rem]"
          >
            Related Products
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.slug}
                to={`/mantra-upchar/${relatedProduct.slug}`}
                aria-label={`View ${relatedProduct.name}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#201b3a]/10 bg-white shadow-[0_8px_18px_rgba(32,27,58,0.06)] transition duration-200 hover:-translate-y-1 hover:border-[#4d001e]/30 hover:shadow-[0_16px_34px_rgba(32,27,58,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d001e]/40"
              >
                <div className="aspect-square overflow-hidden bg-[#f7f2ea]">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
                  <h3 className="line-clamp-2 min-h-10 text-sm font-bold leading-snug text-[#201b3a] sm:text-[0.98rem]">
                    {relatedProduct.name}
                  </h3>
                  <div className="flex items-center gap-1.5" aria-label={`${relatedProduct.rating} out of 5 stars, ${relatedProduct.reviews} reviews`}>
                    <span className="flex items-center text-xs tracking-tight text-[#c9962b]" aria-hidden="true">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`h-3.5 w-3.5 fill-current ${index < Math.round(relatedProduct.rating) ? '' : 'text-[#d8d4d0]'}`}
                        />
                      ))}
                    </span>
                    <span className="text-[11px] text-[#6F6063]">{relatedProduct.reviews} reviews</span>
                  </div>
                  <p className="mt-auto border-t border-[#201b3a]/10 pt-2 text-sm font-extrabold text-[#4d001e] sm:text-base">
                    {relatedProduct.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default MantraUpcharDetails;
