import { CartState } from '@/utils/types/cartState';
import { Product } from '@/utils/types/products';
import { toast } from 'react-toastify';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCart = create(
  persist<CartState>(
    (set, get) => ({
      cart: [],
      cartAnimated: false,
      setCartAnimated: (value: boolean) => {
        set(() => ({
          cartAnimated: value,
        }));
      },
      addProduct: (product: Product) => {
        const { cart } = get();

        toast.success(`${product.title.slice(0, 20)} added to cart`);

        const index = cart.findIndex(({ _id }: { _id: string }) => _id === product._id);

        if (index < 0) {
          set({ cart: [...cart, { ...product, quantity: 1 }] });
        } else {
          cart[index].quantity += 1;
          set({ cart: cart });
        }
      },
      removeProduct: (productIndex: number) => {
        const { cart } = get();

        toast.info(`${cart[productIndex].title.slice(0, 15)} removed from cart`);
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
    }),
    { name: 'store-storage' },
  ),
);
