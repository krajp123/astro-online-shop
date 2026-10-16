import { useCustomerStore } from '../../store/useCustomerStore';
import { Link, Navigate, useParams } from 'react-router-dom';

const featuredProducts = {
  'ashtasiddhi-yantra': {
    name: 'Ashtasiddhi Yantra',
    category: 'Yantra',
    price: 'Rs. 41,000.00',
    image: '/top%20products/4.jpg',
    backTo: '/products',
  },
  'shukra-amrit-soap': {
    name: 'Shukra Amrit Soap',
    category: 'Soap',
    price: 'Rs. 479.00',
    image: '/Soap/sukr1.jpg',
    hoverImage: '/Soap/sukr1.1.jpg',
    backTo: '/soap',
  },
  'shani-amrit-dhoop': {
    name: 'Shani Amrit Dhoop',
    category: 'Dhoop',
    price: 'Rs. 409.00',
    image: '/Dhoop/shani1.1.jpg',
    hoverImage: '/Dhoop/shani1.jpg',
    backTo: '/dhoop',
  },
};

const FeaturedProductDetails = () => {
  const { slug } = useParams();
  const product = featuredProducts[slug];
  const cart = useCustomerStore((state) => state.cart);
  const setCart = useCustomerStore((state) => state.setCart);

  if (!product) return <Navigate to="/" replace />;

  const isInCart = cart.some((item) => item.name.trim() === product.name);

  const handleAddToCart = () => {
    const existingItem = cart.find((item) => item.name.trim() === product.name);
    setCart(existingItem
      ? cart.map((item) => item.name.trim() === product.name
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item)
      : [...cart, { ...product, quantity: 1 }]);
  };

  return (
    <main className="min-h-[60vh] bg-[#f8f6f1] px-4 py-8 text-[#201b3a] sm:px-8 sm:py-12">
      <section className="mx-auto grid w-full max-w-[1100px] gap-8 rounded-2xl border border-[#201b3a]/10 bg-white p-5 shadow-sm sm:grid-cols-2 sm:gap-10 sm:p-8 lg:p-12">
        <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-[#f7f2ea] p-6">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <div className="flex flex-col justify-center">
          <Link
            to={product.backTo}
            className="mb-5 w-fit text-sm font-medium text-[#75665a] transition hover:text-[#4d001e]"
          >
            ← Back to {product.category}
          </Link>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8a6a1f]">
            {product.category}
          </p>
          <h1 className="mt-2 font-serif text-2xl font-bold leading-tight sm:text-3xl">
            {product.name}
          </h1>
          <p className="mt-5 text-xl font-bold">{product.price}</p>
          <p className="mt-5 text-sm leading-6 text-[#5b5470]">
            Explore {product.name} from our {product.category} collection.
          </p>
          <button
            type="button"
            onClick={handleAddToCart}
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#4d001e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3a0016] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d001e]/40 focus-visible:ring-offset-2"
          >
            {isInCart ? 'Add another to cart' : 'Add to cart'}
          </button>
        </div>
      </section>
    </main>
  );
};

export default FeaturedProductDetails;
