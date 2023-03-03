import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { useCart } from '../../store/ShopStore';
import ShoppingCart from '../Icons/ShoppingCart';
import ProductCart from './Product';
import useTranslation from '@/utils/i18n/hooks';
import { Product } from '@/utils/types/products';

export default function Cart() {
  const t = useTranslation;
  const carDiv = useRef<HTMLDivElement>(null);

  const [bagIsOpen, setBagIsOpen] = useState(false);
  const [useCartState, setUseCartState] = useState<Product[]>([]);
  const { cart } = useCart();

  useEffect(() => {
    setUseCartState(cart);
  }, [cart]);

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (bagIsOpen && carDiv.current && !carDiv.current.contains(e.target)) {
        setBagIsOpen(!bagIsOpen);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [bagIsOpen]);

  const cartTotal = useCartState.reduce(
    (accumulator: number, product: Product) => accumulator + product.price * product.quantity,
    0,
  );
  const cartTotalItems = useCartState.reduce(
    (accumulator: number, product: Product) => accumulator + product.quantity,
    0,
  );
  useEffect(() => {
    if (bagIsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [bagIsOpen]);

  return (
    <div ref={carDiv} className="flex items-center">
      <button
        className={cn('flex text-xl items-center  transition duration-200 cursor-pointer')}
        onClick={() => {
          setBagIsOpen(!bagIsOpen);
        }}
      >
        <div className="flex -space-x-3 ">
          <ShoppingCart className="text-white w-7 h-7 md:w-10 md:h-10" />
          {useCartState.length ? (
            <span className="flex items-center justify-center text-sm w-4 h-4 md:w-5 md:h-5 bg-green-600 rounded-full">
              {useCartState.length}
            </span>
          ) : null}
        </div>
        <span className="hidden hover:underline md:block">Carrito</span>
      </button>

      {bagIsOpen && (
        <>
          <div
            id="useCartState"
            className="text-black fixed z-50 top-16 right-2 bg-white p-3 shadow-lg w-72 sm:w-80"
          >
            <div className="overflow-y-scroll w-80 h-80">
              {useCartState.length > 0 ? (
                useCartState.map((product: Product, index: number) => (
                  <ProductCart key={product._id} index={index} product={product} />
                ))
              ) : (
                <div className="h-full flex flex-col justify-center items-center">
                  <span className="font-medium">El carrito de compra está vacio</span>
                  <span>Añade lo que te guste!</span>
                </div>
              )}
            </div>
            <div className="flex justify-between items-center">
              <div className="mt-3 flex flex-col">
                <span className="text-xs">
                  {cartTotalItems} item{useCartState.length === 1 ? '' : 's'}
                </span>
                <span className="font-medium mt-1">
                  ${cartTotal < 1 ? '0.00' : cartTotal.toFixed(2)}
                </span>
              </div>
              <Link
                href="/checkout"
                className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              >
                Comprueba
              </Link>
            </div>
          </div>
          <div
            onClick={() => setBagIsOpen(!bagIsOpen)}
            className="opacity-25 fixed inset-0 z-40 bg-black"
          ></div>
        </>
      )}
    </div>
  );
}
