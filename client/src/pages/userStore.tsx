import { create } from 'zustand';
// create function from zustand library 
import { persist } from 'zustand/middleware';

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}
// structure of the store (just a model) 
// with a user object, and two functoins 

// the actual state container that holds user-related data
export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'user-storage', // key in localStorage/database
    }
  )
);
// set function allows you to replace or merge state

// a store is a centralised place 
// to store and manage a shared application state
// can access and update from everywhere