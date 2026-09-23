const ProductsPage = () => {
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-14 text-white sm:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f3c969]">The celestial collection</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-5"><div><h1 className="text-4xl font-black tracking-[-0.06em] sm:text-5xl">Shop by intention</h1><p className="mt-3 text-white/55">Natural gems, pendants and malas aligned to your journey.</p></div><button className="rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-[#f3c969]">Filter & sort <span className="ml-3">⌄</span></button></div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{['Birthstones', 'Pendants', 'Healing crystals', 'Rudraksha'].map((item) => <div key={item} className="rounded-xl border border-white/10 bg-[#11183a] p-6 transition hover:border-[#f3c969]/60"><span className="text-3xl text-[#f3c969]">✦</span><h2 className="mt-6 font-bold">{item}</h2><p className="mt-2 text-sm text-white/45">Explore the collection →</p></div>)}</div>
    </section>
  );
};

export default ProductsPage;
