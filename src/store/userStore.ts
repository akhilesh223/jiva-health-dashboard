import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types/user';
import { mockUsers } from '../data/mockData';

interface UserState {
  users: User[];
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      users: mockUsers,
      setUsers: (users) => set({ users }),
      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      updateUser: (updatedUser) => set((state) => ({
        users: state.users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      })),
      deleteUser: (id) => set((state) => ({
        users: state.users.filter((user) => user.id !== id)
      })),
    }),
    {
      name: 'jiva-user-storage', // name of the item in the storage (must be unique)
    }
  )
);
