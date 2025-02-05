"use client"
import { ProductCacheContext } from "@/context";
import { useContext } from "react";


// Custom Hook ব্যবহার করে সহজেই ডাটা এক্সেস করা যাবে
export const useProductCache = () => useContext(ProductCacheContext); //  cachedProducts, setCachedProducts 