'use client';

import SelectValue from '@/components/SelectValue';
import Skeleton from '@/components/Skeleton';
import useDebounce from '@/hooks/useDebounce';
import ButtonCircle from '@/shared/Button/ButtonCircle';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';

import Input from '@/shared/Input/Input';
import { formatDate } from '@/utils/dateFormat';
import formatNumber from '@/utils/formatNumber';
import twFocusClass from '@/utils/twFocusClass';

import axios from 'axios';
import { useEffect, useState, useTransition } from 'react';
import OrderModel from './_components/OrderModel';
import { renderStatus } from '@/utils/randerStatus';
const status_values = [
  { name: 'PENDING' },
  { name: 'PROCESSING' },
  { name: 'SHIPPED' },
  { name: 'DELIVERED' },
];

function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState<null | string>(null);
  const [queryText, setQueryText] = useState('');
  const [isPending, startTransition] = useTransition();
  const [statusQuery, setStatusQuery] = useState<null | string>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [singleOrder, setSignalOrder] = useState<any>(null);

  const debounce = useDebounce(async value => {
    try {
      setPage(1);
      setSearchTerm(value);
    } catch (err: any) {
      alert(err.message);
    }
  }, 350);

  useEffect(() => {
    const fetchOrders = async () => {
      startTransition(async () => {
        try {
          const { data } = (await axios.get(
            '/api/order-api/admin-access-order',
            {
              params: {
                page,
                limit: 1,
                searchTerm,
                statusQuery,
              },
            },
          )) as any;

          if (data?.status === 200) {
            setOrders(data.data);
          } else {
            setOrders([]);
            alert(data?.message);
          }
        } catch (error: any) {
          alert(error.message);
          console.error('Failed to fetch orders', error);
        }
      });
    };

    fetchOrders();
  }, [searchTerm, statusQuery, page]);

  const renderOrders = () => {
    return (
      <>
        <header
          // onSubmit={handleSubmit}
          className='flex items-center justify-center gap-3'
        >
          <Input
            type='text'
            placeholder='Phone || Order Id'
            className='max-w-md md:max-w-lg'
            name='search'
            value={queryText}
            onChange={e => {
              setQueryText(e.target.value);
              debounce(e.target.value);
            }}
          />
          <ButtonCircle
            className=''
            size=' w-11 h-11'
            onClick={() => {
              setQueryText('');
              setSearchTerm('');
            }}
          >
            <i className='las la-times text-xl'></i>
          </ButtonCircle>
        </header>

        <div className='flex lg:space-x-4'>
          {/* FOR DESKTOP */}
          <div className=' mt-5'>
            <SelectValue
              className='mt-1.5'
              onChange={e => {
                setPage(1);
                setStatusQuery(e.target.value);
              }} // Correct placement
            >
              <option value=''>Select Status</option>
              {status_values.map(item => (
                <option value={item.name} key={item.name}>
                  {item.name}
                </option>
              ))}
            </SelectValue>
          </div>
        </div>

        <div className='w-full overflow-hidden rounded-lg shadow-xs mt-5'>
          <div className='w-full overflow-x-auto'>
            {isPending ? (
              <Skeleton />
            ) : (
              <table className='w-full whitespace-no-wrap'>
                <thead>
                  <tr className='text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800'>
                    <th className='px-4 py-3'>name</th>
                    <th className='px-4 py-3'>id</th>
                    <th className='px-4 py-3'>Status</th>
                    <th className='px-4 py-3'>Due Payment</th>
                    <th className='px-4 py-3'>Paid</th>
                    <th className='px-4 py-3'>TrxID</th>
                    <th className='px-4 py-3'>Delivery Type</th>
                    <th className='px-4 py-3'>Payment Method</th>
                    <th className='px-4 py-3'>Date</th>
                  </tr>
                </thead>

                <tbody className='bg-white divide-y dark:divide-gray-700 dark:bg-gray-800'>
                  {orders?.map(order => (
                    <tr
                      className='text-gray-700 dark:text-gray-400 cursor-pointer'
                      key={order.id}
                      onClick={() => setSignalOrder(order)}
                    >
                      <td className='px-4 py-3 text-sm'>{order?.full_name}</td>
                      <td className='px-4 py-3 text-sm'>{order?.id}</td>
                      <td className='px-4 py-3 text-xs'>
                        <span
                          className={`px-2 py-1 font-semibold leading-tight rounded-full ${renderStatus(
                            order?.status,
                          )} `}
                        >
                          {order?.status}
                        </span>
                      </td>
                      <td className='px-4 py-3 text-sm'>
                        {formatNumber(order?.due_payment)} TK
                      </td>
                      <td className='px-4 py-3 text-sm'>
                        {formatNumber(order?.paid)}
                      </td>
                      <td className='px-4 py-3 text-sm'>
                        {order?.transaction_id}
                      </td>
                      <td className='px-4 py-3 text-sm'>
                        {order?.delivery_type}
                      </td>
                      <td className='px-4 py-3 text-sm'>
                        {order?.payment_method}
                      </td>
                      <td className='px-4 py-3 text-sm'>
                        {formatDate(order?.date)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* PAGINATION */}
          {!isPending && (
            <div className='flex mt-8 justify-start items-center gap-3'>
              {/* <Pagination /> */}

              <ButtonPrimary
                onClick={() => setPage(prev => prev - 1)}
                className={`${page === 1 && 'hidden'}`}
                // disabled={page === 1}
              >
                Previous
              </ButtonPrimary>

              <span
                className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white ${twFocusClass()}`}
              >
                {page}
              </span>

              <ButtonPrimary
                onClick={() => setPage(prev => prev + 1)}
                // disabled={orders?.length > 0 ? false : true}
                className={`${orders?.length === 0 && 'hidden'}`}
              >
                {isPending ? 'Loading...' : 'Next'}
              </ButtonPrimary>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className=' container mt-6'>
      {singleOrder ? (
        <OrderModel
          orderData={singleOrder}
          onChangeOrder={(value: any) => setSignalOrder(value)}
        />
      ) : (
        renderOrders()
      )}
    </div>
  );
}

export default OrdersPage;
