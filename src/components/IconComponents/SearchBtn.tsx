"use client"

import { FC } from 'react';
import { useRouter } from "next/navigation";

interface SearchBtnProps {
  className?: string;
}

const SearchBtn: FC<SearchBtnProps> = () => {
  const router = useRouter();

  const renderMagnifyingGlassIcon = () => {
    return (
      <svg
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 22L20 20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };
  return (
    <button
    className="hidden lg:flex w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none items-center justify-center"
    // onClick={() => setShowSearchForm(!showSearchForm)}
    onClick={() => router.push("/search")}
  >
    {renderMagnifyingGlassIcon()}
  </button>
  );
};

export default SearchBtn;