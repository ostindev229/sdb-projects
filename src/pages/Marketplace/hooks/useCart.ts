import { create } from 'zustand';
import { CartState, CartItem } from '../types/cart';

export const useCart = create<CartState>((set) => ({
  items: [],
  isOpen: false,
  addItem: (item: CartItem) =>
    set((state) => ({
      items: [...state.items, item],
    })),
  removeItem: (itemId: string) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    })),
  updateQuantity: (itemId: string, quantity: number) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      ),
    })),
  clearCart: () => set({ items: [] }),
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
}));