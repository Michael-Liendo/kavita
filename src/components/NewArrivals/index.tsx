import { useClient } from '@/store/ShopStore';
import { Product } from '@/utils/types/products';
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

export default function NewArrivals() {
  const { client } = useClient();
  const [newArrivalsProducts, setNewArrivalsProducts] = useState([]);

  useEffect(() => {
    async function getProducts(ids: string[]) {
      const weekProducts = await client.fetch(`*[_id in $ids]`, { ids });
      setNewArrivalsProducts(weekProducts);
    }

    async function getWeekSelection() {
      const newArrivals = await client.fetch(`*[_type == "newArrivals"]`);
      getProducts(newArrivals[0].products.map((product: { _ref: string }) => product._ref));
    }
    getWeekSelection();
  }, [client]);
  return (
    <div className="mt-7">
      <h3 className="text-2xl mb-3">New Arrivals</h3>
      <hr />
      <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {newArrivalsProducts.map((product: Product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}
