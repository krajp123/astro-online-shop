import StoneHero from './StoneHero';
import ProductCollectionGrid from '../common/ProductCollectionGrid';
import seleniteProducts from '../../data/seleniteProducts';

const SelenitePage = () => {
  const description = 'Explore Selenite crystals, cleansing plates, and spiritual collections.';

  return (
    <main className="min-h-[60vh] bg-[#f5f1eb]">
      <StoneHero
        name="Selenite"
        image="/Selenite/Selenite.png"
        eyebrow="Selenite · Soft natural texture"
        headline="Quiet beauty in every detail"
        description="Discover the luminous look of selenite through sculptural plates, crystal forms, and thoughtfully paired designs."
      />
      <ProductCollectionGrid name="Selenite" description={description} products={seleniteProducts} />
    </main>
  );
};

export default SelenitePage;
