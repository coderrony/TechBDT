import React, { FC } from "react";
import SocialsList from "@/shared/SocialsList/SocialsList";

const info = [
  {
    title: "গোপনীয়তা নীতি",
    desc: "TechBDT.com আপনার ব্যক্তিগত তথ্যের গোপনীয়তা রক্ষা করতে প্রতিশ্রুতিবদ্ধ। আমরা আপনার দেওয়া তথ্য কীভাবে সংগ্রহ, ব্যবহার এবং সংরক্ষণ করি তা জানাতে এই নীতি প্রণয়ন করা হয়েছে।",
  },
  {
    title: "তথ্য সংগ্রহ ও ব্যবহার",
    desc: "আমরা আপনার নাম, মোবাইল নম্বর, ইমেইল ঠিকানা, এবং ডেলিভারির জন্য ঠিকানা সংগ্রহ করি। এই তথ্য শুধুমাত্র অর্ডার প্রক্রিয়া, পেমেন্ট যাচাই এবং উন্নত সেবা প্রদানের জন্য ব্যবহৃত হয়। আমাদের ওয়েবসাইটে Cookies ব্যবহার করা হয়, যা আপনার ব্রাউজিং অভিজ্ঞতা উন্নত করতে সাহায্য করে। আপনি চাইলে Cookies বন্ধ করতে পারেন, তবে এতে কিছু ফিচার কাজ নাও করতে পারে।",
  },
  {
    title: "তথ্য সুরক্ষা",
    desc: "আমরা আপনার ব্যক্তিগত তথ্যের নিরাপত্তা নিশ্চিত করতে আধুনিক প্রযুক্তি ব্যবহার করি। তবে, ইন্টারনেটে সম্পূর্ণ নিরাপত্তা নিশ্চিত করা সম্ভব নয়, তাই অনুগ্রহ করে কোনো সংবেদনশীল তথ্য শেয়ার করার ক্ষেত্রে সতর্ক থাকুন।",
  },
  {
    title: "বিজ্ঞাপন ও মার্কেটিং",
    desc: "আমরা আপনার পূর্ব সম্মতি ছাড়া কোনো প্রকার অনাকাঙ্ক্ষিত বিজ্ঞাপন বা প্রচারমূলক বার্তা পাঠাব না। আপনি চাইলে আমাদের নিউজলেটার বা বিজ্ঞাপন বন্ধ করতে পারেন।",
  },
  {
    title: "আপনার সম্মতি",
    desc: "আমাদের ওয়েবসাইট ব্যবহারের মাধ্যমে, আপনি এই গোপনীয়তা নীতি মেনে নিচ্ছেন। নীতিতে কোনো পরিবর্তন হলে তা আমাদের ওয়েবসাইটে প্রকাশ করা হবে।",
  },
  
];

const PrivacyPolicyPage = ({}) => {
  return (
    <div className={`nc-PageContact overflow-hidden`}>
      <div className="mb-10">
        <h2 className="my-12 flex items-center text-xl leading-[115%] md:text-3xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
         Privacy Policy
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
                  🌏 যোগাযোগ
                </h3>
                <SocialsList className="mt-2" />
              </div>
            </div>
          
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default PrivacyPolicyPage;
