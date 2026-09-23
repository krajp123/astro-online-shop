// Zustand store for the seller app.
// Holds seller session, inventory focus, dashboard state, and payout info.
import { create } from 'zustand';

export const useSellerStore = create((set) => ({
  seller: null,
  products: [],
  orders: [],
  setSeller: (seller) => set({ seller }),
  setProducts: (products) => set({ products }),
  setOrders: (orders) => set({ orders })
}));
