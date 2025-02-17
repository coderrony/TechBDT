'use server';

import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from '@/lib/convertData';
import { Product } from '@/model/product-model';
import { Review } from '@/model/review-model';
import { connectDB } from '@/services/mongo';
import slugify from 'slugify';

export const createProduct = async (formData: any) => {
  await connectDB();
  try {
    const name = formData.get('name') as string;
    const category = formData.get('category');
    const sub_category = formData.get('sub_category');
    const price = formData.get('price') as number;
    const sku = formData.get('sku') as string;
    const status = formData.get('status') as string;
    const discount = formData.get('discount') as number;
    const description = formData.get('description') as string;
    const thumbnail = formData.get('thumbnail') as string;
    // const image_gallery = formData.getAll('image_gallery') as File[];
    const images_gallery = formData.getAll('image_gallery') as any;
    const dropShop = formData.get('dropshop') as string;

    const BN_contentRaw = formData.get('BN_content');
    const EN_contentRaw = formData.get('EN_content');
    const payloadString = formData.get('payload') as string;

    let payload = JSON.parse(payloadString);
    const BN_content = BN_contentRaw ? JSON.parse(BN_contentRaw as string) : {};
    const EN_content = EN_contentRaw ? JSON.parse(EN_contentRaw as string) : {};
    const slug = slugify(name, { lower: true, strict: true });

  
    const product_data = {
      name,
      slug,
      price,
      sku,
      status,
      discount,
      description,
      thumbnail,
      images_gallery: images_gallery.length > 0 ? JSON.parse(images_gallery) : [],
      dropShop,
      BN_content,
      EN_content,
    } as any;

    if (category) {
      product_data['category'] = category;
    }
    if (sub_category) {
      product_data['sub_category'] = sub_category;
    }

    if (payload.sizes.length > 0) {
      product_data['sizes'] = payload.sizes;
    }
    if (payload.colors.length > 0) {
      product_data['colors'] = payload.colors;
    }
    if (payload.variants.length > 0) {
      product_data['variants'] = payload.variants;
    }

    const product = await Product.create(product_data);

    if (product) {
      return {
        status: 200,
        message: 'Product Create successfully!',
      };
    } else {
      return {
        status: 500,
        message: 'Error: File To Product Create!',
      };
    }
  } catch (err: any) {
    console.log(err);
    throw new Error('File to Create Product');
  }
};



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
    const products = await Product.find({ category: "Gadgets" })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    return replaceMongoIdInArray(products as any[]) || [];

  } catch (error:any) {
    console.error("Error fetching gadgets:", error);
    return [];
  }

}

// Gift items for home page
export const getGiftItems = async () => {
  // await connectDB();
  try {
    const products = await Product.find({ category: "Gift Items" })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

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
    const products = await Product.find({ category: "Best Deal" })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    return replaceMongoIdInArray(products as any[]) || [];

  } catch (error:any) {
    console.error("Error fetching best deal Items:", error);
    return [];
  }

}
