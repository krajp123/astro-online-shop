import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const planetDetails = [
  {
    name: "Sun",
    image: "/Planets/Sun.png",
    focus:
      "In traditional astrology, the Sun is associated with vitality, confidence, and leadership.",
    remedy: "Offer water to the Sun (Surya Arghya) every morning",
    heroDescription:
      "In astrology—and specifically in the world of Lal Kitab—the Sun (or Surya) is so much more than just a star; it’s the ultimate symbol of your inner strength, your power, and the literal compass for your life’s direction. Think of it as the “boss” of your horoscope. Its placement in your birth chart plays a massive role in shaping everything from your career path and health to how you handle your emotions and show up in relationships. As the Sun moves through the different houses of your chart, its “vibe” changes. In some spots, it acts like a superpower, boosting your confidence, handing you leadership roles, and clearing the path to success. But if that solar energy gets out of whack or lands in a tricky position, it can flip the script—leading to ego clashes, unnecessary stress, or feeling like you’re constantly running into walls.",
  },
  {
    name: "Moon",
    image: "/Planets/Moon.png",
    focus:
      "In traditional astrology, the Moon is associated with emotions, mental well-being, and the home.",
    remedy: "Donate white items, wear pearl or moonstone",
    heroDescription:
      'Think of the Moon in your birth chart as your "inner weather." It governs your gut feelings, moods, and how you naturally react when life gets messy. While your Sun sign is who you are to the world, your Moon is who you are when you are alone or with the people you trust most. When your Moon is in a healthy place, it can feel like having an internal anchor: you feel empathetic, balanced, and generally at peace with yourself. You are able to nurture others because you know how to take care of your own heart first. But if the Moon is struggling or challenged, that inner weather can get stormy. You might find yourself riding an emotional rollercoaster, feeling very sensitive to what others say, or getting stuck in a fog of overthinking when you need to make a choice. At its core, the Moon is a mirror of your private world; it shows how you process everything from heartbreak to celebration.',
  },
  {
    name: "Mars",
    image: "/Planets/Mars.png",
    focus:
      "In traditional astrology, Mars is associated with courage, energy, and determination.",
    remedy: "Donate red lentils on Tuesdays, recite Hanuman Chalisa",
    heroDescription:
      "Think of Mars in your birth chart as your “inner engine”—the raw fuel that drives your ambition, courage, and the way you step up when life gets tough. While the Moon is your heart and the Sun is your ego, Mars is your muscle. It is how you fight for what you want and handle yourself when the pressure is on.\n\nWhen your Mars is in a good spot, it is like having a superpower. You are naturally brave, do not overthink decisions, and have a “can-do” energy that makes you a natural leader. You are the person people look to when things get difficult because you have the grit to push through.\n\nBut if that fire is not balanced, it can turn into a wildfire. Instead of focused energy, you might deal with a short fuse, constant restlessness, or a tendency to jump into arguments before thinking. You might make impulsive choices or let a “my way or the highway” attitude get the best of you. In Lal Kitab, where Mars sits in your chart changes the flavour of this energy—turning it into either a protective shield or a headache.",
  },
  {
    name: "Mercury",
    image: "/Planets/Mercury.png",
    focus:
      "In traditional astrology, Mercury is associated with communication, learning, and intellect.",
    remedy: "Feed green grass to cows, donate green vegetables",
    heroDescription:
      "In Lal Kitab, Mercury (Budh) represents intelligence, communication, and business skills. It influences the way you think, speak, learn, and make decisions. A strong Mercury gives you sharp thinking, confidence, good communication, and steady financial growth.\n\nWhen Mercury is weak, you may feel confused, face misunderstandings, or struggle with studies, work, and money matters. This guide explains how Mercury behaves in each house and includes simple Lal Kitab remedies to strengthen its positive effects.",
  },
  {
    name: "Jupiter",
    image: "/Planets/Jupiter.png",
    focus:
      "In traditional astrology, Jupiter is associated with wisdom, learning, and guidance.",
    remedy: "Donate yellow items on Thursdays, respect teachers",
    heroDescription:
      "In Lal Kitab, Jupiter (Guru) is the planet of wisdom, faith, and growth. Known as the “teacher” of the horoscope, it influences how you learn, make decisions, and guide others. Its position in your chart can affect education, money, marriage, and your spiritual journey. When Jupiter is strong, it brings clarity, respect, good luck, and the ability to handle life with patience and confidence. But if it is weak or placed poorly, you may face confusion, financial problems, delays, relationship issues, or a feeling that things are not going your way.\n\nThis guide explains how Jupiter behaves in each house, the positive and negative effects it can bring, and traditional Lal Kitab remedies associated with its energy.",
  },
  {
    name: "Venus",
    image: "/Planets/Venus.png",
    focus:
      "In traditional astrology, Venus is associated with relationships, harmony, and comforts.",
    remedy: "Donate white sweets, help young girls",
    heroDescription:
      "In Lal Kitab astrology, Venus (Shukra) represents love, marriage, beauty, luxury, comfort, creativity, harmony, and the quality of your relationships—especially in married and artistic life. The placement of Venus in your birth chart shows how you experience affection, attraction, pleasure, and emotional balance. A strong Venus is traditionally associated with charm, financial comfort, creativity, and peaceful, loving relationships. When Venus is weak or afflicted, it may bring tension in marriage, unstable relationships, overindulgence, unnecessary expenses, or lifestyle-related health concerns. Understanding Venus in each house helps explain where its energy may support you and where traditional Lal Kitab remedies may be used to seek greater happiness and balance in life.",
  },
  {
    name: "Saturn",
    image: "/Planets/Saturn.png",
    focus:
      "In traditional astrology, Saturn is associated with patience, discipline, and responsibility.",
    remedy: "Donate black items on Saturdays, feed crows",
    heroDescription:
      "In Lal Kitab astrology, Saturn represents discipline, hard work, patience, karma, responsibility, delays, and the lessons life teaches over time. It shows where you may struggle in the beginning, but also where lasting success can come through honesty, patience, and consistency. A strong Saturn is traditionally associated with practicality, maturity, and the strength to handle difficult situations. When Saturn is weak or afflicted, astrology associates it with delays in work, loneliness, fear, family stress, financial pressure, or repeated obstacles.\n\nUnderstanding Saturn in each house can help you reflect on where life may be testing you and explore traditional Lal Kitab practices for stability, peace, and balance.",
  },
  {
    name: "Rahu",
    image: "/Planets/Rahu.png",
    focus:
      "In traditional astrology, Rahu is associated with ambition, change, and unconventional pursuits.",
    remedy: "Donate blue or black items, feed dogs",
    heroDescription:
      "In Lal Kitab, Rahu is associated with desires, ambitions, and experiences that push you out of your comfort zone. It is traditionally linked to the way you chase goals, take risks, and connect with the world, sometimes through foreign contacts or sudden opportunities. A strong Rahu is associated with boldness, vision, and ambition. When Rahu is considered weak or troubled, traditional astrology describes confusion or unexpected challenges in relationships, career, or money. Understanding Rahu in each house can offer a cultural lens for reflection, while practical decisions and simple, safe traditions can help you feel grounded.",
  },
  {
    name: "Ketu",
    image: "/Planets/Ketu.png",
    focus:
      "In traditional astrology, Ketu is associated with introspection, detachment, and spiritual pursuits.",
    remedy: "Donate brown items",
    heroDescription:
      "In Lal Kitab, Ketu is associated with detachment, intuition, and spiritual growth that can come from facing uncertainty. It is traditionally linked to how you process past experiences, navigate change, and explore life’s deeper meaning. Ketu’s lessons may feel confusing or disruptive, while its positive themes include intuition and resilience. Astrology also associates a difficult Ketu placement with isolation, sudden losses, or career stagnation; these are traditional interpretations, not certainties. Understanding Ketu in each house can offer a reflective perspective, while practical choices and safe, meaningful practices can help you feel grounded.",
  },
];

const sunHouseDetails = [
  {
    title: "1st House - Self & Personality",
    benefic:
      "Strong personality, excellent health, natural leadership abilities, confidence, and positive self-image. You radiate charisma and attract success effortlessly.",
    malefic:
      "Ego problems, health issues, strained relationships with father, lack of confidence, and obstacles in personal growth. May face identity crisis.",
    remedies: [
      "Offer water to the Sun every morning at sunrise with a copper vessel",
      "Donate wheat, jaggery, or red cloth on Sundays to the needy",
      "Wear a copper ring on the ring finger of your right hand",
    ],
  },
  {
    title: "2nd House - Wealth & Family",
    benefic:
      "When the Sun sits in your 2nd House, it’s all about the power of your voice and your values. You aren’t really built for a “small” or ordinary life; you have this internal drive to build a solid reputation and leave a real legacy for your family. When you speak, you do it with a natural authority that makes people stop and actually listen to what you have to say.\nYou’re likely drawn to anything that involves leadership—whether that’s managing the family’s finances or commanding a room in a professional setting. Because you’re so focused on long-term stability, you excel in fields like teaching, management, or government work where your advice and “public face” carry weight. Essentially, you’re willing to put in the hard graft to make sure your name—and your bank account—stand for something substantial.",
    malefic:
      "When the Sun’s heat gets a bit too intense in the 2nd House, it usually shows up in how you talk to the people closest to you. Because this part of your chart rules both your voice and your family, that natural authority can accidentally come off as harsh or controlling. Even when you’re just trying to be helpful, your “straight talk” can feel like a lecture or a personal attack to others.\nLal Kitab warns that if this energy turns sour, it can really shake up the peace at home. You might find yourself digging your heels in during arguments or being blunt to a fault, which—let’s be honest—usually ends in bruised egos and strained family ties. It’s a classic case of having the right intentions but the wrong delivery. Without a little extra patience and a “soft touch” in your conversations, those tiny disagreements can snowball into long-term tension.",
    remedies: [
      "Donate jaggery or wheat on Sundays. Do not accept freebies.",
      "Do not accept freebies, charity, or unnecessary favors from others.",
      "Do not earn money through dishonest, corrupt, or unethical means.",
      "Stay away from property disputes, land-related conflicts, and fights over ancestral property.",
      "Avoid getting involved in legal battles regarding house, land, or inheritance unless absolutely necessary.",
    ],
  },
  {
    title: "3rd House - Courage & Siblings",
    benefic:
      "When your planetary energy is in a good place, you naturally lean toward being a person of high integrity. You’re someone who values your dignity and would much rather earn what you have through hard work than take a shortcut or accept a “freebie” you didn’t earn.\nIn your personal life, you aren’t one to go looking for a fight, especially when it comes to family drama or property disputes. You’d much rather keep the peace and stay focused on your own path. Because you carry yourself this way, people tend to really respect you, and that consistency builds a rock-solid reputation in both your career and your private life.",
    malefic:
      "When this energy turns sour, that natural integrity can start to slip, and you might find yourself tempted by shortcuts or looking for “easy money” that you didn’t really earn. It’s like a shift from being a builder to being a taker.\nThis “malefic” side often drags you into the mud with property disputes, legal headaches, or ugly arguments over inheritance. These aren’t just small disagreements—they eat away at your peace of mind and can leave your family life in shambles. If you aren’t careful, greed or a bruised ego can make you lose the trust of the people who matter most. Over time, those constant fights over money and “who gets what” don’t just drain your bank account; they can seriously wreck your reputation and the stability you’ve worked so hard to create.",
    remedies: [
      "Never quarrel with siblings. Maintain respect and support in these relationships.",
      "Keep a square silver piece with you to reduce negativity and strengthen confidence and communication.",
      "Fast on Tuesdays or worship Hanuman to calm anger and improve willpower.",
      "Offer sindoor, jasmine oil, or recite the Hanuman Chalisa every Tuesday continuously for 43 days.",
    ],
  },
  {
    title: "4th House - Home & Mother",
    benefic:
      "The positive side of this placement is that it is generally considered favorable for confidence, self-respect, and inner strength. It often gives a person a strong personality, leadership qualities, and a natural sense of authority. Such individuals usually prefer to take responsibility, make their own decisions, and maintain dignity in the way they deal with others. They are often seen as dependable and capable of guiding others during important situations. This placement can also create a desire to build a stable home, earn respect within the family, and take pride in protecting the interests of loved ones. Over time, it may help the person gain recognition, influence, and a respected position in both personal and professional life.",
    malefic:
      "If the Sun’s energy becomes too strong or imbalanced, it may create disturbances in domestic peace. There can be challenges related to property, family matters, or differences within the household. At times, the person may become too controlling, rigid, or ego-driven, which can lead to occasional tensions and misunderstandings at home.",
    remedies: [
      "Feed food to 4 blind people from time to time to help reduce negativity and bring greater peace and harmony into the home.",
      "Offer milk or water to a Shivling on Mondays to calm emotional stress and improve domestic stability.",
      "Respect and take care of your mother and elders at home.",
      "Avoid keeping broken or unused items inside the house.",
      "Donate milk, rice, or other white items to the needy occasionally.",
    ],
  },
  {
    title: "5th House - Children & Creativity",
    benefic:
      "Sun in the 5th House often gives a person sharp intelligence, creativity, and a natural ability to guide or inspire others. These individuals usually show strong leadership qualities in education, teaching, creative fields, or anything that allows them to express their ideas. They take pride in their knowledge, talents, and achievements, and often enjoy helping others learn and grow. This placement also creates a strong sense of care and responsibility toward children, making the person supportive, protective, and deeply invested in their future and success.",
    malefic:
      "When the Sun is in the 5th House it may sometimes create stress or concerns related to children or education. A person may experience occasional worries about a child’s well-being, progress, or academic path. At times, it can also bring challenges in maintaining harmony in matters related to learning or guidance. If this energy becomes too strong, the person may become overly controlling or rigid in expectations, which can create tension in relationships with children or in educational matters.",
    remedies: [
      "Feed jaggery or sweet bread to a cow regularly.",
      "Respect and care for children, and avoid speaking harshly to them.",
      "Offer water to the rising Sun every morning and pray for wisdom and peace.",
      "Donate yellow items such as turmeric, gram dal, or yellow sweets on Thursdays.",
      "Avoid keeping anger or ego in matters related to children, education, or family.",
    ],
  },
  {
    title: "6th House - Health & Enemies",
    benefic:
      "Sun in this house can give a person the strength to face difficulties, competitors, and challenging situations with determination. It often creates a hardworking and disciplined nature, making the person willing to put in extra effort to overcome obstacles. Such individuals may gradually become stronger, more practical, and better at handling responsibilities through life’s experiences.",
    malefic:
      "This placement is generally considered less favorable for the father or the father’s well-being. It may bring conflicts with rivals, hidden opposition, or situations where others create difficulties behind the scenes. There can also be periods of stress related to health, daily responsibilities, or ongoing challenges that require greater care and discipline. If this energy becomes too strong, it may make a person feel burdened, restless, or constantly engaged in struggles and misunderstandings.",
    remedies: [
      "Feed sweet bread or jaggery to a dog to help reduce the negative effects of the Sixth House.",
      "Float a coconut in flowing water on a Saturday to help remove obstacles and hidden troubles.",
      "Donate black urad dal, mustard oil, or black cloth to the needy from time to time.",
      "Keep a small silver item or square silver piece with you for protection and stability.",
      "Offer water to a Peepal tree on Saturday and light a mustard oil lamp nearby.",
    ],
  },
  {
    title: "7th House - Marriage & Partnership",
    benefic:
      "The placement of the Sun can give a person a strong and confident personality in relationships. Such individuals often seek loyal, meaningful, and stable partnerships. They may naturally take responsibility in marriage or close relationships and can be supportive, protective, and committed toward their partner. This placement may also help a person attract influential, confident, or respected people into their life.",
    malefic:
      "This placement is generally not considered very favorable. It may create ego clashes or power struggles in marriage or close partnerships. At times, differences in opinions or a strong sense of self can lead to misunderstandings and tension in relationships. If the Sun’s energy becomes too strong, the person may become dominating, stubborn, or unwilling to compromise, which can make harmony in relationships more difficult.",
    remedies: [
      "Feed a cow with wheat flour and jaggery regularly.",
      "Avoid ego, harsh speech, and unnecessary arguments in marriage or close relationships.",
      "Donate sweets, rice, or white clothes to the needy from time to time.",
      "Keep a silver square or silver coin with you for peace and stability in relationships.",
      "Worship Lord Shiva and Goddess Parvati together on Mondays for harmony in married life.",
    ],
  },
  {
    title: "8th House - Transformation & Longevity",
    benefic:
      "Sun in the 8th House can make a person mentally strong, deeply thoughtful, and capable of handling difficult situations. It often gives an interest in hidden knowledge, spirituality, research, or understanding the deeper side of life. Such individuals may become stronger through life’s ups and downs and often learn important lessons from challenging experiences. This placement can also give the ability to recover from setbacks and adapt to sudden changes with time.",
    malefic:
      "On the other hand, Sun in the 8th House is generally not considered very favorable in kundali. It may bring sudden obstacles, unexpected challenges, or phases of instability in life. At times, a person may experience sudden changes in circumstances related to family, finances, or personal life that require patience and careful decision-making. If the Sun’s energy becomes too intense, it can create stress, insecurity, or a feeling that life is moving in an uncertain way. There may also be periods when the person feels misunderstood or finds it difficult to maintain stability and peace in important areas of life.",
    remedies: [
      "Keep a small silver square or silver piece with you to reduce the negative effects of the Eighth House.",
      "Flow 8 copper coins or a coconut in running water on a Sunday to reduce sudden obstacles and instability.",
      "Respect and serve elders, especially your father or father-like figures, and avoid speaking harshly to them.",
      "Do not keep broken, rusted, or unused items in the house.",
      "Donate black sesame seeds, mustard oil, or dark-colored clothes to the needy occasionally.",
    ],
  },
  {
    title: "9th House - Fortune & Spirituality",
    benefic:
      "This placement is generally considered favorable in the birth chart. It can support growth, wisdom, and a strong sense of purpose in life. Such individuals often have high ideals, confidence in their beliefs, and a desire to move forward with clarity and determination. It may also create an interest in learning, spirituality, guidance, or gaining knowledge through life experiences. Over time, this position can help the person earn respect, recognition, and a meaningful direction in life.",
    malefic:
      "Here, this placement may sometimes bring differences in opinions with the father, mentors, or authority figures. At times, the person may find it difficult to accept advice or may strongly believe that their own views are always correct. This can create occasional distance, misunderstandings, or tension in important relationships, especially with those who guide or support them.",
    remedies: [
      "Offer water to the rising Sun every morning and apply a saffron or sandalwood tilak on the forehead.",
      "Donate yellow items such as turmeric, gram dal, yellow clothes, or bananas on Thursdays.",
      "Feed jaggery and wheat to a cow regularly to strengthen good fortune and blessings.",
      "Avoid disrespecting religion, teachers, or spiritual places, and speak politely with elders.",
      "Keep a yellow cloth or a small piece of gold with you if possible.",
    ],
  },
  {
    title: "10th House - Career & Status",
    benefic:
      "This placement of the Sun can make a person ambitious, hardworking, and strongly focused on success. It often gives leadership qualities, responsibility, and a strong desire to earn recognition and respect through work. Such individuals usually want to build a stable position in life, and with patience and effort, this placement can bring authority and success over time.",
    malefic:
      "The Sun in this position is generally considered less favorable in the kundali and may create certain challenges in professional life. It can sometimes bring difficulties in dealing with authority figures or maintaining stability in career matters. At times, fluctuations in work, sudden changes in responsibilities, or differences with seniors may arise, requiring patience and balanced decision-making. In some situations, the person may feel that their efforts are not fully recognized despite hard work. If the Sun’s energy becomes too strong, the person may become overly stubborn, ego-driven, or unwilling to accept guidance, which can create tension in the workplace.",
    remedies: [
      "Offer water to the rising Sun every morning in a copper vessel and pray for success and stability in your career.",
      "Keep a source of light on the west-facing wall of the house to help balance energy and reduce negativity.",
      "Donate jaggery, wheat, or copper on Sundays from time to time.",
      "Feed a cow with wheat and jaggery regularly to strengthen professional growth.",
      "Keep a small piece of copper or a square silver piece with you for better results in career matters.",
    ],
  },
  {
    title: "11th House - Gains & Friendships",
    benefic:
      "This placement of the Sun can make a person ambitious, determined, and strongly focused on long-term goals. It often gives the ability to work hard, build useful connections, and stay committed to success even during difficult phases. Such individuals may gradually earn respect, influence, and support from others through persistence and dedication.",
    malefic:
      "The Sun in this position is generally considered less favorable in the kundali and may lead to delays in receiving gains, rewards, or proper recognition for one’s efforts. At times, a person may feel that their hard work is not acknowledged immediately, requiring patience and consistent effort over time. There can also be occasional disappointments from friends, social circles, or unfulfilled expectations. In some situations, the person may feel isolated or unsupported despite putting in a great deal of effort. This placement can also create frustration when desired results take longer than expected.",
    remedies: [
      "Feed green fodder or spinach to a cow regularly to strengthen the positive results of the Eleventh House.",
      "Donate black sesame seeds, mustard oil, or black cloth on Saturdays to reduce delays and obstacles.",
      "Respect and maintain good relations with elder siblings, friends, and well-wishers.",
      "Avoid greed, false promises, or taking advantage of others for personal gain.",
      "Keep a small silver square or a piece of silver with you for stability and support.",
    ],
  },
  {
    title: "12th House - Liberation & Expenses",
    benefic:
      "This placement of the Sun can make a person thoughtful, spiritual, and reflective. It often creates an interest in inner growth, meditation, foreign places, or understanding the deeper meaning of life. Such individuals may develop strong intuition, compassion, and the ability to learn important lessons through experience. Over time, this placement can help the person become wiser, calmer, and more emotionally aware.",
    malefic:
      "Astrologically, this placement of the Sun is generally considered less favorable in the kundali. It may lead to unnecessary expenses or financial strain at times. A person may also experience a lack of clarity in goals or direction, which can create confusion in decision-making. There can be phases when the person feels uncertain, distracted, or unable to move forward with complete confidence until the Sun’s energy becomes more balanced. At times, the person may struggle to understand what they truly want, which can lead to delays or wrong choices. This placement can also create a tendency to overthink or feel mentally burdened during difficult periods.",
    remedies: [
      "Feed a cow with wheat, jaggery, or green fodder regularly to reduce losses and negative effects.",
      "Donate white items such as rice, milk, or white clothes to the needy on Fridays.",
      "Keep a small silver piece or square silver with you for protection and stability.",
      "Avoid arguments, ego clashes, or unnecessary spending, especially on luxuries.",
      "Respect spiritual places, meditate, or practice charity to calm the mind and reduce stress.",
    ],
  },
];

