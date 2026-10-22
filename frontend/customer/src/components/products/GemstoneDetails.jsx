import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Minus, Package, Plus, ShoppingBag, Star, Truck } from 'lucide-react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useCustomerStore } from '../../store/useCustomerStore';
import gemstoneProducts, { getGemstoneProductSlug } from '../../data/gemstoneProducts';

const gemstoneDetails = {
  'neelam-blue-sapphire': {
    nameHindi: 'नीलम',
    nameEnglish: 'Blue Sapphire',
    descriptionEnglish: `Unlock rapid success and powerful transformation with Neelam (Blue Sapphire). Known for its fast-acting energy, this gemstone brings financial growth, sharp focus, and inner strength. It helps you overcome obstacles, reduce stress, and stay disciplined—while attracting luck and protection from negative energies. If Saturn’s influence is strong in your chart, Neelam can be life-changing. Don’t miss out—wear it as a ring or pendant and experience the shift. Order yours today!

Astrovastubazar’s Premium Neelam Stone Key Features:
1. Eye-Clean Clarity
2. Intense Royal Blue
3. Expert Polish with No Scratches
4. Flawless Surface with Luxurious Feel
5. Even Tone, No Dullness/Grayish Tints
6. Precision-cut for Optimal Brilliance, Symmetry, and Light Reflection

By correctly wearing the Neelam stone, individuals can lessen the negative effects of Saturn in their Kundali (birth chart) and bring favourable outcomes of the powerful planet. Enhance focus and provide strength to overcome challenges you face in different areas of life. Consult a prominent Astrology Sansthan like Astrovastubazar for more benefits of Neelam according to your individual needs stated in your birth chart. Contact us for more accurate astrology predictions and remedies.`,
    descriptionHindi: `नीलम (ब्लू सैफायर) के साथ तेज़ सफलता और शक्तिशाली बदलाव की ओर बढ़ें। तेज़ प्रभाव वाली ऊर्जा के लिए जाना जाने वाला यह रत्न आर्थिक प्रगति, तेज़ एकाग्रता और आंतरिक शक्ति प्रदान करता है। यह बाधाओं पर काबू पाने, तनाव कम करने और अनुशासित रहने में मदद करता है, साथ ही सौभाग्य और नकारात्मक ऊर्जा से सुरक्षा को आकर्षित करता है। यदि आपकी कुंडली में शनि का प्रभाव प्रबल है, तो नीलम जीवन में बड़ा बदलाव ला सकता है। इसे अंगूठी या पेंडेंट के रूप में पहनकर बदलाव का अनुभव करें। आज ही ऑर्डर करें!

Astrovastubazar के प्रीमियम नीलम की मुख्य विशेषताएँ:
1. आँखों से साफ़ दिखाई देने वाली स्पष्टता
2. गहरा रॉयल ब्लू रंग
3. बिना खरोंच की विशेषज्ञ पॉलिश
4. शानदार एहसास वाली दोषरहित सतह
5. एकसमान रंगत, बिना मटमैलेपन या धूसर झलक के
6. बेहतरीन चमक, समरूपता और प्रकाश परावर्तन के लिए सटीक कटाई

नीलम को सही तरीके से धारण करने से व्यक्ति अपनी कुंडली में शनि के नकारात्मक प्रभावों को कम कर सकता है और इस शक्तिशाली ग्रह के अनुकूल परिणाम पा सकता है। यह एकाग्रता बढ़ाने और जीवन के विभिन्न क्षेत्रों की चुनौतियों पर काबू पाने की शक्ति देने में सहायक है। अपनी जन्म कुंडली में बताई गई व्यक्तिगत आवश्यकताओं के अनुसार नीलम के लाभ जानने के लिए Astrovastubazar जैसे प्रतिष्ठित ज्योतिष संस्थान से सलाह लें। अधिक सटीक ज्योतिषीय भविष्यवाणियों और उपायों के लिए हमसे संपर्क करें।`,
    benefitsTitleHindi: 'Benefits of Neelam (Blue Sapphire)',
    benefitsTitleEnglish: 'Benefits of Wearing Blue Sapphire',
    wearingMethodTitleHindi: 'नीलम रत्न धारण करने की विधि',
    wearingMethodTitleEnglish: 'Method of Wearing Blue Sapphire',
    benefitsHindi: 'शनि से जुड़ी चुनौतियों को पार करने और नीलम की आभा से संतोष पाने की पारंपरिक मान्यता है। नीलम को खुशी, समृद्धि और समाधान से जोड़ा जाता है। मान्यता के अनुसार, यह परिवार में सामंजस्य, स्वभाव में संतुलन, नए मित्र बनाने, वित्तीय और कानूनी मामलों में धैर्य रखने तथा मेहनत के फल पर ध्यान केंद्रित करने की प्रेरणा देता है। कुछ पारंपरिक मान्यताएँ इसे परिवार के कल्याण और आत्मनिर्भरता से भी जोड़ती हैं। आँखों, बालों या हड्डियों की किसी समस्या के लिए रत्न चिकित्सा का विकल्प नहीं है; स्वास्थ्य संबंधी सलाह के लिए योग्य चिकित्सक से संपर्क करें।',
    religiousBeliefHindi: 'पारंपरिक ज्योतिषीय मान्यता के अनुसार, शनि रत्न अमृत धारण करने से शनि ग्रह के अशुभ प्रभाव धीरे-धीरे कम हो सकते हैं और शुभ फल प्राप्त हो सकते हैं। यह धार्मिक विश्वास है, निश्चित परिणाम की गारंटी नहीं।',
    wearingMethodHindi: 'इसे शनिवार के दिन शुक्ल पक्ष के शुभ योग में अथवा शनिवार के शुभ नक्षत्र में गले में धारण करने की पारंपरिक सलाह दी जाती है। इसे दाहिने हाथ की मध्यमा उंगली में अंगूठी के रूप में पहनने की भी मान्यता है। धारण करने से पहले योग्य ज्योतिषी से सलाह लें।',
    benefitsEnglish: 'Traditional astrological beliefs associate Neelam with navigating challenges linked to Saturn and seeking contentment, happiness, prosperity, and solutions. It is also associated with family harmony, balance of nature, forming friendships, approaching financial or legal difficulties with patience, and focusing on the rewards of effort. Some traditions also connect it with family well-being and self-reliance. A gemstone is not a treatment for eye, hair, or bone conditions; consult a qualified medical professional for health concerns.',
    religiousBeliefEnglish: 'According to traditional astrological belief, wearing Shani Ratna Amrit may gradually lessen Saturn’s inauspicious effects and invite auspicious results. This is a matter of faith and does not guarantee outcomes.',
    wearingMethodEnglish: 'Traditional guidance suggests wearing it around the neck on a Saturday during an auspicious Shukla Paksha yoga or Saturday nakshatra. It may also be worn as a ring on the middle finger of the right hand. Consult a qualified astrologer before wearing it.',
  },
  'pukhraj-yellow-sapphire': {
    nameHindi: 'पुखराज',
    nameEnglish: 'Yellow Sapphire',
    descriptionEnglish: `Bring wisdom, wealth, and success into your life with Pukhraj, the stunning Yellow Sapphire. This powerful gemstone channels the positive energy of Jupiter to boost financial stability, strengthen relationships, and protect you from harm. It attracts prosperity, good fortune, and helps you achieve your goals. Wear it as a ring on your index finger or as a pendant around your neck—ideally on a Thursday. Don’t wait—experience its life-changing energy today!

Astrovastubazar’s Premium Yellow Sapphire Key Features:
1. Vivid, Uniform "Canary Yellow" Color
2. No Dullness/Grayish Tints
3. Precision-cut for Maximum Light Reflection
4. Natural, Untreated Color
5. Flawless, Unheated for a Luxurious Feel

Attract the positive and spiritual qualities of Yellow Sapphire (Pukhraj). Ward off the negative forces and attract luck. Harness the blessings of the auspicious planet Jupiter in the horoscope (Kundali). Consult a prominent Astrology Sansthan like Astrovastubazar for more benefits of the Yellow Sapphire according to your individual needs stated in your birth chart. Contact us for more accurate astrology predictions and remedies.`,
    descriptionHindi: `सुंदर पीले सैफायर पुखराज के साथ अपने जीवन में ज्ञान, धन और सफलता लाएँ। यह शक्तिशाली रत्न बृहस्पति की सकारात्मक ऊर्जा के माध्यम से आर्थिक स्थिरता बढ़ाने, रिश्तों को मज़बूत करने और हानि से बचाने में सहायक माना जाता है। यह समृद्धि और सौभाग्य आकर्षित करता है तथा लक्ष्य प्राप्त करने में मदद करता है। इसे तर्जनी उंगली में अंगूठी या गले में पेंडेंट के रूप में पहनें—बेहतर है कि गुरुवार से शुरुआत करें। देर न करें—आज ही इसकी बदलाव लाने वाली ऊर्जा का अनुभव करें!

Astrovastubazar के प्रीमियम येलो सैफायर की मुख्य विशेषताएँ:
1. चमकीला, एकसमान "कैनरी येलो" रंग
2. बिना मटमैलेपन या धूसर झलक के
3. अधिकतम प्रकाश परावर्तन के लिए सटीक कटाई
4. प्राकृतिक, बिना उपचारित रंग
5. शानदार एहसास के लिए दोषरहित और बिना गर्मी से उपचारित

येलो सैफायर (पुखराज) के सकारात्मक और आध्यात्मिक गुणों को आकर्षित करें। नकारात्मक शक्तियों को दूर रखें और सौभाग्य को आमंत्रित करें। अपनी कुंडली में शुभ ग्रह बृहस्पति के आशीर्वाद प्राप्त करें। अपनी जन्म कुंडली में बताई गई व्यक्तिगत आवश्यकताओं के अनुसार येलो सैफायर के लाभ जानने के लिए Astrovastubazar जैसे प्रतिष्ठित ज्योतिष संस्थान से सलाह लें। अधिक सटीक ज्योतिषीय भविष्यवाणियों और उपायों के लिए हमसे संपर्क करें।`,
    benefitsTitleHindi: 'Benefits of Pukhraj (Yellow Sapphire)',
    benefitsTitleEnglish: 'Benefits of Wearing Yellow Sapphire',
    wearingMethodTitleHindi: 'रत्न धारण करने की विधि',
    wearingMethodTitleEnglish: 'Method of Wearing Yellow Sapphire',
    benefitsHindi: 'पुखराज को चुनौतियों का सामना करने और संभावनाओं, सफलता व समृद्धि की ओर बढ़ने से जोड़ा जाता है। पारंपरिक मान्यताओं के अनुसार, इसे शिक्षा में एकाग्रता, बच्चों के उज्ज्वल भविष्य, आर्थिक समृद्धि, घर में सामंजस्य और प्रतिष्ठा से जोड़ा जाता है। कुछ लोग इसे स्मरण शक्ति, परंपराओं के प्रति श्रद्धा, पूजा और आध्यात्मिक मार्गदर्शन से भी जोड़ते हैं। परिवार के स्वास्थ्य या किसी बीमारी से सुरक्षा के दावों का कोई चिकित्सकीय आधार नहीं है; रत्न चिकित्सा का विकल्प नहीं है। स्वास्थ्य संबंधी सलाह के लिए योग्य चिकित्सक से संपर्क करें।',
    religiousBeliefHindi: 'पारंपरिक ज्योतिषीय मान्यता के अनुसार, बृहस्पति रत्न अमृत धारण करने से बृहस्पति ग्रह के अशुभ प्रभाव धीरे-धीरे कम हो सकते हैं और शुभ फल प्राप्त हो सकते हैं। यह धार्मिक विश्वास है, निश्चित परिणाम की गारंटी नहीं।',
    wearingMethodHindi: 'पारंपरिक सलाह के अनुसार, शुक्ल पक्ष के शुभ योग में बृहस्पतिवार के दिन या बृहस्पति के शुभ नक्षत्र में इसे सीधे हाथ की तर्जनी उंगली में धारण किया जाता है। धारण करने से पहले योग्य ज्योतिषी से सलाह लें।',
    benefitsEnglish: 'Traditional beliefs associate Pukhraj with facing challenges and pursuing possibilities, success, and prosperity. It is also associated with focus in education, children’s prospects, financial well-being, harmony at home, and reputation. Some traditions connect it with memory, devotion to customs, worship, and spiritual guidance. Claims that a gemstone protects family health or prevents illness are not medically established; gemstones are not a substitute for medical care. Consult a qualified medical professional for health concerns.',
    religiousBeliefEnglish: 'According to traditional astrological belief, wearing a Jupiter gemstone may gradually lessen Jupiter’s inauspicious effects and invite auspicious results. This is a matter of faith and does not guarantee outcomes.',
    wearingMethodEnglish: 'Traditional guidance suggests wearing it on the index finger of the right hand on a Thursday during an auspicious Shukla Paksha yoga or Jupiter’s auspicious nakshatra. Consult a qualified astrologer before wearing it.',
  },
  'panna-emerald': {
    nameHindi: 'पन्ना',
    nameEnglish: 'Emerald',
    descriptionEnglish: `The Panna (Emerald) stone is a captivating gemstone known for its rich green hue and powerful benefits. Commonly worn as a ring, pendant, or bracelet, it symbolizes positivity, intelligence, clear communication, humor, and success. It is believed to reduce stress, improve mental well-being, and support career growth. Spiritually, the Panna is associated with the planet Mercury, enhancing its positive effects and reducing negative influences in one’s horoscope. For best results, wear a Panna ring on the little finger of your right hand. This gemstone is ideal for those seeking beauty, balance, inner peace, and overall life enhancement.

Astrovastubazar’s Premium Emerald Key Features:
1. Bright Luster
2. Origin Proof
3. Rich, Intense "Emerald Green"
4. High Transparency, Excellent Clarity
5. Cut Precision, Symmetrical facets to maximize brilliance

Avail the several benefits of Emerald in a captivating, vivid green colour as a ring or pendant. Attract positivity, good communication, intellect, humour, success, and overall well-being. Consult a prominent Astrology Sansthan like Astrovastubazar for more benefits of the Emerald according to your individual needs stated in your birth chart. Contact us for more accurate astrology predictions and remedies.`,
    descriptionHindi: `पन्ना (एमराल्ड) अपने गहरे हरे रंग और शक्तिशाली लाभों के लिए जाना जाने वाला एक आकर्षक रत्न है। इसे आमतौर पर अंगूठी, पेंडेंट या ब्रेसलेट के रूप में पहना जाता है और यह सकारात्मकता, बुद्धिमत्ता, स्पष्ट संवाद, हास्य और सफलता का प्रतीक है। मान्यता है कि यह तनाव कम करने, मानसिक कल्याण बेहतर करने और करियर की उन्नति में सहायक है। आध्यात्मिक रूप से पन्ना बुध ग्रह से जुड़ा है; इसे कुंडली में बुध के सकारात्मक प्रभाव बढ़ाने और नकारात्मक प्रभाव कम करने वाला माना जाता है। बेहतर परिणामों के लिए पन्ने की अंगूठी दाहिने हाथ की छोटी उंगली में पहनें। यह रत्न सुंदरता, संतुलन, आंतरिक शांति और जीवन में समग्र उन्नति चाहने वालों के लिए उपयुक्त है।

Astrovastubazar के प्रीमियम एमराल्ड की मुख्य विशेषताएँ:
1. चमकदार आभा
2. उत्पत्ति का प्रमाण
3. गहरा, समृद्ध "एमराल्ड ग्रीन" रंग
4. उच्च पारदर्शिता और उत्कृष्ट स्पष्टता
5. चमक बढ़ाने के लिए सटीक कटाई और सममित पहलू

आकर्षक, चमकीले हरे रंग की अंगूठी या पेंडेंट के रूप में एमराल्ड के अनेक लाभ पाएँ। सकारात्मकता, बेहतर संवाद, बुद्धिमत्ता, हास्य, सफलता और समग्र कल्याण को आकर्षित करें। अपनी जन्म कुंडली में बताई गई व्यक्तिगत आवश्यकताओं के अनुसार एमराल्ड के लाभ जानने के लिए Astrovastubazar जैसे प्रतिष्ठित ज्योतिष संस्थान से सलाह लें। अधिक सटीक ज्योतिषीय भविष्यवाणियों और उपायों के लिए हमसे संपर्क करें।`,
    benefitsTitleHindi: 'Benefits of Panna (Emerald)',
    benefitsTitleEnglish: 'Benefits of Panna (Emerald)',
    wearingMethodTitleHindi: 'रत्न पहनने की विधि',
    wearingMethodTitleEnglish: 'Method of Wearing the Gemstone',
    benefitsHindi: 'पारंपरिक ज्योतिषीय मान्यताओं में पन्ना और बुध ग्रह को करियर, प्रगति, आर्थिक निर्णय तथा कला से जोड़ा जाता है। कुछ लोग इसे अनिश्चितताओं का सामना करने, स्थिरता पाने और बुध से जुड़ी चुनौतियों के समय आध्यात्मिक सहारे के रूप में धारण करते हैं। नसों, दाँतों, गैस, एसिडिटी या त्वचा की समस्याओं के इलाज अथवा रोकथाम के लिए रत्न प्रभावी होने का कोई स्थापित चिकित्सकीय प्रमाण नहीं है। स्वास्थ्य संबंधी समस्याओं के लिए योग्य चिकित्सक से सलाह लें।',
    religiousBeliefHindi: 'पारंपरिक ज्योतिषीय मान्यता के अनुसार, पन्ना धारण करने से बुध ग्रह के अशुभ प्रभाव धीरे-धीरे कम हो सकते हैं और शुभ फल प्राप्त हो सकते हैं। यह धार्मिक विश्वास है, निश्चित परिणाम की गारंटी नहीं।',
    wearingMethodHindi: 'पारंपरिक सलाह के अनुसार, शुक्ल पक्ष के शुभ योग में बुधवार के दिन या बुध के शुभ नक्षत्र में इसे गले में धारण किया जाता है। धारण करने से पहले योग्य ज्योतिषी से सलाह लें।',
    benefitsEnglish: 'Traditional astrological beliefs associate Panna and Mercury with career, progress, financial decisions, and the arts. Some people wear it for spiritual support when facing uncertainty or challenges associated with Mercury. There is no established medical evidence that a gemstone treats or prevents nerve, dental, digestive, or skin conditions. Consult a qualified medical professional for health concerns.',
    religiousBeliefEnglish: 'According to traditional astrological belief, wearing an emerald may gradually lessen Mercury’s inauspicious effects and invite auspicious results. This is a matter of faith and does not guarantee outcomes.',
    wearingMethodEnglish: 'Traditional guidance suggests wearing it around the neck on a Wednesday during an auspicious Shukla Paksha yoga or Mercury’s auspicious nakshatra. Consult a qualified astrologer before wearing it.',
  },
  'lahsuniya-cat-s-eye': {
    nameHindi: 'लहसुनिया',
    nameEnglish: "Cat's Eye (Lehsunia)",
    descriptionEnglish: `Astrovastubazar’s Premium Cat’s Eye Lahsuniya, also called Cat’s Eye stone, is a strong and pure gemstone linked to the planet Ketu. Wearing it is believed to bring Ketu’s blessings, remove negative energy, and help with financial stability and success. It also boosts wisdom, knowledge, and helps balance past karma. The stone is known for its unique look, which resembles a cat’s eye, and is great for people who want respect and recognition.

Key Features:
1. Sharp, bright, and perfectly centered silver-white "eye" that glides smoothly under light
2. Color remains vibrant in all lighting
3. Expertly cut to maximize the "eye’s" effect
4. Symmetrical and well-proportioned
5. Aligns strongly with Ketu’s energy, enhances intuition, protection, and spiritual growth

As a sacred and powerful stone, Cat’s Eye should be worn based on astrological guidance. You can consult an astrology expert to choose the right gemstone for you. Reputable astrology firms combine ancient wisdom with modern techniques to help individuals understand their life prediction and find remedies for any planetary affliction (dosh) in their birth chart. Consult a prominent Astrology Sansthan like Astrovastubazar for more benefits of Cat’s Eye (Lahsuniya) according to your individual needs stated in your birth chart. Contact us for more accurate astrology predictions and remedies.`,
    descriptionHindi: `Astrovastubazar का प्रीमियम कैट्स आई लहसुनिया, जिसे कैट्स आई स्टोन भी कहा जाता है, एक शक्तिशाली और शुद्ध रत्न है जिसका संबंध केतु ग्रह से है। मान्यता है कि इसे धारण करने से केतु का आशीर्वाद मिलता है, नकारात्मक ऊर्जा दूर होती है तथा आर्थिक स्थिरता और सफलता में मदद मिलती है। यह बुद्धिमत्ता और ज्ञान बढ़ाने तथा पिछले कर्मों को संतुलित करने में भी सहायक माना जाता है। बिल्ली की आँख जैसी अनूठी बनावट वाला यह रत्न सम्मान और पहचान चाहने वालों के लिए उपयुक्त है।

मुख्य विशेषताएँ:
1. तेजस्वी, चमकदार और बीच में सटीक स्थित चाँदी-सफेद "आँख", जो रोशनी में आसानी से सरकती दिखाई देती है
2. हर तरह की रोशनी में रंग जीवंत बना रहता है
3. "आँख" के प्रभाव को बढ़ाने के लिए विशेषज्ञता से तराशा गया
4. सममित और संतुलित अनुपात
5. केतु की ऊर्जा से मज़बूत जुड़ाव; अंतर्ज्ञान, सुरक्षा और आध्यात्मिक विकास को बढ़ावा

एक पवित्र और शक्तिशाली रत्न होने के कारण कैट्स आई ज्योतिषीय मार्गदर्शन के अनुसार ही धारण करना चाहिए। अपने लिए सही रत्न चुनने हेतु किसी ज्योतिष विशेषज्ञ से सलाह लें। प्रतिष्ठित ज्योतिष संस्थान प्राचीन ज्ञान और आधुनिक तकनीकों के मेल से लोगों को जीवन की संभावनाएँ समझने और जन्म कुंडली के ग्रह दोषों के उपाय खोजने में मदद करते हैं। अपनी जन्म कुंडली में बताई गई व्यक्तिगत आवश्यकताओं के अनुसार कैट्स आई (लहसुनिया) के लाभ जानने के लिए Astrovastubazar जैसे प्रतिष्ठित ज्योतिष संस्थान से सलाह लें। अधिक सटीक ज्योतिषीय भविष्यवाणियों और उपायों के लिए हमसे संपर्क करें।`,
    benefitsTitleHindi: "Benefits of Lahsuniya (Cat's Eye)",
    benefitsTitleEnglish: "Benefits of Lehsunia (Cat's Eye)",
    wearingMethodTitleHindi: 'रत्न पहनने की विधि',
    wearingMethodTitleEnglish: 'Method of Wearing the Gemstone',
    benefitsHindi: 'पारंपरिक ज्योतिषीय मान्यताओं में लहसुनिया को केतु से जुड़ी चुनौतियों, जीवन की बाधाओं और करियर में ठहराव का सामना करने के लिए आध्यात्मिक सहारे के रूप में देखा जाता है। कुछ लोग इसे आत्मविश्वास, ईमानदारी, रिश्तों में विश्वास और प्रतिष्ठा से भी जोड़ते हैं। कमर, पैर, गर्भाशय, हड्डियों या गुर्दों की किसी समस्या के इलाज अथवा रोकथाम के लिए रत्न प्रभावी होने का कोई स्थापित चिकित्सकीय प्रमाण नहीं है। स्वास्थ्य संबंधी समस्याओं के लिए योग्य चिकित्सक से सलाह लें।',
    religiousBeliefHindi: 'पारंपरिक ज्योतिषीय मान्यता के अनुसार, केतु रत्न अमृत धारण करने से केतु ग्रह के अशुभ प्रभाव धीरे-धीरे कम हो सकते हैं और शुभ फल प्राप्त हो सकते हैं। यह धार्मिक विश्वास है, निश्चित परिणाम की गारंटी नहीं।',
    wearingMethodHindi: 'पारंपरिक सलाह के अनुसार, शुक्ल पक्ष के शुभ योग या केतु के शुभ नक्षत्र में गुरुवार के दिन इसे गले में धारण किया जाता है। इसे दाहिने हाथ की मध्यमा उंगली में अंगूठी के रूप में पहनने की भी मान्यता है। धारण करने से पहले योग्य ज्योतिषी से सलाह लें।',
    benefitsEnglish: 'Traditional astrological beliefs associate Lehsunia with spiritual support for facing challenges linked to Ketu, life obstacles, and career stagnation. Some people also associate it with confidence, honesty, trust in relationships, and reputation. There is no established medical evidence that a gemstone treats or prevents conditions affecting the waist, legs, uterus, bones, or kidneys. Consult a qualified medical professional for health concerns.',
    religiousBeliefEnglish: 'According to traditional astrological belief, wearing Cat’s Eye (Lehsunia) may gradually lessen the inauspicious effects of Ketu and invite auspicious results. This is a matter of faith and does not guarantee outcomes.',
    wearingMethodEnglish: 'Traditional guidance suggests wearing it around the neck on a Thursday during an auspicious Shukla Paksha yoga or Ketu’s auspicious nakshatra. It may also be worn as a ring on the middle finger of the right hand. Consult a qualified astrologer before wearing it.',
  },
  'gomed-hessonite-garnet': {
    nameHindi: 'गोमेद',
    nameEnglish: 'Hessonite (Gomed)',
    descriptionEnglish: `Gomed, also known as Hessonite Garnet, is a powerful gemstone with spiritual importance. In astrology, it is linked to the planet Rahu and is believed to reduce its bad effects. Wearing Gomed brings protection, success, peace of mind, and spiritual growth. It helps the wearer overcome stress, negative thoughts, and anxiety while also supporting career and financial progress. Gomed stones come in different colors like orange-brown, deep yellow, maroon, honey yellow, and reddish brown. Gomed is worn to reduce Rahu’s negative energy and to receive its blessings. Wear the ring on the middle finger of the right hand, starting on a Wednesday. You can also wear it as a pendant around the neck.

Astrovastubazar’s Premium Hessonite Garnet Key Features:
1. Rich, warm "honey-brown" or "cinnamon" hue with a vibrant, uniform glow
2. Expertly faceted (oval/cabochon) to maximize color depth and astrological potency
3. Naturally untreated, with lab certification
4. Aligns strongly with Rahu’s planetary energy
5. Resists scratches due to optimal hardness

Wearing Astrovastubazar’s Premium Hessonite Garnet (Gomed) helps mitigate the malefic effects of Rahu, offering protection, success, and mental stability. Wear Astrovastubazar’s 100% original Hessonite Garnet to overcome stress, anxiety, and negativity while promoting spiritual growth. Consult a prominent Astrology Sansthan like Astrovastubazar for more benefits of Hessonite Garnet (Gomed) according to your individual needs stated in your birth chart. Contact us for more accurate astrology predictions and remedies.`,
    descriptionHindi: `गोमेद, जिसे हेसोनाइट गार्नेट भी कहा जाता है, आध्यात्मिक महत्व वाला एक शक्तिशाली रत्न है। ज्योतिष में इसका संबंध राहु ग्रह से है और मान्यता है कि यह राहु के बुरे प्रभावों को कम करता है। गोमेद धारण करने से सुरक्षा, सफलता, मन की शांति और आध्यात्मिक विकास मिलता है। यह तनाव, नकारात्मक विचारों और चिंता पर काबू पाने में मदद करता है तथा करियर और आर्थिक प्रगति को भी सहारा देता है। गोमेद नारंगी-भूरे, गहरे पीले, मैरून, शहद जैसे पीले और लाल-भूरे सहित कई रंगों में मिलता है। राहु की नकारात्मक ऊर्जा कम करने और उसका आशीर्वाद पाने के लिए गोमेद पहना जाता है। अंगूठी बुधवार से दाहिने हाथ की मध्यमा उंगली में पहनें। इसे गले में पेंडेंट के रूप में भी धारण कर सकते हैं।

Astrovastubazar के प्रीमियम हेसोनाइट गार्नेट की मुख्य विशेषताएँ:
1. जीवंत और एकसमान चमक के साथ गहरा, गर्म "हनी-ब्राउन" या "सिनेमन" रंग
2. रंग की गहराई और ज्योतिषीय प्रभाव बढ़ाने के लिए विशेषज्ञता से ओवल/कैबोशॉन कटाई
3. प्राकृतिक, बिना उपचारित; लैब प्रमाणपत्र सहित
4. राहु की ग्रहीय ऊर्जा से मज़बूत सामंजस्य
5. उपयुक्त कठोरता के कारण खरोंचों का प्रतिरोध

Astrovastubazar का प्रीमियम हेसोनाइट गार्नेट (गोमेद) धारण करने से राहु के अशुभ प्रभावों को कम करने तथा सुरक्षा, सफलता और मानसिक स्थिरता पाने में मदद मिलती है। तनाव, चिंता और नकारात्मकता पर काबू पाने तथा आध्यात्मिक विकास को बढ़ावा देने के लिए Astrovastubazar का 100% असली हेसोनाइट गार्नेट धारण करें। अपनी जन्म कुंडली में बताई गई व्यक्तिगत आवश्यकताओं के अनुसार हेसोनाइट गार्नेट (गोमेद) के लाभ जानने के लिए Astrovastubazar जैसे प्रतिष्ठित ज्योतिष संस्थान से सलाह लें। अधिक सटीक ज्योतिषीय भविष्यवाणियों और उपायों के लिए हमसे संपर्क करें।`,
    benefitsTitleHindi: 'Benefits of Gomed (Hessonite Garnet)',
    benefitsTitleEnglish: 'Benefits of Hessonite (Gomed)',
    wearingMethodTitleHindi: 'रत्न पहनने की विधि',
    wearingMethodTitleEnglish: 'Method of Wearing the Gemstone',
    benefitsHindi: 'पारंपरिक ज्योतिषीय मान्यताओं में गोमेद को राहु से जुड़ी चुनौतियों का सामना करने और नए लक्ष्य पाने के लिए आध्यात्मिक सहारे के रूप में देखा जाता है। कुछ लोग इसे बुरे सपनों, अनियंत्रित खर्चों, झूठे आरोपों, काम में रुकावटों और परिवार या जीवनसाथी के साथ मतभेदों से जुड़ी चिंताओं के समय धारण करते हैं। इसे आर्थिक अनुशासन, निर्णयों पर विचार, पारिवारिक सामंजस्य और ईर्ष्यालु या अविश्वसनीय लोगों के प्रभाव से बचाव की कामना से भी जोड़ा जाता है। ये धार्मिक मान्यताएँ हैं; रत्न किसी समस्या के समाधान या सुरक्षा की गारंटी नहीं देता।',
    religiousBeliefHindi: 'पारंपरिक ज्योतिषीय मान्यता के अनुसार, राहु रत्न अमृत धारण करने से राहु ग्रह के अशुभ प्रभाव धीरे-धीरे कम हो सकते हैं और शुभ फल प्राप्त हो सकते हैं। यह धार्मिक विश्वास है, निश्चित परिणाम की गारंटी नहीं।',
    wearingMethodHindi: 'पारंपरिक सलाह के अनुसार, शुक्ल पक्ष के शुभ योग में बुधवार के दिन या राहु के शुभ नक्षत्र में इसे गले में धारण किया जाता है। इसे दाहिने हाथ की मध्यमा उंगली में अंगूठी के रूप में पहनने की भी मान्यता है। धारण करने से पहले योग्य ज्योतिषी से सलाह लें।',
    benefitsEnglish: 'Traditional astrological beliefs associate Hessonite with spiritual support for facing challenges linked to Rahu and pursuing new goals. Some people wear it when concerned about bad dreams, uncontrolled expenses, false accusations, obstacles at work, or disagreements with a partner or family. It is also associated with hopes for financial discipline, thoughtful decisions, family harmony, and protection from negative influences. These are matters of faith; a gemstone cannot guarantee solutions or protection.',
    religiousBeliefEnglish: 'According to traditional astrological belief, wearing Hessonite may gradually lessen Rahu’s inauspicious effects and invite auspicious results. This is a matter of faith and does not guarantee outcomes.',
    wearingMethodEnglish: 'Traditional guidance suggests wearing it around the neck on a Wednesday during an auspicious Shukla Paksha yoga or Rahu’s auspicious nakshatra. It may also be worn as a ring on the middle finger of the right hand. Consult a qualified astrologer before wearing it.',
  },
  'moonga-red-coral': {
    nameHindi: 'मूंगा',
    nameEnglish: 'Red Coral',
    descriptionEnglish: `Unlock the power of Moonga (Red Coral), a potent gemstone revered in astrology for calming Mars's harmful effects and attracting strength, courage, and vitality. Known to boost positivity and physical wellness, it channels divine energy for a balanced life. Worn on the right-hand ring finger starting Tuesday, Munga is also available in pendants. Embrace spiritual harmony and empower your destiny—bring home this powerful gemstone today!

Astrovastubazar’s Premium Red Coral Key Features:
1. Hand-polished for Optimal Energy Flow
2. Perfectly Aligns with Mars (Mangal) Energy
3. Natural, Untreated Color
4. Rich, Blood-red Color with Uniform Saturation

The powerful Red Coral’s metaphysical properties and spiritual qualities calm the malefic (harmful) effect of the planet Mars in an individual's birth (horoscope) and signify its favourable outcomes. Moonga Ratna symbolizes power, courage, positivity, and physical wellness. Consult a prominent Astrology Sansthan like Astrovastubazar for more benefits of the Red Coral according to your individual needs stated in your birth chart. Contact us for more accurate astrology predictions and remedies.`,
    descriptionHindi: `मूंगा (रेड कोरल) की शक्ति को अपनाएँ—यह एक प्रभावशाली रत्न है जिसे ज्योतिष में मंगल के हानिकारक प्रभावों को शांत करने और शक्ति, साहस तथा जीवनशक्ति आकर्षित करने के लिए जाना जाता है। सकारात्मकता और शारीरिक कल्याण को बढ़ावा देने वाला यह रत्न संतुलित जीवन के लिए दिव्य ऊर्जा प्रदान करता है। इसे मंगलवार से दाहिने हाथ की अनामिका में पहना जाता है; यह पेंडेंट के रूप में भी उपलब्ध है। आध्यात्मिक सामंजस्य अपनाएँ और अपने भाग्य को सशक्त करें—आज ही इस शक्तिशाली रत्न को घर लाएँ!

Astrovastubazar के प्रीमियम रेड कोरल की मुख्य विशेषताएँ:
1. ऊर्जा के बेहतर प्रवाह के लिए हाथ से पॉलिश किया गया
2. मंगल की ऊर्जा के साथ पूर्ण सामंजस्य
3. प्राकृतिक, बिना उपचारित रंग
4. गहरा, रक्तिम लाल रंग और एकसमान रंगत

शक्तिशाली रेड कोरल के आध्यात्मिक और सूक्ष्म गुण जन्म कुंडली में मंगल ग्रह के अशुभ (हानिकारक) प्रभाव को शांत करने और उसके अनुकूल परिणामों का संकेत देने में सहायक माने जाते हैं। मूंगा रत्न शक्ति, साहस, सकारात्मकता और शारीरिक कल्याण का प्रतीक है। अपनी जन्म कुंडली में बताई गई व्यक्तिगत आवश्यकताओं के अनुसार रेड कोरल के लाभ जानने के लिए Astrovastubazar जैसे प्रतिष्ठित ज्योतिष संस्थान से सलाह लें। अधिक सटीक ज्योतिषीय भविष्यवाणियों और उपायों के लिए हमसे संपर्क करें।`,
    benefitsTitleHindi: 'Benefits of Moonga (Red Coral)',
    benefitsTitleEnglish: 'Benefits of Wearing Red Coral',
    wearingMethodTitleHindi: 'रत्न पहनने की विधि',
    wearingMethodTitleEnglish: 'Method of Wearing Red Coral',
    benefitsHindi: 'पारंपरिक ज्योतिषीय मान्यताओं में मूंगा और मंगल ग्रह को परिवार में सामंजस्य, साहस और जीवन की चुनौतियों का सामना करने से जोड़ा जाता है। कुछ लोग इसे भाई-बहनों और पड़ोसियों के साथ संबंध सुधारने, करियर में प्रगति, वैवाहिक जीवन में सुख, क्रोध पर नियंत्रण और संपत्ति संबंधी विवादों के समय आध्यात्मिक सहारे के रूप में धारण करते हैं। नशे की लत या पारिवारिक, मानसिक अथवा स्वास्थ्य संबंधी समस्याओं के इलाज के लिए रत्न प्रभावी होने का कोई स्थापित चिकित्सकीय प्रमाण नहीं है। ऐसी समस्याओं के लिए योग्य पेशेवर से सलाह लें।',
    religiousBeliefHindi: 'पारंपरिक ज्योतिषीय मान्यता के अनुसार, मूंगा धारण करने से मंगल ग्रह के अशुभ प्रभाव धीरे-धीरे कम हो सकते हैं और शुभ फल प्राप्त हो सकते हैं। यह धार्मिक विश्वास है, निश्चित परिणाम की गारंटी नहीं।',
    wearingMethodHindi: 'पारंपरिक सलाह के अनुसार, शुक्ल पक्ष के शुभ योग या मंगल के शुभ नक्षत्र में मंगलवार के दिन इसे गले में धारण किया जाता है। इसे दाहिने हाथ की अनामिका उंगली में अंगूठी के रूप में पहनने की भी मान्यता है। धारण करने से पहले योग्य ज्योतिषी से सलाह लें।',
    benefitsEnglish: 'Traditional astrological beliefs associate Red Coral and Mars with family harmony, courage, and facing life’s challenges. Some people wear it as spiritual support when seeking better relationships with siblings or neighbours, career progress, marital harmony, anger management, or help navigating property disputes. There is no established medical evidence that a gemstone treats addiction or family, mental-health, or medical concerns. Seek help from a qualified professional for these issues.',
    religiousBeliefEnglish: 'According to traditional astrological belief, wearing Red Coral may gradually lessen Mars’s inauspicious effects and invite auspicious results. This is a matter of faith and does not guarantee outcomes.',
    wearingMethodEnglish: 'Traditional guidance suggests wearing it around the neck on a Tuesday during an auspicious Shukla Paksha yoga or Mars’s auspicious nakshatra. It may also be worn as a ring on the ring finger of the right hand. Consult a qualified astrologer before wearing it.',
  },
  'moti-pearl': {
    nameHindi: 'मोती',
    nameEnglish: 'Pearl',
    descriptionEnglish: `Wearing Astrovastubazar Premium South Sea Pearls offers powerful benefits—they promote courage, sharpen the mind, and help calm emotions, making them especially effective in reducing anger. These high-quality gems are particularly beneficial for individuals born under Pisces, Leo, and Sagittarius. By wearing premium pearls, you can experience a greater sense of inner peace and mental clarity. While pearls have no known adverse effects, it's still wise to consult an astrologer to ensure the gem aligns with your personal chart and maximizes its positive impact.

Best Features:
1. Bright Shine, Mirror-like Glow ("Chandrakant" effect)
2. Perfectly Round; Rare and Most Valuable
3. Pure white, like moonlight
4. Flawless Surface with Luxurious Feel

Order now to attract the powerful benefits of Pearl. Attain mental stability in this chaotic and messy world. Enhance career as well as personal growth with increased confidence, concentration, a sense of security, and a happy, healthy mind. Consult a prominent Astrology Sansthan like Astrovastubazar for more benefits of Pearl according to your individual needs stated in your birth chart. Contact us for more accurate astrology advice and personalized remedies.`,
    descriptionHindi: `Astrovastubazar के प्रीमियम साउथ सी पर्ल्स धारण करने से कई शक्तिशाली लाभ मिलने की मान्यता है—ये साहस बढ़ाते हैं, बुद्धि को तेज करते हैं और भावनाओं को शांत करने में मदद करते हैं, जिससे क्रोध कम करने में विशेष रूप से सहायक माने जाते हैं। ये उच्च गुणवत्ता वाले मोती मीन, सिंह और धनु राशि में जन्मे लोगों के लिए खास तौर पर लाभकारी माने जाते हैं। प्रीमियम मोती पहनने से अधिक आंतरिक शांति और मानसिक स्पष्टता का अनुभव हो सकता है। मोतियों के कोई ज्ञात प्रतिकूल प्रभाव नहीं हैं, फिर भी यह सुनिश्चित करने के लिए ज्योतिषी से सलाह लेना समझदारी है कि रत्न आपकी व्यक्तिगत कुंडली के अनुकूल हो और उसके सकारात्मक प्रभाव अधिकतम हों।

मुख्य विशेषताएँ:
1. चमकदार आभा और आईने जैसी चमक ("चंद्रकांत" प्रभाव)
2. पूरी तरह गोल; दुर्लभ और सबसे मूल्यवान
3. चाँदनी जैसी शुद्ध सफेदी
4. दोषरहित सतह और शानदार एहसास

मोती के शक्तिशाली लाभ पाने के लिए अभी ऑर्डर करें। इस अराजक और तनावपूर्ण दुनिया में मानसिक स्थिरता पाएँ। आत्मविश्वास, एकाग्रता और सुरक्षा की भावना बढ़ाकर तथा मन को प्रसन्न और स्वस्थ रखकर करियर और व्यक्तिगत विकास को बेहतर बनाएँ। अपनी जन्म कुंडली में बताई गई व्यक्तिगत आवश्यकताओं के अनुसार मोती के लाभ जानने के लिए Astrovastubazar जैसे प्रतिष्ठित ज्योतिष संस्थान से सलाह लें। अधिक सटीक ज्योतिषीय सलाह और व्यक्तिगत उपायों के लिए हमसे संपर्क करें।`,
    benefitsTitleHindi: 'Benefits of wearing Moti',
    benefitsTitleEnglish: 'Benefits of wearing Pearl Pendant',
    wearingMethodTitleHindi: 'मोती पहनने की विधि',
    wearingMethodTitleEnglish: 'Method of Wearing Pearl',
    benefitsHindi: 'पारंपरिक मान्यताओं में मोती को जीवन की चुनौतियों के समय सुख, शांति, समृद्धि और भावनात्मक संतुलन की कामना से जोड़ा जाता है। कुछ लोग इसे आराम और तनाव से राहत की आशा में धारण करते हैं। चंद्रमा से जुड़ी ज्योतिषीय मान्यताओं में मोती को माँ और परिवार से जुड़ी चिंताओं, बच्चों की पढ़ाई, बुरी संगत, घरेलू सामंजस्य, कामकाज के उतार-चढ़ाव तथा संपत्ति और आर्थिक मामलों में आध्यात्मिक सहारे के रूप में भी देखा जाता है। माँ या बच्चे के स्वास्थ्य, आँखों की समस्या, मानसिक तनाव, संपत्ति के नुकसान या आर्थिक धोखाधड़ी से बचाव के लिए मोती प्रभावी होने का कोई स्थापित चिकित्सकीय या वैज्ञानिक प्रमाण नहीं है। स्वास्थ्य संबंधी समस्याओं के लिए योग्य चिकित्सक से सलाह लें।',
    religiousBeliefHindi: 'पारंपरिक ज्योतिषीय मान्यता के अनुसार, मोती धारण करने से चंद्र ग्रह के अशुभ प्रभाव धीरे-धीरे कम हो सकते हैं और शुभ फल प्राप्त हो सकते हैं। यह धार्मिक विश्वास है, निश्चित परिणाम की गारंटी नहीं।',
    wearingMethodHindi: 'पारंपरिक सलाह के अनुसार, शुक्ल पक्ष के शुभ योग या चंद्रमा के शुभ नक्षत्र में सोमवार के दिन इसे गले में धारण किया जाता है। इसे दाहिने हाथ की कनिष्ठा उंगली में अंगूठी के रूप में पहनने की भी मान्यता है। धारण करने से पहले योग्य ज्योतिषी से सलाह लें।',
    benefitsEnglish: 'Traditional beliefs associate Pearl with the hope of happiness, peace, prosperity, and emotional balance when facing life’s challenges. Some people wear it in the hope of feeling more at ease or finding relief from stress. In lunar astrology, it is also viewed by some as spiritual support for concerns involving a mother and family, children’s education, negative influences, domestic harmony, changing circumstances, property, and finances. There is no established medical or scientific evidence that Pearl improves a mother’s or child’s health, treats eye conditions or stress, prevents property loss, or protects against financial fraud. Consult a qualified medical professional for health concerns.',
    religiousBeliefEnglish: 'According to traditional astrological belief, wearing Pearl may gradually lessen the Moon’s inauspicious effects and invite auspicious results. This is a matter of faith and does not guarantee outcomes.',
    wearingMethodEnglish: 'Traditional guidance suggests wearing it around the neck on a Monday during an auspicious Shukla Paksha yoga or the Moon’s auspicious nakshatra. It may also be worn as a ring on the little finger of the right hand. Consult a qualified astrologer before wearing it.',
  },
  'manikya-ruby': {
    nameHindi: 'माणिक्य',
    nameEnglish: 'Ruby',
    descriptionEnglish: `Ruby, also called Manikya, is a powerful and sacred gemstone that brings many benefits to the person who wears it. It is linked with the Sun, the planet of success and power, and is believed to give its blessings to the wearer. Wearing Ruby can help you become more confident, do well in your job, and build strong leadership skills. It also looks beautiful with its bright red shine. Ruby is said to carry the Sun’s positive energy and reduce its bad effects in your life. You can wear Ruby on the ring finger of your right hand or as a pendant around your neck, starting on a Sunday.

Astrovastubazar’s Premium Ruby Key Features:
1. Exceptional Hardness
2. Glossy Vitreous Finish
3. Expertly Faceted for Symmetrical Proportions
4. Rich, Vibrant "Crimson Red" with Strong Lustre
5. Natural, High-energy Resonance for Sun (Surya) Planetary Benefits

Wearing Ruby (Manikya) enhances professional excellence, boosts confidence, and cultivates leadership qualities. Astrologically linked to the Sun, it brings the planet's blessings, promoting success in career and personal growth. Hence, wait no more, order Astrovastubazar 100% Original Ruby to harness the power of the Sun, the king of planets. Consult a prominent Astrology Sansthan like Astrovastubazar for more benefits of Ruby according to your individual needs stated in your birth chart. Contact us for more accurate astrology predictions and remedies.`,
    descriptionHindi: `रूबी, जिसे माणिक्य भी कहा जाता है, एक शक्तिशाली और पवित्र रत्न है जो इसे धारण करने वाले व्यक्ति को कई लाभ प्रदान करता है। इसका संबंध सफलता और शक्ति के ग्रह सूर्य से है और मान्यता है कि यह धारण करने वाले को सूर्य का आशीर्वाद देता है। रूबी पहनने से आत्मविश्वास बढ़ाने, नौकरी में अच्छा प्रदर्शन करने और नेतृत्व के मज़बूत गुण विकसित करने में मदद मिल सकती है। इसकी चमकीली लाल आभा इसे सुंदर भी बनाती है। माना जाता है कि रूबी सूर्य की सकारात्मक ऊर्जा लाता है और जीवन में उसके बुरे प्रभावों को कम करता है। इसे रविवार से दाहिने हाथ की अनामिका में या गले में पेंडेंट के रूप में पहन सकते हैं।

Astrovastubazar के प्रीमियम रूबी की मुख्य विशेषताएँ:
1. असाधारण कठोरता
2. चमकदार काँच जैसी फिनिश
3. सममित अनुपात के लिए विशेषज्ञता से तराशा गया
4. गहरा, जीवंत "क्रिमसन रेड" रंग और तेज चमक
5. सूर्य ग्रह के लाभों के लिए प्राकृतिक, उच्च-ऊर्जा अनुनाद

रूबी (माणिक्य) धारण करने से पेशेवर उत्कृष्टता, आत्मविश्वास और नेतृत्व के गुणों को बढ़ावा मिलता है। ज्योतिष में इसका संबंध सूर्य से है; मान्यता है कि यह करियर में सफलता और व्यक्तिगत विकास को बढ़ावा देने के लिए सूर्य का आशीर्वाद लाता है। इसलिए देर न करें—ग्रहों के राजा सूर्य की शक्ति पाने के लिए Astrovastubazar का 100% असली रूबी ऑर्डर करें। अपनी जन्म कुंडली में बताई गई व्यक्तिगत आवश्यकताओं के अनुसार रूबी के लाभ जानने के लिए Astrovastubazar जैसे प्रतिष्ठित ज्योतिष संस्थान से सलाह लें। अधिक सटीक ज्योतिषीय भविष्यवाणियों और उपायों के लिए हमसे संपर्क करें।`,
    benefitsTitleHindi: 'Benefits of Manikya (Ruby)',
    benefitsTitleEnglish: 'Benefits of Manikya (Ruby)',
    wearingMethodTitleHindi: 'रत्न पहनने की विधि',
    wearingMethodTitleEnglish: 'Method of Wearing Ruby',
    benefitsHindi: 'पारंपरिक ज्योतिषीय मान्यताओं में माणिक्य और सूर्य को आत्मविश्वास, खुशहाली, समृद्धि, शिक्षा में सफलता और कार्यों को पूरा करने के संकल्प से जोड़ा जाता है। कुछ लोग इसे करियर और सरकारी नौकरी की आकांक्षाओं, प्रगति तथा पारिवारिक चिंताओं के समय आध्यात्मिक सहारे के रूप में धारण करते हैं। हृदय, आँखों, रक्तचाप या अन्य शारीरिक अथवा मानसिक स्वास्थ्य समस्याओं के इलाज के लिए रत्न प्रभावी होने का कोई स्थापित चिकित्सकीय प्रमाण नहीं है। स्वास्थ्य संबंधी चिंताओं के लिए योग्य चिकित्सक से सलाह लें।',
    religiousBeliefHindi: 'पारंपरिक ज्योतिषीय मान्यता के अनुसार, सूर्य रत्न अमृत धारण करने से सूर्य ग्रह के अशुभ प्रभाव धीरे-धीरे कम हो सकते हैं और शुभ फल प्राप्त हो सकते हैं। यह धार्मिक विश्वास है, निश्चित परिणाम की गारंटी नहीं।',
    wearingMethodHindi: 'पारंपरिक सलाह के अनुसार, शुक्ल पक्ष के शुभ योग में रविवार के दिन अथवा सूर्य के शुभ नक्षत्र में इसे गले में धारण किया जाता है। इसे दाहिने हाथ की अनामिका उंगली में अंगूठी के रूप में पहनने की भी मान्यता है। धारण करने से पहले योग्य ज्योतिषी से सलाह लें।',
    benefitsEnglish: 'Traditional astrological beliefs associate Ruby and the Sun with confidence, happiness, prosperity, educational success, and determination in completing tasks. Some people wear it as spiritual support for career or government-job aspirations, progress, and family concerns. There is no established medical evidence that a gemstone treats heart or eye conditions, high blood pressure, or other physical or mental health concerns. Consult a qualified medical professional for health concerns.',
    religiousBeliefEnglish: 'According to traditional astrological belief, wearing Ruby may gradually lessen the Sun’s inauspicious effects and invite auspicious results. This is a matter of faith and does not guarantee outcomes.',
    wearingMethodEnglish: 'Traditional guidance suggests wearing it around the neck on a Sunday during an auspicious Shukla Paksha yoga or the Sun’s auspicious nakshatra. It may also be worn as a ring on the ring finger of the right hand. Consult a qualified astrologer before wearing it.',
  },
};

