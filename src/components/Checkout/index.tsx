import { Product } from '@/utils/types/products';
import Image from 'next/image';

export default function ProductCheckout({ product }: { product: Product }) {
  return (
    <div className="flex flex-col rounded-lg bg-white sm:flex-row">
      <Image
        className="m-2 h-24 w-28 rounded-md border object-cover object-center"
        src={product.images[0]}
        width={122}
        height={96}
        alt={product.title}
      />
      <div className="flex w-full flex-col px-4 py-4">
        <span className="font-semibold">{product.title}</span>
        <p className="text-lg font-bold">${product.price}</p>
        <span>Cantidad: {product.quantity}</span>
      </div>
    </div>
  );
}
