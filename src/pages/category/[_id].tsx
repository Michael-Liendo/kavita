import Layout from '@/components/Layout';
import ProductCard from '@/components/NewArrivals/ProductCard';
import { getProductsWithCategory } from '@/lib/sanityFunctions';
import { Product } from '@/utils/types/products';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function CategoryPage() {
  const router = useRouter();
  const { _id } = router.query;

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function getProductsOfCategory() {
      const products = await getProductsWithCategory(_id as string);
      setProducts(products);
    }

    getProductsOfCategory();
  }, [_id]);

  return (
    <Layout title={`${products[0]?.category.name ?? ''} | Kavita`}>
      <h1 className="mt-5 text-4xl">{products[0]?.category.name ?? ''}</h1>
      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.length > 0 ? (
          products.map((product: Product, index) => <ProductCard key={index} product={product} />)
        ) : (
          <p>No hay productos en la categoría</p>
        )}
      </div>
    </Layout>
  );
}
