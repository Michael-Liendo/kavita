import { Product } from '@/utils/types/products';
import { act } from '@testing-library/react';
import { useCart } from '../store/ShopStore';

describe('useCart', () => {
  const product1: Product = {
    _id: 'ID1',
    title: 'Product 1',
    price: 10,
    description: '',
    images: [],
    category: { id: 1, image: '', name: 'text' },
  };
  const product2: Product = {
    _id: 'ID2',
    title: 'Product 2',
    price: 20,
    description: '',
    images: [],
    category: { id: 2, image: '', name: 'sea' },
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
    expect(cart).toEqual([{ ...product1, quantity: 1 }]);
  });

  it('should increment the quantity of an existing product', () => {
    const { addProduct, cart } = useCart.getState();

    act(() => {
      addProduct(product1);
    });

    act(() => {
      addProduct(product1);
    });

    expect(cart).toEqual([{ ...product1, quantity: 3 }]);
  });

  it('should remove a product from the cart', () => {
    const { addProduct, removeProduct } = useCart.getState();

    act(() => {
      addProduct(product2);
    });
    act(() => {
      removeProduct(0);
    });
    const { cart } = useCart.getState();

    expect(cart).toEqual([{ ...product2, quantity: 1 }]);
  });
});
