import { useEffect, useId, useMemo, useState } from 'react';
import { ArrowLeft, ChevronDown, Minus, Package, Plus, ShoppingBag, Star, Truck } from 'lucide-react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  getPyriteProductBySlug,
  getPyriteProductSlug,
  default as pyriteProducts,
} from '../../data/pyriteProducts';
import { useCustomerStore } from '../../store/useCustomerStore';

const rawPyriteBenefits = [
  'Traditionally associated with money, financial opportunities, and growth in the home or workspace.',
  'Believed to bring positive energy and encourage a success-oriented atmosphere.',
  'Some traditions use pyrite as a symbol of protection from negative financial energy and blockages.',
  'Often kept as a reminder of confidence, ambition, and willpower when working toward goals.',
  'Its golden appearance can add a distinctive accent to a work or business space.',
  'Traditionally regarded as a symbol of abundance.',
];

const rawPyriteCareInstructions = [
  'Dust gently with a soft, dry cloth or a soft brush, such as a makeup or paintbrush.',
  'Handle carefully: pyrite clusters can be brittle, and small crystals may flake off if dropped.',
  'Keep in a dry environment. Avoid humid areas such as bathrooms and kitchens.',
];

const maaLaxmiPyritePlacement = [
  'Place the cluster in an office, on a work desk, in a home prayer space, near a cash box, or at a place of business.',
  'Some Vastu traditions suggest placing it in the southeast area of the home.',
];

const maaLaxmiPyriteCareInstructions = [
  ...rawPyriteCareInstructions,
  'Some people choose to include moonlight in their spiritual cleansing practice. This is a matter of personal belief.',
];

const pyritePyramidBenefits = [
  'Traditionally associated with wealth, abundance, good fortune, and success.',
  'Used as a symbol of confidence, willpower, motivation, and determination.',
  'Associated in some beliefs with leadership and clear decision-making.',
  'Some spiritual practices connect pyrite with the Manipura (solar plexus) chakra and personal confidence.',
  'Regarded in some traditions as a symbolic shield from negative energy.',
];

const pyritePyramidLocations = [
  'Near the main entrance, as a traditional symbol of welcoming prosperity.',
  'On an office desk or near a cash box as a reminder of business goals.',
  'In a living room as a decorative focal point.',
  'Some Vastu traditions recommend the north or northeast area of a space.',
];

const pyriteSeleniteComboBenefits = [
  'Traditionally associated with wealth, prosperity, opportunity, and growth.',
  'Used as a symbolic reminder of confidence, motivation, and decisive action.',
  'Selenite is used in some spiritual practices for cleansing objects and spaces.',
  'Some people use a selenite plate as part of a personal crystal-care ritual.',
  'The pair can add a calming decorative accent to a home or workspace.',
];

const pyriteSeleniteComboLocations = [
  'Office or work desk, as a decorative reminder of work and financial goals.',
  'Cash counter or locker, as a traditional symbol of prosperity and stability.',
  'Living room, as a decorative focal point.',
  'Near the main entrance, as a traditional symbol of welcoming prosperity.',
];

const pyriteOwlVastuBenefits = [
  'North-facing placement is traditionally associated with wealth and career opportunities.',
  'Some Vastu practices associate the northeast with clarity and positive energy.',
  'The owl is used as a symbolic reminder to manage resources thoughtfully and protect what you value.',
];

const pyriteOwlBenefits = [
  'A symbolic reminder to plan finances and be mindful of unnecessary expenses.',
  'The owl motif represents alertness and can serve as a prompt to consider opportunities carefully.',
  'Some Vastu traditions associate the owl with balance and stability in a space.',
  'Traditionally used as a symbol of protection from negative influences or the evil eye.',
  'A considered decorative gift for a housewarming or new business.',
];

const pyriteOwlPlacement = [
  'North: traditionally associated with career opportunities and financial growth.',
  'Northeast: some Vastu traditions associate this direction with clarity and positive energy.',
  'An office desk or workspace, as a decorative reminder to stay focused on your goals.',
  'Some traditions suggest having the owl face inward, as a symbol of welcoming prosperity.',
];

const pyriteOwlCare = [
  'Wipe gently with a soft, dry microfiber cloth.',
  'Avoid perfumes, sprays, detergents, and harsh cleaners on the figurine.',
  'Handle carefully and keep dry. Pyrite is brittle; avoid dropping the piece.',
  'Selenite, moonlight, and clear quartz cleansing are personal spiritual practices, not scientifically established ways to recharge energy.',
];

