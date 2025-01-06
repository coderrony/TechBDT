'use server';

import { uploadFileByCloudinary } from '@/lib/cloudinaryFileUpload';
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
    const category_id = formData.get('category_id');
    const sub_category_id = formData.get('sub_category_id');
    const price = formData.get('price') as number;
    const status = formData.get('status') as string;
    const discount = formData.get('discount') as number;
    const description = formData.get('description') as string;
    const thumbnail_img = formData.get('thumbnail') as File;
    const image_gallery = formData.getAll('image_gallery') as File[];
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
      status,
      discount,
      description,
      dropShop,
      BN_content,
      EN_content,
    } as any;

    if (category_id) {
      product_data['category'] = category_id;
    }
    if (sub_category_id) {
      product_data['sub_category'] = sub_category_id;
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

    // image gallery url store
    const imageGalleryUrls: string[] = [];

    // thumbnail image upload process
    const thumbnail_upload = await uploadFileByCloudinary(
      thumbnail_img,
      `product-image/${slug}/thumbnail`,
    );
    product_data['thumbnail'] = thumbnail_upload.secure_url;

    //image gallery upload process
    for (const image of image_gallery) {
      const image_gallery_upload = await uploadFileByCloudinary(
        image,
        `product-image/${slug}/image_gallery`,
      );
      imageGalleryUrls.push(image_gallery_upload.secure_url);
    }
    product_data['images_gallery'] = imageGalleryUrls;

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


// fetch first 40,000 products use select and limit
export const getProductInfoForMetaData  = async () => {
  await connectDB(); 
  const products = await Product.find({}).select(["slug","createdAt"]).lean(); 

  return replaceMongoIdInArray(products as any[]) || [];
}


// *** getProducts should be optimized not fetch all product use limit and select fields
export const getProducts = async () => {
  await connectDB(); 
  const products = await Product.find({}).populate({
    path: "reviews",
    model: Review
}).lean(); 

  return replaceMongoIdInArray(products as any[]) || [];
};

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

// Sample function to create a review for a product
export async function createReviewForProduct(productId: string, reviewData: any) {
  // Create a new review
  const newReview = new Review({
    product: productId,
    ...reviewData, // Assuming reviewData contains full_name, comment, rating, etc.
  });

  await newReview.save();

  // Add review to the product
  await Product.findByIdAndUpdate(
    productId,
    { $push: { reviews: newReview._id } },
    { new: true }
  );

  return newReview;
}