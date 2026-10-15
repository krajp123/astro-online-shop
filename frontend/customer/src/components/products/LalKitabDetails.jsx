import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ChevronDown, MapPin, MessageCircle, ShoppingBag, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCustomerStore } from '../../store/useCustomerStore';
import gemstoneProducts from '../../data/gemstoneProducts';
import karungaliProducts from '../../data/karungaliProducts';
import pyriteProducts from '../../data/pyriteProducts';
import tigerEyeProducts from '../../data/tigerEyeProducts';
import { getProductImage, yantraProducts } from '../../data/yantraProducts';

/* ------------------------------------------------------------------ */
/* Design tokens                                                       */
/*   oxblood #4B0F14 · deep #3D0A0F · lacquer #7A1519 (primary action) */
/*   gold #C9973A · gilt #F6E7C4 · ink #231416 · muted #6F6063         */
/*   paper #FBF9F7 · blush #F5ECE9                                     */
/* ------------------------------------------------------------------ */

const productName = 'Lal Kitab Amrit Vashisht Jyotish';
const durationPrices = {
  1: 'Rs. 2,550.00',
  2: 'Rs. 5,100.00',
  5: 'Rs. 12,750.00',
  7: 'Rs. 17,850.00',
  10: 'Rs. 25,500.00',
  15: 'Rs. 38,250.00',
  20: 'Rs. 51,000.00',
  25: 'Rs. 63,750.00',
};
const gallery = [
  { src: '/Lal%20Kitab/5.jpg', alt: 'Lal Kitab Amrit book with a red rose' },
  { src: '/Lal%20Kitab/1.png', alt: 'Two Lal Kitab Amrit books' },
  { src: '/Lal%20Kitab/2.png', alt: 'Inside pages of the personalized kundli book' },
  { src: '/Lal%20Kitab/3.png', alt: 'Lal Kitab book placed over a kundli chart' },
  { src: '/Lal%20Kitab/4.png', alt: 'Lal Kitab Amrit book displayed upright' },
];

const durations = ['1 year', '2 years', '5 years', '7 years', '10 years', '15 years', '20 years', '25 years'];
const languages = ['Hindi', 'Marathi', 'Punjabi', 'Tamil', 'English'];
const genders = ['Male', 'Female'];
const kundliForOptions = [
  'Your Self',
  'Father In Law',
  'Younger Brother/Sister',
  'Mother',
  'Father/Son',
  'Mama/Bhanja/Bua/Brother In law(Saala)',
  'Spouse',
  'Your Self',
  'Daada Ji',
  'Chacha',
  'Elder Brother/Sister/Tau',
  'Ph. Relation',
];
const trackedFields = ['name', 'gender', 'dateOfBirth', 'timeOfBirth', 'placeOfBirth', 'whatsappNumber'];
const totalReviews = 37;
const relatedProducts = [
  ...(yantraProducts[0]
    ? [{ ...yantraProducts[0], image: getProductImage(yantraProducts[0]), href: '/products', categoryLabel: 'Yantra' }]
    : []),
  { ...gemstoneProducts[0], href: '/gemstone', categoryLabel: 'Gemstone' },
  { ...karungaliProducts[0], href: '/karungali', categoryLabel: 'Karungali Mala' },
  { ...tigerEyeProducts[0], href: '/tiger-eye', categoryLabel: 'Tiger Eye' },
  { ...pyriteProducts[0], href: '/pyrite', categoryLabel: 'Pyrite' },
];
const faqs = [
  {
    question: 'What is Lal Kitab Kundli?',
    answer: 'Lal Kitab Kundli is a special type of horoscope based on the principles of Lal Kitab, a unique branch of Vedic astrology. It analyses the planetary positions in your birth chart and offers simple, practical remedies to balance negative effects. Many people prefer Lal Kitab prediction by date of birth because it gives quick, accurate insights about life, career, marriage, health, and finances. Unlike traditional astrology, Lal Kitab Kundli focuses on easy upaye that can be done without complex rituals.',
  },
  {
    question: 'What details are required to prepare my Lal Kitab file?',
    answer: 'Your name, date of birth, time of birth, and place of birth are required for precise analysis.',
  },
  {
    question: 'How accurate are the predictions in the Lal Kitab Report?',
    answer: 'The analysis is based on authentic Lal Kitab and Vashist Jyotish calculations, making it highly precise and personalised to your birth chart.',
  },
  {
    question: 'Can the Lal Kitab Kundli remedies actually help in real life?',
    answer: 'Yes. The Lal Kitab remedies are practical, easy to follow, and designed to reduce negative planetary effects while enhancing positive results.',
  },
  {
    question: 'What is the price of Lal Kitab Amrit Vashist Jyotish?',
    answer: 'The minimum Lal Kitab price starts at ₹2,550 for the 1-year file. You can explore all pricing options, from 1 year up to 25 years, on our website for full clarity.',
  },
  {
    question: 'How long does it take to receive the Lal Kitab file?',
    answer: 'Once your birth details are confirmed, your personalised file is prepared and delivered within 5 to 7 working days, depending on the duration and depth you choose.',
  },
];

