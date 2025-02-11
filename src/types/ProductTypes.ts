import { ReviewType } from '@/types/ReviewType';
import mongoose, { Schema } from "mongoose";

export interface ProductType {
  id?: mongoose.Types.ObjectId; // Optional if the document is newly created
  name: string;
  slug: string; // Unique slug
  price: number;
  sku:string;
  description: string;
 
  product_role: string; // Defaults to "active"
  dropShop?: mongoose.Types.ObjectId | string; // Reference to DropShop
  category?: mongoose.Types.ObjectId | string; // Reference to Category
  sub_category?: mongoose.Types.ObjectId | string; // Reference to SubCategory
  stock?: number; // Defaults to 0
  discount?: number; // Defaults to 0
  thumbnail: string;
  images_gallery: string[];
  status: string; // Defaults to "New In"
  BN_content: ProductContentType[]; // Bengali content
  EN_content: ProductContentType[]; // English content
  colors?: string[] | null;
  sizes?: string[] | null;
  variants?: string[] | null;
  reviews:ReviewType[];
  createdAt: Date;
  updatedAt: Date;
}


export interface ProductContentType{
  name:string;
  content:string;
}
