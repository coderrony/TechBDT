"use client"
import { FC, useEffect } from 'react';
import Prices from "@/components/Prices";


import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Image from "next/image";
import taka from '@/images/taka.png';
import { useRouter, useSearchParams } from "next/navigation";
import axios from 'axios';


interface OrderInfoProps {
  className?: string;
}




// http://localhost:3000/account-order?invoice_id=Hb08RI1lyq0kfYIMA38jR1EXXWkQMak5J3h67iwr&status=success

// http://localhost:3000/account-order?invoice_id=TVmw1pDSkHMUofrHyPsb41tTFtUifMDk1SFknNkX&status=success

const OrderInfo: FC<OrderInfoProps> = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract query parameters using searchParams
  const invoice_id = searchParams.get("invoice_id");
  const status = searchParams.get("status");



  useEffect(()=>{
   
    const paymentVerification = async()=>{ 
      const result = await axios.post(
        '/api/verify-payment',
       {invoice_id}
      );
      console.log("result ",result);
      
    }
    
    if(invoice_id && status){
      // console.log(invoice_id);
      // console.log(status);
      paymentVerification()
    }
   
  },[])

  const renderProductItem = (product: any, index: number) => {
    const { name } = product;
    return (
      <div key={index} className="flex py-4 sm:py-7 last:pb-0 first:pt-0">
        <div className="relative h-24 w-16 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            fill
            sizes="100px"
            src={taka}
            alt={name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium line-clamp-1">{name}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span>{"Natural"}</span>
                  <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                  <span>{"XL"}</span>
                </p>
              </div>
              <Prices className="mt-0.5 ml-2" />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400 flex items-center">
              <span className="hidden sm:inline-block">Qty</span>
              <span className="inline-block sm:hidden">x</span>
              <span className="ml-2">1</span>
            </p>

            <div className="flex">
              <button
                type="button"
                className="font-medium text-indigo-600 dark:text-primary-500 "
              >
                Leave review
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderOrder = () => {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
          <div>
            <p className="text-lg font-semibold">#WU3746HGG12</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
              <span>Aug 8, 2023</span>
              <span className="mx-2">·</span>
              <span className="text-primary-500">Delivered</span>
            </p>
          </div>
          <div className="mt-3 sm:mt-0">
            <ButtonSecondary
              sizeClass="py-2.5 px-4 sm:px-6"
              fontSize="text-sm font-medium"
            >
              View Order
            </ButtonSecondary>
          </div>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-700 p-2 sm:p-8 divide-y divide-y-slate-200 dark:divide-slate-700">
          {/* {[PRODUCTS[0]].map(renderProductItem)} */}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* HEADING */}
      <h2 className="text-2xl sm:text-3xl font-semibold">Order History</h2>
      {renderOrder()}
      {renderOrder()}
    </div>
  );
};

export default OrderInfo;