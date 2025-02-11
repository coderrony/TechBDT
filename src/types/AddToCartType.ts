import mongoose from "mongoose";


export interface CartProductType {
  name: string; 
  slug: string; 
  price: number; 
  thumbnail: string; 
  quantity: number; 
  color?: string; 
  size?: string; 
}
export interface AddToCartType {
  products: CartProductType[]; 
  user: mongoose.Types.ObjectId | string; 
  createdAt?: Date; 
  updatedAt?: Date; 
}