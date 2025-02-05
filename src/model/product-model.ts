
import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: { type: String, required: true, unique: true }, // Unique Slug
    price: {
      type: Number,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    product_role: {
      type: String,
      default: 'active',
    },

    dropShop: { type: Schema.ObjectId, ref: 'DropShop', require: true },
    category: {
      type: String,
      default: null
    },
    sub_category: {
      type: String,
      default: null
    },
    stock: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    images_gallery: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      default: 'New In',
    },

    EN_content: [{ type: Schema.Types.Mixed, required: true }],
    BN_content: [{ type: Schema.Types.Mixed, required: true }],

    colors: {
      type: [String],
      default: [],
    },
    sizes: {
      type: [String],
      default: [],
    },
    variants: {
      type: [String],
      default: [],
    },
    reviews: {
      type: [
        { type: Schema.Types.ObjectId, ref: "Review" }
      ],
    },
  },
  { timestamps: true },
);

export const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);
