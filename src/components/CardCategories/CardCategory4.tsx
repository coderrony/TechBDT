import React, { FC } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import explore1Svg from '@/images/collections/explore1.svg';
import explore2Svg from '@/images/collections/explore2.svg';
import explore3Svg from '@/images/collections/explore3.svg';
import explore4Svg from '@/images/collections/explore4.svg';
import explore5Svg from '@/images/collections/explore5.svg';
import explore6Svg from '@/images/collections/explore6.svg';
import explore7Svg from '@/images/collections/explore7.svg';
import explore8Svg from '@/images/collections/explore8.svg';
import explore9Svg from '@/images/collections/explore9.svg';

const exploreImg = [explore1Svg,explore2Svg,explore3Svg,explore4Svg,explore5Svg,explore6Svg,explore7Svg,explore8Svg,explore9Svg]

export interface CardCategory4Props {
  className?: string;
  featuredImage?: StaticImageData | string;

  name: string;
  desc?: string;
  color?: string;
  count?: number;
}

const CardCategory4: FC<CardCategory4Props> = ({
  className = "",
  featuredImage = ".",
  name,
  desc,
  color = "bg-rose-50",
  count,
}) => {
  return (
    <div
      className={`nc-CardCategory4 relative w-full aspect-w-12 aspect-h-11 h-0 rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 group hover:nc-shadow-lg transition-shadow ${className}`}
    >
      <div>
        <div className="absolute bottom-0 right-0 max-w-[280px] opacity-80">
          <Image src={exploreImg[Math.floor(Math.random() * exploreImg.length)]} alt="image" width={400} height={400} />
        </div>

        <div className="absolute inset-5 sm:inset-8 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <NcImage
              alt=""
              src={featuredImage}
              containerClassName={`w-20 h-20 rounded-full overflow-hidden z-0 ${color}`}
              width={50}
              height={50}
            />
            {/* <span className="text-xs text-slate-700 dark:text-neutral-300 font-medium">
              {count} products
            </span> */}
          </div>

          <div className="">
            <span
              className={`block mb-2 text-sm text-slate-500 dark:text-slate-400`}
            >
              {desc}
            </span>
            <h2 className={`text-2xl sm:text-3xl font-semibold`}>{name}</h2>
          </div>

          <Link
            href={"/"}
            className="flex items-center text-sm font-medium group-hover:text-primary-500 transition-colors"
          >
            <span>See Collection</span>
            <ArrowRightIcon className="w-4 h-4 ml-2.5" />
          </Link>
        </div>
      </div>

  
    </div>
  );
};

export default CardCategory4;
