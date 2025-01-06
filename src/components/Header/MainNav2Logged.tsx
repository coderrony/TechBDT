
import React, { FC } from 'react';
import Logo from '@/shared/Logo/Logo';
import MenuBar from '@/shared/MenuBar/MenuBar';
import AvatarDropdown from './AvatarDropdown';
import Navigation from '@/shared/Navigation/Navigation';
import CartDropdown from './CartDropdown';

import SearchBtn from '../IconComponents/SearchBtn';
import { getCategoriesWithSubCategories } from '@/queries/categories';
import { default_category, NAVIGATION_DATA } from '@/data/defaultValue';
import { CategoryAndSubType } from '@/types/CategoryType';
import { auth } from '@/auth';


export interface MainNav2LoggedProps {}

const MainNav2Logged: FC<MainNav2LoggedProps> = async () => {

  const allCategory = await getCategoriesWithSubCategories() as CategoryAndSubType[];

    const nav_data = [
      ...NAVIGATION_DATA,
      {
        id: 'ae5c-456a',
        href: '/search',
        name: 'Categories',
        image_url: default_category,
        sub_categories: allCategory,
      },
    ];

  const renderContent = () => {
   
    return (
      <div className='h-20 flex justify-between'>
        <div className='flex items-center lg:hidden flex-1'>
          <MenuBar allCategory={allCategory || []} />
        </div>

        <div className='lg:flex-1 flex items-center'>
          <Logo className='flex-shrink-0' />
        </div>

        <div className='flex-[2] hidden lg:flex justify-center mx-4'>
          <Navigation allCategory={nav_data || []}  />
        </div>

        <div className='flex-1 flex items-center justify-end text-slate-700 dark:text-slate-100'>
          <SearchBtn />

          <AvatarDropdown  />
          <CartDropdown />
        </div>
      </div>
    );
  };

  return (
    <div className='nc-MainNav2Logged relative z-10 bg-white dark:bg-neutral-900 border-b border-slate-100 dark:border-slate-700'>
      <div className='container '>{renderContent()}</div>
    </div>
  );
};

export default MainNav2Logged;
