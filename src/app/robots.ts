
import { MetadataRoute } from 'next';

// Replace with your actual domain
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.techbdt.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/*','/auth/*','/admin','/dashboard'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
