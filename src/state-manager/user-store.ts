import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  role: string;
  // thêm các field khác nếu cần
}

interface State {
  user: User | null;
}

interface Actions {
  setUser: (user: User | null) => void;
}

const useUserStore = create<State & Actions>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User | null) => set({ user }),
    }),
    {
      name: 'user-storage',
    }
  )
);

export default useUserStore;
