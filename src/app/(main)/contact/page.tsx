import React, { FC } from "react";
import SocialsList from "@/shared/SocialsList/SocialsList";

import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionPromo1 from "@/components/SectionPromo1";

import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Contact Us | 01814010159 Support 24/7",
  description:
    "Get in touch with us for any queries related to your orders, delivery, payments, or our services. Our support team is available 24/7 to assist you.",
  robots: {
    index: true,   // Allow search engine indexing
    follow: true,  // Allow following links
  },
  keywords: [
    "Contact",
    "E-commerce Support",
    "Order Assistance",
    "Delivery Information",
    "Payment Issues",
    "Customer Care",
    "Bangla E-commerce",
  ],
  authors: [{ name: "TechBDT", url: "https://techbdt.com" }],
};



const info = [
  {
    title: "🗺 ঠিকানা",
    desc: "২য় তলা, ফর্চুন দীপুমনি শপিং কমপ্লেক্স, আনোয়ারা, চট্টগ্রাম, চট্টগ্রাম।",
  },
  {
    title: "💌 ইমেইল",
    desc: "support@techbdt.com",
  },
  {
    title: "☎ মোবাইল",
    desc: "01814010159",
  },
];

const PageContact = ({}) => {
  return (
    <div className={`nc-PageContact overflow-hidden`}>
      <div className="">
        <h2 className="my-20 flex items-center text-xl leading-[115%] md:text-3xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Contact Us
        </h2>
        <div className="container max-w-7xl mx-auto">
          <div className=" grid grid-cols-1 ">
            <div className=" space-y-8">
              {info.map((item, index) => (
                <div key={index}>
                  <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                    {item.title}
                  </h3>
                  <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                    {item.desc}
                  </span>
                </div>
              ))}
              <div>
                <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                  🌏 SOCIALS
                </h3>
                <SocialsList className="mt-2" />
              </div>
            </div>
          
          </div>
        </div>
      </div>

      {/* OTHER SECTIONS */}
      <div className="container">
        <div className="relative my-24 lg:my-32 py-24 lg:py-32">
          <BackgroundSection />
          <SectionPromo1 />
        </div>
      </div>
    </div>
  );
};

export default PageContact;