const reportDescriptions = {
  en: {
    intro: [
      "Lal Kitab Kundli Amrit Vashist Jyotish is a personalised, file-based astrological report that reveals the deeper design of your destiny. Rooted in the timeless wisdom of Lal Kitab and refined with precision-based Vashist calculations, it transforms your birth chart into clear, practical guidance for the years ahead.",
      "Prepared under the direct guidance of Gurudev G.D. Vashist an astrologer with 35+ years of experience in Lal Kitab astrology, this report is built entirely around your own birth details, not a generic template. You'll get simple, effective remedies to navigate life's challenges with clarity and confidence.",
    ],
    sections: [
      {
        title: 'What You Get Inside Your Lal Kitab Kundli Report',
        bullets: [
          'A detailed reading of your planetary positions using authentic Lal Kitab and Vashist Jyotish methods',
          'Year-by-year and month-by-month predictions, so you know what to expect and when to act',
          'Simple remedies for career, marriage, health, finances and family matters',
          'Guidance on your Ishtdev (guiding deity) and the planet governing your destiny',
          'Personalised gemstone recommendations based on your own chart, not a generic Sun-sign list',
          'A clear breakdown of your current Mahadasha and Antardasha (running planetary periods)',
          'Insights into your kundli dosha like Pitra dosha, Mangalik dosha, gandmool dosha and Kaal sarp dosha.',
          'Career and profession guidance based on where your planets are strongest',
          'Predictions covering marriage, children, education and financial growth etc.',
          'Available in 5 languages — Hindi, English, Punjabi, Tamil and Marathi',
        ],
      },
      {
        title: 'Why This Lal Kitab Kundli Is Different',
        paragraphs: [
          "Most horoscope reports stop at telling you what is happening in your chart. This report goes a step further and tells you what to actually do about it — remedies that are easy enough to follow in daily life, without expensive rituals or rare items. Because it is prepared under Gurudev G.D. Vashist's own guidance rather than generated from a generic template, the predictions stay grounded in decades of real consultation experience rather than one-size-fits-all astrology.",
        ],
      },
      {
        title: 'Choose the Right Duration for You',
        paragraphs: [
          "Lal Kitab Kundli reports are available for 1, 2, 5, 7, 10, 15, 20 and 25 years, so you can pick a duration that matches how far ahead you want guidance — whether that's planning the next year or mapping out the next decade. Once your birth details are confirmed, your personalised hard copy is prepared and delivered to your doorstep within 7–10 days, with shipping across India.",
        ],
      },
      {
        title: 'Who, Should Get This Lal Kitab Kundli Report',
        intro: 'Ideal for anyone seeking clarity and practical astrological guidance to navigate life with confidence:',
        bullets: [
          { label: 'Love & Relationships -', text: 'Clarity and stronger emotional bonds' },
          { label: 'Marriage Guidance -', text: 'Compatibility, timing, and remedies for delays' },
          { label: 'Child Planning & Fertility -', text: 'Guidance on conception and family planning' },
          { label: 'Family Harmony -', text: 'More peace and positivity at home' },
          { label: 'Peace of Mind -', text: 'Remedies for stress and emotional imbalance' },
          { label: 'Career Growth -', text: 'Right path, opportunities, and promotion timing' },
          { label: 'Business Success -', text: 'Growth, stability, and overcoming obstacles' },
          { label: 'Financial Stability -', text: 'Root causes and remedies for money issues' },
          { label: 'Home & Property -', text: 'Guidance on disputes and harmony at home' },
          { label: 'Family & Legal Issues -', text: 'Direction for resolving conflicts' },
          { label: 'Life Obstacles -', text: 'Hidden influences and practical remedies' },
          { label: 'Overall Guidance -', text: 'Health, relationships, career & finances' },
          { label: 'Foreign Travel & Settlement -', text: 'Guidance on overseas travel, study, work, PR, and settlement opportunities' },
        ],
      },
    ],
  },
  hi: {
    intro: [
      "लाल किताब अमृत वशिष्ठ ज्योतिष जन्मकुंडली' का निर्माण आदरणीय गुरुदेव जी.डी. वशिष्ठ जी के मार्गदर्शन में ही किया जाता है। यह किसी भी व्यक्ति के वर्तमान, भूत और भविष्य का सम्पूर्ण लेख जोखा है। इसमें आपको अपनी ग्रह स्थितियों के आधार पर सटीक वर्ष-वार भविष्यवाणियां, अत्यंत सरल उपाय और उपयुक्त रत्नों की सलाह प्राप्त होगी।",
      "लाल किताब अमृत वशिष्ठ ज्योतिष' मात्र एक रिपोर्ट नहीं है, बल्कि यह एक व्यक्तिगत (पर्सनलाइज़्ड), फाइल-आधारित ज्योतिषीय रिपोर्ट है जो आपके जीवन की पूरी रूपरेखा को उजागर करती है। लाल किताब के शाश्वत ज्ञान पर आधारित और वशिष्ठ ज्योतिष की सटीक गणनाओं से परिष्कृत यह रिपोर्ट, आपकी जन्म कुंडली को आने वाले वर्षों के लिए स्पष्ट और व्यावहारिक दिशा-निर्देश में सक्षम है।",
      'लाल किताब ज्योतिष में 35 से अधिक वर्षों का गहन अनुभव रखने वाले गुरुदेव जी.डी. वशिष्ठ जी के प्रत्यक्ष मार्गदर्शन में तैयार की गई यह रिपोर्ट किसी सामान्य सांचे (टेम्पलेट) पर आधारित नहीं है। इसके बजाय, इसे पूरी तरह से आपके अपने जन्म विवरणों के आधार पर तैयार किया जाता है। जीवन की चुनौतियों का स्पष्टता और आत्मविश्वास के साथ सामना करने के लिए, आपको इसमें अत्यंत सरल और प्रभावी उपाय मिलेंगे।',
    ],
    sections: [
      {
        title: 'आपकी लाल किताब कुंडली रिपोर्ट में आपको क्या मिलेगा:',
        bullets: [
          'प्रामाणिक लाल किताब और वशिष्ठ ज्योतिष विधियों का उपयोग करके आपकी ग्रह स्थितियों का अत्यंत विस्तृत विश्लेषण किया जाता है।',
          'इसमें वर्ष-दर-वर्ष और महीने-दर-महीने की सटीक भविष्यवाणियां दी जाती हैं, ताकि आप जान सकें कि आगे क्या होने वाला है और आपको कब सही कदम उठाना चाहिए।',
          'आपके करियर, विवाह, स्वास्थ्य, वित्त और पारिवारिक मामलों को सुखमय बनाने के लिए सरल उपाय बताए जाते हैं।',
          'आपको अपने इष्टदेव और आपके भाग्य को नियंत्रित करने वाले ग्रह (किस्मत के ग्रह) के बारे में पूर्ण मार्गदर्शन मिलता है।',
          'केवल सूर्य राशि को आधार मानने के बजाय, आपकी अपनी व्यक्तिगत कुंडली के गहन अध्ययन पर आधारित रत्नों की सटीक सिफारिशें दी जाती हैं।',
          'आपकी वर्तमान महादशा और अंतर्दशा (चल रही ग्रह दशाओं) का स्पष्ट एवं विस्तृत विवरण प्रस्तुत किया जाता है।',
          'आपकी कुंडली के प्रमुख दोषों जैसे पितृ दोष, मांगलिक दोष, गंडमूल दोष और काल सर्प दोष के बारे में विस्तृत जानकारी और उनके निवारण बताए जाते हैं।',
          'आपके ग्रह जहां सबसे मजबूत हैं, उनके आधार पर आपके करियर और पेशे के लिए उचित मार्गदर्शन दिया जाता है।',
          'इसमें विवाह, संतान, शिक्षा और वित्तीय वृद्धि आदि महत्वपूर्ण पहलुओं को कवर करने वाली विस्तृत भविष्यवाणियां शामिल होती हैं।',
          'यह विशेष रिपोर्ट 5 भाषाओं में उपलब्ध है: हिंदी, अंग्रेजी, पंजाबी, तमिल और मराठी।',
        ],
      },
      {
        title: 'यह लाल किताब कुंडली अलग क्यों है?',
        paragraphs: [
          "अधिकांश राशिफल रिपोर्ट अक्सर केवल यह बताने तक सीमित रहती हैं कि आपकी कुंडली में क्या हो रहा है। परंतु, यह विशेष रिपोर्ट एक कदम आगे बढ़कर यह बताती है कि आपको वास्तव में क्या करना चाहिए। इसमें ऐसे उपाय सुझाए जाते हैं जिन्हें बिना किसी महंगे अनुष्ठान या दुर्लभ सामग्री के, दैनिक जीवन में आसानी से अपनाया जा सकता है। चूंकि यह किसी सामान्य टेम्पलेट से उत्पन्न होने के बजाय सीधे गुरुदेव जी.डी. वशिष्ठ जी के मार्गदर्शन में तैयार की जाती है, इसलिए इसकी भविष्यवाणियां 'एक ही नियम सभी पर लागू' वाले दृष्टिकोण के बजाय दशकों के वास्तविक परामर्श अनुभव पर आधारित होती हैं।",
        ],
      },
      {
        title: 'अपने लिए सही अवधि चुनें:',
        paragraphs: [
          'यह लाल किताब कुंडली रिपोर्ट 1, 2, 5, 7, 10, 15, 20 और 25 वर्षों की अवधि के लिए उपलब्ध है। आप अपनी आवश्यकता के अनुसार मार्गदर्शन की अवधि चुन सकते हैं—चाहे वह अगले वर्ष की योजना बनाना हो या आगामी पूरे दशक की रूपरेखा तैयार करना हो। आपके जन्म विवरण की पुष्टि होने के बाद, आपकी व्यक्तिगत हार्ड कॉपी तैयार की जाती है और पूरे भारत में मुफ़्त शिपिंग के साथ 7 से 10 दिनों के भीतर आपके घर तक पहुंचा दी जाती है।',
        ],
      },
      {
        title: 'यह लाल किताब कुंडली रिपोर्ट किसे लेनी चाहिए?',
        intro: 'जीवन को आत्मविश्वास के साथ जीने के लिए स्पष्टता और व्यावहारिक ज्योतिषीय मार्गदर्शन चाहने वाले किसी भी व्यक्ति के लिए यह रिपोर्ट आदर्श है:',
        bullets: [
          { label: 'प्रेम और रिश्ते:', text: 'रिश्ते में स्पष्टता लाने और मजबूत भावनात्मक जुड़ाव स्थापित करने के लिए।' },
          { label: 'विवाह मार्गदर्शन:', text: 'अनुकूलता की जांच, विवाह का सही समय जानने और विवाह में हो रही देरी के अचूक उपाय के लिए।' },
          { label: 'संतान योजना और प्रजनन:', text: 'गर्भधारण, परिवार नियोजन और सुखी पारिवारिक जीवन पर उचित मार्गदर्शन के लिए।' },
          { label: 'पारिवारिक सद्भाव:', text: 'घर में अधिक शांति और सकारात्मकता का वातावरण बनाने के लिए।' },
          { label: 'मानसिक शांति:', text: 'तनाव, चिंता और भावनात्मक असंतुलन को दूर करने के उपायों के लिए।' },
          { label: 'करियर में वृद्धि:', text: 'सही करियर मार्ग चुनने, नए अवसर प्राप्त करने और पदोन्नति का समय जानने के लिए।' },
          { label: 'व्यापार में सफलता:', text: 'व्यापारिक विकास, स्थिरता सुनिश्चित करने और आने वाली बाधाओं को पार करने के लिए।' },
          { label: 'वित्तीय स्थिरता:', text: 'धन संबंधी समस्याओं के मूल कारण को समझने और उनके सटीक उपाय खोजने के लिए।' },
          { label: 'घर और संपत्ति:', text: 'संपत्ति विवादों से बचाव और घर में सद्भाव बनाए रखने के मार्गदर्शन के लिए।' },
          { label: 'पारिवारिक और कानूनी मामले:', text: 'आपसी विवादों और कानूनी उलझनों को सुलझाने के लिए सही दिशा प्राप्त करने के लिए।' },
          { label: 'जीवन की बाधाएं:', text: 'छिपे हुए नकारात्मक प्रभावों को समझने और उनसे बचने के लिए व्यावहारिक उपाय अपनाने के लिए।' },
          { label: 'समग्र मार्गदर्शन:', text: 'स्वास्थ्य, रिश्ते, करियर और वित्त को संतुलित कर एक उत्तम जीवन जीने के लिए।' },
          { label: 'विदेश यात्रा और विदेश योग:', text: 'विदेश यात्रा, उच्च शिक्षा, नौकरी, व्यवसाय या स्थायी निवास से जुड़े अवसरों, संभावनाओं और आने वाली बाधाओं पर उचित मार्गदर्शन प्राप्त करने के लिए।' },
        ],
      },
    ],
  },
};

