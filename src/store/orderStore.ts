import { create } from 'zustand';
import { Order } from '../types/order';
import { mockOrders } from '../data/mockData';

interface OrderState {
  orders: Order[];
  setOrders: (orders: Order[]) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: mockOrders,
  setOrders: (orders) => set({ orders }),
}));
