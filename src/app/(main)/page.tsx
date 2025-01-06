import React from 'react';
import SectionHowItWork from '@/components/SectionHowItWork/SectionHowItWork';
import BackgroundSection from '@/components/BackgroundSection/BackgroundSection';
import SectionPromo1 from '@/components/SectionPromo1';

import SectionGridMoreExplore from '@/components/SectionGridMoreExplore/SectionGridMoreExplore';
import SectionPromo2 from '@/components/SectionPromo2';
import SectionSliderCategories from '@/components/SectionSliderCategories/SectionSliderCategories';
import SectionPromo3 from '@/components/SectionPromo3';

import SectionHero2 from '@/components/SectionHero/SectionHero2';

import SectionSlider from '@/components/ProductCardSectionSlider/SectionSlider';
import ProductCard from '@/components/ProductCardSectionSlider/ProductCard';

import Pagination from '@/shared/Pagination/Pagination';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
// import Heading from '@/components/Heading/Heading';
import { getCategoriesWithSubCategories } from '@/queries/categories';

import { createReviewForProduct, getProducts } from '@/queries/products';
import { auth } from '@/auth';
// import { getUserByPhoneOrEmail } from '@/queries/users';



async function PageHome() {
 
  const allCategory = await getCategoriesWithSubCategories();
  const allProducts = (await getProducts()) || [];
  const session = await auth();

  // const userData = await getUserByPhoneOrEmail({phone: '01866188330'});
  // console.log("userData ",userData);

  console.log("PageHome session ",session);
  


  return (
    <div className='nc-PageHome relative overflow-hidden'>
      <SectionHero2 />

      <div className='container relative space-y-10 lg:space-y-20 '>
        <SectionSlider>
          {allProducts.map((item, index) => (
            <li key={index} className={`glide__slide`}>
              <ProductCard data={item} />
            </li>
          ))}
        </SectionSlider>

        {/* render product */}
        <div>
          <h2 className='text-2xl font-bold text-neutral-500 dark:text-neutral-400'>
            Product right Description
          </h2>
          {/* LOOP ITEMS */}
          <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 '>
            {allProducts.map((item, index) => (
              <ProductCard data={item} key={item.id} />
            ))}
          </div>

          {/* PAGINATION */}
          <div className='flex flex-col mt-3 lg:mt-6 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center'>
            <Pagination />
            <ButtonPrimary loading>Show me more</ButtonPrimary>
          </div>
        </div>

        <div className='py-24 lg:py-32 border-t border-b border-slate-200 dark:border-slate-700'>
          <SectionHowItWork />
        </div>

        <SectionPromo1 />

        {/* category with sub category */}
        {allCategory && (
          <div className='relative py-24 lg:py-32'>
            <BackgroundSection />
            <SectionGridMoreExplore data={allCategory || []} />
          </div>
        )}

        <SectionPromo2
          title={"Exclusive Deals on Kids' Items"}
          description='Celebrate childhood with products that combine quality, comfort, and style, ensuring every moment is filled with fun and creativity.'
        />

        <SectionSliderCategories />

        <SectionPromo3 />
      </div>
    </div>
  );
}

export default PageHome;