/* North-Indian style kundli: 12 houses laid out inside a square. */
const chartPoints = {
  A: [0, 0], B: [100, 0], C: [100, 100], D: [0, 100],
  T: [50, 0], R: [100, 50], M: [50, 100], L: [0, 50], O: [50, 50],
  p1: [25, 25], p2: [75, 25], p3: [75, 75], p4: [25, 75],
};
const chartHouses = [
  ['T', 'p1', 'O', 'p2'], ['A', 'T', 'p1'], ['A', 'p1', 'L'], ['L', 'p1', 'O', 'p4'],
  ['L', 'p4', 'D'], ['D', 'p4', 'M'], ['M', 'p4', 'O', 'p3'], ['M', 'p3', 'C'],
  ['C', 'p3', 'R'], ['R', 'p3', 'O', 'p2'], ['R', 'p2', 'B'], ['B', 'p2', 'T'],
].map((keys) => keys.map((key) => chartPoints[key].join(',')).join(' '));

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Hind:wght@400;500;600;700&family=Rozha+One&display=swap');
.lk-page { font-family: 'Hind', 'Noto Sans Devanagari', system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
.lk-display { font-family: 'Rozha One', 'Tiro Devanagari Hindi', Georgia, serif; font-weight: 400; }
.lk-draw { stroke-dasharray: 1; animation: lk-draw 1.6s cubic-bezier(.3, .6, .2, 1) both; }
.lk-main-image { animation: lk-main-image 0.55s ease-out; }
@keyframes lk-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes lk-main-image { 0% { opacity: 0.2; transform: scale(1.06); } 100% { opacity: 1; transform: scale(1); } }
@media (prefers-reduced-motion: reduce) { .lk-draw { animation: none; } .lk-main-image { animation: none; } }
.lk-thumbs { scrollbar-width: none; }
.lk-thumbs::-webkit-scrollbar { display: none; }
`;

const focusLight = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1519] focus-visible:ring-offset-2';
const focusDark = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9973A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#3D0A0F]';
const labelClass = 'text-xs font-semibold text-[#231416]';
const inputBase = 'h-11 w-full rounded-none border border-[#231416]/20 bg-white text-sm text-[#231416] outline-none transition placeholder:text-[#9a8d8f] focus:border-[#7A1519] focus:ring-[3px] focus:ring-[#7A1519]/15';
const containerClass = 'mx-auto w-full max-w-[1400px] px-2 sm:px-4 lg:px-5';
const h2Class = 'lk-display text-2xl leading-tight text-[#4B0F14] sm:text-[1.75rem]';

const Stars = ({ className = 'h-3.5 w-3.5' }) => (
  <span className="flex gap-0.5 text-[#B7791F]" aria-hidden="true">
    {[0, 1, 2, 3, 4].map((i) => <Star key={i} className={`${className} fill-current`} />)}
  </span>
);

const KundliChart = ({ filled }) => (
  <svg viewBox="-2 -2 104 104" className="h-full w-full" role="img" aria-label={`Kundli chart with ${filled} of 12 houses filled`}>
    {chartHouses.map((points, index) => (
      <polygon
        key={points}
        points={points}
        className={`transition-colors duration-500 motion-reduce:transition-none ${index < filled ? 'fill-[#7A1519]' : 'fill-[#F3E6E2]'}`}
      />
    ))}
    <path
      d="M0 0H100V100H0Z M0 0L100 100 M100 0L0 100 M50 0L100 50L50 100L0 50Z"
      pathLength="1"
      className="lk-draw fill-none stroke-[#C9973A]"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

const Field = ({ label, icon: Icon, children }) => (
  <label className="block">
    <span className={labelClass}>{label}</span>
    <span className="relative mt-1.5 block">
      {Icon && <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a7b7d]" aria-hidden="true" />}
      {children}
    </span>
  </label>
);

const Segmented = ({ legend, name, options, defaultValue, onSelect }) => (
  <fieldset>
    <legend className={labelClass}>{legend}</legend>
    <div className="mt-1.5 grid auto-cols-fr grid-flow-col gap-0.5 rounded-lg bg-[#F3E6E2] p-0.5">
      {options.map((option) => (
        <label key={option} className="relative min-w-0">
          <input
            type="radio"
            name={name}
            value={option}
            defaultChecked={option === defaultValue}
            required
            onChange={() => onSelect?.(option)}
            className="peer sr-only"
          />
          <span className="flex h-9 cursor-pointer items-center justify-center rounded-md px-1.5 text-center text-xs font-semibold leading-tight text-[#6F6063] transition peer-checked:bg-white peer-checked:text-[#7A1519] peer-checked:shadow-sm peer-focus-visible:ring-2 peer-focus-visible:ring-[#7A1519]">
            {option}
          </span>
        </label>
      ))}
    </div>
  </fieldset>
);

const LalKitabDetailsPage = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [duration, setDuration] = useState('1 year');
  const [language, setLanguage] = useState('');
  const [kundliFor, setKundliFor] = useState('');
  const [isKundliMenuOpen, setIsKundliMenuOpen] = useState(false);
  const [kundliForError, setKundliForError] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [justAdded, setJustAdded] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const [openFaq, setOpenFaq] = useState(-1);
  const [descriptionLanguage, setDescriptionLanguage] = useState('en');
  const formRef = useRef(null);
  const kundliMenuRef = useRef(null);
  const kundliTriggerRef = useRef(null);
  const cart = useCustomerStore((state) => state.cart);
  const setCart = useCustomerStore((state) => state.setCart);

  const years = parseInt(duration, 10);
  const selectedPrice = durationPrices[years];
  const inCart = cart.some((item) => item.name === productName && item.duration === duration);
  const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);

  useEffect(() => {
    const node = formRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(([entry]) => setShowBar(!entry.isIntersecting), { threshold: 0.05 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!justAdded) return undefined;
    const timer = setTimeout(() => setJustAdded(false), 2800);
    return () => clearTimeout(timer);
  }, [justAdded]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveImage((previous) => (previous + 1) % gallery.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isKundliMenuOpen) return undefined;
    const closeOnOutsideClick = (event) => {
      if (!kundliMenuRef.current?.contains(event.target)) setIsKundliMenuOpen(false);
    };
    document.addEventListener('pointerdown', closeOnOutsideClick);
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick);
  }, [isKundliMenuOpen]);

  const goToForm = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    formRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    setTimeout(() => formRef.current?.querySelector('input[name="name"]')?.focus({ preventScroll: true }), reduce ? 0 : 500);
  };

  const handleFormChange = (event) => {
    const data = new FormData(event.currentTarget);
    setCompleted(trackedFields.filter((key) => String(data.get(key) ?? '').trim() !== '').length);
  };

  const handleAddToCart = (event) => {
    event.preventDefault();
    if (!kundliFor) {
      setKundliForError(true);
      setIsKundliMenuOpen(true);
      kundliTriggerRef.current?.focus();
      return;
    }
    const formData = new FormData(event.currentTarget);
    const customerDetails = Object.fromEntries(formData.entries());
    const cartItem = {
      name: productName,
      price: selectedPrice,
      image: gallery[activeImage].src,
      quantity: 1,
      duration,
      language,
      customerDetails,
    };
    const matchesSelectedDuration = (item) => item.name === productName && item.duration === duration;
    const existingItem = cart.find(matchesSelectedDuration);

    setCart(existingItem
      ? cart.map((item) => matchesSelectedDuration(item)
        ? { ...item, ...cartItem, quantity: (item.quantity || 1) + 1 }
        : item)
      : [...cart, cartItem]);
    setJustAdded(true);
  };

  return (
    <main className="lk-page bg-[#f8f6f1] text-[#231416]">
      <style>{styles}</style>

      {/* ============================ Hero ============================ */}
      <div className={containerClass}>
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 py-3 text-xs text-[#6F6063]">
          <Link to="/" className="transition hover:text-[#7A1519]">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/lal-kitab" className="transition hover:text-[#7A1519]">Lal Kitab</Link>
          <span aria-hidden="true">/</span>
          <span className="font-semibold text-[#231416]">Lal Kitab Amrit</span>
        </nav>

        <section className="grid items-stretch gap-6 pb-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-8 lg:pb-16">
          {/* Gallery: thumbnail rail + clean main image */}
          <div className="min-w-0 lg:sticky lg:top-6 lg:self-stretch">
            <div className="flex flex-col gap-2.5 lg:h-full">
              <div className="relative min-w-0 overflow-hidden rounded-xl border border-[#231416]/10 bg-[#F5ECE9] lg:flex-1 lg:min-h-0">
                <img
                  key={gallery[activeImage].src}
                  src={gallery[activeImage].src}
                  alt={gallery[activeImage].alt}
                  className="lk-main-image aspect-square w-full object-cover duration-700 lg:h-full lg:aspect-auto"
                />
              </div>

              <div className="lk-thumbs flex justify-center gap-2 overflow-x-auto pb-0.5 lg:overflow-visible">
                {gallery.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    onMouseEnter={() => setActiveImage(index)}
                    onClick={() => setActiveImage(index)}
                    aria-label={`Show product image ${index + 1}`}
                    aria-pressed={activeImage === index}
                    className={`h-14 w-14 shrink-0 overflow-hidden rounded-lg border bg-[#F5ECE9] transition sm:h-[68px] sm:w-[68px] ${focusLight} ${activeImage === index ? 'border-[#7A1519] ring-1 ring-[#7A1519]' : 'border-[#231416]/10 opacity-70 hover:opacity-100'}`}
                  >
                    <img src={image.src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Purchase panel */}
          <div className="min-w-0">
            <h1 className="font-sans text-[1.75rem] font-bold leading-[1.1] tracking-tight text-[#4B0F14] sm:text-[2rem]">{productName}</h1>
            <p lang="hi" className="lk-display mt-1.5 text-base text-[#9E1B1F]">लाल किताब अमृत वशिष्ठ ज्योतिष</p>
            <p className="mt-2 max-w-lg text-sm leading-6 text-[#4a3b3d]">
              A personalised, printed Lal Kitab kundli report with birth-chart insights and traditional remedies, prepared from your birth details.
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <Stars />
              <span className="text-[13px] font-semibold">4.95</span>
              <span className="text-[13px] text-[#7A1519]">{totalReviews} reviews</span>
            </div>

            <div className="mt-3 flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
              <span className="text-2xl font-semibold tracking-tight">{selectedPrice}</span>
              <span className="text-xs text-[#6F6063]">Inclusive of all taxes</span>
            </div>

            {/* Order form */}
            <div
              ref={formRef}
              id="order-form"
              className="mt-3 overflow-hidden rounded-xl border border-[#231416]/10 bg-white shadow-[0_18px_40px_-28px_rgba(75,15,20,0.45)]"
            >
              <div className="flex items-center gap-3 border-b border-[#231416]/10 px-3.5 py-2.5">
                <div className="h-11 w-11 shrink-0">
                  <KundliChart filled={completed * 2} />
                </div>
                <div className="min-w-0">
                  <h2 className="lk-display text-lg leading-tight text-[#4B0F14]">Your birth details</h2>
                  <p className="mt-0.5 text-xs leading-4 text-[#6F6063]" aria-live="polite">
                    {completed === trackedFields.length
                      ? 'Chart complete. Add the report to your cart.'
                      : `Each detail fills in your kundli. ${completed} of ${trackedFields.length} added.`}
                  </p>
                </div>
              </div>

              <form onSubmit={handleAddToCart} onChange={handleFormChange} className="space-y-3 p-3.5">
                <fieldset>
                  <legend className={labelClass}>Guidance for how many years?</legend>
                  <div className="mt-1.5 grid grid-cols-4 gap-1 sm:grid-cols-8">
                    {durations.map((option) => {
                      const [count, unit] = option.split(' ');
                      const selected = duration === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          aria-pressed={selected}
                          aria-label={option}
                          onClick={() => setDuration(option)}
                          className={`flex h-9 flex-row items-center justify-center gap-1 rounded-none border transition ${focusLight} ${selected ? 'border-[#7A1519] bg-[#7A1519] text-[#F6E7C4]' : 'border-[#231416]/15 bg-white hover:border-[#7A1519]'}`}
                        >
                          <span className="text-sm font-semibold leading-none">{count}</span>
                          <span className="text-[10px] leading-none">{unit}</span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-1.5 text-xs text-[#6F6063]">
                    Year-by-year guidance for the next {years} {years === 1 ? 'year' : 'years'}.
                  </p>
                </fieldset>

                <div className="grid gap-2 sm:grid-cols-2">
                  <div ref={kundliMenuRef} className="relative">
                    <label htmlFor="kundli-for-trigger" className={labelClass}>Kundli for</label>
                    <input type="hidden" name="kundliFor" value={kundliFor} />
                    <button
                      ref={kundliTriggerRef}
                      id="kundli-for-trigger"
                      type="button"
                      aria-haspopup="listbox"
                      aria-expanded={isKundliMenuOpen}
                      aria-controls="kundli-for-options"
                      aria-invalid={kundliForError}
                      aria-describedby={kundliForError ? 'kundli-for-error' : undefined}
                      onClick={() => setIsKundliMenuOpen((open) => !open)}
                      onKeyDown={(event) => {
                        if (event.key === 'ArrowDown') {
                          event.preventDefault();
                          setIsKundliMenuOpen(true);
                        }
                        if (event.key === 'Escape') setIsKundliMenuOpen(false);
                      }}
                      className={`${inputBase} mt-1.5 flex cursor-pointer items-center justify-between px-3 text-left ${!kundliFor ? 'text-[#9a8d8f]' : ''}`}
                    >
                      <span>{kundliFor || 'Kundli For'}</span>
                      <ChevronDown className={`h-4 w-4 text-[#8a7b7d] transition-transform ${isKundliMenuOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </button>
                    {isKundliMenuOpen && (
                      <div
                        id="kundli-for-options"
                        role="listbox"
                        aria-label="Kundli for"
                        className="absolute left-0 top-full z-30 mt-1 max-h-56 w-full overflow-y-auto border border-[#231416]/20 bg-white py-1 shadow-lg"
                      >
                        {kundliForOptions.map((option, index) => (
                          <button
                            key={`${option}-${index}`}
                            type="button"
                            role="option"
                            aria-selected={kundliFor === option}
                            onClick={() => {
                              setKundliFor(option);
                              setKundliForError(false);
                              setIsKundliMenuOpen(false);
                            }}
                            className={`block w-full px-3 py-2 text-left text-sm transition hover:bg-[#F8F1EF] focus-visible:bg-[#F8F1EF] focus-visible:outline-none ${kundliFor === option ? 'bg-[#F8F1EF] font-semibold text-[#7A1519]' : 'text-[#231416]'}`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                    {kundliForError && <p id="kundli-for-error" className="mt-1 text-xs text-[#9E1B1F]">Please choose who the report is for.</p>}
                  </div>
                  <Field label="Language">
                    <select
                      required
                      name="reportLanguage"
                      value={language}
                      onChange={(event) => setLanguage(event.target.value)}
                      className={`${inputBase} cursor-pointer appearance-none px-3 pr-9`}
                    >
                      <option value="" disabled>Choose Language</option>
                      {languages.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a7b7d]" aria-hidden="true" />
                  </Field>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <Field label="Full name">
                    <input required name="name" autoComplete="name" placeholder="As you want it printed" className={`${inputBase} px-3`} />
                  </Field>
                  <div className="min-w-0 pt-[3px]">
                    <span className={`block leading-5 ${labelClass}`}>Select your gender</span>
                    <div role="radiogroup" aria-label="Select your gender" className="mt-[7px] flex h-11 items-center justify-start gap-8 px-1 text-sm text-[#4a3b3d]">
                      {genders.map((gender) => (
                        <label key={gender} className="inline-flex cursor-pointer items-center gap-2">
                          <input
                            required
                            type="radio"
                            name="gender"
                            value={gender}
                            className="h-4 w-4 cursor-pointer accent-[#7A1519]"
                          />
                          {gender}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <Field label="Date of birth">
                    <input required name="dateOfBirth" type="date" max={today} className={`${inputBase} px-3`} />
                  </Field>
                  <Field label="Time of birth">
                    <input required name="timeOfBirth" type="time" className={`${inputBase} px-3`} />
                  </Field>
                  <Field label="Place of birth" icon={MapPin}>
                    <input required name="placeOfBirth" placeholder="City, country" className={`${inputBase} pl-9 pr-3`} />
                  </Field>
                  <Field label="WhatsApp number" icon={MessageCircle}>
                    <input required name="whatsappNumber" type="tel" autoComplete="tel" placeholder="+91 98765 43210" className={`${inputBase} pl-9 pr-3`} />
                  </Field>
                </div>

                <Field label="File type">
                  <input type="hidden" name="fileType" value="Hard copy" />
                  <span className={`${inputBase} !w-fit flex items-center justify-center px-3`}>
                    Hard copy
                  </span>
                </Field>

                <div>
                  <button
                    type="submit"
                    className={`flex h-10 w-full items-center justify-center gap-2 rounded-lg text-sm font-semibold text-[#FBEBC4] transition active:scale-[0.99] ${focusLight} ${justAdded ? 'bg-[#3F6B3A]' : 'bg-[#7A1519] hover:bg-[#5E0F13]'}`}
                  >
                    {justAdded ? <Check className="h-4 w-4" aria-hidden="true" /> : <ShoppingBag className="h-4 w-4" aria-hidden="true" />}
                    {justAdded ? 'Added to cart' : 'Add tocart'}
                  </button>
                  <p role="status" className="mt-1 min-h-3.5 text-center text-[11px] font-medium text-[#3F6B3A]">
                    {justAdded
                      ? 'Added. Your report is in the cart.'
                      : inCart ? 'This report is in your cart. You can add another copy above.' : ''}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>

      {/* ======================= Report description ======================= */}
      <section aria-label="Lal Kitab report description" className="bg-[#f8f6f1]">
        <div className={`${containerClass} py-8 pb-4 sm:py-10 sm:pb-5`}>
          <div role="tablist" aria-label="Description language" className="flex gap-6 border-b border-[#231416]/10">
            {[
              { id: 'en', label: 'English Description' },
              { id: 'hi', label: 'हिंदी विवरण' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`report-description-tab-${tab.id}`}
                aria-selected={descriptionLanguage === tab.id}
                aria-controls="report-description-panel"
                onClick={() => setDescriptionLanguage(tab.id)}
                className={`border-b-2 px-1 pb-2 text-sm font-medium transition ${focusLight} ${
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
            id="report-description-panel"
            role="tabpanel"
            aria-labelledby={`report-description-tab-${descriptionLanguage}`}
            lang={descriptionLanguage === 'hi' ? 'hi' : 'en'}
            className="space-y-5 pt-5 text-base leading-7 text-[#3a2c2e]"
          >
            <div className="space-y-0">
              {reportDescriptions[descriptionLanguage].intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {reportDescriptions[descriptionLanguage].sections.map((section) => (
              <section key={section.title} className="space-y-4">
                <h2 className="font-sans text-2xl font-bold leading-snug tracking-tight text-[#7A1519]">{section.title}</h2>
                {section.intro && <p>{section.intro}</p>}
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets && (
                  <ul className="list-disc space-y-0.5 pl-5">
                    {section.bullets.map((item) => (
                      <li key={typeof item === 'string' ? item : item.label}>
                        {typeof item === 'string' ? item : (
                          <>
                            <strong className="font-semibold text-[#231416]">{item.label}</strong>{' '}
                            {item.text}
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== FAQ ============================== */}
      <section aria-labelledby="lal-kitab-faq-heading" className="bg-white">
        <div className={`${containerClass} border-t border-[#231416]/15 pt-5 pb-8 sm:pt-6 sm:pb-10`}>
          <div className="w-full">
            <h2 id="lal-kitab-faq-heading" className="mb-5 font-sans text-xl font-bold tracking-tight text-black sm:text-2xl">
              Frequently Asked Questions
            </h2>
            <div className="ml-12 border-t border-[#231416]/15">
              {faqs.map((faq, index) => {
                const open = openFaq === index;
                return (
                  <div key={faq.question} className="border-b border-[#231416]/15">
                    <h3>
                      <button
                        type="button"
                        id={`lal-kitab-faq-button-${index}`}
                        aria-expanded={open}
                        aria-controls={`lal-kitab-faq-panel-${index}`}
                        onClick={() => setOpenFaq(open ? -1 : index)}
                        className={`flex w-full items-center justify-between gap-4 py-4 text-left text-base font-semibold text-[#231416] transition-colors hover:text-[#7A1519] ${focusLight}`}
                      >
                        {faq.question}
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-[#7A1519] transition-transform duration-200 motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}
                          aria-hidden="true"
                        />
                      </button>
                    </h3>
                    <div
                      id={`lal-kitab-faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`lal-kitab-faq-button-${index}`}
                      aria-hidden={!open}
                      className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-3xl pb-4 pr-8 text-base leading-7 text-[#3a2c2e]">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================= Related products ========================= */}
      <section aria-labelledby="related-products-heading" className="bg-[#f8f6f1]">
        <div className={`${containerClass} border-t border-[#231416]/15 py-8 sm:py-10`}>
          <h2 id="related-products-heading" className="mb-5 font-sans text-xl font-bold tracking-tight text-black sm:text-2xl">
            Related Products
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
            {relatedProducts.map((product) => (
              <Link
                key={product.categoryLabel}
                to={product.href}
                aria-label={`Browse ${product.categoryLabel}: ${product.name}`}
                className={`group overflow-hidden border border-[#231416]/10 bg-white transition-colors hover:border-[#7A1519]/40 ${focusLight}`}
              >
                <div className="aspect-square overflow-hidden bg-[#F5ECE9]">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="space-y-1 p-3">
                  <p className="text-xs font-medium text-[#6F6063]">{product.categoryLabel}</p>
                  <h3 className="line-clamp-2 min-h-9 text-sm font-semibold leading-snug text-[#231416]">{product.name}</h3>
                  <p className="text-sm font-bold text-[#4B0F14]">{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= Sticky purchase bar ========================= */}
      <div
        aria-hidden={!showBar}
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-[#231416]/10 bg-white/95 backdrop-blur transition-[transform,visibility] duration-300 motion-reduce:transition-none ${showBar ? 'visible translate-y-0' : 'invisible translate-y-full'}`}
      >
        <div className={`${containerClass} flex items-center gap-3 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))]`}>
          <img src={gallery[0].src} alt="" className="hidden h-9 w-9 rounded-md object-cover sm:block" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold">{productName}</p>
            <p className="text-xs text-[#6F6063]">{selectedPrice}</p>
          </div>
          <button
            type="button"
            onClick={goToForm}
            className={`inline-flex h-10 shrink-0 items-center rounded-lg bg-[#7A1519] px-5 text-[13px] font-semibold text-[#FBEBC4] transition hover:bg-[#5E0F13] ${focusLight}`}
          >
            Enter birth details
          </button>
        </div>
      </div>
    </main>
  );
};

export default LalKitabDetailsPage;