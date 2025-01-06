import { CategoryAndSubType } from "@/types/CategoryType";
// import ncNanoId from "@/utils/ncNanoId";

export const default_category = 'https://res.cloudinary.com/dgobtxhjp/image/upload/v1734691085/sub_categories_dhwejf.png'

export const default_avatar = 'https://res.cloudinary.com/dgobtxhjp/image/upload/v1735274271/user_wske5x.png'

export const notify_duration = 2000;

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
