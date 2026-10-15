import StoneHero from './StoneHero';
import ProductCollectionGrid from '../common/ProductCollectionGrid';
import lapisLazuliProducts from '../../data/lapisLazuliProducts';

const LapisLazuliPage = () => {
  const description = 'Explore Lapis Lazuli crystals, zodiac jewellery, and symbolic designs.';

  return (
    <main className="min-h-[60vh] bg-[#f8f6f1]">
      <StoneHero
        name="Lapis Lazuli"
        image="/Lapis lazuli/Lapis Lazuli.png"
        eyebrow="Lapis Lazuli · Deep blue stone"
        headline="Deep blue. Naturally distinctive"
        description="Explore lapis lazuli crystals, zodiac jewellery, and statement designs showcasing this stone’s unmistakable blue."
      />
      <ProductCollectionGrid name="Lapis Lazuli" description={description} products={lapisLazuliProducts} />
    </main>
  );
};

export default LapisLazuliPage;
