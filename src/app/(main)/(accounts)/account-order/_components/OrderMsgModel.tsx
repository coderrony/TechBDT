'use client';

import { FC, Fragment } from 'react';
import { Dialog, Transition } from '@/app/headlessui';
import ButtonClose from '@/shared/ButtonClose/ButtonClose';
interface OrderMsgModelProps {
  className?: string;
  statusCode: number;
  show: boolean;
  onCloseModal: () => void;
}

const OrderMsgModel: FC<OrderMsgModelProps> = ({
  show,
  onCloseModal,
  statusCode,
}) => {


  const orderSuccess = () => {
    return (
      <div className='text-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-16 w-16 text-green-500 mx-auto'
          viewBox='0 0 20 20'
          fill='currentColor'>
          <path
            fillRule='evenodd'
            d='M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z'
            clipRule='evenodd'
          />
        </svg>
        <h1 className='text-2xl font-bold mt-4 text-gray-800 dark:text-gray-200'>
          Order Confirmed!
        </h1>
        <p className='mt-2 text-gray-600 dark:text-gray-300'>Thank you for your purchase</p>
       
      </div>
    );
  };

  const OrderPending = () => {
  return (
    <div className='text-center'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-16 w-16 text-yellow-500 mx-auto'
        viewBox='0 0 24 24'
        fill='currentColor'>
        <path
          fillRule='evenodd'
          d='M12 2a10 10 0 100 20 10 10 0 000-20zm0 3a1 1 0 011 1v5a1 1 0 01-2 0V6a1 1 0 011-1zm0 10a1.25 1.25 0 100 2.5A1.25 1.25 0 0012 15z'
          clipRule='evenodd'
        />
      </svg>
      <h1 className='text-2xl font-bold mt-4 text-gray-800 dark:text-gray-200'>
        Order Pending!
      </h1>
      <p className='mt-2 text-gray-600 dark:text-gray-300'>Your order is being processed</p>
    </div>
  );
};

  const orderFailed = () => {
    return (
      <div className='text-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-16 w-16 text-red-500 mx-auto'
          viewBox='0 0 20 20'
          fill='currentColor'>
          <path
            fillRule='evenodd'
            d='M8.257 3.099c.765-1.36 2.682-1.36 3.447 0l5.52 9.8c.75 1.33-.193 3-1.724 3H4.46c-1.531 0-2.474-1.67-1.724-3l5.52-9.8zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-3a1 1 0 00-.993.883L9 11v1a1 1 0 001.993.117L11 12v-1a1 1 0 00-1-1z'
            clipRule='evenodd'
          />
        </svg>
        <h1 className='text-2xl font-bold mt-4 text-gray-800 dark:text-gray-200'>
          Purchase Failed
        </h1>
        <p className='mt-2 text-gray-600 dark:text-gray-300'>
          Unfortunately, we couldn&apos;t process your purchase.
        </p>
        <p className='mt-1 text-gray-600 font-semibold dark:text-gray-300'>Order already exist</p>
      </div>
    );
  };

  const orderInvalid = () => { 
    return (
      <div className='text-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-16 w-16 text-red-500 mx-auto'
          viewBox='0 0 24 24'
          fill='currentColor'>
          <path
            fillRule='evenodd'
            d='M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.707 7.293a1 1 0 00-1.414-1.414L12 11.586 8.707 8.293a1 1 0 10-1.414 1.414L10.586 13l-3.293 3.293a1 1 0 101.414 1.414L12 14.414l3.293 3.293a1 1 0 001.414-1.414L13.414 13l3.293-3.293z'
            clipRule='evenodd'
          />
        </svg>
        <h1 className='text-2xl font-bold mt-4 text-gray-800 dark:text-gray-200'>
          Invalid Information
        </h1>
        <p className='mt-2 text-gray-600 dark:text-gray-300'>
          The provided information is not valid.
        </p>
        <p className='mt-1 text-gray-600 font-semibold dark:text-gray-300'>
          Please check your details and try again.
        </p>
      </div>
    );
  };
  

  

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as='div' className='fixed inset-0 z-50' onClose={onCloseModal}>
        <div className='flex items-stretch md:items-center justify-center h-full text-center md:px-4'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <Dialog.Overlay className='fixed inset-0 bg-black/40 dark:bg-black/70' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className='inline-block align-middle' aria-hidden='true'>
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'>
            <div className='relative inline-flex xl:py-8 w-full max-w-5xl max-h-full'>
              <div
                className='flex-1 items-center justify-center flex overflow-hidden max-h-full p-8 w-full text-left align-middle transition-all transform lg:rounded-2xl bg-white 
            dark:bg-neutral-900 dark:border dark:border-slate-700 dark:text-slate-100 shadow-xl'>
                <span className='absolute end-3 top-3 z-50'>
                  <ButtonClose onClick={onCloseModal} />
                </span>

                {statusCode === 200 && OrderPending()}
                {statusCode === 202 && orderSuccess()}
                {statusCode === 409 && orderFailed()}
                {statusCode === 500 && orderInvalid()}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default OrderMsgModel;
