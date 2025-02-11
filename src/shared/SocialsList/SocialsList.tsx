import React, { FC } from "react";

import Image from "next/image";
import Link from "next/link";
import { socials } from "@/data/defaultValue";

export interface SocialsListProps {
  className?: string;
  itemClass?: string;
}

const SocialsList: FC<SocialsListProps> = ({
  className = "",
  itemClass = "block w-6 h-6",
}) => {
  return (
    <nav
      className={`nc-SocialsList flex space-x-2.5 text-2xl text-neutral-6000 dark:text-neutral-300 ${className}`}
    >
      {socials.map((item, i) => (
        <Link
          key={i}
          className={`${itemClass}`}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          title={item.name}
        >
          <Image sizes="40px" src={item.icon} alt="" />
        </Link>
      ))}
    </nav>
  );
};

export default SocialsList;
