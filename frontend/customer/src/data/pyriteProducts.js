const pyriteProducts = [
  { name: 'Raw Pyrite Stone', category: 'Pyrite', price: 'Rs. 499.00', image: '/Pyrite/raw_pyrite_stone.webp' },
  { name: 'Maa Laxmi Siddh Raw Pyrite', category: 'Pyrite', price: 'Rs. 799.00', image: '/Pyrite/Maa_Laxmi_Siddh_Raw_Pyrite_Stone_.webp' },
  { name: 'Pyrite Owl', category: 'Pyrite', price: 'Rs. 1,499.00', image: '/Pyrite/Pyrite Owl.webp' },
  { name: 'Pyrite Owl with Selenite Plate', category: 'Pyrite', price: 'Rs. 1,999.00', image: '/Pyrite/Pyrite Owl with Free Square Selenite Plate.webp' },
  { name: 'Pyrite Tortoise Pendant', category: 'Pyrite', price: 'Rs. 899.00', image: '/Pyrite/Pyrite Tortoise Pendant.webp' },
  { name: 'Pyrite Bracelet (Raw)', category: 'Pyrite', price: 'Rs. 899.00', image: '/Pyrite/RAW_Pyrite_Bracelet_for_Women.webp' },
  { name: 'Pyrite Money Magnet Pyramid', category: 'Pyrite', price: 'Rs. 1,299.00', image: '/Pyrite/Money_Magnet_1b_6.webp' },
  { name: 'Pyrite Bracelet with Selenite', category: 'Pyrite', price: 'Rs. 1,099.00', image: '/Pyrite/Raw_Pyrite_Bracelet_with_Raw_Selenite.webp' },
  { name: 'Richie Rich Bracelet (Pyrite + Obsidian)', category: 'Pyrite', price: 'Rs. 1,199.00', image: '/Pyrite/Richie_Rich_Bracelet_with_Pyrite_Black_Obsidian.webp' },
  { name: 'Vastu Pyrite Tortoise', category: 'Pyrite', price: 'Rs. 1,299.00', image: '/Pyrite/Vastu Pyrite Tortoise.png' },
  { name: 'Dhan Labh Tortoise', category: 'Pyrite', price: 'Rs. 1,350.00', image: '/Pyrite/Dhan Labh Tortoise.webp' },
  { name: 'Pyrite Ganesh Ji Murti with Bracelet', category: 'Pyrite', price: 'Rs. 2,499.00', image: '/Pyrite/Pyrite Ganesh Ji Murti with Wealth OM Pyrite Bracelet.webp' },
  { name: 'Pyrite Pyramid with Selenite Plate Combo', category: 'Pyrite', price: 'Rs. 2,199.00', image: '/Pyrite/Money Magnet Pyrite Pyramid with Free Square Raw Selenite Plate.webp' },
  { name: 'Om Pyrite Bracelet with Raw Selenite', category: 'Pyrite', price: 'Rs. 999.00', image: '/Pyrite/Om_Pyrite_Bracelet_with_Raw_Selenite.webp' },
  { name: 'Pyrite Pendant (Raw)', category: 'Pyrite', price: 'Rs. 599.00', image: '/Pyrite/Raw Pyrite Pendant.webp' },
  { name: 'Maha Lakshmi Siddh Vastu Pyrite Tortoise', category: 'Pyrite', price: 'Rs. 999.00', image: '/Pyrite/image_1.png' },
  { name: 'Rinmukteshwar Siddh Vastu Pyrite Tortoise (Kachhua)', category: 'Pyrite', price: 'Rs. 999.00', image: '/Pyrite/1_100.webp' },
  { name: 'Vastu Pyrite Tortoise (Kachhua)', category: 'Pyrite', price: 'Rs. 999.00', image: '/Pyrite/Vastu_Pyrite_Tortoise_Kachhua.jpg' },
  { name: 'Vastu Pyrite Tortoise with Selenite Plate', category: 'Pyrite', price: 'Rs. 999.00', image: '/Pyrite/Vastu Pyrite Tortoise with Free Square Raw Selenite Plate.webp' },
  { name: 'Vastu Pyrite Wealth & Wisdom Combo', category: 'Pyrite', price: 'Rs. 999.00', image: '/Pyrite/Vastu Pyrite Wealth & Wisdom Combo.webp' },
  { name: 'Pyrite Tumble', category: 'Pyrite', price: 'Rs. 999.00', image: '/Pyrite/Pyrite_1.webp' },
  { name: 'Money Maker Pyrite Bracelet', category: 'Pyrite', price: 'Rs. 999.00', image: '/Pyrite/Money_Maker_Bracelet.webp' },
  { name: 'Dhan Laxmi Pyrite Bracelet', category: 'Pyrite', price: 'Rs. 999.00', image: '/Pyrite/Dhan_Laxmi_Bracelet.png' },
  { name: 'Dhan Yog Pyrite Bracelet', category: 'Pyrite', price: 'Rs. 999.00', image: '/Pyrite/DhanYog_Bracelet.webp' },
];

export const getPyriteProductSlug = (name) =>
  name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const getPyriteProductBySlug = (slug) =>
  pyriteProducts.find((product) => getPyriteProductSlug(product.name) === slug);

export default pyriteProducts;
