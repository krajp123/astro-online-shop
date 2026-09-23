const CartPage = () => {
  return <section className="mx-auto max-w-[1000px] px-4 py-20 text-white sm:px-8"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f3c969]">Your cosmic collection</p><h1 className="mt-3 text-4xl font-black tracking-[-0.06em]">Your bag is waiting.</h1><div className="mt-10 rounded-2xl border border-white/10 bg-[#11183a] px-6 py-12 text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#f3c969]/50 text-2xl text-[#f3c969]">✦</div><p className="mt-5 font-bold">No stones in your bag yet</p><p className="mt-2 text-sm text-white/45">Explore the collection and find something aligned with you.</p><a href="/products" className="mt-7 inline-flex rounded-full bg-[#f3c969] px-6 py-3 text-sm font-bold text-[#0b1026]">Explore gemstones</a></div></section>;
};

export default CartPage;
