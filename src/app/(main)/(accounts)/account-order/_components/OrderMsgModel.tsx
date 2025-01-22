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
        <h1 className='text-2xl font-bold mt-4 text-gray-800'>
          Order Confirmed!
        </h1>
        <p className='mt-2 text-gray-600'>Thank you for your purchase</p>
        {/* <p className="mt-1 text-lg font-semibold text-gray-800">{message}</p> */}
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
        <h1 className='text-2xl font-bold mt-4 text-gray-800'>
          Purchase Failed
        </h1>
        <p className='mt-2 text-gray-600'>
          Unfortunately, we couldn&apos;t process your purchase.
        </p>
        <p className='mt-1 text-gray-600 font-semibold'>Order already exist</p>
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

                {statusCode === 200 && orderSuccess()}
                {statusCode === 500 && orderFailed()}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default OrderMsgModel;
