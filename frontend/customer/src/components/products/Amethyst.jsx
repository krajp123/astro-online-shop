import StoneHero from './StoneHero';
import ProductCollectionGrid from '../common/ProductCollectionGrid';
import amethystProducts from '../../data/amethystProducts';

const AmethystPage = () => {
  const description = 'Explore Amethyst crystals, jewellery, and Aquarius designs.';

  return (
    <main className="min-h-[60vh] bg-[#f5f1eb]">
      <StoneHero
        name="Amethyst"
        image="/Amthyst/Amethyst.png"
        eyebrow="Amethyst · Violet quartz"
        headline="A vivid touch of violet"
        description="Explore amethyst crystals, towers, jewellery, and zodiac designs selected for their rich colour and natural character."
      />
      <ProductCollectionGrid name="Amethyst" description={description} products={amethystProducts} />
    </main>
  );
};

export default AmethystPage;
