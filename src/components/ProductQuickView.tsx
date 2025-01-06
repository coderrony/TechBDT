'use client';
import React, { FC, useState, useTransition } from 'react';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import LikeButton from '@/components/LikeButton';
import { StarIcon } from '@heroicons/react/24/solid';
import BagIcon from '@/components/BagIcon';
import NcInputNumber from '@/components/NcInputNumber';

import {
  // NoSymbolIcon,
  // ClockIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
// import IconDiscount from '@/components/IconComponents/IconDiscount';
import Prices from '@/components/Prices';
import toast from 'react-hot-toast';

import NotifyAddTocart from './NotifyAddTocart';
import AccordionInfo from '@/components/AccordionInfo';
import Image from 'next/image';
import Link from 'next/link';

import ProductStatus from './ProductStatus';
import { ProductType } from '@/types/ProductTypes';
import { createAddToCart } from '@/queries/addToCart';
import { notFound } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import LoadingIndicator from './LoadingIndicator';

export interface ProductQuickViewProps {
  className?: string;
  data: ProductType;
}

const ProductQuickView: FC<ProductQuickViewProps> = ({
  className = '',
  data,
}) => {
  const {
    id,
    slug,
    name,
    price,
    thumbnail,
    sizes,
    colors,
    status,
    reviews,
    EN_content,
    BN_content,
    images_gallery,
    product_role,
  } = data;

  const rating = reviews?.reduce((sum, item) => sum + item.rating, 0);
  const numberOfReviews = reviews?.length;
  const [isPending, startTransition] = useTransition();
  const [sizeSelected, setSizeSelected] = useState(sizes ? sizes[0] : '');
  const [colorSelected, setColorSelected] = useState(colors ? colors[0] : '');
  const [qualitySelected, setQualitySelected] = useState(1);
  const inactiveProduct = product_role === 'inactive';
  const { fetchMe } = useAuth();
  const addToCartData: any = {
    product: id,
    quantity: qualitySelected,
  };

  const handleAddTOCart = async () => {
    startTransition(async () => {
      if (sizeSelected !== '') {
        addToCartData['size'] = sizeSelected;
      }

      if (colorSelected !== '') {
        addToCartData['color'] = colorSelected;
      }
      const cartRes = (await createAddToCart(addToCartData)) as any;
      // console.log("cartRes ",cartRes);
      if (cartRes.status === 500) {
        notFound();
      }
      if (cartRes.status === 200) {
        fetchMe();
        notifyAddTocart(cartRes.message);
      }
    });
  };

  const notifyAddTocart = (title: string) => {
    toast.custom(
      t => (
        <NotifyAddTocart
          productImage={thumbnail}
          qualitySelected={qualitySelected}
          show={t.visible}
          sizeSelected={sizeSelected}
          name={name}
          price={price}
          title={title}
        />
      ),
      { position: 'top-right', id: 'nc-product-notify', duration: 2500 },
    );
  };

  const renderSizeList = () => {
    if (!sizes || !sizes.length) {
      return null;
    }
    return (
      <div>
        <div className='flex justify-between font-medium text-sm'>
          <label htmlFor=''>
            <span className=''>
              Size:
              <span className='ms-1 font-semibold'>{sizeSelected}</span>
            </span>
          </label>
        </div>
        <div className='grid grid-cols-4 sm:grid-cols-5 gap-2 mt-2.5'>
          {sizes.map((size, index) => {
            const isActive = size === sizeSelected;

            return (
              <div
                key={index}
                className={`relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center 
                text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0  ${
                  isActive
                    ? 'bg-primary-6000 border-primary-6000 text-white hover:bg-primary-6000'
                    : 'border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-200 hover:bg-neutral-50 dark:hover:bg-neutral-700'
                }`}
                onClick={() => {
                  setSizeSelected(size);
                }}>
                {size}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  const renderColorList = () => {
    if (!colors || !colors.length) {
      return null;
    }
    return (
      <div>
        <div className='flex justify-between font-medium text-sm'>
          <label htmlFor=''>
            <span className=''>
              Color:
              <span className='ms-1 font-semibold'>{colorSelected}</span>
            </span>
          </label>
        </div>
        <div className='grid grid-cols-3 sm:grid-cols-5 gap-2 mt-2.5'>
          {colors.map((color, index) => {
            const isActive = color === colorSelected;

            return (
              <div
                key={index}
                className={`relative  rounded-2xl border flex items-center justify-center 
                text-sm p-2  uppercase font-semibold select-none overflow-hidden z-0  ${
                  isActive
                    ? 'bg-primary-6000 border-primary-6000 text-white hover:bg-primary-6000'
                    : 'border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-200 hover:bg-neutral-50 dark:hover:bg-neutral-700'
                }`}
                onClick={() => {
                  setColorSelected(color);
                }}>
                {color}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderSectionContent = () => {
    return (
      <div className='space-y-8'>
        {/* ---------- 1 HEADING ----------  */}
        <div>
          <h2 className='text-2xl font-semibold hover:text-primary-6000 transition-colors'>
            <Link href={`/product-detail/${slug}`}>{name}</Link>
          </h2>

          <div className='flex justify-start rtl:justify-end items-center mt-5 space-x-4 sm:space-x-5 rtl:space-x-reverse'>
            {/* <div className="flex text-xl font-semibold">$112.00</div> */}
            <Prices
              contentClass='py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold'
              price={price}
            />

            <div className='h-6 border-s border-slate-300 dark:border-slate-700'></div>

            <div className='flex items-center'>
              <Link
                href={`/product-detail/${slug}`}
                className='flex items-center text-sm font-medium'>
                <StarIcon className='w-5 h-5 pb-[1px] text-yellow-400' />
                <div className='ms-1.5 flex'>
                  <span>{rating}</span>
                  <span className='block mx-2'>·</span>
                  <span className='text-slate-600 dark:text-slate-400 underline'>
                    {numberOfReviews} reviews
                  </span>
                </div>
              </Link>
              <span className='hidden sm:block mx-2.5'>·</span>
              <div className='hidden sm:flex items-center text-sm'>
                <SparklesIcon className='w-3.5 h-3.5' />
                <span className='ms-1 leading-none'>{status}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- 3 VARIANTS AND SIZE LIST ----------  */}

        <div className=''>{renderSizeList()}</div>
        <div className=''>{renderColorList()}</div>

        {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
        <div className='flex space-x-3.5 rtl:space-x-reverse'>
          <div className='flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full'>
            <NcInputNumber
              defaultValue={qualitySelected}
              onChange={setQualitySelected}
            />
          </div>
          {isPending ? (
            <div className='flex justify-center items-center w-full mx-auto'><LoadingIndicator /></div>
          ) : (
            <ButtonPrimary
              disabled={inactiveProduct}
              className='flex-1 flex-shrink-0'
              onClick={handleAddTOCart}>
              <BagIcon className='hidden sm:inline-block w-5 h-5 mb-0.5' />
              <span className='ms-3'>Add to cart</span>
            </ButtonPrimary>
          )}
        </div>

        {/*  */}
        <hr className=' border-slate-200 dark:border-slate-700'></hr>
        {/*  */}

        {/* ---------- 5 ----------  */}
        <AccordionInfo en_content={EN_content} bn_content={BN_content} />
      </div>
    );
  };

  // const loadingIndicator = () => {
  //   return <LoadingIndicator />;
  // };
  // if(isPending) return loadingIndicator();

  return (
    <div className={`nc-ProductQuickView ${className}`}>
      {/* MAIn */}
      <div className='lg:flex'>
        {/* CONTENT */}
        <div className='w-full lg:w-[50%] '>
          {/* HEADING */}
          <div className='relative'>
            <div className='aspect-w-16 aspect-h-16'>
              <Image
                src={thumbnail}
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                className='w-full rounded-xl object-cover'
                alt='product detail 1'
              />
            </div>

            <ProductStatus status={inactiveProduct ? 'Stock Out' : status} />
            {/* META FAVORITES */}
            <LikeButton className='absolute end-3 top-3 ' />
          </div>
          <div className='hidden lg:grid grid-cols-2 gap-3 mt-3 sm:gap-6 sm:mt-6 xl:gap-5 xl:mt-5'>
            {images_gallery.length > 0 &&
              images_gallery.slice(0, 2).map((item, index) => {
                return (
                  <div key={index} className='aspect-w-3 aspect-h-4'>
                    <Image
                      fill
                      src={item}
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                      className='w-full rounded-xl object-cover'
                      alt={`product detail ${index + 1}`}
                    />
                  </div>
                );
              })}
          </div>
        </div>

        {/* SIDEBAR */}
        <div className='w-full lg:w-[50%] pt-6 lg:pt-0 lg:ps-7 xl:ps-8'>
          {renderSectionContent()}
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;
