import { getPublishedProductsByTitle, getPublishedRandomProducts } from '@/lib/sanityFunctions';
import { Product } from '@/utils/types/products';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import SearchIcon from '../Icons/Search';

export default function Search() {
  const form = useRef<HTMLFormElement>(null);

  const [suggestIsOpen, setSuggestIsOpen] = useState(false);
  const [findResult, setFindResult] = useState<Product[]>([]);

  async function onChangeHandler(e: any) {
    const products = await getPublishedProductsByTitle(e.target.value);
    const randomsProducts = await getPublishedRandomProducts(4);
    setFindResult([...products, ...randomsProducts]);
  }

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      setSuggestIsOpen(true);
      if (setSuggestIsOpen && form.current && !form.current.contains(e.target)) {
        setSuggestIsOpen(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [suggestIsOpen]);

  return (
    <form ref={form} className="flex relative md:ml-14">
      <input
        onChange={onChangeHandler}
        type="search"
        className="block w-full md:w-[30vw] py-1.5 px-1 md:py-3 md:px-4 text-sm placeholder-black text-gray-900 rounded-l-md bg-gray-50"
        placeholder="Busca productos..."
        required
      />
      {suggestIsOpen && (
        <div className="py-2 rounded px-3 absolute text-black bg-white w-full top-8 md:top-10">
          <ul className="truncate">
            {findResult.length >= 1 ? (
              findResult.map(({ title, _id }, index) => (
                <li className="my-2" key={index} title={title}>
                  <Link href={`/product/${_id}`}>{title}</Link>
                </li>
              ))
            ) : (
              <li>Buscando productos...</li>
            )}
          </ul>
        </div>
      )}

      <button
        type="submit"
        className="text-white bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-md text-sm px-1 py-1 md:px-4 md:py-2"
      >
        <SearchIcon className="h-7 w-7 text-black" />
      </button>
    </form>
  );
}
