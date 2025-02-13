'use client';
import { FC, useState, useTransition } from 'react';
import Label from '@/components/Label/Label';
import Input from '@/shared/Input/Input';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import ButtonCircle from '@/shared/Button/ButtonCircle';

import OrderInvoice from '@/components/OrderInvoice';
import { default_status } from '@/data/defaultValue';
import SelectValue from '@/components/SelectValue';
import LoadingIndicator from '@/components/LoadingIndicator';

interface OrderModelProps {
  className?: string;
  orderData: any;
  onChangeOrder: (value: any) => void;
}

const OrderModel: FC<OrderModelProps> = ({ orderData, onChangeOrder }) => {
  const [invoiceData, setInvoiceData] = useState(orderData);
  const [selectStatus, setSelectStatus] = useState(orderData?.status || '');
  const [isPending, startTransition] = useTransition();

  console.log("orderData ",orderData)

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    formData.append('orderId', orderData?.id);
    formData.append(
      'mobileNumbers',
      orderData?.shipping_address?.mobile?.length || 0,
    );

    startTransition(async () => {
      try {
        const res = await fetch('/api/order-api/admin-access-order', {
          method: 'PATCH', // Change to PATCH
          body: formData, // Pass the formData directly
        });
        const result = await res.json();
        alert(result.message);
      } catch (error: any) {
      
        alert(error.message);
      }
    });
  };

  return (
    <>
      <div className='flex justify-between'>
        <h2 className='my-5 text-center text-1xl md:text-3xl font-semibold'>
          Order Model
        </h2>

        <ButtonCircle
          className=''
          size=' w-11 h-11'
          onClick={() => {
            onChangeOrder(null);
          }}
        >
          <i className='las la-times text-xl  bg-red-400 p-2'></i>
        </ButtonCircle>
      </div>

      <OrderInvoice
        invoiceData={invoiceData}
        setInvoiceData={(value: any) => setInvoiceData(invoiceData)}
      />

      <div className='mx-auto lg:mx-32 '>
        <h3 className='text-sm'>
          ID: <span className='font-bold'>{orderData?.id}</span>{' '}
        </h3>
        <h3 className='text-sm'>
          invoice_id: <span className='font-bold'>{orderData?.invoice_id}</span>{' '}
        </h3>
        <h3 className='text-sm mb-5'>
          sender_number:{' '}
          <span className='font-bold'>
            {orderData?.sender_number || 'None'}
          </span>{' '}
        </h3>

        {isPending ? (
          <LoadingIndicator />
        ) : (
          <form className='grid  space-y-2 ' onSubmit={onSubmit}>
            <div className='h-20'>
              <Label>Select Status</Label>
              <SelectValue
                className='mt-1.5'
                value={selectStatus}
                onChange={e => setSelectStatus(e.target.value)}
                name='status'
              >
                {default_status.map(item => (
                  <option value={item} key={item} data-id={item}>
                    {item}
                  </option>
                ))}
              </SelectValue>
            </div>

            <div className='h-20'>
              <Label>division</Label>
              <Input
                type='text'
                placeholder='division'
                name='division'
                defaultValue={orderData.shipping_address.division}
              />
            </div>

            <div className='h-20'>
              <Label>district</Label>
              <Input
                type='text'
                placeholder='district'
                name='district'
                defaultValue={orderData.shipping_address.district}
              />
            </div>

            <div className='h-20'>
              <Label>upzila</Label>
              <Input
                type='text'
                placeholder='upzila'
                name='upzila'
                defaultValue={orderData.shipping_address.upzila}
              />
            </div>

            <div className='h-20'>
              <Label>union</Label>
              <Input
                type='text'
                placeholder='union'
                name='union'
                defaultValue={orderData.shipping_address.union}
              />
            </div>

            <div className='h-20'>
              <Label>house</Label>
              <Input
                type='text'
                placeholder='house'
                name='house'
                defaultValue={orderData.shipping_address.house}
              />
            </div>

            {orderData?.shipping_address?.mobile?.length > 0 && (
              <div className=''>
                <Label>Mobile</Label>
                {orderData?.shipping_address?.mobile?.map(
                  (mobileNumber: any, index: number) => (
                    <div key={index}>
                      <Input
                        key={index}
                        className='mt-3'
                        type='text'
                        placeholder='house'
                        name={`mobile-${index}`}
                        defaultValue={mobileNumber}
                      />
                    </div>
                  ),
                )}
              </div>
            )}

            <ButtonPrimary className='mt-4 ' type='submit'>
              Submit
            </ButtonPrimary>
          </form>
        )}
      </div>
    </>
  );
};

export default OrderModel;
