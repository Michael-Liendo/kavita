export type Product = {
  _id: string;
  title: string;
  price: number;
  description: string;
  quantity?: number;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
};
