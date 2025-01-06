
import mongoose, { Schema, Document} from 'mongoose';

export interface DropShopType extends Document {
  name: string;
  upload_total_product: number;
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
}