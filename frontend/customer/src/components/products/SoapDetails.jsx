import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Minus, Package, Plus, ShoppingBag, Star, Truck } from 'lucide-react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useCustomerStore } from '../../store/useCustomerStore';
import soapProducts, { getSoapProductBySlug, getSoapProductSlug } from '../../data/soapProducts';

const SoapDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = useMemo(() => getSoapProductBySlug(slug), [slug]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [descriptionLanguage, setDescriptionLanguage] = useState('en');
  const cart = useCustomerStore((state) => state.cart);
  const setCart = useCustomerStore((state) => state.setCart);
  const gallery = useMemo(
    () => [...new Set([product?.image, product?.hoverImage, product?.detailImage].filter(Boolean))],
    [product],
  );
  const relatedProducts = useMemo(
    () => soapProducts.filter((item) => item.name !== product?.name).slice(0, 4),
    [product],
  );

  useEffect(() => {
    setQuantity(1);
    setActiveImage(0);
    setDescriptionLanguage('en');
  }, [product]);

  if (!product) return <Navigate to="/soap" replace />;

  const isSameProduct = (item) => item.name === product.name && item.image === product.image;
  const handleAddToCart = () => {
    const existingItem = cart.find(isSameProduct);
    setCart(existingItem
      ? cart.map((item) => isSameProduct(item)
        ? { ...item, quantity: (item.quantity || 1) + quantity }
        : item)
      : [...cart, { ...product, quantity }]);
  };
  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  return (
    <main className="min-h-screen bg-[#f8f6f1] px-4 text-[#231416] sm:px-6 xl:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="pt-5">
          <Link
            to="/soap"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#7A1519] transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1519]/40"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Soap
          </Link>
        </div>

        <section className="grid items-start gap-6 py-6 pb-8 sm:gap-8 sm:py-8 lg:grid-cols-2 lg:gap-8 lg:py-10 xl:gap-10">
          <div className="mx-auto min-w-0 w-full max-w-md lg:max-w-none">
            <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-white">
              <img src={gallery[activeImage]} alt={product.name} className="h-full w-full object-contain" />
            </div>
            {gallery.length > 1 && (
              <div className="mt-3 flex justify-center gap-2">
                {gallery.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`Show product image ${index + 1}`}
                    aria-pressed={activeImage === index}
                    className={`h-16 w-16 overflow-hidden border bg-white transition ${
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

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8a6a1f]">Soap</p>
            <h1 className="mt-2 font-sans font-bold leading-[1.12] tracking-tight text-[#925C2D]" style={{ fontSize: 'clamp(1.75rem, 2.4vw, 2.25rem)' }}>
              {product.name}
            </h1>
            <div className="mt-4 space-y-4 text-sm leading-6 text-[#302522]">
              <section aria-labelledby="soap-benefits-heading">
                <h2 id="soap-benefits-heading" className="font-semibold">{product.name} Benefits</h2>
                <p lang="hi" className="mt-1" style={{ fontFamily: "'Nirmala UI', 'Mangal', sans-serif" }}>
                  {product.description}
                </p>
              </section>

              <div className="space-y-1">
                <p lang="hi">Scent – {product.scent}</p>
                <p>Brand – {product.brand}</p>
                <p>Item Form - {product.itemForm}</p>
                <p lang="hi">{product.detailLabel || 'Ingredients'} – {product.ingredients}</p>
              </div>

              <section>
                <p lang="hi" style={{ fontFamily: "'Nirmala UI', 'Mangal', sans-serif" }}>
                  Religious Belief - {product.religiousBelief}
                </p>
              </section>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <span className="flex items-center gap-0.5 text-[#C9973A]" aria-label="Rated 5 out of 5 stars">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" aria-hidden="true" />
                ))}
              </span>
              <span className="text-xs font-semibold">5.0</span>
              <span className="text-xs text-[#7A1519]">11 reviews</span>
            </div>
            <p className="mt-3 text-lg font-bold text-[#231416]">{product.price}</p>

            <div className="mt-4 grid grid-cols-[auto_minmax(0,1fr)] items-stretch gap-2 sm:mt-5 sm:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)] sm:gap-3">
              <div className="flex h-11 items-center rounded border border-[#231416]/20">
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
                className="inline-flex min-h-11 min-w-0 items-center justify-center gap-1.5 rounded bg-[#7A1519] px-2.5 py-2.5 text-xs font-semibold text-[#FBEBC4] transition hover:bg-[#5E0F13] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1519]/40 focus-visible:ring-offset-2 sm:gap-2 sm:px-4 sm:text-sm"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                Add to cart
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                className="col-span-2 min-h-11 min-w-0 rounded border border-[#7A1519] px-2.5 py-2.5 text-xs font-semibold text-[#7A1519] transition hover:bg-[#F8F1EF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1519]/40 focus-visible:ring-offset-2 sm:col-span-1 sm:px-4 sm:text-sm"
              >
                Buy it now
              </button>
            </div>

            <div className="mt-4 space-y-3 text-[15px] leading-[1.4] text-[#231416] sm:mt-5">
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

      <section aria-label="Product description" className="mx-auto max-w-[1440px] px-4 sm:px-6 xl:px-10">
        <div className="pt-2 pb-8 sm:pt-3 sm:pb-10 lg:pt-4">
          <div role="tablist" aria-label="Description language" className="flex gap-6 border-b border-[#231416]/10">
            {[
              { id: 'en', label: 'English Description' },
              { id: 'hi', label: 'हिंदी विवरण' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`soap-description-tab-${tab.id}`}
                aria-selected={descriptionLanguage === tab.id}
                aria-controls="soap-description-panel"
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
            id="soap-description-panel"
            role="tabpanel"
            aria-labelledby={`soap-description-tab-${descriptionLanguage}`}
            lang={descriptionLanguage === 'hi' ? 'hi' : 'en'}
            className="pt-5 text-base leading-7 text-[#3a2c2e]"
            style={descriptionLanguage === 'hi' ? { fontFamily: "'Nirmala UI', 'Mangal', sans-serif" } : undefined}
          >
            {descriptionLanguage === 'hi'
              ? product.descriptionHindi || 'उत्पाद का विवरण जल्द जोड़ा जाएगा।'
              : product.descriptionEnglish || 'Product description will be added soon.'}
          </div>
        </div>
      </section>

      <section aria-labelledby="soap-related-heading">
        <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 sm:py-12 xl:px-10">
          <h2 id="soap-related-heading" className="mb-6 text-center text-2xl font-bold text-[#201b3a]">
            Explore More Soap
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.name}
                to={`/soap/${getSoapProductSlug(relatedProduct.name)}`}
                className="group overflow-hidden rounded-xl border border-[#201b3a]/10 bg-white transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1519]/40"
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

export default SoapDetails;
