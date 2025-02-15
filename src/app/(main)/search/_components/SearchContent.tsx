'use client';
import React, { FC, useEffect, useState } from 'react';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import Input from '@/shared/Input/Input';
import ButtonCircle from '@/shared/Button/ButtonCircle';
import ProductCard from '@/components/ProductCardSectionSlider/ProductCard';
import useDebounce from '@/hooks/useDebounce';
import { useSearchParams } from 'next/navigation';
import TabFilters from './TabFilters';
import { usePaginatedItems } from '@/hooks/usePaginatedItems';
import { default_range_prices } from '@/data/defaultValue';
import twFocusClass from '@/utils/twFocusClass';
import Skeleton from '@/components/Skeleton';

interface SearchContentProps {
  className?: string;
}

const SearchContent: FC<SearchContentProps> = () => {
 
  const [page, setPage] = useState(0);
  const searchParams = useSearchParams();
  const [categoriesState, setCategoriesState] = useState<string[]>([]);
  const [queryText, setQueryText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<any>({
    categories: [],
    subCategories: [],
    colors: [],
    sizes: [],
    priceRange: default_range_prices, // [minPrice,maxPrice]
  });

  const {
    data,
    // isFetching,
    isLoading,
    fetchNextPage,
    // fetchPreviousPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePaginatedItems(searchTerm, filters) as any;

  // Extract the last page data
  // const lastPageData = data?.pages[data.pages.length - 1]?.res_data.data || [];
  const lastPageData = data?.pages[page]?.res_data.data || [];

 

  const category = searchParams.get('category');
  const subCategory = searchParams.get('subCategory');


  useEffect(() => {
    setPage(data?.pages?.length - 1 || 0);
  }, [data?.pages.length]);

  useEffect(() => {
    const controller = new AbortController(); // AbortController to cancel fetch if needed
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/category-api`,
          { signal: controller.signal }, // Attach the abort signal
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const data = await response.json();
        setCategoriesState(data.res_data || []); // Set categories
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setCategoriesState([]);
        }
      }
    };

    fetchCategories();

    return () => {
      controller.abort(); // Cleanup on unmount
    };
  }, []);


  useEffect(() => {
    if (category) {
      setFilters((prev: any) => ({ ...prev, categories: [category] }));
    }
    if (subCategory) {
     
      setFilters((prev: any) => ({ ...prev, subCategories: [subCategory] }));
    }
  }, [category, subCategory]);



  const debounce = useDebounce(async value => {
    try {
      // console.log('search Value ', value);
      setSearchTerm(value);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }, 350);

  const renderItem = (pag: any, index: number) => {
   
    if (index === page) {
      return (
        <span
          key={index}
          className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white ${twFocusClass()}`}>
      
          {index + 1}
        </span>
      );
    }
    // RETURN UNACTIVE PAGINATION
    return (
      <button
        key={index}
        className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
        // href={pag.href}
        onClick={() => setPage(index)}>
       
        {index + 1}
      </button>
    );
  };

  return (
    <div className={`nc-PageSearch`} data-nc-id='PageSearch'>
      <div
        className={`nc-HeadBackgroundCommon h-24 2xl:h-28 top-0 left-0 right-0 w-full bg-primary-50 dark:bg-neutral-800/20 `}
      />
      <div className='container'>
        <header className='max-w-2xl mx-auto -mt-10 flex flex-col lg:-mt-7'>
          <div className='relative w-full '>
            <label
              htmlFor='search-input'
              className='text-neutral-500 dark:text-neutral-300'>
              <span className='sr-only'>Search all icons</span>
              <Input
                className='shadow-lg border-0 dark:border'
                id='search-input'
                type='search'
                placeholder='Your are Looking for...'
                sizeClass='pl-14 py-5 pr-5 md:pl-16'
                rounded='rounded-full'
                value={queryText}
                onChange={e => {
                  setQueryText(e.target.value);
                  debounce(e.target.value);
                }}
              />
              <ButtonCircle
                className='absolute right-2.5 top-1/2 transform -translate-y-1/2'
                size=' w-11 h-11'
                onClick={() => {
                  setQueryText('');
                  setSearchTerm('');
                }}>
                <i className='las la-times text-xl'></i>
              </ButtonCircle>
              <span className='absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-6'>
                <svg
                  className='h-5 w-5'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M22 22L20 20'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </span>
            </label>
          </div>
        </header>
      </div>

      <div className='container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28'>
        <main>
          {/* FILTER */}

          <TabFilters
            categoriesState={categoriesState}
            setFilters={(value: any) => setFilters(value)}
          />

          <div className='w-full border-b border-neutral-200/70 dark:border-neutral-700 my-8'></div>

          {isLoading && <Skeleton />}

          {!isLoading && data && (
            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10'>
              {lastPageData?.map((product: any) => (
                <ProductCard key={product._id} data={product} />
              ))}
            </div>
          )}

          {/* PAGINATION */}
          <div className='flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center'>
            {/* <Pagination /> */}

            <nav
              className={`nc-Pagination inline-flex space-x-1 text-base font-medium`}>
              {Array.from({ length: data?.pages.length }).map(renderItem)}
            </nav>

            <ButtonPrimary
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}>
              {isFetchingNextPage ? 'Loading...' : 'Next'}
            </ButtonPrimary>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SearchContent;
