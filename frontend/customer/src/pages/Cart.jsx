import { useCustomerStore } from '../store/useCustomerStore';

const CartPage = () => {
  const cart = useCustomerStore((state) => state.cart);
  const cartTotal = cart.reduce((total, item) => {
    const price = Number(String(item.price || '').replace(/[^\d.]/g, '')) || 0;
    return total + price * (item.quantity || 1);
  }, 0);

  return (
    <section className="mx-auto max-w-[1000px] px-4 py-20 text-[#201b3a] sm:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b8863c]">Your cosmic collection</p>
      <h1 className="mt-3 text-4xl font-bold leading-tight tracking-normal">{cart.length ? 'Your cart' : 'Your cart is waiting.'}</h1>
      {cart.length ? (
        <div className="mt-10 space-y-4">
          {cart.map((item) => (
            <article key={`${item.name}-${item.image}`} className="flex items-center gap-4 rounded-2xl border border-[#201b3a]/10 bg-white p-4">
              <img src={item.image} alt={item.name} className="h-20 w-20 rounded-xl bg-[#f8f3ec] object-contain" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#75665a]">{item.category}</p>
                <h2 className="mt-1 font-bold text-[#201b3a]">{item.name}</h2>
                <p className="mt-1 text-sm text-[#5b5470]">Quantity: {item.quantity || 1}</p>
              </div>
              <p className="shrink-0 font-bold text-[#201b3a]">{item.price}</p>
            </article>
          ))}
          <p className="border-t border-[#201b3a]/10 pt-5 text-right text-lg font-bold">
            Total: ₹{cartTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-[#201b3a]/10 bg-[#f8f3ec] px-6 py-12 text-center shadow-[0_10px_30px_rgba(32,27,58,0.04)]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#f3c969]/50 bg-white text-2xl text-[#b8863c]">✦</div>
          <p className="mt-5 font-bold text-[#201b3a]">No products in your cart yet</p>
          <p className="mt-2 text-sm text-[#5b5470]">Explore the collection and find something aligned with you.</p>
          <a href="/products" className="mt-7 inline-flex rounded-full bg-[#201b3a] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#2d2453]">Explore Yantras</a>
        </div>
      )}
    </section>
  );
};

export default CartPage;
