'use server';

import { uploadFileByCloudinary } from '@/lib/cloudinaryFileUpload';
import { replaceMongoIdInArray } from '@/lib/convertData';
import { Category } from '@/model/category-model';
import { SubCategory } from '@/model/sub-category-model';
import { connectDB } from '@/services/mongo';


// export const createCategory = async (formData: any) => {
//   const name = formData.get('name') as string;
//   const file = formData.get('file') as File;

//   // save data in category schema
//   const data: any = { name };

//   try {
//     if (file) {
//       // process to file upload

//       const uploadResult = await uploadFileByCloudinary(
//         file,
//         `categories-images/${name}`,
//       );

//       if (uploadResult) {
//         data['image_url'] = uploadResult.secure_url;
//       } else {
//         throw new Error('Image upload Error');
//       }
//     }

//     const category = await Category.create(data);
//     if (category) {
//       return {
//         status: 200,
//         message: 'Category Create Successfully',
//       };
//     } else {
//       throw new Error(`fail to Crate Category!`);
//     }
//   } catch (err: any) {
//     console.log(err);
//     throw new Error(err.message);
//   }
// };


export async function getCategoriesWithSubCategories() {
  await connectDB()
  try {
    const categoriesWithSubCategories = await Category.find({}).populate({
        path: "sub_categories",
        model: SubCategory
    }).lean() as any[]; 

    if (categoriesWithSubCategories.length > 0) {
      return replaceMongoIdInArray(categoriesWithSubCategories);
    }
    return null;
  } catch (error: any) {
    throw new Error(
      `Error fetching categories with subcategories ' ${error.message}`,
    );
  }
}
