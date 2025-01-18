'use client';
// import { Product } from '@/data/data';
import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';

import formatNumber from '@/utils/formatNumber';
import taka from '@/images/taka.png';
import NotifyAddTocart from '@/components/NotifyAddTocart';
import toast from 'react-hot-toast';
import {
  NoSymbolIcon,
  ClockIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import IconDiscount from '@/components/IconComponents/IconDiscount';
import { StarIcon } from '@heroicons/react/24/solid';
import NcInputNumber from '@/components/NcInputNumber';
import BagIcon from '@/components/BagIcon';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import ButtonSecondary from '@/shared/Button/ButtonSecondary';
import LikeSaveBtns from '@/components/LikeSaveBtns';
import Policy from './Policy';
import AccordionInfo from '@/components/AccordionInfo';
import ReviewItem from '@/components/ReviewItem';

import ModalViewAllReviews from './ModalViewAllReviews';

import ProductImageSlider from '@/components/ProductImageSlider';
import { ProductType } from '@/types/ProductTypes';

import LoadingIndicator from '@/components/LoadingIndicator';
import { notify_duration } from '@/data/defaultValue';

import useCart from '@/hooks/useCart';
import { useSession } from 'next-auth/react';
import { Transition } from '@headlessui/react';


interface ProductDetailComponentProps {
  className?: string;
  productInfo: ProductType;
}

const ProductDetailComponent: FC<ProductDetailComponentProps> = ({
  productInfo,
}) => {
  const {
    id,
    sizes,
    colors,
    status,
    price,
    sku,
    name,
    thumbnail,
    images_gallery,
    BN_content,
    EN_content,
    reviews,
  } = productInfo;
  const { data: session } = useSession();
  const {
    cartAdd: { isAdding, handleAddToCart },
  } = useCart() as any;
 

  const [sizeSelected, setSizeSelected] = useState(sizes ? sizes[0] : '');
  const [colorSelected, setColorSelected] = useState(colors ? colors[0] : '');
  const [qualitySelected, setQualitySelected] = useState(1);
  const [isOpenModalViewAllReviews, setIsOpenModalViewAllReviews] =
    useState(false);

  // const {fetchMe} = useAuth()

  const rating = reviews?.reduce((sum, item) => sum + item.rating, 0);
  const numberOfReviews = reviews?.length;
  const displayedReviews = reviews.slice(0, Math.min(4, reviews.length));
  const router = useRouter();

  const addToCartData: any = {
    product: id,
    quantity: qualitySelected,
  };

  console.log("sku ",sku)
  const handleCart = () => {
    if (session?.user) {
      if (sizeSelected !== '') {
        addToCartData['size'] = sizeSelected;
      }

      if (colorSelected !== '') {
        addToCartData['color'] = colorSelected;
      }
      handleAddToCart(addToCartData);
      notifyAddTocart('ADD TO CART');
     
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
             You need to log in first.
            </p>
           
          
          </Transition>
        ),
        
      );

      router.push('/login');
    }
  };

  // const handleAddTOCart = async ()=>{

  //   startTransition(async()=>{
  //     if(sizeSelected !== ''){
  //       addToCartData['size'] = sizeSelected;
  //      }

  //      if(colorSelected !== ''){
  //       addToCartData['color'] = colorSelected;
  //      }
  //     const cartRes =   await createAddToCart(addToCartData) as any;
  //     // console.log("cartRes ",cartRes);
  //     if(cartRes.status === 500){
  //       router.push("/login")
  //     }
  //     if(cartRes.status === 200){
  //       fetchMe()
  //       notifyAddTocart(cartRes.message)
  //     }

  //   })
  // }

  const notifyAddTocart = (title: string) => {
    toast.custom(
      t => (
        <NotifyAddTocart
          productImage={thumbnail}
          qualitySelected={qualitySelected}
          show={t.visible}
          sizeSelected={sizeSelected}
          colorSelected={colorSelected}
          price={price}
          name={name}
          title={title}
        />
      ),
      {
        position: 'top-right',
        id: 'nc-product-notify',
        duration: notify_duration,
      },
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
              <span className='ml-1 font-semibold'>{sizeSelected}</span>
            </span>
          </label>
        </div>
        <div className='grid grid-cols-4 gap-2 mt-3'>
          {sizes.map((size, index) => {
            const isActive = size === sizeSelected;

            return (
              <div
                key={size}
                className={`relative  rounded-2xl border flex items-center justify-center 
                text-sm  uppercase font-semibold select-none overflow-hidden z-0 ${
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
              <span className='ml-1 font-semibold'>{colorSelected}</span>
            </span>
          </label>
        </div>
        <div className='grid grid-cols-4 gap-2 mt-3'>
          {colors.map((color, index) => {
            const isActive = color === colorSelected;

            return (
              <div
                key={color}
                className={`relative  rounded-2xl border flex items-center justify-center 
                text-sm  uppercase font-semibold select-none overflow-hidden z-0 ${
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

  const renderStatus = () => {
    if (!status) {
      return null;
    }
    const CLASSES =
      'text-sm flex items-center text-slate-700 text-slate-900 dark:text-slate-300';
    if (status === 'New in') {
      return (
        <div className={CLASSES}>
          <SparklesIcon className='w-3.5 h-3.5' />
          <span className='ml-1 leading-none'>{status}</span>
        </div>
      );
    }
    if (status === 'limited edition') {
      return (
        <div className={CLASSES}>
          <ClockIcon className='w-3.5 h-3.5' />
          <span className='ml-1 leading-none'>{status}</span>
        </div>
      );
    }
    if (status === 'Stock Out') {
      return (
        <div className={CLASSES}>
          <NoSymbolIcon className='w-3.5 h-3.5' />
          <span className='ml-1 leading-none text-red-700'>{status}</span>
        </div>
      );
    }
    if (status) {
      return (
        <div className={CLASSES}>
          <IconDiscount className='w-3.5 h-3.5' />
          <span className='ml-1 leading-none'>{status}</span>
        </div>
      );
    }
    return null;
  };

  const renderSectionSidebar = () => {
    return (
      <div className='listingSectionSidebar__wrap lg:shadow-lg'>
        <div className='space-y-7 lg:space-y-8 '>
          {/* PRICE */}
          <div>
            {/* ---------- 1 HEADING ----------  */}
            <div className='flex items-center justify-between space-x-5'>
              <div className='flex text-2xl font-semibold'>
                {formatNumber(price)}
              </div>

              <a
                href='#reviews'
                className='flex items-center text-sm font-medium'>
                <div className=''>
                  <StarIcon className='w-5 h-5 pb-[1px] text-orange-400' />
                </div>
                <span className='ml-1.5 flex'>
                  {rating !== 0 && (
                    <>
                      <span>{rating} </span>
                      <span className='mx-1.5'>&</span>
                    </>
                  )}
                  <span className='text-slate-700 dark:text-slate-400 underline'>
                    {numberOfReviews ? numberOfReviews : 0} reviews
                  </span>
                </span>
              </a>
            </div>

            {/* ---------- 3 VARIANTS AND SIZE LIST ----------  */}
            {sizes && (
              <div className={`mt-6 space-y-7 lg:space-y-8 `}>
                <div className=''>{renderSizeList()}</div>
              </div>
            )}
            {colors && (
              <div className={`mt-6 space-y-7 lg:space-y-8 `}>
                <div className=''>{renderColorList()}</div>
              </div>
            )}
          </div>
          {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
          <div className='flex space-x-3.5'>
            <div className='flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full'>
              <NcInputNumber
                defaultValue={qualitySelected}
                onChange={setQualitySelected}
                max={250} // stock quantity
              />
            </div>
            {isAdding ? (
              <div className='flex justify-center items-center w-full mx-auto'>
                <LoadingIndicator />
              </div>
            ) : (
              <ButtonPrimary
                className='flex-1 flex-shrink-0'
                onClick={handleCart}>
                <BagIcon className='hidden sm:inline-block w-5 h-5 mb-0.5' />
                <span className='ml-3'>Add to cart</span>
              </ButtonPrimary>
            )}
          </div>

          {/* SUM */}
          <div className='hidden sm:flex flex-col space-y-4 '>
            <div className='space-y-2.5'>
              <div className='flex justify-between text-slate-600 dark:text-slate-300'>
                <span className='flex items-center'>
                  <span>{formatNumber(price)}</span>
                  <span className='mx-2'>x</span>
                  <span>{`${qualitySelected} `}</span>
                </span>

                <span>{formatNumber(price * qualitySelected)} </span>
              </div>
              <div className='flex justify-between text-slate-600 dark:text-slate-300'>
                <span>Tax estimate</span>
                <span>BDT 0</span>
              </div>
            </div>
            <div className='border-b border-slate-200 dark:border-slate-700'></div>
            <div className='flex justify-between font-semibold'>
              <span>Total</span>
              <span>{formatNumber(price * qualitySelected)} </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSection1 = () => {
    return (
      <div className='listingSection__wrap !space-y-6'>
        <div>
          <h2 className='text-2xl md:text-3xl font-semibold'>{name}</h2>
          <div className='flex items-center mt-4 sm:mt-5'>
            <a
              href='#reviews'
              className='hidden sm:flex items-center text-sm font-medium '>
              <div className=''>
                <StarIcon className='w-5 h-5 pb-[1px] text-yellow-500 dark:text-orange-500' />
              </div>
              <span className='ml-1.5'>
                {rating !== 0 && (
                  <>
                    <span>{rating} </span>
                    <span className='mx-1.5'>&</span>
                  </>
                )}

                <span className='text-slate-700 dark:text-slate-400 underline'>
                  {numberOfReviews && numberOfReviews} reviews
                </span>
              </span>
            </a>
            <span className='hidden sm:block mx-2.5'>·</span>
            {renderStatus()}
            <h3 className='ml-4 leading-none text-sm flex items-center  text-slate-900 dark:text-slate-300'>SKU: {sku}</h3>
            <div className='ml-auto'>
              <LikeSaveBtns />
            </div>
          </div>
        </div>
        {/*  */}
        <div className='block lg:hidden'>{renderSectionSidebar()}</div>
      </div>
    );
  };

  const renderSection2 = () => {
    return (
      <div className='listingSection__wrap !border-b-0 !pb-0'>
        <h2 className='text-2xl font-semibold'>Product details</h2>
        <AccordionInfo
          bn_content={BN_content}
          en_content={EN_content}
          panelClassName='p-4 pt-3.5 text-slate-600 text-base dark:text-slate-300 leading-7'
        />
        <Policy />
      </div>
    );
  };

  const renderReviews = () => {
    return (
      <div id='reviews' className='scroll-mt-[150px]'>
        {/* HEADING */}
        <h2 className='text-2xl font-semibold flex items-center'>
          <StarIcon className='w-7 h-7 mb-0.5' />
          <span className='ml-1.5'>
            {' '}
            {rating !== 0 && rating + ' & '} {numberOfReviews} Reviews
          </span>
        </h2>

        {/* comment */}
        <div className='mt-10'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-y-11 gap-x-28'>
            {displayedReviews.length > 0 &&
              displayedReviews.map((review: any, index) => (
                <ReviewItem key={review._id.toString()} data={review} />
              ))}
          </div>

          {reviews.length > 4 && (
            <ButtonSecondary
              onClick={() => setIsOpenModalViewAllReviews(true)}
              className='mt-10 border border-slate-300 dark:border-slate-700 '>
              Show me all {reviews.length} reviews
            </ButtonSecondary>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`ListingDetailPage nc-ProductDetailPage2`}>
      <>
        <header className='container relative z-10 lg:mt-8 flex  '>
          {/* CONTENT */}
          <div className='w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:pr-14 '>
            <ProductImageSlider images={[thumbnail, ...images_gallery]} />
            {renderSection1()}
            {renderSection2()}
          </div>

          {/* SIDEBAR */}
          <div className='flex-grow'>
            <div className='hidden lg:block sticky top-28'>
              {renderSectionSidebar()}
            </div>
          </div>
        </header>
      </>

      {/* OTHER SECTION */}
      <div className='container pb-24 lg:pb-28 pt-14 space-y-14'>
        <hr className='border-slate-200 dark:border-slate-700' />

        {renderReviews()}
      </div>

      {/* MODAL VIEW ALL REVIEW */}
      <ModalViewAllReviews
        show={isOpenModalViewAllReviews}
        onCloseModalViewAllReviews={() => setIsOpenModalViewAllReviews(false)}
        reviews={reviews}
      />
    </div>
  );
};

export default ProductDetailComponent;
