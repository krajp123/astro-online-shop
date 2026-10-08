import { Pause, Play, ShoppingCart } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useCustomerStore } from '../../store/useCustomerStore';

const mantraProducts = [
  { name: 'Mangal Mantra Upchar Potli', image: '/Mantra/Mangal-mantra-upchar-potli.png', hoverImage: '/Mantra/2.png', audio: '/Mantra/Mantra%20Audio/MANGAL.mp3', price: '₹3,100.00' },
  { name: 'Sarva Sidhi Mantra Upchar Potli', image: '/Mantra/Sarva%20Sidhi%20Mantra%20Upchar%20Potli.png', hoverImage: '/Mantra/3.png', audio: '/Mantra/Mantra%20Audio/Sarv_Siddhi.mp3', price: '₹3,500.00' },
  { name: 'Sukra Mantra Upchar Potli', image: '/Mantra/Sukra-mantra-upchar-potli.png', hoverImage: '/Mantra/6.png', audio: '/Mantra/Mantra%20Audio/SHUKRA.mp3', price: '₹3,100.00' },
  { name: 'Budh Mantra Upchar Potli', image: '/Mantra/budhmantra-upchar-potli.png', hoverImage: '/Mantra/4.png', audio: '/Mantra/Mantra%20Audio/BUDH.mp3', price: '₹3,100.00' },
  { name: 'Chandra Mantra Upchar', image: '/Mantra/chandra-mantra-upchar.png', hoverImage: '/Mantra/6.png', audio: '/Mantra/Mantra%20Audio/CHANDRA.mp3', price: '₹3,100.00' },
  { name: 'Guru Mantra Upchar Potli', image: '/Mantra/guru-mantra-upchar-potli.png', hoverImage: '/Mantra/3.png', audio: '/Mantra/Mantra%20Audio/GURU.mp3', price: '₹3,100.00' },
  { name: 'Ketu Mantra Upchar Potli', image: '/Mantra/ketu-mantra-upchar-potli.png', hoverImage: '/Mantra/7.png', audio: '/Mantra/Mantra%20Audio/KETU.mp3', price: '₹3,100.00' },
  { name: 'Rahu Mantra Upchar', image: '/Mantra/rahu-mantra-upchar.png', hoverImage: '/Mantra/5.png', audio: '/Mantra/Mantra%20Audio/RAHU.mp3', price: '₹3,100.00' },
  { name: 'Shani Mantra Upchar', image: '/Mantra/shani--mantra-upchar.png', hoverImage: '/Mantra/1.png', audio: '/Mantra/Mantra%20Audio/SHANI.mp3', price: '₹3,100.00' },
  { name: 'Surya Mantra Upchar Potli', image: '/Mantra/surya-mantra-upchar-potli.png', hoverImage: '/Mantra/2.png', audio: '/Mantra/Mantra%20Audio/SURYA.mp3', price: '₹3,100.00' },
];

