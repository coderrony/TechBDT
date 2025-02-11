'use client';

import { FC, useEffect, useRef, useState } from 'react';
import ButtonSecondary from '@/shared/Button/ButtonSecondary';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import LoadingIndicator from '@/components/LoadingIndicator';

import OrderMsgModel from './OrderMsgModel';
import useOrder from '@/hooks/useOrder';
import formatNumber from '@/utils/formatNumber';
import Link from 'next/link';
import { formatDate } from '@/utils/dateFormat';
import OrderInvoice from './OrderInvoice';

// http://localhost:3000/account-order?invoice_id=Hb08RI1lyq0kfYIMA38jR1EXXWkQMak5J3h67iwr&status=success

// http://localhost:3000/account-order?invoice_id=TVmw1pDSkHMUofrHyPsb41tTFtUifMDk1SFknNkX&status=success

//  http://localhost:3000/account-order?invoice_id=7wO15qlnqpAvdW2yytqhzLuuHubgZsIRsZJ0nmwc&status=success

// personal
// http://localhost:3000/account-order?invoice_id=ZCEUJJuonaXpgp2iWpwtYJrFqkmgFhtlmOddwyoP&status=pending

// http://localhost:3000/account-order?invoice_id=IrfW6gNhA4XC6oXkhiVbXfstEhRHjmeYNd6tJHC4&status=pending

// http://localhost:3000/account-order?invoice_id=XKJLlMr6fdUyxkRhlLZ901jVlymneCDGQPpvPgzL&status=pending

interface OrderInfoProps {
  className?: string;
}

export const renderStatus = (value:string)=>{ 
  if(value === 'PENDING'){
    return 'text-yellow-400';
  }else if(value === 'PROCESSING'){
    return 'text-primary-500';
  }else if(value === 'SHIPPED'){
    return 'text-green-500';
  }else if(value === 'DELIVERED'){
    return 'text-green-500';
  }
}

const OrderInfo: FC<OrderInfoProps> = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [statusCode, setStatusCode] = useState<number>(0);
  const [invoiceData,setInvoiceData] = useState(null);
  const {
    orderDataFetch: { orderData, isFetchingOrders },
  } = useOrder();
  // Extract query parameters using searchParams
  const invoice_id = searchParams.get('invoice_id');
  const status = searchParams.get('status');

  // Use a ref to track if the request has already been sent
  const hasVerifiedPayment = useRef(false);

  // console.log("orderData ",orderData);
  // console.log("invoiceData ",invoiceData);
  

  useEffect(() => {
    const paymentVerification = async () => {
      setLoading(true);
      try {
        const result = await axios.post('/api/order-api', { invoice_id });
        console.log('Verification Result:', result.data);
        setStatusCode(result.data.status);
        setShow(true);
      } catch (error) {
        console.error('Payment verification failed:', error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    if (invoice_id && status && !hasVerifiedPayment.current) {
      hasVerifiedPayment.current = true; // Mark as handled
      paymentVerification();
    }
  }, [invoice_id, status]);



  const renderOrder = (item: any) => {
    // console.log('item ', item);

    return (
      <div
        className='border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0'
        key={item.id}>
        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5'>
          <div>
            <p className='text-lg font-semibold'>#{item.id.slice(-12)}</p>
            <p className='text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2'>
              {/* <span>Aug 8, 2023</span> */}
              <span>{formatDate(item.date)}</span>
              <span className='mx-2'>·</span>
              <span className={renderStatus(item.status)}>{item.status}</span>
            </p>
          </div>
          <div className='mt-3 sm:mt-0'>
            <ButtonSecondary
              sizeClass='py-2.5 px-4 sm:px-6'
              fontSize='text-sm font-medium'
              onClick={()=> setInvoiceData(item)}
              >
              View Order
            </ButtonSecondary>
          </div>
        </div>

        {item?.products?.map((product: any) => (
          <div
            key={product._id.toString()}
            className='grid grid-cols-3 gap-4 pl-4 w-full mx-auto items-center text-center border p-4 font-thin text-xs md:text-base'>
            <div className='hover:underline'>
              <Link href={`/product-detail/${product.slug}`}>
                {product.product_name}
              </Link>
            </div>
            <div>{formatNumber(product.price)}</div>
            <div>QTY:{product.quantity}</div>
          </div>
        ))}
      </div>
    );
  };

  const onCloseModal = () => {
    setShow(false);
    router.push('/account-order');
  };

  if (loading || isFetchingOrders) return <LoadingIndicator />;

  return  invoiceData !== null ? <OrderInvoice invoiceData={invoiceData} setInvoiceData={(value:any)=> setInvoiceData(value)}  /> :
 
   <div className='space-y-10 sm:space-y-12'>
      <h2 className='text-2xl sm:text-3xl font-semibold'>Order History</h2>

      {orderData.map((item: any) => renderOrder(item))}

      <OrderMsgModel
        show={show}
        onCloseModal={onCloseModal}
        statusCode={statusCode}
      />

    </div>

};

export default OrderInfo;
