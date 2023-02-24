export default interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  quantity: number;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
}
