import { useEffect, useMemo, useState } from 'react';
import { Minus, Package, Plus, ShoppingBag, Star, Truck } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCustomerStore } from '../../store/useCustomerStore';
import { getMantraProductBySlug } from '../../data/mantraUpcharProducts';

const MantraUpcharDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = useMemo(() => getMantraProductBySlug(slug), [slug]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const cart = useCustomerStore((state) => state.cart);
  const setCart = useCustomerStore((state) => state.setCart);
  const gallery = useMemo(
    () => [...new Set([product.detailImage || product.image, product.hoverImage].filter(Boolean))],
    [product],
  );

  useEffect(() => {
    setActiveImage(0);
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
    <main className="min-h-screen bg-[#FBF9F7] px-4 text-[#231416] sm:px-6 lg:px-8">
      <style>{`
        .mantra-audio {
          accent-color: #7A1519;
        }
        .mantra-audio::-webkit-media-controls-panel {
          background-color: #FBF9F7;
        }
      `}</style>
      <div className="mx-auto max-w-[1240px]">
        <section className="grid items-start gap-7 py-8 lg:grid-cols-2 lg:gap-12 lg:py-10">
          <div className="min-w-0 lg:sticky lg:top-6">
            <div className="flex flex-col gap-3">
              <div className="flex aspect-square items-center justify-center overflow-hidden bg-[#F5ECE9] border-0">
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
                      className={`h-16 w-16 overflow-hidden border bg-[#F5ECE9] transition sm:h-[76px] sm:w-[76px] ${
                        activeImage === index
                          ? 'border-[#7A1519] ring-1 ring-[#7A1519]'
                          : 'border-[#231416]/10 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={image} alt="" className="h-full w-full object-contain p-1" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="min-w-0 py-1 lg:py-0">
            <h1
              className="mt-2 font-sans font-bold leading-[1.1] tracking-tight lg:mt-0"
              style={{ color: '#925C2D', fontSize: 'clamp(1.75rem, 3vw, 2.25rem)' }}
            >
              {product.name}
            </h1>

            <p
              lang="hi"
              className="mt-3 lg:mt-2"
              style={{
                color: '#302522',
                fontFamily: "'Nirmala UI', 'Mangal', sans-serif",
                fontSize: '15px',
                letterSpacing: '0.01em',
                lineHeight: 1.4,
                textAlign: 'left',
                whiteSpace: 'pre-line',
              }}
            >
              {product.description}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 lg:mt-3">
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

            <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 lg:mt-3">
              <span className="text-base font-semibold text-[#231416]">{product.price}</span>
            </div>

            <div className="mt-6 border-y border-[#231416]/15 py-4 lg:mt-4 lg:py-2.5">
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

            <div className="mt-5 flex flex-wrap items-center gap-3 lg:mt-4">
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
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 bg-[#7A1519] px-5 py-2.5 text-sm font-semibold text-[#FBEBC4] transition hover:bg-[#5E0F13] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1519]/40 focus-visible:ring-offset-2"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                Add to cart
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="min-h-11 flex-1 border border-[#7A1519] px-5 py-2.5 text-sm font-semibold text-[#7A1519] transition hover:bg-[#F8F1EF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1519]/40 focus-visible:ring-offset-2"
              >
                Buy it now
              </button>
            </div>

            <div
              className="mt-4 space-y-3 text-[#231416]"
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
    </main>
  );
};

export default MantraUpcharDetails;
