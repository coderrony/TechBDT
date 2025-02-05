import React, {Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
// import LoadingIndicator from '@/components/LoadingIndicator';
import Skeleton from '@/components/Skeleton';
// import TrendingProduct from '@/components/Products/TrendingProduct';

// Lazy-load components
const SectionHero2 = dynamic(() => import('@/components/SectionHero/SectionHero2'));
const TrendingProduct = dynamic(() => import('@/components/Products/TrendingProduct'));

export default async function PageHome() {

  return (
    <div className='nc-PageHome relative overflow-hidden'>
      <Suspense fallback={<Skeleton/>}>
        <SectionHero2 />
      </Suspense>

      <div className='container space-y-10 mt-4'>
        {/* Trending */}
     
        <h2 className='text-3xl font-bold text-neutral-900 dark:text-neutral-50 ml-4 sm:ml-5'>
            Trending...
         </h2>

         <Suspense fallback={<Skeleton/>}>
         <TrendingProduct/>
         </Suspense>
       

    

       
      </div>
    </div>
  );
}
