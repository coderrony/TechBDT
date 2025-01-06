'use client';
import { FC } from 'react';
import { SidebarType } from '../_data';
import ButtonClose from '@/shared/ButtonClose/ButtonClose';
import Logo from '@/shared/Logo/Logo';
import { Disclosure } from '@/app/headlessui';



import SwitchDarkMode from '@/shared/SwitchDarkMode/SwitchDarkMode';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { Route } from 'next';

interface NavAdminMobileProps {
  className?: string;
  data: SidebarType[];
  onClickClose?: () => void;
}

const NavAdminMobile: FC<NavAdminMobileProps> = ({ data, onClickClose }) => {
  const router = useRouter();

  const _renderItem = (item: SidebarType, index: number) => {
    return (
      <Disclosure
        key={index}
        as='li'
        className='text-slate-900 dark:text-white'>
        <Link
          className='flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg'
          href={item.href as Route} 
          >
          <span onClick={onClickClose}>{item.label}</span>
      
        </Link>
      </Disclosure>
    );
  };

 
  return (
    <div className='overflow-y-auto w-full h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800'>
      <div className='py-6 px-5'>
        <Logo />
        <div className='flex items-center justify-between gap-5 mt-5 text-slate-600 dark:text-slate-500 text-xl'>
    

       
         
              <h2 className="text-slate-900 dark:text-white text-sm">DASHBOARD MOBILE SIDEBAR</h2>
          
              <SwitchDarkMode className='bg-neutral-100 dark:bg-neutral-800' />
      
       
        </div>
        <span className='absolute right-2 top-2 p-1'>
          <ButtonClose onClick={onClickClose} />
        </span>
      </div>
      <ul className='flex flex-col py-6 px-2 space-y-1'>
        {data.map(_renderItem)}
      </ul>
    </div>
  );
};

export default NavAdminMobile;
