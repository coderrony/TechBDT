import React, {Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
// import LoadingIndicator from '@/components/LoadingIndicator';
import Skeleton from '@/components/Skeleton';
import BackgroundSection from '@/components/BackgroundSection/BackgroundSection';
// import SectionGridMoreExplore from '@/components/SectionGridMoreExplore/SectionGridMoreExplore';
// import TrendingProduct from '@/components/Products/TrendingProduct';

// Lazy-load components
const SectionHero2 = dynamic(() => import('@/components/SectionHero/SectionHero2'));
const TrendingProduct = dynamic(() => import('@/components/Products/TrendingProduct'));
const SectionGridMoreExplore = dynamic(() => import('@/components/SectionGridMoreExplore/SectionGridMoreExplore'));

export default async function PageHome() {

    // Fetch data inside the component
    const [allCategory] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/category-api`, {
        next: { revalidate: 3600 }, // Revalidate every 1 hours
      })
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch categories');
          return res.json();
        })
        .then((data) => data.res_data),
  
    ]);

    // console.log("allCategory ",allCategory);
    // console.log("allCategory[0] ",allCategory[0]);
    

  return (
    <div className='nc-PageHome relative overflow-hidden'>
      {/* slider */}
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


        {/* Categories with Subcategories */}
        {allCategory && (
          <div className='relative py-24 lg:py-32'>
            <BackgroundSection />
            <SectionGridMoreExplore data={allCategory || []} />
          </div>
        )}
       

    

       
      </div>
    </div>
  );
}
