import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Skeleton from '@/components/Skeleton';
import BackgroundSection from '@/components/BackgroundSection/BackgroundSection';
import { getFashions, getGadgets, getGiftItems } from '@/queries/products';
import ProductCard from '@/components/ProductCardSectionSlider/ProductCard';
import SectionSlider from '@/components/ProductCardSectionSlider/SectionSlider';

const SectionHero2 = dynamic(
  () => import('@/components/SectionHero/SectionHero2'),
);
const TrendingProduct = dynamic(
  () => import('@/components/Products/TrendingProduct'),
);
const SectionGridMoreExplore = dynamic(
  () => import('@/components/SectionGridMoreExplore/SectionGridMoreExplore'),
);

export default async function PageHome() {
  // Fetch data inside the component
  const [allCategory, gadgets, giftItems,fashions] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/category-api`, {
      next: { revalidate: 3600 }, // Revalidate every 1 hours
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch categories');
        return res.json();
      })
      .then(data => data.res_data),
    getGadgets(),
    getGiftItems(),
    getFashions(),
  ]);

  return (
    <div className='nc-PageHome relative overflow-hidden'>
      {/* slider */}
      <Suspense fallback={<Skeleton />}>
        <SectionHero2 />
      </Suspense>

      <div className='container space-y-10 mt-4'>
        {/* Trending */}

        <h2 className='text-3xl font-bold text-neutral-900 dark:text-neutral-50 ml-4 sm:ml-5'>
          Trending...
        </h2>

        <Suspense fallback={<Skeleton />}>
          <TrendingProduct />
        </Suspense>

        {/* Categories with Subcategories */}
        {allCategory && (
          <div className='relative py-24 lg:py-32'>
            <BackgroundSection />
            <SectionGridMoreExplore data={allCategory || []} />
          </div>
        )}

        {/* Gadgets  section  */}
        <>
          <div className='flex justify-between items-center px-5 mb-4'>
            <h2 className='text-3xl font-bold text-neutral-900 dark:text-neutral-50'>
              Gadgets{' '}
              <span className='text-neutral-500 dark:text-neutral-400'>
                for Tech Enthusiasts
              </span>
            </h2>
            <Link
              className='bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 shadow-xl p-2 rounded'
              href={`/search?category=Gadgets`}>
                Explore All
            </Link>
          </div>

          <Suspense fallback={<Skeleton />}>
            <SectionSlider>
              {gadgets.map((item: any, index: number) => (
                <li key={index} className='glide__slide'>
                  <ProductCard data={item} />
                </li>
              ))}
            </SectionSlider>
          </Suspense>
        </>

        {/* Gift Items  */}
        <>
          <div className='flex justify-between items-center px-5 mb-4'>
            <h2 className='text-3xl font-bold text-neutral-900 dark:text-neutral-50'>
              Gifts Items{' '}
              <span className='text-neutral-500 dark:text-neutral-400'>
                Best For Today
              </span>
            </h2>
            <Link
              className='bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 shadow-xl p-2 rounded'
              href={`/search?category=Gift Items`}>
                Explore All
            </Link>
          </div>

          <Suspense fallback={<Skeleton />}>
            <SectionSlider>
              {giftItems.map((item: any, index: number) => (
                <li key={index} className='glide__slide'>
                  <ProductCard data={item} />
                </li>
              ))}
            </SectionSlider>
          </Suspense>
        </>

    {/* Fashion  Items  */}
    <>
          <div className='flex justify-between items-center px-5 mb-4'>
            <h2 className='text-3xl font-bold text-neutral-900 dark:text-neutral-50'>
              Fashion{' '}
              <span className='text-neutral-500 dark:text-neutral-400'>
              for Modern Lifestyles
              </span>
            </h2>
            <Link
              className='bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 shadow-xl p-2 rounded'
              href={`/search?category=Fashion`}>
              Explore All
            </Link>
          </div>

          <Suspense fallback={<Skeleton />}>
            <SectionSlider>
              {fashions.map((item: any, index: number) => (
                <li key={index} className='glide__slide'>
                  <ProductCard data={item} />
                </li>
              ))}
            </SectionSlider>
          </Suspense>
        </>


      </div>
    </div>
  );
}
