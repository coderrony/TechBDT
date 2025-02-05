"use client"
import { useState } from "react";
import { ProductType } from "@/types/ProductTypes";
import { ProductCacheContext } from "@/context";

// Context তৈরি করা


export const ProductCacheProvider = ({ children }: { children: React.ReactNode }) => {
  const [cachedProducts, setCachedProducts] = useState<ProductType[][] | null>(null);
  const [cachePage,setCachePage] = useState(0)

  return (
    <ProductCacheContext.Provider value={{ cachedProducts, setCachedProducts,cachePage,setCachePage }}>
      {children}
    </ProductCacheContext.Provider>
  );
};


