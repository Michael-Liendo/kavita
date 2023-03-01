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
