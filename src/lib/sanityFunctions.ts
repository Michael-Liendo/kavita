import client from './sanityClient';

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

// TODO: one request
export async function getPublishedNewArrivalsProducts() {
  const newArrivals = await client.fetch(`*[_type == "newArrivals"]`);
  const ids = newArrivals[0].products.map((product: { _ref: string }) => product._ref);
  const newArrivalsProducts = await client.fetch(`*[_id in $ids]`, { ids });
  return newArrivalsProducts;
}

export async function getSingleProduct(_id: string) {
  const product = await client.fetch(
    `*[_type == "products" && _id == $_id][0] {
    title,
    product,
    _id,
    price,
    description,
    images,
    "category": *[_type == "category" && _id == ^.category._ref][0]
  }`,
    { _id },
  );
  return product;
}

export async function getPublishedRandomProducts(number: number) {
  const products = await client.fetch(`*[_type == "products"]`);

  return products.sort(() => Math.random() - 0.5).slice(0, number);
}

export async function getPublishedProductsByTitle(searchTerm: string) {
  const product = await client.fetch(
    `*[_type == "products" && title match $searchTerm]{
    title,
    _id
  }`,
    { searchTerm },
  );

  return product;
}

export async function getProductsWithCategory(categoryID: string) {
  if (!categoryID) return [];
  const products = await client.fetch(
    `*[_type == "products" && category._ref match $categoryID]{
    title,
    product,
    _id,
    price,
    description,
    images,
    "category": *[_type == "category" && _id == ^.category._ref][0]
  }`,
    {
      categoryID,
    },
  );

  return products;
}

type ProductWeekSelection = {
  _key: string;
  _ref: string;
  _type: 'reference';
};
