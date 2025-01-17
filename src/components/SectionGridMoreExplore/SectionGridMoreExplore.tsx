"use client";

import React, { FC, useEffect, useState } from "react";

import CardCategory4 from "@/components/CardCategories/CardCategory4";
import Heading from "@/components/Heading/Heading";
import NavItem2 from "@/components/NavItem2";
import Nav from "@/shared/Nav/Nav";
import { CategoryAndSubType } from "@/types/CategoryType";
import { replaceMongoIdInArray } from "@/lib/convertData";

export interface SectionGridMoreExploreProps {
  className?: string;
  gridClassName?: string;
  data: CategoryAndSubType[];
}

const SectionGridMoreExplore: FC<SectionGridMoreExploreProps> = ({
  className = "",

  gridClassName = "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  data = [],
}) => {

  const [tabActive, setTabActive] = useState(data[0].name);
  const [productPreview, setProductPreview] = useState<any[]>([]);
  // console.log("data ",data);
  // console.log("productPreview ",productPreview);
  
  useEffect(() => {
    const filteredItem = data.find(item => item.name === tabActive);
  
    if (filteredItem && filteredItem.sub_categories?.length > 0    ) {
      setProductPreview(replaceMongoIdInArray(filteredItem.sub_categories as any[]));  // Assign products if they exist
    } else {
      setProductPreview([]);  // Assign an empty array if no products found
    }
  }, [tabActive,data]);

  const renderCard = (item: CategoryAndSubType) => {
    return (
      <CardCategory4
        featuredImage={item.image_url}
        key={item.id}
        {...item}
      />
    );
  };


  const renderHeading = () => {
    return (
      <div>
        <Heading
          className="mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50"
          fontClass="text-3xl md:text-4xl 2xl:text-5xl font-semibold"
          isCenter
          desc=""
        >
          Start exploring
        </Heading>
        <Nav
          className="p-1 bg-white dark:bg-neutral-800 rounded-full shadow-lg overflow-x-auto hiddenScrollbar"
          containerClassName="mb-12 lg:mb-14 relative flex justify-center w-full text-sm md:text-base"
        >
          {data.map((item, index) => (
            <NavItem2
              key={item.id}
              isActive={tabActive === item.name}
              onClick={() => setTabActive(item.name)}
            >
              <div className="flex items-center justify-center space-x-1.5 sm:space-x-2.5 text-xs sm:text-sm ">
               
                <span>{item.name}</span>
              </div>
            </NavItem2>
          ))}
        </Nav>
      </div>
    );
  };

  return (
    <div className={`nc-SectionGridMoreExplore relative ${className}`}>
      {renderHeading()}
      <div className={`grid gap-4 md:gap-7 ${gridClassName}`}>
        {productPreview.map((item) => renderCard(item))}
      </div>
    </div>
  );
};

export default SectionGridMoreExplore;
