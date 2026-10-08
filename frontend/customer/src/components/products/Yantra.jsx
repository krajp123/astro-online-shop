import { useMemo, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useCustomerStore } from '../../store/useCustomerStore';

export const yantraProducts = [
  { name: 'Sarva Shakti Peeth Yantra', category: 'Exclusive Yantra', price: '₹2,450', tag: 'Best Seller', exclusive: true },
  { name: 'Madhya Shakti Peeth Yantra', category: 'Exclusive Yantra', price: '₹2,350', tag: 'Popular', exclusive: true },
  { name: 'Bal Gopal Yantra', category: 'Exclusive Yantra', price: '₹1,980', tag: 'New', exclusive: true },
  { name: 'Shree Shodashi Yantra', category: 'Exclusive Yantra', price: '₹3,200', tag: 'Premium', exclusive: true },
  { name: 'Shakti Peeth Yantra', category: 'Exclusive Yantra', price: '₹2,100', tag: 'Classic', exclusive: true },
  { name: 'Shree Baglamukhi Yantra', category: 'Exclusive Yantra', price: '₹2,600', tag: 'Power', exclusive: true },
  { name: 'Vyapar Yantra', category: 'Exclusive Yantra', price: '₹1,780', tag: 'Growth', exclusive: true },
  { name: 'Rog Nivaran Yantra', category: 'Exclusive Yantra', price: '₹2,150', tag: 'Healing', exclusive: true },
  { name: 'Nazar Dosh Yantra', category: 'Exclusive Yantra', price: '₹1,920', tag: 'Protective', exclusive: true },
  { name: 'Shakni Yantra', category: 'Exclusive Yantra', price: '₹2,300', tag: 'Spiritual', exclusive: true },
  { name: 'Vishakha Nakshatra Yantra', category: 'Nakshatra Yantra', price: '₹1,850', tag: 'Nakshatra', exclusive: true },
  { name: 'Magha Nakshatra Yantra', category: 'Nakshatra Yantra', price: '₹1,820', tag: 'Nakshatra', exclusive: true },
  { name: 'Meen Rashi Yantra', category: 'Rashi Yantra', price: '₹1,760', tag: 'Rashi', exclusive: true },
  { name: 'Moola Nakshatra Yantra', category: 'Nakshatra Yantra', price: '₹1,980', tag: 'Nakshatra', exclusive: true },
  { name: 'Purva Bhadrapada Nakshatra Yantra', category: 'Nakshatra Yantra', price: '₹2,050', tag: 'Nakshatra', exclusive: true },
  { name: 'Punarvasu Nakshatra Yantra', category: 'Nakshatra Yantra', price: '₹1,900', tag: 'Nakshatra', exclusive: true },
  { name: 'Dhanu Rashi Yantra', category: 'Rashi Yantra', price: '₹1,740', tag: 'Rashi', exclusive: true },
  { name: 'Ashwini Nakshatra Yantra', category: 'Nakshatra Yantra', price: '₹1,880', tag: 'Nakshatra', exclusive: true },
  { name: 'Shravana Nakshatra Yantra', category: 'Nakshatra Yantra', price: '₹1,860', tag: 'Nakshatra', exclusive: true },
  { name: 'Tula Rashi Yantra', category: 'Rashi Yantra', price: '₹1,710', tag: 'Rashi', exclusive: true },
  { name: 'Vrishabha Rashi Yantra', category: 'Rashi Yantra', price: '₹1,680', tag: 'Rashi', exclusive: true },
  { name: 'Purva Ashadha Nakshatra Yantra', category: 'Nakshatra Yantra', price: '₹1,940', tag: 'Nakshatra', exclusive: true },
  { name: 'Purva Phalguni Nakshatra Yantra', category: 'Nakshatra Yantra', price: '₹1,950', tag: 'Nakshatra', exclusive: true },
  { name: 'Rohini Nakshatra Yantra', category: 'Nakshatra Yantra', price: '₹1,890', tag: 'Nakshatra', exclusive: true },
  { name: 'Bharani Nakshatra Yantra', category: 'Nakshatra Yantra', price: '₹1,870', tag: 'Nakshatra', exclusive: true },
  { name: 'Hasta Nakshatra Yantra', category: 'Nakshatra Yantra', price: '₹1,920', tag: 'Nakshatra', exclusive: true },
  { name: 'Uttara Bhadrapada Nakshatra Yantra', category: 'Nakshatra Yantra', price: '₹1,960', tag: 'Nakshatra', exclusive: true },
  { name: 'Kanya Rashi Yantra', category: 'Rashi Yantra', price: '₹1,720', tag: 'Rashi', exclusive: true },
  { name: 'Mithun Rashi Yantra', category: 'Rashi Yantra', price: '₹1,690', tag: 'Rashi', exclusive: true },
  { name: 'Ardra Nakshatra Yantra', category: 'Nakshatra Yantra', price: '₹1,830', tag: 'Nakshatra', exclusive: true },
  { name: 'Shatabhisha Nakshatra Yantra', category: 'Nakshatra Yantra', price: '₹1,900', tag: 'Nakshatra', exclusive: true },
  { name: 'Revati Nakshatra Yantra', category: 'Nakshatra Yantra', price: '₹1,910', tag: 'Nakshatra', exclusive: true },
  { name: 'Jyeshtha Nakshatra Yantra', category: 'Nakshatra Yantra', price: '₹1,980', tag: 'Nakshatra', exclusive: true },
  { name: 'Ashlesha Nakshatra Yantra', category: 'Nakshatra Yantra', price: '₹1,880', tag: 'Nakshatra', exclusive: true },
  { name: 'Maha Laxmi Yantra', category: 'Exclusive Yantra', price: '₹3,500', tag: 'Divine', exclusive: true },
  { name: 'Uttara Phalguni Nakshatra Yantra', category: 'Nakshatra Yantra', price: '₹1,940', tag: 'Nakshatra', exclusive: true },
  { name: 'Singh Rashi Yantra', category: 'Rashi Yantra', price: '₹1,760', tag: 'Rashi', exclusive: true },
  { name: 'Uttara Ashadha Nakshatra Yantra', category: 'Nakshatra Yantra', price: '₹1,970', tag: 'Nakshatra', exclusive: true },
  { name: 'Vrishchik Rashi Yantra', category: 'Rashi Yantra', price: '₹1,800', tag: 'Rashi', exclusive: true },
  { name: 'Kritika Nakshatra Yantra', category: 'Nakshatra Yantra', price: '₹1,890', tag: 'Nakshatra', exclusive: true },
  { name: 'Mesh Rashi Yantra', category: 'Rashi Yantra', price: '₹1,670', tag: 'Rashi', exclusive: true },
  { name: 'Mrigashira Nakshatra Yantra', category: 'Nakshatra Yantra', price: '₹1,820', tag: 'Nakshatra', exclusive: true },
  { name: 'Chitra Nakshatra Yantra', category: 'Nakshatra Yantra', price: '₹1,870', tag: 'Nakshatra', exclusive: true },
  { name: 'Dhanishta Nakshatra Yantra', category: 'Nakshatra Yantra', price: '₹1,930', tag: 'Nakshatra', exclusive: true },
  { name: 'Kumbh Rashi Yantra', category: 'Rashi Yantra', price: '₹1,790', tag: 'Rashi', exclusive: true },
  { name: 'Makar Rashi Yantra', category: 'Rashi Yantra', price: '₹1,850', tag: 'Rashi', exclusive: true },
  { name: 'Pushya Nakshatra Yantra', category: 'Nakshatra Yantra', price: '₹1,870', tag: 'Nakshatra', exclusive: true },
  { name: 'Anuradha Nakshatra Yantra', category: 'Nakshatra Yantra', price: '₹1,910', tag: 'Nakshatra' },
  { name: 'Swati Nakshatra Yantra', category: 'Nakshatra Yantra', price: '₹1,920', tag: 'Nakshatra' },
  { name: 'Kark Rashi Yantra', category: 'Rashi Yantra', price: '₹1,750', tag: 'Rashi' },
];

