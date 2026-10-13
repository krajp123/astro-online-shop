// Root app component for the seller frontend.
// Serves the seller dashboard and operational routes.
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <h1 className="text-xl font-bold">Seller App</h1>
          <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-600">
            <span>Dashboard</span>
            <span>Products</span>
            <span>Orders</span>
            <span>Payouts</span>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <Routes>
          <Route path="/" element={<div>Seller dashboard placeholder</div>} />
          <Route path="/products" element={<div>Seller products placeholder</div>} />
          <Route path="/orders" element={<div>Seller orders placeholder</div>} />
          <Route path="/payouts" element={<div>Payouts placeholder</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
