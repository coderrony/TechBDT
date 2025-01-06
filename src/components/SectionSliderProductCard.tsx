// "use client";

// import React, { FC, useEffect, useRef, useState } from "react";
// import Heading from "@/components/Heading/Heading";
// // @ts-ignore
// import Glide from "@glidejs/glide/dist/glide.esm";
// import ProductCard from "./ProductCard";
// import { ProductType } from "@/types/ProductTypes";

// // import { Product } from "@/data/data";


// export interface SectionSliderProductCardProps {
//   className?: string;
//   itemClassName?: string;
//   heading?: string;
//   headingFontClassName?: string;
//   headingClassName?: string;
//   subHeading?: string;
//   data: ProductType[] ;
// }

// const SectionSliderProductCard: FC<SectionSliderProductCardProps> = ({
//   className = "",
//   itemClassName = "",
//   headingFontClassName,
//   headingClassName,
//   heading,
//   subHeading = "REY backpacks & bags",
//   data ,
// }) => {
//   const sliderRef = useRef(null);
//   const [isShow, setIsShow] = useState(false);

 
//   useEffect(() => {
//     const OPTIONS: Partial<Glide.Options> = {
//       perView: 5,
//       gap: 30,
//       bound: true,
//       autoplay: 3000, // Autoplay every 3 seconds
//       hoverpause: true, // Pause when hovered
//       breakpoints: {
//         1280: {
//           perView: 4, 
//         },
//         1024: {
//           gap: 20,
//           perView: 4,
//         },
//         768: {
//           gap: 20,
//           perView: 3,
//         },
//         640: {
//           gap: 20,
//           perView: 1.5,
//         },
//         500: {
//           gap: 20,
//           perView: 1.3,
//         },
//       },
//     };
  
//     if (!sliderRef.current) return;
  
//     // Check if the sliderRef.current is a valid DOM node
//     const sliderElement = sliderRef.current;
//     if (!sliderElement) return;
  
//     let slider = new Glide(sliderElement, OPTIONS);
    
//     // Try-catch block to handle unexpected errors gracefully
//     try {
//       slider.mount();  // Mount the Glide slider
//       setIsShow(true); // Set the slider as visible
//     } catch (error) {
//       console.error("Error mounting the Glide slider:", error);
//     }
  
//     return () => {
//       if (slider) {
//         slider.destroy();  // Cleanup on unmount
//       }
//     };
//   }, [sliderRef]);
  
//   return (
//     <div className={`nc-SectionSliderProductCard ${className}`}>

//       <div ref={sliderRef} className={`flow-root ${isShow ? "" : "invisible"}`}>
//         <Heading
//           className={headingClassName}
//           fontClass={headingFontClassName}
//           rightDescText={subHeading}
//           hasNextPrev
//         >
//           {heading || `New Arrivals`}
//         </Heading>
//         <div className="glide__track" data-glide-el="track">
//           <ul className="glide__slides">
//             {data.map((item, index) => (
//               <li key={index} className={`glide__slide ${itemClassName}`}>
//                 <ProductCard data={item} />
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SectionSliderProductCard;
