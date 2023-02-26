import Navbar from '@/components/Navbar/Navbar';
import { useClient } from '@/store/ShopStore';
import { Product } from '@/utils/types/products';
import Image from 'next/image';
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
    <>
      <Navbar />
      <main>
        <div className="flex md:hidden justify-center mt-4">
          <a href="#" className="w-[90vw] bg-slate-400 h-72">
            {banners && (
              <Image
                className="rounded-lg w-full h-full object-cover"
                src={banners?.head_main_banners?.banners_mobile[0] || ''}
                alt="s"
                width="1000"
                height="1000"
              />
            )}
          </a>
        </div>
        <div className="hidden md:flex w-screen flex-row justify-center mt-6 space-x-5">
          <a href="#" className="bg-slate-400 w-[30%] h-53">
            {banners && (
              <Image
                className="rounded-lg w-full h-full object-cover"
                src={banners?.head_main_banners?.banners_computer[0] || ''}
                alt="s"
                width="1000"
                height="1000"
              />
            )}
          </a>
          <div className="flex-col w-[40%] h-full">
            <div className="w-full h-25">
              <h3 className="mb-3 text-xl font-medium">Week selection</h3>
              <div className="flex space-x-9">
                {productWeekSelection?.map((product: Product) => (
                  <a href="#" className="w-[22%]" key={product._id}>
                    <Image
                      className="rounded-md h-[75%] mb-2 object-cover"
                      alt={product.description}
                      src={product.images[0]}
                      width={208}
                      height={208}
                    />
                    <h2 className="truncate">{product.title}</h2>
                  </a>
                ))}
              </div>
            </div>
            <div className="hidden sm:flex h-72 mt-3">
              <a href="#" className="mr-1 bg-slate-400 w-6/12">
                {banners && (
                  <Image
                    className="rounded-lg w-full h-full object-cover"
                    src={banners?.head_main_banners?.banners_computer[1] || ''}
                    alt="s"
                    width="1000"
                    height="1000"
                  />
                )}
              </a>
              <a href="#" className="ml-1 bg-slate-400 w-6/12">
                {banners && (
                  <Image
                    className="rounded-sm w-full h-full object-cover"
                    src={banners?.head_main_banners?.banners_computer[2] || ''}
                    alt="s"
                    width="1000"
                    height="1000"
                  />
                )}
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

type MainBanners = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  head_main_banners: {
    banners_computer: string[];
    banners_mobile: string[];
  };
};

type ProductWeekSelection = {
  _key: string;
  _ref: string;
  _type: 'reference';
};
