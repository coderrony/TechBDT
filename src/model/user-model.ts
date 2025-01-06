import { default_avatar } from '@/data/defaultValue';
import mongoose, { Schema } from 'mongoose';


const userSchema = new Schema(
  {
    full_name: {
      required: true,
      type: String,
    },
    provider: {
      required: true,
      type: String,
    },
    password: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ['admin', 'seller', 'customer'],
      default: 'customer',
    },
    profilePicture: {
      default: default_avatar,
      type: String,
    },
    // address: {
    //   type: [
    //     { type: Schema.Types.ObjectId, ref: "Address" }
    //   ],
    // },
    address:{ type: Schema.Types.ObjectId, ref: "Address",default: null },
    cart:{
      type: [
         { type: Schema.Types.ObjectId, ref: 'AddToCart' }
        ],
    },
  
  },
  { timestamps: true },
);

export const User = mongoose.models.User ?? mongoose.model('User', userSchema);
