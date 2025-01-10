'use client';
import { FC, useState, useTransition } from 'react';
import toast from 'react-hot-toast';
import { Transition } from '@/app/headlessui';
import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import ButtonSecondary from '@/shared/Button/ButtonSecondary';

import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
import Prices from '../Prices';
import BagIcon from '../BagIcon';
import ModalQuickView from '../ModalQuickView';
import { ProductType } from '@/types/ProductTypes';
import LoadingIndicator from '../LoadingIndicator';

import { notify_duration } from '@/data/defaultValue';
import useAuthData from '@/hooks/useAuthData';
import useCart from '@/hooks/useCart';
import { useSession } from 'next-auth/react';

interface SectionCardBtnsProps {
  className?: string;
  data: ProductType;
}

interface NotifyType {
  size?: string;
  color?: string;
}

const SectionCardBtns: FC<SectionCardBtnsProps> = ({ className, data }) => {
  // const {
  //   cartAdd: { isAdding, handleAddToCart, isAddError },
  //   authDataFetch: { authData },
  // } = useAuthData() as any;
 const { data: session } = useSession();
  const { cartAdd: { isAdding, handleAddToCart, isAddError }} = useCart() as any;
  const router = useRouter();
  const [showModalQuickView, setShowModalQuickView] = useState(false);

  const {
    name,
    price,
    sizes = [],
    colors = [],
    thumbnail,
    id,
    slug,
    product_role,
  } = data;

  //  console.log("SectionCardBtns data",data);

  const addToCartData: any = {
    product: id,
    quantity: 1,
  };

  const addToCartHandle = () => {
    if (session?.user) {
      let sizeColorNotifyTost: NotifyType = {
        size: '',
        color: '',
      };
      if (sizes) {
        addToCartData['size'] = sizes[0];
        sizeColorNotifyTost['size'] = sizes[0];
      }
      if (colors) {
        addToCartData['color'] = colors[0];
        sizeColorNotifyTost['color'] = colors[0];
      }
      handleAddToCart(addToCartData);
      notifyAddTocart(sizeColorNotifyTost, 'ADD TO CART');
    } else {
      toast.custom(
        t => (
          <Transition
            appear
            show={t.visible}
            className='p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200'
            enter='transition-all duration-150'
            enterFrom='opacity-0 translate-x-20'
            enterTo='opacity-100 translate-x-0'
            leave='transition-all duration-150'
            leaveFrom='opacity-100 translate-x-0'
            leaveTo='opacity-0 translate-x-20'>
            <p className='block text-base text-red-500 text-center font-semibold leading-none'>
              Somthing is Wrong!
            </p>
           
          
          </Transition>
        ),
        
      );
     router.push("/login")
    }
  };

  const notifyAddTocart = (item: NotifyType, message: string) => {
    toast.custom(
      t => (
        <Transition
          appear
          show={t.visible}
          className='p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200'
          enter='transition-all duration-150'
          enterFrom='opacity-0 translate-x-20'
          enterTo='opacity-100 translate-x-0'
          leave='transition-all duration-150'
          leaveFrom='opacity-100 translate-x-0'
          leaveTo='opacity-0 translate-x-20'>
          <p className='block text-base font-semibold leading-none'>
            {message}
          </p>
          <div className='border-t border-slate-200 dark:border-slate-700 my-4' />
          {renderProductCartOnNotify(item)}
        </Transition>
      ),
      {
        position: 'top-right',
        id: String(slug) || 'product-detail',
        duration: notify_duration,
      },
    );
  };

  const renderProductCartOnNotify = (item: NotifyType) => {
    return (
      <div className='flex '>
        <div className='h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100'>
          <Image
            width={80}
            height={96}
            src={thumbnail}
            alt={name}
            className='absolute object-cover object-center'
          />
        </div>

        <div className='ms-4 flex flex-1 flex-col'>
          <div>
            <div className='flex justify-between '>
              <div>
                <h3 className='text-base font-medium '>{name}</h3>
                <p className='mt-1 text-sm text-slate-500 dark:text-slate-400'>
                  <span>{item.size}</span>
                  {item.size && item.color && ' | '}
                  <span>{item.color}</span>
                </p>
              </div>
              <Prices price={price} className='mt-0.5' />
            </div>
          </div>
          <div className='flex flex-1 items-end justify-between text-sm'>
            <p className='text-gray-500 dark:text-slate-400'>Qty 1</p>

            <div className='flex'>
              <button
                type='button'
                className='font-medium text-primary-6000 dark:text-primary-500 '
                onClick={e => {
                  e.preventDefault();
                  router.push('/cart');
                }}>
                View cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderGroupButtons = () => {
    // let sizeColorNotifyTost: NotifyType = {
    //   size: '',
    //   color: '',
    // };
    // if (sizes) {
    //   sizeColorNotifyTost['size'] = sizes[0];
    // }
    // if (colors) {
    //   sizeColorNotifyTost['color'] = colors[0];
    // }
    return (
      <div className='absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all'>
        <ButtonPrimary
          className='shadow-lg'
          fontSize='text-xs'
          sizeClass='py-2 px-4'
          disabled={product_role !== 'active'}
          onClick={addToCartHandle}>
          <BagIcon className='w-3.5 h-3.5 mb-0.5' />
          <span className='ms-1'>Add to Cart</span>
        </ButtonPrimary>

        <ButtonSecondary
          className='ms-1.5 bg-white  hover:text-slate-900 transition-colors shadow-lg'
          fontSize='text-xs'
          sizeClass='py-2 px-4'
          onClick={() => setShowModalQuickView(true)}>
          <ArrowsPointingOutIcon className='w-3.5 h-3.5' />
          <span className='ms-1'>Quick view</span>
        </ButtonSecondary>
      </div>
    );
  };
  const loadingIndicator = () => {
    return <LoadingIndicator />;
  };

  if (isAddError) {
    router.push('/login');
  }

  if (isAdding) return loadingIndicator();

  return (
    <>
      {renderGroupButtons()}
      {/* QUICKVIEW */}
      <ModalQuickView
        show={showModalQuickView}
        onCloseModalQuickView={() => setShowModalQuickView(false)}
        data={data}
      />
    </>
  );
};

export default SectionCardBtns;