const moonHouseDetails = [
  {
    title: "1st House - Self & Personality",
    benefic:
      "The Moon in the 1st house is generally favourable for the kundali and gives the person a gentle and attractive personality. It enhances emotional sensitivity, intuition, and creativity. Such individuals are often caring, family-oriented, and well-liked in social circles. They have a strong bond with their family, can maintain domestic harmony, and may excel in artistic or imaginative pursuits.",
    malefic:
      "When the Moon sits in a challenging position in the 1st House, emotions tend to sit right on the surface. These individuals are often incredibly sensitive, acting like “emotional sponges” who easily soak up the moods and opinions of those around them. This can lead to frequent mood swings, making their behaviour feel unpredictable or reactive to the people in their daily lives.\nThis placement can create a tug-of-war with self-confidence. It is common to feel insecure about appearance or the ability to make the “right” decision. Because of a tendency to overthink, a cycle of anxiety can develop where fear and doubt start to dictate choices.",
    remedies: [
      "For 43 consecutive days, offer water mixed with a small amount of milk at the roots of a banyan tree during the early morning hours with faith and devotion.",
      "Add two pinches of sugar to the mixture before pouring it, as this is believed to invite sweetness, harmony, and positive energy into life.",
      "This remedy is believed to strengthen positive planetary energies, remove obstacles, improve mental peace, and bring greater stability and balance in life.",
      "After offering the mixture, apply a tilak of the moist soil from beneath the tree to your forehead as a symbol of grounding, protection, and blessings.",
    ],
  },
  {
    title: "2nd House - Wealth & Family",
    benefic:
      "Your financial condition will generally remain good, and there will be no shortage of comforts and luxuries in your life. Although ups and downs may occur from time to time, you will still succeed in keeping your life stable and balanced. If you were born during the Shukla Paksha (the waxing phase of the Moon), this alignment is considered even more auspicious. In such a case, despite initial struggles or hardships in life, your old age is likely to be happy, peaceful, and comfortable. Moving forward, you may experience mental contentment, family happiness, and stability.",
    malefic:
      "If a temple is established within the home and bells are used during morning and evening prayers, it can have a negative impact on your fortune and life’s progress. This may lead to obstacles in your work, mental restlessness, or a feeling that luck is not fully on your side. Furthermore, this situation can affect the happiness derived from children—specifically happiness regarding a son—which may cause persistent worry. Additionally, receiving full support or companionship from a sister is not considered certain. You may see distance in relationships, misunderstandings, or a lack of cooperation from a sister from time to time.",
    remedies: [
      "Keep the oldest possible rice grains sealed in a silver container and place it somewhere inside the house.",
      "Every Monday, continue offering milk and rice at a temple.",
      "According to Lal Kitab, avoid keeping broken silver items in the house, as they are believed to weaken positive lunar energy.",
      "Feed rice mixed with milk to white cows on Mondays to reduce emotional stress and bring peace at home.",
      "Keep a small piece of silver or a silver coin with you at all times for stability and protection.",
    ],
  },
  {
    title: "3rd House - Courage & Siblings",
    benefic:
      "You are generally a mentally happy, calm, and balanced person. Whether you choose a spiritual path or live a family-oriented life, you have the ability to become successful and financially prosperous in both situations. Even if you are born into a simple or financially weak family, luck and destiny continue to support you throughout life. You are kind-hearted by nature and naturally feel inclined to help poor and needy people. There may be more men than women in your family, yet women are given full respect and honour, which further strengthens your fortune and growth. Love, care, and service between husband and wife bring positive results, peace, and happiness into your life. When you give your brothers and sisters freedom, support, and happiness, you receive greater comfort, success, and benefits in return.",
    malefic:
      "If you become stingy with your brothers and sisters, or do not allow them happiness, support, and independence, it may reduce the amount of success, comfort, and benefits you receive in life. Such behaviour can create distance in relationships and may also bring delays or obstacles in important work.",
    remedies: [
      "To increase wealth, prosperity, and positive fortune, keep a horse or a partridge bird, or take care of them with kindness and regular service.",
      "According to Lal Kitab, keep a piece of silver or a silver coin in your house to attract stability and financial growth.",
      "Feed jaggery and gram to cows every Thursday, as this is believed to strengthen good luck and remove obstacles related to money.",
      "Offer water to a Peepal tree on Saturday morning and light a mustard oil lamp beneath it in the evening for relief from financial troubles.",
      "Keep a small amount of saffron in a clean yellow cloth inside your locker or place of savings to invite prosperity and abundance.",
    ],
  },
  {
    title: "4th House - Home & Mother",
    benefic:
      "When you look at your life path, there is a really strong sense of “grounded” success—the kind that comes with owning land, property, or having a reliable set of wheels to get you where you are going. You are likely to find a lot of your stability through real estate or family assets, which gives you a solid foundation to build on. On top of that, you have a natural hunger for learning; you are the type of person who genuinely enjoys diving into new subjects and expanding what you know.\n\nFamily-wise, there is a beautiful, nurturing energy around you. With a strong presence of women in your circle, you are likely backed by a lot of emotional support and genuine care, which adds a lot to your overall happiness. There is also a clear “green thumb” or connection to the earth in your chart—financial growth and wealth are very likely to flow toward you through things like farming, agriculture, or any work tied directly to the land.",
    malefic:
      "You may experience some lack of happiness related to your son, or your son may face certain struggles, difficulties, or recurring problems in life. At times, this can become a source of concern and emotional stress for you.",
    remedies: [
      "Before beginning any auspicious work or leaving for an important occasion, place a vessel filled with water or milk, as it is believed to bring शुभ and favourable results.",
      "According to Lal Kitab, before leaving the house for an important task, eat a small amount of sugar or curd to attract success and remove obstacles.",
      "Light a pure ghee lamp in the house every morning and evening to strengthen positive energies and create peace in the home.",
      "Offer water mixed with a little turmeric to the Sun every morning to improve confidence, luck, and respect.",
      "Keep a clean red cloth in your place of worship or near the entrance of the house, as it is believed to protect the home from negative influences and attract good fortune.",
    ],
  },
  {
    title: "5th House - Children & Creativity",
    benefic:
      "When you do work that benefits other people or contributes to the welfare of society, it not only earns you respect but also brings positive results for your son and adds strength to your family’s fortune. You have a strong sense of self-respect and rarely compromise your values just to please others. You prefer to stand by your principles and live life with dignity. You are someone who naturally believes in fairness and justice. Your nature is kind, compassionate, and understanding, which is why people often trust you and look to you for support.\n\nIn arguments, disputes, or difficult situations, the side you stand with often gains strength and is more likely to succeed. You carry a natural influence that works in favour of the people you support. For you, a government job or a profession connected with authority, administration, or public service is usually more rewarding and stable than other career paths.",
    malefic:
      "If you choose a path related to business or trade, the results may not be as smooth or rewarding as they would be in a job, especially one connected with government or authority. You may put in a great deal of effort, yet the success, stability, or satisfaction you expect can take longer to arrive. At times, business may bring delays, uncertainty, or situations where the outcome does not fully reflect the hard work you have invested.",
    remedies: [
      "Every Monday, offer mango blossoms to Shiva as a sacred remedy for peace and positive results.",
      "According to Lal Kitab, offer raw milk mixed with water on the Shiva Lingam every Monday to reduce emotional stress and strengthen good fortune.",
      "Keep a small piece of silver or a silver coin with you, as it is believed to bring mental peace and stability.",
      "Feed white rice mixed with milk to cows on Mondays to receive the blessings of the Moon and improve family harmony.",
      "Avoid speaking harshly to your mother or elders, because Lal Kitab considers their blessings important for removing obstacles and improving luck.",
    ],
  },
  {
    title: "6th House - Health & Enemies",
    benefic:
      "If you are working a 9-to-5 or a steady job, you will likely notice that little financial extras—bonuses or unexpected perks—tend to find their way to you every now and then. There is also a real sense of longevity in your chart; you have the kind of constitution that suggests a long, full life, likely reaching well into your 80s.\nOne of the most interesting things about your path is how “karmic” it feels. You will probably notice a direct “what goes around, comes around” effect in your life. When you lead with kindness and stay honest with people, doors just seem to open for you. Life essentially mirrors back the energy you put out. Doing something charitable—like setting up a drinking water station, a pump, or even just ensuring there is fresh water available in places like hospitals or quiet, sacred spaces like cremation grounds—acts like a shield for you. It is believed that these simple acts of service bring a massive amount of protection and keep your luck moving in the right direction.",
    malefic:
      "From an early age, you may have to deal with health-related issues or periods of physical weakness. Your mother may also face recurring problems connected with her health, peace of mind, or comfort within the home. Life tends to reflect your actions strongly, so if you behave unfairly, harshly, or selfishly with others, you may experience difficulties and negative consequences in return.\nIt is generally considered unfavorable for you to build a hand pump, tap, tube well, or well for personal or household use. Such things may have a negative effect on your well-being and can also create difficulties for your mother’s health and peace. In some cases, it may even bring serious problems or long-lasting stress. You may also face trouble because of money lent to other people. Loans given in trust can become a reason for financial loss, delays, or repeated worries.",
    remedies: [],
  },
  {
    title: "7th House - Marriage & Partnership",
    benefic:
      "One of your best “superpowers” is your eye for detail. You notice the small things that everyone else misses. This makes you a natural at managing projects, quality control, or any kind of planning where precision matters. If you ever decide to lean into your creative or intuitive side—like poetry or astrology—do not be surprised if those hobbies actually bring you a good bit of recognition and extra income. Also, do not be shocked if your career takes you on the road. Whether it is moving to a different city or even heading overseas, a significant chapter of your life will likely be spent away from where you were born. However, there is a strong “homing pigeon” energy in your chart; you will likely find your way back to your roots to spend your later years in your native place.",
    malefic:
      "Timing is everything for you, especially when it comes to settling down. Getting married at age 24 or 25 is usually seen as a bit of a red flag in this placement. Doing so can trigger a domino effect of stress—not just for you and your spouse, but it can also weigh heavily on your mother’s health, your bank account, and even the future happiness of your children. You might notice your mother struggling with her health or emotional state, or the family finances might feel tight. These are just phases, but they definitely require an extra dose of patience and a “one day at a time” attitude to get through.",
    remedies: [
      "Keep rice in the house equal to the weight of your spouse, as this remedy is believed to strengthen marital harmony and family prosperity.",
      "According to Lal Kitab, always keep a small amount of saffron or turmeric in the house to maintain peace and good fortune between husband and wife.",
      "Every Friday, donate white sweets or rice to young girls or needy women to improve happiness in married life.",
      "Avoid keeping empty utensils or broken items in the bedroom, as they are believed to create tension and disturb family peace.",
      "Light a pure ghee lamp near the place of worship every evening to bring warmth, understanding, and positive energy into the home.",
    ],
  },
  {
    title: "8th House - Transformation & Longevity",
    benefic:
      "No matter what life throws at you, your mother’s presence is your ultimate safety net. Her blessings and long life act like a shield, giving you the emotional grit and stability to pull through even the toughest chapters. You will find that family support rarely fails you when things get shaky.\n\nYou also have a natural staying power. There is a deep-seated resilience in your chart that suggests not just a long life, but the kind of patience that outlasts any crisis. As you hit certain milestones—specifically after the ages of 12, 24, and 48—your role in the family shifts. You become the “pillar” for your extended circle. Whether it is stepping up for your in-laws, your son-in-law, or your mother’s side of the family, you will find yourself being the one who brings them comfort and helps them navigate their own hard times.",
    malefic:
      "You may face ups and downs in education, career, married life, and family happiness, which can sometimes bring stress or delays. Gambling, lottery, speculation, betting, and jewelry-related work are generally not considered favorable, as they may lead to financial loss.\n\nIf your behavior becomes dishonest or careless, it can reduce happiness in married life and may cause a part of your earnings to be wasted unnecessarily. The ages of 2, 4, 8, 22, 24, and 48 can be sensitive for your mother or grandmother, especially regarding health and peace. Marriage at the age of 24 is usually considered unfavorable for you. There may also be a possibility of sudden health issues, so it is important to take care of your well-being. Building a water tank or well beneath the house is also considered inauspicious and may create financial or family-related problems.",
    remedies: [
      "Fill a glass bottle with water taken from a cremation ground and place a square piece of silver inside it. Keep this bottle safely inside the house.",
      "According to Lal Kitab, keep a silver coin or a small silver square in your pocket or locker to reduce negative influences.",
      "Feed milk mixed with rice to stray dogs or cows on Mondays to bring peace and stability into the home.",
      "Float a coconut in flowing water on Saturday evening to remove obstacles and reduce unseen troubles.",
      "Avoid keeping broken glass, damaged utensils, or unused scrap in the house, as Lal Kitab considers them a source of negative energy.",
    ],
  },
  {
    title: "9th House - Fortune & Spirituality",
    benefic:
      "You have a real knack for numbers—the kind of brain that just “clicks” with math and logic. If you ever wanted to pursue being a mathematician or an analyst, the potential is definitely there. Beyond just being smart, you are likely to see some solid wins when it comes to property and real estate; owning land or a home seems to be in the cards for you. On a more soulful level, life will likely pull you toward several pilgrimages or spiritual journeys that help you grow internally. Plus, there is a beautiful note here regarding family: you are expected to see a lot of “barakat” (blessings) through your son, who will likely be a great source of pride and comfort to you as you get older.",
    malefic:
      "In this particular placement, there are no major warning signs or strongly negative traits usually associated with it. In many ways, it can be seen as a relatively clean and balanced position, where serious obstacles or harmful tendencies are not commonly indicated. This allows the person to move forward in life without carrying the burden of heavy planetary challenges. With the right mindset and actions, the positive potential of this placement can be expressed more easily, making it a generally supportive influence in the birth chart.",
    remedies: [
      "Wear gold on your body and keep a yellow handkerchief in your pocket, as this remedy is believed to strengthen luck, confidence, and success in career.",
      "According to Lal Kitab, offer water to the Sun every morning from a copper vessel to gain respect, authority, and stability in professional life.",
      "Keep a small piece of saffron or turmeric wrapped in a yellow cloth in your locker or workplace to attract prosperity and recognition.",
      "Feed jaggery and wheat to cows on Sundays, as this is believed to remove obstacles and improve your fortune.",
      "Avoid speaking harshly to your father, elders, or senior people at work, because their blessings are considered especially important for progress and success.",
    ],
  },
  {
    title: "10th House - Career & Status",
    benefic:
      "You naturally gravitate toward helping people and have the potential to really make a mark in your community. Because of this social drive, you are likely to see a good deal of success and respect in the public eye. Professionally, you might find your “sweet spot” in fields connected to water—think anything from marine work and dam projects to the chemical industry. Your career will not be boring, either; it is likely to involve plenty of travel, which keeps your life fresh and constantly adds to your bank of experiences. You are not the type to stay boxed in one place, and that freedom allows you to pick up skills across many different fields.",
    malefic:
      "On the flip side, that same desire for movement can make it hard for you to stay at one job for a long time, which might lead to some instability in your career. You may have also noticed that your formal education has not always been a smooth ride—there tend to be hurdles or interruptions when it comes to your studies. Lastly, your home life might feel a bit strained; achieving total peace and happiness in your marriage or domestic life can be a bit of a challenge, requiring more effort than it might for others.",
    remedies: [
      "Wear a pearl set in silver on the little finger, as this remedy is believed to bring emotional peace, mental balance, and support from the Moon.",
      "According to Lal Kitab, keep a small silver coin or piece of silver with you at all times to reduce emotional stress and strengthen good fortune.",
      "Offer milk mixed with water to a Shiva Lingam every Monday, as this is believed to calm the mind and remove inner restlessness.",
      "Avoid speaking harshly to your mother or elderly women in the family, because their blessings are considered important for peace and stability in life.",
      "Before sleeping, keep a glass of water near your bedside and pour it at the roots of a tree the next morning to help release negative thoughts and mental tension.",
    ],
  },
  {
    title: "11th House - Gains & Friendships",
    benefic:
      "You have a natural heart for service and tend to do really well in social circles, often gaining a solid reputation and respect for the work you do. When it comes to your career, you are likely to find success in fields connected to water or liquids—think anything from marine projects and dams to the chemical industry. Your job will probably keep you on the move, giving you plenty of chances to travel, meet new people, and broaden your horizons. You are not the type to stay stuck in one spot, which means you will end up with a very rich and diverse set of life experiences.",
    malefic:
      "The downside to all that movement is that it can be tough for you to stay put in one job for long, which might make your career feel a bit unstable at times. You may also find that your education does not always go according to plan—hurdles or distractions in your studies are fairly common with this placement. Additionally, your home life might not always be a “bed of roses.” Achieving total harmony in your marriage or domestic life can take a lot of extra work, and you might feel like true peace at home is sometimes just out of reach.",
    remedies: [
      "For 11 consecutive days, sprinkle a few drops of raw milk on rice and immerse it in flowing water.",
      "After completing these 11 days, continue this remedy every Monday for one full year.",
      "According to Lal Kitab, keep a small silver coin or a piece of silver with you to strengthen the positive effects of this remedy.",
      "Every Monday, offer milk mixed with water to a Shiva Lingam to bring emotional peace and stability.",
      "Avoid consuming alcohol or speaking harshly on Mondays, as maintaining calm and purity is believed to make the remedy more effective.",
    ],
  },
  {
    title: "12th House - Liberation & Expenses",
    benefic:
      "You are likely to get plenty of chances to travel abroad, which will open up all sorts of new doors and fresh perspectives for you. When it comes to your heart, you are not someone who loves halfway—you feel emotions and romantic connections on a very deep, intense level. This natural drive for joy, comfort, and the “good life” serves as a powerful motivator, constantly pushing you to move forward and seek out the best experiences life has to offer.",
    malefic:
      "On the flip side, there are moments where you might struggle with a deep sense of loneliness or feel emotionally drained. Your mindset can sometimes tip toward the negative or feel a bit out of balance, which can be tough to shake. You will also need to be careful with your reputation, as there is a risk of facing misunderstandings or public image issues. Financially, you might run into heavy expenses or investments you did not see coming, creating some unwanted pressure. Because you tend to keep your romantic life under wraps and “hidden,” it can add an extra layer of secret stress to your day-to-day life. Lastly, a strong focus on physical or sensory pleasures might sometimes cloud your better judgment when making big decisions.",
    remedies: [
      "Every Monday, offer one kilogram of milk at a temple or place of worship and seek blessings for peace, fortune, and protection.",
      "According to Lal Kitab, keep a small silver coin or a piece of silver with you, as it is believed to strengthen luck and reduce difficulties.",
      "Feed rice mixed with milk to cows on Mondays to bring emotional balance and improve family harmony.",
      "Avoid speaking harshly to your mother, teachers, or elders, because their blessings are especially important for your progress and peace of mind.",
      "Before leaving home on an important day, drink a little water or milk and pray quietly, as this is believed to bring success and protection.",
    ],
  },
];

