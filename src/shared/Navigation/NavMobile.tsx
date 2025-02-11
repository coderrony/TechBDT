// 'use client';

// import React from 'react';
// import ButtonClose from '@/shared/ButtonClose/ButtonClose';
// import Logo from '@/shared/Logo/Logo';
// import { Disclosure } from '@/app/headlessui';

// import SocialsList from '@/shared/SocialsList/SocialsList';
// import { ChevronDownIcon } from '@heroicons/react/24/solid';
// import SwitchDarkMode from '@/shared/SwitchDarkMode/SwitchDarkMode';
// import Link from 'next/link';

// import { useRouter } from 'next/navigation';
// import { CategoryAndSubType } from '@/types/CategoryType';
// export interface NavMobileProps {
//   data: CategoryAndSubType[];
//   onClickClose?: () => void;

// }

// const NavMobile: React.FC<NavMobileProps> = ({
//   data,
//   onClickClose,
// }) => {
//   const router = useRouter();

//   const _renderMenuChild = (
//     item: CategoryAndSubType,
//     itemClass = ' pl-3 text-neutral-900 dark:text-neutral-200 font-medium ',
//   ) => {
   
//     return (
//       <ul className='nav-mobile-sub-menu pl-6 pb-1 text-base'>
//         {item.sub_categories?.map((i, index) => (
//           <Disclosure key={index} as='li'>
//             <Link
//              href={i?.href ? (typeof i.href === 'string' ? { pathname: i.href } : i.href) : `/search?${i.name}`}
//               className={`flex text-sm rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-0.5 pr-4 ${itemClass}`}>
//               <span
//             className={`py-2.5 ${i?.sub_categories?.length > 0 ? '' : 'block w-full'}`}
//                 onClick={onClickClose}>
//                 {i.name}
//               </span>
//               {i?.sub_categories?.length > 0 && (
//                 <span
//                   className='flex items-center flex-grow'
//                   onClick={e => e.preventDefault()}>
//                   <Disclosure.Button
//                     as='span'
//                     className='flex justify-end flex-grow'>
//                     <ChevronDownIcon
//                       className='ml-2 h-4 w-4 text-slate-500'
//                       aria-hidden='true'
//                     />
//                   </Disclosure.Button>
//                 </span>
//               )}
//             </Link>
//             {i?.sub_categories?.length > 0 && (
//               <Disclosure.Panel>
//                 {_renderMenuChild(
//                   i,
//                   'pl-3 text-slate-600 dark:text-slate-400 ',
//                 )}
//               </Disclosure.Panel>
//             )}
//           </Disclosure>
//         ))}
//       </ul>
//     );
//   };

//   const _renderItem = (item: CategoryAndSubType, index: number) => {

//     const isSubCategories = item.sub_categories.length > 0 ? true : false
//     return (
//       <Disclosure
//         key={index}
//         as='li'
//         className='text-slate-900 dark:text-white'>
//         <Link
//           className='flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg'
        
    
//           href={item?.href ? (typeof item.href === 'string' ? { pathname: item.href } : item.href) : `/search?${item.name}`}
//           >
//           <span
//             className={!isSubCategories ? 'block w-full' : ''}
//             onClick={onClickClose}>
//             {item.name}
//           </span>
//           {isSubCategories && (
//             <span className='block flex-grow' onClick={e => e.preventDefault()}>
//               <Disclosure.Button
//                 as='span'
//                 className='flex justify-end flex-grow'>
//                 <ChevronDownIcon
//                   className='ml-2 h-4 w-4 text-neutral-500'
//                   aria-hidden='true'
//                 />
//               </Disclosure.Button>
//             </span>
//           )}
//         </Link>
//         {isSubCategories && (
//           <Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>
//         )}
//       </Disclosure>
//     );
//   };

//   const controlBtn = () => {
//     if (onClickClose) onClickClose();
//     router.push('/search');
//   };


//   const renderMagnifyingGlassIcon = () => {
//     return (
//       <button
//         onClick={controlBtn}
//         className={`text-2xl md:text-3xl w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center `}>
//         <svg
//           width={22}
//           height={22}
//           viewBox='0 0 24 24'
//           fill='none'
//           xmlns='http://www.w3.org/2000/svg'>
//           <path
//             d='M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z'
//             stroke='currentColor'
//             strokeWidth='1.5'
//             strokeLinecap='round'
//             strokeLinejoin='round'
//           />
//           <path
//             d='M22 22L20 20'
//             stroke='currentColor'
//             strokeWidth='1.5'
//             strokeLinecap='round'
//             strokeLinejoin='round'
//           />
//         </svg>
//       </button>
//     );
//   };

//   return (
//     <div className='overflow-y-auto w-full h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800'>
//       <div className='py-6 px-5'>
//         <Logo />
//         <div className='flex flex-col mt-5 text-slate-600 dark:text-slate-300 text-sm'>
//           <span>
//             Discover the most outstanding articles on all topics of life. Write
//             your stories and share them
//           </span>

//           <div className='flex justify-between items-center mt-4'>
//             <SocialsList itemClass='w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xl' />
//             <span className=' flex gap-2'>
//               {renderMagnifyingGlassIcon()}
//               <SwitchDarkMode className='bg-neutral-100 dark:bg-neutral-800' />
//             </span>
//           </div>
//         </div>
//         <span className='absolute right-2 top-2 p-1'>
//           <ButtonClose onClick={onClickClose} />
//         </span>
//       </div>
//       <ul className='flex flex-col py-6 px-2 space-y-1'>
//         {data.map(_renderItem)}
//       </ul>
//     </div>
//   );
// };

// export default NavMobile;
