// import Prices from "@/components/Prices";
// import ButtonSecondary from "@/shared/Button/ButtonSecondary";
// import Image from "next/image";
// import taka from '@/images/taka.png';

import OrderInfo from "./_components/OrderInfo";
// http://localhost:3000/account-order?invoice_id=1234&status=success


// const PRODUCTS = [
//   {
//     id: "6",
//     name: "Bluetooth Speaker",
//     price: 3500,
//     stock:36,
//     discount:47,
//     productRole:"active",
//     // image: productSport5,
  
//     category: "Audio",
//     subCategory: "speaker",
//     color: "Red",
//     status: "New in",
//     sizes: ["LARGE","SMALL"],
//     productContent: [
//       {
//         name: "Description",
//         content:`  
//              <div className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl">
            
//               <p>
//                 The St. Louis Meramec Canoe Company was founded by Alfred Wickett in
//                 1922. Wickett had previously worked for the Old Town Canoe Co from
//                 1900 to 1914. Manufacturing of the classic wooden canoes in Valley
//                 Park, Missouri ceased in 1978.
//               </p>
    
//               <ul class="list-disc list-inside leading-7 mt-3"
//                <li> </li>
//                 <li> Regular fit, mid-weight t-shirt </li>
//                 <li>Natural color, 100% premium combed organic cotton</li>
//                 <li>Natural color, 100% premium combed organic cotton</li>
//                 <li>
//                   Quality cotton grown without the use of herbicides or pesticides -
//                   GOTS certified
//                 </li>
//                 <li>Soft touch water based printed in the USA</li>
//               </ul>
//               </div>
//             `,
//       },
//     ],
//     reviews: [
//       {
//         userId: "7",
//         message: "Perfect for outdoor use.",
//         username: "james",
//         rating: 4,
      
//       },
//     ],
//     variants: [
//       {
//         productId: "jgh2345dsfg",
    
//         color: "red",
//       },
//     ],
//   },

// ]

const AccountOrder = () => {

  // const renderProductItem = (product: any, index: number) => {
  //   const { name } = product;
  //   return (
  //     <div key={index} className="flex py-4 sm:py-7 last:pb-0 first:pt-0">
  //       <div className="relative h-24 w-16 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
  //         <Image
  //           fill
  //           sizes="100px"
  //           src={taka}
  //           alt={name}
  //           className="h-full w-full object-cover object-center"
  //         />
  //       </div>

  //       <div className="ml-4 flex flex-1 flex-col">
  //         <div>
  //           <div className="flex justify-between ">
  //             <div>
  //               <h3 className="text-base font-medium line-clamp-1">{name}</h3>
  //               <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
  //                 <span>{"Natural"}</span>
  //                 <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
  //                 <span>{"XL"}</span>
  //               </p>
  //             </div>
  //             <Prices className="mt-0.5 ml-2" />
  //           </div>
  //         </div>
  //         <div className="flex flex-1 items-end justify-between text-sm">
  //           <p className="text-gray-500 dark:text-slate-400 flex items-center">
  //             <span className="hidden sm:inline-block">Qty</span>
  //             <span className="inline-block sm:hidden">x</span>
  //             <span className="ml-2">1</span>
  //           </p>

  //           <div className="flex">
  //             <button
  //               type="button"
  //               className="font-medium text-indigo-600 dark:text-primary-500 "
  //             >
  //               Leave review
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // const renderOrder = () => {
  //   return (
  //     <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0">
  //       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
  //         <div>
  //           <p className="text-lg font-semibold">#WU3746HGG12</p>
  //           <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
  //             <span>Aug 8, 2023</span>
  //             <span className="mx-2">·</span>
  //             <span className="text-primary-500">Delivered</span>
  //           </p>
  //         </div>
  //         <div className="mt-3 sm:mt-0">
  //           <ButtonSecondary
  //             sizeClass="py-2.5 px-4 sm:px-6"
  //             fontSize="text-sm font-medium"
  //           >
  //             View Order
  //           </ButtonSecondary>
  //         </div>
  //       </div>
  //       <div className="border-t border-slate-200 dark:border-slate-700 p-2 sm:p-8 divide-y divide-y-slate-200 dark:divide-slate-700">
  //         {[PRODUCTS[0]].map(renderProductItem)}
  //       </div>
  //     </div>
  //   );
  // };

  return <OrderInfo/>
};

export default AccountOrder;
