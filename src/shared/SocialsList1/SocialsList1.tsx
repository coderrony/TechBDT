// import { SocialType } from "@/shared/SocialsShare/SocialsShare";
import React, { FC } from "react";

import Image from "next/image";
import Link from "next/link";
import { socials } from "@/data/defaultValue";

export interface SocialsList1Props {
  className?: string;
}


const SocialsList1: FC<SocialsList1Props> = ({ className = "space-y-3" }) => {
  const renderItem = (item: any, index: number) => {
    return (
      <Link
        href={item.href}
       target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-2xl text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white leading-none space-x-2 group"
        key={index}
      >
        <div className="flex-shrink-0 w-5 ">
          <Image sizes="40px" src={item.icon} alt="" />
        </div>
        <span className="hidden lg:block text-sm">{item.name}</span>
      </Link>
    );
  };

  return (
    <div className={`nc-SocialsList1 ${className}`} data-nc-id="SocialsList1">
      {socials.map(renderItem)}
    </div>
  );
};

export default SocialsList1;