const marsHouseDetails = [
  {
    title: "1st House - Self & Personality",
    benefic:
      "You are like a walking battery, with a level of enthusiasm and drive that most people struggle to keep up with. One of your best physical perks is your immune system; even when something catches up to you, you are usually back on your feet faster than everyone else.\n\nThat high energy is a huge part of why you succeed, mostly because you have the guts to go after what you want. You are not the type to sit on the sidelines or play it safe—you are brave enough to dive headfirst into new projects without letting “what-ifs” slow you down.",
    malefic:
      "That same fire can sometimes work against you. At times, you may become overly stubborn, impulsive, or quick to anger. Once you make up your mind, it can be hard to listen to others, which may lead to arguments or wrong decisions. You may also act before thinking, and while that gives you courage, it can sometimes bring mistakes, regret, or minor accidents if you are not careful.",
    remedies: [
      "Feed jaggery and gram to monkeys on Tuesdays.",
      "Donate red lentils or red cloth at a temple.",
      "Keep a small silver square in your pocket for stability and protection.",
      "Avoid anger, harsh speech, and unnecessary arguments, especially with family members.",
    ],
  },
  {
    title: "2nd House - Wealth & Family",
    benefic:
      "You are someone who feels things deeply. You are not just going through the motions or skimming the surface of life; you have emotional depth and empathy that let you experience every situation fully. Do not mistake that sensitivity for weakness. When things get messy or life starts throwing punches, you have a surprising amount of grit. Your quiet inner strength keeps you from backing down, allowing you to face challenges head-on instead of folding under pressure.",
    malefic:
      "That same intensity can sometimes give you a short fuse. You might snap over small things, and letting a few harsh words fly can harm your relationships. You may also be too relaxed with spending, which can lead to avoidable financial stress.\n\nBe mindful of your circle; falling in with the wrong crowd or leaning on habits like smoking or drinking as a crutch can be a risk. Stay safe to avoid accidents. When finances are tight, do not be tempted by “get rich quick” schemes or shady deals, as they can cause trouble for you and your partner.",
    remedies: [
      "For 11 consecutive days, take 400 grams of jaggery sweets or sugar candies, rotate them around your head seven times, and immerse them in clean flowing water. After that, continue this remedy every Tuesday.",
      "Feed sweet rotis or jaggery to dogs on Tuesdays.",
      "Donate red lentils or a red cloth at a temple every Tuesday.",
      "Wear a copper bracelet or keep a small copper coin with you.",
      "Avoid anger, harsh speech, and unnecessary arguments with family members.",
    ],
  },
  {
    title: "3rd House - Courage & Siblings",
    benefic:
      "You have a natural edge in competition. You do not just show up; you have the grit to walk away as the winner. You do not back down from a fight or a tough goal—in fact, you are driven by a “refuse to lose” mindset. You are a hard worker who is not afraid to get your hands dirty, and your persistence helps you push through even when things look bleak. You also have a knack for making money through “brick and mortar” assets such as real estate, land deals, metals, or brokerage.",
    malefic:
      "Watch your step while travelling, as you may be more prone to accidental scrapes on the move. Your focus may also be fragile; a romantic distraction or new crush can derail your productivity.\n\nYou might be tempted to take the easy way out, pass along gossip, or cut corners in business. These shortcuts usually cause more trouble than they are worth. You may also move from place to place without feeling settled. School or learning can feel like a hurdle race, with interruptions and roadblocks.",
    remedies: [
      "Serve and take care of your paternal uncle (Tau/Taya Ji) with respect and sincerity.",
      "Some old Lal Kitab texts mention keeping ivory in the house with government permission, but this remedy should not be followed today because of wildlife protection laws. Instead, keep a white sandalwood or ivory-coloured symbolic item in the house.",
      "Feed jaggery and gram to monkeys on Tuesdays.",
      "Donate red lentils or red cloth at a temple regularly.",
      "Wear a copper coin in a silver chain around your neck.",
    ],
  },
  {
    title: "4th House - Home & Mother",
    benefic:
      "You are not the type to let people walk all over you; you have the backbone to stand up for yourself and handle anyone trying to mess with you. Beyond that tough exterior, you are grounded and responsible with your family—you are someone people can lean on when they need help. There may also be a strong spiritual legacy from a grandfather or great-grandfather who was a teacher or mentor. That ancestral energy can act like an internal compass when things feel uncertain.",
    malefic:
      "Stress may affect your throat, chest, or stomach, so keep an eye on your digestion and listen to your body. There may be days when results do not match the effort you put in, which can feel draining. Try not to let grudges simmer; the need to get even can burn you out.\n\nYou may worry about the health or happiness of women in your life, such as your mother or partner. Things may also be turbulent for your older brother or his family, especially until your late twenties. A chaotic or negative environment can affect your mood and push you toward impulsive decisions or unhealthy coping habits.",
    remedies: [
      "For 7 Tuesdays, wash 400 grams of rice with milk and immerse it in clean flowing water. This is believed to reduce negative effects.",
      "Feed milk and rice to cows on Mondays or Tuesdays.",
      "Wear a pearl set in silver on the little finger.",
      "Keep a silver square or a small silver coin with you.",
      "Avoid anger, harsh speech, and arguments with your mother or family members.",
    ],
  },
  {
    title: "5th House - Children & Creativity",
    benefic:
      "You may be a late bloomer when it comes to money, with your finances becoming healthier and more stable as you get older. There is also a thread of healing in your life; you or someone in your family may have a natural gift for medicine or helping people recover.\n\nThe birth of a son may be a major milestone and a spark for your career, when things start clicking into place and your path to success picks up speed.",
    malefic:
      "Stay connected to where you came from. Your luck may be tied to your roots, so drifting too far from your ancestral home or losing touch with your family history may bring roadblocks, especially around having children or continuing the family line. Staying connected to your home base or heritage can help your life path run more smoothly.",
    remedies: [
      "For 43 consecutive nights, keep a vessel of water near your bedside while sleeping. In the morning, pour that water onto plants. After completing 43 days, continue this remedy every Tuesday.",
      "Wear a copper coin in a silver chain around your neck.",
      "Donate red lentils or red cloth at a temple on Tuesdays.",
      "Feed sweet rotis or jaggery to dogs every Tuesday.",
      "Avoid anger, harsh speech, and unnecessary arguments with family members.",
    ],
  },
  {
    title: "6th House - Health & Enemies",
    benefic:
      "You have a natural knack for business, and it is likely to remain your main source of income. You are not a one-trick pony; you have the energy and brainpower to juggle more than one venture at a time. You can usually count on your siblings to have your back, and that family support system is a major asset when you are building something big.",
    malefic:
      "Be careful about trusting people too quickly, especially in business or close partnerships, as they may bring more stress than support. You may also find it hard to rely fully on friends. Avoid getting too involved in secret relationships or emotional drama, as they can affect your peace of mind.\n\nWhile travelling, be extra careful with money and belongings, as there can be chances of loss or theft. It is also better to stay away from legal disputes whenever possible. Your life partner may be sensitive in terms of health and may need more care and understanding over time.",
    remedies: [
      "For 6 consecutive days, offer milk to 6 young girls as a gesture of kindness and blessing.",
      "Feed milk and rice to cows, especially on Mondays.",
      "Wear a pearl set in silver on your little finger for emotional balance.",
      "Keep a small silver coin or silver square with you.",
      "Avoid speaking harshly to your mother, wife, or other women in the family.",
    ],
  },
  {
    title: "7th House - Marriage & Partnership",
    benefic:
      "You have a natural knack for business, and it is likely where your real financial security will come from. You are not a one-trick pony; you have the mental bandwidth to juggle multiple ventures at once. Your siblings tend to be a solid support system, giving you extra confidence to take risks and grow.",
    malefic:
      "Be careful about who you team up with. Business partnerships may turn into a headache, and finding friends you can truly trust can feel difficult. Watch out for distractions; secret romantic drama or a wandering eye can drain your mental health. Travel may bring a risk of theft or losing money. Stay within the law to avoid legal trouble. Your partner’s health may be fragile at times, so they may need extra care and patience.",
    remedies: [
      "After bathing, husband and wife should wear red clothes and, for 7 consecutive Tuesdays, fill a copper vessel with rice, apply red sandalwood paste on it, and place it before Hanuman. If you are not married, you can do this remedy on your own as well.",
      "Offer red flowers or sindoor to Hanuman every Tuesday.",
      "Donate red lentils or red cloth at a temple on Tuesdays.",
      "Feed sweet rotis or jaggery to monkeys or stray dogs.",
      "Try to avoid anger, arguments, and harsh words in your relationship, especially on Tuesdays.",
    ],
  },
  {
    title: "8th House - Transformation & Longevity",
    benefic:
      "You may have a knack for attracting sudden wins, with money or unexpected rewards appearing when you least expect them. Beyond those lucky breaks, your real strength is resilience. You can walk through heavy storms and still keep moving forward; your inner engine refuses to quit.",
    malefic:
      "Life may feel like a physical and mental gauntlet at times. Take care of your physical safety, as accidents may require medical attention. Pay attention to your general health and seek appropriate professional care when needed. Stress can also become overwhelming; do not try to handle difficult thoughts alone—reach out to someone you trust or a qualified professional. Stay alert around fire and while travelling, when theft or loss may occur. Education may also bring roadblocks.",
    remedies: [
      "On a Tuesday, immerse 4 kilograms of jaggery sweets, sugar candies, or a mixture of red lentils and carom seeds in clean flowing water.",
      "Feed sweet rotis or jaggery to dogs or monkeys every Tuesday.",
      "Wear a copper coin in a silver chain around your neck.",
      "Donate red cloth or red lentils at a temple regularly.",
      "Try to stay calm and avoid anger, arguments, and harsh speech, especially with family members.",
    ],
  },
  {
    title: "9th House - Fortune & Spirituality",
    benefic:
      "Life may improve steadily, especially after age 13, when your family’s financial condition may begin to grow stronger. By around 28, you may be able to create good savings, property, or a secure lifestyle through your own hard work.\n\nYou are naturally honest, practical, and driven. Staying close to your brother can bring support and positive energy, and your sister-in-law may also prove fortunate. You may be better suited to careers requiring courage, responsibility, and quick action, such as medicine, surgery, or police work.",
    malefic:
      "Even though this is a positive placement, your success may be closely connected to family and your support system. When you stay connected to your roots, especially your brother, things may move more smoothly. If you distance yourself or try to do everything alone, progress can feel slower. Avoid becoming too comfortable when life is going well; demanding careers require discipline and continued effort.",
    remedies: [
      "Every Tuesday, offer sindoor (vermilion) to Lord Hanuman and present him with prasad (offering of food).",
      "Keep a small copper vessel filled with water near Hanuman Ji’s idol and change it every week to invite positivity and protection.",
      "Light a pure ghee lamp in front of the Hanuman Ji idol every evening to remove obstacles and bring peace to the home.",
      "Donate red clothes or sweets to children or needy people on Tuesdays to strengthen blessings for courage, energy, and success.",
      "Recite the Hanuman Chalisa daily with devotion to boost confidence, remove fear, and attract good fortune in life.",
    ],
  },
  {
    title: "10th House - Career & Status",
    benefic:
      "You may be a lucky charm for your family. Even if things started out tight financially, your arrival may mark the moment the household’s luck turns around. You have the grit to build wealth and property through hard work. An older brother may be linked with the joy of having children, specifically a son. You may also enjoy a long, healthy, and stable life, with a brave heart that helps you navigate life’s ups and downs while enjoying a settled home life.",
    malefic:
      "Take care with family heirlooms, especially gold; selling ancestral gold is traditionally considered unfavourable for finances and may bring concerns related to children. Repeatedly boiling over and spilling milk on the stove is also described as a traditional warning sign for the home’s prosperity or a family member going through a difficult period. A peaceful, mindful home environment is considered important.",
    remedies: [
      "Every Tuesday, perform worship of Lord Hanuman and then eat a sweet meal as prasad.",
      "Keep a small copper pot filled with water near Hanuman Ji’s idol and refill it every week to invite protection and positive energy.",
      "Light a pure ghee lamp in front of Hanuman Ji daily to remove obstacles and bring peace to your home.",
      "Donate red clothes, sweets, or food to children or the needy on Tuesdays to strengthen blessings for courage and success.",
      "Recite the Hanuman Chalisa with devotion regularly to boost confidence, remove fear, and attract good fortune in life.",
    ],
  },
  {
    title: "11th House - Gains & Friendships",
    benefic:
      "You have a bright path ahead, and your goals have a good chance of becoming reality. A strong social circle may bring loyal, like-minded friends who make the journey easier. In business, your careful, thoughtful approach can bring good results.\n\nYou are self-reliant and driven, which may lead to financial stability and success in career or education. Fields like agriculture, machinery, or working with metals could bring opportunities. A supportive bond with your older brother may add harmony and balance to your life.",
    malefic:
      "Your independence can sometimes turn into stubbornness, making it hard to take advice. Money may come easily but slip away if spending is not disciplined. You might struggle with consistency and occasionally coast when you should push harder. Even with good friends, watch out for those who might take advantage of your generosity. Balancing confidence with openness will be key.",
    remedies: [
      "Every Tuesday, offer sindoor to Lord Hanuman for strength, courage, and protection.",
      "Keeping a black and white dog at home is traditionally believed to bring positive energy, loyalty, and unexpected blessings.",
      "Feed jaggery and milk to cows on Tuesdays to reduce obstacles and attract harmony in family life.",
      "Donate red clothes, sweets, or rice to needy people on Tuesdays to enhance luck and remove negativity.",
      "Light a ghee lamp in front of Lord Hanuman every Tuesday evening to invite peace, confidence, and success into your home.",
    ],
  },
  {
    title: "12th House - Liberation & Expenses",
    benefic:
      "You have strong “rags-to-riches” potential that can uplift your whole family. Even if you started modestly, your natural drive and inherited qualities from your father may make you responsible, steady, and a source of guidance for others. Your supportive family network complements your independent, strong-willed nature. Mental toughness helps you stay calm under pressure, and milestones around ages 24 or 28 may bring boosts in career and personal growth. You are genuinely helpful and ready to lend a hand.",
    malefic:
      "You may have a short fuse, and your temper might strain relationships if unchecked. Your home and your partner’s well-being may feel turbulent at times, especially if personalities clash or health issues arise. Learning to balance your strong nature with your partner’s needs can help maintain harmony at home.",
    remedies: [
      "For 12 consecutive days, pour 12 grams of jaggery into clean, flowing water. Continue serving your elder brother.",
      "Every Tuesday, feed milk to six little girls to invite positivity and reduce obstacles.",
      "Keep a silver coin or small silver piece with you to strengthen luck and protection.",
      "Donate rice mixed with jaggery to needy people on Tuesdays for family harmony and mental peace.",
    ],
  },
];

