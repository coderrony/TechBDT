'use client';
import Prices from '@/components/Prices';

import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import formatNumber from '@/utils/formatNumber';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import QuantityBtn from './QuantityBtn';
import { NoSymbolIcon, CheckIcon } from '@heroicons/react/24/outline';
import { calculateCartTotal } from '@/utils/calculateCartTotal';

// import useAuthData from '@/hooks/useAuthData';
import LoadingIndicator from '@/components/LoadingIndicator';
import useCart from '@/hooks/useCart';


interface CartInfoProps {
  className?: string;
}

const CartInfo: FC<CartInfoProps> = () => {

  // const {authDataFetch:{authData,isFetchingAuthData},cartDelete:{handleRemoveFromCart}} = useAuthData() as any;
  const {cartDataFetch:{cartData,isFetchingCart},cartDelete:{handleRemoveFromCart,isRemoving}} = useCart() as any;
  // console.log("cartData ",cartData);
  
  const cartTotalAmount = calculateCartTotal(cartData?.products);

  const renderStatusInstock = () => {
    return (
      <div className='rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'>
        <CheckIcon className='w-3.5 h-3.5' />
        <span className='ml-1 leading-none'>In Stock</span>
      </div>
    );
  };


  const renderProduct = (item: any) => {

    return (
      <div
        key={item._id.toString()}
        className='relative flex py-8 sm:py-10 xl:py-12 first:pt-0 last:pb-0'>
        <div className='relative h-36 w-24 sm:w-32 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100'>
          <Image
            fill
            src={item?.product?.thumbnail}
            alt={item?.product?.name}
            sizes='300px'
            className='h-full w-full object-contain object-center'
          />
          <Link
            href={`/product-detail/${item?.product?.slug}`}
            className='absolute inset-0'></Link>
        </div>

        <div className='ml-3 sm:ml-6 flex flex-1 flex-col'>
          <div>
            <div className='flex justify-between '>
              <div className='flex-[1.5] '>
                <h3 className='text-base font-semibold'>
                  <Link href={`/product-detail/${item?.product?.slug}`}>
                    {item?.product?.name}
                  </Link>
                </h3>
                <div className='mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300'>
                  <div className='flex items-center space-x-1.5'>
                    <svg className='w-4 h-4' viewBox='0 0 24 24' fill='none'>
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

                    {item.color && <span>{item.color}</span>}
                  </div>
                  <span className='mx-4 border-l border-slate-200 dark:border-slate-700 '></span>
                  <div className='flex items-center space-x-1.5'>
                    <svg className='w-4 h-4' viewBox='0 0 24 24' fill='none'>
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

                    {item.size && <span>{item.size}</span>}
                  </div>
                </div>

                <div className='mt-3 flex justify-between w-full sm:hidden relative'>
                  <Prices
                    contentClass='py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium h-full'
                    price={item?.product?.price}
                  />
                </div>
              </div>

              <div className='hidden sm:block text-center relative'>
                {/* <NcInputNumber className="relative z-10" defaultValue={item.quantity} cartId={item._id.toString()} /> */}
                <QuantityBtn
                  className='relative z-10'
                  defaultValue={item.quantity}
                  cartId={item._id.toString()}
                />
              </div>

              <div className='hidden flex-1 sm:flex justify-end'>
                <Prices price={item?.product?.price} className='mt-0.5' />
              </div>
            </div>
          </div>

          <div className='flex mt-auto pt-4 items-end justify-between text-sm'>
            {renderStatusInstock()}
           {isRemoving ? <LoadingIndicator/> :    <button
               onClick={()=> handleRemoveFromCart(item._id.toString())}
         
              className='relative z-10 flex items-center mt-3 font-medium text-primary-6000 hover:text-primary-500 text-sm '>
              <span>Remove</span>
            </button>}
         
          </div>
        </div>
      </div>
    );
  };

  if(isFetchingCart)   return <LoadingIndicator />;

  return (
    <div className='flex flex-col lg:flex-row'>
      <div className='w-full lg:w-[60%] xl:w-[55%] divide-y divide-slate-200 dark:divide-slate-700 '>
        {cartData?.products.map(renderProduct)}
      </div>
      <div className='border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:mx-16 2xl:mx-20 flex-shrink-0'></div>
      <div className='flex-1'>
        <div className='sticky top-28'>
          <h3 className='text-lg font-semibold '>Order Summary</h3>
          <div className='mt-7 text-sm text-slate-500 dark:text-slate-400 divide-y divide-slate-200/70 dark:divide-slate-700/80'>
            <div className='flex justify-between pb-4'>
              <span>Subtotal</span>
              <span className='font-semibold text-slate-900 dark:text-slate-200'>
                {formatNumber(cartTotalAmount)}
              </span>
            </div>
            <div className='flex justify-between py-4'>
              <span>Tax estimate</span>
              <span className='font-semibold text-slate-900 dark:text-slate-200'>
                BDT 00.00
              </span>
            </div>
            <div className='flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4'>
              <span>Order total</span>
              <span>{formatNumber(cartTotalAmount)}</span>
            </div>
          </div>
          <ButtonPrimary href='/checkout' className='mt-8 w-full'>
            Checkout
          </ButtonPrimary>
          <div className='mt-5 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center'>
            <p className='block relative pl-5'>
              <svg
                className='w-4 h-4 absolute -left-1 top-0.5'
                viewBox='0 0 24 24'
                fill='none'>
                <path
                  d='M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M12 8V13'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M11.9945 16H12.0035'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              Learn more 
            
              <span>
                {` `}and{` `}
              </span>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='##'
                className='text-slate-900 dark:text-slate-200 underline font-medium'>
                Shipping
              </a>
              {` `} infomation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartInfo;
