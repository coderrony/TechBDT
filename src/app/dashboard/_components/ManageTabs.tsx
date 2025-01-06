"use client"
import { FC, useState } from 'react';

export interface TabsType {
  id: string;
  label: string;
  content: JSX.Element; // Change content type to JSX.Element to support components
}

interface ManageTabsProps {
  className?: string;
  tabs:TabsType[]
}


const ManageTabs: FC<ManageTabsProps> = ({tabs}) => {

  const [activeTab, setActiveTab] = useState<string>(tabs[0].id);
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className='mt-10'>
    <ul className='max-w-md  mx-auto flex space-x-4'>
      {tabs.map(tab => (
        <li key={tab.id} className='flex-auto text-center'>
          <button
            className={`py-2 text-sm  focus:outline-none transition-all ${
              activeTab === tab.id
                ? 'text-blue-600 font-bold border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => handleTabClick(tab.id)}>
            {tab.label}
          </button>
        </li>
      ))}
    </ul>

    {/* Tab content */}
    <div className='p-5'>
      {tabs.map(tab => (
        <div
          key={tab.id}
          id={tab.id}
          role='tabpanel'
          className={activeTab === tab.id ? 'block' : 'hidden'}>
          {/* Render the content of the active tab */}
          {tab.content}
        </div>
      ))}
    </div>
  </div>
  );
};

export default ManageTabs;