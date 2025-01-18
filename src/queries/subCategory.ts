// 'use server';

// import { uploadFileByCloudinary } from '@/lib/cloudinaryFileUpload';
// import { Category } from '@/model/category-model';
// import { SubCategory } from '@/model/sub-category-model';


// export const createSubCategory = async (formData: any) => {
//   const name = formData.get('name') as string;
//   const category = formData.get('category') as string;
//   const file = formData.get('file') as File;

//   // save data in category schema
//   const data: any = { name, category };

//   try {
//     if (file) {
//       //  upload process
//       const uploadResult = await uploadFileByCloudinary(
//         file,
//         `sub-categories-images/${name}`,
//       );

//       if (uploadResult) {
//         data['image_url'] = uploadResult.secure_url;
//       } else {
//         throw new Error('Image upload Error');
//       }
//     }

//     const subCategory = await SubCategory.create(data);
//     console.log("subCategory ",subCategory);
    
//     if (subCategory) {
//         // Add Category to the sub category
//         await Category.findByIdAndUpdate(
//           category,
//           { $push: { sub_categories: subCategory._id } },
//           { new: true }
//         ); 
//       return {
//         status: 200,
//         message: 'Sub Category Create Successfully',
//       };
//     } else {
//       throw new Error(`fail to Crate Sub Category !`);
//     }
//   } catch (err: any) {
//     console.log(err);
//     throw new Error(err.message);
//   }
// };
