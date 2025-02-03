import { CategoryAndSubType } from "@/types/CategoryType";
// import ncNanoId from "@/utils/ncNanoId";

export const default_category = 'https://res.cloudinary.com/dgobtxhjp/image/upload/v1734691085/sub_categories_dhwejf.png'

export const default_avatar = 'https://res.cloudinary.com/dgobtxhjp/image/upload/v1735274271/user_wske5x.png'

export const notify_duration = 2000;

export const default_range_prices = [100, 30000]
export const default_category_colors = [
  { name: 'Black' },
  { name: 'White' },
  { name: 'Blue' },
  { name: 'Red' },
  { name: 'Orange' },
  { name: 'Pink' },
  { name: 'Gold' },
  { name: 'Purple' },
  { name: 'Green' },
  { name: 'Navy' },
  { name: 'Shakura' },
];
export const  default_category_sizes = [
  { name: 'XXS' },
  { name: 'XS' },
  { name: 'S' },
  { name: 'M' },
  { name: 'L' },
  { name: 'XL' },
  { name: '2XL' },
];


// navbar items
export const NAVIGATION_DATA: CategoryAndSubType[] = [
  {
    id: "1",
    href: "/",
    name: "Home",
    image_url:default_category,
    sub_categories:[],
  },
  {
    id: "2",
    href: "/search",
    name: "Shops",
    image_url:default_category,
    sub_categories:[],
  },
  
 

];
