import React from "react";
import SearchContent from "./_components/SearchContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Search Products - Find Your Desired Items",
    description:
      "Looking for the best products? Use TechBDT's advanced search to find your desired items quickly and easily. Discover top deals and trending products today!",
    robots: {
      index: true,  // Allow indexing for better SEO
      follow: true, // Allow search engines to follow links
    },
    keywords: [
      "Product Search",
      "E-commerce Search",
      "TechBDT Search",
      "Find Best Deals",
      "Online Shopping Bangladesh",
      "E-commerce Bangladesh",
      "Trending Products",
      "Discounted Items",
    ],
    authors: [{ name: "TechBDT", url: "https://techbdt.com" }],
    openGraph: {
      title: "Search Products - TechBDT | Find Your Desired Items",
      description:
        "Search for the best products on TechBDT. Get personalized search results and discover trending products with our hassle-free shopping experience.",
      url: "https://techbdt.com/search",
      siteName: "TechBDT",
      images: [
        {
          url: "https://techbdt.com/og-image-search.jpg",
          width: 800,
          height: 600,
          alt: "TechBDT Product Search Page",
        },
      ],
      locale: "en_BD",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Search Products | TechBDT - Find Your Desired Items",
      description:
        "Find exactly what you're looking for with TechBDT's advanced product search. Discover top-rated products and great deals today!",
      images: ["https://techbdt.com/twitter-image-search.jpg"],
    },
  };
  


const PageSearch =async () => {
 
    return <SearchContent/>
};

export default PageSearch;
