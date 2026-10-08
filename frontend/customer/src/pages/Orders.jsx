const OrdersPage = () => {
  return (
    <section className="mx-auto max-w-[1000px] px-4 py-20 text-[#201b3a] sm:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b8863c]">Your journey</p>
      <h1 className="mt-3 text-4xl font-bold leading-tight tracking-normal">Orders & guidance</h1>
      <div className="mt-10 rounded-2xl border border-[#201b3a]/10 bg-[#f8f3ec] p-8 shadow-[0_10px_30px_rgba(32,27,58,0.04)]">
        <h2 className="font-bold text-[#201b3a]">Sign in to see your orders</h2>
        <p className="mt-2 text-sm text-[#5b5470]">Track your stones, certificates and delivery updates in one place.</p>
        <button className="mt-6 rounded-full bg-[#201b3a] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#2d2453]">Sign in</button>
      </div>
    </section>
  );
};

export default OrdersPage;
