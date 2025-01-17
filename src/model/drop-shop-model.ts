import mongoose, { Schema } from 'mongoose';
// dropshop Shcema
const dropShopSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
      unique: true,
    },
    upload_total_product: {
      type: Number,
      default: 0,
    },
    url: {
      required: true,
      type: String,
    },
  },
  { timestamps: true },
);

export const DropShop =
  mongoose.models.DropShop || mongoose.model('DropShop', dropShopSchema);
