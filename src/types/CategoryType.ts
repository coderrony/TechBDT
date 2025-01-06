
import mongoose, { Document, Schema } from "mongoose";

export interface CategoryAndSubType {
  id: string;
  name: string;
  image_url: string;
  count?: number;
  createdAt?: Date;
  updatedAt?: Date;
  sub_categories: CategoryAndSubType[] | []; // Allow null here
  href?: string;

}



// import mongoose, { Document, Schema } from "mongoose";

// // Define the Category interface extending Mongoose's Document
// export interface CategoryType extends Document {
//   name: string;
//   image_url: string;
//   count: number;
//   createdAt: Date;
//   updatedAt: Date;
// }
