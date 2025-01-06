import formatNumber from "@/utils/formatNumber";
import React, { FC } from "react";
import taka from "@/images/taka.png"
import Image from "next/image";
export interface PricesProps {
  className?: string;
  price?: number;
  contentClass?: string;
}

const Prices: FC<PricesProps> = ({
  className = "",
  price = 50000,
  contentClass = "py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium",
}) => {
  return (
    <div className={`${className}`}>
      <div
        className={`flex items-center justify-center border-2 border-green-500 rounded-lg w-22 ${contentClass}`}
      >
        <span className="text-green-500 !leading-none flex items-center font-bold text-base">
         
          {formatNumber(price)}</span>
      </div>
    </div>
  );
};

export default Prices;
