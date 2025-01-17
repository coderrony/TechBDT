import Image, { StaticImageData } from "next/image";
import { Route } from "@/routers/types";
import imageRightPng from "@/images/hero-right.png";
import imageRightPng2 from "@/images/hero-right-2.png";
import imageRightPng3 from "@/images/hero-right-3.png";

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
