import React from 'react';
import dynamic from 'next/dynamic';

import { getLastProducts, getNewArrivals } from '@/queries/products';
import Link from 'next/link';


// Lazy-load করা হচ্ছে কম্পোনেন্টগুলো
const SectionHero2 = dynamic(() => import('@/components/SectionHero/SectionHero2'), { ssr: false });
const SectionSlider = dynamic(() => import('@/components/ProductCardSectionSlider/SectionSlider'), { ssr: false });
const ProductCard = dynamic(() => import('@/components/ProductCardSectionSlider/ProductCard'), { ssr: false });
const SectionHowItWork = dynamic(() => import('@/components/SectionHowItWork/SectionHowItWork'), { ssr: false });
const BackgroundSection = dynamic(() => import('@/components/BackgroundSection/BackgroundSection'), { ssr: false });
const SectionGridMoreExplore = dynamic(() => import('@/components/SectionGridMoreExplore/SectionGridMoreExplore'), { ssr: false });

export default async function PageHome() {

  const [allCategory, newArrivals, last40Products] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/category-api`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch categories');
        }
        return res.json();
      })
      .then((data) => data.res_data),
    getNewArrivals(),
    getLastProducts(),
  ]);

  return (
    <div className='nc-PageHome relative overflow-hidden'>
      <SectionHero2 />

      <div className='container space-y-10 mt-4'>
        {/* নতুন পণ্য */}
        <SectionSlider>
          {newArrivals.map((item: any, index: number) => (
            <li key={index} className='glide__slide'>
              <ProductCard data={item} />
            </li>
          ))}
        </SectionSlider>

            {/* category with sub category */}
          {allCategory && (
          <div className='relative py-24 lg:py-32'>
            <BackgroundSection />
            <SectionGridMoreExplore data={allCategory || []} />
          </div>
        )}

        <div className='flex justify-between items-center px-5 mb-4'>
            <h2 className='text-3xl font-bold text-neutral-900 dark:text-neutral-50'>
              Deals of the day
            </h2>
            <Link className=" bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 shadow-xl p-2 rounded" href={`/search`}>View All</Link>
          </div>

        {/* শেষ ৪০টি পণ্য */}
        <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8'>
          {last40Products.map((item: any) => (
            <ProductCard key={item.id} data={item} />
          ))}
        </div>

        <div className='py-24 border-t border-slate-200'>
          <SectionHowItWork />
        </div>
      </div>
    </div>
  );
}
