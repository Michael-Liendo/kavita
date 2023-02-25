export type CartState = {
  cart: Product[];
  cartAnimated: boolean;
  addProduct: (product: Product) => void;
  removeProduct: (productIndex: number) => void;
  decrementQuantity: (product: Product) => void;
  setCartAnimated: (value) => void;
};
