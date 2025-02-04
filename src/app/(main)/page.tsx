import React, {Suspense } from 'react';
import dynamic from 'next/dynamic';

import Link from 'next/link';
import LoadingIndicator from '@/components/LoadingIndicator';
// import HomeSlider from '@/components/HomeSlider';
// import SectionHero2 from '@/components/SectionHero/SectionHero2';

// Lazy-load components
const SectionHero2 = dynamic(() => import('@/components/SectionHero/SectionHero2'));


// const HomeSlider = lazy(() => import('@/components/HomeSlider'));
export default async function PageHome() {

  return (
    <div className='nc-PageHome relative overflow-hidden'>
      <Suspense fallback={<LoadingIndicator/>}>
        <SectionHero2 />
      </Suspense>

      <div className='container space-y-10 mt-4'>
        {/* New Arrivals */}
     


        <div className='flex justify-between items-center px-5 mb-4'>
          <h2 className='text-3xl font-bold text-neutral-900 dark:text-neutral-50'>
            Deals of the day
          </h2>
          <Link
            className='bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 shadow-xl p-2 rounded'
            href={`/search`}
          >
            View All
          </Link>
        </div>

    

       
      </div>
    </div>
  );
}
