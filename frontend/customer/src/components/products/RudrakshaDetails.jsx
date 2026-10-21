import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Minus, Package, Plus, ShoppingBag, Star, Truck } from 'lucide-react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  getRudrakshaProductBySlug,
  getRudrakshaProductSlug,
  rudrakshaProducts,
} from '../../data/rudrakshaProducts';
import { useCustomerStore } from '../../store/useCustomerStore';

const RudrakshaDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = useMemo(() => getRudrakshaProductBySlug(slug), [slug]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const gallery = useMemo(
    () => (product ? [...(product.detailImages || []), product.image] : []),
    [product],
  );
  const cart = useCustomerStore((state) => state.cart);
  const setCart = useCustomerStore((state) => state.setCart);
  const relatedProducts = useMemo(
    () => rudrakshaProducts.filter((item) => item.mukhi !== product?.mukhi).slice(0, 5),
    [product],
  );

  useEffect(() => {
    setQuantity(1);
    setActiveImage(0);
  }, [product]);

  if (!product) return <Navigate to="/rudraksha" replace />;

  const { details } = product;
  const handleAddToCart = () => {
    const existingItem = cart.find((item) => item.name === product.name);
    setCart(existingItem
      ? cart.map((item) => (
        item.name === product.name
          ? { ...item, quantity: (item.quantity || 1) + quantity }
          : item
      ))
      : [...cart, { ...product, quantity }]);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const showPreviousImage = () => {
    setActiveImage((currentImage) => (currentImage - 1 + gallery.length) % gallery.length);
  };

  const showNextImage = () => {
    setActiveImage((currentImage) => (currentImage + 1) % gallery.length);
  };

  return (
    <main className="min-h-screen bg-[#f8f6f1] px-4 text-[#231416] sm:px-6 xl:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="pt-5">
          <Link
            to="/rudraksha"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#7A1519] transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1519]/40"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Rudraksha
          </Link>
        </div>

        <section className="grid items-start gap-6 py-6 pb-8 sm:gap-8 sm:py-8 lg:grid-cols-2 lg:gap-8 lg:py-10 xl:gap-10">
          <div className="mx-auto min-w-0 w-full max-w-md lg:max-w-none">
            <div className="flex flex-col gap-10 sm:gap-12">
              <div className="relative flex aspect-square items-center justify-center overflow-hidden">
                <img
                  key={gallery[activeImage]}
                  src={gallery[activeImage]}
                  alt={`${product.name} image ${activeImage + 1}`}
                  className="h-full w-full object-contain"
                />
                {gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={showPreviousImage}
                      aria-label="Show previous product image"
                      className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#231416] shadow-md transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1519]"
                    >
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={showNextImage}
                      aria-label="Show next product image"
                      className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#231416] shadow-md transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1519]"
                    >
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </>
                )}
              </div>
              {gallery.length > 1 && (
                <div className="w-full overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <div className="mx-auto flex w-max min-w-full flex-nowrap items-center justify-center gap-4 sm:justify-start sm:gap-5">
                    {gallery.map((image, index) => (
                      <button
                        key={image}
                        type="button"
                        onClick={() => setActiveImage(index)}
                        aria-label={`Show product image ${index + 1}`}
                        aria-pressed={activeImage === index}
                        className={`h-20 w-20 shrink-0 overflow-hidden bg-transparent transition sm:h-24 sm:w-24 xl:h-28 xl:w-28 ${
                          activeImage === index
                            ? 'opacity-100'
                            : 'opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={image} alt="" loading="lazy" className="h-full w-full object-contain" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="min-w-0">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#7A1519]">
              {product.category}
            </p>
            <h1 className="font-sans text-3xl font-bold leading-tight tracking-tight text-[#925C2D] sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#5b5470]">
              A guide to the traditional symbolism, thoughtful use, and care of this Mukhi Rudraksha.
            </p>

            <div className="mt-4 space-y-4 text-sm leading-6 text-[#302522]">
              <section lang="hi" style={{ fontFamily: "'Nirmala UI', 'Mangal', sans-serif" }}>
                <h2 className="font-semibold text-[#925C2D]">{details.titleHindi}</h2>
                <p className="mt-1">{details.traditionHindi}</p>
                <p className="mt-2">{details.practiceHindi}</p>
                <p className="mt-2">{details.reflectionHindi}</p>
              </section>

              <section>
                <h2 className="font-semibold text-[#925C2D]">{product.name}</h2>
                <p className="mt-1">{details.traditionEnglish}</p>
                <p className="mt-2">{details.practiceEnglish}</p>
                <p className="mt-2">{details.reflectionEnglish}</p>
              </section>
            </div>

            <div className="mt-5 flex items-center gap-2">
              <span className="flex items-center gap-0.5 text-[#C9973A]" aria-label="Rated 5 out of 5 stars">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" aria-hidden="true" />
                ))}
              </span>
              <span className="text-xs font-semibold">5.0</span>
              <span className="text-xs text-[#7A1519]">Rudraksha collection</span>
            </div>

            <p className="mt-4 text-lg font-bold text-[#231416]">{product.price}</p>

            <div className="mt-5 grid grid-cols-[auto_minmax(0,1fr)] gap-2 sm:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)] sm:gap-3">
              <div className="flex h-11 items-center border border-[#231416]/20">
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  aria-label="Decrease quantity"
                  className="flex h-full w-10 items-center justify-center text-[#4B0F14] transition hover:bg-[#F5ECE9]"
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </button>
                <span className="min-w-9 text-center text-sm font-semibold" aria-live="polite">
                  {quantity}
                </span>
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
                className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#7A1519] px-4 py-2.5 text-sm font-semibold text-[#FBEBC4] transition hover:bg-[#5E0F13] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1519]/40 focus-visible:ring-offset-2"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                Add to cart
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                className="col-span-2 min-h-11 border border-[#7A1519] px-4 py-2.5 text-sm font-semibold text-[#7A1519] transition hover:bg-[#F8F1EF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1519]/40 focus-visible:ring-offset-2 sm:col-span-1"
              >
                Buy it now
              </button>
            </div>

            <div className="mt-5 space-y-3 text-[15px] leading-[1.4] text-[#231416]">
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

      <section aria-labelledby="rudraksha-related-heading" className="border-t border-[#231416]/10">
        <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 sm:py-12 xl:px-10">
          <h2 id="rudraksha-related-heading" className="mb-6 text-center text-2xl font-bold text-[#201b3a]">
            Explore Other Mukhi Rudraksha
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.name}
                to={`/rudraksha/${getRudrakshaProductSlug(relatedProduct.name)}`}
                className="group overflow-hidden rounded-xl border border-[#201b3a]/10 bg-white transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="aspect-square bg-[#f7f2ea]">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    loading="lazy"
                    className="h-full w-full object-contain p-4 transition-transform group-hover:scale-105"
                  />
                </div>
                <h3 className="px-3 pt-3 text-sm font-semibold text-[#201b3a]">{relatedProduct.name}</h3>
                <p className="px-3 pb-3 text-sm font-bold text-[#201b3a]">{relatedProduct.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default RudrakshaDetails;
