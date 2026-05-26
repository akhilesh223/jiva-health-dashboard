import { create } from 'zustand';
import { FamilyMember } from '../types/family';
import { mockFamilyMembers } from '../data/mockData';

interface FamilyState {
  members: FamilyMember[];
  setMembers: (members: FamilyMember[]) => void;
  addMember: (member: FamilyMember) => void;
  updateMember: (member: FamilyMember) => void;
  deleteMember: (id: string) => void;
}

export const useFamilyStore = create<FamilyState>((set) => ({
  members: mockFamilyMembers,
  setMembers: (members) => set({ members }),
  addMember: (member) => set((state) => ({ members: [...state.members, member] })),
  updateMember: (updatedMember) => set((state) => ({
    members: state.members.map((m) => (m.id === updatedMember.id ? updatedMember : m))
  })),
  deleteMember: (id) => set((state) => ({
    members: state.members.filter((m) => m.id !== id)
  })),
}));
