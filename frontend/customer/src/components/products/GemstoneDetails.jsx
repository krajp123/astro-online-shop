import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Minus, Package, Plus, ShoppingBag, Star, Truck } from 'lucide-react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useCustomerStore } from '../../store/useCustomerStore';
import gemstoneProducts, { getGemstoneProductSlug } from '../../data/gemstoneProducts';

const gemstoneDetails = {
  'neelam-blue-sapphire': {
    nameHindi: 'नीलम',
    nameEnglish: 'Blue Sapphire',
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
                  <p className="mt-2">Brand: Astroscience</p>
                  <p>रत्न: {details.nameHindi}</p>
                  <p className="mt-2">धार्मिक मान्यता: {details.religiousBeliefHindi}</p>
                  <p className="mt-2">{details.wearingMethodTitleHindi}: {details.wearingMethodHindi}</p>
                </section>

                <section aria-labelledby="gemstone-benefits-en">
                  <h2 id="gemstone-benefits-en" className="font-normal text-[#925C2D]">
                    {details.benefitsTitleEnglish}
                  </h2>
                  <p className="mt-1">{details.benefitsEnglish}</p>
                  <p className="mt-2">Brand: Astroscience</p>
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
