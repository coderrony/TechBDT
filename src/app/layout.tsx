import { Poppins } from 'next/font/google';
import './globals.css';
import '@/fonts/line-awesome-1.3.0/css/line-awesome.css';
import '@/styles/index.scss';
import 'rc-slider/assets/index.css';

// import CommonClient from './CommonClient';
import { Metadata } from 'next';
// import { connectDB } from '@/services/mongo';
import { SessionProvider } from 'next-auth/react';
import { queryClient } from '@/lib/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import dynamic from 'next/dynamic';


const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://techbdt.com',
  ),
  title: {
    default: 'TechBDT | Best Online Shopping in Bangladesh',
    template: '%s - TechBDT | Online Shopping',
  },
  description:
    'TechBDT.com offers a seamless online shopping experience for tech gadgets, fashion, and electronics in Bangladesh. Shop top-quality products at unbeatable prices and enjoy fast, reliable delivery.',
  keywords: [
    'online shopping in Bangladesh',
    'Bangladesh e-commerce',
    'tech gadgets Bangladesh',
    'electronics shop online',
    'fashion trends Bangladesh',
    'affordable gadgets',
    'secure online shopping BD',
    'TechBDT deals',
    'trendy fashion Bangladesh',
    'latest gadgets in Bangladesh',
    'best e-commerce site Bangladesh',
    'buy smartphones Bangladesh',
    'shop electronics online BD',
    'daraz',
    'rokomari',
    'evaly',
    'pickaboo',
    'techbdt',
    'techbd',
    'ajkerdeal',
    'star tech',
    'startech',
    'rayans computers',
    'othoba',
  ].join(', '),

  openGraph: {
    type: 'website',
    locale: 'en_BD',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://techbdt.com',
    siteName: 'TechBDT',
    title: 'TechBDT - Best E-commerce Platform in Bangladesh',
    description:
      'Discover TechBDT.com, the leading e-commerce platform in Bangladesh for tech gadgets, fashion, and electronics. Shop online and enjoy exclusive deals and fast delivery!',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'TechBDT - Best Online Shopping in Bangladesh',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@techbdt',
    title: 'TechBDT | Online Shopping',
    description:
      'Shop for the latest gadgets, electronics, and fashion at TechBDT.com. Enjoy exclusive deals, fast delivery, and a secure shopping experience in Bangladesh.',
    images: ['/opengraph-image.png'],
  },
};
const CommonClient = dynamic(() => import('./CommonClient'), { ssr: false });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={poppins.className}>
      <body className='bg-white text-neutral-900'>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            {children}
            {process.env.NODE_ENV === 'development' && (
              <ReactQueryDevtools initialIsOpen={false} />
            )}
          </QueryClientProvider>
        </SessionProvider>
        <CommonClient />
      </body>
    </html>
  );
}