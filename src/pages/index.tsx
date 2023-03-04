import Layout from '@/components/Layout';
import NewArrivals from '@/components/NewArrivals';
import { getPublishedMainBanners, getPublishedWeekProductsSelections } from '@/lib/sanityFunctions';
import { Product } from '@/utils/types/products';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [banners, setBanners] = useState<MainBanners>();
  const [productWeekSelection, setProductWeekSelection] = useState([]);

  useEffect(() => {
    async function getBanners() {
      const banners = await getPublishedMainBanners();
      setBanners(banners);
    }

    async function getWeekProductsSelections() {
      const products = await getPublishedWeekProductsSelections();
      setProductWeekSelection(products);
    }

    getWeekProductsSelections();
    getBanners();
  }, []);

  return (
    <Layout title="Kevita | Inicio">
      <div>
        <div className="flex md:hidden mt-4">
          <a href="#" className="bg-slate-400 h-72">
            {banners && (
              <Image
                className="rounded-lg h-full object-cover"
                src={banners?.head_main_banners?.banners_mobile[0].banner}
                alt="Kavita banner"
                width="1000"
                height="1000"
              />
            )}
          </a>
        </div>
        <div className="hidden md:flex flex-row mt-6 space-x-5">
          {banners && (
            <Link
              href={banners.head_main_banners.banners_computer[0].link}
              className="lg:max-h-[68vh] 2xl:max-h-[58vh]"
            >
              <Image
                className="rounded-lg w-full h-full object-cover"
                src={banners?.head_main_banners?.banners_computer[0].banner}
                alt="Kavita banner"
                width="1000"
                height="1000"
              />
            </Link>
          )}
          <div className="flex-col max-w-[50%] h-full">
            <div className="w-full h-25">
              <h3 className="mb-3 text-xl font-medium">Selección semanal</h3>
              <div className="flex space-x-3 md:space-x-7 lg:space-x-5 xl:space-x-7">
                {productWeekSelection?.map((product: Product) => (
                  <Link
                    title={product.title}
                    href={`/product/${product._id}`}
                    className="w-[22%]"
                    key={product._id}
                  >
                    <Image
                      className="rounded-md h-[20vh] mb-2 object-cover"
                      alt={product.title}
                      src={product.images[0]}
                      width={208}
                      height={208}
                    />
                    <h2 className="truncate text-blue-600">{product.title}</h2>
                  </Link>
                ))}
              </div>
            </div>
            <div className="hidden sm:flex h-72 mt-3">
              {banners && (
                <Link
                  href={banners.head_main_banners.banners_computer[1].link}
                  className="mr-1 max-h-[40vh]"
                >
                  <Image
                    className="rounded-lg w-96 h-full object-cover"
                    src={banners?.head_main_banners?.banners_computer[1].banner}
                    alt={banners?.head_main_banners?.banners_computer[1].link}
                    width="1000"
                    height="1000"
                  />
                </Link>
              )}
              {banners && (
                <Link
                  href={banners.head_main_banners.banners_computer[2].link}
                  className="ml-1 max-h-[40vh]"
                >
                  <Image
                    className="rounded-sm w-96 h-full object-cover"
                    src={banners?.head_main_banners?.banners_computer[2].banner}
                    alt={banners?.head_main_banners?.banners_computer[2].link}
                    width="1000"
                    height="1000"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <NewArrivals />
    </Layout>
  );
}

type MainBanners = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  head_main_banners: {
    banners_computer: {
      _key: string;
      banner: string;
      link: string;
    }[];
    banners_mobile: {
      _key: string;
      banner: string;
      link: string;
    }[];
  };
  _updatedAt: string;
};