const mercuryHouseDetails = [
  {
    title: "1st House - Self & Personality",
    benefic:
      "You find real happiness in helping others alongside your family. Relationships with important women in your life—such as your sister, aunt, or daughter—remain meaningful, and you make an effort to keep them strong and peaceful. You have the determination to achieve what others may think is impossible, which naturally earns you love and respect. From age 34 onward, the next 11 years can bring recognition, respect, and growth. You are intelligent, practical, and quick-minded, with a talent for planning and communication. These qualities can help you succeed in mathematics, astrology, consulting, management, or beauty-related work. You also have a good sense for handling money, and your presence may have brought greater prosperity to your family over time.",
    malefic:
      "You are naturally skilled at handling people and situations, but at times you may rely too much on charm or clever words to get your way. Selfishness, impatience, or over-smart thinking can affect the respect and reputation you have built. You may put your own needs first and get angry quickly, though the anger usually does not last long. You may also have slightly unusual dental features, such as having fewer or more teeth than average.",
    remedies: [
      "Donate whole green mung beans for 11 consecutive days, then donate one kilogram of whole green mung beans for the next 27 Wednesdays.",
      "Give a green suit or saree to transgender individuals every three months.",
      "Never keep a pet parrot.",
      "Never plant pomegranate or red guava trees at home.",
    ],
  },
  {
    title: "2nd House - Wealth & Family",
    benefic:
      "Your independent nature can sometimes turn into pride. At times, you may become short-tempered or avoid admitting your mistakes. Focusing too much on yourself can create tension with your parents and may also affect your friendships.",
    malefic:
      "Family and money matters may feel unstable, with expenses rising unexpectedly and savings becoming difficult. Between the ages of 16 and 21, your father may go through struggles, and support from his side could remain limited. Debt or financial pressure may affect the family, and relationships with female relatives such as your sister, daughter, or aunts may need extra care. Avoid gambling, lotteries, risky investments, dishonest business, and businesses related to alcohol, meat, or eggs. Staying loyal to your spouse is important, as outside relationships can disturb family happiness. Be careful while travelling, since some journeys could lead to stress or unnecessary expenses.",
    remedies: [
      "Get your nose pierced for 6 days and wear a gold or silver wire in it. If that is not possible, you may use a white thread instead. On the 7th day, immerse it in flowing water.",
      "Remove and throw out any loose thread, rope, wool, or yarn balls from the house.",
      "Serve and respect your spouse’s unmarried sister and young girls.",
    ],
  },
  {
    title: "3rd House - Courage & Siblings",
    benefic:
      "You are likely to enjoy a long life with strong support from your siblings, friends, and family. Travel, learning, and new experiences can keep bringing growth, while your practical thinking can help you build wealth and stability over time. You often give excellent advice to others, even if following the same advice for yourself feels difficult. From childhood, you may have brought luck and happiness to your family, and later in life you are likely to enjoy comfort through your children, home, and property.",
    malefic:
      "At times, the wrong company or poor choices may create obstacles, affecting your confidence, studies, and career growth. Family relationships—especially with parents and female relatives—may feel strained, and there can be phases of instability in work, income, or living situations. Health may also need attention, particularly issues related to the skin, so maintaining discipline, good company, and positive habits will be important.",
    remedies: [
      "Clean your teeth every day with alum.",
      "Donate a goat in the same manner that a cow is traditionally donated.",
      "Do not live in a south-facing house.",
      "Wear a red thread around your neck.",
      "Offer a silver umbrella to Goddess Durga. Repeat this remedy every three months.",
    ],
  },
  {
    title: "4th House - Home & Mother",
    benefic:
      "You are likely to enjoy a comfortable and successful life, with good health, support from your parents, and peace at home. Your intelligence, communication skills, and business sense can bring respect, financial growth, and success in writing, media, business, or government work. Even if you begin with little, you can build a prosperous future. You are thoughtful and cheerful and may travel widely, but take care of your emotions and protect your peace of mind during stressful times.",
    malefic:
      "Your mother may face serious health difficulties during your early years, and financial comfort through her may remain limited. A relative may cause tension in married and family life, while your mother’s health may continue to need attention. Keeping a goat or parrot at home may increase problems related to your mother and domestic peace. Career struggles, construction or property delays, unnecessary travel, hidden opposition, or negative thinking may also cause mental stress.",
    remedies: [
      "Wear a pearl set in a silver ring.",
      "If you feel mentally disturbed or restless, wear a silver chain and a silver bracelet.",
      "For 7 consecutive Sundays, immerse 400 grams of jaggery in flowing water.",
      "Every Wednesday for one year, immerse an unbaked clay pot in flowing water.",
    ],
  },
  {
    title: "5th House - Children & Creativity",
    benefic:
      "You are likely to be intelligent and respected for your knowledge, and your words—whether blessings or criticism—can have a strong impact on others. You may succeed in government service, law, accounting, consulting, astrology, or medicine, and your spouse is likely to support you. Daughters may bring good fortune and financial growth, while your cheerful nature keeps you positive. Work connected with bamboo or advisory roles may suit you, and wearing yellow clothes is considered beneficial.",
    malefic:
      "Your career may feel unstable at times, bringing worries, rising expenses, and occasional disagreements with authority figures or children. Support from your father may be limited, and stress or nervous tension could affect your decisions, health, or education. Stay disciplined, avoid unnecessary conflicts, and manage money wisely to gradually overcome challenges and maintain harmony.",
    remedies: [
      "Wear a pierced copper coin around your neck.",
      "Get the center of your nose pierced for 6 days and wear a gold or silver wire in it. On the 7th day, remove it and immerse it in flowing water.",
      "Wear yellow undergarments.",
      "Wear a pearl set in gold on your little finger.",
    ],
  },
  {
    title: "6th House - Health & Enemies",
    benefic:
      "Your success is likely to come through honest work, intelligence, and practical thinking. Careers related to law, banking, accounting, technology, writing, printing, or beauty products may suit you especially well, while desk jobs and advisory roles are more favourable than heavy manual work. Legal matters usually work in your favour, and opportunities connected to foreign countries or overseas work can bring growth. Life may feel slightly challenging around age 34, but finances are likely to become more stable with time.",
    malefic:
      "This placement can sometimes make you overthink or feel mentally restless. There may be occasional misunderstandings with coworkers, feelings of comparison, or delays in getting the results you expect, which can make finances feel uncertain at times.",
    remedies: [
      "Have your spouse wear a silver ring on the little finger of the left hand.",
      "Show love and care toward your granddaughter, and keep giving her small gifts from time to time.",
      "Every Wednesday, offer a garland of marigold flowers at a temple.",
    ],
  },
  {
    title: "7th House - Marriage & Partnership",
    benefic:
      "You are likely to do well in business, especially work connected with trade, import-export, or practical skills. If legal matters arise, they usually turn in your favour. You are dependable, enjoy helping others, and people trust you to handle responsibilities well. Relationships with the women in your family are likely to remain supportive and positive. In later life, you are likely to enjoy greater peace, comfort, and stability.",
    malefic:
      "Life may bring challenges in family matters and finances. Tensions with relatives or concerns about your spouse’s health could disturb domestic peace, and expenses may feel heavier than income. Progress may seem slow despite your efforts, and legal or financial matters may need extra caution. Staying calm, avoiding unnecessary conflicts or debts, and focusing on balance can help.",
    remedies: [
      "Worship Lord Shiva or Mercury every Wednesday.",
      "Keep green items like cloth, vegetables, or gemstones close.",
      "Touch your mother’s or elder’s feet and seek blessings.",
    ],
  },
  {
    title: "8th House - Transformation & Longevity",
    benefic:
      "You are thoughtful and practical, and prefer to think things through before making decisions. This helps you manage family responsibilities, property matters, and shared finances with care, which can gradually lead to stability and steady financial growth.",
    malefic:
      "At times, you may feel mentally stressed or sense that others are quietly working against you. There can be occasional problems related to nerves, restlessness, or small injuries, and you may not always receive the support you expect from family or ancestral connections.",
    remedies: [
      "Wrap green moong dal in green cloth and donate it at a temple for 8 consecutive days.",
      "Water a Peepal tree near sacred places.",
      "Wear silver or keep emerald close to attract positive energy.",
    ],
  },
  {
    title: "9th House - Fortune & Spirituality",
    benefic:
      "You are likely philosophical, spiritual, and interested in learning. Travels and pilgrimages may bring knowledge and fortune. Guidance to others through teaching or counselling can bring respect and wealth.",
    malefic:
      "Ignoring duties, neglecting studies, or selfish behaviour can cause setbacks in career and relationships. Hesitation or fear of taking risks may reduce opportunities.",
    remedies: [
      "For 11 days, immerse 400 grams of rice coloured yellow with turmeric in flowing water. After that, continue this remedy every Monday.",
      "Keep a small iron ball or bearing ball painted with red nail polish in your pocket.",
      "Wear a pearl set in gold around your neck and a yellow sapphire set in silver on your hand.",
      "Avoid keeping sacred ash, talismans, Money Plant, or Rubber Plant in the house.",
    ],
  },
  {
    title: "10th House - Career & Status",
    benefic:
      "You are practical, sharp-minded, and naturally driven to do well in life. You think carefully before making decisions and usually know how to turn ideas into results. You are likely to do well in business, teaching, management, or any profession where intelligence and communication matter. You believe in working honestly and earning respect through your efforts. Staying disciplined and respecting elders, teachers, and experienced people can support steady career growth.",
    malefic:
      "If you act impulsively, ignore good advice, or take shortcuts, progress may become slower than expected. There can also be pressure from competition or misunderstandings at work, which may leave you feeling stressed or frustrated at times.",
    remedies: [
      "Feed green fodder to a cow.",
      "Avoid using the colour green as much as possible, especially in clothes and curtains.",
      "Have a bronze idol of your chosen deity made and place it in a temple or sacred place on a Wednesday.",
      "For 5 consecutive Wednesdays, donate green clothes to 5 young girls according to your capacity.",
      "For 11 days, immerse a pierced copper coin in flowing water. After that, continue this remedy every Wednesday.",
    ],
  },
  {
    title: "11th House - Gains & Friendships",
    benefic:
      "You are likely to do well in work involving business, communication, writing, teaching, or smart planning. Support from friends and elder siblings can help you move forward, and the right people in your circle may open important opportunities. Your sharp mind and practical way of thinking also help you earn respect.",
    malefic:
      "At times, you may feel that support from family or elder siblings is not as strong as you expected. Small misunderstandings with friends or coworkers can also create problems, affecting your peace of mind, finances, or reputation.",
    remedies: [
      "Keep a small bearing ball painted red with you.",
      "Do not keep sacred ash or any kind of talisman in the house.",
      "Wear a pierced copper coin around your neck.",
      "Avoid keeping Money Plant, Rubber Plant, a dholak, tabla, guitar, sitar, broken clocks, or damaged coins at home.",
      "Take care of your daughter and sister, and support them whenever possible.",
    ],
  },
  {
    title: "12th House - Liberation & Expenses",
    benefic:
      "At times, making quick decisions without thinking them through or not listening to the right people can create delays in your success. You may also face competition or small disagreements at work, which can sometimes make you feel mentally tired or under pressure.",
    malefic:
      "If family relationships become distant or you move away from your values and responsibilities, life may start to feel more difficult. There can be ups and downs in money matters, unexpected expenses, or misunderstandings that create stress.",
    remedies: [
      "Wear a copper coin with a hole in it, either in a gold chain or tied with a yellow thread.",
      "For 12 days in a row, float an empty clay pot with its lid closed in flowing water. After that, continue this remedy every Wednesday for 27 weeks.",
      "It is considered auspicious to keep a dog at home.",
      "Every day, apply a small saffron mark on your navel, tongue, and forehead. You may also use black kajal instead, but avoid applying any kind of ash.",
      "Never apply black ash on your forehead.",
    ],
  },
];

const jupiterHouseDetails = [
  {
    title: "1st House - Self & Personality",
    benefic:
      "You are naturally wise, sincere, and able to sense when someone is not being truthful. Even in difficult situations, you usually know how to respond calmly and intelligently.\n\nLearning, knowledge, and practical experience can play a major role in your success. Even if your formal education is average, this placement often gives strong common sense and the ability to build wealth, stability, and respect over time. You are likely to enjoy good health, financial independence, and comfort from an early stage of life. Property, savings, or material security may come steadily.\n\nThis placement may bring occasional disputes or legal issues, but they are likely to end in your favour. Staying connected to your father and supporting your siblings can bring extra blessings. Marriage is also likely to improve your luck, and your spouse may bring happiness, support, and prosperity.",
    malefic:
      "This position can bring delays and obstacles during every eighth year of life, such as ages 8, 16, 24, or 32. If education is incomplete or inconsistent, you may still become practical and intelligent, but financial growth can feel slower. There may also be occasional disputes, legal matters, or family pressures. At times, pride may make it difficult to ask for help even when you need support. Marriage and children may come with delays, especially after the first few years of married life.",
    remedies: [
      "Whenever you get the chance, offer yellow clothes and food to a wandering saint or holy person.",
      "Apply a saffron tilak every day—first on the navel, then on the tongue, and finally on the forehead.",
      "Keep silver coins in your locker or safe.",
      "Respect your family priest or the elderly priest of a temple. Seek their blessings regularly by touching their feet.",
      "Try to keep items like milk, rice, silver, or holy water from the Ganges in the house.",
    ],
  },
  {
    title: "2nd House - Wealth & Family",
    benefic:
      "This placement may bring some financial or family struggles early in life, but it also gives strong chances for success later on. Even if your education is incomplete, your luck remains strong. The work or skills you develop between the ages of 23 and 27 can become the reason for your success, and by 33 you are likely to master your field. You do especially well when you share your knowledge through teaching, guidance, spirituality, or astrology. With time, this can bring respect, money, and a more comfortable life. You may also benefit from old property, inherited assets, or work connected to beauty, soil, or creative fields.",
    malefic:
      "Even after achieving success, you may still feel unhappy with family life, expenses, or peace at home. This placement works best when you use your knowledge to guide or help others; otherwise, you may struggle to find lasting satisfaction or recognition. Family worries and financial pressure can stay with you for a long time, and at times your own decisions may create problems in your personal life. You may also stay away from formal religious practices, even though your faith remains strong within.",
    remedies: [
      "Keeping Jupiter-related items such as split Bengal gram (chana dal), yellow cotton clothes, or gold in the house can be beneficial.",
      "Offer milk at the root of a banana tree for 27 consecutive days.",
      "Tie 200 grams of split Bengal gram in a yellow cotton cloth and give it to an elderly priest at a temple, then take his blessings.",
    ],
  },
  {
    title: "3rd House - Courage & Siblings",
    benefic:
      "This placement makes you responsible, practical, and supportive. Between ages 16 and 20, siblings may play an important role in your success. Family support can bring travel, pilgrimages, and good opportunities. You are likely to receive help from your spouse’s family as well, especially from your spouse’s brothers. A stable job and work related to education can bring long-term financial security. Your children are also likely to be supportive and caring in your later years.",
    malefic:
      "This placement can make you deeply emotional. You give your all to people you care about, but when hurt, you may hold on to the pain for too long. Relying too much on family can also create pressure and make it harder to make your own decisions.",
    remedies: [
      "Whenever you get the opportunity, perform Kanya Pujan and worship Goddess Durga.",
      "Offer water mixed with turmeric to a banana tree every Thursday.",
      "Respect and seek the blessings of elderly teachers, priests, or spiritual guides whenever possible.",
    ],
  },
  {
    title: "4th House - Home & Mother",
    benefic:
      "This placement makes you strong, independent, and determined. You prefer to rely on yourself, and even after facing many challenges, you keep moving forward with courage.",
    malefic:
      "At times, this placement can make a person overly proud or stubborn, which may create tension within the family. Comfort at home may feel limited, and there can be situations where you have to live away from your own house. Support from parents or ancestral property may also be less than expected. Financial stability can feel difficult despite hard work, as money may come but not stay for long. There may also be restlessness of mind, occasional eye-related issues, and the possibility of health problems or accidents if proper care is not taken. Family life, especially for the mother, may sometimes go through periods of emotional stress.",
    remedies: [
      "Respect and care for your mother.",
      "Donate milk, rice, or yellow items to the needy.",
      "Keep the home clean and peaceful.",
      "Worship Lord Vishnu or Brihaspati on Thursdays.",
      "Avoid hurting the feelings of family members.",
    ],
  },
  {
    title: "5th House - Children & Creativity",
    benefic:
      "This placement makes you ambitious and eager to move ahead in life. When you stay disciplined and trust yourself, you can overcome problems and create a stable, successful future.",
    malefic:
      "If you do not maintain self-control, this placement can make you short-tempered and impulsive, which may spoil work just when it is about to succeed. Depending too much on free help or support from others can bring major ups and downs in life. It may also create problems in family life, reduce happiness from children, and bring dissatisfaction in old age. There can be difficulties in studies, and at times you may struggle to do things the way others expect. A strong desire to earn money quickly may lead to losses. Family arguments, especially over money or financial gains, are also possible.",
    remedies: [
      "Whenever possible, help clean a place of worship. It is especially beneficial if you can do this continuously for 27 or 43 days.",
      "As far as possible, keep your head covered with a white cap, turban, or cloth.",
      "Worshipping Lord Ganesha can also bring positive results.",
      "Take care of dogs or keep feeding them regularly.",
      "Respect and serve your teachers and spiritual guides.",
    ],
  },
  {
    title: "6th House - Health & Enemies",
    benefic:
      "This placement gives you a deep spiritual side and interest in meditation or religion. Life may swing between extremes of wealth and struggle, but staying practical and avoiding jealousy can bring financial stability after age 34.",
    malefic:
      "If you get too absorbed in spiritual thoughts or rituals, it may affect your success and material life. Relationships with your father or elders might be distant, and up to age 34, challenges in work, family, money, and property are possible. Jealousy, unnecessary spending, and unhealthy habits can add difficulties, and finances may swing between extremes, rarely staying balanced.",
    remedies: [
      "Keep a black or white dog at home.",
      "Wear gold on your body.",
      "Every Thursday for one year, feed red lentils (masoor dal) to a yellow-coloured rooster.",
      "Serve elderly people and senior Brahmins.",
      "Continue helping your son-in-law and younger nephews.",
    ],
  },
  {
    title: "7th House - Marriage & Partnership",
    benefic:
      "You are likely to lead responsibly at home and earn well, though extreme rituals or ascetic habits may limit comfort. Travel brings gains, and gifts or property from in-laws can support growth. Some delays in family happiness may occur until ages 34 to 45, but you are likely to stay debt-free.",
    malefic:
      "You may feel disappointed with your brothers, as they are unlikely to support you and may even take advantage. You are generous and take on family burdens, but often cannot enjoy your own earnings. Excessive rituals, hosting saints, or donating clothes may worsen financial struggles. Your spouse and children may act independently, and issues related to children can arise. Happiness from your father, children, or family may be limited, sometimes pushing you to travel far from home. Bathing in rainwater is traditionally believed to reduce misfortune, but keeping a temple at home or taking in a child may bring difficulties. Around age 34, domestic comfort, your son’s happiness, and wealth may be limited.",
    remedies: [
      "Worship Lord Shiva regularly.",
      "Touch your mother’s feet daily and receive her blessings.",
      "Keep seven yellow beads and a small square piece of gold wrapped in a red cotton cloth with you.",
      "Every Thursday, offer rice and chana dal in a small copper pot at a temple.",
      "Bathing in rain or standing water whenever possible is traditionally believed to bring blessings.",
    ],
  },
  {
    title: "8th House - Transformation & Longevity",
    benefic:
      "You are calm, intelligent, and caring, and you usually handle family responsibilities with patience. Marriage can bring a rise in fortune, along with respect, support, and a more stable life. You are also likely to enjoy good health, family comfort, and help from ancestral property, while your practical wisdom helps you support others and live with dignity.",
    malefic:
      "If your grandfather or ancestors are absent, some protection may lessen. You might face heavy responsibilities or minor hardships, but serious dangers are unlikely, though family pressures can feel challenging at times.",
    remedies: [
      "Wear a gold chain or a yellow thread around your neck.",
      "For 8 consecutive days, offer 800 grams of split Bengal gram (chana dal) at a temple.",
      "Plant a Peepal tree at a cremation ground.",
      "For 8 consecutive days, offer 8 turmeric roots at a temple.",
      "Wrap 8 raw threads dyed yellow with turmeric around the trunk of a Peepal tree every Thursday.",
    ],
  },
  {
    title: "9th House - Fortune & Spirituality",
    benefic:
      "You are likely to be devoted, charitable, and guided by strong principles. Pilgrimages with your parents can bring joy, and staying true to your word may protect you from financial loss. From around age 16, your family may start experiencing growth and respect. Careers in gold, trade, gas-related businesses, or educational institutions can bring fortune. You may live at least 75 years, with financial stability and the ability to support your faith and values throughout life.",
    malefic:
      "Your finances may be unstable, but you are likely to take responsibility for your family. If you act selfishly or neglect your duties, it could lead to serious setbacks. Losing faith or ignoring moral values may bring health and child-related difficulties, strained relations with your father, and limited success. Hesitation to share, stubbornness, and neglecting spiritual practices can cause family tension, increased expenses, and emotional strain. Over time, these habits may lead to financial losses.",
    remedies: [
      "Whenever possible, visit sacred places to serve your family priest and elderly individuals, and seek their blessings.",
      "Feed cows regularly, even if just once a day, to invite prosperity and remove obstacles.",
      "Offer yellow lentils (chana dal) in a temple for 11 consecutive Thursdays to enhance luck and stability.",
      "Keep a small gold item or a yellow thread close to you to attract wealth and protect against financial difficulties.",
    ],
  },
  {
    title: "10th House - Career & Status",
    benefic:
      "Despite challenges, you remain intelligent and morally strong. Your kind, righteous nature and ambitious vision help you aim higher. By living ethically and respecting elders and teachers, you can navigate obstacles and gradually bring stability to your work and family life. Even in hardship, your moral sense provides a foundation to recover and grow.",
    malefic:
      "Going against family values or elders can make you restless and irritable. Greed, poor choices, or excessive rituals without understanding may bring repeated setbacks, financial struggles, and disappointments at home. Associating with the wrong people, indulgence in pleasures, or unethical relationships—especially between ages 27 and 36—can worsen matters. Disrespecting teachers or holding negativity may affect your or your family’s health, while travel or careless actions could bring minor mishaps. Overindulgence in meat, alcohol, or immoral acts may harm your reputation and stability.",
    remedies: [
      "Every Sunday, offer 400 grams or 4 kilograms of jaggery or wheat into flowing water.",
      "During a solar eclipse, donate almonds, coconut, urad dal, and oil.",
      "Never remain bareheaded.",
      "Perform a flow of sulfur water.",
      "Keep your nose clean.",
    ],
  },
  {
    title: "11th House - Gains & Friendships",
    benefic:
      "As long as your father is alive, you may receive support from others. Work related to fire or gold jewellery may suit you, and your brother may play an important role in your success. Staying connected with family and society, supporting others, and not abandoning loved ones can help you thrive.\n\nYou are likely to be educated, respected, fortunate, and enjoy family comforts and children. Your health and body may be strong, and your family financially stable, especially if you maintain good relationships with siblings. Showing respect to your brothers after your father’s passing, helping the needy, and avoiding vices like gambling or alcohol are traditionally considered positive; an elder brother’s support may further enhance growth and fortune.",
    malefic:
      "Even if your family is financially stable, you may struggle to find happiness. Education may not hold your interest, and female relatives like your sister and aunt could face difficulties. Going against family values can bring challenges in work, finances, children, and household peace, along with increasing debts. Your spouse may feel stressed by your behaviour, and support from others may be limited after your father’s passing. Hard work will be necessary to sustain yourself. Work involving fire or gold may suit you, but immoral habits, indulgence in vices, or bad associations can harm your reputation. Family members, especially daughters, sisters, and aunts, may face hardships, while your own efforts can still succeed despite obstacles.",
    remedies: [
      "Whenever possible, donate a shroud.",
      "Wear a copper bracelet on your wrist.",
      "Feed birds or stray animals regularly to invite positive energy.",
      "Offer a small amount of food or grains at a temple or sacred place every week to attract blessings and reduce obstacles.",
    ],
  },
  {
    title: "12th House - Liberation & Expenses",
    benefic:
      "If you help others, your luck may grow steadily. Faith, dharma, and regular worship can boost your fortune, and wealth may come naturally without chasing it. Avoid revenge; meditation and focus can support prosperity. You are naturally generous and disciplined, supporting family and good causes with your time and resources. Clever and wise from a young age, you handle responsibilities well. Business in grains or trade may benefit you, and charity is traditionally believed to bring positive results. Favourable planetary influences, like Rahu, may further enhance success.",
    malefic:
      "Even with a well-off family, you may feel unhappy and struggle to focus on education. Relationships with your father, sister, and aunt could be strained, so maintaining good character is important to avoid hardships at work and home.\n\nGoing against dharma or family values may lead to financial and personal difficulties as you age, including trouble with children, debts, and an unhappy spouse. After your father passes, support may be limited, requiring hard work to sustain yourself. Careers related to fire or rolled gold may suit you. Indulging in immoral habits or bad company can harm your reputation and bring risks. Family members like your sister, aunt, and daughter may face struggles, though your own efforts can continue to bear results.",
    remedies: [
      "Water a Peepal tree every day.",
      "Respect and serve your father, maintaining harmony in your relationship.",
      "Serve elders, saints, and family priests, and seek their blessings by touching their feet.",
      "Wear a gold chain around your neck.",
    ],
  },
];

