import pyriteProducts from '../../data/pyriteProducts';
import StoneHero from './StoneHero';
import ProductCollectionGrid from '../common/ProductCollectionGrid';

const isStone = (product) => /stone|raw pyrite/i.test(product.name) && !/bracelet|pendant/i.test(product.name);
const isPyramid = (product) => /pyramid/i.test(product.name);
const isOwl = (product) => /owl|wealth & wisdom combo/i.test(product.name);
const isTortoise = (product) => /tortoise|kachhua/i.test(product.name) && !/pendant/i.test(product.name);
const isBracelet = (product) => /bracelet/i.test(product.name);
const isPendant = (product) => /pendant/i.test(product.name);
const orderedPyriteProducts = [
  ...pyriteProducts.filter(isStone),
  ...pyriteProducts.filter(isPyramid),
  ...pyriteProducts.filter(isOwl),
  ...pyriteProducts.filter(isTortoise),
  ...pyriteProducts.filter(isBracelet),
  ...pyriteProducts.filter(isPendant),
  ...pyriteProducts.filter((product) => (
    !isStone(product)
    && !isPyramid(product)
    && !isOwl(product)
    && !isTortoise(product)
    && !isBracelet(product)
    && !isPendant(product)
  )),
];

const PyritePage = () => {
  return (
    <main className="min-h-[60vh] bg-[#f8f6f1]">
      <StoneHero
        name="Pyrite"
        image="/Pyrite.png"
        imagePosition="62%_center"
        eyebrow="Pyrite · Golden stone"
        headline="A golden statement in every form"
        description="Explore pyrite's metallic character across striking stone pieces, sculptural accents, and distinctive jewellery."
      />

      <ProductCollectionGrid
        name="Pyrite"
        description="Carefully curated pyrite pieces for vastu, wealth attraction and personal adornment."
        products={orderedPyriteProducts}
      />
    </main>
  );
};

export default PyritePage;
