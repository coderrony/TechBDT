import { getProductInfoForMetaData } from '@/queries/products';
import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.techbdt.com';

async function fetchProducts() {
  try {
    const products = await getProductInfoForMetaData();
    if (!products || products.length === 0) {
      console.warn('No products found for the sitemap.');
      return [];
    }

    return products.map((product) => ({
      url: `${BASE_URL}/product-detail/${product.slug}`,
      lastModified: new Date(product.createdAt).toISOString(),
    }));
  } catch (error: any) {
    console.error('Error fetching products for sitemap:', error.message);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    '/',
    '/about',
    '/login',
    '/cart',
    '/contact',
    '/about',
    '/privacy-policy',
    '/terms-conditions',
    '/return-refund',
    '/checkout',
    '/search',
    '/signup',
  ].map((page) => ({
    url: `${BASE_URL}${page}`,
    lastModified: new Date().toISOString(),
  }));

  const dynamicProductPages = await fetchProducts();

  return [...staticPages, ...dynamicProductPages];
}
