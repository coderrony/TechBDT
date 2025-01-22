import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    delivery_type: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    shipping_cost: {
      type: Number,
      required: true,
    },
    payment_method: {
      type: String,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    paid: {
      type: Number,
      required: true,
    },
    due_payment: {
      type: Number,
      default: 0,
    },
    transaction_id: {
      type: String,
      required: true,
    },
    invoice_id: {
      type: String,
      required: true,
    },
    sender_number: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [ 'Processing', 'Shipped', 'Delivered'],
      default: 'Processing',
    },
    shipping_address: {
      type: new Schema(
        {
          division: { type: String, required: true },
          district: { type: String, required: true },
          upzila: { type: String, required: true },
          union: { type: String, required: true },
          house: { type: String, required: true },
          mobile: { type: [String], default: [] },
        },
        { _id: false } // Prevents creation of a separate `_id` for this subdocument
      ),
      required: true,
    },
  
  
    products: [
      {
       product_name: { type: String, required: true },
       slug: { type: String, required: true},
          price: {
            type: Number,
            required: true,
          },
          sku: {
            type: String,
            required: true,
          },
          quantity: { type: Number, required: true },
          dropShop: { type: Schema.ObjectId, ref: 'DropShop', require: true },
          color: { type: String },
          size: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
