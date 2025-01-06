import mongoose, { Schema } from 'mongoose';

const AddressSchema = new Schema(
  {
    user: { type: Schema.ObjectId, ref: 'User', required: true },
    division: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    upzila: {
      type: String,
      required: true,
    },
    union: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    mobile: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

export const Address =
  mongoose.models.Address ?? mongoose.model('Address', AddressSchema);
