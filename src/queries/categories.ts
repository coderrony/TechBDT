// 'use server';


// import { replaceMongoIdInArray } from '@/lib/convertData';
// import { Category } from '@/model/category-model';
// import { SubCategory } from '@/model/sub-category-model';
// import { connectDB } from '@/services/mongo';



// export async function getCategoriesWithSubCategories() {
//   await connectDB()
//   try {
//     const categoriesWithSubCategories = await Category.find({}).populate({
//         path: "sub_categories",
//         model: SubCategory
//     }).lean() as any[]; 

//     if (categoriesWithSubCategories.length > 0) {
//       return replaceMongoIdInArray(categoriesWithSubCategories);
//     }
//     return null;
//   } catch (error: any) {
//     throw new Error(
//       `Error fetching categories with subcategories ' ${error.message}`,
//     );
//   }
// }