const MantraUpcharPage = () => {
  const reduceMotion = useReducedMotion();
  const audioRef = useRef(null);
  const [playingProduct, setPlayingProduct] = useState(null);
  const cart = useCustomerStore((state) => state.cart);
  const setCart = useCustomerStore((state) => state.setCart);

  const handleAudioToggle = async (product) => {
    if (playingProduct === product.name && audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setPlayingProduct(null);
      return;
    }

    audioRef.current?.pause();
    const audio = new Audio(product.audio);
    audioRef.current = audio;
    audio.addEventListener('ended', () => {
      if (audioRef.current === audio) {
        audioRef.current = null;
        setPlayingProduct(null);
      }
    }, { once: true });

    try {
      await audio.play();
      setPlayingProduct(product.name);
    } catch (error) {
      if (audioRef.current === audio) {
        audioRef.current = null;
        setPlayingProduct(null);
      }
      console.error(`Unable to play the ${product.name} audio:`, error);
    }
  };

  useEffect(() => () => {
    audioRef.current?.pause();
  }, []);

  const handleAddToCart = (product) => {
    const existingItem = cart.find((item) => item.name === product.name);
    setCart(existingItem
      ? cart.map((item) => item.name === product.name ? { ...item, quantity: (item.quantity || 1) + 1 } : item)
      : [...cart, { ...product, quantity: 1 }]);
  };

  return (
    <main className="min-h-[60vh] bg-[#f5f1eb]">
      <section className="relative min-h-[360px] overflow-hidden sm:min-h-[380px]">
        <img
          src="/Mantra-Upchar.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-[72%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0718]/75 via-[#0b0718]/45 to-transparent" aria-hidden="true" />
        <div className="relative z-10 px-5 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-6 lg:px-11 lg:pt-7">
          <div className="flex items-center gap-4">
            <h1 className="text-left text-[1.45rem] font-bold leading-[1.15] tracking-normal text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] sm:text-[1.8rem] lg:text-[2.35rem]">
              Mantra Upchar Potli
            </h1>
            <span className="hidden h-px w-full max-w-[22rem] bg-[#f4d69a] md:block" aria-hidden="true" />
          </div>
          <div className="mt-3 max-w-full space-y-1.5 text-left text-[13px] leading-5 text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.95)] sm:mt-4 sm:space-y-2 sm:text-sm sm:leading-6 lg:max-w-[76%]">
            <p>
              In the birth chart, when a planet is not favorable, its energy can strongly affect our aura. On our website, we offer a special &quot;mantra upchar potli&quot; (healing pouch)
               <p> that absorbs the negative energy of these inauspicious planets. This can bring positive changes to your health and mindset. Instead of following  a 43-day </p> remedy, you can use the mantra upchar potli to resolve your problems in the following way:
            </p>
            <br />
            <p>- Move the potli seven times in a counter clockwise direction around your head, then immerse it in water.</p>
            <p>- If you don&apos;t have access to a river or pond, you can bury it in barren land where no living creature walks.</p>
            {/* <p>
              You can download the <strong>Astroscience App</strong>, go to the Luck Meter, and find out which planets are unfavorable for you. Then, you can purchase the corresponding mantra upchar potli. For more assistance, you can contact our experts at 9999990522
            </p> */}
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
      </section>

      <section className="w-full px-4 pb-8 pt-10 sm:px-6 sm:pt-12 lg:px-8 lg:pb-10 lg:pt-14 2xl:px-12">
        <div className="mb-6">
          <h2 className="text-center text-xl font-bold leading-tight text-[#201b3a] sm:text-2xl">Mantra Upchar</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {mantraProducts.map((product) => {
            const isInCart = cart.some((item) => item.name === product.name);

            return (
              <article
                key={product.name}
                className="group overflow-hidden rounded-2xl border border-[#201b3a]/10 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#4d001e]/30 hover:shadow-[0_18px_40px_rgba(32,27,58,0.12)]"
              >
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
                  {product.audio && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleAudioToggle(product)}
                        aria-label={`${playingProduct === product.name ? 'Pause' : 'Play'} ${product.name} audio`}
                        className="absolute bottom-[17%] right-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-[#4d001e] text-white shadow-md transition hover:bg-[#3a0016] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                      >
                        {playingProduct === product.name
                          ? <Pause className="h-4 w-4" aria-hidden="true" />
                          : <Play className="h-4 w-4 translate-x-px" aria-hidden="true" />}
                      </button>
                    </>
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
                      onClick={() => handleAddToCart(product)}
                      aria-label={`Add ${product.name} to cart`}
                      className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg bg-[#4d001e] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#3a0016] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d001e]/40 focus-visible:ring-offset-2"
                    >
                      <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                      {isInCart ? 'Add another' : 'Add to cart'}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 space-y-4 text-[13px] leading-6 text-[#201b3a] sm:mt-10 sm:space-y-5 sm:text-sm sm:leading-6">
          <p>
            People have used the healing power of mantras for countless years to treat their mental, emotional, and spiritual ills. Many ancient cultures still use the ritual of reciting mantras, and it is still a potent method of holistic healing today.
          </p>
          <p>
            You can use the power of mantras for your own unique healing journey by using the variety of Mantra Upchar products we offer at Astroscience. From Yantras and Rudraksha beads to holy texts and spiritual books, our Mantra Upchar collection has it all.
          </p>
          <p>
            Yantras are geometric designs that have been used for centuries in Hindu and Buddhist traditions. They are thought to be potent symbols that can aid in mental concentration and encourage healing. We have Yantras for wealth, success, health, and other things in our collection. These Yantras are made to support you in achieving your objectives and enhancing your general well-being.
          </p>
          <p>
            Another effective tool for spiritual healing is rudraksha jewellery. These beads are thought to have come from Lord Shiva&apos;s tears and are a representation of his compassion. Rudraksha beads are thought to have a variety of advantages, such as lowering stress levels, enhancing focus, and enhancing general well-being. We have a large selection of Rudraksha beads in our collection, with anywhere between one and twenty-one faces.
          </p>
          <p>
            We provide a variety of spiritual books and holy texts in addition to Yantras and Rudraksha beads. These books are filled with timeless knowledge that can help you develop your spiritual practice and enhance your general wellbeing. Books on meditation, yoga, Ayurveda, and other topics are in our library. We also provide a variety of holy texts, such as the Ramayana, the Upanishads, and the Bhagavad Gita.
          </p>
          <p>
            Everyone has the ability to heal themselves, according to Astroscience. You can access that power and achieve peak health and well-being with the aid of our Mantra Upchar products. Our Mantra Upchar products can assist you in finding the healing you require, whether you are experiencing emotional distress, physical pain, or spiritual disconnection.
          </p>
          <p>
            We provide a wide range of astrological services, such as horoscope analysis, tarot card reading, and Vastu consultation, in addition to our Mantra Upchar products. You can better understand your life path and be guided towards the healing and growth you desire with the assistance of our team of seasoned astrologers and spiritual healers.
          </p>
          <p>
            In conclusion, reciting mantras has been a tradition in numerous ancient cultures, and it is still a potent method of holistic healing. You can use the power of mantras for your own unique healing journey by using the variety of Mantra Upchar products we offer at Astroscience. We have Yantras, Rudraksha beads, spiritual books, and holy texts in our collection, all of which are intended to assist you in achieving your objectives and enhancing your general well-being. We can assist you in moving towards the healing and growth you desire with the aid of our astrological services and our skilled team of healers. Discover the power of mantras for yourself today by perusing our Mantra Upchar collection.
          </p>
        </div>
      </section>
    </main>
  );
};

export default MantraUpcharPage;