const venusHouseDetails = [
  {
    title: "1st House - Self & Personality",
    benefic:
      "You may naturally love music and have a mood-based personality—warm, generous, and fun when you feel connected, but distant and firm when you do not. You are intelligent, quick-minded, and capable of doing well in studies and work, though success may come after career ups and downs. You may have attractive eyes, youthful charm, and a strong presence. Marriage can become an important turning point, bringing growth and some challenges in health or family life. To stay happy and successful, avoid unnecessary family politics, stay grounded in your values, and maintain an honest character. Venus is traditionally associated with comfort, luxury, and a peaceful life.",
    malefic:
      "A flirtatious or careless approach to relationships may create pain and family tension. You may give more support to your partner and siblings than you receive, and career or financial success could come with delays. After marriage, there may be stress related to health, your partner’s mood, or family life. Stay honest, avoid addictions, and keep away from family politics. Living separately from a joint family may bring more peace and stability. Traditional Lal Kitab considers silver received from your spouse’s family at marriage an auspicious sign for a happy home.",
    remedies: [
      "One partner should stop eating jaggery.",
      "Avoid intimacy during the daytime.",
      "Bathe with curd for 43 days, then continue doing it every Friday.",
      "Serve and care for a black cow.",
    ],
  },
  {
    title: "2nd House - Wealth & Family",
    benefic:
      "You are likely to do well through work connected to land, cattle, or dairy. Your clever mind and calm way of speaking help you handle problems and bring steady success over time. Family life may have small ups and downs, but there can be comfort and support at home. Your bond with your spouse is strong, and staying honest and simple in your actions may bring lasting prosperity. Wearing white or staying connected to earth-related work may also bring luck.",
    malefic:
      "There may be occasional health concerns or small disagreements at home. Overthinking or making too many plans can sometimes slow your progress. Staying flexible, open, and emotionally connected can help keep your personal life and career balanced.",
    remedies: [
      "For 27 days, feed 2 kg of raw potatoes coloured yellow with turmeric to a black cow.",
      "Every Friday, offer 200 grams of yellow cow ghee, or perfume and camphor, at a temple.",
    ],
  },
  {
    title: "3rd House - Courage & Siblings",
    benefic:
      "You have a natural charm that draws people to you, and the respect you show your partner is considered important to your luck. Your spouse may be a strong protector while remaining gentle and devoted. You are affectionate, cherish your parents, and value your romantic ties. You stand by loved ones with dignity. Your presence may bring good fortune to the men in your family, and after age 34 you may find yourself steadily moving toward success.",
    malefic:
      "Your wealth may feel closely tied to the women in your life. A fiery relationship or outside flings may drain finances, while support from your mother or grandmother may feel stabilizing. Building a house from scratch or taking on too many side projects may bring difficulties. Consider practical choices and the support of trusted elders.",
    remedies: [
      "Show respect and support to younger sisters-in-law.",
      "For 11 days, offer curd in a bronze vessel at a temple. After that, continue every Friday for 27 weeks.",
      "Drink pomegranate juice and offer some at the temple as well.",
    ],
  },
  {
    title: "4th House - Home & Mother",
    benefic:
      "You may be naturally gifted with wealth, a sharp mind, and a love for life’s comforts. A traditional remarriage ritual with your spouse is believed to settle domestic energy and honour your mother’s influence. Roles involving travel may suit you, as movement is traditionally associated with prosperity in this placement. Staying honest, keeping your home’s entrance clean, and protecting old wells on your property are also described as supportive.",
    malefic:
      "Neglecting your home’s entrance or digging a well is traditionally considered unfavourable for finances and extended family well-being. A career involving regular travel may suit this placement; stagnation or outside romances may create professional and family strain. If domestic friction or health issues arise, seek appropriate practical support alongside any personal or spiritual practices.",
    remedies: [
      "Bring soil from a pond or lake and spread it over a 3×3 foot area on your roof. Make a small mound in the centre, create a hole in it, and bury a silver container filled with honey there.",
      "Donate curd whenever possible.",
    ],
  },
  {
    title: "5th House - Children & Creativity",
    benefic:
      "You may be patriotic, intelligent, and drawn to a comfortable life filled with family joy, spiritual wisdom, and respect for your roots. Prosperity is traditionally said to increase five years after marriage, especially if you embrace a disciplined lifestyle and explore brick-making or metal-related ventures. Staying true to your values and avoiding fleeting distractions can support comfort, professional growth, and community contribution.",
    malefic:
      "Infidelity or chasing fleeting attractions may harm your relationships and family stability. Loyalty and thoughtful choices can help protect your peace and prosperity.",
    remedies: [
      "Serve cows and mother-like women.",
      "Every Friday, donate 500 grams of flour at a religious place.",
    ],
  },
  {
    title: "6th House - Health & Enemies",
    benefic:
      "Your success may flow from integrity, sound advice, and a sharp, intuitive mind. Treating your spouse with respect and choosing career paths involving government connections or specialised markets may support a life of health, status, and abundance.",
    malefic:
      "Trying to control everything or taking the wrong path may bring outward success while creating stress and distance in relationships. Future happiness is closely connected to how you care for your children and family today. Staying responsible, avoiding risky habits, and not overextending yourself for the wrong people may support later peace and stability.",
    remedies: [
      "Keep a small silver ball with you.",
      "Your spouse should avoid walking barefoot and wear socks instead.",
      "Feed grains to birds.",
      "For 6 days, donate curd in a bronze bowl, then continue every Friday for 27 weeks.",
      "Every Thursday, donate split chickpeas at a temple.",
    ],
  },
  {
    title: "7th House - Marriage & Partnership",
    benefic:
      "Your fortune may thrive through travel, artistic interests, and a partner who brings stability, especially if you marry after age 25. You have a deep capacity for love and a destiny traditionally linked to international success. Becoming more disciplined may support financial growth. Career paths such as events, agriculture, or foreign trade, alongside loyalty, may support a prosperous life for you and your parents.",
    malefic:
      "Avoiding business ventures with your spouse’s siblings and taking care with work in fashion, luxury goods, or cattle are traditional cautions for this placement. Marrying before 25 or letting ego lead may contribute to health issues and domestic tension. Keep personal matters private; infidelity or storing charms in leather wallets is traditionally considered unfavourable.",
    remedies: [
      "For 11 days, offer curd in a bronze bowl at a temple, then continue every Friday.",
      "Serve and care for a black cow, but avoid keeping or serving a red one.",
      "Donate red sorghum equal to your spouse’s weight at a temple.",
      "For 27 days, place 6 blue flowers into a dirty drain or flowing wastewater.",
      "Every Friday, donate a bronze utensil at a temple.",
    ],
  },
  {
    title: "8th House - Transformation & Longevity",
    benefic:
      "You may be resilient and suited to disciplined roles such as military service. Marrying after 25 and maintaining integrity are traditionally associated with happiness in this placement. Your spouse’s intuition may help guide family decisions. Staying close to siblings and honouring your mother’s blessings may support health, an extended family, and a legacy for your children.",
    malefic:
      "Reckless impulses, infidelity, or dishonesty may lead to financial, project, or health difficulties. Taking oaths, giving guarantees, or living near a cemetery are traditionally considered unfavourable. Caring daily for a horned, non-white cow is a traditional remedy. Maintain loyalty and be cautious about accepting charity.",
    remedies: [
      "Every month, offer zari or sorghum equal to your body weight to cows at a temple or cow shelter.",
      "Drop a copper coin into a drain for 8 days, then continue every Friday. Do not enter or handle waste water directly.",
      "Feed jaggery to a black cow whenever possible.",
      "Avoid serving or keeping white and red cows.",
      "For better luck, feed a cow a flour ball filled with jaggery every Friday.",
    ],
  },
  {
    title: "9th House - Fortune & Spirituality",
    benefic:
      "You have a practical, business-minded nature and may do well in trade, consulting, or work connected with communication or food. Changes in your home or living space may bring opportunities. Marriage and spiritual travel can become turning points, bringing greater stability, health, and happiness to family life.",
    malefic:
      "You may sometimes feel torn between financial stability and relationship happiness. Old family patterns can create extra pressure, so practical choices and patience can help you build a more peaceful, secure life.",
    remedies: [
      "Offer water to the rising Sun every morning and apply a saffron or sandalwood tilak on the forehead.",
      "Bury a silver container filled with honey in the foundation of your house.",
      "For 43 days, bury small square pieces of silver near a neem tree.",
      "Serve and care for a spotted cow.",
    ],
  },
  {
    title: "10th House - Career & Status",
    benefic:
      "Your intelligence and charm may help you do well in creative work, competition, and business. Support from family and your partner can bring comfort, respect, and financial stability. Staying honest and balanced may help you enjoy a peaceful, successful life.",
    malefic:
      "Impulsive choices in love or relationships may create problems in health and family life. Staying loyal, patient, and emotionally balanced can help protect your peace and support a more stable future.",
    remedies: [
      "Leave a small patch of bare earth in the western part of your home and stand there for 5–10 minutes daily.",
      "Plant jasmine or mogra in the western area of the house.",
      "Offer patisa sweets to newly married women.",
      "For any infection, seek care from a qualified healthcare professional rather than applying curd to the affected area.",
      "For 43 days, donate cow ghee, curd, and cotton at a temple according to your capacity.",
    ],
  },
  {
    title: "11th House - Gains & Friendships",
    benefic:
      "Your charm and intelligence may bring success in creative work and business. A supportive partner and comfortable life are likely, but staying humble and avoiding overthinking matter. Practical choices and steady effort can help build lasting family support, wealth, and peace.",
    malefic:
      "Alcohol and south-facing homes are traditionally described as unfavourable for health and finances in this placement. The supplied tradition also advises against building a house with your own earnings before age 45 or distancing yourself from family. Staying grounded and maintaining integrity are emphasised.",
    remedies: [
      "For 43 days, donate cow ghee and cotton at a temple.",
      "Every Saturday, look at your reflection in mustard oil and then donate it.",
      "If you have fertility concerns, consult a qualified healthcare professional for advice.",
      "Donate a cow at the time of marriage if possible.",
      "The traditional heated-gold-needle-in-milk practice is omitted because ingesting milk after contact with a heated metal needle may be unsafe.",
    ],
  },
  {
    title: "12th House - Liberation & Expenses",
    benefic:
      "You may be naturally built for leadership and a long, comfortable life, thriving when supporting the less fortunate or serving in government roles. Success is traditionally linked to your spouse’s well-being and dedication to helping others. Staying grounded, caring for animals, and focusing on family responsibilities may support a legacy of respect and prosperity.",
    malefic:
      "Overindulging in distractions may weaken family bonds and affect your children’s future. Staying balanced and avoiding self-destructive habits are emphasised in this placement. Focus on grounded, practical choices to turn present comfort into lasting stability for those you love.",
    remedies: [
      "Feed a cow with wheat, jaggery, or green fodder regularly.",
      "Donate white items such as rice, milk, or white clothes to the needy on Fridays.",
      "Keep a small silver piece or square silver with you.",
      "Avoid arguments, ego clashes, or unnecessary spending, especially on luxuries.",
      "Respect spiritual places, meditate, or practice charity to calm the mind and reduce stress.",
    ],
  },
];