const categories = ['Yantra', 'Exclusive Yantra', 'Rashi Yantra', 'Nakshatra Yantra'];

const productImageMap = {
  'Sarva Shakti Peeth Yantra': ['/Yantra/sarv-shakti-peeth-yantra.png', '/Yantra/yantra1.jpg'],
  'Madhya Shakti Peeth Yantra': ['/Yantra/madhya-shakti-peeth-yantra.png', '/Yantra/yantra2.jpg'],
  'Bal Gopal Yantra': ['/Yantra/Bal_gopal_yantra.png', '/Yantra/yantra1.jpg'],
  'Shree Shodashi Yantra': ['/Yantra/shree-shodashi-yantra.png', '/Yantra/yantra2.jpg'],
  'Shakti Peeth Yantra': ['/Yantra/shakti-peeth-yantra.jpg', '/Yantra/shakti-peeth-yantra10.jpg', '/Yantra/yantra1.jpg'],
  'Shree Baglamukhi Yantra': ['/Yantra/shree-baglamukhi-yantra.png', '/Yantra/yantra2.jpg'],
  'Vyapar Yantra': ['/Yantra/yvapar-yantra.png', '/Yantra/yantra1.jpg'],
  'Rog Nivaran Yantra': ['/Yantra/rog-nivaran-yantra.png', '/Yantra/yantra2.jpg'],
  'Nazar Dosh Yantra': ['/Yantra/nazar-dosh-yantra.png', '/Yantra/yantra1.jpg'],
  'Shakni Yantra': ['/Yantra/shakni-yantra.png', '/Yantra/yantra2.jpg'],
  'Vishakha Nakshatra Yantra': ['/Yantra/vishakha_locket.jpg', '/Yantra/vishakha_yantra.jpg', '/Yantra/yantra1.jpg'],
  'Magha Nakshatra Yantra': ['/Yantra/magha_yantra.jpg', '/Yantra/magha_locket.jpg', '/Yantra/yantra2.jpg'],
  'Meen Rashi Yantra': ['/Yantra/meen-rashi-2.jpg', '/Yantra/meen-locket.jpg', '/Yantra/yantra1.jpg'],
  'Moola Nakshatra Yantra': ['/Yantra/moola_yantra.jpg', '/Yantra/moola_locket.jpg', '/Yantra/yantra2.jpg'],
  'Purva Bhadrapada Nakshatra Yantra': ['/Yantra/purva-bhadarpad_yantra.jpg', '/Yantra/purva-bhadarpad_locket.jpg', '/Yantra/yantra1.jpg'],
  'Punarvasu Nakshatra Yantra': ['/Yantra/punarvasu_yantra.jpg', '/Yantra/punarvasu_locket.jpg', '/Yantra/yantra2.jpg'],
  'Dhanu Rashi Yantra': ['/Yantra/dhanu-rashi-2.jpg', '/Yantra/dhanu-locket.jpg', '/Yantra/yantra1.jpg'],
  'Ashwini Nakshatra Yantra': ['/Yantra/ashwani_yantra_0a490f65-f4c3-4802-a2c0-249d5cf2ad59.jpg', '/Yantra/ashwani_locket_6a5856ba-da37-4bd8-9aea-6dffca0e79f6.jpg', '/Yantra/yantra2.jpg'],
  'Shravana Nakshatra Yantra': ['/Yantra/shravan_yantra.jpg', '/Yantra/shravan_locket_1.jpg', '/Yantra/yantra1.jpg'],
  'Tula Rashi Yantra': ['/Yantra/tula-rashi-2.jpg', '/Yantra/tula-locket.jpg', '/Yantra/yantra2.jpg'],
  'Vrishabha Rashi Yantra': ['/Yantra/vrishabh-rashi.jpg', '/Yantra/vrishabh-locket.jpg', '/Yantra/yantra1.jpg'],
  'Purva Ashadha Nakshatra Yantra': ['/Yantra/purva-shaada_yantra.jpg', '/Yantra/purva-shaada_locket.jpg', '/Yantra/yantra2.jpg'],
  'Purva Phalguni Nakshatra Yantra': ['/Yantra/purva-falguni_yantra.jpg', '/Yantra/purva-faalguni_locket.jpg', '/Yantra/yantra1.jpg'],
  'Rohini Nakshatra Yantra': ['/Yantra/rohini_yantra.jpg', '/Yantra/rohini_locket.jpg', '/Yantra/yantra2.jpg'],
  'Bharani Nakshatra Yantra': ['/Yantra/bharni_yantra.jpg', '/Yantra/bharni_locket.jpg', '/Yantra/yantra1.jpg'],
  'Hasta Nakshatra Yantra': ['/Yantra/hast_yantra.jpg', '/Yantra/hast_locket.jpg', '/Yantra/yantra2.jpg'],
  'Uttara Bhadrapada Nakshatra Yantra': ['/Yantra/4_17b816da-cf12-45e2-878d-5a65c129b2f0.jpg', '/Yantra/yantra2.jpg'],
  'Kanya Rashi Yantra': ['/Yantra/kanya-rashi-2.jpg', '/Yantra/kanya-locket.jpg', '/Yantra/yantra1.jpg'],
  'Mithun Rashi Yantra': ['/Yantra/mithun-rashi-2.jpg', '/Yantra/mithun-locket.jpg', '/Yantra/yantra2.jpg'],
  'Ardra Nakshatra Yantra': ['/Yantra/Ardra_yantra.jpg', '/Yantra/Ardra_locket.jpg', '/Yantra/yantra1.jpg'],
  'Shatabhisha Nakshatra Yantra': ['/Yantra/shatbhisha_yantra.jpg', '/Yantra/shatbhisha_locket.jpg', '/Yantra/yantra2.jpg'],
  'Revati Nakshatra Yantra': ['/Yantra/revti_yantra.jpg', '/Yantra/revti_locket.jpg', '/Yantra/yantra1.jpg'],
  'Jyeshtha Nakshatra Yantra': ['/Yantra/jyestha_yantra.jpg', '/Yantra/jyestha_locket.jpg', '/Yantra/yantra2.jpg'],
  'Ashlesha Nakshatra Yantra': ['/Yantra/3_1f1520c3-a148-490f-b53c-1151de6f6539.jpg', '/Yantra/yantra1.jpg'],
  'Maha Laxmi Yantra': ['/Yantra/mahalaxmi-yantra.png', '/Yantra/yantra2.jpg'],
  'Uttara Phalguni Nakshatra Yantra': ['/Yantra/utra-phalguni_yantra.jpg', '/Yantra/utra-phalguni_locket.jpg', '/Yantra/yantra1.jpg'],
  'Singh Rashi Yantra': ['/Yantra/singh-rashi-2.jpg', '/Yantra/singh-locket.jpg', '/Yantra/yantra2.jpg'],
  'Uttara Ashadha Nakshatra Yantra': ['/Yantra/utra-shaadaa_yantra.jpg', '/Yantra/yantra1.jpg'],
  'Vrishchik Rashi Yantra': ['/Yantra/vrishchik-rashi-2.jpg', '/Yantra/vrishchik-locket.jpg', '/Yantra/yantra1.jpg'],
  'Kritika Nakshatra Yantra': ['/Yantra/kritika_yantra.jpg', '/Yantra/kritika_locket.jpg', '/Yantra/yantra2.jpg'],
  'Mesh Rashi Yantra': ['/Yantra/mesh-rashi-2.jpg', '/Yantra/mesh-locket.jpg', '/Yantra/yantra1.jpg'],
  'Mrigashira Nakshatra Yantra': ['/Yantra/mrigshira_yantra.jpg', '/Yantra/mrigshira_locket.jpg', '/Yantra/yantra2.jpg'],
  'Chitra Nakshatra Yantra': ['/Yantra/chitra_yantra.jpg', '/Yantra/chitra_locket.jpg', '/Yantra/yantra1.jpg'],
  'Dhanishta Nakshatra Yantra': ['/Yantra/dhanistha_yantra.jpg', '/Yantra/dhanistha_locket.jpg', '/Yantra/yantra2.jpg'],
  'Kumbh Rashi Yantra': ['/Yantra/kumbh-rashi-2.jpg', '/Yantra/kumbh-locket.jpg', '/Yantra/yantra1.jpg'],
  'Makar Rashi Yantra': ['/Yantra/makar-rashi-2.jpg', '/Yantra/makar-locket.jpg', '/Yantra/yantra2.jpg'],
  'Pushya Nakshatra Yantra': ['/Yantra/pushya_yantra.jpg', '/Yantra/pushya_locket.jpg', '/Yantra/yantra1.jpg'],
  'Anuradha Nakshatra Yantra': ['/Yantra/yantra1.jpg'],
  'Swati Nakshatra Yantra': ['/Yantra/yantra2.jpg'],
  'Kark Rashi Yantra': ['/Yantra/kark-rashi-2.jpg', '/Yantra/kark-locket.jpg', '/Yantra/yantra1.jpg'],
};

