import { getProductInfoForMetaData } from '@/queries/products';

import { MetadataRoute } from 'next';

// Replace with your actual domain
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.techbdt.com';

async function fetchProducts() {
  try {
    const products = await getProductInfoForMetaData();
    if (products?.length > 0) {
      return products.map((product) => ({
        url: `${BASE_URL}/product-detail/${product.slug}`,
        lastModified: new Date(product.createdAt).toISOString(),
      }));
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return [];
}


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    '/',
    '/about',
    '/login',
    '/cart',
    '/contact',
    '/checkout',
    '/search',
    '/signup',
  ];

  // Fetch dynamic product pages
  const dynamicProductPages = await fetchProducts();
  // Generate URLs for static pages
  const staticEntries = staticPages.map((page) => ({
    url: `${BASE_URL}${page}`,
    lastModified: new Date().toISOString(),
  }));
  if(dynamicProductPages.length > 0){
    return [ ...staticEntries,...dynamicProductPages]
  }

  return [ ...staticEntries]
}
