import { createClient } from 'next-sanity';

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2022-03-25',
  useCdn: false,
});

export async function getPublishedCategories() {
  const categories = await client.fetch(`*[_type == "category"]`);
  return categories;
}

export async function getPublishedWeekProductsSelections() {
  const week = await client.fetch(`*[_type == "productWeekSelection"]`);
  const ids = week[0].products.map((product: ProductWeekSelection) => product._ref);

  const weekProducts = await client.fetch(`*[_id in $ids]`, { ids });
  return weekProducts;
}

export async function getPublishedMainBanners() {
  const banners = await client.fetch(`*[_type == "main_banners"]`);
  return banners[0];
}

type ProductWeekSelection = {
  _key: string;
  _ref: string;
  _type: 'reference';
};