const saturnHouseDetails = [
  {
    title: "1st House - Self & Personality",
    benefic:
      "A quiet, private home and keeping finances in a secure, low-light place are traditional Saturn associations. You may have a sharp mind and the potential to build lasting prosperity through discipline. Alcohol or legal disputes are traditionally considered possible sources of setbacks, so patience, practical decisions, and a calm living space are encouraged.",
    malefic:
      "A quick temper or changing jobs too often may affect financial stability. The traditional guidance advises avoiding alcohol and meat and exercising patience through your late 30s and 40s. It also suggests waiting until after age 52 to build a house; consider major property decisions based on your circumstances and qualified advice rather than astrology alone.",
    remedies: [
      "If you often have disagreements with your father or brother, face repeated trouble at work, or keep losing money, feed monkeys for 11 days and then continue every Tuesday.",
      "Donate an iron griddle, tongs, and a small stove once every year.",
      "The traditional practice of burying kohl or salt is omitted; choose a safe, lawful charity or donation instead.",
    ],
  },
  {
    title: "2nd House - Wealth & Family",
    benefic:
      "You may be a natural leader with a sharp mind for business and a spiritual side that keeps you grounded. Strategic thinking may support financial security, especially in work with grains or spices. Traditional suggestions include using a red or yellow vehicle and a daily milk or curd tilak to balance ambition with a stable home life.",
    malefic:
      "Saving may feel difficult if expenses tend to catch up with income. Traditional guidance cautions against black or black-and-white vehicles and pets. Generosity, measured habits, and a practical budget can help support peace at home and financial stability.",
    remedies: [
      "Apply a tilak of milk, curd, or pure ghee on your forehead every day.",
      "Use coconut oil on your face instead of creams if it suits your skin.",
      "Avoid applying mustard oil to your body or hair if it irritates your skin.",
    ],
  },
  {
    title: "3rd House - Courage & Siblings",
    benefic:
      "You may have a knack for deep, technical work such as engineering or medicine and may acquire property, though high spending can sometimes leave you short on cash. A traditional suggestion is to keep savings in a secure, dimly lit place to the right of the front door. Trust your instincts, consider opportunities from the West, and turn ideas into practical plans.",
    malefic:
      "The same traditional reading describes technical strengths and property potential, alongside a tendency to spend heavily and feel short on cash. Organising savings, trusting your judgement, and taking practical steps toward opportunities may help create more stability.",
    remedies: [
      "Avoid living in a house that faces south, east, or southeast, if this is a practical choice for you.",
      "Donate eye medicines only through a registered charitable clinic or medical centre, following its accepted donation process.",
    ],
  },
  {
    title: "4th House - Home & Mother",
    benefic:
      "You may travel often and find opportunities through travel. Property, a happy home, and careers such as medicine or construction materials are traditional themes for this placement. With maturity, you may become respected and spiritually inclined. Keeping your word and enjoying music can help you feel balanced as you work toward success.",
    malefic:
      "Travel and work in fields such as medicine or construction may be recurring themes. The traditional description also associates maturity, spirituality, keeping promises, and an interest in music with a more balanced life.",
    remedies: [
      "For 43 days, offer milk and rice through an appropriate water-harvesting or community donation programme; do not put food into public drainage systems.",
      "Avoid offerings of alcohol at temples; make a lawful, non-alcoholic donation if you wish to give.",
      "Keep Ganga water in a clean silver plate or silver vessel at home.",
      "Carry a small silver square in your pocket.",
      "Avoid laying a house foundation after sunset if that is part of your chosen tradition.",
    ],
  },
  {
    title: "5th House - Children & Creativity",
    benefic:
      "You may appear unassuming while being sharp about your goals. A solid foundation and respect for tradition may help you secure family inheritance. Honesty, avoiding shortcuts, and staying flexible can help you turn your potential into practical success.",
    malefic:
      "The traditional reading warns of possible financial and health difficulties and advises honesty, humility, and care in family relationships. Major construction or renovation decisions should be based on practical, professional advice rather than predictions of harm to relatives.",
    remedies: [
      "Feed monkeys with roasted gram where this is permitted and safe.",
      "Avoid hurting children or making promises you cannot keep.",
      "Donate black clothes on Saturdays.",
      "Light a mustard oil lamp under a Peepal tree only where permitted and safe; never leave an unattended flame.",
    ],
  },
  {
    title: "6th House - Health & Enemies",
    benefic:
      "This placement is traditionally associated with learning, family happiness, and roles involving law, justice, or investigation. Night work may suit some people. The reading advises patience through difficult periods and describes prosperity as something that can develop steadily over time.",
    malefic:
      "The traditional account raises concerns about early marriage, family stress, and keeping business matters private. It also refers to children’s health or development; these are not omens or measures of luck. Any health or developmental concern should be discussed with a qualified professional, and family or financial choices should not be based on predictions of harm.",
    remedies: [
      "Consider a night schedule only if it suits your health, responsibilities, and work requirements.",
      "Starting a project during the dark phase of the moon is a traditional timing preference, not a requirement for success.",
      "Worship the Black Goddess and offer sweets to people who welcome them.",
      "For six Saturdays, donate six whole almonds through a suitable food or charity programme; do not leave food in standing water.",
      "Care for a black dog responsibly, including its health and welfare.",
    ],
  },
  {
    title: "7th House - Marriage & Partnership",
    benefic:
      "You may have a gift for strategy and persuasion, supporting careers such as medicine, engineering, or consulting. The traditional reading links luck with caring for the home’s main entrance and maintaining a loyal, supportive marriage. Travel and earnings may feature in life; moderation and principled choices can support family well-being.",
    malefic:
      "Ego and cutting corners may create difficulties. The traditional reading advises against marrying very young and stresses loyalty, professionalism, and caution with business partnerships involving relatives. Keeping the home’s front door in good repair is described as a practical symbol of stability.",
    remedies: [
      "Apply white kohl (surma) only if it is a regulated product intended for use around the eyes and is safe for you.",
      "Serve and care for a black cow through a responsible, reputable shelter.",
    ],
  },
  {
    title: "8th House - Transformation & Longevity",
    benefic:
      "Collaborating on studies may bring breakthroughs and personal growth. Curiosity and a desire to help others are described as strengths. The traditional reading associates family growth with your arrival and suggests that continued learning can help maintain momentum.",
    malefic:
      "The traditional reading connects luck and health with the home environment and personal conduct. It suggests clearing stored fuel, oil, rusted iron, or wood from the roof, avoiding major construction during a partner’s pregnancy, and reducing suspicion or conflict with family. Keep the home safe and well maintained.",
    remedies: [
      "Do not put large quantities of food, oil, or other materials into waterways; choose a local donation or waste-disposal programme instead.",
      "Keep a small square piece of silver with you.",
      "On 8 consecutive Mondays, donate rice and milk through a local food charity rather than releasing them into flowing water.",
      "If you add milk to bath water, use a non-slip surface and stop if it irritates your skin.",
    ],
  },
  {
    title: "9th House - Fortune & Spirituality",
    benefic:
      "Your talent for persuasion and commitment to family may support a high-ranking career, particularly in real estate, contracting, or timber. You may own multiple homes and gain financial independence, though progress can be gradual. Keeping the roof clear of scrap and avoiding unfinished roofless walls are traditional suggestions. Staying connected to family and managing your temper may support a happier home life.",
    malefic:
      "Traditional guidance links well-being with maintaining a safe, clean roof and avoiding construction projects that create financial or legal strain. Stay humble, avoid family conflicts, and take care of your health and reputation.",
    remedies: [
      "Visit a temple and offer sweets such as mishri, patashe, khoya treats, or sweet puffed grains, if accepted there.",
      "Keep your roof clear of wood, iron scraps, or junk, and avoid earning through dishonest means.",
      "Sprinkle chickpeas on your roof only if it is safe and will not attract pests or create litter; otherwise donate them as food.",
      "Avoid breaking walls or adding windows or doors without appropriate building advice and permits.",
    ],
  },
  {
    title: "10th House - Career & Status",
    benefic:
      "You may gain respect and wealth through engineering, machinery, or leadership. The traditional reading highlights ages 33, 39, 45, and 57 as notable milestones, and associates building a home before age 48 with good fortune. Practical kindness, sound decisions, and family connections may support your status and career growth.",
    malefic:
      "The traditional reading cautions that being overly soft-hearted or relying only on rituals may distract from practical financial decisions. It suggests choosing work that suits your needs, maintaining a good relationship with your father, avoiding daytime drinking, and planning home construction thoughtfully. Career and property decisions should reflect your actual circumstances.",
    remedies: [
      "Wear gold if suitable for you.",
      "Apply a saffron tilak daily on your navel, tongue, and forehead only if it is safe for your skin and use.",
      "Donate Saturn-associated items such as mustard oil, iron, or black lentils through an appropriate charity or temple.",
      "Respect and support your elders and teachers regularly.",
    ],
  },
  {
    title: "11th House - Gains & Friendships",
    benefic:
      "Your sharp mind may help you outpace competitors. Practical confidence and initiative may support wealth, family property, and a comfortable lifestyle. Being clever and bold while acting responsibly can help turn potential into progress.",
    malefic:
      "The traditional reading warns against major home-building decisions before age 45 or a south-facing entrance, and associates these with family, health, and financial strain. Body hair is not a reliable indicator of wealth. Avoid alcohol and infidelity, and seek practical advice for education, family, and career challenges.",
    remedies: [
      "Keep a clean water pot at home, use it regularly, and keep it filled with fresh water.",
      "Carry a small silver square in your pocket.",
      "Display a Jupiter-associated charm in your home if it is meaningful to you.",
      "Wear gold if suitable for you.",
      "Share sweets every Tuesday.",
    ],
  },
  {
    title: "12th House - Liberation & Expenses",
    benefic:
      "A calm, comfortable home and an organised place for finances are traditional themes for this placement. Staying alert, avoiding conflict, and making thoughtful choices may help your business and family life. Hair thinning is not a reliable sign of family prosperity; focus on practical care and support.",
    malefic:
      "The traditional reading cautions against dishonesty, infidelity, gossip, alcohol, and legal disputes, and describes a dimly lit home as a preference. Make financial and health decisions using practical evidence and qualified advice rather than fear of omens.",
    remedies: [
      "Keep a secure storage space in the southeast or southwest of your home and store whole almonds in an iron box there if safe and practical.",
      "Every Saturday, donate almond pieces through an appropriate food or animal-welfare programme; do not put food into public waterways.",
      "Continue home-building or repair plans according to qualified professional advice and your circumstances.",
      "Visit a temple barefoot only if the grounds are safe and accessible; otherwise follow the temple’s guidance.",
    ],
  },
];

const rahuHouseDetails = [
  {
    title: "1st House - Self & Personality",
    benefic:
      "Trusting your intuition and making independent decisions may support social confidence and valuable connections. The traditional reading associates this placement with sudden opportunities, improved family comforts, and joyful news about children. It advises thoughtful choices in business, especially when working with electronics or in-laws.",
    malefic:
      "Restless thoughts or mental turbulence may affect behaviour and relationships. The traditional reading advises moderation and avoiding alcohol, and describes work changes or family challenges as possible themes. These are not predictions; focus on wellbeing, communication, and practical support when challenges arise.",
    remedies: [
      "If practical, consider your preferences for home orientation when choosing a residence; do not make major housing decisions based on fear of direction.",
      "Wear a square silver piece or silver chain if comfortable.",
      "Donate roasted wheat with jaggery through a school or community programme.",
      "Choose colours that you enjoy; colour choices do not determine your luck.",
      "Avoid arguments when anyone has been drinking; discuss important matters when everyone is sober.",
    ],
  },
  {
    title: "2nd House - Wealth & Family",
    benefic:
      "The traditional reading associates this placement with ambition, material comfort, and spiritual or charitable connections. Financial circumstances may fluctuate, and planning large expenses carefully can help maintain stability.",
    malefic:
      "The source text describes family and financial instability, legal stress, and difficult life periods as possible traditional interpretations. These are not certainties or predictions of imprisonment. Make kitchen, property, and financial decisions using practical, legal, and professional advice.",
    remedies: [
      "Keep northwest, north, or west areas of your home clear and safe, following applicable building and fire-safety guidance.",
      "Keep saffron in a clean silver box if you wish, and use a saffron tilak only if it is suitable for your skin.",
      "A blue sapphire requires professional gem advice; do not wear one solely on the basis of a general remedy.",
      "Visit a temple, make an appropriate donation, and receive blessings if meaningful to you.",
      "Carry a small silver pellet if comfortable.",
    ],
  },
  {
    title: "3rd House - Courage & Siblings",
    benefic:
      "This placement is traditionally associated with wealth, progress, sharp intuition, and vivid dreams. The reading highlights age 22 as a possible turning point and encourages care with speech to avoid misunderstandings. Courage and quick thinking may help you work through competition and pursue leadership.",
    malefic:
      "Strained relationships with relatives or rivals may create stress, including financial or property concerns. The source text mentions ivory as an object to remove; never keep or acquire ivory. Choose a lawful symbolic alternative such as a white-coloured ornament.",
    remedies: [
      "Do not keep or wear elephant tusks or ivory, including ornaments; use a lawful symbolic alternative if desired.",
      "A copper ring with coral is a traditional suggestion; seek qualified advice before wearing gemstones.",
    ],
  },
  {
    title: "4th House - Home & Mother",
    benefic:
      "The traditional reading associates this placement with wisdom, spirituality, travel, and a harmonious home. It suggests that financial progress may begin after age 24, with rewards increasing later. Keep home renovations planned and safe, and maintain a clean, comfortable environment for the whole family.",
    malefic:
      "The source text links certain home renovations with family or financial difficulties. These are traditional beliefs, not established predictions. Plan bathroom, roof, furnace, and other work according to building codes, household needs, and qualified professional advice.",
    remedies: [
      "If a roof-only structure is causing concern, consult a qualified astrologer or faith leader if you want a cultural ritual; no ritual is required for construction safety.",
      "Make furnace, tandoor, heater, and cooking-area decisions based on fire safety and professional guidance.",
      "A pearl necklace is a traditional suggestion; seek qualified advice before wearing gemstones.",
    ],
  },
  {
    title: "5th House - Children & Creativity",
    benefic:
      "This placement is traditionally associated with kindness, spirituality, social respect, and family happiness. It is described as favourable for children and material comfort.",
    malefic:
      "The supplied tradition describes this placement as generally favourable and advises avoiding pride, overconfidence, and excessive attachment. These are reflective themes, not fixed outcomes.",
    remedies: [
      "Place a silver strip at the entrance threshold only if it can be installed safely and without creating a trip hazard.",
      "Serve and care for cows through a responsible shelter or animal-welfare organisation.",
      "Avoid alcohol or other habits if they negatively affect your wellbeing or relationships; seek support if needed.",
      "Keep a silver-coloured keepsake in a secure place if meaningful to you.",
      "Share rice and jaggery puffed sweets with children through a school or community centre, following its food policies.",
    ],
  },
  {
    title: "6th House - Health & Enemies",
    benefic:
      "The traditional reading associates personal spending, courage, intellect, and principled conduct with good fortune. It suggests foreign opportunities and career growth, and highlights the value of positive relationships with siblings. Treat omens such as a sneeze before a journey as cultural beliefs, not reasons to fear or cancel necessary plans.",
    malefic:
      "The source text links sibling conflict with household stress and describes challenges in travel, work, and wellbeing. These are not medical predictions. Keep communication respectful, plan travel sensibly, and seek professional support for health concerns.",
    remedies: [
      "Care for a black dog only if you can meet its needs responsibly; otherwise support a reputable animal shelter.",
      "Wear sunglasses only when they suit the light and your eye-care needs.",
      "Donate mustard oil or black urad dal to a temple or community organisation on Saturdays.",
      "Do not bury flowers in deserted land; offer them at a place of worship or compost them where permitted.",
    ],
  },
  {
    title: "7th House - Marriage & Partnership",
    benefic:
      "Even without extensive formal education, practical intelligence may help you guide others and progress in business or career. The traditional reading describes kindness and generosity, and suggests that emotional balance and thoughtful spending can support a stable life.",
    malefic:
      "The source text contains frightening claims about marriage, death, pets, and financial ruin. These are not reliable predictions. Relationship and career outcomes are not determined by astrology; base decisions on consent, safety, communication, and sound professional advice.",
    remedies: [
      "Offer marigold, jasmine, or mogra flowers at a temple on Wednesdays if welcomed there.",
      "Apply a white sandalwood tilak if suitable for your skin.",
      "Carry a square piece of silver if comfortable.",
      "Collect silver items only if affordable and meaningful; there is no need to buy something every year.",
      "Do not put coconuts or other objects into flowing water; offer them at a temple or compost them appropriately.",
    ],
  },
  {
    title: "8th House - Transformation & Longevity",
    benefic:
      "The traditional reading associates this placement with support from in-laws, honest work, loyalty, and the possibility of success after earlier hardships. It suggests waiting until after age 21 to marry, but marriage timing should be based on personal readiness and consent rather than an astrological rule.",
    malefic:
      "The source text describes risks related to impulsive choices, dishonesty, and health. These are not predictions. Build trust through honest decisions, and seek qualified medical or relationship support when needed.",
    remedies: [
      "Do not store sugar sacks on a roof if this may attract pests or create a hazard; donate sugar through an appropriate food programme instead.",
      "Do not break metal into pieces or immerse it in waterways; recycle metal through an approved service or donate it.",
    ],
  },
  {
    title: "9th House - Fortune & Spirituality",
    benefic:
      "The traditional reading associates family connection, faith, charity, and the ability to guide others with happiness and good fortune. Ages 21 and 42 are described as possible turning points, while maintaining respectful relationships with family may support a sense of connection.",
    malefic:
      "The source text links family tension, financial uncertainty, and household objects with misfortune. These are traditional beliefs, not predictions. Remove broken or damp items for practical safety, maintain family boundaries, and make decisions without fear of omens.",
    remedies: [
      "Care for a dog responsibly, or support an animal-welfare organisation.",
      "Maintain respectful relationships with your brother and parents where safe and appropriate.",
      "A pearl necklace in a gold chain is a traditional suggestion; seek qualified advice before wearing gemstones.",
      "Use a saffron tilak only if it is suitable for your skin.",
      "Avoid conflict with in-laws while maintaining healthy boundaries.",
    ],
  },
  {
    title: "10th House - Career & Status",
    benefic:
      "This placement is traditionally associated with kindness, respect, and business or leadership opportunities, including fitness-related work. The reading suggests that professional opposition may pass with time and advises thoughtful choices about food and reputation.",
    malefic:
      "The traditional account repeats themes of respect, leadership, and fitness-related work, and cautions about reputation. Career success and public standing depend on many practical factors, not a single planetary placement.",
    remedies: [
      "Cover your head with a comfortable cap, turban, or light-coloured cloth if you wish.",
      "Offer raw sugar at a temple or through a community food programme; do not put it into flowing water.",
      "Donate red lentils to a suitable food programme instead of immersing them in water.",
    ],
  },
  {
    title: "11th House - Gains & Friendships",
    benefic:
      "The traditional reading associates this placement with self-made success, property, vehicles, family traditions, and increasing career progress after age 36. It encourages independence, loyalty to family, and earning through consistent effort rather than relying on favours.",
    malefic:
      "The source text makes alarming claims about accidents, illness, death, and financial ruin based on colours or objects. These are not reliable predictions. Focus on practical safety, financial planning, and support for family or career concerns.",
    remedies: [
      "Use a saffron tilak if suitable for your skin.",
      "If you smoke, consider seeking support to quit rather than using a broken or unsafe holder.",
      "Choose clothing and home colours based on preference; black or dark blue does not cause harm.",
      "Do not wear gemstones such as Neelam without qualified advice.",
      "Do not break metal into pieces or immerse it in water; recycle it responsibly or make a suitable donation.",
    ],
  },
  {
    title: "12th House - Liberation & Expenses",
    benefic:
      "This placement is traditionally associated with respectful speech, social connection, fitness, spirituality, and supporting family. The reading suggests that helping others and maintaining responsibilities may support a sense of purpose and connection.",
    malefic:
      "The source text describes financial strain, family stress, and emotional distress. These are not predictions or a diagnosis. If you or someone close to you is struggling emotionally, reach out to a trusted person or qualified mental-health professional; urgent concerns deserve immediate local support.",
    remedies: [
      "Do not feed sugarcane or other food to elephants directly; support a reputable elephant sanctuary or conservation organisation instead.",
      "Eat meals wherever comfortable and practical.",
      "Support your sisters or daughters in ways that respect everyone’s needs and circumstances.",
      "Choose home colours based on preference and practical considerations.",
      "Care for cows only through responsible, reputable animal-welfare services.",
    ],
  },
];

