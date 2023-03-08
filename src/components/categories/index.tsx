import { getPublishedCategories } from '@/lib/sanityFunctions';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      const categories = await getPublishedCategories();
      setCategories(categories);
    }
    getCategories();
  }, []);

  return (
    <>
      <h3 className="text-4xl mt-11">Categorías</h3>
      <div className="grid grid-cols-1 sm:grid-cols-4  mt-5">
        {categories.map((category: Category, index) => (
          <div
            key={index}
            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow"
          >
            <Link href={`/category/${category._id}`}>
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
                {category.name}
              </h5>
            </Link>

            <Link
              href={`/category/${category._id}`}
              className="inline-flex items-center text-blue-600 hover:underline"
            >
              Mira nuestros productos
              <svg
                className="w-5 h-5 ml-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
              </svg>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

type Category = {
  _id: string;
  name: string;
  image: string;
};
