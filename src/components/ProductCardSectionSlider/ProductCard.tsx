import React, { FC } from 'react';

import { StarIcon } from '@heroicons/react/24/solid';

import ProductStatus from '../ProductStatus';

import Link from 'next/link';
import NcImage from '@/shared/NcImage/NcImage';
// import { ProductType } from '@/types/ProductTypes';
import calculateOldPrice from '@/utils/calculateOldPrice';
import LikeButton from '../LikeButton';
import SectionCardBtns from './SectionCardBtns';
import Prices from '../Prices';
import OldPrice from '../OldPrice';
import { ProductType } from '@/types/ProductTypes';

interface ProductCardProps {
  className?: string;
  data: ProductType;
  isLiked?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  className = '',
  data,
  isLiked,
}) => {
  const { name, price, status = '', thumbnail,slug, discount, reviews } = data;

  const rating = reviews.reduce((sum, item) => sum + item.rating, 0);
  const numberOfReviews = reviews?.length;

  // console.log("reviews ",reviews)

  return (
    <>
      <div
        className={`nc-ProductCard relative flex flex-col bg-transparent ${className}`}>
        <Link
          href={`/product-detail/${slug}`}
          className='absolute inset-0'></Link>

        <div className='relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group'>
          <Link href={`/product-detail/${slug}`} className='block'>
            <NcImage
              containerClassName='flex aspect-w-11 aspect-h-12 w-full h-0'
              src={thumbnail}
              className='object-cover w-full h-full drop-shadow-xl'
              fill
              sizes='(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw'
              alt='product'
            />
          </Link>
          <ProductStatus status={status} />
          <LikeButton liked={isLiked} className='absolute top-3 end-3 z-10' />

          <SectionCardBtns data={data} />
        </div>

        <div className='space-y-3 px-2.5 pt-5 pb-2.5'>
          <div>
            <h2 className='nc-ProductCard__title text-base font-semibold transition-colors'>
              {name}
            </h2>

            <p className={`text-sm text-red-600  mt-1 h-5 font-semibold`}>
              {discount && ` %${discount} OFF`}
            </p>
          </div>
          <div className='flex items-center'>
            <Prices price={price} />

            {discount && (
              <OldPrice price={calculateOldPrice(price, discount)} />
            )}
          </div>

          <div className='flex justify-between items-end '>
            <div className='flex items-center mb-0.5'>
              <StarIcon className='w-5 h-5 pb-[1px] text-amber-400' />
              <StarIcon className='w-5 h-5 pb-[1px] text-amber-400' />
              <StarIcon className='w-5 h-5 pb-[1px] text-amber-400' />
              <StarIcon className='w-5 h-5 pb-[1px] text-amber-400' />
              <StarIcon className='w-5 h-5 pb-[1px] text-amber-400' />

              <span className='text-sm ms-1 text-slate-500 dark:text-slate-400'>
                {rating || ''} ({numberOfReviews || 0} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
