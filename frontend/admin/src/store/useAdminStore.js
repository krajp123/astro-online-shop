// Zustand store for the admin app.
// Holds store administration state such as products, users, and sales metrics.
import { create } from 'zustand';

export const useAdminStore = create((set) => ({
  stats: null,
  products: [],
  users: [],
  setStats: (stats) => set({ stats }),
  setProducts: (products) => set({ products }),
  setUsers: (users) => set({ users })
}));
