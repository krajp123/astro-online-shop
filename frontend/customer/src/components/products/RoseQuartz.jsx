import StoneHero from './StoneHero';
import ProductCollectionGrid from '../common/ProductCollectionGrid';
import roseQuartzProducts from '../../data/roseQuartzProducts';

const RoseQuartzPage = () => {
  const description = 'Shop Rose Quartz crystals, jewellery, and love-attraction designs.';

  return (
    <main className="min-h-[60vh] bg-[#f8f6f1]">
      <StoneHero
        name="Rose Quartz"
        image="/Rose Quartz/Rose Quartz.png"
        eyebrow="Rose Quartz · Gentle blush tones"
        headline="A soft blush, made to be treasured"
        description="Browse rose quartz crystals, delicate jewellery, and expressive pieces in the stone’s signature pink tones."
      />
      <ProductCollectionGrid name="Rose Quartz" description={description} products={roseQuartzProducts} />
    </main>
  );
};

export default RoseQuartzPage;
