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
import Label from '@/components/Label/Label';
import SelectValue from '@/components/SelectValue';
import { useForm } from 'react-hook-form';
import useAuthData from '@/hooks/useAuthData';
import { redirect, useRouter } from 'next/navigation';
import Radio from '@/shared/Radio/Radio';
import Input from '@/shared/Input/Input';
// import { createCharge } from '@/services/uddoktaPayService';
import axios from 'axios';

interface CartInfoProps {
  className?: string;
}

const CartInfo: FC<CartInfoProps> = () => {
  const {
    authDataFetch: { authData },
  } = useAuthData() as any;

  const {
    register,
    handleSubmit,
    reset,
    control, // Extract control from useForm
    setError,
    setValue, // Add this line
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      deliveryType: 'regular',
      shipping: 'all-bangladesh', // Default shipping value
      address:authData?.address[0]?._id.toString() ,
    }
    
  });
  const router = useRouter();
  
  const {
    cartDataFetch: { cartData, isFetchingCart },
    cartDelete: { handleRemoveFromCart, isRemoving },
  } = useCart() as any;
  // console.log("cartData ",cartData);
  // console.log('authData ', authData);
  const deliveryType = watch('deliveryType'); 

  // console.log("deliveryType ",deliveryType);
  

  const cartTotalAmount = calculateCartTotal(cartData?.products);
  const advancePay = cartTotalAmount > 3000 ? 500 : 200

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
            {isRemoving ? (
              <LoadingIndicator />
            ) : (
              <button
                onClick={() => handleRemoveFromCart(item._id.toString())}
                className='relative z-10 flex items-center mt-3 font-medium text-primary-6000 hover:text-primary-500 text-sm '>
                <span>Remove</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const handleOnSubmit =async (data: any) => {
    console.log('data ', data);
    if (authData?.address?.length === 0) {
      return router.push('/account');
    }


    try {
      const metadata = { user_id: '123', order_id: '456' };
      // const redirectUrl = 'https://techbdt.com/orders';
      // const cancelUrl = 'https://techbdt.com/cancel';
      // const webhookUrl = 'https://techbdt.com/ipn';


     // UddoktaPay পেমেন্ট রিকোয়েস্ট তৈরির জন্য ডেটা প্রস্তুত করুন
     const paymentRequest = {
      full_name: authData?.name || "Customer",
      email: authData?.email || "customer@example.com",
      amount: calculateCartTotal(cartData?.products).toString(), // মোট অর্ডারের মূল্য
      metadata: {
        user_id: authData?._id,
        order_id: `order_${Date.now()}`, // ইউনিক অর্ডার আইডি
      },
      redirect_url: `${process.env.NEXT_PUBLIC_SITE_URL}/account-order`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
      webhook_url: `${process.env.NEXT_PUBLIC_SITE_URL}/ipn`,
    };

       // UddoktaPay এন্ডপয়েন্টে POST রিকোয়েস্ট করুন
       const response = await axios.post(
        '/api/get-payment-url',
        paymentRequest,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "RT-UDDOKTAPAY-API-KEY": "TkGiKx2HVtGUPcCEmj7la12bNtyr1MQdi5i2pu0L", // UddoktaPay থেকে সংগ্রহ করা API কী
          },
        }
      );
  


      const result = response.data;

      console.log("cart response result",result);
      

      if (result?.status === 200) {
        window.location.href = result.res_data.payment_url!;
        // router.push(result.payment_url);
        // redirect(result.payment_url!);
      } else {
        alert('Failed to create payment: ' + result.message);
      }
    } catch (error: any) {
      alert('Error: ' + error.message);
    } 


  };

  // const handleOnChangeCod = () => {
  //   const deliveryType = watch('deliveryType'); // Get the current value of deliveryType
  //   console.log('Current delivery type:', deliveryType);
  //   setValue('deliveryType', 'cod'); // Set the value to 'cod'
  // };

  if (isFetchingCart) return <LoadingIndicator />;

  return (
    <div className='flex flex-col lg:flex-row'>
      <div className='w-full lg:w-[60%] xl:w-[55%] divide-y divide-slate-200 dark:divide-slate-700 '>
        {cartData?.products.map(renderProduct)}
      </div>
      <div className='border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:mx-16 2xl:mx-20 flex-shrink-0'></div>
      <div className='flex-1'>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <div className='sticky top-28'>
            <h3 className='text-lg font-semibold '>Order Summary</h3>

            <div className='mt-7 text-sm text-slate-500 dark:text-slate-400 divide-y divide-slate-200/70 dark:divide-slate-700/80'>

              <div>
                <Label className="text-sm">Discount code</Label>
                <div className="flex mt-1.5 pb-4">
                  <Input sizeClass="h-10 px-4 py-3" className="flex-1" />
                  <button className="text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 rounded-2xl px-4 ml-3 font-medium text-sm bg-neutral-200/70 dark:bg-neutral-700 dark:hover:bg-neutral-800 w-24 flex justify-center items-center transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Select Address */}
              {authData?.address?.length > 0 ? (
                <div className=' py-4'>
                  <Label>Select Address</Label>
                  <SelectValue
                    // value={selectedDivision}
                    className='mt-1.5'
                    {...register('address')}
                   
                    // onChange={handleDivisionChange} // Add onChange
                  >
                    {authData?.address?.map((address: any) => (
                      <option
                        value={address?._id?.toString()}
                        key={address?._id?.toString()}>
                        {`${address?.house}, ${address?.division}, ${address?.district},  ${address?.upzila}, ${address?.union}`}
                      </option>
                    ))}
                  </SelectValue>
                </div>
              ) : (
                <div className='mb-4'>
                  <Link
                    href={'/account'}
                    className='bg-red-500 text-white p-2 w-full   rounded'>
                    Add Address
                  </Link>
                </div>
              )}
            {/* delivery */}
            <div className="py-4">
              <Label className="text-sm">Delivery type</Label>
              <div className="flex flex-col gap-4 mt-1.5">
                <Radio
                  label={`<span class="text-sm font-medium">Regular Delivery</span>`}
                  id="regular-delivery"
                  {...register('deliveryType')}
                  onChange={() => setValue('deliveryType', 'regular')}
                  defaultChecked
                />
                <Radio
                  label={`<span class="text-sm font-medium">Cash On Delivery <span class="font-light">(COD)</span></span>`}
                  id="cod"
                  {...register('deliveryType')}
                  onChange={() => setValue('deliveryType', 'cod')}
                />
              </div>
              {/* {errors.deliveryType && (
                <span className="text-red-500 text-sm">Please select a delivery type</span>
              )} */}
            </div>

            {/* shipping */}
            <div className="py-4">
              <Label className="text-sm">Shipping</Label>
              <div className="flex flex-col gap-4 mt-1.5">
               <div className='flex justify-between items-center'>
                <Radio
                    label={`<span class="text-sm font-medium">All Bangladesh (Pathao Courier): </span>`}
                    id="shipping"
                    {...register('shipping', { required: true })}
                    onChange={() => setValue('shipping', 'all-bangladesh')}
                    defaultChecked
                  />
                  <p className='font-semibold text-slate-900 dark:text-slate-200'>120 BDT</p>
               </div>
               <div className='flex justify-between items-center'>
                <Radio
                    label={`<span class="text-sm font-medium">Dhaka City Corporation: </span>`}
                    id="shipping"
                    {...register('shipping', { required: true })}
                    onChange={() => setValue('shipping', 'dhaka-city-corporation')}
                 
                  />
                  <p className='font-semibold text-slate-900 dark:text-slate-200'>60 BDT</p>
               </div>
           
              </div>
              {errors.shipping && (
                <span className="text-red-500 text-sm">Please select a Shipping</span>
              )}
            </div>

           

{/* Subtotal */}
              <div className='flex justify-between py-4'>
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

              { deliveryType === 'cod' && 
              <>
                {/* Advance pay */}
                 <div className='flex justify-between py-4 mt-4'>
                <span>Advance pay </span>
                <span className='font-semibold text-slate-900 dark:text-slate-200'>
                  BDT {advancePay}
                </span>
              </div>

              {/* Due payment */}
              <div className='flex justify-between py-4'>
                <span>Due payment </span>
                <span className='font-semibold text-slate-900 dark:text-slate-200'>
                  {formatNumber(cartTotalAmount - advancePay)}
                </span>
              </div>
              </>
              }

            <div className='fpy-4 mt-4'>
                <h2 className='font-semibold text-slate-900 dark:text-slate-200 text-base'>Payment Methods </h2>
                <span className='font-semibold text-slate-900 dark:text-slate-200'>
                 Rocket
                </span>
              </div>

         
            </div>
            <ButtonPrimary type='submit' className='mt-8 w-full'>
              Confirm order
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
        </form>
      </div>
    </div>
  );
};

export default CartInfo;
