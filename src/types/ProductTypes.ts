import { ReviewType } from '@/types/ReviewType';
import mongoose, { Schema } from "mongoose";

export interface ProductType {
  id?: mongoose.Types.ObjectId; // Optional if the document is newly created
  name: string;
  slug: string; // Unique slug
  price: number;
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

// export interface ProductType {
//   id: string; // UUID
//   name: string;
//   price: number;
//   description: string;
//   thumbnail: string;
//   product_role: string; 
//   category_id?: string | null; // UUID or null
//   sub_category_id?: string | null; // UUID or null
//   stock?: number | null; // Default is 0
//   discount?: number | null; // Default is 0
//   created_at: Date; // Timestamp with timezone
//   images_gallery: string[]; // Array of text
//   status: string; //(e.g: New in | Limited Edition | Stock Out | Best Sales )
//   dropshop: string; // UUID
//   BN_content: ProductContentType[]; // Bengali content
//   EN_content: ProductContentType[]; // English content
//   colors?: string[] | null; // Array of text or null
//   sizes?: string[] | null; // Array of text or null
//   variants?: string[] | null; // Array of text or null
//   reviews?:ReviewType[];
// }

export interface ProductContentType{
  name:string;
  content:string;
}
