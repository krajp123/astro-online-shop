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
    brand: 'astrovastubazar',
    nameHindi: 'श्री बगलामुखी यंत्र',
    nameEnglish: 'Shree Bagla Mukhi Yantra',
    beliefHindi:
      'श्री बगलामुखी यंत्र पूजा स्थान या अपने मन्दिर में स्थापित करने से, कार्यक्षेत्र में सुख-समृद्धि, धन-वैभव व कारोबार में उच्च लाभ अर्जित कर सकता है।',
    beliefEnglish:
      'By installing the Shree Baglamukhi Yantra in a place of worship or in your temple, one can seek happiness, prosperity, wealth, and higher profits in business.',
    benefitsHindi: [
      'विशेष रूप से शिक्षा और धन संबंधी क्षेत्रों में रोगों, व्याधियों और मानसिक तनाव से पीड़ित लोगों के लिए।',
      'शत्रुओं की परेशानियों से मुक्ति पाने और उनके भय को दूर करने के लिए लाभकारी यंत्र।',
      'जिन व्यक्तियों को दुर्घटना का भय हो, वे बगलामुखी यंत्र पूजा-स्थान में रखें।',
      'कोर्ट-कचहरी से संबंधित मामलों में जीत हासिल करने की कामना से स्थापित किया जाता है।',
      'चतुराई से बात करने की कला विकसित करने और उससे लाभ पाने में सहायक माना जाता है।',
      'शत्रुओं पर विजय की कामना से स्थापित किया जाता है।',
      'अपने मंदिर में रखें और प्रसिद्धि तथा धन-लाभ की कामना से पूजा करें।',
    ],
    benefitsEnglish: [
      'Traditionally intended for people experiencing ailments and mental stress in areas related to education and finances.',
      'Considered beneficial by those seeking relief from enemy-related troubles and fear.',
      'Traditionally kept in a place of worship by people concerned about accidents.',
      'Installed with the intention of seeking success in court-related matters.',
      'Associated with developing skillful communication and benefiting from it.',
      'Installed with the intention of seeking victory over adversaries.',
      'Keep it in your temple and worship with the intention of seeking fame and financial gains.',
    ],
  },
  'Madhya Shakti Peeth Yantra': {
    brand: 'astrovastubazar',
    nameHindi: 'मध्य शक्तिपीठ यंत्र',
    descriptionHindi:
      '"मध्य शक्तिपीठ यंत्र" एक ज्योति के रूप में काम करता है। यह ब्रह्मांड में फैली सकारात्मक ऊर्जाओं को एकत्रित करके आपके माहौल में लाता है और आपको अपनी अभिलाषाओं की ओर नई दृष्टि और समर्पण के साथ प्रेरित करता है। इसकी शुभ शक्तियों का उपयोग करके आप अपने चुने हुए क्षेत्र में अभूतपूर्व सफलता और पहचान हासिल करने के लिए जीवन में नए आयाम अनुभव कर सकते हैं। प्राण-प्रतिष्ठित यंत्र आपके घर में ऊर्जा का स्रोत होता है और उपरोक्त लाभों में सहायक माना जाता है।',
    beliefHindi:
      'मध्य शक्तिपीठ यंत्र कार्यालय में कार्यक्षेत्र की सुख-समृद्धि, धन-वैभव और कारोबार में उच्च लाभ की कामना से स्थापित किया जाता है।',
    benefitsHindi: [
      'मध्य शक्तिपीठ यंत्र को अपने काम या व्यवसाय में खुशी की कामना से स्थापित करें।',
      'अपने काम-काज में सुख पाने के लिए।',
      'रुपये-पैसे की बरकत की कामना के लिए।',
      'सुख-समृद्धि और सहकर्मियों से सहयोग पाने के लिए।',
      'कार्यक्षेत्र में शत्रुओं से छुटकारा पाने की कामना के लिए।',
      'व्यापार को आगे बढ़ाने के लिए।',
      'इस यंत्र को मंगवाकर अपने घर या कार्यस्थल पर स्थापित कर सकते हैं।',
    ],
  },
  'Sarv Shakti Peeth Yantra': {
    brand: 'astrovastubazar',
    nameHindi: 'सर्व शक्तिपीठ यंत्र',
    nameEnglish: 'Sarv Shaktipeeth Yantra',
    descriptionHindi:
      '"सर्व शक्तिपीठ यंत्र" एक ज्योति के रूप में काम करता है, ब्रह्मांड में फैली पाज़िटिव उर्जायों को एकत्रित करके आपके माहौल में लाकर आपको अपनी अभिलाषाओं की ओर नई दृष्टि और समर्पण के साथ प्रेरित करता है। इसकी शुभ शक्तियों को उपयोग करके अपने चयनित क्षेत्र में अभूतपूर्व सफलता और पहचान हासिल करने के लिए जीवन में नए आयाम अनुभव कर सकते हैं। प्राण प्रतिष्ठित किया यंत्र आपके घर में अपने आप में एक ऊर्जा का स्त्रोत होता है जो आपको उपरोक्त फायदे देता है।',
    beliefHindi:
      'सर्व शक्तिपीठ यंत्र कार्यालय में स्थापित करने से कार्यक्षेत्र में सुख-समृद्धि, धन-वैभव व कारोबार में उच्च लाभ अर्जित करने के लिए स्थापित किया जाता है।',
    benefitsHindi: [
      'व्यापार, कार्यालय को सफलता की ऊँचाइयों पर पहुँचाने के लिए।',
      'धन लाभ का सुख-वैभव पाने के लिए।',
      'कारोबार में समृद्धि प्राप्त करने के लिए।',
      'सुख-समृद्धि में लाभ के लिए।',
      'कार्यक्षेत्र में उच्च चमक लाने के लिए शुभ और अनुकूल हैं।',
      'मानसिक चिंताओं को दूर करने के लिए।',
      'सकारात्मक ऊर्जा के साथ व्यापार में नई ऊँचाइयाँ प्राप्त करने के लिए।',
      'व्यापार में मनचाहा लाभ अर्जित करने के लिए।',
      'सर्व शक्तिपीठ यंत्र को मंगवाकर अपने कार्यालय में स्थापित कर सकते हैं।',
    ],
    beliefEnglish:
      'Sarv Shaktipeeth Yantra is installed in the office with the intention of inviting happiness, prosperity, wealth, and higher business gains in the workplace.',
    benefitsEnglish: [
      'To help take a business or office to new heights of success.',
      'To seek prosperity, wealth, and abundance.',
      'To invite prosperity in business.',
      'To seek happiness and prosperity.',
      'Traditionally considered auspicious for bringing greater success to the workplace.',
      'To help ease mental worries.',
      'To seek new heights in business with positive energy.',
      'To seek desired gains in business.',
      'You can order the Sarv Shaktipeeth Yantra and install it in your office.',
    ],
  },
  'Rog Nivaran Yantra': {
    brand: 'astrovastubazar',
    nameHindi: 'रोग निवारण यंत्र',
    nameEnglish: 'Rog Nivaran Yantra',
    beliefHindi:
      'परंपरागत आध्यात्मिक मान्यता के अनुसार, कुछ लोग रोग निवारण यंत्र को घर में स्वास्थ्य, सकारात्मकता और मन की शांति के लिए प्रार्थना के प्रतीक के रूप में स्थापित करते हैं। यह किसी बीमारी का इलाज या दवाइयों और चिकित्सकीय देखभाल का विकल्प नहीं है।',
    beliefEnglish:
      'According to traditional spiritual belief, some people place the Rog Nivaran Yantra at home as a symbol of prayers for well-being, positivity, and peace of mind. It does not treat disease or replace medicine or professional medical care.',
    benefitsHindi: [
      'स्वास्थ्य और मानसिक शांति की कामना के साथ आध्यात्मिक साधना में शामिल किया जा सकता है।',
      'शारीरिक कुशलता और सकारात्मकता के लिए प्रार्थना का प्रतीक।',
      'दैनिक काम और कार्यक्षेत्र के तनाव के बीच ध्यान एवं मनन के लिए उपयोग किया जा सकता है।',
      'स्वस्थ दिनचर्या और समय पर कार्य पूरे करने के संकल्प की याद दिला सकता है।',
      'मानसिक शांति और सकारात्मकता की कामना से पूजा-स्थान में स्थापित कर सकते हैं।',
      'बीमारी या दवाइयों के अप्रभावी होने पर योग्य स्वास्थ्य-विशेषज्ञ से सलाह लें और निर्धारित उपचार जारी रखें; यंत्र चिकित्सा का विकल्प नहीं है।',
    ],
    benefitsEnglish: [
      'May be included in spiritual practice as a prayer for well-being and peace of mind.',
      'A symbol of prayers for physical well-being and positivity.',
      'Can be used as a focus for reflection amid everyday work and workplace stress.',
      'May serve as a reminder to maintain a healthy routine and complete daily tasks mindfully.',
      'May be placed in a prayer space as part of a spiritual practice for peace of mind.',
      'For illness or if medicines do not seem effective, consult a qualified healthcare professional and continue prescribed care; the yantra is not a substitute for medical treatment.',
    ],
  },
  'Shakti Peeth Yantra': {
    brand: 'astrovastubazar',
    nameHindi: 'शक्तिपीठ यंत्र',
    nameEnglish: 'Shaktipeeth Yantra',
    descriptionHindi:
      '"शक्तिपीठ यंत्र" एक ज्योति के रूप में काम करता है। यह ब्रह्मांड में फैली सकारात्मक ऊर्जाओं को एकत्रित करके आपके माहौल में लाता है और आपको अपनी अभिलाषाओं की ओर नई दृष्टि और समर्पण के साथ प्रेरित करता है। इसकी शुभ शक्तियों का उपयोग करके आप अपने चयनित क्षेत्र में अभूतपूर्व सफलता और पहचान हासिल करने के लिए जीवन में नए आयाम अनुभव कर सकते हैं। प्राण-प्रतिष्ठित यंत्र आपके घर में ऊर्जा का स्रोत होता है और उपरोक्त लाभों में सहायक माना जाता है।',
    beliefHindi:
      'शक्तिपीठ सामान्य रूप से उस पवित्र स्थान या केंद्र को कहते हैं जहाँ शक्ति (शक्ति) का निवास माना जाता है। शक्ति से तात्पर्य देवी शक्ति से है। शक्तिपीठ यंत्र जीवन में ग्रहों की कृपा, शुभता और समग्र कल्याण की कामना के लिए है।',
    benefitsHindi: [
      'अपने काम-काज में सुख पाने के लिए।',
      'रुपये-पैसे की बरकत की कामना के लिए।',
      'सुख-समृद्धि के लिए सहकर्मियों से सहयोग पाने हेतु।',
      'कार्यक्षेत्र में शत्रुओं से छुटकारा पाने की कामना के लिए।',
      'व्यापार को आगे बढ़ाने के लिए।',
      'इसे मंगवाकर अपने घर या कार्यस्थल पर स्थापित कर सकते हैं।',
    ],
    descriptionEnglish:
      'Shaktipeeth Yantra is described as a source of light that gathers positive energies in the universe and brings them into your surroundings, inspiring you to pursue your aspirations with renewed perspective and dedication. Its auspicious energy is traditionally associated with seeking exceptional success and recognition in your chosen field. A consecrated yantra is regarded as a source of spiritual energy for the home.',
    beliefEnglish:
      'Shakti Peetha generally refers to a sacred place or centre where Shakti (power), the Goddess, is believed to reside. Shaktipeeth Yantra is intended as a spiritual symbol for seeking planetary blessings, auspiciousness, and overall well-being.',
    benefitsEnglish: [
      'For a greater sense of fulfilment in your work.',
      'A symbol of prayers for financial prosperity and abundance.',
      'For seeking support from colleagues toward happiness and prosperity.',
      'For seeking relief from adversaries in the workplace.',
      'For supporting business growth.',
      'You can order this yantra and place it at home or at your workplace.',
    ],
  },
  'Shani Yantra': {
    brand: 'astrovastubazar',
    nameHindi: 'शाकनी यंत्र',
    nameEnglish: 'Shakni Yantra',
    beliefHindi:
      'परंपरागत आध्यात्मिक मान्यता के अनुसार, शाकनी यंत्र को ऊपरी बाधाओं, किए-कराए, जादू-टोने और वशीकरण जैसी आशंकाओं से मुक्ति की प्रार्थना के प्रतीक के रूप में स्थापित किया जाता है। ये मान्यताएँ व्यक्तिगत आस्था पर आधारित हैं और किसी परिणाम की गारंटी नहीं देतीं।',
    beliefEnglish:
      'According to traditional spiritual belief, the Shakni Yantra may be installed as a symbol of prayer by those seeking relief from perceived spiritual obstacles, witchcraft, or vashikaran. These beliefs are a matter of personal faith and do not guarantee any outcome.',
    benefitsHindi: [
      'कार्यस्थल या व्यापार में जादू-टोने की आशंका होने पर आध्यात्मिक आस्था के प्रतीक के रूप में स्थापित कर सकते हैं।',
      'कार्यक्षेत्र में लाभ और उन्नति की कामना के लिए।',
      'घर में नकारात्मक प्रभाव या शत्रु द्वारा किए-कराए की आशंका से मुक्ति की प्रार्थना के लिए।',
      'वशीकरण से प्रभावित होने की आशंका में आध्यात्मिक साधना के हिस्से के रूप में उपयोग कर सकते हैं।',
      'किसी भी प्रकार के जादू-टोने की आशंका से मुक्ति की प्रार्थना के लिए।',
    ],
    benefitsEnglish: [
      'May be installed as a spiritual symbol by those concerned about witchcraft affecting their workplace or business.',
      'Used with the intention of seeking gains and progress at work.',
      'A symbol of prayer for relief from perceived negative influences or harm at home.',
      'May be included in spiritual practice by those concerned about vashikaran.',
      'Used as a symbol of prayer by those seeking relief from perceived witchcraft.',
    ],
  },
  'Shree Shodashi Yantra': {
    brand: 'astrovastubazar',
    nameHindi: 'श्री षोडशी यंत्र',
    nameEnglish: 'Shree Shodashi Yantra',
    beliefHindi:
      'षोडशी यंत्र को देवी ललिता यंत्र भी कहा जाता है। देवी षोडशी को दश महाविद्याओं में से एक माना जाता है।',
    beliefEnglish:
      'Shree Shodashi Yantra is also known as Goddess Lalita Yantra. Devi Shodashi is considered one of the Dasha Mahavidyas.',
    benefitsHindi: [
      'सभी प्रयासों में सफलता की कामना के लिए आध्यात्मिक साधना में शामिल किया जाता है।',
      'घर में सौभाग्य और समृद्धि की प्रार्थना के प्रतीक के रूप में स्थापित कर सकते हैं।',
      'कठिन परिस्थितियों का सामना करते समय आध्यात्मिक चिंतन के लिए उपयोग कर सकते हैं; यह आपातकालीन सहायता का विकल्प नहीं है।',
      'कार्य में स्थिरता और अनुकूलता की कामना के लिए।',
      'व्यापार और कार्य में सफलता की कामना के लिए।',
      'घर में सुख-शांति की प्रार्थना के लिए।',
      'समग्र सुख-शांति की कामना के लिए।',
    ],
    benefitsEnglish: [
      'May be included in spiritual practice as a prayer for success in all endeavours.',
      'May be placed at home as a symbol of prayers for good fortune and prosperity.',
      'Can be used for spiritual reflection when facing difficult circumstances; it is not a substitute for emergency assistance.',
      'Used with the intention of seeking stability and favourable conditions at work.',
      'Used with the intention of seeking success in business and work.',
      'A symbol of prayers for peace and happiness at home.',
      'Associated with prayers for overall happiness and peace.',
    ],
  },
  'Nazar Dosh Yantra': {
    brand: 'astrovastubazar',
    nameHindi: 'नजरदोष यंत्र',
    nameEnglish: 'Nazar Dosh Yantra',
    beliefHindi:
      'परंपरागत आध्यात्मिक मान्यता के अनुसार, कुछ लोग नजरदोष यंत्र को घर या कार्यालय में धन-धान्य, सुख-शांति और तनाव से राहत की कामना तथा बुरी नजर या नकारात्मकता से बचाव की प्रार्थना के प्रतीक के रूप में स्थापित करते हैं। ये मान्यताएँ व्यक्तिगत आस्था पर आधारित हैं और किसी परिणाम की गारंटी नहीं देतीं।',
    beliefEnglish:
      'According to traditional spiritual belief, some people place the Nazar Dosh Yantra at home or in the office as a symbol of prayers for well-being, peace of mind, relief from stress, and protection from the evil eye or negativity. These beliefs are a matter of personal faith and do not guarantee protection from harm or financial loss.',
    benefitsHindi: [
      'घर या कार्यालय में सकारात्मक वातावरण की कामना के लिए आध्यात्मिक साधना में शामिल कर सकते हैं।',
      'मन की शांति और तनाव से राहत की कामना के लिए प्रार्थना का प्रतीक।',
      'कार्यक्षेत्र की बाधाओं से निपटने के लिए सकारात्मक चिंतन की याद दिला सकता है।',
      'धन-धान्य की सुरक्षा की कामना के साथ अनावश्यक खर्चों से बचने और सोच-समझकर धन उपयोग करने का स्मरण।',
      'चुस्ती-फुर्ती और स्वस्थ दिनचर्या की कामना के लिए।',
      'परिवार में शांति और सद्भाव की प्रार्थना के लिए।',
      'नकारात्मकता से बचाव और सकारात्मकता की कामना के लिए।',
      'सकारात्मक ऊर्जा और आशावादी दृष्टिकोण की कामना के लिए।',
    ],
    benefitsEnglish: [
      'May be included in spiritual practice with the intention of fostering a positive atmosphere at home or in the office.',
      'A symbol of prayers for peace of mind and relief from stress.',
      'May serve as a reminder to approach workplace challenges with a positive outlook.',
      'A reminder to be mindful with money and avoid unnecessary expenses, alongside prayers for the well-being of one’s livelihood.',
      'Associated with prayers for vitality and a healthy routine.',
      'A symbol of prayers for peace and harmony in the family.',
      'Used with the intention of seeking protection from negativity.',
      'A symbol of prayers for positive energy and an optimistic outlook.',
    ],
  },
  'Vyapar Yantra': {
    brand: 'astrovastubazar',
    nameHindi: 'व्यापार यंत्र',
    nameEnglish: 'Vyapar Yantra',
    beliefHindi:
      'परंपरागत आध्यात्मिक मान्यता के अनुसार, व्यापार यंत्र को कार्यालय, दुकान या शोरूम में व्यवसाय की उन्नति और व्यापार से जुड़ी चुनौतियों के समाधान की कामना के प्रतीक के रूप में स्थापित किया जाता है। यह व्यावसायिक सफलता या लाभ की गारंटी नहीं देता।',
    beliefEnglish:
      'According to traditional spiritual belief, the Vyapar Yantra may be placed in an office, shop, or showroom as a symbol of prayers for business growth and help with business challenges. It does not guarantee business success or profit.',
    benefitsHindi: [
      'व्यापार के कर्ज से निपटने के संकल्प के साथ आध्यात्मिक साधना में शामिल कर सकते हैं।',
      'व्यापार में अटके धन की वापसी की कामना के लिए।',
      'व्यापार में सफलता और धन-लाभ की कामना के लिए।',
      'व्यवसाय में स्थिरता बनाए रखने की कामना के लिए।',
      'व्यापार से जुड़ी समस्याओं और बाधाओं का सामना करने के लिए सकारात्मक चिंतन की याद दिला सकता है।',
      'बिक्री में वृद्धि और आर्थिक उन्नति की कामना के लिए।',
      'उधारी और धन-हानि से निपटने के लिए सोच-समझकर वित्तीय निर्णय लेने का स्मरण।',
      'धन, सुख और समृद्धि की कामना के लिए।',
      'व्यापार में आने वाली रुकावटों के बीच धैर्य और सकारात्मक दृष्टिकोण बनाए रखने की प्रेरणा।',
    ],
    benefitsEnglish: [
      'May be included in spiritual practice while working toward managing business debt.',
      'A symbol of prayers for the recovery of money tied up in business.',
      'Associated with prayers for business success and financial gains.',
      'Used with the intention of seeking stability in business.',
      'May serve as a reminder to approach business problems and obstacles with a positive outlook.',
      'Associated with prayers for increased sales and financial growth.',
      'A reminder to make thoughtful financial decisions when managing loans and losses.',
      'A symbol of prayers for wealth, happiness, and prosperity.',
      'A spiritual reminder to remain patient and positive when facing business obstacles.',
    ],
  },
  'Mahalaxmi Yantra': {
    brand: 'astrovastubazar',
    nameHindi: 'महालक्ष्मी यंत्र',
    nameEnglish: 'Mahalaxmi Yantra',
    beliefHindi:
      'परंपरागत मान्यता में देवी लक्ष्मी को धन, समृद्धि, वित्तीय लाभ और सौभाग्य का प्रतीक माना जाता है। महालक्ष्मी यंत्र को घर या व्यापार में माँ लक्ष्मी की कृपा और शुभता की प्रार्थना के प्रतीक के रूप में स्थापित किया जाता है। यह धन-वृद्धि या व्यावसायिक लाभ की गारंटी नहीं देता।',
    beliefEnglish:
      'In traditional belief, Goddess Lakshmi is associated with wealth, prosperity, financial well-being, and good fortune. The Mahalaxmi Yantra may be placed at home or in a business as a symbol of prayers for her blessings and auspiciousness. It does not guarantee increased wealth or business profit.',
    benefitsHindi: [
      'यंत्र के केंद्र में माँ लक्ष्मी की छवि या प्रतीक होता है।',
      'व्यापार या कामकाज में निरंतर प्रगति की कामना के लिए।',
      'व्यापार में सफलता और कार्य में पहचान की प्रार्थना के लिए।',
      'धन और आर्थिक समृद्धि की कामना के लिए।',
      'घर या कार्यालय में शुभता की प्रार्थना के लिए स्थापित कर सकते हैं।',
      'घर में सुख-समृद्धि और शांति की कामना के लिए।',
      'कार्य में प्रगति, वैभव और ऐश्वर्य की कामना के लिए।',
    ],
    benefitsEnglish: [
      'The centre of the yantra features an image or symbol of Goddess Lakshmi.',
      'Used with the intention of praying for continued progress in business or work.',
      'A symbol of prayers for business success and recognition at work.',
      'Associated with prayers for wealth and financial prosperity.',
      'May be placed at home or in an office as a symbol of auspiciousness.',
      'A symbol of prayers for happiness and prosperity at home.',
      'Used with the intention of seeking progress, abundance, and well-being.',
    ],
  },
  'Mesh (Aries) Rashi Yantra': {
    brand: 'astrovastubazar',
    nameHindi: 'मेष राशि यंत्र',
    nameEnglish: 'Mesh (Aries) Rashi Yantra',
    descriptionHindi:
      'पारंपरिक ज्योतिषीय मान्यता के अनुसार, मेष राशि में जन्मे लोग इस विशेष बीज-मंत्र यंत्र को लॉकेट के रूप में धारण कर सकते हैं या अपनी जेब में रख सकते हैं। इसे व्यक्तिगत आस्था और आध्यात्मिक साधना के रूप में देखें; यह चिंता, आर्थिक कठिनाइयों या किसी स्वास्थ्य समस्या का उपचार नहीं है।',
    descriptionEnglish:
      'According to traditional astrological belief, people born under Aries may wear this special seed-mantra yantra as a locket or carry it in a pocket as a personal spiritual practice. It is not a treatment for anxiety, financial difficulties, or any health condition.',
    beliefHindi:
      'परंपरागत मान्यता के अनुसार, मेष राशि यंत्र धारण करना या स्थापित करना सौभाग्य, कार्यक्षेत्र में प्रगति, सुख और समृद्धि की कामना से जुड़ा है।',
    beliefEnglish:
      'According to traditional belief, wearing or placing the Aries Yantra is associated with prayers for good fortune, progress at work, happiness, and prosperity. These are matters of personal faith, not guaranteed outcomes.',
    benefitsHindi: [
      'सौभाग्य और उन्नति की कामना के लिए।',
      'करियर में प्रगति के लिए प्रेरणा के प्रतीक के रूप में।',
      'जीवन में शांति और समृद्धि की प्रार्थना के लिए।',
      'घबराहट, अधीरता, आर्थिक चिंताओं या नाखूनों से जुड़ी समस्या होने पर इसे उपचार न समझें; उपयुक्त स्वास्थ्य या वित्तीय सलाह लें।',
    ],
    benefitsEnglish: [
      'A symbol of prayers for good fortune.',
      'May serve as a personal reminder to pursue career growth.',
      'Associated with prayers for peace and prosperity in life.',
      'It does not treat anxiety, impatience, financial concerns, or nail-related conditions; seek appropriate professional advice when needed.',
    ],
  },
  'Vrishabh (Taurus) Rashi Yantra': {
    brand: 'astrovastubazar',
    nameHindi: 'वृषभ राशि यंत्र',
    nameEnglish: 'Vrishabh (Taurus) Rashi Yantra',
    descriptionHindi:
      'पारंपरिक ज्योतिषीय मान्यता के अनुसार, वृषभ राशि में जन्मे लोग इस विशेष बीज-मंत्र यंत्र को लॉकेट के रूप में धारण कर सकते हैं या जेब में रख सकते हैं। कुछ लोग इसे हवन-पूजन के बाद प्राण-प्रतिष्ठित करने की परंपरा का पालन करते हैं; इसके लिए मंदिर के पुजारी या पंडित से मार्गदर्शन लिया जा सकता है। यह आध्यात्मिक आस्था का अभ्यास है, स्वास्थ्य या कानूनी समस्याओं का उपचार अथवा समाधान नहीं।',
    descriptionEnglish:
      'According to traditional astrological belief, people born under Taurus may wear this special seed-mantra yantra as a locket or carry it in a pocket. Some traditions consecrate it through havan and puja; a temple priest or pandit may offer guidance. This is a spiritual practice, not a treatment for health concerns or a solution to legal matters.',
    beliefHindi:
      'परंपरागत मान्यता के अनुसार, वृषभ राशि यंत्र धारण करना या स्थापित करना घर में शांति, सुख और समृद्धि की कामना से जुड़ा है। ये व्यक्तिगत आस्था पर आधारित मान्यताएँ हैं और सुनिश्चित परिणाम नहीं देतीं।',
    beliefEnglish:
      'According to traditional belief, wearing or placing the Taurus Yantra is associated with prayers for peace, happiness, and prosperity at home. These are matters of personal faith and do not guarantee outcomes.',
    benefitsHindi: [
      'घर में शांति और पारिवारिक सद्भाव की कामना के लिए।',
      'कर्तव्यों को पूरा करने और सकारात्मक दिनचर्या बनाए रखने के संकल्प का स्मरण।',
      'पारिवारिक तनाव या घरेलू कलह के समय सकारात्मक संवाद और सहयोग को प्रोत्साहित करने के लिए।',
      'पेट, आँखों, सर्दी-जुकाम या अपच की समस्या में यह उपचार नहीं है; योग्य स्वास्थ्य-विशेषज्ञ से सलाह लें।',
      'कोर्ट-कचहरी या सरकारी मामलों में यह कानूनी सलाह या प्रतिनिधित्व का विकल्प नहीं है; योग्य कानूनी सलाह लें।',
    ],
    benefitsEnglish: [
      'A symbol of prayers for peace and harmony at home.',
      'May serve as a reminder to fulfil responsibilities and maintain a positive routine.',
      'May encourage constructive communication and support during family stress or conflict.',
      'It does not treat stomach, eye, cold, or indigestion conditions; consult a qualified healthcare professional.',
      'It is not a substitute for legal advice or representation in court or government matters; seek qualified legal advice.',
    ],
  },
  'Mithun (Gemini) Rashi Yantra': {
    brand: 'astrovastubazar',
    nameHindi: 'मिथुन राशि यंत्र',
    nameEnglish: 'Mithun (Gemini) Rashi Yantra',
    descriptionHindi:
      'पारंपरिक ज्योतिषीय मान्यता के अनुसार, मिथुन राशि में जन्मे लोग इस विशेष बीज-मंत्र यंत्र को लॉकेट के रूप में धारण कर सकते हैं या जेब में रख सकते हैं। कुछ परंपराओं में हवन-पूजन द्वारा प्राण-प्रतिष्ठा की जाती है; इसके लिए मंदिर के पुजारी या पंडित से मार्गदर्शन लिया जा सकता है। यह आध्यात्मिक आस्था का अभ्यास है, स्वास्थ्य, आर्थिक या सुरक्षा संबंधी समस्याओं का उपचार नहीं।',
    descriptionEnglish:
      'According to traditional astrological belief, people born under Gemini may wear this special seed-mantra yantra as a locket or carry it in a pocket. Some traditions consecrate it through havan and puja; a temple priest or pandit may offer guidance. This is a spiritual practice, not a treatment for health, financial, or safety concerns.',
    beliefHindi:
      'परंपरागत मान्यता के अनुसार, मिथुन राशि यंत्र धारण करना या स्थापित करना बुरी नजर और शत्रुओं से सुरक्षा, तथा जीवन में सुख, शांति और समृद्धि की कामना से जुड़ा है। ये व्यक्तिगत आस्था पर आधारित मान्यताएँ हैं और सुनिश्चित परिणाम नहीं देतीं।',
    beliefEnglish:
      'According to traditional belief, wearing or placing the Gemini Yantra is associated with prayers for protection from the evil eye and adversaries, and for happiness, peace, and prosperity. These are matters of personal faith and do not guarantee outcomes.',
    benefitsHindi: [
      'आर्थिक कठिनाइयों से निपटने के लिए सकारात्मक और सोच-समझकर निर्णय लेने का स्मरण।',
      'शत्रुओं से सुरक्षा की कामना के लिए आध्यात्मिक साधना में शामिल कर सकते हैं।',
      'जीवन में शांति और समृद्धि की प्रार्थना के लिए।',
      'क्रोध या चिंता के लिए इसे उपचार न समझें; आवश्यकता होने पर योग्य मानसिक स्वास्थ्य विशेषज्ञ से सलाह लें।',
      'संतान-प्राप्ति या कान से जुड़ी समस्या के लिए इसे चिकित्सा का विकल्प न मानें; योग्य स्वास्थ्य-विशेषज्ञ से सलाह लें।',
      'तत्काल खतरे की स्थिति में सुरक्षित स्थान पर जाएँ और स्थानीय आपातकालीन सेवाओं से संपर्क करें।',
    ],
    benefitsEnglish: [
      'May serve as a reminder to make thoughtful, positive decisions when facing financial challenges.',
      'May be included in spiritual practice as a prayer for protection from adversaries.',
      'A symbol of prayers for peace and prosperity in life.',
      'It does not treat anger or anxiety; consult a qualified mental health professional when needed.',
      'It is not a treatment for fertility or ear-related concerns; consult a qualified healthcare professional.',
      'If in immediate danger, move to a safe place and contact local emergency services.',
    ],
  },
  'Kark (Cancer) Rashi Yantra': {
    brand: 'astrovastubazar',
    nameHindi: 'कर्क राशि यंत्र',
    nameEnglish: 'Kark (Cancer) Rashi Yantra',
    descriptionHindi:
      'पारंपरिक ज्योतिषीय मान्यता के अनुसार, कर्क राशि में जन्मे लोग इस विशेष बीज-मंत्र यंत्र को लॉकेट के रूप में धारण कर सकते हैं या जेब में रख सकते हैं। कुछ परंपराओं में हवन-पूजन द्वारा प्राण-प्रतिष्ठा की जाती है; इसके लिए मंदिर के पुजारी या पंडित से मार्गदर्शन लिया जा सकता है। यह आध्यात्मिक आस्था का अभ्यास है, स्वास्थ्य या कानूनी समस्याओं का उपचार अथवा समाधान नहीं।',
    descriptionEnglish:
      'According to traditional astrological belief, people born under Cancer may wear this special seed-mantra yantra as a locket or carry it in a pocket. Some traditions consecrate it through havan and puja; a temple priest or pandit may offer guidance. This is a spiritual practice, not a treatment for health concerns or a solution to legal matters.',
    beliefHindi:
      'परंपरागत मान्यता के अनुसार, कर्क राशि यंत्र धारण करना या स्थापित करना मन की शांति, भावनात्मक संतुलन, सुख और समृद्धि की कामना से जुड़ा है। ये व्यक्तिगत आस्था पर आधारित मान्यताएँ हैं और सुनिश्चित परिणाम नहीं देतीं।',
    beliefEnglish:
      'According to traditional belief, wearing or placing the Cancer Yantra is associated with prayers for peace of mind, emotional balance, happiness, and prosperity. These are matters of personal faith and do not guarantee outcomes.',
    benefitsHindi: [
      'शांति और भावनात्मक संतुलन की कामना के लिए आध्यात्मिक साधना में शामिल कर सकते हैं।',
      'परिवार और दैनिक जीवन में सुख-शांति की प्रार्थना के लिए।',
      'खाँसी, जुकाम, बुखार, सिरदर्द या अन्य स्वास्थ्य समस्या में यह उपचार नहीं है; योग्य स्वास्थ्य-विशेषज्ञ से सलाह लें।',
      'डर, चिंता या भावनात्मक कठिनाई के लिए इसे पेशेवर मानसिक स्वास्थ्य सहायता का विकल्प न मानें।',
      'कानूनी या सरकारी मामलों में यह कानूनी सलाह या प्रतिनिधित्व का विकल्प नहीं है; योग्य कानूनी सलाह लें।',
      'पानी या ऊँचाई से जुड़े वास्तविक खतरे में सुरक्षा उपाय अपनाएँ और जरूरत पर आपातकालीन सहायता लें।',
    ],
    benefitsEnglish: [
      'May be included in spiritual practice as a prayer for calm and emotional balance.',
      'A symbol of prayers for peace and happiness in family and daily life.',
      'It does not treat coughs, colds, fever, headaches, or other health conditions; consult a qualified healthcare professional.',
      'It is not a substitute for professional mental health support for fear, anxiety, or emotional difficulties.',
      'It is not a substitute for legal advice or representation in legal or government matters; seek qualified legal advice.',
      'Take appropriate safety precautions around water or heights and seek emergency help when needed.',
    ],
  },
  'Singh (Leo) Rashi Yantra': {
    brand: 'astrovastubazar',
    nameHindi: 'सिंह राशि यंत्र',
    nameEnglish: 'Singh (Leo) Rashi Yantra',
    descriptionHindi:
      'पारंपरिक ज्योतिषीय मान्यता के अनुसार, सिंह राशि में जन्मे लोग इस विशेष बीज-मंत्र यंत्र को लॉकेट के रूप में धारण कर सकते हैं या जेब में रख सकते हैं। कुछ परंपराओं में हवन-पूजन द्वारा प्राण-प्रतिष्ठा की जाती है; इसके लिए मंदिर के पुजारी या पंडित से मार्गदर्शन लिया जा सकता है। यह आध्यात्मिक आस्था का अभ्यास है, स्वास्थ्य या सुरक्षा संबंधी समस्याओं का उपचार नहीं।',
    descriptionEnglish:
      'According to traditional astrological belief, people born under Leo may wear this special seed-mantra yantra as a locket or carry it in a pocket. Some traditions consecrate it through havan and puja; a temple priest or pandit may offer guidance. This is a spiritual practice, not a treatment for health or safety concerns.',
    beliefHindi:
      'परंपरागत मान्यता के अनुसार, सिंह राशि यंत्र धारण करना या स्थापित करना सुख-शांति, पारिवारिक कल्याण और समृद्धि की कामना से जुड़ा है। ये व्यक्तिगत आस्था पर आधारित मान्यताएँ हैं और सुनिश्चित परिणाम नहीं देतीं।',
    beliefEnglish:
      'According to traditional belief, wearing or placing the Leo Yantra is associated with prayers for peace, family well-being, and prosperity. These are matters of personal faith and do not guarantee outcomes.',
    benefitsHindi: [
      'स्वास्थ्य और मानसिक कुशलता की कामना के लिए आध्यात्मिक साधना में शामिल कर सकते हैं।',
      'क्रोध या तनाव के समय शांत चिंतन और सकारात्मक संवाद की याद दिला सकता है।',
      'परिवार और संतान के सुख की प्रार्थना के लिए।',
      'पेट-दर्द, दाँत, सिर, गले या अन्य स्वास्थ्य समस्या में यह उपचार नहीं है; योग्य स्वास्थ्य-विशेषज्ञ से सलाह लें।',
      'अवसाद या मानसिक स्वास्थ्य संबंधी कठिनाई में इसे उपचार न मानें; मानसिक स्वास्थ्य विशेषज्ञ से सहायता लें।',
      'आग, चोरी या अन्य तत्काल खतरे की स्थिति में सुरक्षित स्थान पर जाएँ और आपातकालीन सेवाओं से संपर्क करें।',
    ],
    benefitsEnglish: [
      'May be included in spiritual practice as a prayer for well-being and peace of mind.',
      'May serve as a reminder to pause, reflect, and communicate positively when feeling angry or stressed.',
      'A symbol of prayers for family and children’s well-being.',
      'It does not treat stomach pain or dental, head, throat, or other health conditions; consult a qualified healthcare professional.',
      'It is not a treatment for depression or other mental health concerns; seek support from a mental health professional.',
      'In case of fire, theft, or another immediate danger, move to safety and contact emergency services.',
    ],
  },
  'Kanya (Virgo) Rashi Yantra': {
    brand: 'astrovastubazar',
    nameHindi: 'कन्या राशि यंत्र',
    nameEnglish: 'Kanya (Virgo) Rashi Yantra',
    descriptionHindi:
      'पारंपरिक ज्योतिषीय मान्यता के अनुसार, कन्या राशि में जन्मे लोग इस विशेष बीज-मंत्र यंत्र को लॉकेट के रूप में धारण कर सकते हैं या जेब में रख सकते हैं। कुछ परंपराओं में हवन-पूजन द्वारा प्राण-प्रतिष्ठा की जाती है; इसके लिए मंदिर के पुजारी या पंडित से मार्गदर्शन लिया जा सकता है। यह आध्यात्मिक आस्था का अभ्यास है, स्वास्थ्य या सुरक्षा संबंधी समस्याओं का उपचार नहीं।',
    descriptionEnglish:
      'According to traditional astrological belief, people born under Virgo may wear this special seed-mantra yantra as a locket or carry it in a pocket. Some traditions consecrate it through havan and puja; a temple priest or pandit may offer guidance. This is a spiritual practice, not a treatment for health or safety concerns.',
    beliefHindi:
      'परंपरागत मान्यता के अनुसार, कन्या राशि यंत्र धारण करना या स्थापित करना सुख, समृद्धि और कल्याण की कामना से जुड़ा है। ये व्यक्तिगत आस्था पर आधारित मान्यताएँ हैं और सुनिश्चित परिणाम नहीं देतीं।',
    beliefEnglish:
      'According to traditional belief, wearing or placing the Virgo Yantra is associated with prayers for happiness, prosperity, and well-being. These are matters of personal faith and do not guarantee outcomes.',
    benefitsHindi: [
      'समृद्धि और जीवन में सुख-शांति की कामना के लिए।',
      'स्वस्थ दिनचर्या और अपने कल्याण का ध्यान रखने के संकल्प का स्मरण।',
      'कफ, पेट, आँखों या अन्य स्वास्थ्य समस्या में यह उपचार नहीं है; योग्य स्वास्थ्य-विशेषज्ञ से सलाह लें।',
      'आग, गिरने, चोट या विषैले जीव के काटने के खतरे में सुरक्षा उपाय अपनाएँ और जरूरत पर आपातकालीन सहायता लें।',
      'कामुक विचारों या भावनात्मक कठिनाइयों के लिए इसे उपचार न मानें; जरूरत पड़ने पर योग्य स्वास्थ्य या मानसिक स्वास्थ्य विशेषज्ञ से बात करें।',
    ],
    benefitsEnglish: [
      'A symbol of prayers for prosperity, happiness, and peace in life.',
      'May serve as a reminder to maintain a healthy routine and care for personal well-being.',
      'It does not treat phlegm, stomach, eye, or other health conditions; consult a qualified healthcare professional.',
      'Take safety precautions around fire, heights, and injury risks; seek emergency help for bites from venomous animals.',
      'It is not a treatment for sexual thoughts or emotional concerns; consult a qualified health or mental health professional when needed.',
    ],
  },
  'Tula (Libra) Rashi Yantra': {
    brand: 'astrovastubazar',
    nameHindi: 'तुला राशि यंत्र',
    nameEnglish: 'Tula (Libra) Rashi Yantra',
    descriptionHindi:
      'पारंपरिक ज्योतिषीय मान्यता के अनुसार, तुला राशि में जन्मे लोग इस विशेष बीज-मंत्र यंत्र को लॉकेट के रूप में धारण कर सकते हैं या जेब में रख सकते हैं। कुछ परंपराओं में हवन-पूजन द्वारा प्राण-प्रतिष्ठा की जाती है; इसके लिए मंदिर के पुजारी या पंडित से मार्गदर्शन लिया जा सकता है। यह आध्यात्मिक आस्था का अभ्यास है, स्वास्थ्य, प्रजनन या वैवाहिक समस्याओं का उपचार नहीं।',
    descriptionEnglish:
      'According to traditional astrological belief, people born under Libra may wear this special seed-mantra yantra as a locket or carry it in a pocket. Some traditions consecrate it through havan and puja; a temple priest or pandit may offer guidance. This is a spiritual practice, not a treatment for health, fertility, or marital concerns.',
    beliefHindi:
      'परंपरागत मान्यता के अनुसार, तुला राशि यंत्र धारण करना या स्थापित करना अच्छे स्वास्थ्य, वैवाहिक जीवन में सुख और पारिवारिक कल्याण की कामना से जुड़ा है। ये व्यक्तिगत आस्था पर आधारित मान्यताएँ हैं और सुनिश्चित परिणाम नहीं देतीं।',
    beliefEnglish:
      'According to traditional belief, wearing or placing the Libra Yantra is associated with prayers for well-being, happiness in married life, and family welfare. These are matters of personal faith and do not guarantee outcomes.',
    benefitsHindi: [
      'सुख, शांति और समृद्धि की कामना के लिए आध्यात्मिक साधना में शामिल कर सकते हैं।',
      'वैवाहिक जीवन और परिवार में खुशहाली की प्रार्थना के लिए।',
      'सिर, पेट, त्वचा, श्वसन या अन्य स्वास्थ्य समस्या में यह उपचार नहीं है; योग्य स्वास्थ्य-विशेषज्ञ से सलाह लें।',
      'प्रजनन संबंधी चिंता या वैवाहिक कठिनाइयों में इसे चिकित्सा या परामर्श का विकल्प न मानें; उपयुक्त विशेषज्ञ से मदद लें।',
      'आग या दुर्घटना के खतरे में सुरक्षा उपाय अपनाएँ और जरूरत पर आपातकालीन सहायता लें।',
    ],
    benefitsEnglish: [
      'May be included in spiritual practice as a prayer for happiness, peace, and prosperity.',
      'A symbol of prayers for happiness in married and family life.',
      'It does not treat head, stomach, skin, respiratory, or other health conditions; consult a qualified healthcare professional.',
      'It is not a substitute for medical care or counselling for fertility or marital concerns; seek appropriate professional support.',
      'Take appropriate precautions around fire and accidents and seek emergency help when needed.',
    ],
  },
  'Vrishchik (Scorpio) Rashi Yantra': {
    brand: 'astrovastubazar',
    nameHindi: 'वृश्चिक राशि यंत्र',
    nameEnglish: 'Vrishchik (Scorpio) Rashi Yantra',
    descriptionHindi:
      'पारंपरिक ज्योतिषीय मान्यता के अनुसार, वृश्चिक राशि में जन्मे लोग इस विशेष बीज-मंत्र यंत्र को लॉकेट के रूप में धारण कर सकते हैं या जेब में रख सकते हैं। कुछ परंपराओं में हवन-पूजन द्वारा प्राण-प्रतिष्ठा की जाती है; इसके लिए मंदिर के पुजारी या पंडित से मार्गदर्शन लिया जा सकता है। यह आध्यात्मिक आस्था का अभ्यास है, मानसिक स्वास्थ्य, नशे की लत या सुरक्षा संबंधी समस्याओं का उपचार नहीं।',
    descriptionEnglish:
      'According to traditional astrological belief, people born under Scorpio may wear this special seed-mantra yantra as a locket or carry it in a pocket. Some traditions consecrate it through havan and puja; a temple priest or pandit may offer guidance. This is a spiritual practice, not a treatment for mental health concerns, substance dependence, or safety issues.',
    beliefHindi:
      'परंपरागत मान्यता के अनुसार, वृश्चिक राशि यंत्र धारण करना या स्थापित करना बाधाओं का सामना करने, करियर में प्रगति और शांति की कामना से जुड़ा है। ये व्यक्तिगत आस्था पर आधारित मान्यताएँ हैं और शत्रुओं या किसी नुकसान से सुरक्षा की गारंटी नहीं देतीं।',
    beliefEnglish:
      'According to traditional belief, wearing or placing the Scorpio Yantra is associated with prayers for overcoming obstacles, career progress, and peace. These are matters of personal faith and do not guarantee protection from adversaries or harm.',
    benefitsHindi: [
      'बाधाओं का सामना करने के लिए धैर्य और सकारात्मक दृष्टिकोण की याद दिला सकता है।',
      'करियर में उन्नति की कामना के लिए।',
      'विरोध या मतभेद के समय शांतिपूर्ण और रचनात्मक संवाद को प्रोत्साहित करने के लिए।',
      'क्रोध या बार-बार होने वाले विवादों के लिए इसे उपचार न मानें; जरूरत पड़ने पर योग्य मानसिक स्वास्थ्य विशेषज्ञ से सलाह लें।',
      'नशे की लत या स्वयं को नुकसान पहुँचाने के विचारों में पेशेवर सहायता लें; तत्काल खतरे में स्थानीय आपातकालीन सेवाओं या संकट सहायता से संपर्क करें।',
    ],
    benefitsEnglish: [
      'May serve as a reminder to approach obstacles with patience and a positive outlook.',
      'A symbol of prayers for career progress.',
      'May encourage calm, constructive communication during disagreements.',
      'It is not a treatment for anger or recurring conflict; consult a qualified mental health professional when needed.',
      'Seek professional support for substance dependence or thoughts of self-harm; if there is immediate danger, contact local emergency or crisis support services.',
    ],
  },
  'Dhanu (Sagittarius) Rashi Yantra': {
    brand: 'astrovastubazar',
    nameHindi: 'धनु राशि यंत्र',
    nameEnglish: 'Dhanu (Sagittarius) Rashi Yantra',
    descriptionHindi:
      'पारंपरिक ज्योतिषीय मान्यता के अनुसार, धनु राशि में जन्मे लोग इस विशेष बीज-मंत्र यंत्र को लॉकेट के रूप में धारण कर सकते हैं या जेब में रख सकते हैं। कुछ परंपराओं में हवन-पूजन द्वारा प्राण-प्रतिष्ठा की जाती है; इसके लिए मंदिर के पुजारी या पंडित से मार्गदर्शन लिया जा सकता है। यह आध्यात्मिक आस्था का अभ्यास है, शारीरिक पीड़ा, प्रजनन या वैवाहिक समस्याओं का उपचार नहीं।',
    descriptionEnglish:
      'According to traditional astrological belief, people born under Sagittarius may wear this special seed-mantra yantra as a locket or carry it in a pocket. Some traditions consecrate it through havan and puja; a temple priest or pandit may offer guidance. This is a spiritual practice, not a treatment for physical pain, fertility, or marital concerns.',
    beliefHindi:
      'परंपरागत मान्यता के अनुसार, धनु राशि यंत्र धारण करना या स्थापित करना दांपत्य और पारिवारिक सुख, शारीरिक कुशलता तथा सम्मान की कामना से जुड़ा है। ये व्यक्तिगत आस्था पर आधारित मान्यताएँ हैं और सुनिश्चित परिणाम नहीं देतीं।',
    beliefEnglish:
      'According to traditional belief, wearing or placing the Sagittarius Yantra is associated with prayers for family and marital happiness, well-being, and respect. These are matters of personal faith and do not guarantee outcomes.',
    benefitsHindi: [
      'घर और संतान के सुख की कामना के लिए आध्यात्मिक साधना में शामिल कर सकते हैं।',
      'शारीरिक कुशलता और जीवन में सम्मान की प्रार्थना के लिए।',
      'लगातार या गंभीर शारीरिक पीड़ा में इसे उपचार न मानें; योग्य स्वास्थ्य-विशेषज्ञ से सलाह लें।',
      'प्रजनन या वैवाहिक कठिनाइयों में उपयुक्त चिकित्सकीय या परामर्श सहायता लें।',
    ],
    benefitsEnglish: [
      'May be included in spiritual practice as a prayer for family and children’s happiness.',
      'A symbol of prayers for well-being and respect in life.',
      'It does not treat persistent or severe physical pain; consult a qualified healthcare professional.',
      'Seek appropriate medical care or counselling for fertility or marital concerns.',
    ],
  },
  'Makar (Capricorn) Rashi Yantra': {
    brand: 'astrovastubazar',
    nameHindi: 'मकर राशि यंत्र',
    nameEnglish: 'Makar (Capricorn) Rashi Yantra',
    descriptionHindi:
      'पारंपरिक ज्योतिषीय मान्यता के अनुसार, मकर राशि में जन्मे लोग इस विशेष बीज-मंत्र यंत्र को लॉकेट के रूप में धारण कर सकते हैं या जेब में रख सकते हैं। कुछ परंपराओं में हवन-पूजन द्वारा प्राण-प्रतिष्ठा की जाती है; इसके लिए मंदिर के पुजारी या पंडित से मार्गदर्शन लिया जा सकता है। यह आध्यात्मिक आस्था का अभ्यास है, स्वास्थ्य या दुर्घटना से सुरक्षा का विकल्प नहीं।',
    descriptionEnglish:
      'According to traditional astrological belief, people born under Capricorn may wear this special seed-mantra yantra as a locket or carry it in a pocket. Some traditions consecrate it through havan and puja; a temple priest or pandit may offer guidance. This is a spiritual practice, not a treatment for health concerns or a substitute for accident-prevention measures.',
    beliefHindi:
      'परंपरागत मान्यता के अनुसार, मकर राशि यंत्र धारण करना या स्थापित करना अनुशासन, स्वास्थ्य, सुख-शांति और समृद्धि की कामना से जुड़ा है। ये व्यक्तिगत आस्था पर आधारित मान्यताएँ हैं और किसी परिणाम या दुर्घटना से सुरक्षा की गारंटी नहीं देतीं।',
    beliefEnglish:
      'According to traditional belief, wearing or placing the Capricorn Yantra is associated with prayers for discipline, well-being, peace, and prosperity. These are matters of personal faith and do not guarantee outcomes or prevent accidents.',
    benefitsHindi: [
      'काम टालने की आदत से निपटने और नियमित दिनचर्या अपनाने के संकल्प का स्मरण।',
      'किफायत और सोच-समझकर खर्च करने की आदत को प्रोत्साहित करने के लिए।',
      'सर्दी, खाँसी, बुखार या हाथ-पैर की समस्या में यह उपचार नहीं है; योग्य स्वास्थ्य-विशेषज्ञ से सलाह लें।',
      'पानी के पास सावधानी बरतें और तैराकी या जल-सुरक्षा के उचित नियमों का पालन करें।',
      'चोट या दुर्घटना से बचाव के लिए व्यावहारिक सुरक्षा उपाय अपनाएँ; यह यंत्र सुरक्षा उपकरणों का विकल्प नहीं है।',
    ],
    benefitsEnglish: [
      'May serve as a reminder to address procrastination and follow a consistent routine.',
      'May encourage mindful saving and thoughtful spending.',
      'It does not treat coughs, colds, fever, or limb-related conditions; consult a qualified healthcare professional.',
      'Take care around water and follow appropriate swimming and water-safety practices.',
      'Use practical safety measures to reduce injury and accident risks; the yantra is not a substitute for safety equipment.',
    ],
  },
  'Kumbh (Aquarius) Rashi Yantra': {
    brand: 'astrovastubazar',
    nameHindi: 'कुम्भ राशि यंत्र',
    nameEnglish: 'Kumbh (Aquarius) Rashi Yantra',
    descriptionHindi:
      'पारंपरिक ज्योतिषीय मान्यता के अनुसार, कुम्भ राशि में जन्मे लोग इस विशेष बीज-मंत्र यंत्र को लॉकेट के रूप में धारण कर सकते हैं या जेब में रख सकते हैं। कुछ परंपराओं में हवन-पूजन द्वारा प्राण-प्रतिष्ठा की जाती है; इसके लिए मंदिर के पुजारी या पंडित से मार्गदर्शन लिया जा सकता है। यह आध्यात्मिक आस्था का अभ्यास है, स्वास्थ्य, नशे की लत, प्रजनन या सुरक्षा संबंधी समस्याओं का उपचार नहीं।',
    descriptionEnglish:
      'According to traditional astrological belief, people born under Aquarius may wear this special seed-mantra yantra as a locket or carry it in a pocket. Some traditions consecrate it through havan and puja; a temple priest or pandit may offer guidance. This is a spiritual practice, not a treatment for health, substance dependence, fertility, or safety concerns.',
    beliefHindi:
      'परंपरागत मान्यता के अनुसार, कुम्भ राशि यंत्र धारण करना या स्थापित करना संयम, सुख-शांति और संतान-सुख की कामना से जुड़ा है। ये व्यक्तिगत आस्था पर आधारित मान्यताएँ हैं और सुनिश्चित परिणाम नहीं देतीं।',
    beliefEnglish:
      'According to traditional belief, wearing or placing the Aquarius Yantra is associated with prayers for self-discipline, peace, and family happiness. These are matters of personal faith and do not guarantee outcomes.',
    benefitsHindi: [
      'संयम और सकारात्मक आदतों को अपनाने के संकल्प का स्मरण।',
      'खाँसी, जुकाम या बालों से जुड़ी समस्या में यह उपचार नहीं है; योग्य स्वास्थ्य-विशेषज्ञ से सलाह लें।',
      'संतान-सुख की कामना के लिए आध्यात्मिक साधना में शामिल कर सकते हैं; प्रजनन संबंधी चिंता में योग्य चिकित्सकीय सलाह लें।',
      'नशे की लत या मानसिक स्वास्थ्य संबंधी कठिनाई में पेशेवर सहायता लें; यंत्र उपचार का विकल्प नहीं है।',
      'पानी या ऊँचाई के पास सावधानी बरतें और उचित सुरक्षा उपाय अपनाएँ।',
    ],
    benefitsEnglish: [
      'May serve as a reminder to practise self-discipline and build positive habits.',
      'It does not treat coughs, colds, or hair-related conditions; consult a qualified healthcare professional.',
      'May be included in spiritual practice as a prayer for family happiness; seek medical advice for fertility concerns.',
      'Seek professional support for substance dependence or mental health concerns; the yantra is not a treatment.',
      'Take appropriate precautions around water and heights.',
    ],
  },
  'Meen (Pisces) Rashi Yantra': {
    brand: 'astrovastubazar',
    nameHindi: 'मीन राशि यंत्र',
    nameEnglish: 'Meen (Pisces) Rashi Yantra',
    descriptionHindi:
      'पारंपरिक ज्योतिषीय मान्यता के अनुसार, मीन राशि में जन्मे लोग इस विशेष बीज-मंत्र यंत्र को लॉकेट के रूप में धारण कर सकते हैं या जेब में रख सकते हैं। कुछ परंपराओं में हवन-पूजन द्वारा प्राण-प्रतिष्ठा की जाती है; इसके लिए मंदिर के पुजारी या पंडित से मार्गदर्शन लिया जा सकता है। यह आध्यात्मिक आस्था का अभ्यास है, स्वास्थ्य, वैवाहिक या सुरक्षा संबंधी समस्याओं का उपचार नहीं।',
    descriptionEnglish:
      'According to traditional astrological belief, people born under Pisces may wear this special seed-mantra yantra as a locket or carry it in a pocket. Some traditions consecrate it through havan and puja; a temple priest or pandit may offer guidance. This is a spiritual practice, not a treatment for health or marital concerns or a substitute for safety measures.',
    beliefHindi:
      'परंपरागत मान्यता के अनुसार, मीन राशि यंत्र धारण करना या स्थापित करना भय और निराशावादी विचारों से उबरने, कार्यक्षेत्र की बाधाओं का सामना करने तथा सुख-शांति की कामना से जुड़ा है। ये व्यक्तिगत आस्था पर आधारित मान्यताएँ हैं और सुनिश्चित परिणाम नहीं देतीं।',
    beliefEnglish:
      'According to traditional belief, wearing or placing the Pisces Yantra is associated with prayers for courage, a positive outlook, progress through work challenges, and peace. These are matters of personal faith and do not guarantee outcomes.',
    benefitsHindi: [
      'भय या निराशावादी विचारों के समय सकारात्मक चिंतन की याद दिला सकता है।',
      'बाधाओं का सामना करने और सफलता की दिशा में प्रयास जारी रखने की प्रेरणा के लिए।',
      'शारीरिक और मानसिक कुशलता की कामना के लिए आध्यात्मिक साधना में शामिल कर सकते हैं।',
      'खाँसी, ज्वर या अन्य स्वास्थ्य समस्या में यह उपचार नहीं है; योग्य स्वास्थ्य-विशेषज्ञ से सलाह लें।',
      'निराशा या मानसिक स्वास्थ्य संबंधी कठिनाई में इसे उपचार न मानें; मानसिक स्वास्थ्य विशेषज्ञ से सहायता लें।',
      'ऊँचाई या अन्य वास्तविक खतरे में उचित सुरक्षा उपाय अपनाएँ और जरूरत पर आपातकालीन सहायता लें।',
    ],
    benefitsEnglish: [
      'May serve as a reminder to seek a positive perspective when facing fear or pessimistic thoughts.',
      'May encourage continued effort when working through obstacles.',
      'May be included in spiritual practice as a prayer for physical and mental well-being.',
      'It does not treat coughs, fever, or other health conditions; consult a qualified healthcare professional.',
      'It is not a treatment for persistent distress or mental health concerns; seek support from a mental health professional.',
      'Take appropriate precautions around heights and other hazards and seek emergency help when needed.',
    ],
  },
  'Anuradha Locket': {
    brand: 'astrovastubazar',
    nameEnglish: 'Anuradha Nakshatra Locket',
    descriptionEnglish:
      'The Anuradha Nakshatra Locket is associated in traditional belief with friendship, cooperation, patience, perseverance, and leadership. It may be used as a personal spiritual symbol or placed at home or work as part of a faith practice. Claims that it resolves health, relationship, financial, or vastu concerns or guarantees protection and success are not established outcomes.',
    benefitsEnglish: [
      'May serve as a reminder to practise patience, cooperation, and constructive leadership.',
      'May be used as a personal spiritual focus for reflection on relationships and social connection.',
      'Some traditions place it in a prayer room or workspace as a symbol of harmony and prosperity.',
      'It does not treat health concerns, resolve relationship problems, correct vastu, or guarantee financial stability; seek appropriate professional advice when needed.',
    ],
  },
  'Ashlesha Nakshatra Yantra': {
    brand: 'astrovastubazar',
    nameEnglish: 'Ashlesha Nakshatra Yantra',
    descriptionEnglish:
      'According to traditional astrological belief, some families associate having two or more members born under Ashlesha Nakshatra with family difficulties. The Ashlesha Nakshatra Yantra may be placed at home as a personal spiritual practice for those seeking comfort around perceived nakshatra-related or vastu-related concerns. These beliefs are matters of faith and do not predict or guarantee family outcomes.',
  },
  'Ashwini Nakshatra Yantra': {
    brand: 'astrovastubazar',
    nameHindi: 'अश्विनी नक्षत्र यंत्र',
    nameEnglish: 'Ashwini Nakshatra Yantra',
    descriptionHindi:
      'पारंपरिक ज्योतिषीय मान्यता के अनुसार, यदि एक घर में दो या अधिक सदस्यों का जन्म अश्विनी नक्षत्र में हुआ हो तो कुछ लोग इसे नक्षत्र-संबंधी चिंता मानते हैं। अश्विनी नक्षत्र में जन्मे लोग इस यंत्र को लॉकेट के रूप में धारण कर सकते हैं या घर में स्थापित कर सकते हैं। कुछ परंपराओं में हवन-पूजन द्वारा प्राण-प्रतिष्ठा की जाती है; इसके लिए मंदिर के पुजारी या पंडित से मार्गदर्शन लिया जा सकता है। इसे परिवार के स्वास्थ्य और व्यापार की बाधाओं से जुड़ी चिंताओं में आध्यात्मिक साधना के रूप में देखा जाता है, सुनिश्चित परिणाम के रूप में नहीं।',
    descriptionEnglish:
      'According to traditional astrological belief, some people associate having two or more family members born under Ashwini Nakshatra with nakshatra-related concerns. The yantra may be worn as a locket or placed at home as a personal spiritual practice. Some traditions consecrate it through havan and puja; a temple priest or pandit may offer guidance. It may serve as a spiritual focus for concerns about family well-being or business obstacles, but does not guarantee outcomes or replace professional advice.',
  },
  'Bharani Nakshatra Yantra': {
    brand: 'astrovastubazar',
    nameEnglish: 'Bharani Nakshatra Yantra',
    descriptionEnglish:
      'According to traditional astrological belief, some families associate having two or more members born under Bharani Nakshatra with family difficulties. The Bharani Nakshatra Yantra may be placed at home as a personal spiritual practice for those seeking comfort around perceived nakshatra-related or vastu-related concerns. These beliefs are matters of faith and do not predict or guarantee family outcomes.',
  },
  'Chitra Nakshatra Yantra': {
    brand: 'astrovastubazar',
    nameEnglish: 'Chitra Nakshatra Yantra',
    descriptionEnglish:
      'According to traditional astrological belief, some families associate having two or more members born under Chitra Nakshatra with family difficulties. The Chitra Nakshatra Yantra may be placed at home as a personal spiritual practice for those seeking comfort around perceived nakshatra-related or vastu-related concerns. These beliefs are matters of faith and do not predict or guarantee family outcomes.',
  },
  'Dhanishtha Nakshatra Yantra': {
    brand: 'astrovastubazar',
    nameEnglish: 'Dhanishtha Nakshatra Yantra',
    descriptionEnglish:
      'According to traditional astrological belief, some families associate having two or more members born under Dhanishtha Nakshatra with family difficulties. The invoked Dhanishtha Nakshatra Yantra may be placed at home as a personal spiritual practice for those seeking comfort around perceived nakshatra-related or vastu-related concerns. These beliefs are matters of faith and do not predict or guarantee family outcomes.',
  },
  'Hasta Nakshatra Yantra': {
    brand: 'astrovastubazar',
    nameEnglish: 'Hasta Nakshatra Yantra',
    descriptionEnglish:
      'According to traditional astrological belief, some families associate having two or more members born under Hasta Nakshatra with family difficulties. The Hasta Nakshatra Yantra may be placed at home as a personal spiritual practice for those seeking comfort around perceived nakshatra-related or vastu-related concerns. These beliefs are matters of faith and do not predict or guarantee family outcomes.',
  },
  'Jyeshtha Nakshatra Yantra': {
    brand: 'astrovastubazar',
    nameEnglish: 'Jyeshtha Nakshatra Yantra',
    descriptionEnglish:
      'According to traditional astrological belief, some families associate having two or more members born under Jyeshtha Nakshatra with family difficulties. The invoked Jyeshtha Nakshatra Yantra may be placed at home as a personal spiritual practice for those seeking comfort around perceived nakshatra-related or vastu-related concerns. These beliefs are matters of faith and do not predict or guarantee family outcomes.',
  },
  'Krittika Nakshatra Yantra': {
    brand: 'astrovastubazar',
    nameEnglish: 'Krittika Nakshatra Yantra',
    descriptionEnglish:
      'According to traditional astrological belief, some families associate having two or more members born under Krittika Nakshatra with family difficulties. The Krittika Nakshatra Yantra may be placed at home as a personal spiritual practice for those seeking comfort around perceived nakshatra-related or vastu-related concerns. These beliefs are matters of faith and do not predict or guarantee family outcomes.',
  },
  'Magha Nakshatra Yantra': {
    brand: 'astrovastubazar',
    nameEnglish: 'Magha Nakshatra Yantra',
    descriptionEnglish:
      'According to traditional astrological belief, some families associate having two or more members born under Magha Nakshatra with family difficulties. The Magha Nakshatra Yantra may be placed at home as a personal spiritual practice for those seeking comfort around perceived nakshatra-related or vastu-related concerns. These beliefs are matters of faith and do not predict or guarantee family outcomes.',
  },
  'Mula Nakshatra Yantra': {
    brand: 'astrovastubazar',
    nameEnglish: 'Mula Nakshatra Yantra',
    descriptionEnglish:
      'According to traditional astrological belief, some families associate having two or more members born under Mula Nakshatra with family difficulties. The invoked Mula Nakshatra Yantra may be placed at home as a personal spiritual practice for those seeking comfort around perceived nakshatra-related or vastu-related concerns. These beliefs are matters of faith and do not predict or guarantee family outcomes.',
  },
  'Mrigashira Nakshatra Yantra': {
    brand: 'astrovastubazar',
    nameEnglish: 'Mrigashira Nakshatra Yantra',
    descriptionEnglish:
      'According to traditional astrological belief, some families associate having two or more members born under Mrigashira Nakshatra with family difficulties. The Mrigashira Nakshatra Yantra may be placed at home as a personal spiritual practice for those seeking comfort around perceived nakshatra-related or vastu-related concerns. These beliefs are matters of faith and do not predict or guarantee family outcomes.',
  },
  'Punarvasu Nakshatra Yantra': {
    brand: 'astrovastubazar',
    nameEnglish: 'Punarvasu Nakshatra Yantra',
    descriptionEnglish:
      'According to traditional astrological belief, some families associate having two or more members born under Punarvasu Nakshatra with family difficulties. The Punarvasu Nakshatra Yantra may be placed at home as a personal spiritual practice for those seeking comfort around perceived nakshatra-related or vastu-related concerns. These beliefs are matters of faith and do not predict or guarantee family outcomes.',
  },
  'Purva Bhadrapada Nakshatra Yantra': {
    brand: 'astrovastubazar',
    nameEnglish: 'Purva Bhadrapada Nakshatra Yantra',
    descriptionEnglish:
      'According to traditional astrological belief, some families associate having two or more members born under Purva Bhadrapada Nakshatra with family difficulties. The invoked Purva Bhadrapada Nakshatra Yantra may be placed at home as a personal spiritual practice for those seeking comfort around perceived nakshatra-related or vastu-related concerns. These beliefs are matters of faith and do not predict or guarantee family outcomes.',
  },
  'Revati Nakshatra Yantra': {
    brand: 'astrovastubazar',
    nameEnglish: 'Revati Nakshatra Yantra',
    descriptionEnglish:
      'According to traditional astrological belief, some families associate having two or more members born under Revati Nakshatra with family difficulties. The invoked Revati Nakshatra Yantra may be placed at home as a personal spiritual practice for those seeking comfort around perceived nakshatra-related or vastu-related concerns. These beliefs are matters of faith and do not predict or guarantee family outcomes.',
  },
  'Rohini Nakshatra Yantra': {
    brand: 'astrovastubazar',
    nameEnglish: 'Rohini Nakshatra Yantra',
    descriptionEnglish:
      'According to traditional astrological belief, some families associate having two or more members born under Rohini Nakshatra with family difficulties. The Rohini Nakshatra Yantra may be placed at home as a personal spiritual practice for those seeking comfort around perceived nakshatra-related or vastu-related concerns. These beliefs are matters of faith and do not predict or guarantee family outcomes.',
  },
  'Shatabhisha Nakshatra Yantra': {
    brand: 'astrovastubazar',
    nameEnglish: 'Shatabhisha Nakshatra Yantra',
    descriptionEnglish:
      'According to traditional astrological belief, some families associate having two or more members born under Shatabhisha Nakshatra with family difficulties. The invoked Shatabhisha Nakshatra Yantra may be placed at home as a personal spiritual practice for those seeking comfort around perceived nakshatra-related or vastu-related concerns. These beliefs are matters of faith and do not predict or guarantee family outcomes.',
  },
  'Swati Nakshatra Yantra': {
    brand: 'astrovastubazar',
    nameEnglish: 'Swati Nakshatra Yantra',
    descriptionEnglish:
      'According to traditional astrological belief, some families associate having two or more members born under Swati Nakshatra with family difficulties. The Swati Nakshatra Yantra may be placed at home as a personal spiritual practice for those seeking comfort around perceived nakshatra-related or vastu-related concerns. These beliefs are matters of faith and do not predict or guarantee family outcomes.',
  },
  'Uttara Phalguni Nakshatra Yantra': {
    brand: 'astrovastubazar',
    nameEnglish: 'Uttara Phalguni Nakshatra Yantra',
    descriptionEnglish:
      'According to traditional astrological belief, some families associate having two or more members born under Uttara Phalguni Nakshatra with family difficulties. The Uttara Phalguni Nakshatra Yantra may be placed at home as a personal spiritual practice for those seeking comfort around perceived nakshatra-related or vastu-related concerns. These beliefs are matters of faith and do not predict or guarantee family outcomes.',
  },
  'Uttara Ashadha Nakshatra Yantra': {
    brand: 'astrovastubazar',
    nameEnglish: 'Uttara Ashadha Nakshatra Yantra',
    descriptionEnglish:
      'According to traditional astrological belief, some families associate having two or more members born under Uttara Ashadha Nakshatra with family difficulties. The invoked Uttara Ashadha Nakshatra Yantra may be placed at home as a personal spiritual practice for those seeking comfort around perceived nakshatra-related or vastu-related concerns. These beliefs are matters of faith and do not predict or guarantee family outcomes.',
  },
  'Vishakha Locket': {
    brand: 'astrovastubazar',
    nameEnglish: 'Vishakha Nakshatra Locket',
    descriptionEnglish:
      'According to traditional astrological belief, some families associate having two or more members born under Vishakha Nakshatra with family difficulties. The Vishakha Nakshatra Locket may be worn or kept as a personal spiritual practice by those seeking comfort around perceived nakshatra-related or vastu-related concerns. These beliefs are matters of faith and do not predict or guarantee family outcomes.',
  },
  'Purva Phalguni Nakshatra Yantra': {
    brand: 'astrovastubazar',
    nameEnglish: 'Purva Phalguni Nakshatra Yantra',
    descriptionEnglish:
      'According to traditional astrological belief, some families associate having two or more members born under Purva Phalguni Nakshatra with family difficulties. The Purva Phalguni Nakshatra Yantra may be placed at home as a personal spiritual practice for those seeking comfort around perceived nakshatra-related or vastu-related concerns. These beliefs are matters of faith and do not predict or guarantee family outcomes.',
  },
  'Purva Ashadha Nakshatra Yantra': {
    brand: 'astrovastubazar',
    nameEnglish: 'Purva Ashadha Nakshatra Yantra',
    descriptionEnglish:
      'According to traditional astrological belief, some families associate having two or more members born under Purva Ashadha Nakshatra with family difficulties. The invoked Purva Ashadha Nakshatra Yantra may be placed at home as a personal spiritual practice for those seeking comfort around perceived nakshatra-related or vastu-related concerns. These beliefs are matters of faith and do not predict or guarantee family outcomes.',
  },
  'Shravana Nakshatra Yantra': {
    brand: 'astrovastubazar',
    nameEnglish: 'Shravana Nakshatra Yantra',
    descriptionEnglish:
      'According to traditional astrological belief, some families associate having two or more members born under Shravana Nakshatra with family difficulties. The invoked Shravana Nakshatra Yantra may be placed at home as a personal spiritual practice for those seeking comfort around perceived nakshatra-related or vastu-related concerns. These beliefs are matters of faith and do not predict or guarantee family outcomes.',
  },
};

const YantraDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = useMemo(() => getYantraProductBySlug(slug), [slug]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState('Yantra');
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
    setSelectedStyle('Yantra');
    setRelatedProducts(getRandomRelatedProducts(product?.name));
  }, [product]);

  useEffect(() => {
    if (gallery.length < 2) {
      return undefined;
    }

    const slideInterval = window.setInterval(() => {
      setActiveImage((currentImage) => (currentImage + 1) % gallery.length);
    }, 3000);

    return () => window.clearInterval(slideInterval);
  }, [gallery]);

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const details = productDetails[product.name];
  const hasLocketVariant = Boolean(product.locketPrice && product.locketImage);
  const selectedPrice = selectedStyle === 'Locket' && hasLocketVariant
    ? product.locketPrice
    : product.price;
  const styleOptions = [
    {
      value: 'Yantra',
      label: product.variantNames?.Yantra ?? product.name,
      image: product.image,
    },
    {
      value: 'Locket',
      label: product.variantNames?.Locket ?? `${product.name} Locket`,
      image: product.locketImage,
    },
  ];

  const handleAddToCart = () => {
    const existingItem = cart.find((item) =>
      item.name === product.name && (item.variant || 'Yantra') === selectedStyle,
    );
    const cartProduct = {
      ...product,
      image: selectedStyle === 'Locket' ? product.locketImage : product.image,
      price: selectedPrice,
      variant: selectedStyle,
      quantity,
    };

    setCart(
      existingItem
        ? cart.map((item) =>
            item.name === product.name && (item.variant || 'Yantra') === selectedStyle
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
              <div className="relative flex aspect-square items-center justify-center overflow-hidden">
                {gallery.map((image, index) => (
                  <img
                    key={image}
                    src={image}
                    alt={index === activeImage ? product.name : ''}
                    aria-hidden={index !== activeImage}
                    onError={(event) => {
                      if (!event.currentTarget.src.endsWith('/Yantra/yantra1.jpg')) {
                        event.currentTarget.src = '/Yantra/yantra1.jpg';
                      }
                    }}
                    className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ease-in-out ${
                      index === activeImage ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
              </div>
              {gallery.length > 1 && (
                <div className="flex justify-center gap-2">
                  {gallery.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      onMouseEnter={() => setActiveImage(index)}
                      onFocus={() => setActiveImage(index)}
                      aria-label={`Show product image ${index + 1}`}
                      aria-pressed={activeImage === index}
                      className={`h-14 w-14 shrink-0 cursor-pointer overflow-hidden border bg-white transition sm:h-16 sm:w-16 xl:h-[72px] xl:w-[72px] ${
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

            <p className="mt-4 text-lg font-bold text-[#231416]">{selectedPrice}</p>

            {hasLocketVariant && (
              <fieldset className="mt-4">
                <legend className="mb-2 text-sm font-medium text-[#302522]">Style</legend>
                <div className="flex flex-wrap gap-2">
                  {styleOptions.map((style) => (
                    <button
                      key={style.value}
                      type="button"
                      onClick={() => {
                        setSelectedStyle(style.value);
                        setActiveImage(Math.max(0, gallery.indexOf(style.image)));
                      }}
                      aria-pressed={selectedStyle === style.value}
                      className={`border px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1519]/40 ${
                        selectedStyle === style.value
                          ? 'border-[#7A1519] bg-[#7A1519] text-white'
                          : 'border-[#231416]/30 bg-white text-[#231416] hover:border-[#7A1519]'
                      }`}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

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