const ketuHouseDetails = [
  {
    title: "1st House - Self & Personality",
    benefic:
      "The traditional reading associates this placement with living away from one’s ancestral home, hard work, forgiveness, and gradually rebuilding family prosperity. Leadership and career efforts may bring early fulfilment. It also highlights protecting others and supporting people going through difficulty as strengths.",
    malefic:
      "The source describes overthinking, family tension, and concerns about career or wellbeing as possible themes. Claims about a person’s birth harming a place, relatives facing ruin, or a specific child’s sex are not reliable predictions. Seek appropriate support for health, family, or financial concerns.",
    remedies: [
      "Share jaggery and wheat through a suitable community food or animal-welfare programme.",
      "Maintain respectful, supportive relationships with your sisters where safe and appropriate.",
      "A ruby is a traditional suggestion; seek qualified gem advice before wearing one.",
      "Choose a balanced diet that suits your health and personal or religious values; avoid alcohol if it affects your wellbeing.",
      "Donate a black-and-white blanket through a shelter or community service for 11 days if practical.",
    ],
  },
  {
    title: "2nd House - Wealth & Family",
    benefic:
      "With guidance from elders and mentors, travel and communication may open opportunities. The traditional reading highlights charity, family support, and professional progress, and describes age 24 as a possible milestone toward financial independence.",
    malefic:
      "The source describes financial uncertainty, career changes, and family stress as possible interpretations. It also makes predictions about isolation and lack of support from children; these are not certainties. Build savings and make career or housing decisions using practical advice.",
    remedies: [
      "Use a saffron tilak only if it is suitable for your skin.",
      "Share sweet-and-sour food through a school or community programme, following its food-safety policies.",
      "Working away from home is a traditional suggestion, not a requirement; choose work and housing based on your needs and circumstances.",
    ],
  },
  {
    title: "3rd House - Courage & Siblings",
    benefic:
      "This placement is traditionally associated with supportive siblings and in-laws, gratitude, kindness, and spiritual travel. Family connections may bring joy, while travel or education can be important themes. The reading describes career recognition and possible financial growth after age 24.",
    malefic:
      "The source links impulsive advice with family strain and mentions legal disputes or relationship difficulties. These outcomes are not fixed. Thoughtful communication, clear boundaries, and appropriate legal advice can help when challenges arise.",
    remedies: [
      "Wear a gold chain if affordable and comfortable.",
      "Use a saffron tilak if it is suitable for your skin.",
      "Do not put lentils or other items into flowing water; donate split chickpeas through a food charity on Thursdays instead.",
      "Care for a dog only if you can meet its needs responsibly; otherwise support a reputable animal shelter.",
    ],
  },
  {
    title: "4th House - Home & Mother",
    benefic:
      "The traditional reading associates this placement with wise leadership, agriculture or business, steady reputation, and resolving family or inheritance matters over time. Persistence and guidance from elders may support comfort and social standing.",
    malefic:
      "The source describes possible impulsiveness, family strain, and concerns involving a mother’s wellbeing after certain ages. These are not medical or family predictions. Seek qualified healthcare and practical support when needed, and maintain respectful relationships where safe.",
    remedies: [
      "If a ritual is meaningful to you, discuss it with a trusted faith leader; it is not a substitute for practical financial, work, or healthcare support.",
      "Do not put lentils or other offerings into flowing water; donate them through a food programme on Thursdays.",
      "Keep a clean brass vessel with water and silver-coloured keepsakes if this is meaningful to you.",
      "If helping with studies, donate bananas through a school or community programme.",
    ],
  },
  {
    title: "5th House - Children & Creativity",
    benefic:
      "The traditional reading associates this placement with overcoming early study challenges, a peaceful home, and financial stability. It also describes discipline in youth as supportive of family life. Claims about a required number or sex of children are not reliable predictions.",
    malefic:
      "Academic difficulty or stress can be challenging, but they do not determine someone’s future or family outcomes. Seek learning support or professional advice if concerns arise.",
    remedies: [
      "For 43 days, donate rice and raw sugar through a food charity if practical; share any temple prasad only with permission and in line with food-safety guidance.",
      "Wear a gold chain if affordable and comfortable.",
      "Do not wear gemstones such as blue sapphire without qualified advice.",
    ],
  },
  {
    title: "6th House - Health & Enemies",
    benefic:
      "The traditional reading associates this placement with education, comfort, and support from maternal relatives. It encourages self-reflection about balancing personal interests with care for others and describes mentors as a source of guidance.",
    malefic:
      "The source discusses family support, reputation, and health concerns using physical features as omens. Body features do not predict character, health, or a child’s future. Consult qualified health professionals for medical concerns.",
    remedies: [
      "Care for a dog only if you can provide responsible, long-term care; never replace a deceased pet as a ritual obligation.",
      "A gold ring on the left hand is a traditional suggestion; wear jewellery only if safe and comfortable.",
      "Share bananas through a school or children’s programme for 43 days if practical.",
      "Show care to grandchildren and family members while respecting their needs and boundaries.",
    ],
  },
  {
    title: "7th House - Marriage & Partnership",
    benefic:
      "The traditional reading associates this placement with partnership, financial opportunity, honesty, and keeping promises. It describes ages 24 and 34 as possible career milestones and encourages a helpful nature and fair conduct.",
    malefic:
      "Arrogance, harsh speech, or broken promises can strain relationships. Claims that someone’s marriage or fertility is destined to fail are not reliable predictions. Focus on mutual respect, consent, and communication, and seek qualified support for relationship or fertility concerns.",
    remedies: [
      "Support cow care through a responsible animal-welfare organisation.",
      "Maintain considerate relationships with sisters-in-law while respecting everyone’s boundaries.",
      "Do not treat family size or the sex of children as a measure of prosperity.",
      "Support local animal shelters by donating food or supplies they specifically request.",
    ],
  },
  {
    title: "8th House - Transformation & Longevity",
    benefic:
      "This placement is traditionally associated with strategic thinking, support from family and in-laws, and learning to navigate change. Maintaining harmony with siblings and relatives may support emotional wellbeing. Claims about predicting the end of life or a child’s longevity are not reliable.",
    malefic:
      "The source describes family conflict, fault-finding, and health worries as possible themes, and includes omens involving dogs. These are not diagnoses or predictions. Seek professional advice for health concerns and respond to animal behaviour with practical care rather than fear.",
    remedies: [
      "Donate split chickpeas in a yellow cloth through a temple or food charity; do not put them into waterways.",
      "Use a saffron tilak if it is suitable for your skin.",
      "Donate a black-and-white blanket through a shelter or community service.",
      "Wear gold in your ears only if safe and comfortable.",
      "Care for dogs responsibly or support a reputable shelter.",
    ],
  },
  {
    title: "9th House - Fortune & Spirituality",
    benefic:
      "The traditional reading associates this placement with courage, loyalty, forgiveness, and offering thoughtful advice. Artistic work or skilled labour may be important themes. Family and in-laws may be sources of support, and assets may grow through steady effort.",
    malefic:
      "The source describes family tension, work interference, travel dissatisfaction, and concerns about ancestral property. These are not fixed outcomes. Clear communication, practical planning, and healthy boundaries can help manage family and work challenges.",
    remedies: [
      "Care for dogs through responsible ownership or support a reputable shelter; animal sex is not relevant to whether care is beneficial.",
      "Wear gold in your ears only if safe and comfortable.",
      "Worship Lord Ganesha if this is meaningful to you.",
      "Make financial decisions about gold based on your needs; avoid pawning or selling only if it is financially practical for you.",
      "Offer kind wishes to others, without promising or implying control over fertility or a child’s sex.",
    ],
  },
  {
    title: "10th House - Career & Status",
    benefic:
      "The traditional reading associates this placement with comfort, financial growth, property, and business potential. Forgiveness and integrity in family relationships are described as supportive strengths, with opportunities continuing into midlife.",
    malefic:
      "The supplied benefic and malefic descriptions are similar, both highlighting integrity, family relationships, business, and property. They are traditional interpretations, not guarantees of wealth or success. Make financial decisions based on sound planning.",
    remedies: [
      "Do not bury honey or metal in a house foundation or public land; keep a clean silver vessel with honey at home if safe, or make a suitable donation.",
      "Care for a dog only if you can provide responsible, long-term care; never abandon an adopted animal.",
      "Set clear boundaries around gifts or financial support from relatives, and seek professional advice for difficult financial choices.",
    ],
  },
  {
    title: "11th House - Gains & Friendships",
    benefic:
      "This placement is traditionally associated with self-made success, property, social recognition, and a harmonious home. Close bonds with family and supportive children are described as positive themes.",
    malefic:
      "The source describes possible concerns around housing, family support, finances, and omens when interrupted before work. These are not predictions. Use practical planning and do not let omens create fear or prevent necessary activities.",
    remedies: [
      "Care for a dog responsibly or support an animal shelter.",
      "Donate black sesame seeds, mustard oil, or black cloth through a suitable community organisation.",
      "Instead of leaving radishes beside a pillow, donate fresh produce through a food bank or community kitchen.",
    ],
  },
  {
    title: "12th House - Liberation & Expenses",
    benefic:
      "The traditional reading associates this placement with family happiness, prosperity, and children’s future success. Supportive relationships, practical planning, and a positive outlook can contribute to a sense of security.",
    malefic:
      "The source includes alarming claims involving pets, health, debt, and family separation. These are not reliable predictions. If emotional distress becomes overwhelming, contact someone you trust or a qualified mental-health professional; urgent concerns deserve immediate local support.",
    remedies: [
      "Care for a black-and-white dog only if you can provide safe, ongoing care; do not replace a pet as a ritual obligation.",
      "Worship Lord Ganesha if meaningful to you.",
      "Wear gold only if affordable and comfortable.",
      "A turmeric foot soak is optional; avoid it if it irritates your skin or creates a slipping risk.",
    ],
  },
];

const sunFaqs = [
  {
    question: "What does the Sun represent in Lal Kitab astrology?",
    answer:
      "In Lal Kitab astrology, the Sun represents confidence, authority, self-respect, father, and life direction. It is considered the most powerful planet that influences your personality, leadership ability, and overall success in life.",
  },
  {
    question: "How can I identify if my Sun is weak or malefic?",
    answer:
      "A weak or malefic Sun may show signs like low confidence, lack of recognition, ego issues, conflicts with father or authority figures, and frequent obstacles in career growth. These effects depend on its placement in your birth chart.",
  },
  {
    question:
      "What is the most effective Lal Kitab remedy for strengthening the Sun?",
    answer:
      "The most effective remedy is to offer water to the rising Sun every morning using a copper vessel. This helps balance solar energy, improve confidence, and bring clarity and success in life.",
  },
  {
    question: "Which day is best to perform Sun (Surya) remedies?",
    answer:
      "Sunday is considered the most शुभ (auspicious) day for performing Sun remedies. Donations, prayers, and rituals done on this day are believed to give better and faster results.",
  },
  {
    question:
      "What should be avoided if the Sun is malefic in the birth chart?",
    answer:
      "If the Sun is malefic, one should avoid ego, arrogance, disrespecting elders or father, dishonest earnings, and unnecessary conflicts, especially related to property or authority.",
  },
];

const moonFaqs = [
  {
    question: "How do Moon remedies actually work?",
    answer:
      "It helps calm emotional imbalance and brings mental peace, as milk is directly connected to Moon energy.",
  },
  {
    question: "How does keeping silver help strengthen the Moon?",
    answer:
      "Silver is linked to the Moon and helps improve emotional stability, reduce stress, and bring inner balance.",
  },
  {
    question: "Why is feeding rice and milk to animals recommended?",
    answer:
      "This remedy increases positivity, reduces emotional stress, and improves family harmony.",
  },
  {
    question:
      "Why should we avoid harsh behavior toward mother and elders in Moon remedies?",
    answer:
      "Their blessings are strongly connected to Moon energy, and respecting them helps remove obstacles and bring peace.",
  },
  {
    question: "Why are Monday remedies considered more effective for the Moon?",
    answer:
      "Monday is ruled by the Moon, so remedies done on this day give better and faster results.",
  },
];

const marsFaqs = [
  {
    question: "How do Mars remedies help in daily life?",
    answer:
      "They improve courage, decision-making, and control over anger, while bringing stability in relationships.",
  },
  {
    question: "What are the most common Mars remedies?",
    answer:
      "Feeding animals, donating red items, using copper, and practicing calm behavior are commonly suggested.",
  },
  {
    question: "Which day is best for Mars remedies?",
    answer:
      "Tuesday is considered the most effective day for performing Mars-related remedies.",
  },
  {
    question: "Can Mars remedies help reduce anger and aggression?",
    answer:
      "Yes, many remedies are focused on calming the mind and controlling impulsive reactions.",
  },
  {
    question: "What should be avoided when Mars is weak or malefic?",
    answer:
      "Avoid anger, harsh speech, arguments, and impulsive decisions, as these can increase negative effects.",
  },
];

const mercuryFaqs = [
  {
    question: "Why are Mercury (Budh) remedies needed?",
    answer:
      "They help balance Mercury’s energy when there are issues like confusion, poor communication, or financial instability.",
  },
  {
    question: "How do Mercury remedies help in daily life?",
    answer:
      "By bringing more clarity, better decision-making, financial stability, and improved relationships over time.",
  },
  {
    question: "Which remedies are commonly used for Mercury?",
    answer:
      "Donating green items, wearing silver or copper, feeding animals, and following disciplined habits are commonly suggested.",
  },
  {
    question: "How regularly should Mercury remedies be done?",
    answer:
      "Most remedies work best when done consistently, especially on Wednesdays.",
  },
  {
    question: "Can Mercury remedies be done without expert guidance?",
    answer:
      "Basic remedies can be done by anyone, but remedies based on your birth chart give more accurate results.",
  },
];

const jupiterFaqs = [
  {
    question: "Why are Jupiter remedies important?",
    answer:
      "They help strengthen Jupiter’s positive energy and reduce problems like delays, confusion, and financial instability.",
  },
  {
    question: "How do Jupiter remedies improve life?",
    answer:
      "By bringing more clarity, better decision-making, financial stability, and improved relationships over time.",
  },
  {
    question: "Which remedies are commonly suggested for Jupiter?",
    answer:
      "Wearing gold, donating yellow items, feeding animals, and respecting elders or teachers are some common remedies.",
  },
  {
    question: "How often should Jupiter remedies be done?",
    answer:
      "Most remedies should be done regularly, especially on Thursdays, to see steady and lasting results.",
  },
  {
    question: "Can I do Jupiter remedies on my own?",
    answer:
      "Yes, simple remedies can be done by anyone, but following remedies based on your birth chart gives better results.",
  },
];

const venusFaqs = [
  {
    question: "Why is donating curd or ghee recommended for Venus?",
    answer:
      "These items are traditionally linked to Venus energy and are believed to support peace, harmony, relationships, and finances.",
  },
  {
    question: "How does serving or feeding a cow help strengthen Venus?",
    answer:
      "Caring for cows is traditionally believed to balance Venus by encouraging compassion, stability, and positive family energy.",
  },
  {
    question: "Why should certain foods or habits be avoided in Venus remedies?",
    answer:
      "Avoiding specific foods or habits is traditionally believed to help control overindulgence and keep Venus energy balanced.",
  },
  {
    question: "How does using silver in remedies help Venus?",
    answer:
      "Silver is associated with calmness and emotional balance, which are traditionally believed to support relationships and mental peace.",
  },
  {
    question: "Why are Friday-based remedies important for Venus?",
    answer:
      "Friday is traditionally associated with Venus, so remedies on this day are believed to be more effective.",
  },
];

const saturnFaqs = [
  {
    question: "If Saturn is weak in the 2nd house, what remedy should follow?",
    answer:
      "A traditional suggestion is to apply a milk or curd tilak daily and speak humbly. Treat this as a cultural practice, not a guaranteed way to change financial outcomes.",
  },
  {
    question: "What is a simple Saturday remedy for Saturn?",
    answer:
      "Some people donate mustard oil, black lentils, or iron items, or support animal welfare. Choose a safe, lawful donation that suits your circumstances.",
  },
  {
    question: "If Saturn is causing career problems, what remedy can help?",
    answer:
      "A traditional practice is feeding monkeys for 11 days and then weekly. Only do so where permitted and safely; patience, skills, and practical career planning remain important.",
  },
  {
    question: "What remedy should we do if Saturn is creating financial stress?",
    answer:
      "Traditional suggestions include carrying a small silver square or donating black clothes or food on Saturdays. Budgeting and qualified financial guidance can also help address financial stress.",
  },
  {
    question: "Is there any daily remedy for Saturn that is easy to follow?",
    answer:
      "Respect elders, stay disciplined, be honest, and keep your behaviour calm. These habits are simple traditional Saturn remedies and useful practices in everyday life.",
  },
];

const rahuFaqs = [
  {
    question: "Why are Rahu remedies important?",
    answer:
      "In Lal Kitab tradition, they are used to reflect on Rahu when life feels confusing or changeable. They are cultural practices, not guaranteed outcomes.",
  },
  {
    question: "How do Rahu remedies help in daily life?",
    answer:
      "Many people use them as reminders to pause, reflect, and respond calmly to unexpected situations.",
  },
  {
    question: "What are the most common Rahu remedies?",
    answer:
      "Traditional suggestions include helping animals, wearing silver, and practising discipline. Choose safe, lawful options that suit you.",
  },
  {
    question: "How often should Rahu remedies be performed?",
    answer:
      "Some traditions suggest daily or weekly practices, but there is no required schedule. Keep any practice safe and manageable.",
  },
  {
    question: "Can Rahu remedies reduce confusion and overthinking?",
    answer:
      "A calming routine may help some people feel grounded, but remedies cannot guarantee mental-health outcomes. Consider talking with a qualified professional if distress continues.",
  },
];

const ketuFaqs = [
  {
    question: "How do Ketu remedies actually work?",
    answer:
      "In Lal Kitab tradition, remedies are symbolic practices connected with charity, discipline, and mindful habits. They may offer a personal routine, but they are not guaranteed to change planetary effects.",
  },
  {
    question: "What happens when Ketu is not strong?",
    answer:
      "Traditional astrology associates a challenging Ketu placement with confusion, sudden changes, isolation, or career concerns. These are interpretations, not certain predictions.",
  },
  {
    question: "Which remedies are most effective for Ketu?",
    answer:
      "Common traditional suggestions include helping animals, donating selected items, maintaining good relationships, and following thoughtful routines. Choose safe practices that suit your circumstances.",
  },
  {
    question: "How long do Ketu remedies take to show results?",
    answer:
      "There is no established timeline or guaranteed result. If you follow a cultural practice, keep it safe and manageable rather than feeling obliged to follow a fixed duration.",
  },
  {
    question: "Can anyone do Ketu remedies, or do I need guidance?",
    answer:
      "Simple cultural practices can be chosen by anyone, but personalised astrological guidance is a matter of belief. For health, financial, or relationship decisions, rely on qualified practical advice.",
  },
];

