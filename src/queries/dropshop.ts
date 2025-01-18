// "use server"
// import { replaceMongoIdInArray } from '@/lib/convertData';
// import { DropShop } from '@/model/drop-shop-model';

// export const getDropShops = async () => {
//   const dropShop = (await DropShop.find({}).lean()) as any;
//   // console.log("dropShop ",dropShop);
  
//   if (dropShop.length > 0) { 
//     return replaceMongoIdInArray(dropShop);
//   }
//   return [];
// };
