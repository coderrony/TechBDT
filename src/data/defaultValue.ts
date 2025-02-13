import { CategoryAndSubType } from "@/types/CategoryType";
import  { StaticImageData } from "next/image";
import { Route } from "@/routers/types";
import imageRightPng from "@/images/hero-right.png";
import imageRightPng2 from "@/images/hero-right-2.png";
import imageRightPng3 from "@/images/hero-right-3.png";
import facebook from "@/images/socials/facebook.svg";
import whatsapp from "@/images/socials/whatsapp.svg";

// import ncNanoId from "@/utils/ncNanoId";



export interface CustomLink {
  label: string;
  href: Route;
  targetBlank?: boolean;
}
export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}



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


export const socials = [
  { name: "Facebook", icon: facebook, href: "https://www.facebook.com/techbdtcom/" },
  { name: "WhatsApp", icon: whatsapp, href: "https://wa.me/8801814010159" },

];
// 
export const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "5",
    title: "Getting started",
    menus: [
      { href: "/signup", label: "Sing up" },
      { href: "/login", label: "Sign in" },
      { href: "/account", label: "My Account" },
      { href: "/account-order", label: "My Orders" },
    ],
  },
  {
    id: "1",
    title: "Company",
    menus: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact Us" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-conditions", label: "Terms & Conditions" },
    ],
  },
  {
    id: "2",
    title: "Customer Service",
    menus: [
      { href: "/return-refund", label: "Cancellation || Return & Refund" },
      { href: "/", label: "API Reference" },
    ],
  },

];

export const default_status = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED']

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


// slider data
interface Hero2DataType {
  image: StaticImageData | string;
  heading: string;
  subHeading: string;
  btnText: string;
  btnLink: Route;
}


export const HERO2_DEMO_DATA: Hero2DataType[] = [
  {
    image: imageRightPng2,
    heading: "Discover Your Style",
    subHeading: "Explore our exclusive collection made for everyone! 🌟",
    btnText: "Start Shopping",
    btnLink: "/search",
  },
  {
    image: imageRightPng3,
    heading: "Winter Sale: Flat 50% Off",
    subHeading: "Upgrade your wardrobe with cozy essentials this winter. ❄️",
    btnText: "Shop the Deals",
    btnLink: "/search",
  },
  {
    image: imageRightPng,
    heading: "Fresh Arrivals, Just for You",
    subHeading: "Stay ahead in fashion with our latest arrivals. ✨",
    btnText: "Browse Now",
    btnLink: "/search",
  },
];
