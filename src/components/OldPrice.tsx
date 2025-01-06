import formatNumber from "@/utils/formatNumber";
import React, { FC } from "react";
import taka from "@/images/taka.png"
import Image from "next/image";
interface OldPriceProps {
  className?: string;
  price?: number;
  contentClass?: string;
}

const OldPrice: FC<OldPriceProps> = ({
  className = "",
  price = 33,
  contentClass = "py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium",
}) => {
  return (
    <div className={`${className}`}>
      <div
        className={`flex items-center justify-center  w-20  ${contentClass}`}
      >
        <span className="text-slate-500 !leading-none line-through flex items-center">     
          {formatNumber(price)}</span>
      </div>
    </div>
  );
};

export default OldPrice;
