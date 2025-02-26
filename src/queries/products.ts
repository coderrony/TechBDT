'use server';

import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from '@/lib/convertData';
import { Product } from '@/model/product-model';
import { Review } from '@/model/review-model';
import { connectDB } from '@/services/mongo';


export const getProductInfoForMetaData = async () => {
  await connectDB();
  const products = await Product.find({})
    .select(["slug", "createdAt"])
    .lean()
    .limit(500); // Example: Fetch first 1000 products
  return replaceMongoIdInArray(products as any[]) || [];
};


export const productCountBySubCategory = async (sub_category: string) => {
  await connectDB();
  try {
    const count = await Product.countDocuments({ sub_category });
    
    
    return count;
  } catch (error) {

    return Math.floor(Math.random() * (12 - 5 + 1)) + 5;
  }
}

export async function getProductBySlug(slug: string) {
  await connectDB();
  try {
   const product = await Product.findOne({ slug }).populate({
    path: "reviews",
    model: Review
}).lean(); 
   return replaceMongoIdInObject(product as any)
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}


// Gadgets items for home page
export const getGadgets = async () => {
  await connectDB();
  try {
    const products = await Product.aggregate([
      { $match: { category: "Gadgets" } },
      { $sample: { size: 20 } }
    ]);

    return replaceMongoIdInArray(products as any[]) || [];

  } catch (error: any) {
    console.error("Error fetching gadgets:", error);
    return [];
  }
};

// Gift items for home page
export const getGiftItems = async () => {
  // await connectDB();
  try {


    const products = await Product.aggregate([
      { $match: { category: "Gift Items" } },
      { $sample: { size: 20 } }
    ]);

    return replaceMongoIdInArray(products as any[]) || [];

  } catch (error:any) {
    console.error("Error fetching Gift Items:", error);
    return [];
  }

}

// Fashion items for home page
export const getBestDeal = async () => {
  // await connectDB();
  try {
  
    const products = await Product.aggregate([
      { $match: { category: "Best Deal" } },
      { $sample: { size: 20 } }
    ]);

    return replaceMongoIdInArray(products as any[]) || [];

  } catch (error:any) {
    console.error("Error fetching best deal Items:", error);
    return [];
  }

}
