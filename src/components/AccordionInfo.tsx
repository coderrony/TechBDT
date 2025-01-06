'use client';

import { Disclosure } from '@/app/headlessui';
import Button from '@/shared/Button/Button';
import { ProductContentType } from '@/types/ProductTypes';


import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { FC, useState } from 'react';
import Label from './Label/Label';
import SelectValue from './SelectValue';

interface Props {
  panelClassName?: string;
  en_content: ProductContentType[];
  bn_content: ProductContentType[];
}

const AccordionInfo: FC<Props> = ({
  panelClassName = 'p-4 pt-3 last:pb-0 text-slate-600 text-sm dark:text-slate-300 leading-6',
  en_content = [],
  bn_content = [],
}) => {
  const [selectLang, setSelectLang] = useState(bn_content);

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;

    if (selectedLang === 'EN') {
      setSelectLang(en_content);
    } else {
      setSelectLang(bn_content);
    }
  };
  return (
    <div className='w-full rounded-2xl space-y-2.5'>
   
      <div className='h-20'>
        <SelectValue
          onChange={handleLangChange} // Add onChange
        >
          <option value={'BN'}>Bangla Selected</option>
          <option value={'EN'}>English Selected</option>
        </SelectValue>
      </div>
      {selectLang.map((item, index) => {
        return (
          <Disclosure key={index} defaultOpen={index < 2}>
            {({ open }) => (
              <>
                <Disclosure.Button className='flex items-center justify-between w-full px-4 py-2 font-medium text-left bg-slate-100/80 hover:bg-slate-200/60 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75 '>
                  <span>{item.name}</span>
                  {!open ? (
                    <PlusIcon className='w-4 h-4 text-slate-600 dark:text-slate-400' />
                  ) : (
                    <MinusIcon className='w-4 h-4 text-slate-600 dark:text-slate-400' />
                  )}
                </Disclosure.Button>
                <Disclosure.Panel
                  className={panelClassName}
                  as='div'
                  dangerouslySetInnerHTML={{
                    __html: item.content,
                  }}></Disclosure.Panel>
              </>
            )}
          </Disclosure>
        );
      })}
    </div>
  );
};

export default AccordionInfo;
