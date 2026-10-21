import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { getYantraProductSlug } from '../../data/yantraProducts';
import { useCustomerStore } from '../../store/useCustomerStore';

const ProductCollectionGrid = ({ name, description, products, id = 'stone-products', pageSize, productDetailLinks = false, productDetailBasePath, showHeading = true }) => {
  const totalPages = pageSize ? Math.ceil(products.length / pageSize) : 1;
  const returnPositionKey = `product-collection:${id}:return`;
  const [returnPosition] = useState(() => {
    const storedPosition = window.sessionStorage.getItem(returnPositionKey);
    if (!storedPosition) {
      return null;
    }

    const parsedPosition = JSON.parse(storedPosition);
    return parsedPosition
      && typeof parsedPosition === 'object'
      && Number.isInteger(parsedPosition.page)
      && parsedPosition.page >= 1
      && parsedPosition.page <= totalPages
      && Number.isFinite(parsedPosition.scrollY)
      && parsedPosition.scrollY >= 0
      ? parsedPosition
      : null;
  });
  const [currentPage, setCurrentPage] = useState(() => returnPosition?.page ?? 1);
  const collectionRef = useRef(null);
  const previousPage = useRef(currentPage);
  const cart = useCustomerStore((state) => state.cart);
  const setCart = useCustomerStore((state) => state.setCart);
  const visibleProducts = pageSize
    ? products.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : products;

  useLayoutEffect(() => {
    if (returnPosition) {
      window.scrollTo({ top: returnPosition.scrollY, left: 0, behavior: 'instant' });
      window.sessionStorage.removeItem(returnPositionKey);
    }
  }, [returnPosition, returnPositionKey]);

  useEffect(() => {
    if (previousPage.current !== currentPage) {
      collectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      previousPage.current = currentPage;
    }
  }, [currentPage]);

  const handleAddToCart = (product) => {
    const isSameProduct = (item) => item.name === product.name && item.image === product.image;
    const existingItem = cart.find(isSameProduct);
    setCart(existingItem
      ? cart.map((item) => item.name === product.name
        && item.image === product.image
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item)
      : [...cart, { ...product, quantity: 1 }]);
  };

  const rememberCollectionPosition = (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    window.sessionStorage.setItem(returnPositionKey, JSON.stringify({
      page: currentPage,
      scrollY: window.scrollY,
    }));
  };

  const getProductDetailPath = (product) => (
    productDetailBasePath
      ? `${productDetailBasePath}/${getYantraProductSlug(product.name)}`
      : `/products/${getYantraProductSlug(product.name)}`
  );

  return (
    <section ref={collectionRef} id={id} className="mx-auto scroll-mt-20 w-full max-w-[1440px] px-4 pb-8 pt-4 sm:px-6 sm:pt-5 lg:px-8 lg:pb-10 lg:pt-6 2xl:px-12">
      {showHeading && (
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <h2 className="font-serif text-[1.45rem] font-bold leading-tight text-[#75665a] sm:text-[1.8rem] lg:text-[2.35rem]">{name} collection</h2>
          <p className="max-w-3xl text-sm leading-7 text-[#5b5470] sm:text-base">{description}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {visibleProducts.map((product) => {
          const isInCart = cart.some((item) => item.name === product.name && item.image === product.image);
          const hasPrice = Boolean(product.price);
          const alternateImage = product.images?.[1];
          const productImage = (
            <>
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                className="h-full w-full object-contain object-center"
              />
              {alternateImage && (
                <img
                  src={alternateImage}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-contain object-center opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 group-focus-within:opacity-100"
                />
              )}
            </>
          );

          return (
            <article
              key={`${product.category}-${product.name}-${product.image}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#201b3a]/10 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#4d001e]/30 hover:shadow-[0_18px_40px_rgba(32,27,58,0.12)]"
            >
              <div className="relative aspect-square overflow-hidden bg-[#f7f2ea]">
                {productDetailLinks ? (
                  <Link
                    to={getProductDetailPath(product)}
                    aria-label={`View ${product.name} details`}
                    onClick={rememberCollectionPosition}
                  >
                    <div className="relative h-full w-full">{productImage}</div>
                  </Link>
                ) : (
                  <div className="relative h-full w-full">{productImage}</div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-2 sm:p-4">
                <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#4d001e]/70 sm:text-[10px] sm:tracking-[0.16em]">{product.category}</p>
                <h3 className="mt-1 text-xs font-semibold leading-snug text-[#201b3a] sm:text-sm">
                  {productDetailLinks ? (
                    <Link
                      to={getProductDetailPath(product)}
                      className="line-clamp-2 hover:underline"
                      onClick={rememberCollectionPosition}
                    >
                      {product.name}
                    </Link>
                  ) : product.name}
                </h3>
                <div className="flex items-center gap-1.5 sm:gap-2" aria-label="Rated 5 out of 5, 11 reviews">
                  <span className="text-xs leading-none tracking-tight text-[#c9962b] sm:text-sm" aria-hidden="true">★★★★★</span>
                  <span className="hidden text-xs text-[#201b3a]/75 sm:inline">(11 reviews)</span>
                </div>
                <div className="mt-auto flex flex-col items-stretch gap-2 border-t border-[#201b3a]/10 pt-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:pt-3">
                  <p className={`text-sm font-bold ${hasPrice ? 'sm:text-base text-[#201b3a]' : 'text-[#75665a]'}`}>
                    {product.price || 'Price to be announced'}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    aria-label={isInCart ? `Add another ${product.name} to cart` : `Add ${product.name} to cart`}
                    disabled={!hasPrice}
                    className="inline-flex min-h-8 items-center justify-center gap-1 rounded-lg bg-[#4d001e] px-2 py-1.5 text-[10px] font-semibold text-white transition hover:bg-[#3a0016] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d001e]/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600 disabled:hover:bg-slate-300 sm:min-h-9 sm:gap-1.5 sm:px-3 sm:py-2 sm:text-xs"
                  >
                    <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
                    {!hasPrice ? 'Coming soon' : isInCart ? 'Add another' : 'Add to cart'}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {pageSize && totalPages > 1 && (
        <nav aria-label={`${name} product pages`} className="mt-8 flex flex-col items-center gap-3">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
              className="text-sm font-medium text-[#4d001e] transition hover:underline focus-visible:outline-none focus-visible:underline disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
                className={`px-1 text-sm transition hover:underline focus-visible:outline-none focus-visible:underline ${
                  currentPage === page
                    ? 'font-bold text-[#4d001e]'
                    : 'font-medium text-[#5b5470]'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              disabled={currentPage === totalPages}
              className="text-sm font-medium text-[#4d001e] transition hover:underline focus-visible:outline-none focus-visible:underline disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </nav>
      )}
    </section>
  );
};

export default ProductCollectionGrid;