const LalKitabPlanetRemediesPage = () => {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const [openHouse, setOpenHouse] = useState(null);
  const [openFaqs, setOpenFaqs] = useState({});
  const selectedPlanet = planetDetails.find(
    (planet) =>
      planet.name.toLowerCase() === location.hash.slice(1).toLowerCase(),
  );
  const hasGuidanceSection = [
    "Sun",
    "Moon",
    "Mars",
    "Mercury",
    "Jupiter",
    "Venus",
    "Saturn",
    "Rahu",
    "Ketu",
  ].includes(
    selectedPlanet?.name,
  );

  return (
    <main
      className={`min-h-screen bg-[#f8f6f1] px-4 text-black sm:px-6 lg:px-10 ${
        hasGuidanceSection ? "pb-0 pt-8 sm:pb-0 sm:pt-10" : "py-8 sm:py-10"
      }`}
    >
      <div className="mx-auto max-w-[1280px] px-8 md:px-14 lg:px-16">
        <Link
          to="/lal-kitab-remedies"
          className="inline-flex text-sm font-medium text-[#946b13] underline-offset-4 hover:underline"
        >
          Back to Lal Kitab Remedies
        </Link>

        {selectedPlanet?.heroDescription ? (
          <header className="relative mb-8 mt-6 pb-8 after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-[calc(100vw-2rem)] after:-translate-x-1/2 after:bg-[#946b13]/45 sm:mb-10 sm:mt-8 sm:pb-10 sm:after:w-[calc(100vw-3rem)] lg:after:w-[calc(100vw-5rem)]">
            <div className="grid grid-cols-1 items-center gap-5 sm:grid-cols-[144px_minmax(0,1fr)] sm:gap-8 lg:grid-cols-[176px_minmax(0,1fr)] lg:gap-10">
              <div className="relative mx-auto flex h-28 w-28 items-center justify-center sm:h-36 sm:w-36 lg:h-40 lg:w-40">
                <motion.div
                  aria-hidden="true"
                  className={`absolute inset-[18%] rounded-full blur-xl ${
                    selectedPlanet.name === "Sun"
                      ? "bg-[radial-gradient(circle,rgba(255,196,48,0.75)_0%,rgba(255,137,24,0.42)_42%,rgba(255,99,0,0)_75%)]"
                      : "bg-[radial-gradient(circle,rgba(190,210,255,0.6)_0%,rgba(150,175,230,0.35)_42%,rgba(120,140,200,0)_75%)]"
                  }`}
                  animate={
                    reduceMotion
                      ? { opacity: 0.75, scale: 1 }
                      : { opacity: [0.55, 0.95, 0.55], scale: [0.9, 1.16, 0.9] }
                  }
                  transition={
                    reduceMotion
                      ? undefined
                      : { duration: 2.8, ease: "easeInOut", repeat: Infinity }
                  }
                />
                <motion.img
                  src={selectedPlanet.image}
                  alt={selectedPlanet.name}
                  className={`relative z-10 h-24 w-24 object-contain sm:h-32 sm:w-32 lg:h-36 lg:w-36 ${
                    selectedPlanet.name === "Sun"
                      ? "drop-shadow-[0_0_12px_rgba(255,150,20,0.55)]"
                      : "drop-shadow-[0_0_12px_rgba(140,160,220,0.4)]"
                  }`}
                  animate={!reduceMotion ? { rotate: 360 } : { rotate: 0 }}
                  transition={
                    reduceMotion
                      ? undefined
                      : { duration: 20, ease: "linear", repeat: Infinity }
                  }
                />
              </div>
              <div className="min-w-0">
                <h1 className="font-serif text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                  {selectedPlanet.name} Effects And Remedies According To Lal
                  Kitab
                </h1>
                <p className="mt-4 text-sm leading-6 text-[#594b41] sm:mt-5 sm:text-base sm:leading-7">
                  {selectedPlanet.heroDescription}
                </p>
              </div>
            </div>
          </header>
        ) : (
          <header className="mb-8 mt-5 text-center sm:mb-10">
            <h1 className="font-serif text-2xl font-bold sm:text-3xl lg:text-4xl">
              {selectedPlanet
                ? `${selectedPlanet.name} Lal Kitab Remedies`
                : "Lal Kitab Planet Remedies"}
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#594b41] sm:text-base">
              {selectedPlanet
                ? `Explore traditional planetary associations and suggested Lal Kitab remedies for ${selectedPlanet.name}.`
                : "Choose a planet from the Lal Kitab Remedies page to view its details."}
            </p>
          </header>
        )}

        {hasGuidanceSection && (
          <section
            aria-labelledby={`${selectedPlanet.name.toLowerCase()}-house-effects-heading`}
            className="mb-8 sm:mb-10"
          >
            <div className="mb-5">
              <h2
                id={`${selectedPlanet.name.toLowerCase()}-house-effects-heading`}
                className="text-center font-serif text-2xl font-bold text-black sm:text-3xl lg:text-4xl"
              >
                {selectedPlanet.name} in the 12 Houses
              </h2>
            </div>
            <div className="space-y-3">
              {(selectedPlanet.name === "Sun"
                ? sunHouseDetails
                : selectedPlanet.name === "Moon"
                  ? moonHouseDetails
                  : selectedPlanet.name === "Mars"
                    ? marsHouseDetails
                    : selectedPlanet.name === "Mercury"
                      ? mercuryHouseDetails
                      : selectedPlanet.name === "Jupiter"
                        ? jupiterHouseDetails
                        : selectedPlanet.name === "Venus"
                          ? venusHouseDetails
                          : selectedPlanet.name === "Saturn"
                            ? saturnHouseDetails
                            : selectedPlanet.name === "Rahu"
                              ? rahuHouseDetails
                              : ketuHouseDetails
              ).map((house) => {
                const isHouseOpen = openHouse === house.title;
                const detailsId = `${selectedPlanet.name.toLowerCase()}-house-${house.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")}`;

                return (
                  <div
                    key={house.title}
                    className="rounded-none rounded-bl-2xl border border-[#946b13]/35 bg-white px-4 shadow-[0_8px_24px_rgba(77,0,30,0.12),0_3px_8px_rgba(148,107,19,0.14)]"
                  >
                    <button
                      type="button"
                      aria-expanded={isHouseOpen}
                      aria-controls={detailsId}
                      onClick={() =>
                        setOpenHouse(isHouseOpen ? null : house.title)
                      }
                      className="flex w-full cursor-pointer items-center justify-between gap-4 py-3 text-left font-serif text-base font-semibold leading-snug text-[#946b13] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#946b13] sm:text-lg"
                    >
                      {house.title}
                      <motion.span
                        aria-hidden="true"
                        animate={{ rotate: isHouseOpen ? 180 : 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.25 }}
                        className="text-base"
                      >
                        ⌄
                      </motion.span>
                    </button>
                    <motion.div
                      id={detailsId}
                      initial={false}
                      animate={isHouseOpen ? "open" : "closed"}
                      variants={{
                        open: {
                          height: "auto",
                          opacity: 1,
                          transition: reduceMotion
                            ? { duration: 0 }
                            : {
                                height: { duration: 0.4, ease: "easeOut" },
                                opacity: { duration: 0.25, delay: 0.08 },
                                staggerChildren: 0.12,
                                delayChildren: 0.08,
                              },
                        },
                        closed: {
                          height: 0,
                          opacity: 0,
                          transition: reduceMotion
                            ? { duration: 0 }
                            : {
                                height: { duration: 0.3, ease: "easeIn" },
                                opacity: { duration: 0.16 },
                                staggerChildren: 0.06,
                                staggerDirection: -1,
                              },
                        },
                      }}
                      className="overflow-hidden"
                      aria-hidden={!isHouseOpen}
                    >
                      <div
                        className={`grid items-stretch gap-4 pb-4 pt-2 ${
                          house.remedies.length
                            ? "md:grid-cols-3"
                            : "md:grid-cols-2"
                        }`}
                      >
                        <motion.article
                          variants={{
                            open: {
                              opacity: 1,
                              y: 0,
                              transition: { duration: reduceMotion ? 0 : 0.3 },
                            },
                            closed: { opacity: 0, y: reduceMotion ? 0 : 12 },
                          }}
                          className="rounded-none rounded-bl-xl border-l-4 border-[#4b9b54] bg-[#eaf5eb] p-4 sm:p-5"
                        >
                          <h3 className="text-sm font-bold uppercase tracking-wide text-[#286c33]">
                            Benefic
                          </h3>
                          <p className="mt-2 whitespace-pre-line text-sm leading-6 text-black sm:text-base">
                            {house.benefic}
                          </p>
                        </motion.article>
                        <motion.article
                          variants={{
                            open: {
                              opacity: 1,
                              y: 0,
                              transition: { duration: reduceMotion ? 0 : 0.3 },
                            },
                            closed: { opacity: 0, y: reduceMotion ? 0 : 12 },
                          }}
                          className="rounded-none rounded-bl-xl border-l-4 border-[#dc5555] bg-[#fbeaea] p-4 sm:p-5"
                        >
                          <h3 className="text-sm font-bold uppercase tracking-wide text-[#a92f35]">
                            Malefic
                          </h3>
                          <p className="mt-2 whitespace-pre-line text-sm leading-6 text-black sm:text-base">
                            {house.malefic}
                          </p>
                        </motion.article>
                        {house.remedies.length > 0 && (
                          <motion.article
                            variants={{
                              open: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                  duration: reduceMotion ? 0 : 0.3,
                                },
                              },
                              closed: { opacity: 0, y: reduceMotion ? 0 : 12 },
                            }}
                            className="rounded-none rounded-bl-xl border-l-4 border-[#d5a00a] bg-[#fff5d9] p-4 sm:p-5"
                          >
                            <h3 className="text-sm font-bold uppercase tracking-wide text-[#946b13]">
                              Lal Kitab Remedies
                            </h3>
                            <ul className="mt-2 space-y-2 text-sm leading-6 text-black sm:text-base">
                              {house.remedies.map((remedy) => (
                                <li
                                  key={remedy}
                                  className="flex items-start gap-2"
                                >
                                  <span
                                    aria-hidden="true"
                                    className="text-[#d5a00a]"
                                  >
                                    ★
                                  </span>
                                  <span>{remedy}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.article>
                        )}
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {hasGuidanceSection && (
          <div className="relative isolate pb-8 sm:pb-10 before:absolute before:inset-y-0 before:left-1/2 before:-z-10 before:w-screen before:-translate-x-1/2 before:bg-gradient-to-b before:from-[#fff9e9] before:via-[#f4e8c5] before:to-[#fff9e9]">
            <section
              aria-labelledby="lal-kitab-guidance-heading"
              className="relative mb-4 mt-4 grid items-center gap-8 pb-5 pt-8 before:absolute before:left-1/2 before:top-0 before:h-px before:w-[calc(100vw-2rem)] before:-translate-x-1/2 before:bg-[#946b13]/45 sm:pb-6 sm:pt-10 sm:before:w-[calc(100vw-3rem)] md:grid-cols-[minmax(0,1.2fr)_minmax(240px,0.8fr)] md:gap-12 lg:pb-7 lg:pt-12 lg:before:w-[calc(100vw-5rem)]"
            >
              <div className="order-2 md:order-1">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#946b13] sm:text-sm">
                  Personalized Lal Kitab Guidance
                </p>
                <h2
                  id="lal-kitab-guidance-heading"
                  className="mt-2 font-serif text-2xl font-bold leading-tight text-[#201b3a] sm:text-3xl lg:text-4xl"
                >
                  Find Clarity with Your Lal Kitab Kundli
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-[#594b41] sm:text-base sm:leading-7">
                  Explore personalized insights into planetary influences,
                  important life areas, and practical remedies with a Lal Kitab
                  kundli prepared around your birth details.
                </p>
                <Link
                  to="/lal-kitab-details"
                  className="mt-6 inline-flex min-h-11 items-center justify-center rounded-none rounded-bl-xl bg-[#946b13] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#7d5a0f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#946b13] focus-visible:ring-offset-2 sm:text-base"
                >
                  Explore Lal Kitab Kundli
                </Link>
              </div>

              <div className="order-1 mx-auto aspect-square w-[min(72vw,280px)] md:order-2 md:w-[320px]">
                <div className="aspect-square w-full bg-gradient-to-br from-[#f3d982] via-[#c9962b] to-[#946b13] p-1.5 shadow-[0_12px_30px_rgba(77,0,30,0.18)] [clip-path:polygon(25%_0,75%_0,100%_50%,75%_100%,25%_100%,0_50%)]">
                  <img
                    src="/Lal%20Kitab/4.png"
                    alt="Lal Kitab Amrit book"
                    loading="lazy"
                    className="aspect-square w-full bg-[#f8f6f1] object-contain object-center [clip-path:polygon(25%_0,75%_0,100%_50%,75%_100%,25%_100%,0_50%)]"
                  />
                </div>
              </div>
            </section>

            <section
              aria-labelledby={`${selectedPlanet.name.toLowerCase()}-faq-heading`}
              className="py-4 sm:py-5"
            >
              <header className="mb-5 text-center sm:mb-7">
                <h2
                  id={`${selectedPlanet.name.toLowerCase()}-faq-heading`}
                  className="font-serif text-2xl font-bold text-black sm:text-3xl lg:text-4xl"
                >
                  Frequently Asked Questions
                </h2>
                <p className="mt-1 text-sm leading-5 text-[#594b41] sm:text-base">
                  Everything you need to know about Lal Kitab remedies
                </p>
              </header>
              <div className="mx-auto max-w-[1000px] space-y-3">
                {(selectedPlanet.name === "Moon"
                  ? moonFaqs
                  : selectedPlanet.name === "Mars"
                    ? marsFaqs
                    : selectedPlanet.name === "Mercury"
                      ? mercuryFaqs
                      : selectedPlanet.name === "Jupiter"
                        ? jupiterFaqs
                        : selectedPlanet.name === "Venus"
                          ? venusFaqs
                          : selectedPlanet.name === "Saturn"
                            ? saturnFaqs
                            : selectedPlanet.name === "Rahu"
                              ? rahuFaqs
                              : selectedPlanet.name === "Ketu"
                                ? ketuFaqs
                                : sunFaqs
                ).map((faq, index) => {
                  const isFaqOpen = Boolean(openFaqs[faq.question]);
                  const answerId = `${selectedPlanet.name.toLowerCase()}-faq-answer-${index + 1}`;

                  return (
                    <article
                      key={faq.question}
                      className="rounded-none rounded-bl-2xl border border-[#946b13]/35 bg-white px-4 shadow-[0_8px_24px_rgba(77,0,30,0.12),0_3px_8px_rgba(148,107,19,0.14)]"
                    >
                      <button
                        type="button"
                        aria-expanded={isFaqOpen}
                        aria-controls={answerId}
                        onClick={() =>
                          setOpenFaqs((current) => ({
                            ...current,
                            [faq.question]: !current[faq.question],
                          }))
                        }
                        className="flex w-full items-center justify-between gap-4 py-3 text-left font-serif text-sm font-semibold leading-snug text-[#946b13] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#946b13] sm:text-base"
                      >
                        <span>
                          <span className="mr-2">{index + 1}.</span>
                          {faq.question}
                        </span>
                        <motion.span
                          aria-hidden="true"
                          animate={{ rotate: isFaqOpen ? 180 : 0 }}
                          transition={{ duration: reduceMotion ? 0 : 0.2 }}
                          className="shrink-0"
                        >
                          ⌄
                        </motion.span>
                      </button>
                      <motion.div
                        id={answerId}
                        initial={false}
                        animate={
                          isFaqOpen
                            ? { height: "auto", opacity: 1 }
                            : { height: 0, opacity: 0 }
                        }
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : {
                                height: { duration: 0.35, ease: "easeInOut" },
                                opacity: {
                                  duration: isFaqOpen ? 0.24 : 0.16,
                                  delay: isFaqOpen ? 0.08 : 0,
                                },
                              }
                        }
                        className="overflow-hidden"
                        aria-hidden={!isFaqOpen}
                      >
                        <p className="border-t border-[#946b13]/15 py-3 text-sm leading-6 text-black sm:text-base">
                          {faq.answer}
                        </p>
                      </motion.div>
                    </article>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {selectedPlanet &&
        selectedPlanet.name !== "Sun" &&
        selectedPlanet.name !== "Moon" &&
        selectedPlanet.name !== "Mars" &&
        selectedPlanet.name !== "Mercury" &&
        selectedPlanet.name !== "Jupiter" &&
        selectedPlanet.name !== "Venus" &&
        selectedPlanet.name !== "Saturn" &&
        selectedPlanet.name !== "Rahu" &&
        selectedPlanet.name !== "Ketu" ? (
          <>
            <article className="rounded-none rounded-bl-2xl border border-[#946b13]/35 bg-white p-4 shadow-[0_8px_24px_rgba(77,0,30,0.2),0_3px_8px_rgba(148,107,19,0.22)] sm:p-6">
              <div className="flex items-center gap-3 border-b border-[#946b13]/20 pb-4 sm:gap-4">
                <img
                  src={selectedPlanet.image}
                  alt={`${selectedPlanet.name} planet`}
                  className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14"
                />
                <h2 className="font-serif text-lg font-bold text-[#946b13] sm:text-xl">
                  {selectedPlanet.name} Lal Kitab Remedies
                </h2>
              </div>
              <p className="mt-4 text-sm leading-6 text-black sm:text-base">
                {selectedPlanet.focus}
              </p>
              <div className="mt-4 border-l-2 border-[#946b13] bg-[#f8f6f1] px-4 py-3">
                <h3 className="text-sm font-semibold text-[#946b13] sm:text-base">
                  Suggested remedy
                </h3>
                <p className="mt-1 text-sm leading-6 text-black sm:text-base">
                  {selectedPlanet.remedy}
                </p>
              </div>
            </article>
            <p className="mt-6 text-xs leading-5 text-[#594b41] sm:text-sm">
              This suggestion reflects traditional astrological beliefs and is
              shared for general information. Personalised guidance may depend
              on an individual birth chart.
            </p>
          </>
        ) : !selectedPlanet ? (
          <p className="rounded-none rounded-bl-2xl border border-[#946b13]/35 bg-white p-5 text-center text-sm text-[#594b41] shadow-[0_8px_24px_rgba(77,0,30,0.2),0_3px_8px_rgba(148,107,19,0.22)] sm:text-base">
            Select a planet from the remedies page to view its details.
          </p>
        ) : null}
      </div>
    </main>
  );
};

export default LalKitabPlanetRemediesPage;
