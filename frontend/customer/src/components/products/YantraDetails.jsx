import { useEffect, useMemo, useState } from 'react';
import { Minus, Package, Plus, ShoppingBag, Star, Truck } from 'lucide-react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  getYantraProductBySlug,
  getYantraProductImages,
  getYantraProductSlug,
  yantraProducts,
} from '../../data/yantraProducts';
import { useCustomerStore } from '../../store/useCustomerStore';

const getRandomRelatedProducts = (currentName) => {
  const products = yantraProducts.filter((product) => product.name !== currentName);

  for (let index = products.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [products[index], products[randomIndex]] = [products[randomIndex], products[index]];
  }

  return products.slice(0, 5);
};

const productDetails = {
  'Shree Baglamukhi Yantra': {
    brand: 'Astroscience',
    nameHindi: 'श्री बगलामुखी यंत्र',
    nameEnglish: 'Shree Bagla Mukhi Yantra',
    beliefHindi:
      'श्री बगलामुखी यंत्र को पूजा-स्थान या अपने मंदिर में स्थापित करने से कार्यक्षेत्र में सुख-समृद्धि, धन-वैभव और कारोबार में उच्च लाभ प्राप्त करने की मान्यता है।',
    beliefEnglish:
      'Installing the Shree Baglamukhi Yantra in a place of worship or temple is traditionally believed to invite happiness, prosperity, wealth, and business growth.',
    benefitsHindi: [
      'शिक्षा और धन से जुड़े क्षेत्रों में रोगों, व्याधियों और मानसिक तनाव से परेशान लोगों के लिए उपयोगी माना जाता है।',
      'शत्रुओं से जुड़ी परेशानियों और उनके भय से मुक्ति की कामना के लिए लाभकारी।',
      'दुर्घटना का भय होने पर बगलामुखी यंत्र पूजा-स्थान में रखने की मान्यता है।',
      'कोर्ट-कचहरी से जुड़े मामलों में विजय की कामना के लिए स्थापित किया जाता है।',
      'चतुराई से बातचीत करने की कला विकसित करने और उससे लाभ पाने में सहायक माना जाता है।',
      'शत्रुओं पर विजय की कामना से स्थापित किया जाता है।',
      'प्रसिद्धि और धन-लाभ की कामना के लिए इसे मंदिर में रखकर पूजा करें।',
    ],
    benefitsEnglish: [
      'Traditionally used by those seeking support with ailments and mental stress related to education and finances.',
      'Believed to help overcome enemy-related troubles and fear.',
      'Traditionally kept in a place of worship by those concerned about accidents.',
      'Installed with the intention of seeking success in court-related matters.',
      'Associated with developing persuasive communication and gaining from it.',
      'Traditionally installed to seek victory over adversaries.',
      'Keep it in your temple and worship with the intention of seeking fame and financial gains.',
    ],
  },
  'Madhya Shakti Peeth Yantra': {
    brand: 'Astroscience',
    nameHindi: 'मध्य शक्तिपीठ यंत्र',
    descriptionHindi:
      '"मध्य शक्तिपीठ यंत्र" एक ज्योति के रूप में काम करता है। यह ब्रह्मांड में फैली सकारात्मक ऊर्जाओं को एकत्रित करके आपके वातावरण तक लाता है और आपको अपनी अभिलाषाओं की ओर नई दृष्टि तथा समर्पण के साथ प्रेरित करता है। इसकी शुभ शक्तियों का उपयोग करके आप अपने चुने हुए क्षेत्र में सफलता और पहचान हासिल करने के लिए जीवन में नए आयाम अनुभव कर सकते हैं। प्राण-प्रतिष्ठित यंत्र आपके घर में ऊर्जा का स्रोत बनकर इन लाभों में सहायक होता है।',
    beliefHindi:
      'कार्यालय में मध्य शक्तिपीठ यंत्र स्थापित करना कार्यक्षेत्र में सुख-समृद्धि, धन-वैभव और कारोबार में उच्च लाभ की कामना से शुभ माना जाता है।',
    benefitsHindi: [
      'अपने काम या व्यवसाय में खुशी और उन्नति की कामना के लिए।',
      'अपने काम-काज में सुख पाने के लिए।',
      'धन-समृद्धि और रुपये-पैसे की बरकत के लिए।',
      'सुख-समृद्धि और सहकर्मियों से सहयोग पाने के लिए।',
      'कार्यक्षेत्र में शत्रुओं से छुटकारा पाने की कामना के लिए।',
      'व्यापार को आगे बढ़ाने के लिए।',
      'इसे मंगवाकर अपने घर या कार्यस्थल पर स्थापित कर सकते हैं।',
    ],
  },
  'Rog Nivaran Yantra': {
    brand: 'Astroscience',
    nameHindi: 'रोग निवारण यंत्र',
    nameEnglish: 'Rog Nivaran Yantra',
    beliefHindi:
      'परंपरागत मान्यता के अनुसार, रोग निवारण यंत्र को घर में स्थापित करना स्वास्थ्य और मन की शांति के लिए शुभ माना जाता है। यह आध्यात्मिक आस्था का प्रतीक है; इसे बीमारी का इलाज या चिकित्सा का विकल्प न समझें।',
    beliefEnglish:
      'According to traditional belief, placing the Rog Nivaran Yantra at home is considered auspicious for well-being and peace of mind. It is a spiritual symbol, not a medical treatment or substitute for professional care.',
    benefitsHindi: [
      'स्वास्थ्य और मानसिक शांति के लिए आध्यात्मिक साधना में शामिल किया जा सकता है।',
      'शारीरिक समृद्धि और सकारात्मकता की कामना का प्रतीक।',
      'दैनिक काम और कार्यक्षेत्र के तनाव के बीच ध्यान एवं मनन के लिए उपयोग किया जा सकता है।',
      'स्वस्थ दिनचर्या और समय पर कार्य पूरे करने के संकल्प को प्रोत्साहित करने वाला स्मरण-चिह्न।',
      'मानसिक शांति और सकारात्मकता की कामना के लिए पूजा-स्थान में स्थापित कर सकते हैं।',
      'बीमारी के लिए योग्य स्वास्थ्य-विशेषज्ञ से सलाह लें और निर्धारित उपचार जारी रखें; यंत्र चिकित्सा का विकल्प नहीं है।',
    ],
    benefitsEnglish: [
      'May be included in spiritual practice with the intention of supporting well-being and peace of mind.',
      'A symbol of prayers for physical well-being and positivity.',
      'Can be used as a focus for reflection amid everyday work and workplace stress.',
      'A reminder to maintain a healthy routine and complete daily tasks mindfully.',
      'May be placed in a prayer space as part of a spiritual practice for peace of mind.',
      'For illness, consult a qualified healthcare professional and continue prescribed care; the yantra is not a substitute for medical treatment.',
    ],
  },
  'Shakti Peeth Yantra': {
    brand: 'Astroscience',
    nameHindi: 'शक्तिपीठ यंत्र',
    nameEnglish: 'Shaktipeeth Yantra',
    descriptionHindi:
      '"शक्तिपीठ यंत्र" एक ज्योति के रूप में काम करता है। यह ब्रह्मांड में फैली सकारात्मक ऊर्जाओं को एकत्रित करके आपके वातावरण तक लाता है और आपको अपनी अभिलाषाओं की ओर नई दृष्टि तथा समर्पण के साथ प्रेरित करता है। इसकी शुभ शक्तियों का उपयोग करके आप अपने चुने हुए क्षेत्र में सफलता और पहचान हासिल करने के लिए जीवन में नए आयाम अनुभव कर सकते हैं। प्राण-प्रतिष्ठित यंत्र आपके घर में ऊर्जा का स्रोत बनकर इन लाभों में सहायक होता है।',
    beliefHindi:
      'शक्तिपीठ सामान्य रूप से उस पवित्र स्थान या केंद्र को कहते हैं जहाँ शक्ति अर्थात देवी शक्ति का वास माना जाता है। शक्तिपीठ यंत्र जीवन में ग्रहों की कृपा और शुभता तथा समग्र कल्याण की कामना के लिए है।',
    benefitsHindi: [
      'अपने काम-काज में सुख पाने के लिए।',
      'रुपये-पैसे की बरकत की कामना के लिए।',
      'सुख-समृद्धि के लिए सहकर्मियों से सहयोग पाने हेतु।',
      'कार्यक्षेत्र में शत्रुओं से छुटकारा पाने की कामना के लिए।',
      'व्यापार को आगे बढ़ाने के लिए।',
      'इसे मंगवाकर अपने घर या कार्यस्थल पर स्थापित कर सकते हैं।',
    ],
    descriptionEnglish:
      'Shaktipeeth Yantra is described as a source of light that gathers positive energies in the universe and brings them into your surroundings, inspiring you to pursue your aspirations with renewed focus and dedication. Its auspicious energy is traditionally associated with seeking success and recognition in your chosen field. A consecrated yantra is regarded as a source of spiritual energy for the home.',
    beliefEnglish:
      'Shakti Peetha generally refers to a sacred place or centre where Shakti, the Goddess, is believed to reside. Shaktipeeth Yantra is intended as a spiritual symbol for seeking planetary blessings, auspiciousness, and overall well-being.',
    benefitsEnglish: [
      'For a greater sense of fulfilment in your work.',
      'A symbol of prayers for financial prosperity.',
      'For seeking support from colleagues toward happiness and prosperity.',
      'For seeking relief from adversaries in the workplace.',
      'For supporting business growth.',
      'You can order this yantra and place it at home or at your workplace.',
    ],
  },
  'Shree Shodashi Yantra': {
    brand: 'Astroscience',
    nameHindi: 'श्री षोडशी यंत्र',
    nameEnglish: 'Shree Shodashi Yantra',
    beliefHindi:
      'षोडशी यंत्र को देवी ललिता यंत्र भी कहा जाता है। देवी षोडशी को दस महाविद्याओं में से एक माना जाता है।',
    beliefEnglish:
      'Shree Shodashi Yantra is also known as Goddess Lalita Yantra. Devi Shodashi is considered one of the Dasha Mahavidyas.',
    benefitsHindi: [
      'सभी प्रयासों में सफलता की कामना के लिए शक्तिशाली यंत्र माना जाता है।',
      'घर में स्थापित करने से सौभाग्य और समृद्धि की कामना की जाती है।',
      'कठिन परिस्थितियों और खतरों का सामना करने के लिए शुभ माना जाता है।',
      'कार्य में स्थिरता और अनुकूलता की कामना के लिए।',
      'व्यापार और कार्य में सफलता की कामना के लिए।',
      'घर में सुख-शांति बनाए रखने के लिए।',
      'समग्र सुख-शांति की कामना के लिए।',
    ],
    benefitsEnglish: [
      'Traditionally regarded as a yantra for seeking success in all endeavours.',
      'Installed at home with the intention of inviting good fortune and prosperity.',
      'Traditionally used as a spiritual focus when facing difficult circumstances.',
      'Associated with prayers for stability and favourable conditions at work.',
      'Used with the intention of seeking success in business and work.',
      'A symbol of prayers for peace and happiness at home.',
      'Associated with seeking overall happiness and peace.',
    ],
  },
  'Nazar Dosh Yantra': {
    brand: 'Astroscience',
    nameHindi: 'नजरदोष यंत्र',
    nameEnglish: 'Nazar Dosh Yantra',
    beliefHindi:
      'परंपरागत मान्यता के अनुसार, नजरदोष यंत्र को घर या कार्यालय में स्थापित करना बुरी नजर, तनाव और हानि से बचाव की कामना से शुभ माना जाता है।',
    beliefEnglish:
      'According to traditional belief, placing the Nazar Dosh Yantra at home or in the office is considered auspicious by those seeking protection from the evil eye, stress, and harm.',
    benefitsHindi: [
      'घर या कार्यालय में सकारात्मक वातावरण बनाए रखने की कामना के लिए।',
      'मानसिक शांति और तनाव से राहत की कामना के लिए।',
      'कार्यक्षेत्र की बाधाओं से बचाव की कामना के लिए।',
      'अनावश्यक खर्चों से बचने और सोच-समझकर धन उपयोग करने का स्मरण।',
      'चुस्ती-फुर्ती और स्वस्थ दिनचर्या की कामना के लिए।',
      'परिवार में शांति और सद्भाव बनाए रखने के लिए।',
      'नकारात्मकता से बचाव और सकारात्मक ऊर्जा की कामना के लिए।',
    ],
    benefitsEnglish: [
      'Used with the intention of maintaining a positive atmosphere at home or in the office.',
      'A spiritual focus for prayers for peace of mind and relief from stress.',
      'Traditionally associated with seeking fewer obstacles at work.',
      'A reminder to avoid unnecessary expenses and use money mindfully.',
      'Associated with prayers for vitality and a healthy routine.',
      'A symbol of prayers for peace and harmony in the family.',
      'Used with the intention of warding off negativity and welcoming positive energy.',
    ],
  },
  'Vyapar Yantra': {
    brand: 'Astroscience',
    nameHindi: 'व्यापार यंत्र',
    nameEnglish: 'Vyapar Yantra',
    beliefHindi:
      'परंपरागत मान्यता के अनुसार, व्यापार यंत्र को कार्यालय, दुकान या शोरूम में स्थापित करना व्यवसाय में लाभ और व्यापार से जुड़ी समस्याओं से मुक्ति की कामना के लिए शुभ माना जाता है।',
    beliefEnglish:
      'According to traditional belief, placing the Vyapar Yantra in an office, shop, or showroom is considered auspicious by those seeking business growth and relief from business-related challenges.',
    benefitsHindi: [
      'व्यापार में कर्ज से मुक्ति की कामना के लिए।',
      'व्यापार में फँसे हुए धन की वापसी की कामना के लिए।',
      'व्यापार में सफलता और धन-लाभ की कामना के लिए।',
      'व्यवसाय में स्थिरता बनाए रखने की कामना के लिए।',
      'व्यापार से जुड़ी समस्याओं और बाधाओं से मुक्ति की कामना के लिए।',
      'बिक्री में वृद्धि और आर्थिक उन्नति की कामना के लिए।',
      'रुपये-पैसे की उधारी और धन-हानि से राहत की कामना के लिए।',
      'धन और सुख-समृद्धि में वृद्धि की कामना के लिए।',
    ],
    benefitsEnglish: [
      'Used with the intention of seeking relief from business debt.',
      'A symbol of prayers for the recovery of money tied up in business.',
      'Associated with seeking business success and financial gains.',
      'Traditionally used with the intention of supporting stability in business.',
      'A spiritual focus for seeking relief from business-related problems and obstacles.',
      'Associated with prayers for increased sales and financial growth.',
      'Used with the intention of seeking relief from outstanding loans and financial loss.',
      'A symbol of prayers for increased wealth, happiness, and prosperity.',
    ],
  },
  'Ashlesha Nakshatra Yantra': {
    nameEnglish: 'Ashlesha Nakshatra Yantra',
    descriptionEnglish:
      'According to traditional astrological belief, a family with two or more members born under Ashlesha Nakshatra may experience difficult circumstances. The Ashlesha Nakshatra Yantra is presented as a spiritual practice for those seeking support with perceived nakshatra-related or vastu-related concerns at home. These beliefs are not guaranteed outcomes.',
  },
  'Ashwini Nakshatra Yantra': {
    nameHindi: 'अश्विनी नक्षत्र यंत्र',
    nameEnglish: 'Ashwini Nakshatra Yantra',
    descriptionHindi:
      'पारंपरिक ज्योतिषीय मान्यता के अनुसार, यदि एक ही घर में दो या अधिक सदस्यों का जन्म अश्विनी नक्षत्र में हुआ हो तो इसे नक्षत्र जन्म दोष से जोड़ा जाता है। अश्विनी नक्षत्र में जन्मे जातक इस अभिमंत्रित यंत्र को लॉकेट के रूप में धारण कर सकते हैं या घर में स्थापित कर सकते हैं। इसे हवन-पूजन द्वारा प्राण-प्रतिष्ठित करने की परंपरा है; जो लोग स्वयं यह विधि न कर सकें, वे मंदिर के पुजारी या पंडित से सहायता ले सकते हैं। इसे परिवार के स्वास्थ्य और व्यापार की बाधाओं से जुड़ी चिंताओं में आध्यात्मिक साधना के रूप में बताया गया है। ये पारंपरिक मान्यताएँ हैं, सुनिश्चित परिणाम नहीं।',
    descriptionEnglish:
      'According to traditional astrological belief, having two or more family members born under Ashwini Nakshatra may be associated with nakshatra-related concerns. The Ashwini Nakshatra Yantra may be worn as a locket or placed at home as a spiritual practice. The supplied guidance mentions family health concerns and business obstacles; these are matters of belief, not guaranteed outcomes or a substitute for professional advice. The yantra is traditionally consecrated through havan and puja.',
  },
  'Bharani Nakshatra Yantra': {
    nameEnglish: 'Bharani Nakshatra Yantra',
    descriptionEnglish:
      'According to traditional astrological belief, a family with two or more members born under Bharani Nakshatra may experience difficult circumstances. The Bharani Nakshatra Yantra is presented as a spiritual practice for those seeking support with perceived nakshatra-related or vastu-related concerns at home. These beliefs are not guaranteed outcomes.',
  },
  'Chitra Nakshatra Yantra': {
    nameEnglish: 'Chitra Nakshatra Yantra',
    descriptionEnglish:
      'According to traditional astrological belief, a family with two or more members born under Chitra Nakshatra may experience difficult circumstances. The Chitra Nakshatra Yantra is presented as a spiritual practice for those seeking support with perceived nakshatra-related or vastu-related concerns at home. These beliefs are not guaranteed outcomes.',
  },
  'Hasta Nakshatra Yantra': {
    nameEnglish: 'Hasta Nakshatra Yantra',
    descriptionEnglish:
      'According to traditional astrological belief, a family with two or more members born under Hasta Nakshatra may experience difficult circumstances. The Hasta Nakshatra Yantra is presented as a spiritual practice for those seeking support with perceived nakshatra-related or vastu-related concerns at home. These beliefs are not guaranteed outcomes.',
  },
  'Jyeshtha Nakshatra Yantra': {
    nameEnglish: 'Jyeshtha Nakshatra Yantra',
    descriptionEnglish:
      'According to traditional astrological belief, a family with two or more members born under Jyeshtha Nakshatra may experience difficult circumstances. The invoked Jyeshtha Nakshatra Yantra is presented as a spiritual practice for those seeking support with perceived nakshatra-related or vastu-related concerns at home. These beliefs are not guaranteed outcomes.',
  },
};

const YantraDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = useMemo(() => getYantraProductBySlug(slug), [slug]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState(() => getRandomRelatedProducts(product?.name));
  const cart = useCustomerStore((state) => state.cart);
  const setCart = useCustomerStore((state) => state.setCart);
  const gallery = useMemo(
    () => (product ? [...new Set(getYantraProductImages(product))] : []),
    [product],
  );

  useEffect(() => {
    setQuantity(1);
    setActiveImage(0);
    setRelatedProducts(getRandomRelatedProducts(product?.name));
  }, [product]);

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const details = productDetails[product.name];

  const handleAddToCart = () => {
    const existingItem = cart.find((item) => item.name === product.name);
    const cartProduct = { ...product, image: gallery[0], quantity };

    setCart(
      existingItem
        ? cart.map((item) =>
            item.name === product.name
              ? { ...item, quantity: (item.quantity || 1) + quantity }
              : item,
          )
        : [...cart, cartProduct],
    );
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  return (
    <main className="min-h-screen bg-[#f8f6f1] px-4 text-[#231416] sm:px-6 xl:px-10">
      <div className="mx-auto max-w-[1440px]">
        <section className="grid items-start gap-6 py-6 pb-2 sm:gap-8 sm:py-8 sm:pb-3 lg:grid-cols-2 lg:gap-8 lg:py-10 lg:pb-4 xl:gap-10">
          <div className="mx-auto min-w-0 w-full max-w-md lg:max-w-none">
            <div className="flex flex-col gap-3">
              <div className="flex aspect-square items-center justify-center overflow-hidden">
                <img
                  key={gallery[activeImage]}
                  src={gallery[activeImage]}
                  alt={product.name}
                  onError={(event) => {
                    if (!event.currentTarget.src.endsWith('/Yantra/yantra1.jpg')) {
                      event.currentTarget.src = '/Yantra/yantra1.jpg';
                    }
                  }}
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
                      className={`h-14 w-14 shrink-0 overflow-hidden border bg-white transition sm:h-16 sm:w-16 xl:h-[72px] xl:w-[72px] ${
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
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#7A1519]">
              {product.category}
            </p>
            <h1
              className="font-sans font-bold leading-[1.12] tracking-tight"
              style={{ color: '#925C2D', fontSize: 'clamp(1.75rem, 2.4vw, 2.25rem)' }}
            >
              {product.name}
            </h1>

            {details ? (
              <div className="mt-3 space-y-3 text-sm leading-6 text-[#302522]">
                {(details.nameHindi || details.descriptionHindi || details.beliefHindi || details.benefitsHindi) && (
                  <div lang="hi" style={{ fontFamily: "'Nirmala UI', 'Mangal', sans-serif" }}>
                    {details.brand && <p>Brand - {details.brand}</p>}
                    {details.nameHindi && <p>Yantra - {details.nameHindi}</p>}
                    {details.descriptionHindi && <p className="mt-1">{details.descriptionHindi}</p>}
                    {details.beliefHindi && <p className="mt-1">Religious Belief - {details.beliefHindi}</p>}
                    {details.benefitsHindi && (
                      <>
                        <p>Benefits</p>
                        <ul className="list-disc pl-5">
                          {details.benefitsHindi.map((benefit) => <li key={benefit}>{benefit}</li>)}
                        </ul>
                      </>
                    )}
                  </div>
                )}
                {(details.nameEnglish || details.descriptionEnglish || details.beliefEnglish || details.benefitsEnglish) && (
                  <div>
                    {details.brand && <p>Brand - {details.brand}</p>}
                    {details.nameEnglish && <p>Yantra - {details.nameEnglish}</p>}
                    {details.descriptionEnglish && <p className="mt-1">{details.descriptionEnglish}</p>}
                    {details.beliefEnglish && <p className="mt-1">Religious Belief - {details.beliefEnglish}</p>}
                    {details.benefitsEnglish && (
                      <>
                        <p>Benefits</p>
                        <ul className="list-disc pl-5">
                          {details.benefitsEnglish.map((benefit) => <li key={benefit}>{benefit}</li>)}
                        </ul>
                      </>
                    )}
                  </div>
                )}
              </div>
            ) : null}

            <div className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <span
                className="flex items-center gap-0.5 text-[#C9973A]"
                aria-label="Rated 5 out of 5 stars"
              >
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className="h-4 w-4 fill-current"
                    aria-hidden="true"
                  />
                ))}
              </span>
              <span className="text-xs font-semibold">5.0</span>
              <span className="text-xs text-[#7A1519]">11 reviews</span>
            </div>

            <p className="mt-4 text-lg font-bold text-[#231416]">{product.price}</p>

            <div className="mt-4 grid grid-cols-[auto_minmax(0,1fr)] items-stretch gap-2 sm:mt-5 sm:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)] sm:gap-3">
              <div className="flex h-11 items-center border border-[#231416]/20">
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
                className="inline-flex min-h-11 min-w-0 items-center justify-center gap-1.5 bg-[#7A1519] px-2.5 py-2.5 text-xs font-semibold text-[#FBEBC4] transition hover:bg-[#5E0F13] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1519]/40 focus-visible:ring-offset-2 sm:gap-2 sm:px-4 sm:text-sm"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                Add to cart
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="col-span-2 min-h-11 min-w-0 border border-[#7A1519] px-2.5 py-2.5 text-xs font-semibold text-[#7A1519] transition hover:bg-[#F8F1EF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1519]/40 focus-visible:ring-offset-2 sm:col-span-1 sm:px-4 sm:text-sm"
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

      <section aria-labelledby="yantra-related-products-heading" className="bg-[#f8f6f1]">
        <div className="mx-auto max-w-[1440px] border-t border-[#231416]/10 px-4 pt-12 pb-8 sm:px-6 sm:pt-14 sm:pb-10 xl:px-10">
          <h2
            id="yantra-related-products-heading"
            className="mb-6 text-center text-[1.6rem] font-extrabold tracking-[-0.03em] text-[#201b3a] sm:text-[2rem]"
          >
            Related Products
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.name}
                to={`/products/${getYantraProductSlug(relatedProduct.name)}`}
                aria-label={`View ${relatedProduct.name}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#201b3a]/10 bg-white shadow-[0_8px_18px_rgba(32,27,58,0.06)] transition duration-200 hover:-translate-y-1 hover:border-[#4d001e]/30 hover:shadow-[0_16px_34px_rgba(32,27,58,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d001e]/40"
              >
                <div className="aspect-square overflow-hidden bg-[#f7f2ea]">
                  <img
                    src={getYantraProductImages(relatedProduct)[0]}
                    alt={relatedProduct.name}
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
                  <h3 className="line-clamp-2 min-h-10 text-sm font-bold leading-snug text-[#201b3a] sm:text-[0.98rem]">
                    {relatedProduct.name}
                  </h3>
                  <div className="flex items-center gap-1.5" aria-label="Rated 5 out of 5 stars, 11 reviews">
                    <span className="text-xs tracking-tight text-[#c9962b]" aria-hidden="true">★★★★★</span>
                    <span className="text-[11px] text-[#6F6063]">11 reviews</span>
                  </div>
                  <p className="mt-auto border-t border-[#201b3a]/10 pt-2 text-sm font-extrabold text-[#4d001e] sm:text-base">
                    {relatedProduct.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default YantraDetails;
