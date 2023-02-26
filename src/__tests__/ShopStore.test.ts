import { Product } from '@/utils/types/products';
import { act } from '@testing-library/react';
import { useCart } from '../store/ShopStore';

describe('useCart', () => {
  const product1: Product = {
    _id: 'ting',
    title: 'Product 1',
    price: 10,
    quantity: 0,
    description: '',
    images: [],
    category: { id: 1, image: '', name: 'text' },
  };
  const product2: Product = {
    _id: 'test',
    title: 'Product 2',
    price: 20,
    quantity: 0,
    description: '',
    images: [],
    category: { id: 1, image: '', name: 'text' },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add a product to the cart', () => {
    const { addProduct } = useCart.getState();

    act(() => {
      addProduct(product1);
    });

    const { cart } = useCart.getState();
    expect(cart).toEqual([product1]);
  });

  it('should increment the quantity of an existing product', () => {
    const { addProduct, decrementQuantity } = useCart.getState();

    act(() => {
      addProduct(product1);
    });

    act(() => {
      addProduct(product1);
    });

    const { cart } = useCart.getState();
    expect(cart).toEqual([{ ...product1, quantity: 2 }]);

    act(() => {
      decrementQuantity(product1);
    });

    const { cart: updatedCart } = useCart.getState();
    expect(updatedCart).toEqual([{ ...product1, quantity: 1 }]);
  });

  it('should remove a product from the cart', () => {
    const { addProduct, removeProduct } = useCart.getState();

    act(() => {
      addProduct(product1);
    });

    act(() => {
      addProduct(product2);
    });

    const { cart } = useCart.getState();
    expect(cart).toEqual([product1, product2]);

    act(() => {
      removeProduct(0);
    });

    const { cart: updatedCart } = useCart.getState();
    expect(updatedCart).toEqual([product2]);
  });
});