export const getProductImage = (product) => {
  const candidates = productImageMap[product.name] || ['/Yantra/yantra1.jpg'];
  return candidates[0];
};

const ProductCard = ({ product }) => {
  const imageCandidates = productImageMap[product.name] || ['/Yantra/yantra1.jpg'];
  const cart = useCustomerStore((state) => state.cart);
  const setCart = useCustomerStore((state) => state.setCart);
  const isInCart = cart.some((item) => item.name === product.name);

  const handleAddToCart = () => {
    const existingItem = cart.find((item) => item.name === product.name);
    setCart(existingItem
      ? cart.map((item) => item.name === product.name
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item)
      : [...cart, { ...product, image: getProductImage(product), quantity: 1 }]);
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-[#201b3a]/10 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#4d001e]/30 hover:shadow-[0_18px_40px_rgba(32,27,58,0.12)]">
      <div className="relative aspect-square overflow-hidden bg-[#f7f2ea]">
        <img
          src={getProductImage(product)}
          alt={product.name}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = '/Yantra/yantra1.jpg';
          }}
          className={`h-full w-full object-contain object-center transition-opacity duration-1000 ease-in-out ${imageCandidates[1] ? 'group-hover:opacity-0' : ''}`}
        />
        {imageCandidates[1] && (
          <img
            src={imageCandidates[1]}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-contain object-center opacity-0 transition-opacity duration-1000 ease-in-out group-hover:opacity-100"
          />
        )}
      </div>

      <div className="flex flex-col p-3 sm:p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold leading-snug text-[#201b3a]">{product.name}</h3>
        </div>
        <div className="mt-1.5 flex items-center gap-2" aria-label="Rated 5 out of 5, 11 reviews">
          <span className="text-sm leading-none tracking-tight text-[#c9962b]" aria-hidden="true">★★★★★</span>
          <span className="text-xs text-[#201b3a]/75">(11 reviews)</span>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3 border-t border-[#201b3a]/10 pt-3">
          <p className="text-base font-bold text-[#201b3a]">{product.price}</p>
          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={isInCart ? `Add another ${product.name} to cart` : `Add ${product.name} to cart`}
            className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg bg-[#4d001e] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#3a0016] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d001e]/40 focus-visible:ring-offset-2"
          >
            <ShoppingCart className="h-4 w-4" aria-hidden="true" />
            {isInCart ? 'Add another' : 'Add to cart'}
          </button>
        </div>
      </div>
    </article>
  );
};

const ProductsPage = () => {
  const reduceMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState('Yantra');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const itemsPerPage = 12;

  const filteredProducts = useMemo(() => {
    // "Yantra" and "Exclusive Yantra" show the curated 47-product listing
    if (selectedCategory === 'Yantra' || selectedCategory === 'Exclusive Yantra') {
      return yantraProducts.filter((product) => product.exclusive);
    }
    return yantraProducts.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProducts = filteredProducts.slice((safePage - 1) * itemsPerPage, safePage * itemsPerPage);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setIsFilterOpen(false);
  };

  return (
    <section className="mx-auto w-full max-w-[2000px] bg-[#f5f1eb] px-0 py-0">
      <div className="relative w-full overflow-hidden">
        <img
          src="/Vastu.png"
          alt="Yantra astrology banner"
          className="h-[220px] w-full object-cover object-center sm:h-[280px] lg:h-[330px]"
        />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(20,4,2,0.92)_0%,rgba(30,8,2,0.84)_32%,rgba(53,15,6,0.52)_58%,rgba(53,15,6,0.18)_72%,rgba(53,15,6,0)_100%)]" />

        <div className="absolute inset-0 flex items-start justify-start px-4 pt-5 sm:px-8 sm:pt-7 lg:px-12 xl:px-16 xl:pt-8">
          <div className="w-full max-w-[66rem] text-left">
            <div className="mb-6 flex items-center gap-4">
                <h2 className="text-[1.45rem] font-black leading-none tracking-[-0.05em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] sm:text-[1.8rem] lg:text-[2.35rem]">
                Yantra
              </h2>
              <span className="hidden h-px flex-1 max-w-[22rem] bg-[#f4d69a] md:block" />
            </div>

            <p className="max-w-[58rem] text-[0.58rem] leading-[1.7] font-medium text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.95)] sm:text-[0.7rem] lg:text-[0.82rem] xl:text-[0.9rem] xl:leading-[1.8]">
              All the special Yantra available at Astro Vastu Bazar and are beneficial for achieving specific goals such as business growth, health improvement, protection from enemies, and wealth creation. At our Website, you can also find Yantras related to your zodiac sign and Nakshatra, which are made from gold, silver, rose gold, and other pure metals. By using these Yantra, one can experience positive growth in business, enhanced aura and appearance, financial stability, and rectify the defects present in the birth chart (Janam Kundli). Consult with our expert astrologers to understand the proper method of wearing these Yantra and then proceed to wear them accordingly.
            </p>

            <p className="mt-4 text-[0.62rem] font-medium text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.95)] sm:text-[0.75rem] lg:text-[0.92rem]">
              For a free consultation with our astrologers, call now: <span className="font-bold">xxxxxxxxxx</span>
            </p>
          </div>
        </div>
        <svg
          className="absolute inset-x-0 bottom-0 z-20 h-8 w-full sm:h-10"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <motion.path
            d="M0 40 C180 86 330 8 520 38 C700 68 850 78 1030 38 C1200 8 1320 20 1440 44 V100 H0Z"
            animate={reduceMotion ? undefined : {
              d: [
                'M0 40 C180 86 330 8 520 38 C700 68 850 78 1030 38 C1200 8 1320 20 1440 44 V100 H0Z',
                'M0 44 C180 8 330 88 520 44 C700 10 850 12 1030 44 C1200 88 1320 72 1440 40 V100 H0Z',
                'M0 40 C180 86 330 8 520 38 C700 68 850 78 1030 38 C1200 8 1320 20 1440 44 V100 H0Z',
              ],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            fill="#f5f1eb"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-[1440px] bg-[#f5f1eb] px-4 pt-10 pb-10 sm:px-6 sm:pt-12 lg:pb-8 lg:pt-14">
        <div className="mt-3 flex justify-end">
          <div className="relative w-[185px]">
            <button
              type="button"
              onClick={() => setIsFilterOpen((value) => !value)}
              className="flex w-full items-center justify-between border border-[#1f1f1f] bg-[#f7f1e8] px-2.5 py-1.5 text-left text-[0.76rem] font-semibold text-[#1f1f1f]"
              style={{ borderRadius: 0 }}
            >
              <div className="flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 text-[#1f1f1f]">
                  <path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <span>Filter</span>
              </div>

              <svg viewBox="0 0 20 20" fill="none" className="h-3 w-3 text-[#1f1f1f]">
                <path d="M5.5 7.5 10 12l4.5-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {isFilterOpen && (
              <div className="absolute left-0 right-0 top-full z-40 mt-1 border border-[#1f1f1f] bg-[#f7f1e8] shadow-[0_4px_10px_rgba(0,0,0,0.08)]" style={{ borderRadius: 0 }}>
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryChange(category)}
                    className={`block w-full border-b border-[#1f1f1f]/15 px-3 py-2 text-left text-[0.8rem] font-medium transition ${
                      selectedCategory === category
                        ? 'bg-transparent text-[#1f1f1f]'
                        : 'text-[#1f1f1f] hover:bg-[#efe4d1]'
                    } ${category === categories[categories.length - 1] ? 'border-b-0' : ''}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-start gap-3">
          <div>
            <h2 className="mt-1 text-2xl font-bold text-[#201b3a]">{selectedCategory === 'Yantra' ? '' : selectedCategory}</h2>
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-3 text-[#201b3a]">
            <button
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={safePage === 1}
              className="text-sm font-medium text-[#201b3a] transition hover:text-[#4d001e] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <div className="flex items-center gap-4">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`text-sm font-bold transition ${
                    safePage === page
                      ? 'text-[#4d001e] underline decoration-[#4d001e] underline-offset-4'
                      : 'text-[#201b3a]/80 hover:text-[#4d001e]'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              disabled={safePage === totalPages}
              className="text-sm font-medium text-[#201b3a] transition hover:text-[#4d001e] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}

        <div className="mt-10 bg-[#f5f1eb] px-0 pb-6 pt-2 text-[#201b3a]">
          <div className="mx-auto max-w-[1440px]">
            <div className="space-y-6 text-[15px] leading-8 text-[#201b3a]">
              <p>
                People have used Yantras for centuries to channel cosmic energies for their own personal and spiritual development. Yantras are geometric designs that have been employed for centuries as a meditation and manifestation aid in the Hindu and Buddhist traditions. These sacred symbols are thought to contain strong energies that can aid you in achieving your objectives and fulfilling your desires.
              </p>

              <p>
                We have a variety of Yantras at Astrology that can assist you in gaining access to the power of cosmic energies. We have Yantras for money, success, protection, love, and health in our collection. Every Yantra is made with the intention of assisting you in attracting good vibes and energy into your life.
              </p>

              <p>
                Our Yantra collection is based on ancient Vedic texts and scriptures that have been used for centuries to attain both material success and spiritual enlightenment. You can connect with divine energies and bring balance to your life by using the yantras.
              </p>

              <p>
                The Shree Yantra is one of our collection’s most well-known Yantras. The universe and the divine energy that permeates it are represented by the Shree Yantra, a sacred geometric pattern. According to legend, this yantra will bring you wealth, success, and good fortune. It is also thought to facilitate spiritual awakening and communion with God.
              </p>

              <p>
                The Shree Ganesh Yantra is another well-liked Yantra in our collection. Lord Ganesha, the obstacle-remover, is the subject of this Yantra. It is thought that the Shree Ganesh Yantra will assist you in overcoming hardships and challenges in your life. Additionally, success and wealth are thought to be brought into your life by it.
              </p>

              <p>
                The Shree Shukra Yantra and the Shree Vishnu Yantra are in our collection if you’re looking for Yantras for love and relationships. The Venus-inspired Shree Shukra Yantra is said to promote harmony, love, and loveliness in your life. The Shree Vishnu Yantra honours Lord Vishnu, the universe’s protector. This Yantra is thought to balance and bring harmony to your relationships. Our expert astrologers and pandits energise our Yantras, which are crafted from the finest materials. We also give thorough instructions on how to use the Yantras to their fullest potential. Our yantras are meant to be a meditation and manifestation tool.
              </p>

              <p>
                In conclusion, Yantras are potent tools that can aid in your personal and spiritual development by allowing you to access the power of cosmic energies. We have a selection of Yantras at Astrology that are intended to support you in achieving your objectives and desires. Our expert astrologers and pandits energise our Yantras, which are based on ancient Vedic texts and scriptures. Our Yantras can assist you in attracting favourable outcomes whether you’re seeking wealth, success, love, or health.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;