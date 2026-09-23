// Zustand store for the admin app.
// Holds platform-wide state such as users, sellers, and moderation metrics.
import { create } from 'zustand';

export const useAdminStore = create((set) => ({
  stats: null,
  users: [],
  sellers: [],
  setStats: (stats) => set({ stats }),
  setUsers: (users) => set({ users }),
  setSellers: (sellers) => set({ sellers })
}));
