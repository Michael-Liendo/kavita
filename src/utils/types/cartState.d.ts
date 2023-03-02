export type CartState = {
  cart: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (productIndex: number) => void;
  decrementQuantity: (product: Product) => void;
};
