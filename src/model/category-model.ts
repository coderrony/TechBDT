import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    sub_categories: {
        type: [
          { type: Schema.Types.ObjectId, ref: "SubCategory" }
        ],
      },
    name: {
        required: true,
        type: String,
        unique:true
    },
    image_url: {
        type: String,
        default: 'https://res.cloudinary.com/dgobtxhjp/image/upload/v1734691085/sub_categories_dhwejf.png' 
    },
    count: {
        type: Number,
        default:0
    },
},{ timestamps: true });

export const Category =
    mongoose.models.Category ?? mongoose.model("Category", categorySchema);
