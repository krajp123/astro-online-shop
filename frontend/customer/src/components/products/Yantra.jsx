import { motion, useReducedMotion } from 'framer-motion';
import ProductCollectionGrid from '../common/ProductCollectionGrid';
import { yantraProducts } from '../../data/yantraProducts';

const ProductsPage = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="mx-auto w-full max-w-[2000px] bg-[#f8f6f1] px-0 py-0">
      <div className="product-hero group relative w-full overflow-hidden">
        <img
          src="/Vastu.png"
          alt="Yantra astrology banner"
          className="product-hero-image absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(20,4,2,0.92)_0%,rgba(30,8,2,0.84)_32%,rgba(53,15,6,0.52)_58%,rgba(53,15,6,0.18)_72%,rgba(53,15,6,0)_100%)]" />

        <div className="relative z-10 flex min-h-[220px] items-start justify-start px-4 pb-14 pt-5 sm:min-h-[280px] sm:px-8 sm:pt-7 lg:min-h-[330px] lg:px-12 xl:px-16 xl:pt-8">
          <div className="w-full max-w-[66rem] text-left">
            <div className="mb-6 flex items-center gap-4">
                <h2 className="text-[1.45rem] font-black leading-none tracking-[-0.05em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] sm:text-[1.8rem] lg:text-[2.35rem]">
                Yantra
              </h2>
              <span className="hidden h-px flex-1 max-w-[22rem] bg-[#f4d69a] md:block" />
            </div>

            <p className="max-w-[58rem] text-[0.72rem] leading-[1.6] font-medium text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.95)] sm:text-[0.7rem] lg:text-[0.82rem] xl:text-[0.9rem] xl:leading-[1.8]">
              All the special Yantra available at Astro Vastu Bazar and are beneficial for achieving specific goals such as business growth, health improvement, protection from enemies, and wealth creation. At our Website, you can also find Yantras related to your zodiac sign and Nakshatra, which are made from gold, silver, rose gold, and other pure metals. By using these Yantra, one can experience positive growth in business, enhanced aura and appearance, financial stability, and rectify the defects present in the birth chart (Janam Kundli). Consult with our expert astrologers to understand the proper method of wearing these Yantra and then proceed to wear them accordingly.
            </p>

            <p className="mt-4 text-[0.7rem] leading-5 font-medium text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.95)] sm:text-[0.75rem] lg:text-[0.92rem]">
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
            fill="#f8f6f1"
          />
        </svg>
      </div>

      <ProductCollectionGrid
        name="Yantra"
        products={yantraProducts}
        id="yantra-products"
        pageSize={12}
        productDetailLinks
        showHeading={false}
      />

      <div className="mx-auto max-w-[1440px] bg-[#f8f6f1] px-4 pt-10 pb-10 sm:px-6 sm:pt-12 lg:pb-8 lg:pt-14">
        <div className="mt-10 bg-[#f8f6f1] px-0 pb-6 pt-2 text-[#201b3a]">
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