import citrineProducts from '../../data/citrineProducts';
import StoneHero from './StoneHero';
import ProductCollectionGrid from '../common/ProductCollectionGrid';

const CitrinePage = () => {
  return (
    <main className="min-h-[60vh] bg-[#f5f1eb]">
      <StoneHero
        name="Citrine"
        image="/Citrine/Selenite.png"
        eyebrow="Citrine · Warm golden tones"
        headline="Bring a golden glow to your collection"
        description="Discover the sunny hues of citrine in carefully selected crystals, bracelets, zodiac designs, and keepsake pieces."
      />

      <ProductCollectionGrid
        name="Citrine"
        description="Shop crystals, bracelets, zodiac designs, and more from our Citrine collection."
        products={citrineProducts}
      />
    </main>
  );
};

export default CitrinePage;
