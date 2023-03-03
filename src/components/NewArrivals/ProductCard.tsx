import { useCart } from '@/store/ShopStore';
import { Product } from '@/utils/types/products';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }: { product: Product }) {
  const { addProduct } = useCart();

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
      <Link href={`/product/${product._id}`} className="flex justify-center">
        <Image
          className="p-8 object-cover h-80 rounded-t-lg"
          src={product.images[0]}
          alt={product.title}
          width={900}
          height={900}
        />
      </Link>
      <div className="px-5 pb-5">
        <Link href={`/product/${product._id}`}>
          <h5
            title={product.title}
            className="text-xl font-semibold truncate tracking-tight text-gray-900"
          >
            {product.title}
          </h5>
        </Link>

        <div className="flex mt-5 items-center justify-between">
          <span className="text-3xl tracking-tight text-gray-900">${product.price}</span>
          <button
            onClick={() => addProduct(product)}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
