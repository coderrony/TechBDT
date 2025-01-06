import mongoose, { Schema } from "mongoose";

const subCategorySchema = new Schema({
    name: {
        required: true,
        type: String,
        unique:true
    },
    image_url: {
        type: String,
        default: 'https://res.cloudinary.com/dgobtxhjp/image/upload/v1734752360/market-segment-removebg-preview_h4imri.png' 
    },
    count: {
        type: Number,
        default:0
    },
    category: { type: Schema.ObjectId, ref: "Category" },
},{ timestamps: true });

export const SubCategory =
    mongoose.models.SubCategory ?? mongoose.model("SubCategory", subCategorySchema);
