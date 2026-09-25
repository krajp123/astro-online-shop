const ProductsPage = () => {
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-14 text-[#201b3a] sm:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b8863c]">The celestial collection</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-5">
        <div>
          <h1 className="text-4xl font-bold leading-tight tracking-normal sm:text-5xl">Shop by intention</h1>
          <p className="mt-3 text-[#5b5470]">Natural gems, pendants and malas aligned to your journey.</p>
        </div>
        <button className="rounded-full border border-[#201b3a]/15 bg-white px-5 py-3 text-sm font-bold text-[#201b3a] transition hover:border-[#f3c969]">Filter & sort <span className="ml-3">⌄</span></button>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {['Birthstones', 'Pendants', 'Healing crystals', 'Rudraksha'].map((item) => (
          <div key={item} className="rounded-xl border border-[#201b3a]/10 bg-[#f8f3ec] p-6 transition hover:border-[#f3c969]/60 shadow-[0_10px_30px_rgba(32,27,58,0.03)]">
            <span className="text-3xl text-[#b8863c]">✦</span>
            <h2 className="mt-6 font-bold text-[#201b3a]">{item}</h2>
            <p className="mt-2 text-sm text-[#5b5470]">Explore the collection →</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsPage;
