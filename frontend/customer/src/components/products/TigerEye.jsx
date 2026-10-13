import StoneHero from './StoneHero';
import tigerEyeProducts from '../../data/tigerEyeProducts';
import ProductCollectionGrid from '../common/ProductCollectionGrid';

const TigerEyePage = () => {
  return (
    <main className="min-h-[60vh] bg-[#f5f1eb]">
      <StoneHero
        name="Tiger Eye"
        image="/Tiger Eye/Tiger Eye.png"
        eyebrow="Tiger Eye · Natural banded stone"
        headline="Striking bands. Everyday character"
        description="Explore Tiger Eye's distinctive golden-brown bands in natural stones, zodiac bracelets, and expressive designs."
      />

      <ProductCollectionGrid
        name="Tiger Eye"
        description="Shop Tiger Eye crystals, zodiac bracelets, and symbolic designs."
        products={tigerEyeProducts}
      />
    </main>
  );
};

export default TigerEyePage;
