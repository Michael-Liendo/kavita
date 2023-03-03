import { getPublishedCategories } from '@/lib/sanityFunctions';
import useTranslation from '@/utils/i18n/hooks';
import { useEffect, useRef, useState } from 'react';
import Bars3 from '../Icons/Bars3';
import XMark from '../Icons/XMark';

function CategoryListItem({ category }: { category: Category }) {
  return (
    <>
      <hr />
      <li className="my-2 truncate">{category.name}</li>
    </>
  );
}

export default function Menu() {
  const t = useTranslation;
  const menuDiv = useRef<HTMLDivElement>(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      const getCategories = await getPublishedCategories();
      setCategories(getCategories);
    }
    getCategories();
  }, []);

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (menuIsOpen && menuDiv.current && !menuDiv.current.contains(e.target)) {
        setMenuIsOpen(!menuIsOpen);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [menuIsOpen]);

  useEffect(() => {
    if (menuIsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [menuIsOpen]);

  return (
    <div ref={menuDiv}>
      <button onClick={() => setMenuIsOpen(!menuIsOpen)} className="flex p-1 items-center text-xl">
        {menuIsOpen ? (
          <XMark className="text-white w-7 h-7  sm:w-9 sm:h-9" />
        ) : (
          <Bars3 className="text-white w-7 h-7 sm:w-9 sm:h-9" />
        )}
        <span className="hidden md:block hover:underline">Menu</span>
      </button>
      {menuIsOpen && (
        <>
          <div className="fixed z-50 p-4 text-black w-80 bg-white overflow-y-auto">
            <div>
              <h2 className="text-xl mb-3 font-medium">Comprar por categoría</h2>
              <ul>
                {categories.map((category: Category) => (
                  <CategoryListItem key={category._id} category={category} />
                ))}
              </ul>
            </div>
          </div>
          <div
            onClick={() => setMenuIsOpen(!menuIsOpen)}
            className="opacity-25 fixed inset-0 z-40 bg-black"
          ></div>
        </>
      )}
    </div>
  );
}

type Category = {
  name: string;
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
};
