import { getPublishedNewArrivalsProducts } from '@/lib/sanityFunctions';
import { Product } from '@/utils/types/products';
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function getProducts() {
      const products = await getPublishedNewArrivalsProducts();
      setProducts(products);
    }
    getProducts();
  }, []);
  return (
    <div className="mt-7">
      <h3 className="text-2xl mb-3">Nuevos productos</h3>
      <hr />
      <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}
