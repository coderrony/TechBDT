import mongoose, { Schema } from 'mongoose';

const addToCartSchema = new Schema(
  {

    product:{ type: Schema.Types.ObjectId, ref: 'Product', required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
 
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    color: {
      type: String,
      default:null
    },
    size: {
      type: String,
      default:null
    },
  },
  { timestamps: true },
);

export const AddToCart =
  mongoose.models.AddToCart ?? mongoose.model('AddToCart', addToCartSchema);
