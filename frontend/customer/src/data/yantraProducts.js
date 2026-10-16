const samplePrices = [
  2499, 1899, 3299, 1499, 2799, 3599, 999, 1299, 2199, 1699, 799,
  1199, 1399, 1099, 1299, 1499, 1199, 1399, 1599, 1499, 1699, 1299,
  999, 1199, 1099, 1299, 1399, 1199, 1499, 1299, 1399, 1599, 1299,
  1499, 1199, 999, 1099, 1399, 1299, 1199, 1499, 1599, 1399, 1299,
  1499, 1599, 1399, 1299, 1199,
];

const productLocketImages = {
  'Vishakha Locket': '/Yantra/vishakha_locket.webp',
  'Anuradha Locket': '/Yantra/anuradha_locket.webp',
  'Mesh (Aries) Rashi Yantra': '/Yantra/mesh-locket.webp',
  'Vrishabh (Taurus) Rashi Yantra': '/Yantra/vrishabh-locket.webp',
  'Mithun (Gemini) Rashi Yantra': '/Yantra/mithun-locket.webp',
  'Kark (Cancer) Rashi Yantra': '/Yantra/kark-locket.webp',
  'Singh (Leo) Rashi Yantra': '/Yantra/singh-locket.webp',
  'Kanya (Virgo) Rashi Yantra': '/Yantra/kanya-locket.webp',
  'Tula (Libra) Rashi Yantra': '/Yantra/tula-locket.webp',
  'Vrishchik (Scorpio) Rashi Yantra': '/Yantra/vrishchik-locket.webp',
  'Dhanu (Sagittarius) Rashi Yantra': '/Yantra/dhanu-locket.webp',
  'Makar (Capricorn) Rashi Yantra': '/Yantra/makar-locket.webp',
  'Kumbh (Aquarius) Rashi Yantra': '/Yantra/kumbh-locket.webp',
  'Meen (Pisces) Rashi Yantra': '/Yantra/meen-locket.webp',
  'Ashwini Nakshatra Yantra': '/Yantra/ashwani_locket_6a5856ba-da37-4bd8-9aea-6dffca0e79f6.webp',
  'Bharani Nakshatra Yantra': '/Yantra/bharni_locket.webp',
  'Krittika Nakshatra Yantra': '/Yantra/kritika_locket.webp',
  'Rohini Nakshatra Yantra': '/Yantra/rohini_locket.webp',
  'Mrigashira Nakshatra Yantra': '/Yantra/mrigshira_locket.webp',
  'Ardra Nakshatra Yantra': '/Yantra/Ardra_locket.webp',
  'Punarvasu Nakshatra Yantra': '/Yantra/punarvasu_locket.webp',
  'Pushya Nakshatra Yantra': '/Yantra/pushya_locket.webp',
  'Magha Nakshatra Yantra': '/Yantra/magha_locket.webp',
  'Purva Phalguni Nakshatra Yantra': '/Yantra/purva-faalguni_locket.webp',
  'Uttara Phalguni Nakshatra Yantra': '/Yantra/utra-phalguni_locket.webp',
  'Hasta Nakshatra Yantra': '/Yantra/hast_locket.webp',
  'Chitra Nakshatra Yantra': '/Yantra/chitra_locket.webp',
  'Swati Nakshatra Yantra': '/Yantra/swati_locket.webp',
  'Jyeshtha Nakshatra Yantra': '/Yantra/jyestha_locket.webp',
  'Mula Nakshatra Yantra': '/Yantra/moola_locket.webp',
  'Purva Ashadha Nakshatra Yantra': '/Yantra/purva-shaada_locket.webp',
  'Shravana Nakshatra Yantra': '/Yantra/shravan_locket_1.webp',
  'Dhanishtha Nakshatra Yantra': '/Yantra/dhanistha_locket.webp',
  'Shatabhisha Nakshatra Yantra': '/Yantra/shatbhisha_locket.webp',
  'Purva Bhadrapada Nakshatra Yantra': '/Yantra/purva-bhadarpad_locket.webp',
  'Revati Nakshatra Yantra': '/Yantra/revti_locket.webp',
  'Ashlesha Nakshatra Yantra': '/Yantra/yantra2.webp',
  'Uttara Bhadrapada Nakshatra Yantra': '/Yantra/3_1f1520c3-a148-490f-b53c-1151de6f6539.webp',
};

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
  { name: 'Uttara Bhadrapada Nakshatra Yantra', category: 'Nakshatra Yantra', image: '/Yantra/4_17b816da-cf12-45e2-878d-5a65c129b2f0.webp' },

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
  ...(productLocketImages[product.name]
    ? {
        images: [product.image, productLocketImages[product.name]],
        locketImage: productLocketImages[product.name],
        locketPrice: `₹${(2500 + ((index * 137) % 2500)).toLocaleString('en-IN')}.00`,
        ...(product.name === 'Vishakha Locket' || product.name === 'Anuradha Locket'
          ? {
              variantNames: {
                Yantra: `${product.name.split(' ')[0]} Nakshatra Yantra`,
                Locket: `${product.name.split(' ')[0]} Nakshatra Yantra Locket`,
              },
            }
          : {}),
      }
    : {}),
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
