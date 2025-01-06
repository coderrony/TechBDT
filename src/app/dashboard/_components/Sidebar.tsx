'use client';
import Link from 'next/link';
import { FC } from 'react';
import { sidebar_nav_data, SidebarType } from '../_data';
import { usePathname } from 'next/navigation';
import { Route } from 'next';
import AdminMobileSidebar from './AdminMobileSidebar';
import Logo from '@/shared/Logo/Logo';
import SwitchDarkMode from '@/shared/SwitchDarkMode/SwitchDarkMode';

interface SidebarProps {
  className?: string;
}

const Sidebar: FC<SidebarProps> = () => {
  const pathname = usePathname();

  const renderItem = (item: SidebarType) => {
    const isActive = pathname === item.href;

    return (
      <li key={item.label} className='relative px-6 py-3'>
        {isActive && (
          <span
            className='absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg'
            aria-hidden='true'></span>
        )}

        <Link
          href={item.href as Route}
          className={`${
            isActive && 'dark:text-gray-200 text-gray-800'
          } inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200`}>
          <span className='ml-4'>{item.label}</span>
        </Link>
      </li>
    );
  };

  return (
    <div>
      <div className='md:hidden container'>
        <AdminMobileSidebar />
      </div>
      <aside className='z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0'>
        <div className='py-4 text-gray-500 dark:text-gray-400'>
          <ul>
          <div className='flex justify-between items-center m-5'>
          <Logo className='' />
          <SwitchDarkMode />
        </div>
            {sidebar_nav_data.map(item => renderItem(item))}
          </ul>
          <div className='px-6 my-6'>
            <button className='flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple'>
              Create account
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