const pyriteOwlSeleniteBenefits = [
  'The owl and pyrite are traditionally associated with prosperity, opportunity, and growth.',
  'The owl is a symbolic reminder to consider financial decisions thoughtfully.',
  'Some Vastu traditions associate the figurine with balance and calm in a space.',
  'Selenite is used in some spiritual practices for cleansing objects.',
  'A decorative gift option for a new home or business.',
];

const pyriteOwlSelenitePlacements = [
  'North: traditionally associated with wealth and career opportunities.',
  'Northeast: some Vastu traditions associate this direction with clarity and positive energy.',
  'Office or work desk, as a decorative reminder to focus on your goals.',
  'Some traditions suggest having the owl face inward, as a symbol of welcoming prosperity.',
  'The included selenite plate may be used as part of a personal spiritual cleansing practice.',
];

const pyriteOwlSeleniteCare = [
  'Wipe the owl gently with a soft, dry cloth. Avoid perfumes, sprays, and chemicals.',
  'Handle the pyrite carefully and keep it dry; avoid dropping it.',
  'Handle the selenite plate gently, as it is delicate.',
  'Some people place the figurine on the plate or leave the plate in moonlight as personal rituals. These practices are not scientifically established ways to recharge energy.',
];

const wealthWisdomBenefits = [
  'Pyrite is traditionally associated with prosperity and financial opportunities.',
  'The tortoise is a symbol of stability and a strong foundation.',
  'The owl symbolizes awareness and thoughtful decision-making.',
  'Some Vastu traditions associate the combo with protection from negative energy or jealousy.',
  'Pyrite is used as a symbolic reminder of motivation, leadership, and confident action.',
];

const wealthWisdomPlacements = [
  'North direction of a home or office, traditionally associated with wealth.',
  'Near a work desk or office table as a reminder of professional goals.',
  'Near a locker, safe, or cash box.',
  'In a study or workspace as a decorative reminder to focus and plan.',
];

const wealthWisdomCare = [
  'Clean gently with a soft, dry cloth.',
  'Avoid water, chemicals, and perfumes.',
  'Keep away from moisture and direct sunlight.',
  'Lighting incense is a personal spiritual practice; keep flames and smoke safely away from the product and follow fire-safety guidance.',
];

const ProductAccordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  return (
    <section className="border-b border-[#231416]/15 pb-3">
      <h2>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((open) => !open)}
          className="flex w-full cursor-pointer items-center justify-between gap-4 text-left text-[#925C2D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1519]/40"
        >
          <span>{title}</span>
          <ChevronDown
            className={`h-4 w-4 shrink-0 transition-transform duration-300 ease-in-out motion-reduce:transition-none ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      </h2>
      <div
        id={panelId}
        aria-hidden={!isOpen}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pt-1">{children}</div>
        </div>
      </div>
    </section>
  );
};

const PyriteDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = useMemo(() => getPyriteProductBySlug(slug), [slug]);
  const [quantity, setQuantity] = useState(1);
  const cart = useCustomerStore((state) => state.cart);
  const setCart = useCustomerStore((state) => state.setCart);
  const relatedProducts = useMemo(
    () => pyriteProducts.filter((item) => item.name !== product?.name).slice(0, 4),
    [product],
  );

  useEffect(() => {
    setQuantity(1);
  }, [product]);

  if (!product) return <Navigate to="/pyrite" replace />;

  const handleAddToCart = () => {
    const isSameProduct = (item) => item.name === product.name && item.image === product.image;
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
            to="/pyrite"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#7A1519] transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1519]/40"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Pyrite
          </Link>
        </div>

        <section className="grid items-start gap-6 py-6 pb-8 sm:gap-8 sm:py-8 lg:grid-cols-2 lg:gap-8 lg:py-10 xl:gap-10">
          <div className="mx-auto min-w-0 w-full max-w-md lg:max-w-none">
            <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-white">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          <div className="min-w-0">
            <h1 className="font-sans text-2xl font-bold leading-[1.12] tracking-tight text-[#925C2D] sm:text-3xl">
              {product.name}
            </h1>
            {product.name === 'Raw Pyrite Stone' ? (
              <div className="mt-4 space-y-5 text-sm leading-6 text-[#302522]">
                <p>
                  Start the New Year with the Siddh Raw Pyrite Stone, blessed in the sacred Maha Lakshmi Yagya. Pyrite is traditionally associated with money, protection, and motivation, making it a meaningful symbol for a prosperous and successful year ahead. Keeping Raw Pyrite in your home or workspace is believed to help clear negative energy, encourage clarity, and support steady progress. These spiritual associations are matters of belief and are not guaranteed outcomes.
                </p>
                <ProductAccordion title={"Benefits"}>
                  <ol className="mt-1 list-inside list-decimal space-y-1">
                    {rawPyriteBenefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
                  </ol>
                  <p className="mt-2 text-[#5b5470]">
                    These are traditional and spiritual associations, not guaranteed financial or other outcomes.
                  </p>
                </ProductAccordion>

                <ProductAccordion title={"Specifications"}>
                  <p className="mt-1">Material: Natural raw pyrite crystal</p>
                  <p>Weight: 7 kg</p>
                </ProductAccordion>

                <ProductAccordion title={"Why keep pyrite stone in your house?"}>
                  <p className="mt-1">
                    In some traditional beliefs, pyrite is associated with Shani (Saturn), prosperity, and new opportunities. People may keep it at home or in a workspace as a symbol of abundance, confidence, and positive change. These associations are matters of belief and do not guarantee financial results or remove financial difficulties.
                  </p>
                </ProductAccordion>

                <ProductAccordion title={"Best day to place"}>
                  <p className="mt-1"></p>
                </ProductAccordion>Establish the Pyrite Stone in its intended spot on a Friday to align with money and abundance energies.

                <ProductAccordion title={"Care Instructions"}>
                  <ul className="mt-1 list-inside list-disc space-y-1">
                    {rawPyriteCareInstructions.map((instruction) => <li key={instruction}>{instruction}</li>)}
                  </ul>
                </ProductAccordion>
              </div>
            ) : product.name === 'Maa Laxmi Siddh Raw Pyrite' ? (
              <div className="mt-4 space-y-5 text-sm leading-6 text-[#302522]">
                <p>
                  Start the New Year with the Siddh Raw Pyrite Stone, blessed in the sacred Maha Lakshmi Yagya. Pyrite is traditionally associated with money, protection, and motivation, making it a meaningful symbol for a prosperous and successful year ahead. Keeping Raw Pyrite in your home or workspace is believed to help clear negative energy, encourage clarity, and support steady progress. These spiritual associations are matters of belief and are not guaranteed outcomes.
                </p>
                <ProductAccordion title={"Benefits"}>
                  <ol className="mt-1 list-inside list-decimal space-y-1">
                    {rawPyriteBenefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
                  </ol>
                  <p className="mt-2 text-[#5b5470]">
                    These are traditional and spiritual associations, not guaranteed financial or other outcomes.
                  </p>
                </ProductAccordion>

                <ProductAccordion title={"How to use"}>
                  <ol className="mt-1 list-inside list-decimal space-y-1">
                    {maaLaxmiPyritePlacement.map((instruction) => <li key={instruction}>{instruction}</li>)}
                    <li>
                      If it is meaningful to you, hold the cluster and reflect on your intentions for your goals and work.
                    </li>
                  </ol>
                  <p className="mt-2 text-[#5b5470]">
                    Intention-setting is a personal spiritual practice and does not guarantee financial growth or success.
                  </p>
                </ProductAccordion>

                <ProductAccordion title={"Care Instructions"}>
                  <ul className="mt-1 list-inside list-disc space-y-1">
                    {maaLaxmiPyriteCareInstructions.map((instruction) => <li key={instruction}>{instruction}</li>)}
                  </ul>
                </ProductAccordion>

                <ProductAccordion title={"Best day to place"}>
                  <p className="mt-1">
                    Friday is traditionally considered an auspicious day to place the cluster in its intended spot.
                  </p>
                </ProductAccordion>
              </div>
            ) : product.name === 'Pyrite Money Magnet Pyramid' ? (
              <div className="mt-4 space-y-5 text-sm leading-6 text-[#302522]">
                <p>
                  Pyrite is traditionally regarded as a symbol of wealth, success, and abundance. Its golden appearance and pyramid form make a distinctive decorative accent. Some spiritual practices view an orgonite pyramid—described as a blend of metal, resin, and sacred geometry—as an energy-amplifying symbol. These are matters of belief, not guaranteed effects.
                </p>

                <ProductAccordion title={"Benefits"}>
                  <ol className="mt-1 list-inside list-decimal space-y-1">
                    {pyritePyramidBenefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
                  </ol>
                  <p className="mt-2 text-[#5b5470]">
                    These traditional and spiritual associations do not guarantee wealth, success, protection, or other outcomes.
                  </p>
                </ProductAccordion>

                <ProductAccordion title={"Best day to keep"}>
                  <p className="mt-1">
                    Some Vedic astrology traditions associate pyrite with Mars (Mangal) and the Sun (Surya), and consider Sunday or Tuesday auspicious for placing it. Sunrise or Surya Hora may also be chosen as part of that practice.
                  </p>
                </ProductAccordion>

                <ProductAccordion title={"Best place to keep"}>
                  <ol className="mt-1 list-inside list-decimal space-y-1">
                    {pyritePyramidLocations.map((location) => <li key={location}>{location}</li>)}
                  </ol>
                  <p className="mt-2">
                    These placement suggestions reflect traditional Vastu beliefs and are a matter of personal preference.
                  </p>
                </ProductAccordion>

                <ProductAccordion title={"Traditional cleansing practices"}>
                  <ul className="mt-1 list-inside list-disc space-y-1">
                    <li>Some people place the pyramid on a selenite plate as a spiritual cleansing practice.</li>
                    <li>Some people leave it in moonlight overnight as part of a personal ritual.</li>
                  </ul>
                  <p className="mt-2 text-[#5b5470]">
                    These practices are based on spiritual beliefs and are not scientifically established recharging methods. Keep the item dry and follow the care guidance for its materials.
                  </p>
                </ProductAccordion>
              </div>
            ) : product.name === 'Pyrite Pyramid with Selenite Plate Combo' ? (
              <div className="mt-4 space-y-5 text-sm leading-6 text-[#302522]">
                <p>
                  This set includes a pyrite pyramid and a free square raw selenite plate. The product listing describes the plate as sourced from Morocco. Pyrite is traditionally associated with prosperity, while selenite is used in some spiritual practices for cleansing. These are matters of belief; claims about attracting money or multiplying energy are not guaranteed or scientifically established.
                </p>

                <ProductAccordion title={"Benefits"}>
                  <ol className="mt-1 list-inside list-decimal space-y-1">
                    {pyriteSeleniteComboBenefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
                  </ol>
                  <p className="mt-2 text-[#5b5470]">
                    These traditional and spiritual associations do not guarantee financial growth, confidence, energy cleansing, or other outcomes.
                  </p>
                </ProductAccordion>

                <ProductAccordion title={"Best day to keep"}>
                  <p className="mt-1">
                    Some traditions consider Sunday or Tuesday auspicious for placing pyrite. Sunrise or early morning may be chosen as part of a personal ritual.
                  </p>
                </ProductAccordion>

                <ProductAccordion title={"Best place to keep"}>
                  <ul className="mt-1 list-inside list-disc space-y-1">
                    {pyriteSeleniteComboLocations.map((location) => <li key={location}>{location}</li>)}
                  </ul>
                  <p className="mt-2 text-[#5b5470]">
                    These placement suggestions reflect traditional spiritual beliefs and are a matter of personal preference.
                  </p>
                </ProductAccordion>

                <ProductAccordion title={"Traditional cleansing practices"}>
                  <ul className="mt-1 list-inside list-disc space-y-1">
                    <li>Some people place the pyramid on the included selenite plate as part of a spiritual cleansing ritual.</li>
                    <li>Some people leave the item in moonlight overnight as part of a personal ritual.</li>
                  </ul>
                  <p className="mt-2 text-[#5b5470]">
                    These practices are based on spiritual beliefs and are not scientifically established recharging methods. Keep the items dry and handle them carefully.
                  </p>
                </ProductAccordion>
              </div>
            ) : product.name === 'Pyrite Owl' ? (
              <div className="mt-4 space-y-5 text-sm leading-6 text-[#302522]">
                <p>
                  The Pyrite Owl combines a pyrite crystal figurine with the owl’s symbolism of alertness and wisdom. In Hindu tradition, the owl is associated with Goddess Lakshmi as her vahana (vehicle), and is sometimes called Uluka Vahini. These cultural and spiritual associations are not guarantees of financial outcomes.
                </p>

                <ProductAccordion title={"Vastu benefits"}>
                  <ul className="mt-1 list-inside list-disc space-y-1">
                    {pyriteOwlVastuBenefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
                  </ul>
                </ProductAccordion>

                <ProductAccordion title={"Benefits"}>
                  <ul className="mt-1 list-inside list-disc space-y-1">
                    {pyriteOwlBenefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
                  </ul>
                  <p className="mt-2 text-[#5b5470]">
                    These are symbolic, traditional, and decorative associations; the figurine does not guarantee protection, savings, business opportunities, or success.
                  </p>
                </ProductAccordion>

                <ProductAccordion title={"How and where to place"}>
                  <ul className="mt-1 list-inside list-disc space-y-1">
                    {pyriteOwlPlacement.map((location) => <li key={location}>{location}</li>)}
                  </ul>
                  <p className="mt-2 text-[#5b5470]">
                    Directional placement advice reflects Vastu traditions and is a matter of personal belief.
                  </p>
                </ProductAccordion>

                <ProductAccordion title={"Best day to place"}>
                  <p className="mt-1">
                    Friday is traditionally associated with Goddess Lakshmi; some people also choose Thursday as a symbolic day for growth. Morning placement is a personal ritual choice, not a requirement.
                  </p>
                </ProductAccordion>

                <ProductAccordion title={"The mythology behind it"}>
                  <p className="mt-1">
                    In a traditional story associated with Lakshmi, the owl’s patience and ability to see in darkness distinguish it from the other birds, and Lakshmi chooses it as her vahana. The owl is consequently known as Uluka Vahini. In Indian culture, the story is often interpreted as a reminder to balance material prosperity with alertness and wisdom.
                  </p>
                </ProductAccordion>

                <ProductAccordion title={"Product specifications"}>
                  <ul className="mt-1 space-y-1">
                    <li>Material: Natural pyrite crystal</li>
                    <li>Height: 8 cm</li>
                    <li>Width: 7 cm</li>
                    <li>Design: Owl figurine carved in pyrite</li>
                    <li>Finish: Resin</li>
                    <li>Placement: Home, office desk, study table, or wealth corner</li>
                    <li>Size: Compact decorative piece</li>
                  </ul>
                </ProductAccordion>

                <ProductAccordion title={"Care Instructions"}>
                  <ul className="mt-1 list-inside list-disc space-y-1">
                    {pyriteOwlCare.map((instruction) => <li key={instruction}>{instruction}</li>)}
                  </ul>
                </ProductAccordion>
              </div>
            ) : product.name === 'Pyrite Owl with Selenite Plate' ? (
              <div className="mt-4 space-y-5 text-sm leading-6 text-[#302522]">
                <p>
                  This Vastu-inspired set includes a pyrite owl and a free square raw selenite plate. The product listing describes the plate as Moroccan-sourced. In Hindu tradition, the owl is associated with Goddess Lakshmi as her vahana and symbolizes alertness and wisdom. These cultural and spiritual associations are matters of belief; claims about attracting wealth or multiplying energy are not guaranteed or scientifically established.
                </p>

                <ProductAccordion title={"Vastu benefits"}>
                  <ul className="mt-1 list-inside list-disc space-y-1">
                    <li>North-facing placement is traditionally associated with wealth and career opportunities.</li>
                    <li>The owl can serve as a reminder to consider financial decisions thoughtfully.</li>
                    <li>Some Vastu traditions associate the figurine with balance and calm in a space.</li>
                    <li>A decorative gift option for a new home or business.</li>
                  </ul>
                  <p className="mt-2 text-[#5b5470]">
                    These are traditional and symbolic associations, not guaranteed financial or protective effects.
                  </p>
                </ProductAccordion>

                <ProductAccordion title={"Benefits"}>
                  <ul className="mt-1 list-inside list-disc space-y-1">
                    {pyriteOwlSeleniteBenefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
                  </ul>
                </ProductAccordion>

                <ProductAccordion title={"How and where to place"}>
                  <ul className="mt-1 list-inside list-disc space-y-1">
                    {pyriteOwlSelenitePlacements.map((placement) => <li key={placement}>{placement}</li>)}
                  </ul>
                  <p className="mt-2 text-[#5b5470]">
                    Directional suggestions reflect Vastu traditions and are a matter of personal preference.
                  </p>
                </ProductAccordion>

                <ProductAccordion title={"Best day to place"}>
                  <p className="mt-1">
                    Friday is traditionally associated with Goddess Lakshmi; some people also choose Thursday as a symbolic day for growth. Morning placement is a personal ritual choice, not a requirement.
                  </p>
                </ProductAccordion>

                <ProductAccordion title={"The mythology behind it"}>
                  <p className="mt-1">
                    In a traditional story associated with Lakshmi, the owl’s patience and ability to see in darkness distinguish it from the other birds, and Lakshmi chooses it as her vahana. The owl is consequently known as Uluka Vahini. The story is often interpreted as a reminder to balance material prosperity with alertness and wisdom.
                  </p>
                </ProductAccordion>

                <ProductAccordion title={"Product specifications"}>
                  <ul className="mt-1 space-y-1">
                    <li>Material: Natural pyrite crystal with resin finish</li>
                    <li>Height: 8 cm</li>
                    <li>Width: 7 cm</li>
                    <li>Design: Owl figurine carved in pyrite</li>
                    <li>Included: Square raw selenite plate</li>
                    <li>Placement: Home, office desk, study table, or wealth corner</li>
                    <li>Size: Compact decorative piece</li>
                  </ul>
                </ProductAccordion>

                <ProductAccordion title={"Care Instructions"}>
                  <ul className="mt-1 list-inside list-disc space-y-1">
                    {pyriteOwlSeleniteCare.map((instruction) => <li key={instruction}>{instruction}</li>)}
                  </ul>
                </ProductAccordion>
              </div>
            ) : product.name === 'Vastu Pyrite Wealth & Wisdom Combo' ? (
              <div className="mt-4 space-y-5 text-sm leading-6 text-[#302522]">
                <p>
                  This Vastu-inspired combo includes a pyrite tortoise and a pyrite owl. Pyrite is traditionally called a “stone of wealth”; the tortoise symbolizes stability, while the owl is associated with Goddess Lakshmi and symbolizes awareness and wisdom. These cultural and spiritual associations are matters of belief, not guarantees of prosperity or financial growth.
                </p>

                <ProductAccordion title={"What’s inside the combo"}>
                  <ul className="mt-1 list-inside list-disc space-y-1">
                    <li>Pyrite tortoise: a traditional symbol of stability and a strong foundation.</li>
                    <li>Pyrite owl: a traditional symbol of wisdom and alertness, associated with Goddess Lakshmi in Hindu tradition.</li>
                  </ul>
                  <p className="mt-2">A decorative gift option for a new home or business.</p>
                </ProductAccordion>

                <details className="group border-b border-[#231416]/15 pb-3">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[#925C2D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1519]/40 [&::-webkit-details-marker]:hidden">
                    <span>Benefits</span>
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <ul className="mt-1 list-inside list-disc space-y-1">
                    {wealthWisdomBenefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
                  </ul>
                  <p className="mt-2 text-[#5b5470]">
                    These are symbolic and traditional associations; the combo does not guarantee financial security, protection, or success.
                  </p>
                </details>

                <details className="group border-b border-[#231416]/15 pb-3">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[#925C2D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1519]/40 [&::-webkit-details-marker]:hidden">
                    <span>How and where to place</span>
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <ul className="mt-1 list-inside list-disc space-y-1">
                    {wealthWisdomPlacements.map((placement) => <li key={placement}>{placement}</li>)}
                  </ul>
                  <p className="mt-2 text-[#5b5470]">
                    Directional placement suggestions reflect Vastu traditions and are a matter of personal preference.
                  </p>
                </details>

                <details className="group border-b border-[#231416]/15 pb-3">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[#925C2D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1519]/40 [&::-webkit-details-marker]:hidden">
                    <span>Best day to place</span>
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <p className="mt-1">
                    Friday is traditionally associated with Goddess Lakshmi, and some people choose Wednesday as a symbolic day for wisdom and clarity. Morning placement with a positive intention is a personal ritual choice, not a requirement.
                  </p>
                </details>

                <details className="group border-b border-[#231416]/15 pb-3">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[#925C2D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1519]/40 [&::-webkit-details-marker]:hidden">
                    <span>The mythology behind it</span>
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <p className="mt-1">
                    In Hindu tradition, Kurma, the tortoise, is an avatar of Lord Vishnu and is used as a symbol of stability. The owl is associated with Goddess Lakshmi as her vahana and symbolizes awareness. Together, these symbols can serve as a reminder to balance a steady foundation with thoughtful decisions.
                  </p>
                </details>

                <details className="group border-b border-[#231416]/15 pb-3">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[#925C2D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1519]/40 [&::-webkit-details-marker]:hidden">
                    <span>Product specifications</span>
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <div className="mt-1 space-y-3">
                    <div>
                      <h3 className="font-medium">Pyrite Owl</h3>
                      <ul className="list-inside list-disc space-y-1">
                        <li>Material: Natural pyrite crystal</li>
                        <li>Height: 8 cm</li>
                        <li>Width: 7 cm</li>
                        <li>Design: Owl figurine carved in pyrite</li>
                        <li>Finish: Resin</li>
                        <li>Placement: Home, office desk, study table, or wealth corner</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium">Pyrite Tortoise</h3>
                      <ul className="list-inside list-disc space-y-1">
                        <li>Material: Natural pyrite crystal</li>
                        <li>Finish: Raw metallic stone finish</li>
                        <li>Length: 2.75 inches</li>
                        <li>Height: 1 inch</li>
                        <li>Color: Natural metallic gold / dark pyrite tone</li>
                        <li>Design: Vastu tortoise symbol</li>
                        <li>Placement: Work desk, cash counter, locker, or north direction</li>
                      </ul>
                    </div>
                  </div>
                </details>

                <details className="group border-b border-[#231416]/15 pb-3">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[#925C2D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1519]/40 [&::-webkit-details-marker]:hidden">
                    <span>Care Instructions</span>
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <ul className="mt-1 list-inside list-disc space-y-1">
                    {wealthWisdomCare.map((instruction) => <li key={instruction}>{instruction}</li>)}
                  </ul>
                </details>
              </div>
            ) : (
              <div className="mt-4 space-y-5 text-sm leading-6 text-[#302522]">
                <p>
                  Explore this distinctive Pyrite piece for your home or personal collection. Please refer to the product listing and images for its specific design, finish, and included items.
                </p>

                <ProductAccordion title="Benefits">
                  <p className="mt-1">
                    Pyrite is traditionally associated with prosperity, confidence, and motivation. These are cultural and spiritual beliefs, not guaranteed financial, health, or other outcomes.
                  </p>
                </ProductAccordion>

                <ProductAccordion title="How and where to use">
                  <p className="mt-1">
                    Wearable pieces can be worn as personal accessories. Decorative pieces can be placed on a stable, dry surface. Follow the product listing for intended use and keep the item away from children and pets if it contains small or delicate parts.
                  </p>
                </ProductAccordion>

                <ProductAccordion title="Best day to wear or place">
                  <p className="mt-1">
                    There is no universally required day to wear or place Pyrite. Some people choose a day that is meaningful to them as part of a personal or spiritual practice.
                  </p>
                </ProductAccordion>

                <ProductAccordion title="Traditional symbolism">
                  <p className="mt-1">
                    Pyrite is often called a “stone of wealth” in modern crystal traditions. Beliefs and stories associated with it vary; its symbolism is a matter of personal and cultural interpretation.
                  </p>
                </ProductAccordion>

                <ProductAccordion title="Product specifications">
                  <p className="mt-1">
                    Check the product listing and images for the exact materials, dimensions, finish, and included items, as these vary by product.
                  </p>
                </ProductAccordion>

                <ProductAccordion title="Care Instructions">
                  <ul className="mt-1 list-inside list-disc space-y-1">
                    <li>Wipe gently with a soft, dry cloth and keep the item dry.</li>
                    <li>Avoid perfumes, chemicals, and abrasive cleaners.</li>
                    <li>Handle carefully and follow any care guidance supplied with the product, especially for delicate or combined pieces.</li>
                    <li>For wearable pieces, remove before bathing or swimming unless the product listing says otherwise.</li>
                  </ul>
                </ProductAccordion>
              </div>
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

      <section aria-labelledby="pyrite-related-heading" className="border-t border-[#231416]/10">
        <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 sm:py-12 xl:px-10">
          <h2 id="pyrite-related-heading" className="mb-6 text-center text-2xl font-bold text-[#201b3a]">
            Explore More Pyrite
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.name}
                to={`/pyrite/${getPyriteProductSlug(relatedProduct.name)}`}
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

export default PyriteDetails;
