const samplePrices = [
  2499, 1899, 3299, 1499, 2799, 3599, 999, 1299, 2199, 1699, 799,
  1199, 1399, 1099, 1299, 1499, 1199, 1399, 1599, 1499, 1699, 1299,
  999, 1199, 1099, 1299, 1399, 1199, 1499, 1299, 1399, 1599, 1299,
  1499, 1199, 999, 1099, 1399, 1299, 1199, 1499, 1599, 1399, 1299,
  1499, 1599, 1399, 1299, 1199,
];

const yantraProducts = [

  { name: 'Madhya Shakti Peeth Yantra', category: 'Special Yantra', image: '/Yantra/madhya-shakti-peeth-yantra.webp' },
  { name: 'Sarv Shakti Peeth Yantra', category: 'Special Yantra', image: '/Yantra/sarv-shakti-peeth-yantra.webp' },
  { name: 'Shakti Peeth Yantra', category: 'Special Yantra', image: '/Yantra/shakti-peeth-yantra.webp' },
  { name: 'Mahalaxmi Yantra', category: 'Special Yantra', image: '/Yantra/mahalaxmi-yantra.webp' },
  { name: 'Shree Baglamukhi Yantra', category: 'Special Yantra', image: '/Yantra/shree-baglamukhi-yantra.webp' },
  { name: 'Shree Shodashi Yantra', category: 'Special Yantra', image: '/Yantra/shree-shodashi-yantra.webp' },
  { name: 'Nazar Dosh Yantra', category: 'Special Yantra', image: '/Yantra/nazar-dosh-yantra.webp' },
  { name: 'Rog Nivaran Yantra', category: 'Special Yantra', image: '/Yantra/rog-nivaran-yantra.webp' },
  { name: 'Shani Yantra', category: 'Special Yantra', image: '/Yantra/shakni-yantra.webp' },
  { name: 'Vyapar Yantra', category: 'Special Yantra', image: '/Yantra/yvapar-yantra.webp' },
  { name: 'Sacred Mantra Yantra Coin', category: 'Special Yantra', image: '/Yantra/4_17b816da-cf12-45e2-878d-5a65c129b2f0.webp' },

  { name: 'Mesh (Aries) Rashi Yantra', category: 'Rashi Yantra', image: '/Yantra/mesh-rashi-2.webp' },
  { name: 'Vrishabh (Taurus) Rashi Yantra', category: 'Rashi Yantra', image: '/Yantra/vrishabh-rashi.webp' },
  { name: 'Mithun (Gemini) Rashi Yantra', category: 'Rashi Yantra', image: '/Yantra/mithun-rashi-2.webp' },
  { name: 'Kark (Cancer) Rashi Yantra', category: 'Rashi Yantra', image: '/Yantra/kark-rashi-2.webp' },
  { name: 'Singh (Leo) Rashi Yantra', category: 'Rashi Yantra', image: '/Yantra/singh-rashi-2.webp' },
  { name: 'Kanya (Virgo) Rashi Yantra', category: 'Rashi Yantra', image: '/Yantra/kanya-rashi-2.webp' },
  { name: 'Tula (Libra) Rashi Yantra', category: 'Rashi Yantra', image: '/Yantra/tula-rashi-2.webp' },
  { name: 'Vrishchik (Scorpio) Rashi Yantra', category: 'Rashi Yantra', image: '/Yantra/vrishchik-rashi-2.webp' },
  { name: 'Dhanu (Sagittarius) Rashi Yantra', category: 'Rashi Yantra', image: '/Yantra/dhanu-rashi-2.webp' },
  { name: 'Makar (Capricorn) Rashi Yantra', category: 'Rashi Yantra', image: '/Yantra/makar-rashi-2.webp' },
  { name: 'Kumbh (Aquarius) Rashi Yantra', category: 'Rashi Yantra', image: '/Yantra/kumbh-rashi-2.webp' },
  { name: 'Meen (Pisces) Rashi Yantra', category: 'Rashi Yantra', image: '/Yantra/meen-rashi-2.webp' },

  { name: 'Ashwini Nakshatra Yantra', category: 'Nakshatra Yantra', image: '/Yantra/ashwani_yantra_0a490f65-f4c3-4802-a2c0-249d5cf2ad59.webp' },
  { name: 'Bharani Nakshatra Yantra', category: 'Nakshatra Yantra', image: '/Yantra/bharni_yantra.webp' },
  { name: 'Krittika Nakshatra Yantra', category: 'Nakshatra Yantra', image: '/Yantra/kritika_yantra.webp' },
  { name: 'Rohini Nakshatra Yantra', category: 'Nakshatra Yantra', image: '/Yantra/rohini_yantra.webp' },
  { name: 'Mrigashira Nakshatra Yantra', category: 'Nakshatra Yantra', image: '/Yantra/mrigshira_yantra.webp' },
  { name: 'Ardra Nakshatra Yantra', category: 'Nakshatra Yantra', image: '/Yantra/Ardra_yantra.webp' },
  { name: 'Punarvasu Nakshatra Yantra', category: 'Nakshatra Yantra', image: '/Yantra/punarvasu_yantra.webp' },
  { name: 'Pushya Nakshatra Yantra', category: 'Nakshatra Yantra', image: '/Yantra/pushya_yantra.webp' },
  { name: 'Ashlesha Nakshatra Yantra', category: 'Nakshatra Yantra', image: '/Yantra/yantra1.webp' },
  { name: 'Magha Nakshatra Yantra', category: 'Nakshatra Yantra', image: '/Yantra/magha_yantra.webp' },
  { name: 'Purva Phalguni Nakshatra Yantra', category: 'Nakshatra Yantra', image: '/Yantra/purva-falguni_yantra.webp' },
  { name: 'Uttara Phalguni Nakshatra Yantra', category: 'Nakshatra Yantra', image: '/Yantra/utra-phalguni_yantra.webp' },
  { name: 'Hasta Nakshatra Yantra', category: 'Nakshatra Yantra', image: '/Yantra/hast_yantra.webp' },
  { name: 'Chitra Nakshatra Yantra', category: 'Nakshatra Yantra', image: '/Yantra/chitra_yantra.webp' },
  { name: 'Swati Nakshatra Yantra', category: 'Nakshatra Yantra', image: '/Yantra/swati_yantra.webp' },
  { name: 'Vishakha Locket', category: 'Nakshatra Locket', image: '/Yantra/vishakha_locket.webp' },
  { name: 'Anuradha Locket', category: 'Nakshatra Locket', image: '/Yantra/anuradha_locket.webp' },
  { name: 'Jyeshtha Nakshatra Yantra', category: 'Nakshatra Yantra', image: '/Yantra/jyestha_yantra.webp' },
  { name: 'Mula Nakshatra Yantra', category: 'Nakshatra Yantra', image: '/Yantra/moola_yantra.webp' },
  { name: 'Purva Ashadha Nakshatra Yantra', category: 'Nakshatra Yantra', image: '/Yantra/purva-shadaa_yantra.webp' },
  { name: 'Uttara Ashadha Nakshatra Yantra', category: 'Nakshatra Yantra', image: '/Yantra/utra-shaadaa_yantra.webp' },
  { name: 'Shravana Nakshatra Yantra', category: 'Nakshatra Yantra', image: '/Yantra/shravan_yantra.webp' },
  { name: 'Dhanishtha Nakshatra Yantra', category: 'Nakshatra Yantra', image: '/Yantra/dhanistha_yantra.webp' },
  { name: 'Shatabhisha Nakshatra Yantra', category: 'Nakshatra Yantra', image: '/Yantra/shatbhisha_yantra.webp' },
  { name: 'Purva Bhadrapada Nakshatra Yantra', category: 'Nakshatra Yantra', image: '/Yantra/purva-bhadarpad_yantra.webp' },
  { name: 'Revati Nakshatra Yantra', category: 'Nakshatra Yantra', image: '/Yantra/revti_yantra.webp' },
].map((product, index) => ({
  ...product,
  price: `₹${samplePrices[index].toLocaleString('en-IN')}.00`,
}));

export { yantraProducts };

export const getYantraProductSlug = (name) =>
  name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const getYantraProductBySlug = (slug) =>
  yantraProducts.find((product) => getYantraProductSlug(product.name) === slug);

export const getYantraProductImages = (product) => {
  if (!product) return [];
  if (product.images?.length) return product.images;
  return product.image ? [product.image] : [];
};

export const getProductImage = (product) => getYantraProductImages(product)[0];

export default yantraProducts;
