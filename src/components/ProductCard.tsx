// "use client";

// import React, { FC, useState } from "react";
// import LikeButton from "./LikeButton";
// import Prices from "./Prices";
// import OldPrice from "./OldPrice";
// import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
// // import { Product, PRODUCTS } from "@/data/data";
// import { StarIcon } from "@heroicons/react/24/solid";
// import ButtonPrimary from "@/shared/Button/ButtonPrimary";
// import ButtonSecondary from "@/shared/Button/ButtonSecondary";
// import BagIcon from "./BagIcon";
// import toast from "react-hot-toast";
// import { Transition } from "@/app/headlessui";
// import ModalQuickView from "./ModalQuickView";
// import ProductStatus from "./ProductStatus";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import NcImage from "@/shared/NcImage/NcImage";
// import { ProductType } from "@/types/ProductTypes";
// import calculateOldPrice from "@/utils/calculateOldPrice";



// export interface ProductCardProps {
//   className?: string;
//   data: ProductType;
//   isLiked?: boolean;
// }


// const ProductCard: FC<ProductCardProps> = ({
//   className = "",
//   data ,
//   isLiked,
// }) => {
//   const {
//     name,
//     price,
//     sizes=[],
//     status="",
//     image,
//     id,
//     reviews,
//     discount,
//     productRole
//   } = data;


//   const [showModalQuickView, setShowModalQuickView] = useState(false);
//   const router = useRouter();

//   const rating = reviews?.reduce((sum,item)=> sum + item.rating ,0);
//   const numberOfReviews = reviews?.length;
//   const inactiveProduct = productRole === "INACTIVE";
 

//   const notifyAddTocart = ({ size }: { size?: string }) => {
//     toast.custom(
//       (t) => (
//         <Transition
//           appear
//           show={t.visible}
//           className="p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200"
//           enter="transition-all duration-150"
//           enterFrom="opacity-0 translate-x-20"
//           enterTo="opacity-100 translate-x-0"
//           leave="transition-all duration-150"
//           leaveFrom="opacity-100 translate-x-0"
//           leaveTo="opacity-0 translate-x-20"
//         >
//           <p className="block text-base font-semibold leading-none">
//             Added to cart!
//           </p>
//           <div className="border-t border-slate-200 dark:border-slate-700 my-4" />
//           {renderProductCartOnNotify({ size })}
//         </Transition>
//       ),
//       {
//         position: "top-right",
//         id: String(id) || "product-detail",
//         duration: 3000,
//       }
//     );
//   };

//   const renderProductCartOnNotify = ({ size }: { size?: string }) => {
//     return (
//       <div className="flex ">
//         <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
//           <Image
//             width={80}
//             height={96}
//             src={image}
//             alt={name}
//             className="absolute object-cover object-center"
//           />
//         </div>

//         <div className="ms-4 flex flex-1 flex-col">
//           <div>
//             <div className="flex justify-between ">
//               <div>
//                 <h3 className="text-base font-medium ">{name}</h3>
//                 <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
           
//                   <span>{size }</span>
//                 </p>
//               </div>
//               <Prices price={price} className="mt-0.5" />
//             </div>
//           </div>
//           <div className="flex flex-1 items-end justify-between text-sm">
//             <p className="text-gray-500 dark:text-slate-400">Qty 1</p>

//             <div className="flex">
//               <button
//                 type="button"
//                 className="font-medium text-primary-6000 dark:text-primary-500 "
//                 onClick={(e) => {
//                   e.preventDefault();
//                   router.push("/cart");
//                 }}
//               >
//                 View cart
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };



//   const renderGroupButtons = () => {
//     return (
//       <div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
//          <ButtonPrimary
//           className="shadow-lg"
//           fontSize="text-xs"
//           sizeClass="py-2 px-4"
//           disabled={inactiveProduct}
//           onClick={() => notifyAddTocart({ size: sizes.length > 0 ? sizes[0] : "" })}
//         >
//           <BagIcon className="w-3.5 h-3.5 mb-0.5" />
//           <span className="ms-1">Add to bag</span>
//         </ButtonPrimary>
       
//         <ButtonSecondary
//           className="ms-1.5 bg-white hover:!bg-gray-100 hover:text-slate-900 transition-colors shadow-lg"
//           fontSize="text-xs"
//           sizeClass="py-2 px-4"
//           onClick={() => setShowModalQuickView(true)}
//         >
//           <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
//           <span className="ms-1">Quick view</span>
//         </ButtonSecondary>
//       </div>
//     );
//   };


//   return (
//     <>
//       <div
//         className={`nc-ProductCard relative flex flex-col bg-transparent ${className}`}
//       >
//         <Link href={`/product-detail/${id}`} className="absolute inset-0"></Link>

//         <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
//           <Link href={`/product-detail/${id}`} className="block">
//             <NcImage
//               containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
//               src={image}
//               className="object-cover w-full h-full drop-shadow-xl"
//               fill
//               sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
//               alt="product"
//             />
//           </Link>
//           <ProductStatus status={inactiveProduct ? "Stock Out" : status } />
//           <LikeButton liked={isLiked} className="absolute top-3 end-3 z-10" />
     
         
//           {renderGroupButtons() }
//         </div>

//         <div className="space-y-3 px-2.5 pt-5 pb-2.5">
   
//           <div>
//             <h2 className="nc-ProductCard__title text-base font-semibold transition-colors">
//               {name}
//             </h2>
           
//             <p className={`text-sm text-red-600  mt-1 h-5 font-semibold`}>
//                {discount && ` %${discount} OFF`}
//             </p>
       
//           </div>
//           <div className="flex items-center">
//             <Prices price={price} />

//             {discount &&  <OldPrice price={calculateOldPrice(price,discount)} />}
            
//             </div>

//           <div className="flex justify-between items-end ">
        
           
//             <div className="flex items-center mb-0.5">
//               <StarIcon className="w-5 h-5 pb-[1px] text-amber-400" />
//               <StarIcon className="w-5 h-5 pb-[1px] text-amber-400" />
//               <StarIcon className="w-5 h-5 pb-[1px] text-amber-400" />
//               <StarIcon className="w-5 h-5 pb-[1px] text-amber-400" />
//               <StarIcon className="w-5 h-5 pb-[1px] text-amber-400" />
        
//               <span className="text-sm ms-1 text-slate-500 dark:text-slate-400">
//                 {rating || ""} ({numberOfReviews || 0} reviews)
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* QUICKVIEW */}
//       <ModalQuickView
//         show={showModalQuickView}
//         onCloseModalQuickView={() => setShowModalQuickView(false)}
//         data={data}
//       />
//     </>
//   );
// };

// export default ProductCard;
