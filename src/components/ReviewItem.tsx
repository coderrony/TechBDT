import { StarIcon } from "@heroicons/react/24/solid";
import React, { FC } from "react";
import Avatar from "@/shared/Avatar/Avatar";

import { ReviewType } from "@/types/ReviewType";

export interface ReviewItemProps {
  className?: string;
  data: ReviewType;
}


const ReviewItem: FC<ReviewItemProps> = ({
  className = "",
  data,
}) => {

  return (
    <div
      className={`nc-ReviewItem flex flex-col ${className}`}
      data-nc-id="ReviewItem"
    >
      <div className=" flex space-x-4 ">
        <div className="flex-shrink-0 pt-0.5">
          <Avatar
            sizeClass="h-10 w-10 text-lg"
            radius="rounded-full"
            userName={data.full_name}
            imgUrl={data.avatar_url}
          />
        </div>

        <div className="flex-1 flex justify-between items-center">
          <div className="text-sm sm:text-base">
            <span className="block font-semibold">{data.full_name}</span>
        
          </div>

          <div className="mt-0.5 flex ">
          {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                className={`w-5 h-5 ${index < data.rating ? 'text-yellow-500' : 'text-slate-500'}`}
              />
            ))}

          </div>
        </div>
      </div>
      <div className="mt-4 prose prose-sm sm:prose dark:prose-invert sm:max-w-2xl">
        <p className="text-slate-600 dark:text-slate-300">{data.comment}</p>
      </div>
    </div>
  );
};

export default ReviewItem;
