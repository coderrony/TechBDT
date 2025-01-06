// import { productImgs } from "@/contains/fakeData";
// import productVariantImg2 from "@/images/products/v2.jpg";
// import productVariantImg3 from "@/images/products/v3.jpg";
// import productVariantImg4 from "@/images/products/v4.jpg";
// import productVariantImg5 from "@/images/products/v5.jpg";
// import productVariantImg6 from "@/images/products/v6.jpg";
// //
// import productSport1 from "@/images/products/sport-1.png";
// import productSport2 from "@/images/products/sport-2.png";
// import productSport3 from "@/images/products/sport-3.png";
// import productSport4 from "@/images/products/sport-4.png";
// import productSport5 from "@/images/products/sport-5.png";
// import productSport6 from "@/images/products/sport-6.png";
// import productSport7 from "@/images/products/sport-7.png";
// import productSport8 from "@/images/products/sport-8.png";
// import { StaticImageData } from "next/image";
// import { avatarImgs } from "@/contains/fakeData";

// export interface Review{ 
//   message:string,
//   username: string, // USER | null,
//   rating:number,
//   image: StaticImageData | string;
// }

// export interface ReviewType{ 
//   id:string,
//   message:string,
//   username: string | null, // USER | null,
//   rating:number,
//   image?: StaticImageData | string;
// }


// export interface ProductContentType{
//    name:string;
//    content:string;
// }

// export interface Product {
//   id: number;
//   name: string;
//   price: number;
//   image: StaticImageData | string;
//   imageGallery: (StaticImageData | string)[];
//   description: string;
//   category: string;
//   link: "/product-detail/";
//   tags?: string[];
//   reviews?:ReviewType[];

//   variantType?: "color" | "image";
//   sizes?: string[];

//   status?: "New in" | "limited edition" | "Sold Out" | "50% Discount";
//   rating?: string;
//   numberOfReviews?: number;
//   productContent:ProductContentType[];
// }


// export const PRODUCTS: Product[] = [
//   {
//     id: 1,
//     name: "Rey Nylon Backpack 1",
//     description:"no need description",

//     productContent: [
//       {
//         name: "Description",
//         content:`  
//              <div className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl">
//               <p>
//                 The patented eighteen-inch hardwood Arrowhead deck --- finely
//                 mortised in, makes this the strongest and most rigid canoe ever
//                 built. You cannot buy a canoe that will afford greater satisfaction.
//               </p>
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
//       {
//         name: "Fabric + Care",
//         content: `<ul class="list-disc list-inside leading-7">
//         <li>Made from a sheer Belgian power micromesh.</li>
//         <li>
//         74% Polyamide (Nylon) 26% Elastane (Spandex)
//         </li>
//         <li>
//         Adjustable hook & eye closure and straps
//         </li>
//         <li>
//         Hand wash in cold water, dry flat
//         </li>
//       </ul>`,
//       },
    
//       {
//         name: "How it Fits",
//         content:
//           "Use this as a guide. Preference is a huge factor — if you're near the top of a size range and/or prefer more coverage, you may want to size up.",
//       },
//       {
//         name: "FAQ",
//         content: `
//         <ul class="list-disc list-inside leading-7">
//         <li>All full-priced, unworn items, with tags attached and in their original packaging are eligible for return or exchange within 30 days of placing your order.</li>
//         <li>
//         Please note, packs must be returned in full. We do not accept partial returns of packs.
//         </li>
//         <li>
//         Want to know our full returns policies? Here you go.
//         </li>
//         <li>
//         Want more info about shipping, materials or care instructions? Here!
//         </li>
//       </ul>
//         `,
//       },
//     ],
    
//     price: 74000,
//     image: productImgs[16],

//     category: "Category 1",
//     tags: ["tag1", "tag2"],
//     link: "/product-detail/",

//     variantType: "image",
//     sizes: ["XS", "S", "M", "L", "XL"],
  
//     status: "New in",
//     rating: "4.4",
//     numberOfReviews: 98,
//     imageGallery:[productImgs[16],productImgs[1],productImgs[2],productImgs[3],productImgs[4],productImgs[5],productImgs[6]],
//     reviews:[
//       {
//         id:"1",
//         message:"i used that product been long.it's really amazing",
//         username: "pabel",
//         rating:5,
//         image:avatarImgs[0],
//       },
//       {
//         id:"2",
//         message:"awesome product also good quality",
//         username: "ali zee",
//         rating:3,
//         image:avatarImgs[1],
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: 'Round Buckle 1" Belt 2',
//     description: "Classic green",
//     price: 68,
//     image: productImgs[1],
//     imageGallery:[productImgs[3],productImgs[4],productImgs[5]],
//     category: "Category 1",
//     tags: ["tag1", "tag2"],
//     link: "/product-detail/",

