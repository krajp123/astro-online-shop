// Root app component for the admin frontend.
// Serves the administration and platform oversight routes.
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold">Admin App</h1>
          <nav className="flex gap-4 text-sm text-slate-600">
            <span>Overview</span>
            <span>Users</span>
            <span>Sellers</span>
            <span>Orders</span>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <Routes>
          <Route path="/" element={<div>Admin overview placeholder</div>} />
          <Route path="/users" element={<div>Users management placeholder</div>} />
          <Route path="/sellers" element={<div>Sellers management placeholder</div>} />
          <Route path="/orders" element={<div>Orders management placeholder</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
