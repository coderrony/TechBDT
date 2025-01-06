import Link from 'next/link';
import CartInfo from './_components/CartInfo';

const CartPage = async () => {
  return (
    <div className='nc-CartPage'>
      <main className='container py-16 lg:pb-28 lg:pt-20 '>
        <div className='mb-12 sm:mb-16'>
          <h2 className='block text-2xl sm:text-3xl lg:text-4xl font-semibold '>
            Shopping Cart
          </h2>
          <div className='block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-400'>
            <Link href={'/'} className=''>
              Homepage
            </Link>
            <span className='text-xs mx-1 sm:mx-1.5'>/</span>
            <span className='underline'>
              <Link href={'/search'}>Shopping</Link>
            </span>
            <span className='text-xs mx-1 sm:mx-1.5'>/</span>
            <span className='underline'>
              <Link href={'/cart'}>Cart</Link>
            </span>
          </div>
        </div>
        <hr className='border-slate-200 dark:border-slate-700 my-10 xl:my-12' />
        <CartInfo />
      </main>
    </div>
  );
};

export default CartPage;