//     variantType: "color",
//     status: "50% Discount",
//     rating: "4.9",
//     numberOfReviews: 98,
//     productContent:[
//       {
//         name:"abc",
//         content:"xyz"
//       }
//     ]
//   },
//   {
//     id: 3,
//     name: "Waffle Knit Beanie 3",
//     description: "New blue aqua",
//     price: 132,
//     image: productImgs[15],
//     imageGallery:[productImgs[6],productImgs[7],productImgs[8],productImgs[9],productImgs[10],productImgs[11]],
//     category: "Category 1",
//     tags: ["tag1", "tag2"],
//     link: "/product-detail/",
  
//     variantType: "image",
//     sizes: ["S", "M", "L", "XL"],

//     rating: "4.9",
//     numberOfReviews: 98,
//       productContent:[
//       {
//         name:"abc",
//         content:"xyz"
//       }
//     ]
//   },
//   {
//     id: 4,
//     name: "Travel Pet Carrier 4",
//     description: "Dark pink 2023",
//     price: 28,
//     image: productImgs[3],
//     imageGallery:[productImgs[9],productImgs[10],productImgs[11]],
//     category: "Category 1",
//     tags: ["tag1", "tag2"],

//     variantType: "color",
//     link: "/product-detail/",
//     status: "Sold Out",
//     rating: "4.9",
//     numberOfReviews: 98,
//       productContent:[
//       {
//         name:"abc",
//         content:"xyz"
//       }
//     ]
//   },
//   {
//     id: 5,
//     name: "Leather Gloves 5",
//     description: "Perfect mint green",
//     price: 42,
//     image: productImgs[4],
//     imageGallery:[productImgs[12],productImgs[13],productImgs[14]],
//     category: "Category 1",
//     tags: ["tag1", "tag2"],

//     variantType: "image",
//     sizes: ["XS", "S", "M", "L", "XL"],
  
//     link: "/product-detail/",
//     rating: "4.9",
//     numberOfReviews: 98,
//       productContent:[
//       {
//         name:"abc",
//         content:"xyz"
//       }
//     ]
//   },
//   {
//     id: 6,
//     name: "Hoodie Sweatshirt 6",
//     description: "New design 2023",
//     price: 30,
//     image: productImgs[5],
//     imageGallery:[productImgs[0],productImgs[1],productImgs[2]],
//     category: "Category 1",
//     tags: ["tag1", "tag2"],
//     variantType: "color",

//     link: "/product-detail/",
//     rating: "4.9",
//     numberOfReviews: 98,
//       productContent:[
//       {
//         name:"abc",
//         content:"xyz"
//       }
//     ]
//   },
//   {
//     id: 7,
//     name: "Wool Cashmere Jacket 7",
//     description: "Matte black",
//     price: 12,
//     image: productImgs[8],
//     imageGallery:[productImgs[3],productImgs[4],productImgs[5]],
//     category: "Category 1",
//     tags: ["tag1", "tag2"],
 
//     variantType: "image",
//     link: "/product-detail/",
//     status: "New in",
//     rating: "4.9",
//     numberOfReviews: 98,
//       productContent:[
//       {
//         name:"abc",
//         content:"xyz"
//       }
//     ]
//   },
//   {
//     id: 8,
//     name: "Ella Leather Tote 8",
//     description: "Cream pink",
//     price: 145,
//     image: productImgs[7],
//     imageGallery:[productImgs[6],productImgs[7],productImgs[8]],
//     category: "Category 1",
//     tags: ["tag1", "tag2"],

//     variantType: "image",
//     sizes: ["XS", "S", "M", "L", "XL"],

//     link: "/product-detail/",
//     status: "limited edition",
//     rating: "4.9",
//     numberOfReviews: 98,
//       productContent:[
//       {
//         name:"abc",
//         content:"xyz"
//       }
//     ]
//   },
// ];

// export const SPORT_PRODUCTS: Product[] = [
//   {
//     id: 1,
//     name: "Mastermind Toys s1",
//     description: "Brown cockroach wings",
//     price: 74,
//     image: productSport1,
//     imageGallery:[productImgs[0],productImgs[1],productImgs[2]],
//     category: "Category 1",
//     tags: ["tag1", "tag2"],
//     link: "/product-detail/",

