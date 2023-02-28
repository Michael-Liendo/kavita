import Layout from '@/components/Layout';
import NewArrivals from '@/components/NewArrivals';
import { useClient } from '@/store/ShopStore';
import { Product } from '@/utils/types/products';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const { client } = useClient();

  const [banners, setBanners] = useState<MainBanners>();
  const [productWeekSelection, setProductWeekSelection] = useState([]);

  useEffect(() => {
    async function getProductsWeekSelection(ids: string[]) {
      const weekProducts = await client.fetch(`*[_id in $ids]`, { ids });
      setProductWeekSelection(weekProducts);
    }
    async function getBanners() {
      const banners = await client.fetch(`*[_type == "main_banners"]`);
      setBanners(banners[0]);
    }
    async function getWeekSelection() {
      const week = await client.fetch(`*[_type == "productWeekSelection"]`);
      getProductsWeekSelection(
        week[0].products.map((product: ProductWeekSelection) => product._ref),
      );
    }
    getWeekSelection();
    getBanners();
  }, [client]);

  return (
    <Layout title="Kevita | Home Page">
      <div>
        <div className="flex md:hidden mt-4">
          <a href="#" className="bg-slate-400 h-72">
            {banners && (
              <Image
                className="rounded-lg h-full object-cover"
                src={banners?.head_main_banners?.banners_mobile[0].banner || ''}
                alt="s"
                width="1000"
                height="1000"
              />
            )}
          </a>
        </div>
        <div className="hidden md:flex flex-row mt-6 space-x-5">
          {banners && (
            <Link href={banners.head_main_banners.banners_computer[0].link} className="h-53">
              <Image
                className="rounded-lg w-full h-full object-cover"
                src={banners?.head_main_banners?.banners_computer[0].banner}
                alt="s"
                width="1000"
                height="1000"
              />
            </Link>
          )}
          <div className="flex-col max-w-[50%] h-full">
            <div className="w-full h-25">
              <h3 className="mb-3 text-xl font-medium">Week selection</h3>
              <div className="flex space-x-3 md:space-x-7 lg:space-x-5 xl:space-x-7">
                {productWeekSelection?.map((product: Product) => (
                  <Link href={`/product/${product._id}`} className="w-[22%]" key={product._id}>
                    <Image
                      className="rounded-md h-[75%] mb-2 object-cover"
                      alt={product.description}
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
                <Link href={banners.head_main_banners.banners_computer[1].link} className="mr-1">
                  <Image
                    className="rounded-lg w-full h-full object-cover"
                    src={banners?.head_main_banners?.banners_computer[1].banner}
                    alt={banners?.head_main_banners?.banners_computer[1].link}
                    width="1000"
                    height="1000"
                  />
                </Link>
              )}
              {banners && (
                <Link href={banners.head_main_banners.banners_computer[2].link} className="ml-1">
                  <Image
                    className="rounded-sm w-full h-full object-cover"
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

type ProductWeekSelection = {
  _key: string;
  _ref: string;
  _type: 'reference';
};
