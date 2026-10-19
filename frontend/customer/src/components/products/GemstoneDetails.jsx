import { useEffect, useMemo, useState } from 'react';
import { Minus, Package, Plus, ShoppingBag, Star, Truck } from 'lucide-react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useCustomerStore } from '../../store/useCustomerStore';
import gemstoneProducts, { getGemstoneProductSlug } from '../../data/gemstoneProducts';

const gemstoneDetails = {
  'neelam-blue-sapphire': {
    nameHindi: 'नीलम',
    benefitsHindi: 'शनि से जुड़ी चुनौतियों को पार करने और नीलम की आभा से संतोष पाने की पारंपरिक मान्यता है। नीलम को खुशी, समृद्धि और समाधान से जोड़ा जाता है। मान्यता के अनुसार, यह परिवार में सामंजस्य, स्वभाव में संतुलन, नए मित्र बनाने, वित्तीय और कानूनी मामलों में धैर्य रखने तथा मेहनत के फल पर ध्यान केंद्रित करने की प्रेरणा देता है। कुछ पारंपरिक मान्यताएँ इसे परिवार के कल्याण और आत्मनिर्भरता से भी जोड़ती हैं। आँखों, बालों या हड्डियों की किसी समस्या के लिए रत्न चिकित्सा का विकल्प नहीं है; स्वास्थ्य संबंधी सलाह के लिए योग्य चिकित्सक से संपर्क करें।',
    religiousBeliefHindi: 'पारंपरिक ज्योतिषीय मान्यता के अनुसार, शनि रत्न अमृत धारण करने से शनि ग्रह के अशुभ प्रभाव धीरे-धीरे कम हो सकते हैं और शुभ फल प्राप्त हो सकते हैं। यह धार्मिक विश्वास है, निश्चित परिणाम की गारंटी नहीं।',
    wearingMethodHindi: 'इसे शनिवार के दिन शुक्ल पक्ष के शुभ योग में अथवा शनिवार के शुभ नक्षत्र में गले में धारण करने की पारंपरिक सलाह दी जाती है। इसे दाहिने हाथ की मध्यमा उंगली में अंगूठी के रूप में पहनने की भी मान्यता है। धारण करने से पहले योग्य ज्योतिषी से सलाह लें।',
    benefitsEnglish: 'Traditional astrological beliefs associate Neelam with navigating challenges linked to Saturn and seeking contentment, happiness, prosperity, and solutions. It is also associated with family harmony, balance of nature, forming friendships, approaching financial or legal difficulties with patience, and focusing on the rewards of effort. Some traditions also connect it with family well-being and self-reliance. A gemstone is not a treatment for eye, hair, or bone conditions; consult a qualified medical professional for health concerns.',
    religiousBeliefEnglish: 'According to traditional astrological belief, wearing Shani Ratna Amrit may gradually lessen Saturn’s inauspicious effects and invite auspicious results. This is a matter of faith and does not guarantee outcomes.',
    wearingMethodEnglish: 'Traditional guidance suggests wearing it around the neck on a Saturday during an auspicious Shukla Paksha yoga or Saturday nakshatra. It may also be worn as a ring on the middle finger of the right hand. Consult a qualified astrologer before wearing it.',
  },
};

const rattiOptions = ['5.25', '6.25', '7.25', '8.25', '9.25'];
const gemstoneTypes = ['Ring', 'Pendant', 'Raw'];

const GemstoneDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = useMemo(
    () => gemstoneProducts.find((item) => getGemstoneProductSlug(item.name) === slug),
    [slug],
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [kundliDetails, setKundliDetails] = useState({
    name: '',
    gender: 'Female',
    timeOfBirth: '',
    dateOfBirth: '',
    placeOfBirth: '',
    kundliFor: '',
    language: '',
    whatsappNumber: '',
  });
  const [selectedRatti, setSelectedRatti] = useState('5.25');
  const [selectedType, setSelectedType] = useState('Raw');
  const cart = useCustomerStore((state) => state.cart);
  const setCart = useCustomerStore((state) => state.setCart);
  const gallery = useMemo(
    () => (product ? [...new Set([product.image, product.hoverImage].filter(Boolean))] : []),
    [product],
  );

  useEffect(() => {
    setQuantity(1);
    setActiveImage(0);
    setKundliDetails({
      name: '',
      gender: 'Female',
      timeOfBirth: '',
      dateOfBirth: '',
      placeOfBirth: '',
      kundliFor: '',
      language: '',
      whatsappNumber: '',
    });
    setSelectedRatti('5.25');
    setSelectedType('Raw');
  }, [product]);

  if (!product) return <Navigate to="/gemstone" replace />;

  const quality = product.category.replace('Gemstone - ', '');
  const details = gemstoneDetails[slug];
  const relatedProducts = gemstoneProducts
    .filter((item) => item.name !== product.name && item.category === product.category)
    .slice(0, 4);

  const handleAddToCart = () => {
    const variant = `${selectedRatti} Ratti · ${selectedType}`;
    const customizationKey = JSON.stringify({ variant, kundliDetails });
    const existingItem = cart.find((item) => item.name === product.name && item.customizationKey === customizationKey);
    const cartProduct = {
      ...product,
      variant,
      customizationKey,
      kundliDetails: { ...kundliDetails },
      quantity,
    };
    setCart(existingItem
      ? cart.map((item) => item.name === product.name
        && item.customizationKey === customizationKey
        ? { ...item, quantity: (item.quantity || 1) + quantity }
        : item)
      : [...cart, cartProduct]);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  return (
    <main className="min-h-screen bg-[#f8f6f1] px-4 text-[#231416] sm:px-6 xl:px-10">
      <div className="mx-auto max-w-[1440px]">
        <section className="grid items-start gap-6 py-6 pb-8 sm:gap-8 sm:py-8 lg:grid-cols-2 lg:gap-8 lg:py-10 xl:gap-10">
          <div className="mx-auto min-w-0 w-full max-w-md lg:max-w-none">
            <div className="flex flex-col gap-3">
              <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-white">
                <img
                  key={gallery[activeImage]}
                  src={gallery[activeImage]}
                  alt={product.name}
                  className="h-full w-full object-contain"
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
                      className={`h-14 w-14 shrink-0 overflow-hidden rounded border bg-white transition sm:h-16 sm:w-16 xl:h-[72px] xl:w-[72px] ${
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
            <h1 className="font-sans text-2xl font-bold leading-[1.12] tracking-tight text-[#925C2D] sm:text-3xl">
              {product.name}
            </h1>
            {details ? (
              <div className="mt-4 space-y-5 text-sm leading-6 text-[#302522]">
                <section aria-labelledby="neelam-benefits-hi" lang="hi" style={{ fontFamily: "'Nirmala UI', 'Mangal', sans-serif" }}>
                  <h2 id="neelam-benefits-hi" className="font-normal text-[#925C2D]">
                    Benefits of Neelam (Blue Sapphire)
                  </h2>
                  <p className="mt-1">{details.benefitsHindi}</p>
                  <p className="mt-2">Brand: Astroscience</p>
                  <p>रत्न: {details.nameHindi}</p>
                  <p className="mt-2">धार्मिक मान्यता: {details.religiousBeliefHindi}</p>
                  <p className="mt-2">नीलम रत्न धारण करने की विधि: {details.wearingMethodHindi}</p>
                </section>

                <section aria-labelledby="neelam-benefits-en">
                  <h2 id="neelam-benefits-en" className="font-normal text-[#925C2D]">
                    Benefits of Wearing Blue Sapphire
                  </h2>
                  <p className="mt-1">{details.benefitsEnglish}</p>
                  <p className="mt-2">Brand: Astroscience</p>
                  <p>Gem: Blue Sapphire</p>
                  <p className="mt-2">Religious Belief: {details.religiousBeliefEnglish}</p>
                  <p className="mt-2">Method of Wearing Blue Sapphire: {details.wearingMethodEnglish}</p>
                </section>
              </div>
            ) : (
              <p className="mt-3 text-sm leading-6 text-[#302522]">
                Explore this {quality.toLowerCase()} gemstone from our curated gemstone collection.
                Product imagery and quality category are shown for this selection.
              </p>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <span className="flex items-center gap-0.5 text-[#C9973A]" aria-label="Rated 5 out of 5 stars">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" aria-hidden="true" />
                ))}
              </span>
              <span className="text-xs font-semibold">5.0</span>
              <span className="text-xs text-[#7A1519]">11 reviews</span>
            </div>

            <p className="mt-4 text-lg font-bold text-[#231416]">{product.price}</p>

            <div className="mt-4 grid gap-x-4 gap-y-3 sm:grid-cols-2">
              <label className="block text-sm text-[#302522]">
                <span className="mb-1 block">Name</span>
                <input
                  type="text"
                  autoComplete="name"
                  value={kundliDetails.name}
                  onChange={(event) => setKundliDetails((current) => ({
                    ...current,
                    name: event.target.value.replace(/[^\p{L}\p{M}\s.'’-]/gu, ''),
                  }))}
                  className="h-10 w-full rounded border border-[#231416]/20 bg-white px-2.5 text-sm outline-none focus:border-[#7A1519]"
                />
              </label>

              <fieldset className="text-sm text-[#302522]">
                <legend className="mb-2">Select your gender</legend>
                <div className="flex h-10 items-center gap-5">
                  {['Male', 'Female'].map((gender) => (
                    <label key={gender} className="inline-flex items-center gap-2">
                      <input
                        type="radio"
                        name="kundali-gender"
                        value={gender}
                        checked={kundliDetails.gender === gender}
                        onChange={(event) => setKundliDetails((current) => ({ ...current, gender: event.target.value }))}
                        className="accent-[#7A1519]"
                      />
                      {gender}
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="block text-sm text-[#302522]">
                <span className="mb-1 block">Time of Birth</span>
                <input
                  type="time"
                  value={kundliDetails.timeOfBirth}
                  onChange={(event) => setKundliDetails((current) => ({ ...current, timeOfBirth: event.target.value }))}
                  className="h-10 w-full rounded border border-[#231416]/20 bg-white px-2.5 text-sm outline-none focus:border-[#7A1519]"
                />
              </label>

              <label className="block text-sm text-[#302522]">
                <span className="mb-1 block">Date of Birth</span>
                <input
                  type="date"
                  value={kundliDetails.dateOfBirth}
                  onChange={(event) => setKundliDetails((current) => ({ ...current, dateOfBirth: event.target.value }))}
                  className="h-10 w-full rounded border border-[#231416]/20 bg-white px-2.5 text-sm outline-none focus:border-[#7A1519]"
                />
              </label>

              <label className="block text-sm text-[#302522]">
                <span className="mb-1 block">Place of birth</span>
                <input
                  type="text"
                  autoComplete="address-level2"
                  value={kundliDetails.placeOfBirth}
                  onChange={(event) => setKundliDetails((current) => ({
                    ...current,
                    placeOfBirth: event.target.value.replace(/[^\p{L}\p{M}\s.'’-]/gu, ''),
                  }))}
                  className="h-10 w-full rounded border border-[#231416]/20 bg-white px-2.5 text-sm outline-none focus:border-[#7A1519]"
                />
              </label>

              <label className="block text-sm text-[#302522]">
                <span className="mb-1 block">Kundli for</span>
                <select
                  value={kundliDetails.kundliFor}
                  onChange={(event) => setKundliDetails((current) => ({ ...current, kundliFor: event.target.value }))}
                  className="h-10 w-full rounded border border-[#231416]/20 bg-white px-2.5 text-sm outline-none focus:border-[#7A1519]"
                >
                  <option value="">Select</option>
                  {['Self', 'Mother', 'Father', 'Spouse', 'Child', 'Other'].map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>

              <label className="block text-sm text-[#302522]">
                <span className="mb-1 block">Language</span>
                <select
                  value={kundliDetails.language}
                  onChange={(event) => setKundliDetails((current) => ({ ...current, language: event.target.value }))}
                  className="h-10 w-full rounded border border-[#231416]/20 bg-white px-2.5 text-sm outline-none focus:border-[#7A1519]"
                >
                  <option value="">Choose Language</option>
                  <option>English</option>
                  <option>Hindi</option>
                </select>
              </label>

              <label className="block text-sm text-[#302522]">
                <span className="mb-1 block">WhatsApp Number</span>
                <span className="flex h-10 items-center rounded border border-[#231416]/20 bg-white focus-within:border-[#7A1519]">
                  <span className="border-r border-[#231416]/15 px-2.5 text-sm text-[#5b5470]">🇮🇳 +91</span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    value={kundliDetails.whatsappNumber}
                    onChange={(event) => setKundliDetails((current) => ({
                      ...current,
                      whatsappNumber: event.target.value.replace(/\D/g, '').slice(0, 10),
                    }))}
                    className="min-w-0 flex-1 bg-transparent px-2.5 text-sm outline-none"
                    aria-label="WhatsApp number"
                  />
                </span>
              </label>
            </div>

            <fieldset className="mt-4">
              <legend className="mb-2 text-sm text-[#302522]">{quality} Gemstone Cost</legend>
              <div className="flex flex-wrap gap-2">
                {rattiOptions.map((ratti) => (
                  <button
                    key={ratti}
                    type="button"
                    onClick={() => setSelectedRatti(ratti)}
                    aria-pressed={selectedRatti === ratti}
                    className={`rounded border px-3 py-1.5 text-sm transition ${
                      selectedRatti === ratti
                        ? 'border-[#7A1519] bg-[#7A1519] text-white'
                        : 'border-[#231416]/20 text-[#302522] hover:border-[#7A1519]'
                    }`}
                  >
                    Ratti-{ratti}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-4">
              <legend className="mb-2 text-sm text-[#302522]">Types</legend>
              <div className="flex flex-wrap gap-2">
                {gemstoneTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    aria-pressed={selectedType === type}
                    className={`rounded border px-3 py-1.5 text-sm transition ${
                      selectedType === type
                        ? 'border-[#7A1519] bg-[#7A1519] text-white'
                        : 'border-[#231416]/20 text-[#302522] hover:border-[#7A1519]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-5 grid grid-cols-[auto_minmax(0,1fr)] items-stretch gap-2 sm:mt-6 sm:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)] sm:gap-3">
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

      {relatedProducts.length > 0 && (
        <section aria-labelledby="related-gemstones-heading" className="border-t border-[#231416]/10 bg-[#f8f6f1]">
          <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 sm:py-12 xl:px-10">
            <h2 id="related-gemstones-heading" className="mb-6 text-center text-2xl font-bold text-[#201b3a]">
              More {quality} Gemstones
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
              {relatedProducts.map((item) => (
                <Link
                  key={item.name}
                  to={`/gemstone/${getGemstoneProductSlug(item.name)}`}
                  className="group overflow-hidden rounded-xl border border-[#201b3a]/10 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="aspect-square bg-[#f7f2ea]">
                    <img src={item.image} alt={item.name} className="h-full w-full object-contain" loading="lazy" />
                  </div>
                  <div className="p-3">
                    <h3 className="line-clamp-2 text-sm font-semibold text-[#201b3a]">{item.name}</h3>
                    <p className="mt-1 text-sm font-bold text-[#201b3a]">{item.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default GemstoneDetails;
