
import React, { FC } from "react";
import BgGlassmorphism from "@/components/BgGlassmorphism/BgGlassmorphism";
import SectionPromo3 from "@/components/SectionPromo3";
const PageAbout = ({}) => {
  return (
    <div className={`nc-PageAbout overflow-hidden relative`}>
      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
    

        <h2 className="border-b text-3xl font-bold text-neutral-900 dark:text-neutral-50 ml-4 sm:ml-5 mx-10 mb-10 p-3">About Us</h2>

        TechBDT.com হলো একটি প্রযুক্তি ও ফ্যাশন-ভিত্তিক ই-কমার্স প্ল্যাটফর্ম, যা আপনাকে অনলাইন কেনাকাটার এক নতুন অভিজ্ঞতা প্রদান করে। আমরা বিশ্বস্ত ও মানসম্মত প্রযুক্তি পণ্য, ইলেকট্রনিক্স এবং ফ্যাশন সামগ্রী নিয়ে এসেছি সাশ্রয়ী মূল্যে, যাতে আপনি ঘরে বসেই সহজে পছন্দের পণ্যটি কিনতে পারেন।

        আমরা সর্বোচ্চ মানের পণ্য ও গ্রাহক সেবা নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ। TechBDT.com এর মাধ্যমে আপনি দ্রুত ডেলিভারি, নিরাপদ পেমেন্ট গেটওয়ে এবং নির্ভরযোগ্য কাস্টমার সাপোর্ট উপভোগ করতে পারবেন। আমাদের লক্ষ্য হলো ই-কমার্সকে আরও সহজ ও সুবিধাজনক করে তোলা, যাতে ব্যস্ত জীবনের মাঝেও আপনি নিশ্চিন্তে কেনাকাটা করতে পারেন।

        বর্তমানে, আমরা বাংলাদেশের প্রতিটি অঞ্চলে পণ্য সরবরাহ করছি এবং দেশের বাইরে থেকেও কেউ সহজেই আমাদের প্ল্যাটফর্ম ব্যবহার করে বাংলাদেশের যেকোনো ঠিকানায় পণ্য পাঠাতে পারবেন।

        TechBDT.com-এ আপনি পাবেন সর্বশেষ প্রযুক্তির গ্যাজেট, ট্রেন্ডি ফ্যাশন সামগ্রী এবং নিত্যপ্রয়োজনীয় ইলেকট্রনিক্স, সবকিছুই এক জায়গায়। আমাদের সাথে থাকুন এবং উপভোগ করুন নির্ভরযোগ্য, দ্রুত ও আনন্দময় অনলাইন শপিং অভিজ্ঞতা!

        {/* <SectionStatistic /> */}

        <SectionPromo3 />
      </div>
    </div>
  );
};

export default PageAbout;
