const CartPage = () => {
  return (
    <section className="mx-auto max-w-[1000px] px-4 py-20 text-[#201b3a] sm:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b8863c]">Your cosmic collection</p>
      <h1 className="mt-3 text-4xl font-black tracking-[-0.06em]">Your cart is waiting.</h1>
      <div className="mt-10 rounded-2xl border border-[#201b3a]/10 bg-[#f8f3ec] px-6 py-12 text-center shadow-[0_10px_30px_rgba(32,27,58,0.04)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#f3c969]/50 bg-white text-2xl text-[#b8863c]">✦</div>
        <p className="mt-5 font-bold text-[#201b3a]">No stones in your cart yet</p>
        <p className="mt-2 text-sm text-[#5b5470]">Explore the collection and find something aligned with you.</p>
        <a href="/products" className="mt-7 inline-flex rounded-full bg-[#201b3a] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#2d2453]">Explore gemstones</a>
      </div>
    </section>
  );
};

export default CartPage;
