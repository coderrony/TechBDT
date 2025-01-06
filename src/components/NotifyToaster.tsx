'use client';
import { Transition } from '@headlessui/react';
import Image from 'next/image';
import { FC } from 'react';
import successIcon from '@/images/icons/success.png';
import errorIcon from '@/images/icons/error.png';
interface NotifyToasterProps {
  className?: string;
  show: boolean;
  isError: boolean;
  title: string;
  message: string;
}

const NotifyToaster: FC<NotifyToasterProps> = ({
  show,
  isError,
  title,
  message,
}) => {
  const renderProductCartOnNotify = () => {
    return (
      <div className='flex '>
        <div className='h-24 w-20 relative flex-shrink-0  rounded-xl'>
          <Image
            src={isError ? errorIcon : successIcon}
            alt={title}
            fill
            sizes='100px'
            className='h-full w-full object-contain object-center'
          />
        </div>

        <div className='ml-4 flex items-center'>
          <h3 className='text-base font-mono '> {message}</h3>
        </div>
      </div>
    );
  };

  return (
    <Transition
      appear
      show={show}
      className='p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200'
      enter='transition-all duration-150'
      enterFrom='opacity-0 translate-x-20'
      enterTo='opacity-100 translate-x-0'
      leave='transition-all duration-150'
      leaveFrom='opacity-100 translate-x-0'
      leaveTo='opacity-0 translate-x-20'>
      <p className='block text-base font-semibold leading-none'>{title}</p>
      <hr className=' border-slate-200 dark:border-slate-700 my-4' />
      {renderProductCartOnNotify()}
    </Transition>
  );
};

export default NotifyToaster;
