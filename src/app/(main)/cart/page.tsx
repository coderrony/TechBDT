import Link from 'next/link';
import CartInfo from './_components/CartInfo';

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart - Hassle-Free Shopping Experience",
  description:
    "View and manage your shopping cart on TechBDT. Review the items you've selected, update quantities, and proceed to checkout with ease. Enjoy a secure and seamless online shopping experience.",
  robots: {
    index: true,   // Allow search engines to index this page
    follow: true,  // Allow search engines to follow links
  },
  keywords: [
    "Shopping Cart",
    "TechBDT",
    "E-commerce Cart",
    "Online Shopping Cart",
    "Tech Shopping",
    "Secure Checkout",
    "Add to Cart",
    "Review Cart",
    "Shopping Experience",
    "Cart Management",
  ],
  authors: [{ name: "TechBDT", url: "https://techbdt.com" }],
  openGraph: {
    title: "Shopping Cart - Hassle-Free Shopping Experience",
    description:
      "Review your shopping cart and proceed to checkout at TechBDT. View selected items and enjoy a seamless, secure shopping experience.",
    url: "https://techbdt.com/cart",
    siteName: "TechBDT",
    images: [
      {
        url: "https://techbdt.com/og-image-cart.jpg",
        width: 800,
        height: 600,
        alt: "TechBDT Shopping Cart - Manage Your Cart and Checkout",
      },
    ],
    locale: "en_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopping Cart | TechBDT - Hassle-Free Shopping Experience",
    description:
      "Manage your shopping cart on TechBDT. Add, remove, or update items, then proceed to a secure checkout.",
    images: ["https://techbdt.com/twitter-image-cart.jpg"],
  },
};


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