//     variantType: "color",
//     sizes: ["XS", "S", "M", "L", "XL"],

//     status: "New in",
//     rating: "4.9",
//     numberOfReviews: 98,
//       productContent:[
//       {
//         name:"abc",
//         content:"xyz"
//       }
//     ]
//   },
//   {
//     id: 2,
//     name: "Jump Rope Kids s2",
//     description: "Classic green",
//     price: 68,
//     image: productSport2,
//     imageGallery:[productImgs[3],productImgs[4],productImgs[5]],
//     category: "Category 1",
//     tags: ["tag1", "tag2"],
//     link: "/product-detail/",
    
//     variantType: "color",
//     status: "50% Discount",
//     rating: "4.9",
//     numberOfReviews: 98,
//       productContent:[
//       {
//         name:"abc",
//         content:"xyz"
//       }
//     ]
//   },
//   {
//     id: 3,
//     name: "Tee Ball Beanie s3",
//     description: "New blue aqua",
//     price: 132,
//     image: productSport3,
//     imageGallery:[productImgs[6],productImgs[7],productImgs[8]],
//     category: "Category 1",
//     tags: ["tag1", "tag2"],
//     link: "/product-detail/",

//     variantType: "image",
//     sizes: ["S", "M", "L", "XL"],

//     rating: "4.9",
//     numberOfReviews: 98,
//       productContent:[
//       {
//         name:"abc",
//         content:"xyz"
//       }
//     ]
//   },
//   {
//     id: 4,
//     name: "Rubber Table Tennis s4",
//     description: "Dark pink 2023",
//     price: 28,
//     image: productSport4,
//     imageGallery:[productImgs[9],productImgs[10],productImgs[11]],
//     category: "Category 1",
//     tags: ["tag1", "tag2"],
   
//     variantType: "color",
//     link: "/product-detail/",
//     status: "Sold Out",
//     rating: "4.9",
//     numberOfReviews: 98,
//       productContent:[
//       {
//         name:"abc",
//         content:"xyz"
//       }
//     ]
//   },
//   {
//     id: 5,
//     name: "Classic Blue Rugby s5",
//     description: "Perfect mint green",
//     price: 42,
//     image: productSport5,
//     imageGallery:[productImgs[12],productImgs[13],productImgs[14]],
//     category: "Category 1",
//     tags: ["tag1", "tag2"],
   
//     variantType: "image",
//     sizes: ["XS", "S", "M", "L", "XL"],
 
//     link: "/product-detail/",
//     rating: "4.9",
//     numberOfReviews: 98,
//       productContent:[
//       {
//         name:"abc",
//         content:"xyz"
//       }
//     ]
//   },
//   {
//     id: 6,
//     name: "Manhattan Toy WRT s6",
//     description: "New design 2023",
//     price: 30,
//     image: productSport6,
//     imageGallery:[productImgs[0],productImgs[1],productImgs[2]],
//     category: "Category 1",
//     tags: ["tag1", "tag2"],
//     variantType: "color",
 
//     link: "/product-detail/",
//     rating: "4.9",
//     numberOfReviews: 98,
//       productContent:[
//       {
//         name:"abc",
//         content:"xyz"
//       }
//     ]
//   },
//   {
//     id: 7,
//     name: "Tabletop Football s7",
//     description: "Matte black",
//     price: 12,
//     image: productSport7,
//     imageGallery:[productImgs[3],productImgs[4],productImgs[5]],
//     category: "Category 1",
//     tags: ["tag1", "tag2"],

//     variantType: "image",
//     link: "/product-detail/",
//     status: "New in",
//     rating: "4.9",
//     numberOfReviews: 98,
//       productContent:[
//       {
//         name:"abc",
//         content:"xyz"
//       }
//     ]
//   },
//   {
//     id: 8,
//     name: "Pvc Catching Toy s8",
//     description: "Cream pink",
//     price: 145,
//     image: productSport8,
//     imageGallery:[productImgs[6],productImgs[7],productImgs[8]],
//     category: "Category 1",
//     tags: ["tag1", "tag2"],

//     variantType: "color",
//     sizes: ["XS", "S", "M", "L", "XL"],

//     link: "/product-detail/",
//     status: "limited edition",
//     rating: "4.9",
//     numberOfReviews: 98,
//       productContent:[
//       {
//         name:"abc",
//         content:"xyz"
//       }
//     ]
//   },
// ];
