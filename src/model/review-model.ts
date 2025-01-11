import { default_avatar } from '@/data/defaultValue';
import mongoose, { Schema } from 'mongoose';

const reviewSchema = new Schema(
  {
    product: {
      required: true,
      type: Schema.Types.ObjectId, // Use ObjectId for reference
      ref: "Product", // Reference the Product model
    },
    full_name: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1, // Minimum rating value
      max: 5, // Maximum rating value
      validate: {
        validator: Number.isInteger,
        message: 'Rating must be an integer value between 1 and 5',
      },
    },
    avatar_url: {
      type: String,
      default: default_avatar,
    },
  },
  { timestamps: true },
);

// export const Review =
//   mongoose.models.Review ?? mongoose.model('Review', reviewSchema);

  export const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

