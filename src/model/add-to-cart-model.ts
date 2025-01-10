import mongoose, { Schema } from 'mongoose';

const addToCartSchema = new Schema(
  {

    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products:{ 
      type:[
        { 
         product:{ type: Schema.Types.ObjectId, ref: 'Product', required: true },
         quantity: {
           type: Number,
           required: true,
           default: 1,
         },
         color: {
           type: String,
         },
         size: {
           type: String,
         },
        }
       ]
    },
 
   
  },
  { timestamps: true },
);

export const AddToCart =
  mongoose.models.AddToCart ?? mongoose.model('AddToCart', addToCartSchema);
