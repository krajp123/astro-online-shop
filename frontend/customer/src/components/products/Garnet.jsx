import garnetProducts from '../../data/garnetProducts';
import StoneHero from './StoneHero';
import ProductCollectionGrid from '../common/ProductCollectionGrid';

const GarnetPage = () => {
  return (
    <main className="min-h-[60vh] bg-[#f5f1eb]">
      <StoneHero
        name="Garnet"
        image="/Garnet/Garnet.png"
        eyebrow="Garnet · Deep red tones"
        headline="A rich red, made to stand apart"
        description="Discover garnet's deep colour in striking crystals, Capricorn jewellery, and distinctive pieces for your collection."
      />

      <ProductCollectionGrid
        name="Garnet"
        description="Shop Garnet crystals, Capricorn jewellery, and symbolic designs."
        products={garnetProducts}
      />
    </main>
  );
};

export default GarnetPage;
