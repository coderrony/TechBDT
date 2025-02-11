'use client';


import { useEffect, useState } from 'react';

import ProductCard from '../ProductCardSectionSlider/ProductCard';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import twFocusClass from '@/utils/twFocusClass';
import { ProductType } from '@/types/ProductTypes';
import Skeleton from '../Skeleton';
import { useProductCache } from '@/hooks/useProductCache';


const TrendingProduct = () => {
  const [historyProducts, setHistoryProducts] = useState<ProductType[][]>([]); // Store previous pages
  const [currentProducts, setCurrentProducts] = useState<ProductType[]>([]); // UI-তে দেখাবে
 
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
    // Cache Context থেকে ক্যাশে ডাটা নেবো
    const { cachedProducts, setCachedProducts,cachePage,setCachePage } = useProductCache();


  // Fetch new 16 products in the background
  const fetchProductsInBackground = async () => {
    try {
      const res = await fetch(`/api/product/trending-product?size=${8}`); // নতুন ৮টি প্রোডাক্ট আনবে
      const data = await res.json();

      
      setHistoryProducts([...historyProducts, data.products]);
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  };

useEffect(()=>{
  setCachedProducts(historyProducts)
  setCachePage(page)
},[historyProducts])

  // Initial Fetch 4 products
  useEffect(() => {
    const fetchInitialProducts = async () => {
     
      setLoading(true);
      try {
        const res = await fetch(`/api/product/trending-product?size=${16}`);
        const data = await res.json();
    
        const half = Math.ceil(data.products.length / 2);
        const newCachedData = [data.products.slice(0, half), data.products.slice(half)];
        setCurrentProducts(data.products.slice(0, half)); // প্রথম ৮টি দেখাবে
        setCachedProducts(newCachedData)
        setHistoryProducts(newCachedData);
       
      } catch (error) {
        console.error('Failed to load products', error);
      } finally {
        setLoading(false);
      }
    };


    if (cachedProducts) {
 
      setCurrentProducts(cachedProducts[cachePage]);
      setHistoryProducts(cachedProducts);
      setPage(cachePage);
      return;
    }else{ 
      fetchInitialProducts();
    }
  }, []);

  // Handle Next Button Click
  const handleNextPage = () => {
    setCurrentProducts(historyProducts[page + 1]);
    setPage(prev => prev + 1);

    if (historyProducts.length === page + 2) {
      fetchProductsInBackground(); // ব্যাকগ্রাউন্ডে নতুন 4টি আনবে
    }
  };

  // Handle Previous Button Click
  const handlePreviousPage = () => {
    setCurrentProducts(historyProducts[page - 1]);
    setPage(prev => prev - 1);
  };

  return (
    <div className='container'>
      {loading && <Skeleton />}

      {!loading && currentProducts?.length > 0 && (
        <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-4 lg:mt-8'>
          {currentProducts?.map((product: any) => (
            <ProductCard key={product.id} data={product} />
         
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {!loading &&     <div className='flex mt-8 justify-start items-center gap-3'>
        {/* <Pagination /> */}

        <ButtonPrimary
          onClick={handlePreviousPage}
          className={`${page === 0 && 'hidden'}`}
          disabled={page === 0}>
          Previous
        </ButtonPrimary>

        <span
          className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white ${twFocusClass()}`}>
          {page + 1}
        </span>

        <ButtonPrimary
          onClick={handleNextPage}
          disabled={currentProducts?.length > 0 ? false : true}>
          {loading ? 'Loading...' : 'Next'}
        </ButtonPrimary>
      </div>}
 
    </div>
  );
};

export default TrendingProduct;
