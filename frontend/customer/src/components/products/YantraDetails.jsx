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

const productDescriptions = {
  'Swati Nakshatra Yantra': {
    en: 'The Swati Nakshatra Yantra is a metallic astrological diagram traditionally associated with independence, freedom, and Rahu. Some people use it as a spiritual reminder of self-reliance, personal goals, and balance in relationships. Traditional Beliefs: Astrological traditions may associate Swati Nakshatra with family, health, relationships, business, finances, and vastu. These are matters of belief; the yantra is not proven to reduce negativity, protect health, resolve family conflicts, improve financial outcomes, or correct vastu, and it does not guarantee success or prosperity. Crafting and Placement: The yantra is described as being made with sacred geometry and energized through rituals by Gurudev G. D. Vashist Ji. It may be placed in a puja room, in the northeast corner of a home, or in an office as part of personal spiritual practice. Conclusion: The Swati Nakshatra Yantra can be a meaningful spiritual symbol for reflection and personal practice. It is not a substitute for medical, financial, or other professional advice.',
    hi: 'स्वाति नक्षत्र यंत्र एक धातु की ज्योतिषीय आकृति है, जिसे पारंपरिक रूप से स्वतंत्रता, आज़ादी और राहु से जोड़ा जाता है। कुछ लोग इसे आत्मनिर्भरता, व्यक्तिगत लक्ष्यों और संबंधों में संतुलन की याद दिलाने वाले आध्यात्मिक प्रतीक के रूप में अपनाते हैं। पारंपरिक मान्यताएँ: ज्योतिषीय परंपराओं में स्वाति नक्षत्र को परिवार, स्वास्थ्य, संबंधों, व्यवसाय, वित्त और वास्तु से जोड़ा जा सकता है। ये आस्था से जुड़ी मान्यताएँ हैं; इस बात का प्रमाण नहीं है कि यह यंत्र नकारात्मकता कम करता, स्वास्थ्य की रक्षा करता, पारिवारिक विवाद सुलझाता, वित्तीय परिणाम बेहतर करता या वास्तु दोष ठीक करता है। यह सफलता या समृद्धि की गारंटी भी नहीं देता। निर्माण और स्थापना: बताया जाता है कि यह यंत्र पवित्र ज्यामितीय आकृतियों से बनाया जाता है और गुरुदेव जी. डी. वशिष्ठ जी द्वारा अनुष्ठानों से ऊर्जित किया जाता है। इसे व्यक्तिगत आध्यात्मिक साधना के हिस्से के रूप में पूजा-कक्ष, घर के उत्तर-पूर्वी कोने या कार्यालय में रखा जा सकता है। निष्कर्ष: स्वाति नक्षत्र यंत्र आत्मचिंतन और व्यक्तिगत साधना का एक अर्थपूर्ण आध्यात्मिक प्रतीक हो सकता है। यह चिकित्सा, वित्तीय या अन्य पेशेवर सलाह का विकल्प नहीं है।',
  },
  'Uttara Bhadrapada Nakshatra Yantra': {
    en: 'The Uttara Bhadrapada Nakshatra Yantra is a metallic geometric design associated with this nakshatra. Some people use it as a spiritual focus for reflection, inner peace, and personal growth. Traditional Beliefs: Astrological traditions may associate Uttara Bhadrapada with family, emotional well-being, business, finances, and vastu. These are matters of belief; the yantra is not proven to resolve family or health concerns, improve financial outcomes, or correct vastu, and it does not guarantee emotional balance, protection, or prosperity. Crafting and Placement: The yantra is described as being made with sacred geometry and energized through rituals. It may be placed in a puja room, in the northeast corner of a home, or in an office as part of personal spiritual practice. Conclusion: The Uttara Bhadrapada Nakshatra Yantra can be a meaningful spiritual symbol for reflection and personal practice. It is not a substitute for medical, financial, or other professional advice.',
    hi: 'उत्तर भाद्रपद नक्षत्र यंत्र एक ज्योतिषीय धातु-ज्यामितीय आकृति है, जिसे इस नक्षत्र से जोड़ा जाता है। कुछ लोग इसे आत्मचिंतन, आंतरिक शांति और व्यक्तिगत विकास के लिए आध्यात्मिक माध्यम के रूप में अपनाते हैं। पारंपरिक मान्यताएँ: ज्योतिषीय परंपराओं में उत्तर भाद्रपद को परिवार, भावनात्मक कुशलता, व्यवसाय, वित्त और वास्तु से जोड़ा जा सकता है। ये आस्था से जुड़ी मान्यताएँ हैं; इस बात का प्रमाण नहीं है कि यह यंत्र पारिवारिक या स्वास्थ्य संबंधी चिंताओं को दूर करता, वित्तीय परिणाम बेहतर करता या वास्तु दोष ठीक करता है। यह भावनात्मक संतुलन, सुरक्षा या समृद्धि की गारंटी भी नहीं देता। निर्माण और स्थापना: बताया जाता है कि यह यंत्र पवित्र ज्यामितीय आकृतियों से बनाया जाता है और अनुष्ठानों द्वारा ऊर्जित किया जाता है। इसे व्यक्तिगत आध्यात्मिक साधना के हिस्से के रूप में पूजा-कक्ष, घर के उत्तर-पूर्वी कोने या कार्यालय में रखा जा सकता है। निष्कर्ष: उत्तर भाद्रपद नक्षत्र यंत्र आत्मचिंतन और व्यक्तिगत साधना का एक अर्थपूर्ण आध्यात्मिक प्रतीक हो सकता है। यह चिकित्सा, वित्तीय या अन्य पेशेवर सलाह का विकल्प नहीं है।',
  },
  'Uttara Phalguni Nakshatra Yantra': {
    en: 'The Uttara Phalguni Nakshatra Yantra is a metallic astrological design traditionally associated with positivity, self-worth, and social connections. Some people include it in their spiritual practice as a symbol for reflecting on personal and professional relationships. Traditional Beliefs: Astrological traditions may associate Uttara Phalguni with family, health, relationships, business, finances, and vastu. These are matters of belief; the yantra is not proven to change mindset, resolve family or health concerns, improve financial outcomes, or correct vastu, and it does not guarantee protection or success. Crafting and Placement: The yantra is described as being made with sacred geometry and energized through rituals by Gurudev G. D. Vashist Ji. It may be placed in a puja room, in the northeast corner of a home, or in an office as part of personal spiritual practice. Conclusion: The Uttara Phalguni Nakshatra Yantra can be a meaningful spiritual symbol for reflection and personal practice. It is not a substitute for medical, financial, or other professional advice.',
    hi: 'उत्तर फाल्गुनी नक्षत्र यंत्र एक ज्योतिषीय धातु-आकृति है, जिसे पारंपरिक रूप से सकारात्मकता, आत्मसम्मान और सामाजिक संबंधों से जोड़ा जाता है। कुछ लोग इसे व्यक्तिगत और पेशेवर संबंधों पर आत्मचिंतन के प्रतीक के रूप में अपनी आध्यात्मिक साधना में शामिल करते हैं। पारंपरिक मान्यताएँ: ज्योतिषीय परंपराओं में उत्तर फाल्गुनी को परिवार, स्वास्थ्य, संबंधों, व्यवसाय, वित्त और वास्तु से जोड़ा जा सकता है। ये आस्था से जुड़ी मान्यताएँ हैं; इस बात का प्रमाण नहीं है कि यह यंत्र सोच में बदलाव लाता, पारिवारिक या स्वास्थ्य संबंधी चिंताओं को सुलझाता, वित्तीय परिणाम बेहतर करता या वास्तु दोष ठीक करता है। यह सुरक्षा या सफलता की गारंटी भी नहीं देता। निर्माण और स्थापना: बताया जाता है कि यह यंत्र पवित्र ज्यामितीय आकृतियों से बनाया जाता है और गुरुदेव जी. डी. वशिष्ठ जी द्वारा अनुष्ठानों से ऊर्जित किया जाता है। इसे व्यक्तिगत आध्यात्मिक साधना के हिस्से के रूप में पूजा-कक्ष, घर के उत्तर-पूर्वी कोने या कार्यालय में रखा जा सकता है। निष्कर्ष: उत्तर फाल्गुनी नक्षत्र यंत्र आत्मचिंतन और व्यक्तिगत साधना का एक अर्थपूर्ण आध्यात्मिक प्रतीक हो सकता है। यह चिकित्सा, वित्तीय या अन्य पेशेवर सलाह का विकल्प नहीं है।',
  },
  'Uttara Ashadha Nakshatra Yantra': {
    en: 'The Uttara Ashadha Nakshatra Yantra is traditionally associated with courage, steadiness, and perseverance. Some people include it in a personal spiritual practice as a reminder to reflect on decisions and long-term goals. Traditional Beliefs: Astrological traditions may associate Uttara Ashadha with family, health, career, finances, and vastu. These are matters of belief; the yantra is not proven to remove self-doubt or indecision, treat health concerns, improve financial outcomes, or correct vastu, and it does not guarantee stability, protection, or success. Crafting and Placement: The yantra is described as being made with sacred geometry and energized through rituals by Gurudev G. D. Vashist Ji. It may be placed in a puja room, in the northeast corner of a home, or in an office as part of personal spiritual practice. Conclusion: The Uttara Ashadha Nakshatra Yantra can be a meaningful spiritual symbol for reflection and personal practice. It is not a substitute for medical, financial, or other professional advice.',
    hi: 'उत्तराषाढ़ा नक्षत्र यंत्र पारंपरिक रूप से साहस, स्थिरता और दृढ़ता से जुड़ा है। कुछ लोग इसे निर्णयों और दीर्घकालीन लक्ष्यों पर आत्मचिंतन की याद दिलाने वाले व्यक्तिगत आध्यात्मिक प्रतीक के रूप में अपनाते हैं। पारंपरिक मान्यताएँ: ज्योतिषीय परंपराओं में उत्तराषाढ़ा को परिवार, स्वास्थ्य, करियर, वित्त और वास्तु से जोड़ा जा सकता है। ये आस्था से जुड़ी मान्यताएँ हैं; इस बात का प्रमाण नहीं है कि यह यंत्र आत्म-संदेह या अनिर्णय दूर करता, स्वास्थ्य संबंधी चिंताओं का उपचार करता, वित्तीय परिणाम बेहतर करता या वास्तु दोष ठीक करता है। यह स्थिरता, सुरक्षा या सफलता की गारंटी भी नहीं देता। निर्माण और स्थापना: बताया जाता है कि यह यंत्र पवित्र ज्यामितीय आकृतियों से बनाया जाता है और गुरुदेव जी. डी. वशिष्ठ जी द्वारा अनुष्ठानों से ऊर्जित किया जाता है। इसे व्यक्तिगत आध्यात्मिक साधना के हिस्से के रूप में पूजा-कक्ष, घर के उत्तर-पूर्वी कोने या कार्यालय में रखा जा सकता है। निष्कर्ष: उत्तराषाढ़ा नक्षत्र यंत्र आत्मचिंतन और व्यक्तिगत साधना का एक अर्थपूर्ण आध्यात्मिक प्रतीक हो सकता है। यह चिकित्सा, वित्तीय या अन्य पेशेवर सलाह का विकल्प नहीं है।',
  },
  'Vishakha Locket': {
    en: 'The Vishakha Nakshatra Yantra is a metallic spiritual design traditionally associated with balance, reflection, and thoughtful decision-making. Some people include it in their daily spiritual practice as a symbol of peace in social and personal relationships. Traditional Beliefs: Astrological traditions may associate Vishakha with family, health, relationships, business, finances, and vastu. These are matters of belief; the yantra is not proven to resolve dissatisfaction or conflicts, treat health concerns, improve financial outcomes, or correct vastu, and it does not guarantee marital harmony or prosperity. Crafting and Placement: The catalog item is a locket, described as being made with sacred geometry and energized through rituals by Gurudev G. D. Vashist Ji. It may be worn or kept as part of personal spiritual practice. Conclusion: The Vishakha Nakshatra Locket can be a meaningful spiritual symbol for reflection and personal practice. It is not a substitute for medical, financial, or other professional advice.',
    hi: 'विशाखा नक्षत्र यंत्र एक धातु की आध्यात्मिक आकृति है, जिसे पारंपरिक रूप से संतुलन, आत्मचिंतन और सोच-समझकर निर्णय लेने से जोड़ा जाता है। कुछ लोग इसे सामाजिक और व्यक्तिगत संबंधों में शांति के प्रतीक के रूप में अपनी दैनिक आध्यात्मिक साधना में शामिल करते हैं। पारंपरिक मान्यताएँ: ज्योतिषीय परंपराओं में विशाखा को परिवार, स्वास्थ्य, संबंधों, व्यवसाय, वित्त और वास्तु से जोड़ा जा सकता है। ये आस्था से जुड़ी मान्यताएँ हैं; इस बात का प्रमाण नहीं है कि यह यंत्र असंतोष या विवाद दूर करता, स्वास्थ्य संबंधी चिंताओं का उपचार करता, वित्तीय परिणाम बेहतर करता या वास्तु दोष ठीक करता है। यह वैवाहिक सामंजस्य या समृद्धि की गारंटी भी नहीं देता। निर्माण और धारण: कैटलॉग में यह लॉकेट के रूप में है, जिसे पवित्र ज्यामितीय आकृतियों से बनाया गया और गुरुदेव जी. डी. वशिष्ठ जी द्वारा अनुष्ठानों से ऊर्जित किया गया बताया जाता है। इसे व्यक्तिगत आध्यात्मिक साधना के हिस्से के रूप में धारण या अपने पास रखा जा सकता है। निष्कर्ष: विशाखा नक्षत्र लॉकेट आत्मचिंतन और व्यक्तिगत साधना का एक अर्थपूर्ण आध्यात्मिक प्रतीक हो सकता है। यह चिकित्सा, वित्तीय या अन्य पेशेवर सलाह का विकल्प नहीं है।',
  },
  'Purva Phalguni Nakshatra Yantra': {
    en: 'The Purva Phalguni Nakshatra Yantra is a metallic astrological design that some people use as a spiritual focus for reflection, calm, and intentions around relationships and personal goals. Traditional Beliefs: Astrological traditions may associate Purva Phalguni with family, health, relationships, business, finances, and vastu. These are matters of belief; the yantra is not proven to reduce stress, resolve relationship or family concerns, treat health conditions, improve financial outcomes, or correct vastu, and it does not guarantee love, security, or success. Crafting and Placement: The yantra is described as being made with sacred geometry and energized through rituals by Gurudev G. D. Vashist Ji. It may be placed in a puja room, in the northeast corner of a home, or in a workplace as part of personal spiritual practice. Conclusion: The Purva Phalguni Nakshatra Yantra can be a meaningful spiritual symbol for reflection and personal practice. It is not a substitute for medical, financial, or other professional advice.',
    hi: 'पूर्व फाल्गुनी नक्षत्र यंत्र एक ज्योतिषीय धातु-आकृति है, जिसे कुछ लोग संबंधों और व्यक्तिगत लक्ष्यों से जुड़े आत्मचिंतन, शांति और संकल्पों के लिए आध्यात्मिक माध्यम के रूप में अपनाते हैं। पारंपरिक मान्यताएँ: ज्योतिषीय परंपराओं में पूर्व फाल्गुनी को परिवार, स्वास्थ्य, संबंधों, व्यवसाय, वित्त और वास्तु से जोड़ा जा सकता है। ये आस्था से जुड़ी मान्यताएँ हैं; इस बात का प्रमाण नहीं है कि यह यंत्र तनाव कम करता, संबंधों या पारिवारिक चिंताओं को सुलझाता, स्वास्थ्य समस्याओं का उपचार करता, वित्तीय परिणाम बेहतर करता या वास्तु दोष ठीक करता है। यह प्रेम, सुरक्षा या सफलता की गारंटी भी नहीं देता। निर्माण और स्थापना: बताया जाता है कि यह यंत्र पवित्र ज्यामितीय आकृतियों से बनाया जाता है और गुरुदेव जी. डी. वशिष्ठ जी द्वारा अनुष्ठानों से ऊर्जित किया जाता है। इसे व्यक्तिगत आध्यात्मिक साधना के हिस्से के रूप में पूजा-कक्ष, घर के उत्तर-पूर्वी कोने या कार्यस्थल में रखा जा सकता है। निष्कर्ष: पूर्व फाल्गुनी नक्षत्र यंत्र आत्मचिंतन और व्यक्तिगत साधना का एक अर्थपूर्ण आध्यात्मिक प्रतीक हो सकता है। यह चिकित्सा, वित्तीय या अन्य पेशेवर सलाह का विकल्प नहीं है।',
  },
  'Purva Ashadha Nakshatra Yantra': {
    en: 'The Purva Ashadha Nakshatra Yantra is a metallic astrological symbol traditionally associated with confidence and steadiness. Some people include it in their spiritual practice as a reminder to consider choices thoughtfully and pursue personal and professional goals. Traditional Beliefs: Astrological traditions may associate Purva Ashadha with family, health, business, finances, and vastu. These are matters of belief; the yantra is not proven to resolve indecision or self-doubt, treat health concerns, improve financial outcomes, or correct vastu, and it does not guarantee protection, prosperity, or success. Crafting and Placement: The yantra is described as being made with sacred geometry and energized through rituals by Gurudev G. D. Vashist Ji. It may be placed in a puja room, in the northeast corner of a home, or in an office as part of personal spiritual practice. Conclusion: The Purva Ashadha Nakshatra Yantra can be a meaningful spiritual symbol for reflection and personal practice. It is not a substitute for medical, financial, or other professional advice.',
    hi: 'पूर्वाषाढ़ा नक्षत्र यंत्र एक ज्योतिषीय धातु-प्रतीक है, जिसे पारंपरिक रूप से आत्मविश्वास और स्थिरता से जोड़ा जाता है। कुछ लोग इसे विकल्पों पर सोच-विचार करने और व्यक्तिगत तथा पेशेवर लक्ष्यों की ओर बढ़ने की याद दिलाने वाले आध्यात्मिक प्रतीक के रूप में अपनाते हैं। पारंपरिक मान्यताएँ: ज्योतिषीय परंपराओं में पूर्वाषाढ़ा को परिवार, स्वास्थ्य, व्यवसाय, वित्त और वास्तु से जोड़ा जा सकता है। ये आस्था से जुड़ी मान्यताएँ हैं; इस बात का प्रमाण नहीं है कि यह यंत्र अनिर्णय या आत्म-संदेह दूर करता, स्वास्थ्य संबंधी चिंताओं का उपचार करता, वित्तीय परिणाम बेहतर करता या वास्तु दोष ठीक करता है। यह सुरक्षा, समृद्धि या सफलता की गारंटी भी नहीं देता। निर्माण और स्थापना: बताया जाता है कि यह यंत्र पवित्र ज्यामितीय आकृतियों से बनाया जाता है और गुरुदेव जी. डी. वशिष्ठ जी द्वारा अनुष्ठानों से ऊर्जित किया जाता है। इसे व्यक्तिगत आध्यात्मिक साधना के हिस्से के रूप में पूजा-कक्ष, घर के उत्तर-पूर्वी कोने या कार्यालय में रखा जा सकता है। निष्कर्ष: पूर्वाषाढ़ा नक्षत्र यंत्र आत्मचिंतन और व्यक्तिगत साधना का एक अर्थपूर्ण आध्यात्मिक प्रतीक हो सकता है। यह चिकित्सा, वित्तीय या अन्य पेशेवर सलाह का विकल्प नहीं है।',
  },
  'Pushya Nakshatra Yantra': {
    en: 'The Pushya Nakshatra Yantra is a metallic spiritual symbol traditionally associated with balance, dedication, and selflessness. Some people include it in a personal faith practice as a focus for reflection and intentions around peace and well-being. Traditional Beliefs: Astrological traditions may associate Pushya with family, health, business, finances, and vastu. These are matters of belief; the yantra is not proven to resolve financial or family difficulties, improve emotional well-being, treat health conditions, or correct vastu, and it does not guarantee success or prosperity. Crafting and Placement: The yantra is described as being made with sacred geometry and energized through rituals by Gurudev G. D. Vashist Ji. It may be placed in a puja room, in the northeast corner of a home, or in a workplace as part of personal spiritual practice. Conclusion: The Pushya Nakshatra Yantra can be a meaningful spiritual symbol for reflection and personal practice. It is not a substitute for medical, financial, or other professional advice.',
    hi: 'पुष्य नक्षत्र यंत्र एक धातु का आध्यात्मिक प्रतीक है, जिसे पारंपरिक रूप से संतुलन, समर्पण और निःस्वार्थता से जोड़ा जाता है। कुछ लोग इसे शांति और कुशलता से जुड़े आत्मचिंतन तथा संकल्पों के लिए व्यक्तिगत आस्था के आध्यात्मिक माध्यम के रूप में अपनाते हैं। पारंपरिक मान्यताएँ: ज्योतिषीय परंपराओं में पुष्य को परिवार, स्वास्थ्य, व्यवसाय, वित्त और वास्तु से जोड़ा जा सकता है। ये आस्था से जुड़ी मान्यताएँ हैं; इस बात का प्रमाण नहीं है कि यह यंत्र आर्थिक या पारिवारिक कठिनाइयाँ दूर करता, भावनात्मक कुशलता बेहतर करता, स्वास्थ्य समस्याओं का उपचार करता या वास्तु दोष ठीक करता है। यह सफलता या समृद्धि की गारंटी भी नहीं देता। निर्माण और स्थापना: बताया जाता है कि यह यंत्र पवित्र ज्यामितीय आकृतियों से बनाया जाता है और गुरुदेव जी. डी. वशिष्ठ जी द्वारा अनुष्ठानों से ऊर्जित किया जाता है। इसे व्यक्तिगत आध्यात्मिक साधना के हिस्से के रूप में पूजा-कक्ष, घर के उत्तर-पूर्वी कोने या कार्यस्थल में रखा जा सकता है। निष्कर्ष: पुष्य नक्षत्र यंत्र आत्मचिंतन और व्यक्तिगत साधना का एक अर्थपूर्ण आध्यात्मिक प्रतीक हो सकता है। यह चिकित्सा, वित्तीय या अन्य पेशेवर सलाह का विकल्प नहीं है।',
  },
  'Shravana Nakshatra Yantra': {
    en: 'The Shravana Nakshatra Yantra is a geometric spiritual symbol traditionally associated with clarity, knowledge, and understanding. Some people use it as a focus for reflection, careful listening, and thoughtful communication. Traditional Beliefs: Astrological traditions may associate Shravana with family, health, relationships, business, finances, and vastu. These are matters of belief; the yantra is not proven to relieve confusion, treat health concerns, resolve family conflicts, improve financial outcomes, or correct vastu, and it does not guarantee stronger relationships, stability, or success. Crafting and Placement: The yantra is described as being made with sacred geometry and energized through rituals by Gurudev G. D. Vashist Ji. It may be placed in a puja room, in the northeast corner of a home, or in an office as part of personal spiritual practice. Conclusion: The Shravana Nakshatra Yantra can be a meaningful spiritual symbol for reflection and personal practice. It is not a substitute for medical, financial, or other professional advice.',
    hi: 'श्रवण नक्षत्र यंत्र एक ज्यामितीय आध्यात्मिक प्रतीक है, जिसे पारंपरिक रूप से स्पष्टता, ज्ञान और समझ से जोड़ा जाता है। कुछ लोग इसे आत्मचिंतन, ध्यानपूर्वक सुनने और सोच-समझकर संवाद करने के माध्यम के रूप में अपनाते हैं। पारंपरिक मान्यताएँ: ज्योतिषीय परंपराओं में श्रवण को परिवार, स्वास्थ्य, संबंधों, व्यवसाय, वित्त और वास्तु से जोड़ा जा सकता है। ये आस्था से जुड़ी मान्यताएँ हैं; इस बात का प्रमाण नहीं है कि यह यंत्र भ्रम दूर करता, स्वास्थ्य संबंधी चिंताओं का उपचार करता, पारिवारिक विवाद सुलझाता, वित्तीय परिणाम बेहतर करता या वास्तु दोष ठीक करता है। यह बेहतर संबंधों, स्थिरता या सफलता की गारंटी भी नहीं देता। निर्माण और स्थापना: बताया जाता है कि यह यंत्र पवित्र ज्यामितीय आकृतियों से बनाया जाता है और गुरुदेव जी. डी. वशिष्ठ जी द्वारा अनुष्ठानों से ऊर्जित किया जाता है। इसे व्यक्तिगत आध्यात्मिक साधना के हिस्से के रूप में पूजा-कक्ष, घर के उत्तर-पूर्वी कोने या कार्यालय में रखा जा सकता है। निष्कर्ष: श्रवण नक्षत्र यंत्र आत्मचिंतन और व्यक्तिगत साधना का एक अर्थपूर्ण आध्यात्मिक प्रतीक हो सकता है। यह चिकित्सा, वित्तीय या अन्य पेशेवर सलाह का विकल्प नहीं है।',
  },
  'Magha Nakshatra Yantra': {
    en: 'The Magha Nakshatra Yantra is an astrological metallic design traditionally associated with the leadership and royal symbolism of Magha. Some people use or wear it as a spiritual focus for reflection on humility, self-confidence, and personal growth. Traditional Beliefs: Astrological traditions may associate Magha Nakshatra with family, health, business, finances, and vastu. These are matters of belief; the yantra is not proven to change personality, protect family health, improve financial outcomes, or correct vastu, and it does not guarantee leadership, stability, protection, or success. Crafting and Placement: The yantra is described as being made with sacred geometry and energized through rituals by Gurudev G. D. Vashist Ji. It may be placed in a puja room, in the northeast corner of a home, or in a business space as part of personal spiritual practice. Conclusion: The Magha Nakshatra Yantra can be a meaningful spiritual symbol for reflection and personal practice. It is not a substitute for medical, financial, or other professional advice.',
    hi: 'मघा नक्षत्र यंत्र एक ज्योतिषीय धातु-आकृति है, जिसे पारंपरिक रूप से मघा के नेतृत्व और राजसी प्रतीकों से जोड़ा जाता है। कुछ लोग इसे विनम्रता, आत्मविश्वास और व्यक्तिगत विकास पर आत्मचिंतन के आध्यात्मिक माध्यम के रूप में अपनाते या धारण करते हैं। पारंपरिक मान्यताएँ: ज्योतिषीय परंपराओं में मघा नक्षत्र को परिवार, स्वास्थ्य, व्यवसाय, वित्त और वास्तु से जोड़ा जा सकता है। ये आस्था से जुड़ी मान्यताएँ हैं; इस बात का प्रमाण नहीं है कि यह यंत्र व्यक्तित्व में बदलाव लाता, परिवार के स्वास्थ्य की रक्षा करता, वित्तीय परिणाम बेहतर करता या वास्तु दोष ठीक करता है। यह नेतृत्व, स्थिरता, सुरक्षा या सफलता की गारंटी भी नहीं देता। निर्माण और स्थापना: बताया जाता है कि यह यंत्र पवित्र ज्यामितीय आकृतियों से बनाया जाता है और गुरुदेव जी. डी. वशिष्ठ जी द्वारा अनुष्ठानों से ऊर्जित किया जाता है। इसे व्यक्तिगत आध्यात्मिक साधना के हिस्से के रूप में पूजा-कक्ष, घर के उत्तर-पूर्वी कोने या व्यवसाय-स्थल में रखा जा सकता है। निष्कर्ष: मघा नक्षत्र यंत्र आत्मचिंतन और व्यक्तिगत साधना का एक अर्थपूर्ण आध्यात्मिक प्रतीक हो सकता है। यह चिकित्सा, वित्तीय या अन्य पेशेवर सलाह का विकल्प नहीं है।',
  },
  'Mula Nakshatra Yantra': {
    en: 'The Moola Nakshatra Yantra is traditionally associated with reflection, steadiness, and inner strength. Some people include it in meditation or personal spiritual practice as a focus for patience, peace, and considering life goals. Traditional Beliefs: Astrological traditions may associate Moola Nakshatra with family, health, business, finances, and vastu. These are matters of belief; the yantra is not proven to relieve stress, resolve family conflicts, treat health concerns, improve financial outcomes, or correct vastu, and it does not guarantee protection or prosperity. Crafting and Placement: The yantra is described as being made with sacred geometry and energized through rituals by Gurudev G. D. Vashist Ji. It may be placed in a puja room, in the northeast corner of a home, or in an office as part of personal spiritual practice. Conclusion: The Moola Nakshatra Yantra can be a meaningful spiritual symbol for reflection and personal practice. It is not a substitute for medical, financial, or other professional advice.',
    hi: 'मूल नक्षत्र यंत्र पारंपरिक रूप से आत्मचिंतन, स्थिरता और आंतरिक शक्ति से जुड़ा है। कुछ लोग इसे धैर्य, शांति और जीवन के लक्ष्यों पर विचार करने के लिए ध्यान या व्यक्तिगत आध्यात्मिक साधना के माध्यम के रूप में अपनाते हैं। पारंपरिक मान्यताएँ: ज्योतिषीय परंपराओं में मूल नक्षत्र को परिवार, स्वास्थ्य, व्यवसाय, वित्त और वास्तु से जोड़ा जा सकता है। ये आस्था से जुड़ी मान्यताएँ हैं; इस बात का प्रमाण नहीं है कि यह यंत्र तनाव कम करता, पारिवारिक विवाद सुलझाता, स्वास्थ्य संबंधी चिंताओं का उपचार करता, वित्तीय परिणाम बेहतर करता या वास्तु दोष ठीक करता है। यह सुरक्षा या समृद्धि की गारंटी भी नहीं देता। निर्माण और स्थापना: बताया जाता है कि यह यंत्र पवित्र ज्यामितीय आकृतियों से बनाया जाता है और गुरुदेव जी. डी. वशिष्ठ जी द्वारा अनुष्ठानों से ऊर्जित किया जाता है। इसे व्यक्तिगत आध्यात्मिक साधना के हिस्से के रूप में पूजा-कक्ष, घर के उत्तर-पूर्वी कोने या कार्यालय में रखा जा सकता है। निष्कर्ष: मूल नक्षत्र यंत्र आत्मचिंतन और व्यक्तिगत साधना का एक अर्थपूर्ण आध्यात्मिक प्रतीक हो सकता है। यह चिकित्सा, वित्तीय या अन्य पेशेवर सलाह का विकल्प नहीं है।',
  },
  'Mrigashira Nakshatra Yantra': {
    en: 'The Mrigashira Nakshatra Yantra is a metallic spiritual symbol traditionally associated with curiosity, intelligence, and a search for knowledge. Some people use it as a focus for reflection, calm, and learning. Traditional Beliefs: Astrological traditions may associate Mrigashira Nakshatra with family, health, business, finances, and vastu. These are matters of belief; the yantra is not proven to relieve stress or anxiety, enhance cognitive abilities, resolve family conflicts, improve financial outcomes, or correct vastu, and it does not guarantee health, stability, or success. Crafting and Placement: The yantra is described as being made with sacred geometry and energized through rituals by Gurudev G. D. Vashist Ji. It may be placed in a puja room, in the northeast corner of a home, or in a business space as part of personal spiritual practice. Conclusion: The Mrigashira Nakshatra Yantra can be a meaningful spiritual symbol for reflection and personal practice. It is not a substitute for medical, financial, or other professional advice.',
    hi: 'मृगशिरा नक्षत्र यंत्र एक धातु का आध्यात्मिक प्रतीक है, जिसे पारंपरिक रूप से जिज्ञासा, बुद्धिमत्ता और ज्ञान की खोज से जोड़ा जाता है। कुछ लोग इसे आत्मचिंतन, शांति और सीखने पर ध्यान केंद्रित करने के माध्यम के रूप में अपनाते हैं। पारंपरिक मान्यताएँ: ज्योतिषीय परंपराओं में मृगशिरा नक्षत्र को परिवार, स्वास्थ्य, व्यवसाय, वित्त और वास्तु से जोड़ा जा सकता है। ये आस्था से जुड़ी मान्यताएँ हैं; इस बात का प्रमाण नहीं है कि यह यंत्र तनाव या चिंता कम करता, संज्ञानात्मक क्षमताएँ बढ़ाता, पारिवारिक विवाद सुलझाता, वित्तीय परिणाम बेहतर करता या वास्तु दोष ठीक करता है। यह स्वास्थ्य, स्थिरता या सफलता की गारंटी भी नहीं देता। निर्माण और स्थापना: बताया जाता है कि यह यंत्र पवित्र ज्यामितीय आकृतियों से बनाया जाता है और गुरुदेव जी. डी. वशिष्ठ जी द्वारा अनुष्ठानों से ऊर्जित किया जाता है। इसे व्यक्तिगत आध्यात्मिक साधना के हिस्से के रूप में पूजा-कक्ष, घर के उत्तर-पूर्वी कोने या व्यवसाय-स्थल में रखा जा सकता है। निष्कर्ष: मृगशिरा नक्षत्र यंत्र आत्मचिंतन और व्यक्तिगत साधना का एक अर्थपूर्ण आध्यात्मिक प्रतीक हो सकता है। यह चिकित्सा, वित्तीय या अन्य पेशेवर सलाह का विकल्प नहीं है।',
  },
  'Punarvasu Nakshatra Yantra': {
    en: 'The Punarvasu Nakshatra Yantra is an astrological metallic design traditionally associated with balance, strength, and life’s cycles. Its symbolism is connected with Aditi, who represents nurturing and abundance. Some people use it as a spiritual focus for reflection, creativity, adaptability, and positive intentions. Traditional Beliefs: Astrological traditions may associate Punarvasu Nakshatra with family, health, business, finances, and vastu. These are matters of belief; the yantra is not proven to change thoughts, resolve family or health concerns, improve financial outcomes, or correct vastu, and it does not guarantee happiness, stability, or prosperity. Crafting and Placement: The yantra is described as being made with sacred geometry and energized through rituals by Gurudev G. D. Vashist Ji. It may be placed in a puja room, in the northeast corner of a home, or in a business space as part of personal spiritual practice. Conclusion: The Punarvasu Nakshatra Yantra can be a meaningful spiritual symbol for reflection and personal practice. It is not a substitute for medical, financial, or other professional advice.',
    hi: 'पुनर्वसु नक्षत्र यंत्र एक ज्योतिषीय धातु-आकृति है, जिसे पारंपरिक रूप से संतुलन, शक्ति और जीवन के चक्रों से जोड़ा जाता है। इसका प्रतीकात्मक संबंध अदिति से माना जाता है, जो पोषण और प्रचुरता का प्रतिनिधित्व करती हैं। कुछ लोग इसे आत्मचिंतन, रचनात्मकता, अनुकूलनशीलता और सकारात्मक संकल्पों पर ध्यान केंद्रित करने के आध्यात्मिक माध्यम के रूप में अपनाते हैं। पारंपरिक मान्यताएँ: ज्योतिषीय परंपराओं में पुनर्वसु नक्षत्र को परिवार, स्वास्थ्य, व्यवसाय, वित्त और वास्तु से जोड़ा जा सकता है। ये आस्था से जुड़ी मान्यताएँ हैं; इस बात का प्रमाण नहीं है कि यह यंत्र विचारों में बदलाव लाता, पारिवारिक या स्वास्थ्य संबंधी चिंताओं को सुलझाता, वित्तीय परिणाम बेहतर करता या वास्तु दोष ठीक करता है। यह खुशी, स्थिरता या समृद्धि की गारंटी भी नहीं देता। निर्माण और स्थापना: बताया जाता है कि यह यंत्र पवित्र ज्यामितीय आकृतियों से बनाया जाता है और गुरुदेव जी. डी. वशिष्ठ जी द्वारा अनुष्ठानों से ऊर्जित किया जाता है। इसे व्यक्तिगत आध्यात्मिक साधना के हिस्से के रूप में पूजा-कक्ष, घर के उत्तर-पूर्वी कोने या व्यवसाय-स्थल में रखा जा सकता है। निष्कर्ष: पुनर्वसु नक्षत्र यंत्र आत्मचिंतन और व्यक्तिगत साधना का एक अर्थपूर्ण आध्यात्मिक प्रतीक हो सकता है। यह चिकित्सा, वित्तीय या अन्य पेशेवर सलाह का विकल्प नहीं है।',
  },
  'Purva Bhadrapada Nakshatra Yantra': {
    en: 'The Purva Bhadrapada Nakshatra Yantra is traditionally used by some people as a spiritual focus for reflection, calm, and personal intentions related to well-being and growth. Traditional Beliefs: Astrological traditions may associate Purva Bhadrapada Nakshatra with family, health, business, finances, and vastu. These are matters of belief; the yantra is not proven to relieve mental stress, resolve family or health concerns, improve financial outcomes, or correct vastu, and it does not guarantee emotional well-being, protection, or prosperity. Crafting and Placement: The yantra is described as being made with sacred geometry and energized through rituals by Gurudev G. D. Vashist Ji. It may be placed in a puja room, in the northeast corner of a home, or in a business space as part of personal spiritual practice. Conclusion: The Purva Bhadrapada Nakshatra Yantra can be a meaningful spiritual symbol for reflection and personal practice. It is not a substitute for medical, financial, or other professional advice.',
    hi: 'पूर्व भाद्रपद नक्षत्र यंत्र को कुछ लोग कल्याण और विकास से जुड़े आत्मचिंतन, शांति और व्यक्तिगत संकल्पों के लिए आध्यात्मिक माध्यम के रूप में अपनाते हैं। पारंपरिक मान्यताएँ: ज्योतिषीय परंपराओं में पूर्व भाद्रपद नक्षत्र को परिवार, स्वास्थ्य, व्यवसाय, वित्त और वास्तु से जोड़ा जा सकता है। ये आस्था से जुड़ी मान्यताएँ हैं; इस बात का प्रमाण नहीं है कि यह यंत्र मानसिक तनाव कम करता, पारिवारिक या स्वास्थ्य संबंधी चिंताओं को सुलझाता, वित्तीय परिणाम बेहतर करता या वास्तु दोष ठीक करता है। यह भावनात्मक कुशलता, सुरक्षा या समृद्धि की गारंटी भी नहीं देता। निर्माण और स्थापना: बताया जाता है कि यह यंत्र पवित्र ज्यामितीय आकृतियों से बनाया जाता है और गुरुदेव जी. डी. वशिष्ठ जी द्वारा अनुष्ठानों से ऊर्जित किया जाता है। इसे व्यक्तिगत आध्यात्मिक साधना के हिस्से के रूप में पूजा-कक्ष, घर के उत्तर-पूर्वी कोने या व्यवसाय-स्थल में रखा जा सकता है। निष्कर्ष: पूर्व भाद्रपद नक्षत्र यंत्र आत्मचिंतन और व्यक्तिगत साधना का एक अर्थपूर्ण आध्यात्मिक प्रतीक हो सकता है। यह चिकित्सा, वित्तीय या अन्य पेशेवर सलाह का विकल्प नहीं है।',
  },
  'Revati Nakshatra Yantra': {
    en: 'The Revati Nakshatra Yantra is traditionally associated with abundance and prosperity. Some people wear it or include it in a personal faith practice as a symbol of good fortune, resilience, and thoughtful cooperation in relationships. Traditional Beliefs: Astrological traditions may associate Revati Nakshatra with family, health, relationships, business, finances, and vastu. These are matters of belief; the yantra is not proven to reduce stress or confusion, resolve relationship or health concerns, improve financial outcomes, or correct vastu, and it does not guarantee fortune, stability, or success. Crafting and Placement: The yantra is described as being made with sacred geometry and energized through rituals by Gurudev G. D. Vashist Ji. It may be placed in a puja room, in the northeast corner of a home, or in an office as part of personal spiritual practice. Conclusion: The Revati Nakshatra Yantra can be a meaningful spiritual symbol for reflection and personal practice. It is not a substitute for medical, financial, or other professional advice.',
    hi: 'रेवती नक्षत्र यंत्र पारंपरिक रूप से प्रचुरता और समृद्धि से जुड़ा है। कुछ लोग इसे सौभाग्य, दृढ़ता और संबंधों में सोच-समझकर सहयोग करने के प्रतीक के रूप में धारण करते या अपनी व्यक्तिगत आस्था का हिस्सा बनाते हैं। पारंपरिक मान्यताएँ: ज्योतिषीय परंपराओं में रेवती नक्षत्र को परिवार, स्वास्थ्य, संबंधों, व्यवसाय, वित्त और वास्तु से जोड़ा जा सकता है। ये आस्था से जुड़ी मान्यताएँ हैं; इस बात का प्रमाण नहीं है कि यह यंत्र तनाव या भ्रम कम करता, संबंधों या स्वास्थ्य संबंधी चिंताओं को सुलझाता, वित्तीय परिणाम बेहतर करता या वास्तु दोष ठीक करता है। यह सौभाग्य, स्थिरता या सफलता की गारंटी भी नहीं देता। निर्माण और स्थापना: बताया जाता है कि यह यंत्र पवित्र ज्यामितीय आकृतियों से बनाया जाता है और गुरुदेव जी. डी. वशिष्ठ जी द्वारा अनुष्ठानों से ऊर्जित किया जाता है। इसे व्यक्तिगत आध्यात्मिक साधना के हिस्से के रूप में पूजा-कक्ष, घर के उत्तर-पूर्वी कोने या कार्यालय में रखा जा सकता है। निष्कर्ष: रेवती नक्षत्र यंत्र आत्मचिंतन और व्यक्तिगत साधना का एक अर्थपूर्ण आध्यात्मिक प्रतीक हो सकता है। यह चिकित्सा, वित्तीय या अन्य पेशेवर सलाह का विकल्प नहीं है।',
  },
  'Rohini Nakshatra Yantra': {
    en: 'The Rohini Nakshatra Yantra is a sacred geometric-metallic design traditionally associated with reflection on prosperity, generosity, and harmony in relationships. Some people include it in their faith practice as a symbol of balance and thoughtful connection with others. Traditional Beliefs: Astrological traditions may associate Rohini Nakshatra with family, health, relationships, business, finances, and vastu. These are matters of belief; the yantra is not proven to change emotions, resolve relationship or health concerns, improve financial outcomes, or correct vastu, and it does not guarantee wealth, lasting love, protection, or prosperity. Crafting and Placement: The yantra is described as being made with sacred geometry and energized through rituals by Gurudev G. D. Vashist Ji. It may be placed in a puja room, in the northeast corner of a home, or in an office as part of personal spiritual practice. Conclusion: The Rohini Nakshatra Yantra can be a meaningful spiritual symbol for reflection and personal practice. It is not a substitute for medical, financial, or other professional advice.',
    hi: 'रोहिणी नक्षत्र यंत्र एक पवित्र ज्यामितीय-धातु आकृति है, जिसे पारंपरिक रूप से समृद्धि, उदारता और संबंधों में सामंजस्य पर आत्मचिंतन से जोड़ा जाता है। कुछ लोग इसे संतुलन और दूसरों के साथ सोच-समझकर संबंध बनाने के प्रतीक के रूप में अपनी आस्था का हिस्सा बनाते हैं। पारंपरिक मान्यताएँ: ज्योतिषीय परंपराओं में रोहिणी नक्षत्र को परिवार, स्वास्थ्य, संबंधों, व्यवसाय, वित्त और वास्तु से जोड़ा जा सकता है। ये आस्था से जुड़ी मान्यताएँ हैं; इस बात का प्रमाण नहीं है कि यह यंत्र भावनाओं में बदलाव लाता, संबंधों या स्वास्थ्य संबंधी चिंताओं को सुलझाता, वित्तीय परिणाम बेहतर करता या वास्तु दोष ठीक करता है। यह धन, स्थायी प्रेम, सुरक्षा या समृद्धि की गारंटी भी नहीं देता। निर्माण और स्थापना: बताया जाता है कि यह यंत्र पवित्र ज्यामितीय आकृतियों से बनाया जाता है और गुरुदेव जी. डी. वशिष्ठ जी द्वारा अनुष्ठानों से ऊर्जित किया जाता है। इसे व्यक्तिगत आध्यात्मिक साधना के हिस्से के रूप में पूजा-कक्ष, घर के उत्तर-पूर्वी कोने या कार्यालय में रखा जा सकता है। निष्कर्ष: रोहिणी नक्षत्र यंत्र आत्मचिंतन और व्यक्तिगत साधना का एक अर्थपूर्ण आध्यात्मिक प्रतीक हो सकता है। यह चिकित्सा, वित्तीय या अन्य पेशेवर सलाह का विकल्प नहीं है।',
  },
  'Shatabhisha Nakshatra Yantra': {
    en: 'The Shatabhisha Nakshatra Yantra is traditionally associated with healing, spirituality, and inner strength. Some people use it as a spiritual focus for reflection, calm, and positive intentions in their personal relationships. Traditional Beliefs: Astrological traditions may associate Shatabhisha Nakshatra with family, health, relationships, business, finances, and vastu. These are matters of belief; the yantra is not proven to relieve stress or anxiety, treat health concerns, resolve relationship or family conflicts, improve financial outcomes, or correct vastu, and it does not guarantee happiness, protection, or prosperity. Crafting and Placement: The yantra is described as being made with sacred geometry and energized through rituals by Gurudev G. D. Vashist Ji. It may be placed in a puja room, in the northeast corner of a home, or in an office as part of personal spiritual practice. Conclusion: The Shatabhisha Nakshatra Yantra can be a meaningful spiritual symbol for reflection and personal practice. It is not a substitute for medical, financial, or other professional advice.',
    hi: 'शतभिषा नक्षत्र यंत्र पारंपरिक रूप से उपचार, आध्यात्मिकता और आंतरिक शक्ति से जुड़ा है। कुछ लोग इसे आत्मचिंतन, शांति और व्यक्तिगत संबंधों में सकारात्मक संकल्पों के लिए आध्यात्मिक माध्यम के रूप में अपनाते हैं। पारंपरिक मान्यताएँ: ज्योतिषीय परंपराओं में शतभिषा नक्षत्र को परिवार, स्वास्थ्य, संबंधों, व्यवसाय, वित्त और वास्तु से जोड़ा जा सकता है। ये आस्था से जुड़ी मान्यताएँ हैं; इस बात का प्रमाण नहीं है कि यह यंत्र तनाव या चिंता कम करता, स्वास्थ्य संबंधी समस्याओं का उपचार करता, संबंधों या पारिवारिक विवादों को सुलझाता, वित्तीय परिणाम बेहतर करता या वास्तु दोष ठीक करता है। यह खुशी, सुरक्षा या समृद्धि की गारंटी भी नहीं देता। निर्माण और स्थापना: बताया जाता है कि यह यंत्र पवित्र ज्यामितीय आकृतियों से बनाया जाता है और गुरुदेव जी. डी. वशिष्ठ जी द्वारा अनुष्ठानों से ऊर्जित किया जाता है। इसे व्यक्तिगत आध्यात्मिक साधना के हिस्से के रूप में पूजा-कक्ष, घर के उत्तर-पूर्वी कोने या कार्यालय में रखा जा सकता है। निष्कर्ष: शतभिषा नक्षत्र यंत्र आत्मचिंतन और व्यक्तिगत साधना का एक अर्थपूर्ण आध्यात्मिक प्रतीक हो सकता है। यह चिकित्सा, वित्तीय या अन्य पेशेवर सलाह का विकल्प नहीं है।',
  },
  'Bharani Nakshatra Yantra': {
    en: 'The Bharani Nakshatra Yantra is a sacred geometric design in metallic form, traditionally associated with Bharani, the second of the 27 lunar constellations in astrology. Some people include it in a personal faith practice as a symbol of reflection and personal growth. Traditional Beliefs: Astrological traditions may associate Bharani Nakshatra with family, health, business, finances, and vastu. These are matters of belief; the yantra is not proven to resolve anger or other personal concerns, prevent family disputes, treat health conditions, improve financial outcomes, or correct vastu, and it does not guarantee protection or success. Crafting and Placement: The yantra is described as being made with sacred geometry and energized through mantras. It may be placed in a puja room, in the northeast corner of a home, or in an office as part of personal spiritual practice. Conclusion: The Bharani Nakshatra Yantra can be a meaningful spiritual symbol for reflection and personal practice. It is not a substitute for medical, financial, or other professional advice.',
    hi: 'भरनी नक्षत्र यंत्र धातु के रूप में बनी एक पवित्र ज्यामितीय आकृति है, जिसे ज्योतिष में 27 नक्षत्रों में से दूसरे नक्षत्र भरनी से जोड़ा जाता है। कुछ लोग इसे आत्मचिंतन और व्यक्तिगत विकास के प्रतीक के रूप में अपनी आस्था का हिस्सा बनाते हैं। पारंपरिक मान्यताएँ: ज्योतिषीय परंपराओं में भरनी नक्षत्र को परिवार, स्वास्थ्य, व्यवसाय, वित्त और वास्तु से जोड़ा जा सकता है। ये आस्था से जुड़ी मान्यताएँ हैं; इस बात का प्रमाण नहीं है कि यह यंत्र क्रोध या अन्य व्यक्तिगत समस्याओं को दूर करता, पारिवारिक विवाद रोकता, स्वास्थ्य समस्याओं का उपचार करता, वित्तीय परिणाम बेहतर करता या वास्तु दोष ठीक करता है। यह सुरक्षा या सफलता की गारंटी भी नहीं देता। निर्माण और स्थापना: बताया जाता है कि यह यंत्र पवित्र ज्यामितीय आकृतियों से बनाया जाता है और मंत्रों द्वारा ऊर्जित किया जाता है। इसे व्यक्तिगत आध्यात्मिक साधना के हिस्से के रूप में पूजा-कक्ष, घर के उत्तर-पूर्वी कोने या कार्यालय में रखा जा सकता है। निष्कर्ष: भरनी नक्षत्र यंत्र आत्मचिंतन और व्यक्तिगत साधना का एक अर्थपूर्ण आध्यात्मिक प्रतीक हो सकता है। यह चिकित्सा, वित्तीय या अन्य पेशेवर सलाह का विकल्प नहीं है।',
  },
  'Ashwini Nakshatra Yantra': {
    en: 'The Ashwini Nakshatra Yantra is a geometric metallic design associated in astrology with Ashwini, the first of the 27 lunar mansions. Some people include it in a personal faith practice as a symbol of reflection and confidence. Traditional Beliefs: Astrological traditions may associate Ashwini Nakshatra with decision-making, family, health, finances, and vastu. These are matters of belief; the yantra is not proven to prevent family conflicts, treat health concerns, resolve financial difficulties, or correct vastu, and it does not guarantee protection, success, or prosperity. Crafting and Placement: The yantra is described as being made with sacred geometry and energized with mantras. It may be placed in a puja room, in the northeast corner of a home, or in a business space as part of personal spiritual practice. Conclusion: The Ashwini Nakshatra Yantra can be a meaningful spiritual symbol for reflection and personal practice. It is not a substitute for medical, financial, or other professional advice.',
    hi: 'अश्विनी नक्षत्र यंत्र एक ज्यामितीय धातु-आकृति है, जिसे ज्योतिष में 27 नक्षत्रों में से पहले नक्षत्र अश्विनी से जोड़ा जाता है। कुछ लोग इसे आत्मचिंतन और आत्मविश्वास के प्रतीक के रूप में अपनी व्यक्तिगत आस्था का हिस्सा बनाते हैं। पारंपरिक मान्यताएँ: ज्योतिषीय परंपराओं में अश्विनी नक्षत्र को निर्णय लेने, परिवार, स्वास्थ्य, वित्त और वास्तु से जोड़ा जा सकता है। ये आस्था से जुड़ी मान्यताएँ हैं; इस बात का प्रमाण नहीं है कि यह यंत्र पारिवारिक विवादों को रोकता, स्वास्थ्य समस्याओं का उपचार करता, आर्थिक कठिनाइयों को दूर करता या वास्तु दोष ठीक करता है। यह सुरक्षा, सफलता या समृद्धि की गारंटी भी नहीं देता। निर्माण और स्थापना: बताया जाता है कि यह यंत्र पवित्र ज्यामितीय आकृतियों से बनाया जाता है और मंत्रों द्वारा ऊर्जित किया जाता है। इसे व्यक्तिगत आध्यात्मिक साधना के हिस्से के रूप में पूजा-कक्ष, घर के उत्तर-पूर्वी कोने या व्यवसाय-स्थल में रखा जा सकता है। निष्कर्ष: अश्विनी नक्षत्र यंत्र आत्मचिंतन और व्यक्तिगत साधना का एक अर्थपूर्ण आध्यात्मिक प्रतीक हो सकता है। यह चिकित्सा, वित्तीय या अन्य पेशेवर सलाह का विकल्प नहीं है।',
  },
  'Ashlesha Nakshatra Yantra': {
    en: 'The Ashlesha Nakshatra Yantra is a spiritual diagram traditionally associated with reflection, emotional balance, and personal growth. Some people include it in their faith practice or keep it at home or work as a symbol of harmony and spiritual development. Traditional Beliefs: Some traditions associate Ashlesha Nakshatra with family, health, business, and vastu concerns. These are matters of belief; the yantra is not proven to resolve emotional or family difficulties, treat health concerns, correct vastu, or guarantee business stability, protection, or prosperity. Crafting and Placement: The yantra is described as being made with sacred geometry and ritually energized. It may be placed in a puja room, in the northeast corner of a home, or in an office as part of a personal spiritual practice. Conclusion: The Ashlesha Nakshatra Yantra can be a meaningful spiritual symbol for reflection and personal practice. It is not a substitute for healthcare, financial, or other professional advice.',
    hi: 'अश्लेषा नक्षत्र यंत्र एक आध्यात्मिक आकृति है, जिसे पारंपरिक रूप से आत्मचिंतन, भावनात्मक संतुलन और व्यक्तिगत विकास से जोड़ा जाता है। कुछ लोग इसे अपनी धार्मिक आस्था का हिस्सा बनाते हैं या सामंजस्य और आध्यात्मिक उन्नति के प्रतीक के रूप में घर अथवा कार्यस्थल पर रखते हैं। पारंपरिक मान्यताएँ: कुछ परंपराओं में अश्लेषा नक्षत्र को परिवार, स्वास्थ्य, व्यवसाय और वास्तु संबंधी चिंताओं से जोड़ा जाता है। ये आस्था से जुड़ी मान्यताएँ हैं; इस बात का प्रमाण नहीं है कि यह यंत्र भावनात्मक या पारिवारिक कठिनाइयों को दूर करता, स्वास्थ्य समस्याओं का उपचार करता, वास्तु दोष ठीक करता या व्यवसायिक स्थिरता, सुरक्षा अथवा समृद्धि की गारंटी देता है। निर्माण और स्थापना: बताया जाता है कि यह यंत्र पवित्र ज्यामितीय आकृतियों से बनाया जाता है और अनुष्ठानों द्वारा ऊर्जित किया जाता है। इसे व्यक्तिगत आध्यात्मिक साधना के हिस्से के रूप में पूजा-कक्ष, घर के उत्तर-पूर्वी कोने या कार्यालय में रखा जा सकता है। निष्कर्ष: अश्लेषा नक्षत्र यंत्र आत्मचिंतन और व्यक्तिगत साधना के लिए एक अर्थपूर्ण आध्यात्मिक प्रतीक हो सकता है। यह स्वास्थ्य, वित्तीय या अन्य पेशेवर सलाह का विकल्प नहीं है।',
  },
  'Ardra Nakshatra Yantra': {
    en: 'The Ardra Nakshatra Yantra is a metallic spiritual diagram traditionally associated with reflection, resilience, and a positive outlook. Some people include it in their faith practice or keep it at home or work as a reminder of emotional balance and perseverance. Traditional Beliefs: Some traditions associate Ardra Nakshatra with family, health, business, and vastu concerns. These are matters of belief; the yantra is not proven to resolve emotional or family difficulties, treat health concerns, correct vastu, or guarantee business stability or prosperity. Crafting and Placement: The yantra is described as being made with sacred geometry and energized through rituals. It may be placed in a puja room, in the northeast corner of a home, or in an office as part of a personal spiritual practice. Conclusion: The Ardra Nakshatra Yantra can be a meaningful spiritual symbol for reflection and resilience. It is not a substitute for healthcare, financial, or other professional advice.',
    hi: 'आर्द्रा नक्षत्र यंत्र धातु से बनी एक आध्यात्मिक आकृति है, जिसे पारंपरिक रूप से आत्मचिंतन, दृढ़ता और सकारात्मक दृष्टिकोण से जोड़ा जाता है। कुछ लोग इसे अपनी धार्मिक आस्था का हिस्सा बनाते हैं या भावनात्मक संतुलन और धैर्य की याद दिलाने के लिए घर अथवा कार्यस्थल पर रखते हैं। पारंपरिक मान्यताएँ: कुछ परंपराओं में आर्द्रा नक्षत्र को परिवार, स्वास्थ्य, व्यवसाय और वास्तु संबंधी चिंताओं से जोड़ा जाता है। ये आस्था से जुड़ी मान्यताएँ हैं; इस बात का प्रमाण नहीं है कि यह यंत्र भावनात्मक या पारिवारिक कठिनाइयों को दूर करता, स्वास्थ्य समस्याओं का उपचार करता, वास्तु दोष ठीक करता या व्यवसायिक स्थिरता अथवा समृद्धि की गारंटी देता है। निर्माण और स्थापना: बताया जाता है कि यह यंत्र पवित्र ज्यामितीय सिद्धांतों से बनाया जाता है और अनुष्ठानों द्वारा ऊर्जित किया जाता है। इसे व्यक्तिगत आध्यात्मिक साधना के हिस्से के रूप में पूजा-कक्ष, घर के उत्तर-पूर्वी कोने या कार्यालय में रखा जा सकता है। निष्कर्ष: आर्द्रा नक्षत्र यंत्र आत्मचिंतन और दृढ़ता के लिए एक अर्थपूर्ण आध्यात्मिक प्रतीक हो सकता है। यह स्वास्थ्य, वित्तीय या अन्य पेशेवर सलाह का विकल्प नहीं है।',
  },
  'Chitra Nakshatra Yantra': {
    en: 'The Chitra Nakshatra Yantra is associated with Chitra, symbolized by a shining jewel or pearl and traditionally connected with Mars and Vishwakarma, the divine architect. Some people use it as a spiritual focus for inspiration, concentration, and reflection on personal direction. Traditional Beliefs: Astrological traditions may associate Chitra Nakshatra with family, health, relationships, business, finances, and vastu. These are matters of belief; the yantra is not proven to resolve family or health concerns, improve financial outcomes, or correct vastu, and it does not guarantee protection, stability, or prosperity. Crafting and Placement: The yantra is described as being made with sacred geometry and energized through mantras by Gurudev G. D. Vashist Ji. It may be placed in a puja room, in the northeast corner of a home, or in a business space as part of personal spiritual practice. Conclusion: The Chitra Nakshatra Yantra can be a meaningful spiritual symbol for reflection and personal practice. It is not a substitute for medical, financial, or other professional advice.',
    hi: 'चित्रा नक्षत्र यंत्र का संबंध चित्रा नक्षत्र से है, जिसका प्रतीक चमकता हुआ रत्न या मोती माना जाता है और जिसे पारंपरिक रूप से मंगल तथा दिव्य वास्तुकार भगवान विश्वकर्मा से जोड़ा जाता है। कुछ लोग इसे प्रेरणा, एकाग्रता और जीवन की दिशा पर आत्मचिंतन के लिए आध्यात्मिक माध्यम के रूप में अपनाते हैं। पारंपरिक मान्यताएँ: ज्योतिषीय परंपराओं में चित्रा नक्षत्र को परिवार, स्वास्थ्य, संबंधों, व्यवसाय, वित्त और वास्तु से जोड़ा जा सकता है। ये आस्था से जुड़ी मान्यताएँ हैं; इस बात का प्रमाण नहीं है कि यह यंत्र पारिवारिक या स्वास्थ्य संबंधी चिंताओं को दूर करता, वित्तीय परिणाम बेहतर करता या वास्तु दोष ठीक करता है। यह सुरक्षा, स्थिरता या समृद्धि की गारंटी भी नहीं देता। निर्माण और स्थापना: बताया जाता है कि यह यंत्र पवित्र ज्यामितीय आकृतियों से बनाया जाता है और गुरुदेव जी. डी. वशिष्ठ जी द्वारा मंत्रों से ऊर्जित किया जाता है। इसे व्यक्तिगत आध्यात्मिक साधना के हिस्से के रूप में पूजा-कक्ष, घर के उत्तर-पूर्वी कोने या व्यवसाय-स्थल में रखा जा सकता है। निष्कर्ष: चित्रा नक्षत्र यंत्र आत्मचिंतन और व्यक्तिगत साधना का एक अर्थपूर्ण आध्यात्मिक प्रतीक हो सकता है। यह चिकित्सा, वित्तीय या अन्य पेशेवर सलाह का विकल्प नहीं है।',
  },
  'Dhanishtha Nakshatra Yantra': {
    en: 'The Dhanishtha Nakshatra Yantra is a metallic spiritual symbol traditionally associated with abundance, prosperity, and success. Some people use or wear it as a focus for intentions related to financial stability, career goals, and personal growth. Traditional Beliefs: Astrological traditions may associate Dhanishtha Nakshatra with family, health, business, finances, and vastu. These are matters of belief; the yantra is not proven to attract wealth, remove obstacles, resolve family or health concerns, improve financial outcomes, or correct vastu, and it does not guarantee success or protection. Crafting and Placement: The yantra is described as being made with sacred geometry and energized through rituals by Gurudev G. D. Vashist Ji. It may be placed in a puja room, in the northeast corner of a home, or in an office as part of personal spiritual practice. Conclusion: The Dhanishtha Nakshatra Yantra can be a meaningful spiritual symbol for reflection and personal practice. It is not a substitute for medical, financial, or other professional advice.',
    hi: 'धनिष्ठा नक्षत्र यंत्र एक धातु का आध्यात्मिक प्रतीक है, जिसे पारंपरिक रूप से प्रचुरता, समृद्धि और सफलता से जोड़ा जाता है। कुछ लोग इसे आर्थिक स्थिरता, करियर के लक्ष्यों और व्यक्तिगत विकास से जुड़े संकल्पों के लिए आध्यात्मिक माध्यम के रूप में अपनाते या धारण करते हैं। पारंपरिक मान्यताएँ: ज्योतिषीय परंपराओं में धनिष्ठा नक्षत्र को परिवार, स्वास्थ्य, व्यवसाय, वित्त और वास्तु से जोड़ा जा सकता है। ये आस्था से जुड़ी मान्यताएँ हैं; इस बात का प्रमाण नहीं है कि यह यंत्र धन आकर्षित करता, बाधाएँ दूर करता, पारिवारिक या स्वास्थ्य संबंधी चिंताओं को हल करता, वित्तीय परिणाम बेहतर करता या वास्तु दोष ठीक करता है। यह सफलता या सुरक्षा की गारंटी भी नहीं देता। निर्माण और स्थापना: बताया जाता है कि यह यंत्र पवित्र ज्यामितीय आकृतियों से बनाया जाता है और गुरुदेव जी. डी. वशिष्ठ जी द्वारा अनुष्ठानों से ऊर्जित किया जाता है। इसे व्यक्तिगत आध्यात्मिक साधना के हिस्से के रूप में पूजा-कक्ष, घर के उत्तर-पूर्वी कोने या कार्यालय में रखा जा सकता है। निष्कर्ष: धनिष्ठा नक्षत्र यंत्र आत्मचिंतन और व्यक्तिगत साधना का एक अर्थपूर्ण आध्यात्मिक प्रतीक हो सकता है। यह चिकित्सा, वित्तीय या अन्य पेशेवर सलाह का विकल्प नहीं है।',
  },
  'Hasta Nakshatra Yantra': {
    en: 'The Hasta Nakshatra Yantra represents creativity, efficiency, and healing energy traditionally associated with Hasta, the 13th lunar mansion in astrology. Some people use it as a spiritual reminder to nurture positivity, balance, and personal growth, and to approach challenges as opportunities to learn. Traditional Beliefs: Astrological traditions may associate Hasta Nakshatra with family, health, business, finances, and vastu. These are matters of belief; the yantra is not proven to improve physical, mental, or emotional health, resolve family conflicts, improve financial outcomes, or correct vastu, and it does not guarantee protection or success. Crafting and Placement: The yantra is described as being made with sacred geometry and energized through rituals by Gurudev G. D. Vashist Ji. It may be placed in a puja room, in the northeast corner of a home, or in a business space as part of personal spiritual practice. Conclusion: The Hasta Nakshatra Yantra can be a meaningful spiritual symbol for reflection and personal practice. It is not a substitute for medical, financial, or other professional advice.',
    hi: 'हस्त नक्षत्र यंत्र रचनात्मकता, कुशलता और उपचारात्मक ऊर्जा का प्रतीक है, जिन्हें पारंपरिक रूप से ज्योतिष के 13वें चंद्र नक्षत्र हस्त से जोड़ा जाता है। कुछ लोग इसे सकारात्मकता, संतुलन और व्यक्तिगत विकास को बढ़ावा देने तथा चुनौतियों को सीखने के अवसर के रूप में देखने की आध्यात्मिक याद दिलाने वाले प्रतीक के रूप में अपनाते हैं। पारंपरिक मान्यताएँ: ज्योतिषीय परंपराओं में हस्त नक्षत्र को परिवार, स्वास्थ्य, व्यवसाय, वित्त और वास्तु से जोड़ा जा सकता है। ये आस्था से जुड़ी मान्यताएँ हैं; इस बात का प्रमाण नहीं है कि यह यंत्र शारीरिक, मानसिक या भावनात्मक स्वास्थ्य बेहतर करता, पारिवारिक विवाद हल करता, वित्तीय परिणाम बेहतर करता या वास्तु दोष ठीक करता है। यह सुरक्षा या सफलता की गारंटी भी नहीं देता। निर्माण और स्थापना: बताया जाता है कि यह यंत्र पवित्र ज्यामितीय आकृतियों से बनाया जाता है और गुरुदेव जी. डी. वशिष्ठ जी द्वारा अनुष्ठानों से ऊर्जित किया जाता है। इसे व्यक्तिगत आध्यात्मिक साधना के हिस्से के रूप में पूजा-कक्ष, घर के उत्तर-पूर्वी कोने या व्यवसाय-स्थल में रखा जा सकता है। निष्कर्ष: हस्त नक्षत्र यंत्र आत्मचिंतन और व्यक्तिगत साधना का एक अर्थपूर्ण आध्यात्मिक प्रतीक हो सकता है। यह चिकित्सा, वित्तीय या अन्य पेशेवर सलाह का विकल्प नहीं है।',
  },
  'Jyeshtha Nakshatra Yantra': {
    en: 'The Jyeshtha Nakshatra Yantra is an astrological geometric-metallic design traditionally associated with leadership, strength, and protection. Some people include it in their faith practice as a symbol of confidence, self-reflection, and decisiveness in social or professional life. Traditional Beliefs: Astrological traditions may associate Jyeshtha Nakshatra with family, health, business, finances, and vastu. These are matters of belief; the yantra is not proven to change emotions or behavior, resolve family or health concerns, improve financial outcomes, or correct vastu, and it does not guarantee recognition, protection, or success. Crafting and Placement: The yantra is described as being made with sacred geometry and energized through rituals by Gurudev G. D. Vashist Ji. It may be placed in a puja room, in the northeast corner of a home, or in a business space as part of personal spiritual practice. Conclusion: The Jyeshtha Nakshatra Yantra can be a meaningful spiritual symbol for reflection and personal practice. It is not a substitute for medical, financial, or other professional advice.',
    hi: 'ज्येष्ठा नक्षत्र यंत्र एक ज्योतिषीय ज्यामितीय-धातु आकृति है, जिसे पारंपरिक रूप से नेतृत्व, शक्ति और सुरक्षा से जोड़ा जाता है। कुछ लोग इसे सामाजिक या पेशेवर जीवन में आत्मविश्वास, आत्मचिंतन और निर्णय क्षमता के प्रतीक के रूप में अपनी आस्था का हिस्सा बनाते हैं। पारंपरिक मान्यताएँ: ज्योतिषीय परंपराओं में ज्येष्ठा नक्षत्र को परिवार, स्वास्थ्य, व्यवसाय, वित्त और वास्तु से जोड़ा जा सकता है। ये आस्था से जुड़ी मान्यताएँ हैं; इस बात का प्रमाण नहीं है कि यह यंत्र भावनाओं या व्यवहार में बदलाव लाता, पारिवारिक या स्वास्थ्य संबंधी चिंताओं को हल करता, वित्तीय परिणाम बेहतर करता या वास्तु दोष ठीक करता है। यह पहचान, सुरक्षा या सफलता की गारंटी भी नहीं देता। निर्माण और स्थापना: बताया जाता है कि यह यंत्र पवित्र ज्यामितीय आकृतियों से बनाया जाता है और गुरुदेव जी. डी. वशिष्ठ जी द्वारा अनुष्ठानों से ऊर्जित किया जाता है। इसे व्यक्तिगत आध्यात्मिक साधना के हिस्से के रूप में पूजा-कक्ष, घर के उत्तर-पूर्वी कोने या व्यवसाय-स्थल में रखा जा सकता है। निष्कर्ष: ज्येष्ठा नक्षत्र यंत्र आत्मचिंतन और व्यक्तिगत साधना का एक अर्थपूर्ण आध्यात्मिक प्रतीक हो सकता है। यह चिकित्सा, वित्तीय या अन्य पेशेवर सलाह का विकल्प नहीं है।',
  },
  'Krittika Nakshatra Yantra': {
    en: 'The Krittika Nakshatra Yantra is an astrological metallic symbol traditionally associated with inner peace and emotional stability. Some people use it as a spiritual reminder to practice self-control and approach disagreements calmly in personal and professional relationships. Traditional Beliefs: Astrological traditions may associate Krittika Nakshatra with family, health, business, finances, and vastu. These are matters of belief; the yantra is not proven to change behavior, resolve relationship or health concerns, improve financial outcomes, or correct vastu, and it does not guarantee protection or success. Crafting and Placement: The yantra is described as being made with sacred geometry and energized through rituals by Gurudev G. D. Vashist Ji. It may be placed in a puja room, in the northeast corner of a home, or in a business space as part of personal spiritual practice. Conclusion: The Krittika Nakshatra Yantra can be a meaningful spiritual symbol for reflection and personal practice. It is not a substitute for medical, financial, or other professional advice.',
    hi: 'कृत्तिका नक्षत्र यंत्र एक ज्योतिषीय धातु-प्रतीक है, जिसे पारंपरिक रूप से आंतरिक शांति और भावनात्मक स्थिरता से जोड़ा जाता है। कुछ लोग इसे व्यक्तिगत और पेशेवर संबंधों में आत्म-संयम का अभ्यास करने तथा मतभेदों का शांतिपूर्वक सामना करने की आध्यात्मिक याद दिलाने वाले प्रतीक के रूप में अपनाते हैं। पारंपरिक मान्यताएँ: ज्योतिषीय परंपराओं में कृत्तिका नक्षत्र को परिवार, स्वास्थ्य, व्यवसाय, वित्त और वास्तु से जोड़ा जा सकता है। ये आस्था से जुड़ी मान्यताएँ हैं; इस बात का प्रमाण नहीं है कि यह यंत्र व्यवहार बदलता, संबंधों या स्वास्थ्य संबंधी चिंताओं को हल करता, वित्तीय परिणाम बेहतर करता या वास्तु दोष ठीक करता है। यह सुरक्षा या सफलता की गारंटी भी नहीं देता। निर्माण और स्थापना: बताया जाता है कि यह यंत्र पवित्र ज्यामितीय आकृतियों से बनाया जाता है और गुरुदेव जी. डी. वशिष्ठ जी द्वारा अनुष्ठानों से ऊर्जित किया जाता है। इसे व्यक्तिगत आध्यात्मिक साधना के हिस्से के रूप में पूजा-कक्ष, घर के उत्तर-पूर्वी कोने या व्यवसाय-स्थल में रखा जा सकता है। निष्कर्ष: कृत्तिका नक्षत्र यंत्र आत्मचिंतन और व्यक्तिगत साधना का एक अर्थपूर्ण आध्यात्मिक प्रतीक हो सकता है। यह चिकित्सा, वित्तीय या अन्य पेशेवर सलाह का विकल्प नहीं है।',
  },
  'Anuradha Locket': {
    en: 'The Anuradha Nakshatra Yantra is traditionally associated with friendship, cooperation, patience, perseverance, and leadership. Some people include it in a personal faith practice or keep it at home or work as a symbol of reflection and harmony. Traditional Beliefs: Some traditions associate the Anuradha Nakshatra with family, relationships, business, and vastu concerns. These are matters of belief; the yantra is not proven to resolve health, relationship, financial, or vastu problems, and it does not guarantee protection or success. Crafting and Placement: The yantra is described as being crafted with sacred geometry and ritually energized. It may be placed in a puja room, in the northeast corner of a home, or in an office as part of personal spiritual practice. Conclusion: The Anuradha Nakshatra Yantra can be a meaningful spiritual symbol for reflection, friendship, and cooperation. It is not a substitute for medical, financial, or other professional advice.',
    hi: 'अनुराधा नक्षत्र यंत्र पारंपरिक रूप से मित्रता, सहयोग, धैर्य, दृढ़ता और नेतृत्व से जुड़ा है। कुछ लोग इसे अपनी व्यक्तिगत धार्मिक आस्था का हिस्सा बनाते हैं या आत्मचिंतन और सामंजस्य के प्रतीक के रूप में घर अथवा कार्यस्थल पर रखते हैं। पारंपरिक मान्यताएँ: कुछ परंपराओं में अनुराधा नक्षत्र को परिवार, संबंधों, व्यवसाय और वास्तु संबंधी चिंताओं से जोड़ा जाता है। ये आस्था से जुड़ी मान्यताएँ हैं; इस बात का प्रमाण नहीं है कि यह यंत्र स्वास्थ्य, संबंध, वित्तीय या वास्तु समस्याओं को दूर करता है, और यह सुरक्षा या सफलता की गारंटी नहीं देता। निर्माण और स्थापना: बताया जाता है कि यह यंत्र पवित्र ज्यामितीय आकृतियों से बनाया जाता है और अनुष्ठानों द्वारा ऊर्जित किया जाता है। इसे व्यक्तिगत आध्यात्मिक साधना के हिस्से के रूप में पूजा-कक्ष, घर के उत्तर-पूर्वी कोने या कार्यालय में रखा जा सकता है। निष्कर्ष: अनुराधा नक्षत्र यंत्र आत्मचिंतन, मित्रता और सहयोग का एक अर्थपूर्ण आध्यात्मिक प्रतीक हो सकता है। यह चिकित्सा, वित्तीय या अन्य पेशेवर सलाह का विकल्प नहीं है।',
  },
  'Meen (Pisces) Rashi Yantra': {
    en: 'Discover the Meen Rashi Yantra, a square coin crafted from silver and infused with 2 mg of 24 Kt gold, available with or without Kunda. Associated with the Pisces sun sign, it may be used as a spiritual symbol for reflection, positivity, and personal growth. Key Benefits: 1. May be included in a personal spiritual practice for reflection and a positive outlook; it does not treat anxiety or other mental health conditions. 2. A personal reminder to reflect on goals and challenges; it does not remove obstacles or guarantee success. 3. May serve as a focus for prayers for well-being; it does not prevent or treat fever, coughs, or other health conditions. Craftsmanship The Meen Rashi Yantra combines silver and 24 Kt gold in a design inspired by Pisces. Placement Wear it as a pendant, keep it in your personal space, or place it on an altar as part of your spiritual practice. Conclusion The Meen Rashi Yantra can be a meaningful keepsake for personal reflection and spiritual practice. It does not prevent falls or other accidents and is not a substitute for medical care. For health concerns, consult a qualified healthcare professional.',
    hi: 'मीन राशि में जन्मे कुछ लोग इस यंत्र को अपनी आस्था और आध्यात्मिक साधना के प्रतीक के रूप में गले में धारण कर सकते हैं, जेब में रख सकते हैं या पूजा-स्थान पर स्थापित कर सकते हैं। पारंपरिक मान्यता में इसे सुख-शांति, सकारात्मकता और व्यक्तिगत विकास की कामना से जोड़ा जाता है। हवन-पूजन के बाद यंत्र की प्राण-प्रतिष्ठा करने की परंपरा के लिए मंदिर के पुजारी या पंडित से मार्गदर्शन लिया जा सकता है। यह आध्यात्मिक आस्था का अभ्यास है; यह निराशा, खांसी, बुखार या अन्य स्वास्थ्य समस्याओं का इलाज नहीं है और न ही गिरने या अन्य दुर्घटनाओं से सुरक्षा अथवा सफलता की गारंटी देता है। स्वास्थ्य संबंधी चिंताओं के लिए योग्य स्वास्थ्य विशेषज्ञ से सलाह लें।',
  },
  'Kumbh (Aquarius) Rashi Yantra': {
    en: 'Discover the Kumbh Rashi Yantra, a round coin crafted from a blend of iron and ore rhodium, available with or without Kunda. Associated with the Aquarius sun sign, it may be used as a spiritual symbol for reflection, personal growth, and intentions around prosperity. Key Benefits: 1. May serve as a personal reminder to reflect on habits and positive choices; it does not treat addiction or replace professional support. 2. May be included in a personal spiritual practice for well-being; it does not prevent or treat coughs, hair or other health concerns, or phobias. 3. A symbol for reflecting on prosperity and relationships; it does not guarantee financial, marital, fertility, or family outcomes. Craftsmanship The Kumbh Rashi Yantra features a geometric design in iron and ore rhodium. Placement Wear it as a pendant, carry it in your pocket, or place it on an altar as part of your spiritual practice. Conclusion The Kumbh Rashi Yantra may be a meaningful spiritual keepsake for personal reflection. It is not a substitute for medical care or professional support. For health or substance-use concerns, consult a qualified healthcare professional.',
    hi: 'कुम्भ राशि में जन्मे कुछ लोग इस यंत्र को अपनी आस्था और आध्यात्मिक साधना के प्रतीक के रूप में गले में धारण कर सकते हैं, जेब में रख सकते हैं या पूजा-स्थान पर स्थापित कर सकते हैं। पारंपरिक मान्यता में इसे सुख-शांति, आत्मचिंतन और समृद्धि की कामना से जोड़ा जाता है। हवन-पूजन के बाद यंत्र की प्राण-प्रतिष्ठा करने की परंपरा के लिए मंदिर के पुजारी या पंडित से मार्गदर्शन लिया जा सकता है। यह आध्यात्मिक आस्था का अभ्यास है; यह नशे की लत या खांसी-जुकाम, बालों, फोबिया अथवा अन्य स्वास्थ्य संबंधी समस्याओं का इलाज नहीं है और न ही आर्थिक, वैवाहिक या संतान संबंधी परिणामों की गारंटी देता है। स्वास्थ्य या नशे के सेवन संबंधी चिंताओं के लिए योग्य स्वास्थ्य विशेषज्ञ से सलाह लें।',
  },
  'Makar (Capricorn) Rashi Yantra': {
    en: 'Discover the Makar Rashi Yantra, crafted from a combination of iron and ore rhodium, available with or without Kunda. Associated with the Capricorn sun sign, it may be used as a spiritual symbol for reflection, motivation, and personal growth. Key Benefits: 1. May serve as a personal reminder to approach tasks with focus; it does not treat procrastination or indecisiveness. 2. May be included in a personal spiritual practice for well-being; it does not prevent or treat colds, flu, fever, or other health conditions. 3. A personal symbol for reflection; it does not prevent accidents, drowning, or injuries. Craftsmanship The Makar Rashi Yantra is designed to reflect qualities traditionally associated with Capricorn and can be kept as a spiritual keepsake. Placement Wear it as a pendant, keep it in your pocket, or place it on an altar as part of your spiritual practice. Conclusion The Makar Rashi Yantra may be a meaningful addition to a personal faith practice. It is not a substitute for medical care or a safety measure. For health concerns, consult a qualified healthcare professional and follow appropriate safety practices.',
    hi: 'मकर राशि में जन्मे कुछ लोग इस यंत्र को अपनी आस्था और आध्यात्मिक साधना के प्रतीक के रूप में गले में धारण कर सकते हैं, जेब में रख सकते हैं या पूजा-स्थान पर स्थापित कर सकते हैं। पारंपरिक मान्यता में इसे सुख-शांति, समृद्धि और कार्यों पर ध्यान केंद्रित करने की कामना से जोड़ा जाता है। हवन-पूजन के बाद यंत्र की प्राण-प्रतिष्ठा करने की परंपरा के लिए मंदिर के पुजारी या पंडित से मार्गदर्शन लिया जा सकता है। यह आध्यात्मिक आस्था का अभ्यास है; यह सर्दी, जुकाम, बुखार या अन्य स्वास्थ्य समस्याओं का इलाज नहीं है और न ही डूबने, चोट या दुर्घटना से सुरक्षा की गारंटी देता है। स्वास्थ्य संबंधी चिंताओं के लिए योग्य स्वास्थ्य विशेषज्ञ से सलाह लें और उचित सुरक्षा सावधानियाँ अपनाएँ।',
  },
  'Dhanu (Sagittarius) Rashi Yantra': {
    en: 'Discover the Dhanu Rashi Yantra, a square coin crafted from silver and infused with 2 mg of 24 Kt gold, available with or without Kunda. Associated with the Sagittarius sun sign, it may be used as a spiritual symbol for reflection, happiness, and respect. Key Benefits: 1. A focus for prayers and reflection on well-being; the yantra does not relieve physical pain or treat health conditions. 2. May be included in a personal spiritual practice for reflection on family harmony and happiness; it does not guarantee relationship or child-related outcomes. 3. A personal symbol for reflecting on respect and recognition; it does not guarantee personal or professional outcomes. Craftsmanship The Dhanu Rashi Yantra combines silver and 24 Kt gold in a design inspired by Sagittarius. Placement Wear it as a pendant, keep it in your personal space, or place it on an altar as part of your spiritual practice. Conclusion The Dhanu Rashi Yantra can be a meaningful keepsake for personal reflection and spiritual practice. For physical pain or other health concerns, consult a qualified healthcare professional.',
    hi: 'धनु राशि में जन्मे कुछ लोग इस यंत्र को अपनी आस्था और आध्यात्मिक साधना के प्रतीक के रूप में गले में धारण कर सकते हैं, जेब में रख सकते हैं या पूजा-स्थान पर स्थापित कर सकते हैं। पारंपरिक मान्यता में इसे सुख-शांति, समृद्धि और पारिवारिक सामंजस्य की कामना से जोड़ा जाता है। हवन-पूजन के बाद यंत्र की प्राण-प्रतिष्ठा करने की परंपरा के लिए मंदिर के पुजारी या पंडित से मार्गदर्शन लिया जा सकता है। यह आध्यात्मिक आस्था का अभ्यास है; यह शारीरिक पीड़ा या किसी स्वास्थ्य समस्या का इलाज नहीं है और न ही जीवनसाथी, संतान या सम्मान से जुड़े परिणामों की गारंटी देता है। स्वास्थ्य संबंधी चिंताओं के लिए योग्य स्वास्थ्य विशेषज्ञ से सलाह लें।',
  },
  'Vrishchik (Scorpio) Rashi Yantra': {
    en: 'Discover the Vrishchik Rashi Yantra, a triangular coin crafted from copper and rose gold, available with or without Kunda. Associated with the Scorpio sun sign, it may be used as a spiritual symbol for reflection, resilience, and personal growth. Key Benefits: 1. May serve as a focus for reflection when facing personal challenges; it does not remove obstacles or protect against adversaries. 2. A personal reminder to reflect on professional goals; it does not resolve workplace conflicts or guarantee career advancement. 3. May be included in a personal spiritual practice for calm and self-reflection. It does not treat anger, confidence concerns, or substance addiction. Craftsmanship The Vrishchik Rashi Yantra features a triangular design in copper and rose gold, making it a spiritual keepsake. Placement Wear it as a pendant, keep it in your pocket, or place it on a personal altar as part of your spiritual practice. Conclusion The Vrishchik Rashi Yantra may be a meaningful symbol for reflection and personal practice. For concerns about substance use or emotional well-being, consult a qualified healthcare professional.',
    hi: 'वृश्चिक राशि में जन्मे कुछ लोग इस यंत्र को अपनी आस्था और आध्यात्मिक साधना के प्रतीक के रूप में गले में धारण कर सकते हैं, जेब में रख सकते हैं या पूजा-स्थान पर स्थापित कर सकते हैं। पारंपरिक मान्यता में इसे सुख-शांति, आत्मचिंतन और व्यक्तिगत संतुलन की कामना से जोड़ा जाता है। हवन-पूजन के बाद यंत्र की प्राण-प्रतिष्ठा करने की परंपरा के लिए मंदिर के पुजारी या पंडित से मार्गदर्शन लिया जा सकता है। यह आध्यात्मिक आस्था का अभ्यास है; यह कार्यक्षेत्र की समस्याओं, क्रोध या नशीले पदार्थों के सेवन संबंधी समस्या का समाधान अथवा शत्रुओं से सुरक्षा की गारंटी नहीं देता। नशीले पदार्थों के सेवन या भावनात्मक स्वास्थ्य संबंधी चिंता के लिए योग्य स्वास्थ्य विशेषज्ञ से सलाह लें।',
  },
  'Tula (Libra) Rashi Yantra': {
    en: 'Discover the Tula Rashi Yantra, a silver square coin available with or without Kunda. Associated with the Libra sun sign, it may be used as a spiritual symbol for balance, reflection, and harmony in relationships. Key Benefits: 1. A focus for prayers and reflection on well-being. The yantra does not treat respiratory, head, stomach, skin, or other health conditions. 2. May be included in a personal spiritual practice for calm and balance; it does not prevent accidents or injuries. 3. A personal symbol for reflecting on relationship harmony and happiness; it does not guarantee fertility or relationship outcomes. Craftsmanship The Tula Rashi Yantra is designed to reflect balance and harmony traditionally associated with Libra. Placement Wear it as a pendant, keep it in your personal space, or place it on an altar as part of your spiritual practice. Conclusion The Tula Rashi Yantra can be a meaningful spiritual keepsake for reflection and personal practice. It is not a substitute for medical care. For health or fertility concerns, consult a qualified healthcare professional.',
    hi: 'तुला राशि में जन्मे कुछ लोग इस यंत्र को अपनी आस्था और आध्यात्मिक साधना के प्रतीक के रूप में गले में धारण कर सकते हैं, जेब में रख सकते हैं या पूजा-स्थान पर स्थापित कर सकते हैं। पारंपरिक मान्यता में इसे सुख-शांति, संतुलन और संबंधों में सामंजस्य की कामना से जोड़ा जाता है। हवन-पूजन के बाद यंत्र की प्राण-प्रतिष्ठा करने की परंपरा के लिए मंदिर के पुजारी या पंडित से मार्गदर्शन लिया जा सकता है। यह आध्यात्मिक आस्था का अभ्यास है; यह श्वसन, सिर, पेट, त्वचा या अन्य स्वास्थ्य समस्याओं का इलाज नहीं है और न ही दुर्घटना या चोट से सुरक्षा अथवा प्रजनन संबंधी परिणामों की गारंटी देता है। स्वास्थ्य संबंधी चिंताओं के लिए योग्य स्वास्थ्य विशेषज्ञ से सलाह लें।',
  },
  'Kanya (Virgo) Rashi Yantra': {
    en: 'Discover the Kanya Rashi Yantra, a round coin crafted from a blend of three metals and infused with 1 mg of gold, available with or without Kunda. Associated with the Virgo sun sign, it may be used as a spiritual symbol for reflection, personal growth, and intentions around prosperity. Key Benefits: 1. A focus for prayers and reflection on well-being. The yantra does not treat eye, stomach, phlegm-related, or other health conditions. 2. May serve as a personal reminder of financial goals; it does not guarantee wealth or financial stability. 3. May be included in a personal spiritual practice for self-reflection and balance. Craftsmanship Each Kanya Rashi Yantra is crafted from a blend of three metals with an addition of gold. Its design makes it a spiritual keepsake and decorative accessory. Placement Wear the yantra as a pendant, keep it in your personal space, or place it on an altar as part of your spiritual practice. Conclusion The Kanya Rashi Yantra can be a meaningful personal symbol for reflection and spiritual practice. It does not prevent burns, falls, bites, or other injuries and is not a substitute for medical care. For health concerns, consult a qualified healthcare professional.',
    hi: 'कन्या राशि में जन्मे कुछ लोग इस यंत्र को अपनी आस्था और आध्यात्मिक साधना के प्रतीक के रूप में गले में धारण कर सकते हैं, जेब में रख सकते हैं या पूजा-स्थान पर स्थापित कर सकते हैं। पारंपरिक मान्यता में इसे सुख-शांति, समृद्धि और व्यक्तिगत संतुलन की कामना से जोड़ा जाता है। हवन-पूजन के बाद यंत्र की प्राण-प्रतिष्ठा करने की परंपरा के लिए मंदिर के पुजारी या पंडित से मार्गदर्शन लिया जा सकता है। यह आध्यात्मिक आस्था का अभ्यास है; यह कफ, पेट या नेत्र संबंधी रोगों का इलाज नहीं है और न ही आग से जलने, गिरने, जीव-जंतु के काटने या अन्य चोटों से सुरक्षा की गारंटी देता है। स्वास्थ्य संबंधी चिंताओं के लिए योग्य स्वास्थ्य विशेषज्ञ से सलाह लें।',
  },
  'Singh (Leo) Rashi Yantra': {
    en: 'Discover the Singh Rashi Yantra, a triangular coin crafted from copper and rose gold, available with or without Kunda. Associated with the Leo sun sign, it may be used as a spiritual symbol for reflection, emotional well-being, and personal happiness. Key Benefits: 1. A focus for prayers and reflection on well-being. The yantra does not treat dental, head, throat, stomach, or other health conditions. 2. May be included in a personal spiritual practice for calm and emotional balance. It does not treat depression or other mental health conditions. 3. A personal symbol for reflecting on family happiness and well-being. Craftsmanship Each Singh Rashi Yantra combines copper and rose gold in a triangular design traditionally associated with Leo. Placement Wear the yantra as a pendant, keep it in your pocket, or place it on a personal altar as part of your spiritual practice. Conclusion The Singh Rashi Yantra can be a meaningful spiritual keepsake. It does not prevent fires, theft, illness, or other harm, and is not a substitute for medical care. For health concerns, consult a qualified healthcare professional.',
    hi: 'सिंह राशि में जन्मे कुछ लोग इस यंत्र को अपनी आस्था और आध्यात्मिक साधना के प्रतीक के रूप में गले में धारण कर सकते हैं, जेब में रख सकते हैं या पूजा-स्थान पर स्थापित कर सकते हैं। पारंपरिक मान्यता में इसे सुख-शांति, भावनात्मक संतुलन और पारिवारिक खुशहाली की कामना से जोड़ा जाता है। हवन-पूजन के बाद यंत्र की प्राण-प्रतिष्ठा करने की परंपरा के लिए मंदिर के पुजारी या पंडित से मार्गदर्शन लिया जा सकता है। यह आध्यात्मिक आस्था का अभ्यास है; यह दांत, सिर, गले, पेट या मानसिक स्वास्थ्य संबंधी समस्याओं का इलाज नहीं है और न ही आग, चोरी, बीमारी या अन्य हानि से सुरक्षा की गारंटी देता है। स्वास्थ्य संबंधी चिंताओं के लिए योग्य स्वास्थ्य विशेषज्ञ से सलाह लें।',
  },
  'Kark (Cancer) Rashi Yantra': {
    en: 'Discover the Kark Rashi Yantra, a silver square coin available with or without Kunda. Associated with the Cancer sun sign, it may be kept as a spiritual symbol for reflection, emotional balance, and personal growth. Key Benefits: 1. A focus for prayers and reflection on well-being. The yantra does not prevent or treat coughs, colds, fever, or other health conditions. 2. May be included in a personal spiritual practice for calm and emotional balance. 3. A personal symbol for reflection when facing life’s challenges; it does not prevent accidents or determine legal or social outcomes. Craftsmanship The Kark Rashi Yantra is designed to reflect qualities traditionally associated with Cancer and can serve as a meaningful spiritual keepsake. Placement Keep the yantra in your personal space, wear it as a pendant, or place it on an altar as part of your spiritual practice. Conclusion The Kark Rashi Yantra may be a meaningful addition to a personal faith practice. It is not a substitute for medical or legal advice. For health concerns, consult a qualified healthcare professional; for legal concerns, seek advice from a qualified legal professional.',
    hi: 'कर्क राशि में जन्मे कुछ लोग इस यंत्र को अपनी आस्था और आध्यात्मिक साधना के प्रतीक के रूप में गले में धारण कर सकते हैं, जेब में रख सकते हैं या पूजा-स्थान पर स्थापित कर सकते हैं। पारंपरिक मान्यता में इसे सुख-शांति, भावनात्मक संतुलन और समृद्धि की कामना से जोड़ा जाता है। हवन-पूजन के बाद यंत्र की प्राण-प्रतिष्ठा करने की परंपरा के लिए मंदिर के पुजारी या पंडित से मार्गदर्शन लिया जा सकता है। यह आध्यात्मिक आस्था का अभ्यास है; यह खांसी, जुकाम, बुखार या अन्य स्वास्थ्य समस्याओं का इलाज नहीं है और न ही दुर्घटना या कानूनी परिणामों से सुरक्षा की गारंटी देता है। स्वास्थ्य संबंधी चिंताओं के लिए योग्य स्वास्थ्य विशेषज्ञ से और कानूनी मामलों के लिए योग्य कानूनी सलाहकार से संपर्क करें।',
  },
  'Mithun (Gemini) Rashi Yantra': {
    en: 'Discover the Mithun Rashi Yantra, crafted from a blend of three metals and infused with 1 mg of gold. Available with or without Kunda, this yantra is associated with the Gemini sun sign and may be used as a spiritual symbol for peace, reflection, and prosperity. Key Benefits: 1. A focus for intentions around financial stability and abundance. 2. May be included in a personal spiritual practice for reflection and a sense of reassurance. 3. A meaningful reminder to seek balance and well-being in daily life. Craftsmanship Each Mithun Rashi Yantra is crafted with a blend of three metals and an addition of gold. Its detailed design makes it both a spiritual keepsake and a decorative accessory. Placement Wear the yantra as a pendant or keep it in your pocket, or place it on a personal altar as part of your spiritual practice. Conclusion The Mithun Rashi Yantra can be a personal symbol for reflection and spiritual practice. It does not provide protection from harm or treat health conditions. For health concerns, consult a qualified healthcare professional.',
    hi: 'मिथुन राशि में जन्मे कुछ लोग इस यंत्र को अपनी आस्था और आध्यात्मिक साधना के प्रतीक के रूप में गले में धारण कर सकते हैं, जेब में रख सकते हैं या पूजा-स्थान पर स्थापित कर सकते हैं। पारंपरिक मान्यता में इसे सुख-शांति, समृद्धि और जीवन में संतुलन की कामना से जोड़ा जाता है। यंत्र को हवन-पूजन के बाद प्राण-प्रतिष्ठित करने की परंपरा के लिए मंदिर के पुजारी या पंडित से मार्गदर्शन लिया जा सकता है। यह आध्यात्मिक आस्था का अभ्यास है; यह स्वास्थ्य समस्याओं का इलाज या किसी प्रकार की हानि से सुरक्षा की गारंटी नहीं देता। स्वास्थ्य संबंधी चिंताओं के लिए योग्य स्वास्थ्य विशेषज्ञ से सलाह लें।',
  },
  'Vrishabh (Taurus) Rashi Yantra': {
    en: 'Discover the Vrishabh Rashi Yantra, a square coin crafted from silver and available with or without Kunda. This yantra is associated with the Taurus sun sign and may be used as a spiritual symbol for people seeking domestic harmony, well-being, and confidence when facing life’s challenges. Key Benefits: 1. Domestic Harmony: Use it as a personal spiritual reminder to nurture peace and understanding at home. 2. Well-Being: It may be included in spiritual practice as a focus for reflection and prayers for well-being; it does not treat stomach, eye, or other health conditions. 3. Facing Legal Challenges: Some may keep it as a personal symbol of reassurance; it does not prevent legal proceedings or penalties and is not legal advice. Craftsmanship Each Vrishabh Rashi Yantra is crafted with attention to detail, reflecting the grounded qualities traditionally associated with Taurus. Placement Keep the yantra at home, wear it as a pendant, or place it on a personal altar as part of your spiritual practice. Conclusion The Vrishabh Rashi Yantra can be a meaningful spiritual accessory for reflection and personal practice. For health concerns, consult a qualified healthcare professional; for legal concerns, seek advice from a qualified legal professional.',
    hi: 'वृषभ राशि में जन्मे कुछ लोग इस यंत्र को अपनी आस्था और आध्यात्मिक साधना के प्रतीक के रूप में घर में रख सकते हैं, गले में धारण कर सकते हैं या जेब में रख सकते हैं। परंपरागत रूप से इसे सुख-शांति, समृद्धि और जीवन में संतुलन की कामना से जोड़ा जाता है। यंत्र की प्राण-प्रतिष्ठा और पूजा व्यक्तिगत धार्मिक परंपरा के अनुसार की जा सकती है। यह यंत्र नेत्र रोग, सर्दी-जुकाम, अपच या किसी अन्य स्वास्थ्य समस्या का इलाज नहीं है और न ही कानूनी मामलों में परिणाम की गारंटी देता है। स्वास्थ्य संबंधी चिंताओं के लिए योग्य स्वास्थ्य विशेषज्ञ से और कानूनी मामलों के लिए योग्य कानूनी सलाहकार से संपर्क करें।',
  },
  'Mesh (Aries) Rashi Yantra': {
    en: 'Experience the power of the Mesh Rashi Yantra, a beautifully crafted triangle coin made from copper and rose gold. Designed for Aries sun sign individuals, this yantra promotes good luck, career growth, and emotional well-being. Key Benefits: 1. Promote Fortune and Prosperity: Attract happiness and abundance into your life with the yantra’s auspicious energies. 2. Career and Financial Growth: Aid your professional journey by enhancing clarity and motivation, helping to resolve financial challenges. 3. Enhance Emotional Well-Being: Manage anxiety, nervousness, and impatience with the yantra’s calming effects, promoting emotional balance. Craftsmanship Each Mesh Rashi Yantra is meticulously crafted from high-quality copper and rose gold, featuring intricate triangular designs that resonate with Aries energies. Its durable and radiant construction makes it both a powerful spiritual tool and an attractive accessory. Placement Wear the yantra as a pendant near your heart chakra, or keep it in your pocket for continuous access to its divine energies. Alternatively, place it on a personal altar to enhance your spiritual practices. Conclusion Incorporate the Mesh Rashi Yantra into your daily life as a personal talisman for luck and success. With its exquisite craftsmanship and transformative power, this yantra is your key to unlocking a brighter, more fulfilling future.',
    hi: 'जिन जातकों का जन्म मेष राशि में हुआ है यदि ऐसे जातक को अपने जीवन में किसी भी कार्य को करने से पहले घबरा जाना, कामो मे जल्दबाजी में करना और स्वभाव में चिड़चिड़ापन, रुपये पैसे की स्थिति एक जैसी नही रहती, कभी तो आपके पास बड़ी मात्रा मे धन होता हैं और कभी अपनी जरूरते पूरा कर पाना भी आपके लिए मुश्किल होता हैं, नाखूनो से संबन्धित परेशानी,ऋणकी समस्या है तो ऐसे जातकों को चाहिए कि वे अपने जीवन को लम्बे समय तक सुख शांति और समृद्धि से युक्त बनाए रखने में सहायक, विशेष बीज मंत्र युक्त यंत्र, जिसे जातक चाहे तो गले में धारण कर सकता है या फिर चाहे वो इसे जेब में भी रख सकता है,इस यंत्र को हवन पूजन द्वारा प्राण प्रतिष्ठित करने वाली विशिष्ट सामग्री जिसे श्रीगुरुदेव जी डी वशिष्ठ ने मेष राशि में उत्पन्न होने वाले जातकों के लिए विशेष रूप से निर्मित करवा कर जी डी वशिष्ठ ज्योतिष संस्थान में उपलब्ध करवाया है, इन सभी वस्तुओं को आप केवल यहीं से प्राप्त कर सकते हैं क्योंकि यह अन्य कहीं उपलब्ध नहीं हैं। जातक के द्वारा स्वयं किए जाने वाला यह उपाय तथा हवन पूजन कि विशिष्ट सामग्री के साथ प्राण प्रतिष्ठित करके धारण किए जाने वाला यंत्र उसे इसके साथ भावनात्मक रूप से जोड़ कर और साथ ही इसके सकारात्मक प्रभाव को आने वाले जीवन में लम्बे समय तक बनाए रखने में बहुत अधिक सहायक हो सकता है। जो जातक स्वयं इस उपाय को सम्पन्न नहीं कर सकता वो इसे अपने पास के किसी मंदिर के पुजारी या किसी पंडित से सम्पन्न करवा कर भी उसका समुचित लाभ प्राप्त कर सकता है।',
  },
  'Mahalaxmi Yantra': {
    en: 'Unlock the blessings of abundance with the Mahalaxmi Yantra by Astroscience, expertly crafted with precision to attract the divine favor of Goddess Lakshmi. This powerful yantra is designed to enhance your prosperity, making it ideal for boosting wealth and success in both your personal and professional life. Exceptional Craftsmanship The Mahalaxmi Yantra features an intricate design that beautifully marries spiritual significance with artistic elegance. Crafted with high-quality materials, it serves as a lasting symbol of prosperity, inviting positive energies into your space. Key Benefits: • Invites Continuous Financial Gain: Experience ongoing abundance! The Mahalaxmi Yantra is known for its ability to attract financial prosperity and continuous gains. By incorporating this yantra into your environment, you open yourself to new opportunities and enhance your wealth potential. • Enhances Success in Business and Personal Endeavors: Propel your ambitions forward. This yantra fosters success in various aspects of life, whether in business ventures or personal projects. By attracting positive energies, it empowers you to achieve your goals and make significant progress. • Brings Happiness and Auspiciousness: Create a joyful atmosphere. The Mahalaxmi Yantra not only promotes financial prosperity but also brings happiness and auspiciousness to your home and workplace. Its positive vibrations foster a harmonious environment, enhancing relationships and overall well-being. Optimal Placement To harness the full potential of the Mahalaxmi Yantra, place it in a prominent area of your home or office. Ideal locations include your living room, office desk, or any space where you conduct important activities, allowing its energies to continuously uplift and support your endeavors. Conclusion Investing in the Mahalaxmi Yantra is a significant step toward enhancing your prosperity and overall quality of life. By inviting financial gain, promoting success, and creating a harmonious environment, this yantra serves as a powerful ally in your journey toward abundance. Embrace the blessings of Goddess Lakshmi and transform your life with the Mahalaxmi Yantra today.',
    hi: `Brand – Astroscience
Yantra - महालक्ष्मी यंत्र
Religious Belief – देवी लक्ष्मी धन, समृद्धि, वित्तीय लाभ, सौभाग्य आदि का प्रतीक है महालक्ष्मी यंत्र द्वारा माँ लक्ष्मी की कृपा हमेशा आपके घर एवं व्यापार में बनी रहती है और हमेशा धन में वृद्धि होती रहती है अतः आपको अपने घर में महालक्ष्मी यंत्र स्थापित करना चाहिए ।
Benefits - महालक्ष्मी यंत्र के केन्द्र में माँ लक्ष्मी की आभा शक्ति करिश्मा है - यंत्र स्थापित करने के बाद आपके व्यापार या कामकाज में निरन्तर लाभ मिलता जाएगा । - व्यापार में सफलता एवं कार्य में प्रसिद्धि प्राप्त होगी - व्यापार में निरन्तर धन की बहुतायात वृद्धि होती रहेगी । - महालक्ष्मी यंत्र घर या कार्यालय में स्थापित करने से संबंधित कार्य में शुभता लाता है - घर में सुख-समृद्धि का वास होता है - कार्य में प्रगति होती है जिससे वैभव एवं ऐश्वर्य की प्राप्ति होती है - यंत्र के केंद्र में देवी की छवि होती है।`,
  },
  'Vyapar Yantra': {
    en: 'Unlock the potential of your business with the Vyapar Yantra by Astroscience, meticulously crafted from high-quality materials to attract success in trade and commerce. This powerful yantra is designed to enhance your business performance, providing effective solutions to challenges and obstacles you may face. Exceptional Craftsmanship The Vyapar Yantra combines aesthetic appeal with spiritual significance. Its high-quality construction ensures durability, while its intricate design resonates with energies that can significantly impact your business endeavors. Key Benefits: 1. Enhances Business Success: Elevate your business to new heights! The Vyapar Yantra is specifically designed to enhance business success by increasing sales and boosting profitability. By harnessing its positive energies, you can create a thriving environment that attracts customers and fosters growth. 2. Helps Recover Stuck Money: Tired of facing financial blockages? This yantra is known for its ability to help recover stuck funds and eliminate business debts. By promoting financial flow, it paves the way for greater cash flow and improved financial stability, ensuring that your business remains vibrant and resilient. 3. Resolves Business Problems: Navigate challenges with confidence. The Vyapar Yantra is a powerful tool for resolving business issues and removing obstacles to growth. Whether facing competition, operational challenges, or market fluctuations, this yantra helps you find effective solutions and maintain a steady trajectory towards success. Optimal Placement To harness the full potential of the Vyapar Yantra, place it in a strategic location within your office or workspace. Ideal spots include your desk, a meeting room, or near the entrance, where it can continually radiate positive energy and influence your business dynamics. Conclusion Investing in the Vyapar Yantra is a strategic decision to empower your business journey. By attracting success, improving financial flow, and resolving challenges, this yantra serves as a catalyst for growth and prosperity. Embrace the transformative energies of the Vyapar Yantra and watch your business flourish like never before.',
    hi: `Brand – Astroscience
Yantra - व्यापार यंत्र
Religious Belief – व्यापार यंत्र को कार्यालय या अपने दुकान या शोरूम में स्थापित करने से आपको अपने व्यवसाय में लाभ होगा और व्यापार में चल रही सभी समस्याओं से छुटकारा मिलेगा ।
Benefits - व्यापार में कर्ज से मुक्ति मिलेगी - व्यापार में फँसा हुआ पैसा वापस मिलेगा - व्यापार में सफलता मिलेगी - बार-बार व्यापार नहीं बदलना पड़ता है - व्यापार में धन लाभ होगा - व्यापार में व्यवसायिक समस्याएं दूर होंगी - बिक्री में वृद्धि होगी - रूपये-पैसे की उधारी से छुटकारा मिलेगा - व्यापार में धन हानि से मुक्ति मिलेगी - धन और सुख में वृद्धि देखने को मिलेगी - अनेक प्रकार से व्यापार में आ रही रूकावट दूर होगी`,
  },
  'Nazar Dosh Yantra': {
    en: 'Protect yourself and your space with the Nazar Dosh Yantra by Astroscience, expertly crafted from high-quality materials to shield you from the evil eye and negative influences. This powerful yantra is perfect for both home and office use, promoting a harmonious environment while eliminating unwanted negativity. Superior Craftsmanship The Nazar Dosh Yantra combines aesthetic appeal with spiritual efficacy. Its durable design ensures it remains a steadfast protector, while its intricate patterns resonate with energies that foster positivity and safety. Key Benefits: • Protects Against the Evil Eye: Safeguard yourself and your loved ones. The Nazar Dosh Yantra is specifically designed to ward off the evil eye and negative energies that can disrupt your peace. By placing this yantra in your surroundings, you create a protective barrier that fosters a sense of security. • Reduces Mental Stress: Create a serene atmosphere. This yantra helps to alleviate mental stress, promoting a calm and peaceful mindset. By reducing anxiety and tension, it enables you to focus better on your tasks and relationships, enhancing overall emotional well-being. • Promotes Family Harmony: Strengthen bonds within your family. The Nazar Dosh Yantra encourages harmony and understanding among family members. Its protective energies help maintain a positive environment, reducing conflicts and fostering loving relationships. • Enhances Overall Well-Being: Invest in your health and happiness. The yantra not only protects against negativity but also promotes overall well-being. By creating a positive atmosphere, it helps you avoid unnecessary expenses related to health and emotional stress. Optimal Placement For maximum effectiveness, place the Nazar Dosh Yantra in a prominent location within your home or office. Ideal spots include the entrance, living room, or workspace, where its protective energies can continuously shield you and your environment. Conclusion Investing in the Nazar Dosh Yantra is a wise choice for anyone seeking to enhance their life with positivity and protection. By shielding against the evil eye, reducing stress, and promoting family harmony, this yantra serves as a vital tool for creating a balanced and fulfilling life. Embrace the protective energies of the Nazar Dosh Yantra and cultivate a harmonious environment today.',
    hi: `Brand – Astroscience
Yantra - नजरदोष यंत्र
Religious Belief – नजर दोष यंत्र घर या कार्यालय में स्थापित करने से आपके धन-धान्य पर किसी की बुरी नजर नहीं लगती है और ना ही किसी प्रकार की कोई हानि होती है तथा नजर दोष यंत्र घर या कार्यालय में स्थापित करने से सभी प्रकार के तनाव से आपका बचाव रहता है ।
Benefits - घर में या कार्यालय में नकारात्मक विचार नहीं आते है - ना ही किसी भी प्रकार का मानसिक तनाव रहता है । - कार्यक्षेत्र में किसी प्रकार की रूकावट नहीं आती है - बेफिजूल के पैसे खर्च से बचाव रहता है - शारीरिक रूप से चुस्ती-फुर्ती बनी रहती है - पारिवारिक शान्ति एवं सद्वाव बना रहता है - नकारात्मक ऊर्जाओं का नाश होता है - सकारात्मक ऊर्जा का संचार होता है`,
  },
  'Shree Shodashi Yantra': {
    en: 'Unlock the transformative power of the Shree Shodashi Yantra by Astroscience. Meticulously designed with precise geometry, this yantra serves as a conduit for the divine blessings of Goddess Shodashi, making it an essential tool for enhancing well-being and success in every aspect of life. Exquisite Design and Craftsmanship: Crafted with attention to detail, the Shree Shodashi Yantra not only boasts an aesthetically pleasing design but also embodies deep spiritual significance. Its harmonious geometry is believed to resonate with positive energies, creating a sacred space wherever it is placed. Key Benefits: 1. Attracts Prosperity and Good Luck: Experience abundance like never before! The Shree Shodashi Yantra is known for its ability to magnetize prosperity and good fortune across all areas of life. Whether you’re seeking financial growth, career advancements, or personal achievements, this yantra helps pave the way for success. 2. Promotes Stability and Success: Achieve your goals with confidence. By fostering a sense of stability, the Shree Shodashi Yantra supports both business and personal endeavors. It encourages clear decision-making, effective planning, and strategic execution, ensuring that you remain on the path to success. 3. Fosters Peace, Happiness, and Adaptability: Create a harmonious environment. This yantra promotes inner peace and happiness, helping you adapt to life’s challenges with grace. Whether at home or in the workplace, the Shree Shodashi Yantra cultivates a sense of calm, enhancing relationships and overall well-being. Optimal Placement For maximum effectiveness, place the Shree Shodashi Yantra in a prominent area of your home or office. Ideal locations include your meditation space, office desk, or living room, where it can continuously radiate its positive energies. Conclusion Investing in the Shree Shodashi Yantra is a powerful step toward enriching your life with prosperity, stability, and happiness. Embrace the blessings of Goddess Shodashi and elevate your personal and professional experiences with this extraordinary yantra. Let the Shree Shodashi Yantra guide you on your journey to success and well-being, illuminating the path ahead.',
    hi: `Brand – Astroscience
Yantra - श्री षोडशी यंत्र
Religious Belief – षोडशी यंत्र को देवी ललिता यंत्र भी कहा जाता है। देवी षोडशी को दशा महाविद्याओं में से एक माना जाता है।
Benefits - सभी प्रयासो में सफलता प्राप्त करने के लिए एक शक्तिशाली यंत्र है । - षोडशी यंत्र घर में स्थापित करने से सौभाग्य-समृद्धि की प्राप्ति होती है - किसी भी खतरे से निपटने के लिए षोडशी यंत्र सर्वश्रेष्ठ है - अपने कार्य में स्थिरता और अनुकूलता मिलती रहेगी । - अपने व्यापार व कार्य में सफलता प्राप्त होती रहेगी । - घर में सुख-शान्ति बनी रहेगी । - समग्र सुख-शान्ति की प्राप्ति होती है`,
  },
  'Shani Yantra': {
    en: 'Experience the transformative power of the Shakni Yantra by Astroscience, meticulously crafted from high-quality materials to provide protection against negative energies and obstacles. This yantra is an essential tool for fostering success and prosperity, helping you overcome challenges and thrive in both personal and professional endeavors. Exceptional Craftsmanship The Shakni Yantra features a beautiful design that combines spiritual significance with durability. Its high-quality construction ensures that it serves as a steadfast protector, channeling positive energies to create a harmonious environment. Key Benefits: • Protects Against Negative Energies and Witchcraft: Shield yourself from harm. The Shakni Yantra is specifically designed to ward off negative energies and any malicious intentions, including witchcraft. By placing this yantra in your surroundings, you create a protective barrier that fosters safety and peace. • Promotes Success and Prosperity: Unlock new avenues of growth. This yantra encourages success and prosperity in your work and business endeavors. By attracting positive energies, it enhances your ability to achieve your goals and capitalize on opportunities. • Helps Remove Obstacles Created by Others: Navigate challenges with ease. The Shakni Yantra aids in identifying and removing obstacles created by external forces. It empowers you to overcome challenges and setbacks, ultimately improving your overall well-being and resilience. Optimal Placement To maximize the benefits of the Shakni Yantra, position it in a prominent location within your home or office. Ideal spots include your workspace, entrance, or meditation area, where it can continuously radiate its protective energies and support your journey toward success. Conclusion Investing in the Shakni Yantra is a powerful step toward creating a life filled with prosperity and protection. By shielding against negativity, promoting success, and removing obstacles, this yantra serves as a vital ally in your quest for personal and professional growth. Embrace the energies of the Shakni Yantra and empower yourself to thrive in every aspect of your life.',
    hi: `Brand – Astroscience
Yantra - शाकनी यंत्र
Religious Belief – हर तरह की ऊपरी बाधा, किया-कराया, जादू-टोना, वशीकरण आदि प्रेतादि बाधाओं से छुटकारा पाने के लिए
Benefits - कार्यक्षेत्र या व्यापार में किसी ने जादू-टोना कराया हो तो इससे छुटकारा मिलेगा - कार्य क्षेत्र में लाभ प्राप्त होगा - घर में किसी शत्रु के द्वारा किया-कराया दूर होगा - वशीकरण से ग्रसित लोगों को वशीकरण से छुटकारा मिलेगा - किसी भी प्रकार से किया गया जादू टोना से छुटकारा मिलेगा`,
  },
  'Shakti Peeth Yantra': {
    en: 'Experience the profound impact of the Shakti Peeth Yantra by Astroscience, expertly crafted with precise geometry to channel the divine blessings of Goddess Shakti. This yantra is not just a decorative piece; it’s a powerful tool designed to enhance your well-being and success in both personal and professional realms. Exquisite Craftsmanship The Shakti Peeth Yantra is a beautifully designed symbol that combines spiritual significance with aesthetic appeal. Its precise geometry is believed to harmonize energies, creating a sacred atmosphere that invites positivity and abundance into your life. Key Benefits: 1. Attracts Blessings for Increased Financial Prosperity: Unlock new avenues of wealth! The Shakti Peeth Yantra is renowned for its ability to attract financial blessings. By placing it in your workspace or home, you open yourself to opportunities for financial growth and stability, empowering you to achieve your monetary goals. 2. Enhances Enjoyment and Success in Your Work Environment: Transform your work experience! This yantra fosters a sense of enjoyment and fulfillment in your professional endeavors. By promoting a positive mindset, it encourages creativity, collaboration, and productivity, ultimately leading to greater success in your career. 3. Improves Overall Well-Being and Helps Overcome Challenges: Navigate life’s hurdles with ease. The Shakti Peeth Yantra supports your overall well-being by instilling a sense of calm and resilience. It helps you face challenges with confidence, enhancing your ability to adapt and thrive in any situation. Optimal Placement To maximize the benefits of the Shakti Peeth Yantra, position it in a prominent location within your home or office. Ideal spots include your desk, a meditation corner, or a communal area where its positive energies can uplift everyone around you. Conclusion Investing in the Shakti Peeth Yantra is a significant step towards enriching your life with prosperity, joy, and resilience. Embrace the blessings of Goddess Shakti and empower your journey towards success and well-being. Let this extraordinary yantra illuminate your path and transform your experiences in both personal and professional settings.',
    hi: `Brand – Astroscience
Yantra - शक्तिपीठ यंत्र
"शक्तिपीठ यंत्र" एक ज्योति के रूप में काम करता है, ब्रह्मांड में फैली पाज़िटिव उर्जायों को एकत्रित करके आपके माहौल में लाकर आपको अपनी अभिलाषाओं की ओर नई दृष्टि और समर्पण के साथ प्रेरित करता है। इसकी शुभ शक्तियों को उपयोग करके अपने चयनित क्षेत्र में अभूतपूर्व सफलता और पहचान हासिल करने के लिए जीवन में नए आयाम अनुभव कर सकते हैं। प्राण प्रतिष्ठित किया यंत्र आपके घर में अपने आप में एक ऊर्जा का स्त्रोत होता है जो आपको उपरोक्त फायदे देता है ।
Religious Belief – शक्ति पीठ, सामान्य रूप से, पवित्र स्थान या केंद्र को संदर्भित करता है जहां शक्ति (शक्ति) निवास करती है। शक्ति का तात्पर्य देवी शक्ति से है। शक्तिपीठ यंत्र जीवन में ग्रहों की कृपा और शुभता लाने और जीवन में समग्र कल्याण के लिए है।
Benefits - अपने काम-काज का सुख - रूपये-पैसे की बरकत - सुख-समृद्धि के लिए अपने सहकर्मियों से लाभ पाने के लिए काम - कामकाज के क्षेत्र में दुश्मनो से छुटकारा पाने - व्यापार आगे बढ़ाने के लिए - इस यंत्र को मंगवाकर अपने घर में या अपने कार्यस्थल पर स्थापित कर सकते है ।`,
  },
  'Shree Baglamukhi Yantra': {
    en: 'Unlock your potential with the Shree Baglamukhi Yantra by Astroscience, meticulously crafted with precise geometry to help you achieve victory over adversaries and enhance your communication skills. This powerful yantra is ideal for boosting success in both your personal and professional life. Exceptional Craftsmanship Designed with attention to detail, the Shree Baglamukhi Yantra not only boasts aesthetic beauty but also embodies deep spiritual significance. Its precise geometry channels positive energies, making it a valuable tool for overcoming challenges. Key Benefits: • Secures Victory Over Enemies: Protect yourself from adversities. The Shree Baglamukhi Yantra is specifically designed to secure victory over enemies and alleviate fears related to challenges. By harnessing its powerful energies, you can navigate conflicts with confidence and emerge triumphant. • Improves Communication Skills: Enhance your voice and presence. This yantra promotes effective communication skills, helping you express your thoughts clearly and confidently. Whether in personal relationships or professional settings, improved communication can lead to better understanding and collaboration. • Supports Success in Legal Matters: Gain an edge in legal situations. The Shree Baglamukhi Yantra is a powerful ally in legal matters, supporting you in navigating complexities and ensuring favorable outcomes. Its energies foster clarity and decisiveness, essential for achieving success in any dispute. • Promotes Overall Prosperity: Create a pathway to success. By boosting your confidence and communication abilities, this yantra enhances your prospects in business and life, ultimately promoting overall prosperity and well-being. Optimal Placement To maximize the benefits of the Shree Baglamukhi Yantra, place it in a prominent location within your home or office. Ideal spots include your workspace, study area, or a place where you conduct important discussions, allowing its energies to flow freely and support your endeavors. Conclusion Investing in the Shree Baglamukhi Yantra is a powerful step towards achieving victory and enhancing your success. By securing protection against adversities, improving communication skills, and supporting legal matters, this yantra serves as a vital tool in your journey toward personal and professional growth. Embrace the transformative energies of the Shree Baglamukhi Yantra and pave your way to success and prosperity.',
    hi: `Brand – Astroscience
Yantra - श्री बगलामुखी यंत्र
Religious Belief - श्री बगलामुखी यंत्र पूजा स्थान या अपने मन्दिर में स्थापित करने से, कार्यक्षेत्र में सुख-समृद्धि, धन-वैभव व कारोबार में उच्च लाभ अर्जित कर सकता है ।
Benefits - विशेष रूप से शिक्षा और धन संबंधी क्षेत्र में रोगों व्याधियों और मानसिक तनाव से पीड़ित लोगों के लिए है । - शत्रु परेशानियों से मुक्ति पाने के लिए व शत्रु के भय को हमेशा दूर करने के लिए लाभकारी यंत्र है - जिन व्यक्तियों को दुर्घटना होने का भय हो वह बगलामुखी यंत्र पूजा स्थान में रखें तो उन्हें इससे लाभ होगा । - कोर्ट-कचहरी से सम्बन्धित मामलों में जीत हासिल करने के लिए स्थापित करने से लाभ होगा - आपके अन्दर चतुराई से बात करने की कला का विकास होता है व जिससे आप लाभ प्राप्त करते है । - बगलामुखी यंत्र शत्रुओं पर विजय प्राप्ति के लिए स्थापित किया जाता है - अपने मंदिर में रखें और प्रसिद्धि और धन लाभ के लिए पूजा करें ।`,
  },
  'Madhya Shakti Peeth Yantra': {
en: "Discover the transformative power of the Madhya Shakti Peeth Yantra by Astroscience—a meticulously crafted yantra designed to enhance positivity and blessings in your life. This beautiful piece serves as both a spiritual tool and a stunning decorative element, making it ideal for personal and professional environments. Crafted for Quality The Madhya Shakti Peeth Yantra is made from high-quality materials, ensuring durability and a timeless appeal. Its intricate design not only captivates the eye but also resonates with spiritual significance, making it a perfect addition to any space. Key Benefits: 1. Boosts Happiness and Enjoyment: Infuse your workspace with joy! The Madhya Shakti Peeth Yantra is known to elevate your mood, creating a more enjoyable atmosphere for work and business. By fostering a sense of happiness, it allows you to engage more fully in your tasks and find greater satisfaction in your daily activities. 2. Attracts Financial Blessings: Prosperity begins with positive intention. This yantra acts as a magnet for financial blessings, opening pathways to abundance and wealth. Whether you're running a business or managing personal finances, the Madhya Shakti Peeth Yantra helps create a conducive environment for financial growth and stability. 3. Enhances Positive Relationships: Relationships are at the core of success. The yantra encourages harmonious interactions, helping to strengthen bonds with colleagues, clients, and loved ones. It also provides support in overcoming challenges and obstacles, allowing you to navigate conflicts with ease and grace. Optimal Placement To harness the full potential of the Madhya Shakti Peeth Yantra, position it in a prominent place within your workspace or home. Ideal locations include your desk, a meeting room, or a common area where it can radiate its positive energies to everyone in the vicinity. Conclusion Investing in the Madhya Shakti Peeth Yantra is a powerful step towards creating a more joyful and prosperous life. Elevate your personal and professional spaces with this extraordinary yantra, and experience the positive transformation it brings. Embrace happiness, attract abundance, and cultivate enriching relationships with the Madhya Shakti Peeth Yantra from Astroscience.",
hi: `Brand – Astroscience
Yantra - मध्य शक्तिपीठ यंत्र
"मध्य शक्तिपीठ यंत्र" एक ज्योति के रूप में काम करता है, ब्रह्मांड में फैली पाज़िटिव उर्जायों को एकत्रित करके आपके माहौल में लाकर आपको अपनी अभिलाषाओं की ओर नई दृष्टि और समर्पण के साथ प्रेरित करता है। इसकी शुभ शक्तियों को उपयोग करके अपने चयनित क्षेत्र में अभूतपूर्व सफलता और पहचान हासिल करने के लिए जीवन में नए आयाम अनुभव कर सकते हैं। प्राण प्रतिष्ठित किया यंत्र आपके घर में अपने आप में एक ऊर्जा का स्त्रोत होता है जो आपको उपरोक्त फायदे देता है ।
Religious Belief – मध्य शक्तिपीठ यंत्र कार्यालय में स्थापित करने से कार्यक्षेत्र में सुख-समृद्धि, धन-वैभव व कारोबार में उच्च लाभ अर्जित करने के लिए स्थापित किया जाता है ।
Benefits - मध्यशक्ति पीठ यंत्र स्थापित करने से अपने काम या व्यवसाय में खुशी के लिए - अपने काम-काज का सुख - रूपये-पैसे की बरकत - सुख-समृद्धि के लिए अपने सहकर्मियों से लाभ पाने के लिए काम - कामकाज के क्षेत्र में दुश्मनो से छुटकारा पाने - व्यापार आगे बढ़ाने के लिए - इस यंत्र को मंगवाकर अपने घर में या अपने कार्यस्थल पर स्थापित कर सकते है ।`,
  },
  'Rog Nivaran Yantra': {
    en: 'Bring the Rog Nivaran Yantra by Astroscience into your home as a spiritual symbol of well-being and peace of mind. Crafted with care, its geometric design makes a meaningful addition to a prayer space, meditation corner, bedroom, or home office. Traditional Belief: Some people use the Rog Nivaran Yantra as part of a faith practice and as a focus for prayers for health and well-being. It does not prevent or treat diseases and is not a substitute for medical advice, diagnosis, or treatment. Key Benefits: • A spiritual focus for reflection and prayers for well-being. • May help create a calm setting for meditation and mindfulness. • A reminder to make time for rest and maintain healthy daily routines. Placement: Place the yantra in a suitable, prominent area of your home or workspace as part of your personal spiritual practice. For health concerns, consult a qualified healthcare professional and follow their advice. Conclusion: The Rog Nivaran Yantra can be a meaningful spiritual and decorative addition to your space. Use it as part of your faith practice, alongside—not instead of—appropriate medical care.',
    hi: `Brand – Astroscience
Yantra - रोग निवारण यंत्र
Religious Belief – कुछ लोग रोग निवारण यंत्र को स्वास्थ्य और कुशलता की कामना के लिए अपनी आध्यात्मिक आस्था के प्रतीक के रूप में घर में स्थापित करते हैं। यह किसी बीमारी को रोकने या उसका इलाज करने का साधन नहीं है और न ही चिकित्सकीय सलाह, जांच या उपचार का विकल्प है।
Benefits - स्वास्थ्य और कुशलता की कामना के लिए प्रार्थना और मनन का आध्यात्मिक प्रतीक - ध्यान और एकाग्रता के लिए शांत वातावरण बनाने में सहायक हो सकता है - आराम और स्वस्थ दिनचर्या के लिए एक स्मरण - इसे अपनी व्यक्तिगत आध्यात्मिक आस्था के हिस्से के रूप में घर या कार्यस्थल पर उपयुक्त स्थान पर रखें। स्वास्थ्य संबंधी समस्या होने पर योग्य स्वास्थ्य विशेषज्ञ से सलाह लें और उनके निर्देशों का पालन करें।`,
  },
  'Sarv Shakti Peeth Yantra': {
    en: 'Transform your office environment with the powerful Sarva Shakti Peeth Yantra from Astroscience. This meticulously crafted yantra is designed not only as a striking piece of decor but also as a potent symbol of positive energy, aimed at enhancing your professional journey. Craftsmanship and Quality Made from high-quality materials, the Sarva Shakti Peeth Yantra reflects both elegance and durability. Its intricate design and careful attention to detail make it a beautiful addition to any workspace, while its spiritual significance serves to attract positive energies. Key Benefits: 1. Enhances Business Success and Profitability: The Sarva Shakti Peeth Yantra is believed to magnetize success, fostering a conducive atmosphere for growth and expansion. By placing this yantra in your office, you create a powerful energy vortex that encourages innovation, decision-making, and strategic planning. 2. Brings Happiness, Wealth, and Prosperity: Infuse your workspace with abundance. The yantra is known to invite prosperity and wealth, helping you to not only meet your business goals but to exceed them. As positive energy flows through your space, it cultivates an environment ripe for new opportunities and fruitful endeavors. 3. Alleviates Mental Worries: In the fast-paced world of business, stress can often overshadow creativity and productivity. The Sarva Shakti Peeth Yantra promotes mental clarity and emotional well-being, allowing you to alleviate worries and maintain a positive mindset. This serenity not only benefits you but also radiates to your team, fostering collaboration and harmony. 4. Fosters Positive Energy: Surround yourself with an aura of positivity. The yantra acts as a spiritual anchor, balancing energies and encouraging a sense of calm. This environment enhances teamwork, boosts morale, and inspires creativity, making your office a hub of productivity and success. Placement and Use: For optimal results, place the Sarva Shakti Peeth Yantra in a prominent location within your office, such as on your desk, in a meeting room, or near the entrance. Regularly meditate or reflect on your goals in its presence to harness its full potential. Conclusion Investing in the Sarva Shakti Peeth Yantra is not just a choice for aesthetic appeal; it’s a commitment to fostering an environment that nurtures success, prosperity, and overall well-being. Elevate your office space and watch as the transformative energies manifest in your professional life.',
    hi: `Brand – Astroscience
Yantra - सर्व शक्तिपीठ यंत्र
"सर्व शक्तिपीठ यंत्र" एक ज्योति के रूप में काम करता है, ब्रह्मांड में फैली पाज़िटिव उर्जायों को एकत्रित करके आपके माहौल में लाकर आपको अपनी अभिलाषाओं की ओर नई दृष्टि और समर्पण के साथ प्रेरित करता है। इसकी शुभ शक्तियों को उपयोग करके अपने चयनित क्षेत्र में अभूतपूर्व सफलता और पहचान हासिल करने के लिए जीवन में नए आयाम अनुभव कर सकते हैं। प्राण प्रतिष्ठित किया यंत्र आपके घर में अपने आप में एक ऊर्जा का स्त्रोत होता है जो आपको उपरोक्त फायदे देता है ।
Religious Belief – सर्व शक्तिपीठ यंत्र कार्यालय में स्थापित करने से कार्यक्षेत्र में सुख-समृद्धि, धन-वैभव व कारोबार में उच्च लाभ अर्जित करने के लिए स्थापित किया जाता है ।
Benefits - व्यापार, कार्यालय को सफलता की ऊँचाईयों पर पहुँचाने के लिए - धन लाभ का सुख-वैभव पाने के लिए - कारोबार में समृद्धि प्राप्त करने के लिए - सुख-समृद्धि में लाभ के लिए - कार्य क्षेत्र में उच्च चमक लाने के लिए शुभ और अनुकूल हैं । - मानसिक चिन्ताओं को दूर करना - सकारात्मक ऊर्जा के साथ व्यापार में नई ऊंचाईयां प्राप्त करना - व्यापार में मनचाहा लाभ अर्जित करने के लिए - सर्व शक्तिपीठ यंत्र को मंगवा कर अपने कार्यालय पर स्थापित कर सकते है`,
  },
};

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
  const [descriptionLanguage, setDescriptionLanguage] = useState('en');
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
    setDescriptionLanguage('en');
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
  const bilingualDescription = productDescriptions[product.name];
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

      {bilingualDescription && (
        <section aria-label="Product description" className="bg-[#f8f6f1]">
          <div className="mx-auto max-w-[1440px] pt-2 pb-8 sm:pt-3 sm:pb-10 lg:pt-4">
            <div role="tablist" aria-label="Description language" className="flex border-b border-[#231416]/10">
              {[
                { id: 'en', label: 'English Description' },
                { id: 'hi', label: 'Hindi Description' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`yantra-description-tab-${tab.id}`}
                  aria-selected={descriptionLanguage === tab.id}
                  aria-controls="yantra-description-panel"
                  onClick={() => setDescriptionLanguage(tab.id)}
                  className={`border-b-2 px-4 pb-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1519] ${
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
              id="yantra-description-panel"
              role="tabpanel"
              aria-labelledby={`yantra-description-tab-${descriptionLanguage}`}
              lang={descriptionLanguage}
              className="whitespace-pre-line pt-5 text-base leading-7 text-[#3a2c2e]"
              style={descriptionLanguage === 'hi' ? { fontFamily: "'Nirmala UI', 'Mangal', sans-serif" } : undefined}
            >
              {bilingualDescription[descriptionLanguage]}
            </div>
          </div>
        </section>
      )}

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