const gemstoneDetailSlugAliases = {
  'blue-sapphire-neelam': 'neelam-blue-sapphire',
  'yellow-sapphire-pukhraj': 'pukhraj-yellow-sapphire',
  'emerald-panna': 'panna-emerald',
  'cat-s-eye-lahsuniya': 'lahsuniya-cat-s-eye',
  'hessonite-garnet-gomed': 'gomed-hessonite-garnet',
  'red-coral-moonga': 'moonga-red-coral',
  'pearl-moti': 'moti-pearl',
  'ruby-manikya': 'manikya-ruby',
};

const rattiOptions = ['5.25', '6.25', '7.25', '8.25', '9.25'];
const gemstoneTypes = ['Ring', 'Pendant', 'Raw'];

const kundliForOptions = [
  'Your Self',
  'Father In Law',
  'Younger Brother/Sister',
  'Mother',
  'Father/Son',
  'Mama/Bhanja/Bua/Brother In law(Saala)',
  'Spouse',
  'Daada Ji',
  'Chacha',
  'Elder Brother/Sister/Tau',
  'Ph. Relation',
];

const GemstoneDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = useMemo(
    () => gemstoneProducts.find((item) => getGemstoneProductSlug(item.name) === slug),
    [slug],
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [descriptionLanguage, setDescriptionLanguage] = useState('en');
  const thumbnailRailRef = useRef(null);
  const kundliForMenuRef = useRef(null);
  const [isKundliForMenuOpen, setIsKundliForMenuOpen] = useState(false);
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
    () => (product
      ? [...new Set([
        product.image,
        product.hoverImage,
        ...(product.detailImages || []),
        ...(product.ringImages || []),
        ...(product.pendantImages || []),
      ].filter(Boolean))]
      : []),
    [product],
  );

  useEffect(() => {
    setQuantity(1);
    setActiveImage(0);
    setDescriptionLanguage('en');
    setIsKundliForMenuOpen(false);
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

  useEffect(() => {
    if (!isKundliForMenuOpen) return undefined;

    const closeOnOutsideClick = (event) => {
      if (!kundliForMenuRef.current?.contains(event.target)) {
        setIsKundliForMenuOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsKundliForMenuOpen(false);
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isKundliForMenuOpen]);

  useEffect(() => {
    const rail = thumbnailRailRef.current;
    const activeThumbnail = rail?.querySelector(`[data-thumbnail-index="${activeImage}"]`);
    if (!rail || !activeThumbnail) return;

    rail.scrollTo({
      left: rail.scrollLeft + activeThumbnail.getBoundingClientRect().left - rail.getBoundingClientRect().left,
      behavior: activeImage === 0 ? 'auto' : 'smooth',
    });
  }, [activeImage, gallery.length]);

  if (!product) return <Navigate to="/gemstone" replace />;

  const quality = product.category.replace('Gemstone - ', '');
  const details = gemstoneDetails[gemstoneDetailSlugAliases[slug] || slug];
  const descriptionText = (descriptionLanguage === 'hi'
    ? details?.descriptionHindi
    : details?.descriptionEnglish
  ) || (descriptionLanguage === 'hi'
    ? 'उत्पाद का विवरण जल्द जोड़ा जाएगा।'
    : 'Product description will be added soon.');
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

  const showPreviousImage = () => {
    setActiveImage((currentImage) => (currentImage - 1 + gallery.length) % gallery.length);
  };

  const showNextImage = () => {
    setActiveImage((currentImage) => (currentImage + 1) % gallery.length);
  };

  return (
    <main className="min-h-screen bg-[#f8f6f1] px-4 text-[#231416] sm:px-6 xl:px-10">
      <div className="mx-auto max-w-[1440px]">
        <section className="grid items-start gap-6 py-6 pb-8 sm:gap-8 sm:py-8 lg:grid-cols-2 lg:gap-8 lg:py-10 xl:gap-10">
          <div className="mx-auto min-w-0 w-full max-w-md lg:max-w-none">
            <div className="flex flex-col gap-10 sm:gap-12">
              <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-white">
                <img
                  key={gallery[activeImage]}
                  src={gallery[activeImage]}
                  alt={product.name}
                  className="h-full w-full object-contain"
                />
                {gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={showPreviousImage}
                      aria-label="Show previous product image"
                      className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#231416]/10 bg-white/90 text-[#231416] shadow-md transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1519]"
                    >
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={showNextImage}
                      aria-label="Show next product image"
                      className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#231416]/10 bg-white/90 text-[#231416] shadow-md transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1519]"
                    >
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </>
                )}
              </div>
              {gallery.length > 1 && (
                <div
                  ref={thumbnailRailRef}
                  className="flex w-full flex-nowrap items-center justify-start gap-4 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5"
                >
                  {gallery.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      data-thumbnail-index={index}
                      onClick={() => setActiveImage(index)}
                      aria-label={`Show product image ${index + 1}`}
                      aria-pressed={activeImage === index}
                      className={`h-20 w-20 shrink-0 overflow-hidden rounded border bg-white transition sm:h-24 sm:w-24 xl:h-28 xl:w-28 ${
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
                <section aria-labelledby="gemstone-benefits-hi" lang="hi" style={{ fontFamily: "'Nirmala UI', 'Mangal', sans-serif" }}>
                  <h2 id="gemstone-benefits-hi" className="font-normal text-[#925C2D]">
                    {details.benefitsTitleHindi}
                  </h2>
                  <p className="mt-1">{details.benefitsHindi}</p>
                  <p className="mt-2">Brand: Astrovastubazar</p>
                  <p>रत्न: {details.nameHindi}</p>
                  <p className="mt-2">धार्मिक मान्यता: {details.religiousBeliefHindi}</p>
                  <p className="mt-2">{details.wearingMethodTitleHindi}: {details.wearingMethodHindi}</p>
                </section>

                <section aria-labelledby="gemstone-benefits-en">
                  <h2 id="gemstone-benefits-en" className="font-normal text-[#925C2D]">
                    {details.benefitsTitleEnglish}
                  </h2>
                  <p className="mt-1">{details.benefitsEnglish}</p>
                  <p className="mt-2">Brand: Astrovastubazar</p>
                  <p>Gem: {details.nameEnglish}</p>
                  <p className="mt-2">Religious Belief: {details.religiousBeliefEnglish}</p>
                  <p className="mt-2">{details.wearingMethodTitleEnglish}: {details.wearingMethodEnglish}</p>
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

              <div ref={kundliForMenuRef} className="relative block text-sm text-[#302522]">
                <span className="mb-1 block">Kundli for</span>
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={isKundliForMenuOpen}
                  aria-controls="gemstone-kundli-for-options"
                  onClick={() => setIsKundliForMenuOpen((isOpen) => !isOpen)}
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowDown') {
                      event.preventDefault();
                      setIsKundliForMenuOpen(true);
                    }
                  }}
                  className="flex h-10 w-full items-center justify-between rounded border border-[#231416]/20 bg-white px-2.5 text-left text-sm outline-none focus:border-[#7A1519]"
                >
                  <span className={kundliDetails.kundliFor ? 'text-[#302522]' : 'text-[#9a8d8f]'}>
                    {kundliDetails.kundliFor || 'Kundli For'}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-[#8a7b7d] transition-transform ${isKundliForMenuOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                {isKundliForMenuOpen && (
                  <div
                    id="gemstone-kundli-for-options"
                    role="listbox"
                    aria-label="Kundli for"
                    className="absolute left-0 top-full z-30 mt-1 max-h-56 w-full overflow-y-auto border border-[#231416]/20 bg-white py-1 shadow-lg"
                  >
                    {kundliForOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        role="option"
                        aria-selected={kundliDetails.kundliFor === option}
                        onClick={() => {
                          setKundliDetails((current) => ({ ...current, kundliFor: option }));
                          setIsKundliForMenuOpen(false);
                        }}
                        className={`block w-full px-3 py-2 text-left text-sm transition hover:bg-[#F8F1EF] focus-visible:bg-[#F8F1EF] focus-visible:outline-none ${
                          kundliDetails.kundliFor === option ? 'bg-[#F8F1EF] text-[#7A1519]' : 'text-[#231416]'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>

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

      <section aria-label="Product description" className="mx-auto max-w-[1440px] px-4 sm:px-6 xl:px-10">
        <div className="pt-2 pb-8 sm:pt-3 sm:pb-10 lg:pt-4">
          <div role="tablist" aria-label="Description language" className="flex gap-6 border-b border-[#231416]/10">
            {[
              { id: 'en', label: 'English Description' },
              { id: 'hi', label: 'हिंदी विवरण' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`gemstone-description-tab-${tab.id}`}
                aria-selected={descriptionLanguage === tab.id}
                aria-controls="gemstone-description-panel"
                onClick={() => setDescriptionLanguage(tab.id)}
                className={`border-b-2 px-1 pb-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1519] ${
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
            id="gemstone-description-panel"
            role="tabpanel"
            aria-labelledby={`gemstone-description-tab-${descriptionLanguage}`}
            lang={descriptionLanguage === 'hi' ? 'hi' : 'en'}
            className="pt-5 text-base leading-7 text-[#3a2c2e]"
            style={descriptionLanguage === 'hi' ? { fontFamily: "'Nirmala UI', 'Mangal', sans-serif" } : undefined}
          >
            {descriptionText.split(/\n+/).map((paragraph, index) => (
              paragraph.trim() && <p key={index}>{paragraph.trim()}</p>
            ))}
          </div>
        </div>
      </section>

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
