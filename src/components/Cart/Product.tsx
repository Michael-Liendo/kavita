import Image from 'next/image';
import Trash from '../Icons/Trash';
import { useCart } from '../../store/ShopStore';
import { Product } from '@/utils/types/products';

export default function ProductCart({ product, index }: { product: Product; index: number }) {
  const { removeProduct, addProduct, decrementQuantity } = useCart();

  return (
    <div className="flex my-2.5">
      <div>
        <Image
          src={product.images[0]}
          className="rounded-sm w-20 h-20 object-cover"
          alt={product.title}
          width="1000"
          height="1000"
        />
      </div>

      <div className="flex justify-between w-full ml-3">
        <div className="flex flex-col">
          <span title={product.title} className="text-xs w-40 truncate text-gray-500">
            {product.title}
          </span>
          <span className="text-sm">${product.price}</span>
          <div className="flex flex-row h-8 w-1/2 rounded-lg relative bg-transparent mt-1">
            <button
              onClick={() => decrementQuantity(product)}
              className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-10 rounded-l cursor-pointer outline-none"
            >
              <span className="m-auto text-xl font-light">−</span>
            </button>
            <span className="outline-none text-gray-600 justify-center focus:outline-none text-center w-full bg-gray-300 font-semibold flex items-center">
              {product.quantity}
            </span>
            <button
              onClick={() => addProduct(product)}
              className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-10 rounded-r cursor-pointer"
            >
              <span className="m-auto text-xl font-light">+</span>
            </button>
          </div>
        </div>
      </div>
      <i onClick={() => removeProduct(index)} className="py-1.5 px-3 hover:cursor-pointer">
        <Trash />
      </i>
    </div>
  );
}
