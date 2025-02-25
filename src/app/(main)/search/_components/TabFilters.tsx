'use client';

import React, { Fragment, useState, FC, useEffect } from 'react';
import { Dialog, Popover, Transition } from '@/app/headlessui';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import ButtonThird from '@/shared/Button/ButtonThird';
import ButtonClose from '@/shared/ButtonClose/ButtonClose';
import Checkbox from '@/shared/Checkbox/Checkbox';
import Slider from 'rc-slider';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import {
  default_category_colors,
  default_category_sizes,
  default_range_prices,
} from '@/data/defaultValue';

interface TabFiltersProps {
  className?: string;
  categoriesState: string[];
  filters:any;
  setFilters: (value: any) => void;
}

const TabFilters: FC<TabFiltersProps> = ({
  categoriesState,
  filters,
  setFilters,
}) => {

  const [query,setQuery] = useState<any>(filters);
  const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  // console.log("query ",query);

  useEffect(()=>{setQuery(filters)},[filters])
  
  //
  const closeModalMoreFilter = () => setisOpenMoreFilter(false);
  const openModalMoreFilter = () => setisOpenMoreFilter(true);

  //
  const handleChangeCategories = (checked: boolean, name: string) => {
    checked
      ? setQuery((prev: any) => ({
          ...prev,subCategories:[],
          categories: [...prev.categories, name],
        }))
      : setQuery((prev: any) => ({
          ...prev,subCategories:[],
          categories: prev.categories.filter((i: string) => i !== name),
        }));
  };

  const handleChangeColors = (checked: boolean, name: string) => {
    checked
      ? setQuery((prev: any) => ({ ...prev, colors: [...prev.colors, name] }))
      : setQuery((prev: any) => ({
          ...prev,
          colors: prev.colors.filter((i: string) => i !== name),
        }));
  };

  const handleChangeSizes = (checked: boolean, name: string) => {
   
    checked
      ? setQuery((prev: any) => ({ ...prev, sizes: [...prev.sizes, name] }))
      : setQuery((prev: any) => ({
          ...prev,
          sizes: prev.sizes.filter((i: string) => i !== name),
        }));
  };


// when click apply then filter execute
  const handelQuerySubmit = ()=>{ 
    setFilters(query)
  }

  // clear categories,colors,sizes
  const handelClear = (value:string)=>{ 
    setFilters((prev: any) => ({
      ...prev,
      [value]: [],
    }));
    setQuery((prev: any) => ({
      ...prev,
      [value]: [],
    }));
   
  }

  // clear price range and set [100,30000]
  const clearPrice = ()=>{ 
    setFilters((prev: any) => ({
      ...prev,
      priceRange: default_range_prices,
    }));
    setQuery((prev: any) => ({
      ...prev,
      priceRange: default_range_prices,
    }));
  }

  // OK
  const renderTabsPriceRage = () => {
    return (
      <Popover className='relative'>
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-900 focus:outline-none `}>
              ৳
              <span className=' min-w-[90px]'>{`${query.priceRange[0]} - ${query.priceRange[1]}`}</span>
              {query.priceRange[0] === default_range_prices[0] &&
              query.priceRange[1] === default_range_prices[1] ? null : (
                <span
                  onClick={() =>
                    setQuery((prev: any) => ({
                      ...prev,
                      priceRange: default_range_prices,
                    }))
                  }>
                  {renderXClear()}
                </span>
              )}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-200'
              enterFrom='opacity-0 translate-y-1'
              enterTo='opacity-100 translate-y-0'
              leave='transition ease-in duration-150'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 translate-y-1'>
              <Popover.Panel className='absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 '>
                <div className='overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700'>
                  <div className='relative flex flex-col px-5 py-6 space-y-8'>
                    <div className='space-y-5'>
                      <span className='font-medium'>Price range</span>
                      <Slider
                        range
                        min={default_range_prices[0]}
                        max={default_range_prices[1]}
                        step={1}
                        defaultValue={query.priceRange}
                        allowCross={false}
                        onChange={(_input: number | number[]) =>
                          setQuery((prev: any) => ({
                            ...prev,
                            priceRange: _input as number[],
                          }))
                        }
                      />
                    </div>

                    <div className='flex justify-between space-x-5'>
                      <div>
                        <label
                          htmlFor='minPrice'
                          className='block text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                          Min price
                        </label>
                        <div className='mt-1 relative rounded-md'>
                          <span className='absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm'>
                            ৳
                          </span>
                          <input
                            type='text'
                            name='minPrice'
                            disabled
                            id='minPrice'
                            className='block w-32 pr-10 pl-4 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent'
                            value={query.priceRange[0]}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor='maxPrice'
                          className='block text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                          Max price
                        </label>
                        <div className='mt-1 relative rounded-md'>
                          <span className='absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm'>
                            ৳
                          </span>
                          <input
                            type='text'
                            disabled
                            name='maxPrice'
                            id='maxPrice'
                            className='block w-32 pr-10 pl-4 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent'
                            value={query.priceRange[1]}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between'>
                    <ButtonThird
                      onClick={() => {
                        clearPrice()
                        close();
                      }}
                      sizeClass='px-4 py-2 sm:px-5'>
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={()=> {
                        handelQuerySubmit()
                        close()
                      }}
                      sizeClass='px-4 py-2 sm:px-5'>
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  // OK
  const renderXClear = () => {
    return (
      <span className='flex-shrink-0 w-4 h-4 rounded-full bg-primary-500 text-white flex items-center justify-center ml-3 cursor-pointer'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-3 w-3'
          viewBox='0 0 20 20'
          fill='currentColor'>
          <path
            fillRule='evenodd'
            d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
            clipRule='evenodd'
          />
        </svg>
      </span>
    );
  };

  // OK
  const renderTabsCategories = () => {
    return (
      <Popover className='relative'>
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none select-none
               ${
                 open
                   ? '!border-primary-500 '
                   : 'border-neutral-300 dark:border-neutral-700'
               }
                ${
                  !!query.categories.length
                    ? '!border-primary-500 bg-primary-50 text-primary-900'
                    : 'border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500'
                }
                `}>
              <svg
                className='w-4 h-4'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M8 2V5'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeMiterlimit='10'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M16 2V5'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeMiterlimit='10'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M7 13H15'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeMiterlimit='10'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M7 17H12'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeMiterlimit='10'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M16 3.5C19.33 3.68 21 4.95 21 9.65V15.83C21 19.95 20 22.01 15 22.01H9C4 22.01 3 19.95 3 15.83V9.65C3 4.95 4.67 3.69 8 3.5H16Z'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeMiterlimit='10'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>

              <span className='ml-2'>Categories</span>
              {!query.categories.length ? (
                <ChevronDownIcon className='w-4 h-4 ml-3' />
              ) : (
                <span>{renderXClear()}</span>
              )}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-200'
              enterFrom='opacity-0 translate-y-1'
              enterTo='opacity-100 translate-y-0'
              leave='transition ease-in duration-150'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 translate-y-1'>
              <Popover.Panel className='absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md'>
                <div className='overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700'>
                  <div className='relative flex flex-col px-5 py-6 space-y-5'>
                    {/* <div className='w-full border-b border-neutral-200 dark:border-neutral-700' /> */}
                    {categoriesState.map((item: any) => (
                      <div key={item.id} className=''>
                        <Checkbox
                          name={item.name}
                          label={item.name}
                          defaultChecked={filters.categories.includes(
                            item.name,
                          )}
                          onChange={checked =>
                            handleChangeCategories(checked, item.name)
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div className='p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between'>
                    <ButtonThird
                      onClick={() => {
                        close();
                        handelClear("categories")


                      }}
                      sizeClass='px-4 py-2 sm:px-5'>
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={()=>{ 
                        close();
                        handelQuerySubmit()
                      }}
                      sizeClass='px-4 py-2 sm:px-5'>
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  // OK
  const renderTabsColor = () => {
    return (
      <Popover className='relative'>
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none select-none
              ${open ? '!border-primary-500 ' : ''}
                ${
                  !!query.colors.length
                    ? '!border-primary-500 bg-primary-50 text-primary-900'
                    : 'border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500'
                }
                `}>
              <svg
                className='w-4 h-4'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M7.01 18.0001L3 13.9901C1.66 12.6501 1.66 11.32 3 9.98004L9.68 3.30005L17.03 10.6501C17.4 11.0201 17.4 11.6201 17.03 11.9901L11.01 18.0101C9.69 19.3301 8.35 19.3301 7.01 18.0001Z'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeMiterlimit='10'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M8.35 1.94995L9.69 3.28992'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeMiterlimit='10'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M2.07 11.92L17.19 11.26'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeMiterlimit='10'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M3 22H16'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeMiterlimit='10'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M18.85 15C18.85 15 17 17.01 17 18.24C17 19.26 17.83 20.09 18.85 20.09C19.87 20.09 20.7 19.26 20.7 18.24C20.7 17.01 18.85 15 18.85 15Z'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>

              <span className='ml-2'>Colors</span>
              {!query.colors.length ? (
                <ChevronDownIcon className='w-4 h-4 ml-3' />
              ) : (
                <span
                  onClick={() =>
                    // setFilters((prev: any) => ({ ...prev, colors: [] }))
                    handelClear("colors")
                  }>
                  {renderXClear()}
                </span>
              )}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-200'
              enterFrom='opacity-0 translate-y-1'
              enterTo='opacity-100 translate-y-0'
              leave='transition ease-in duration-150'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 translate-y-1'>
              <Popover.Panel className='absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-sm'>
                <div className='overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700'>
                  <div className='relative flex flex-col px-5 py-6 space-y-5'>
                    {default_category_colors.map(item => (
                      <div key={item.name} className=''>
                        <Checkbox
                          name={item.name}
                          label={item.name}
                          defaultChecked={query.colors.includes(item.name)}
                          onChange={checked =>
                            handleChangeColors(checked, item.name)
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div className='p-5 bg-slate-50 dark:bg-slate-900 dark:border-t dark:border-slate-800 flex items-center justify-between'>
                    <ButtonThird
                      onClick={() => {
                        close();
                        // setColorsState([]);
                        // setFilters((prev: any) => ({ ...prev, colors: [] }));
                        handelClear("colors")
                      }}
                      sizeClass='px-4 py-2 sm:px-5'>
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={()=>{
                        handelQuerySubmit();
                        close();
                      }}
                      sizeClass='px-4 py-2 sm:px-5'>
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  // OK
  const renderTabsSize = () => {
    return (
      <Popover className='relative'>
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none select-none
              ${open ? '!border-primary-500 ' : ''}
                ${
                  !!query.sizes.length
                    ? '!border-primary-500 bg-primary-50 text-primary-900'
                    : 'border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500'
                }
                `}>
              <svg
                className='w-4 h-4'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M21 9V3H15'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M3 15V21H9'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M21 3L13.5 10.5'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M10.5 13.5L3 21'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>

              <span className='ml-2'>Sizes</span>
              {!query.sizes.length ? (
                <ChevronDownIcon className='w-4 h-4 ml-3' />
              ) : (
                <span
                  onClick={() =>
                    // setFilters((prev: any) => ({ ...prev, sizes: [] }))
                    handelClear("sizes")
                  }>
                  {renderXClear()}
                </span>
              )}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-200'
              enterFrom='opacity-0 translate-y-1'
              enterTo='opacity-100 translate-y-0'
              leave='transition ease-in duration-150'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 translate-y-1'>
              <Popover.Panel className='absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-sm'>
                <div className='overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700'>
                  <div className='relative flex flex-col px-5 py-6 space-y-5'>
                    {default_category_sizes.map(item => (
                      <div key={item.name} className=''>
                        <Checkbox
                          name={item.name}
                          label={item.name}
                          defaultChecked={query.sizes.includes(item.name)}
                          onChange={checked =>
                            handleChangeSizes(checked, item.name)
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div className='p-5 bg-slate-50 dark:bg-slate-900 dark:border-t dark:border-slate-800 flex items-center justify-between'>
                    <ButtonThird
                      onClick={() => {
                        close();
                        // setFilters((prev: any) => ({ ...prev, sizes: [] }));
                        handelClear("sizes")
                      }}
                      sizeClass='px-4 py-2 sm:px-5'>
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={()=>{ 
                        handelQuerySubmit();
                        close();
                      }}
                      sizeClass='px-4 py-2 sm:px-5'>
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  // OK
  const renderMoreFilterItem = (data: any[], type: string) => {
    const list1 = data.filter((_, i) => i < data.length / 2);
    const list2 = data.filter((_, i) => i >= data.length / 2);
   
    const controlMobileChecked = (checked: boolean, name: string) => {
      if (type === 'categories') {
        handleChangeCategories(checked, name);
      }
      if (type === 'colors') {
        handleChangeColors(checked, name);
      }
      if (type === 'sizes') {
        handleChangeSizes(checked, name);
      }
    };

    return (
      <div className='grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-8'>
        <div className='flex flex-col space-y-5'>
          {list1.map(item => (
            <Checkbox
              key={item.name}
              name={item.name}
              label={item.name}
              defaultChecked={query[type].includes(item.name)}
              onChange={checked => controlMobileChecked(checked, item.name)}
            />
          ))}
        </div>
        <div className='flex flex-col space-y-5'>
          {list2.map(item => (
            <Checkbox
              key={item.name}
              name={item.name}
              label={item.name}
              defaultChecked={query[type].includes(item.name)}
              onChange={checked => controlMobileChecked(checked, item.name)}
            />
          ))}
        </div>
      </div>
    );
  };

  // FOR RESPONSIVE MOBILE
  const renderTabMobileFilter = () => {
    return (
      <div className='flex-shrink-0'>
        <div
          className={`flex flex-shrink-0 items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-900 focus:outline-none cursor-pointer select-none`}
          onClick={openModalMoreFilter}>
          <svg
            className='w-4 h-4'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M22 6.5H16'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeMiterlimit='10'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M6 6.5H2'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeMiterlimit='10'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M10 10C11.933 10 13.5 8.433 13.5 6.5C13.5 4.567 11.933 3 10 3C8.067 3 6.5 4.567 6.5 6.5C6.5 8.433 8.067 10 10 10Z'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeMiterlimit='10'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M22 17.5H18'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeMiterlimit='10'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M8 17.5H2'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeMiterlimit='10'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M14 21C15.933 21 17.5 19.433 17.5 17.5C17.5 15.567 15.933 14 14 14C12.067 14 10.5 15.567 10.5 17.5C10.5 19.433 12.067 21 14 21Z'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeMiterlimit='10'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>

          <span className='ml-2'>Products filters</span>
          {renderXClear()}
        </div>

        <Transition appear show={isOpenMoreFilter} as={Fragment}>
          <Dialog
            as='div'
            className='fixed inset-0 z-50 overflow-y-auto'
            onClose={closeModalMoreFilter}>
            <div className='min-h-screen text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'>
                <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60' />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className='inline-block h-screen align-middle'
                aria-hidden='true'>
                &#8203;
              </span>
              <Transition.Child
                className='inline-block h-screen w-full max-w-4xl'
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'>
                <div className='inline-flex flex-col w-full text-left align-middle transition-all transform bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 h-full'>
                  <div className='relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center'>
                    <Dialog.Title
                      as='h3'
                      className='text-lg font-medium leading-6 text-gray-900'>
                      Products filters
                    </Dialog.Title>
                    <span className='absolute left-3 top-3'>
                      <ButtonClose onClick={closeModalMoreFilter} />
                    </span>
                  </div>

                  <div className='flex-grow overflow-y-auto'>
                    <div className='px-6 sm:px-8 md:px-10 divide-y divide-neutral-200 dark:divide-neutral-800'>
                      {/* --------- */}
                      {/* ---- */}
                      <div className='py-7'>
                        <h3 className='text-xl font-medium'>Categories</h3>
                        <div className='mt-6 relative '>
                          {renderMoreFilterItem(categoriesState, 'categories')}
                        </div>
                      </div>
                      {/* --------- */}
                      {/* ---- */}
                      <div className='py-7'>
                        <h3 className='text-xl font-medium'>Colors</h3>
                        <div className='mt-6 relative '>
                          {renderMoreFilterItem(
                            default_category_colors,
                            'colors',
                          )}
                        </div>
                      </div>
                      {/* --------- */}
                      {/* ---- */}
                      <div className='py-7'>
                        <h3 className='text-xl font-medium'>Sizes</h3>
                        <div className='mt-6 relative '>
                          {renderMoreFilterItem(
                            default_category_sizes,
                            'sizes',
                          )}
                        </div>
                      </div>

                      {/* --------- */}

                      {/* ---- */}
                      <div className='py-7'>
                        <h3 className='text-xl font-medium'>Range Prices</h3>
                        <div className='mt-6 relative '>
                          <div className='relative flex flex-col space-y-8'>
                            <div className='space-y-5'>
                              <Slider
                                range
                                className='text-red-400'
                                min={default_range_prices[0]}
                                max={default_range_prices[1]}
                                defaultValue={query.priceRange}
                                allowCross={false}
                                onChange={(_input: number | number[]) =>
                                  setQuery((prev: any) => ({
                                    ...prev,
                                    priceRange: _input as number[],
                                  }))
                                }
                              />
                            </div>

                            <div className='flex justify-between space-x-5'>
                              <div>
                                <label
                                  htmlFor='minPrice'
                                  className='block text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                                  Min price
                                </label>
                                <div className='mt-1 relative rounded-md'>
                                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <span className='text-neutral-500 sm:text-sm'>
                                      ৳
                                    </span>
                                  </div>
                                  <input
                                    type='text'
                                    name='minPrice'
                                    disabled
                                    id='minPrice'
                                    className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900'
                                    value={query.priceRange[0]}
                                  />
                                </div>
                              </div>
                              <div>
                                <label
                                  htmlFor='maxPrice'
                                  className='block text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                                  Max price
                                </label>
                                <div className='mt-1 relative rounded-md'>
                                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <span className='text-neutral-500 sm:text-sm'>
                                      ৳
                                    </span>
                                  </div>
                                  <input
                                    type='text'
                                    disabled
                                    name='maxPrice'
                                    id='maxPrice'
                                    className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900'
                                    value={query.priceRange[1]}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='p-6 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between'>
                    <ButtonThird
                      onClick={() => {
                        setQuery((prev: any) => ({
                          ...prev,
                          categories: [],
                          subCategories: [],
                          colors: [],
                          sizes: [],
                          priceRange: default_range_prices,
                        }));
                        setFilters((prev: any) => ({
                          ...prev,
                          categories: [],
                          subCategories: [],
                          colors: [],
                          sizes: [],
                          priceRange: default_range_prices,
                        }));
                        closeModalMoreFilter();
                      }}
                      sizeClass='px-4 py-2 sm:px-5'>
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={()=>{ 
                        handelQuerySubmit()
                        closeModalMoreFilter()
                      }}
                      sizeClass='px-4 py-2 sm:px-5'>
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    );
  };

  const renderFilter = () => {
    return (
      <span className='block flex-shrink-0 text-right'>
        <ButtonPrimary
          className='w-auto !pr-16'
          sizeClass='pl-4 py-2.5 sm:pl-6'
          onClick={() => {
            setIsOpen(!isOpen);
          }}>
          <svg
            className={`w-4 h-4 sm:w-6 sm:h-6`}
            viewBox='0 0 24 24'
            fill='none'>
            <path
              d='M14.3201 19.07C14.3201 19.68 13.92 20.48 13.41 20.79L12.0001 21.7C10.6901 22.51 8.87006 21.6 8.87006 19.98V14.63C8.87006 13.92 8.47006 13.01 8.06006 12.51L4.22003 8.47C3.71003 7.96 3.31006 7.06001 3.31006 6.45001V4.13C3.31006 2.92 4.22008 2.01001 5.33008 2.01001H18.67C19.78 2.01001 20.6901 2.92 20.6901 4.03V6.25C20.6901 7.06 20.1801 8.07001 19.6801 8.57001'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeMiterlimit='10'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M16.07 16.52C17.8373 16.52 19.27 15.0873 19.27 13.32C19.27 11.5527 17.8373 10.12 16.07 10.12C14.3027 10.12 12.87 11.5527 12.87 13.32C12.87 15.0873 14.3027 16.52 16.07 16.52Z'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M19.87 17.12L18.87 16.12'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>

          <span className='block truncate ml-2.5'>Filter</span>
          <span className='absolute top-1/2 -translate-y-1/2 right-5'>
            <ChevronDownIcon
              className={`w-4 h-4 sm:w-5 sm:h-5 ${isOpen ? 'rotate-180' : ''}`}
              aria-hidden='true'
            />
          </span>
        </ButtonPrimary>
      </span>
    );
  };

  return (
    <div className='flex lg:space-x-4'>
      {/* FOR DESKTOP */}
      <div className='hidden lg:flex flex-1 space-x-4'>
        {isOpen && (
          <>
            {renderTabsPriceRage()}
            {renderTabsCategories()}
            {renderTabsColor()}
            {renderTabsSize()}
          </>
        )}

        <div className='!ml-auto'> {renderFilter()}</div>
      </div>

      <div className='flex flex-1 space-x-4 lg:hidden'>
        {isOpen && renderTabMobileFilter()}
        <div className='!ml-auto'> {renderFilter()}</div>
      </div>
    </div>
  );
};

export default TabFilters;
