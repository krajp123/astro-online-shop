// Zustand store for the customer app.
// Holds buyer preferences, cart state, user session, and UI state.
import { create } from 'zustand';

export const useCustomerStore = create((set) => ({
  user: null,
  cart: [],
  wishlist: [],
  setUser: (user) => set({ user }),
  setCart: (cart) => set({ cart }),
  setWishlist: (wishlist) => set({ wishlist })
}));
