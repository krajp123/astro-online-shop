import { ShoppingCart } from 'lucide-react';
import { useCustomerStore } from '../../store/useCustomerStore';

const lalKitabProduct = {
  name: 'Lal Kitab Amrit',
  price: 'Rs. 2,550.00',
  image: '/top%20products/3.jpg',
  hoverImage: '/Lal%20Kitab/3.png',
};

const LalKitabPage = () => {
  const cart = useCustomerStore((state) => state.cart);
  const setCart = useCustomerStore((state) => state.setCart);
  const isInCart = cart.some((item) => item.name === lalKitabProduct.name);

  const handleAddToCart = () => {
    const existingItem = cart.find((item) => item.name === lalKitabProduct.name);
    setCart(existingItem
      ? cart.map((item) => item.name === lalKitabProduct.name
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item)
      : [...cart, { ...lalKitabProduct, quantity: 1 }]);
  };

  return (
  <main className="min-h-[60vh] bg-[#f5f1eb] text-[#201b3a]">
    <style>{`
      .sunlight-rays {
        background: repeating-conic-gradient(
          from -8deg at 50% 50%,
          rgba(255, 226, 139, 0.24) 0deg 3deg,
          transparent 3deg 12deg
        );
        -webkit-mask-image: radial-gradient(ellipse at center, #000 0%, rgba(0, 0, 0, 0.7) 42%, transparent 72%);
        mask-image: radial-gradient(ellipse at center, #000 0%, rgba(0, 0, 0, 0.7) 42%, transparent 72%);
        animation: sunlightTurn 36s linear infinite;
      }

      @keyframes sunlightTurn {
        to {
          transform: rotate(360deg);
        }
      }

    `}</style>

    <section className="relative isolate min-h-[400px] overflow-hidden sm:min-h-[380px]">
      <img
        src="/lal-kitab%201.png"
        alt="Lal Kitab spiritual remedies"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#20010d]/85 via-[#4a0019]/55 to-[#3d0714]/40" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,191,94,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(255,123,66,0.16),_transparent_35%)]" aria-hidden="true" />
      <div className="relative z-10 w-full max-w-[calc(100%-145px)] px-5 pb-16 pt-8 text-left text-[13px] leading-6 text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.95)] sm:max-w-[68%] sm:px-8 sm:pb-16 sm:pt-10 sm:text-sm lg:max-w-[min(70%,1120px)] lg:px-11">
        <div className="mb-4 flex items-center gap-4">
          <h1 className="text-[1.45rem] font-bold leading-tight text-white sm:text-[1.8rem] lg:text-[2.35rem]">
            Lal Kitab
          </h1>
          <span className="hidden h-px w-full max-w-[22rem] bg-[#f4d69a] md:block" aria-hidden="true" />
        </div>
        <div className="space-y-3.5">
        <p className="border-l-2 border-[#f4c542] pl-3.5 sm:pl-4">
          <span className="font-semibold text-[#ffe5a8]">Lal Kitab Amrit</span>
          {' '}– You can purchase “Lal Kitab Amrit - Yug Parivartan Kundli” for yourself or for your family members with ages of 2, 5, 7, 10, or 25 years old. This will help you identify remedies to address current and future challenges in life.
        </p>
        <p className="border-l-2 border-[#f4c542]/60 pl-3.5 sm:pl-4">
          <span className="font-semibold text-[#ffe5a8]">Category File</span>
          {' '}– These special files provide detailed information along with remedies for a specific category like marriage, health, family, children, property, etc., available for 2 years in soft copy. For assistance in understanding the remedies in the Lal Kitab Amrit Vashist Jyotish Kundli or Category File, or for any other Kundli-related queries, feel free to contact our experts at{' '}
          <a className="whitespace-nowrap font-semibold text-[#ffe5a8] underline decoration-[#ffe5a8]/60 underline-offset-2" href="tel:XXXXXXXXXX">XXXXXXXXXX</a>.
        </p>
        </div>
      </div>
      <div className="pointer-events-none absolute right-[-12%] top-[-30%] z-10 aspect-square w-[58%] max-w-[520px] sm:right-[-7%] sm:top-[-42%] sm:w-[54%]" aria-hidden="true">
        <div className="absolute inset-[-8%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,230,164,0.42)_0%,rgba(255,190,71,0.2)_34%,rgba(255,148,42,0.08)_55%,transparent_72%)] blur-2xl" />
        <div className="sunlight-rays absolute inset-[-18%] rounded-full opacity-75" />
      </div>
      <div className="absolute bottom-12 right-2 z-30 aspect-square w-[36%] max-w-[320px] bg-gradient-to-br from-[#fff1a3] via-[#f4c542] to-[#d99517] p-[3px] shadow-[0_0_10px_rgba(255,210,74,0.9),0_0_26px_rgba(255,186,35,0.65),0_12px_22px_rgba(0,0,0,0.4)] [clip-path:polygon(30%_0,70%_0,100%_30%,100%_70%,70%_100%,30%_100%,0_70%,0_30%)] sm:right-[4%] sm:w-[min(34vw,320px)]">
        <img
          src="/Lal%20Kitab/4.png"
          alt="Lal Kitab Amrit astrology book"
          className="h-full w-full object-contain [clip-path:polygon(30%_0,70%_0,100%_30%,100%_70%,70%_100%,30%_100%,0_70%,0_30%)]"
        />
      </div>

      <svg
        className="absolute inset-x-0 bottom-0 z-20 h-9 w-full sm:h-11"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 40 C180 86 330 8 520 38 C700 68 850 78 1030 38 C1200 8 1320 20 1440 44 V100 H0Z" fill="#f5f1eb" />
      </svg>
    </section>

    <section className="w-full px-5 pb-8 pt-10 sm:px-8 sm:pt-12 lg:px-10 lg:pb-10 lg:pt-14">
      <article className="group w-full max-w-[320px] overflow-hidden rounded-2xl border border-[#201b3a]/10 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#4d001e]/30 hover:shadow-[0_18px_40px_rgba(32,27,58,0.12)]">
        <div className="relative aspect-square overflow-hidden bg-[#f7f2ea]">
          <img
            src={lalKitabProduct.image}
            alt="Lal Kitab Amrit book"
            loading="lazy"
            className="h-full w-full object-cover object-center transition-opacity duration-700 ease-in-out group-hover:opacity-0"
          />
          <img
            src={lalKitabProduct.hoverImage}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
          />
        </div>

        <div className="flex flex-col p-3 sm:p-4">
          <h3 className="text-sm font-semibold leading-snug text-[#201b3a]">{lalKitabProduct.name}</h3>
          <div className="mt-1.5 flex items-center gap-2" aria-label="Rated 5 out of 5, 11 reviews">
            <span className="text-sm leading-none tracking-tight text-[#c9962b]" aria-hidden="true">★★★★★</span>
            <span className="text-base text-[#201b3a]/75">(11 reviews)</span>
          </div>
          <div className="mt-3 flex items-center justify-between gap-3 border-t border-[#201b3a]/10 pt-3">
            <p className="text-base font-bold text-[#201b3a]">{lalKitabProduct.price}</p>
            <button
              type="button"
              onClick={handleAddToCart}
              aria-label={isInCart ? `Add another ${lalKitabProduct.name} to cart` : `Add ${lalKitabProduct.name} to cart`}
              className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg bg-[#4d001e] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#3a0016] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d001e]/40 focus-visible:ring-offset-2"
            >
              <ShoppingCart className="h-4 w-4" aria-hidden="true" />
              {isInCart ? 'Add another' : 'Add to cart'}
            </button>
          </div>
        </div>
      </article>
    </section>

    <section className="bg-[#f5f1eb] px-5 py-5 sm:px-8 sm:py-6 lg:px-10">
      <article className="w-full space-y-6 text-[14px] leading-[1.5] tracking-[0.01em] text-[#32111a]">
        <p>
          Have you ever questioned what lies ahead for you? Have you tried reading horoscopes and receiving astrological predictions but felt like something was missing? If so, you may want to think about ordering a customised Lal Kitab Amrit horoscope.
        </p>
        <p>
          Lal Kitab Amrit is a special type of astrology that combines palmistry and Vedic astrology. It is based on the tenets of the Lal Kitab, a collection of five Urdu-language books on astrology and palmistry. Your personal predictions and treatments from the Lal Kitab Amrit horoscope are based on your birth chart and palm lines.
        </p>
        <p>
          The accuracy of the Lal Kitab Amrit horoscope is one of its advantages. Lal Kitab Amrit, in contrast to other types of astrology, considers both your birth chart and the lines on your palms. This gives a more thorough analysis of your life, highlighting your opportunities, weaknesses, and strengths.
        </p>
        <p>
          The Lal Kitab Amrit horoscope also provides solutions for any issues or challenges you might face. These treatments, which are based on the principles of Vedic astrology, may involve chanting mantras, wearing particular jewellery, or engaging in particular rituals. You can lessen any negative effects in your life and enhance your general well-being by implementing these remedies.
        </p>
        <p>
          It is simple to obtain a customised Lal Kitab Amrit horoscope. You only need to submit your palm prints and birth information. Your customised horoscope will then be delivered to you either physically or via email.
        </p>
        <p>
          To meet your needs, AstroScience provides a selection of Lal Kitab Amrit horoscopes. Our Lal Kitab Amrit Personalised Horoscope is a comprehensive document that analyses your birth chart, and palm lines, and makes future projections. Additionally, we provide a Lal Kitab Amrit Remedial Horoscope that offers solutions to any issues that might crop up in your life.
        </p>
        <p>
          We also provide Lal Kitab Amrit courses and workshops in addition to our customised horoscopes. The goal of these courses is to teach you more about Lal Kitab Amrit astrology and how to use it in your daily life. You can discover information on a range of subjects, including gemstone therapy, Vedic astrology, and palmistry.
        </p>
        <p>
          In conclusion, a customised Lal Kitab Amrit horoscope is a useful resource for anyone interested in astrology and personal development. It offers solutions for any difficulties you may run into as well as a distinct and accurate analysis of your life. AstroScience is dedicated to offering the best Lal Kitab Amrit horoscopes and programmes to help you live a better life and accomplish your objectives.
        </p>
      </article>
    </section>

  </main>
  );
};

export default LalKitabPage;
