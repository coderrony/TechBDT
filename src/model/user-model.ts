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
    address: {
      type: [
        {
          division: { type: String, required: true },
          district: { type: String, required: true },
          upzila: { type: String, required: true },
          union: { type: String, required: true },
          house: { type: String, required: true },
          mobile: { type: [String], default: [] },
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
