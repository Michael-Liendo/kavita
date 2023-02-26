import { CartState } from '@/utils/types/cartState';
import { Product } from '@/utils/types/products';
import { createClient } from 'next-sanity';
import { create } from 'zustand';

export const useClient = create(() => ({
  client: createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2022-03-25',
    useCdn: false,
  }),
}));

export const useCart = create<CartState>((set, get) => ({
  cart: [],
  cartAnimated: false,
  setCartAnimated: (value: boolean) => {
    set(() => ({
      cartAnimated: value,
    }));
  },
  addProduct: (product: Product) => {
    const { cart } = get();

    const index = cart.findIndex(({ _id }: { _id: string }) => _id === product._id);

    if (index < 0) {
      set({ cart: [...cart, product] });
    } else {
      cart[index].quantity += 1;
      set({ cart: cart });
    }
  },
  removeProduct: (productIndex: number) => {
    const { cart } = get();
    set({
      cart: cart.filter((value, index) => index !== productIndex),
    });
  },
  decrementQuantity: (product: Product) => {
    const { cart, removeProduct } = get();

    const index = cart.findIndex(({ _id }) => _id === product._id);

    if (index < 0) {
      set({ cart: [...cart, product] });
    } else {
      if (cart[index].quantity <= 1) {
        removeProduct(index);
      } else {
        cart[index].quantity -= 1;
        set({ cart: cart });
      }
    }
  },
}));
