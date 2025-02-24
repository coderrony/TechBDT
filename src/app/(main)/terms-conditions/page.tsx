import React, { FC } from 'react';
import SocialsList from '@/shared/SocialsList/SocialsList';
import { Metadata } from "next";
const info = [
  {
    title: 'শর্তাবলীর পরিবর্তন',
    desc: 'আমাদের শর্তাবলী ও গোপনীয়তা নীতি যেকোনো সময় পরিবর্তন হতে পারে।অনুগ্রহ করে নীতিমালা সময়ে সময়ে পর্যালোচনা করুন যাতে আপনি যেকোনো পরিবর্তনের বিষয়ে অবগত থাকেন।',
  },
  {
    title: 'সাইট ব্যবহারের সম্মতি',
    desc: 'আমাদের ওয়েবসাইট ব্যবহার করলে, আপনি এই শর্তাবলীর সাথে সম্মত হচ্ছেন। যদি আপনি সম্মত না হন, তবে অনুগ্রহ করে সাইট ব্যবহার থেকে বিরত থাকুন।',
  },
  {
    title: 'কুকিজ নীতি',
    desc: 'আমাদের ওয়েবসাইট ব্যবহার করলে, আপনার ব্রাউজারে কুকিজ সংরক্ষিত হতে পারে যা আপনার অভিজ্ঞতা উন্নত করতে সহায়তা করবে। আপনি চাইলে কুকিজ বন্ধ করতে পারেন, তবে এতে কিছু ফিচার কাজ নাও করতে পারে।',
  },
  {
    title: 'পণ্য ডেলিভারি',
    desc: 'পণ্য শুধুমাত্র ক্রেতার ঠিকানার নিচতলায় সরবরাহ করা হবে এবং সড়কের অবস্থার ওপর নির্ভর করবে।পণ্য হাতে পাওয়ার পর আনবক্সিং করার সময় অবশ্যই ফুল আনবক্সিং ভিডিও করতে হবে। এটি রিটার্ন বা রিফান্ডের ক্ষেত্রে প্রমাণ হিসেবে প্রয়োজন হতে পারে।',
  },
  {
    title: 'পেমেন্ট প্রক্রিয়া',
    desc: 'ফেক অর্ডার প্রতিরোধে COD (Cash on Delivery)  ক্ষেত্রে ২০০ হতে ৫০০ টাকা অগ্রিম প্রদান করতে হবে।  ইচ্ছাকৃতভাবে  ডেলিভারি  গ্রহণ না করা হয় এবং প্রোডাক্ট রিটার্ন হয়ে আসে, সেক্ষেত্রে প্রতিটি পার্সেলের জন্য রিটার্ন চার্জ + প্যাকেজিং + প্রিন্টিং + ম্যান পাওয়ার + অন্যান্য বাবদ ৮০ টাকা + এক্সট্রা কুরিয়ার ফি + প্রোডাক্ট ড্যামেজ হলে ২০০ টাকা পর্যন্ত কাটা হবে।  তবে যদি প্রোডাক্ট ভুল বা ফল্টি হয়ে থাকে সেক্ষেত্রে কোন রিটার্ন চার্জ লাগবে না আমরা নিজেরাই সেই খরচ বহন করবো।',
  },
  {
    title: 'ডেলিভারি প্রক্রিয়া এবং ডেলিভারি চার্জ',
    desc: 'ঢাকার ভিতরে এবং বাইরে প্রতিটি পার্সেল অর্ডার সাবমিট করার ৭২ ঘণ্টার মধ্যে কুরিয়ারে হ্যান্ডওভার করা হয় (সাধারণত দুপুর ৩টার আগে সাবমিট করা অর্ডারগুলো প্রতিদিন কুরিয়ারে হ্যান্ডওভার করা হয়)।ডেলিভারি চার্জ ঢাকা সিটি কর্পোরেশনের ভিতরে: ৬০ টাকা এবং সারা বাংলাদেশ: ১২০ টাকা',
  },
  {
    title: 'রিটার্ন এন্ড রিফান্ড',
    desc: `আমাদের রিটার্ন এবং রিফান্ড পলিসি খুবই সিম্পল এবং আমরা চেষ্টা করে থাকি কোন প্রোডাক্ট বা ডেলিভারি নিয়ে ইস্যু হলে তা সহজে এবং দ্রুততম সময়ের মধ্যে শলভ করার। এর জন্য কিছু নিয়ম অবশ্যই আপনাকে মনে রাখতে হবে:
 <br/>  <br/>
    <ul>
        <li>  <span class='font-bold   dark:text-neutral-200 tracking-wider'>সময়:</span>  প্রোডাক্ট রিটার্ন করতে হলে অবশ্যই প্রোডাক্ট রিসিভ করার ৩ দিনের মধ্যে এবং ইনভয়েস ডেট থেকে ৭ দিনের মধ্যে আমাদের জানাতে হবে। নির্ধারিত সময়ের পরে রিটার্ন বা এক্সচেঞ্জ করা সম্ভব হবে না। তবে, প্রোডাক্টের যদি দীর্ঘমেয়াদি ওয়ারেন্টি থাকে, সেক্ষেত্রে আপনি আফটার-সেলস সুবিধা পাবেন।</li>
        <br/>

        <li> <span class='font-bold   dark:text-neutral-200 tracking-wider'>রিটার্ন আইটেমের কন্ডিশন:</span>  কোনো প্রোডাক্ট রিটার্ন করতে হলে তা অবশ্যই অরিজিনাল কন্ডিশনে ও সম্পূর্ণ অক্ষত থাকতে হবে। প্রোডাক্টের সাথে যা যা ডেলিভারি করা হয়েছিল, সবকিছু অক্ষত অবস্থায় রিটার্ন করতে হবে।
       রিটার্ন করার সময় সঠিকভাবে প্যাকেজিং করতে হবে যাতে পার্সেল নিরাপদে আমাদের কাছে পৌঁছে। প্যাকেজিংয়ের ত্রুটির কারণে প্রোডাক্ট ক্ষতিগ্রস্ত হলে রিটার্ন গ্রহণযোগ্য হবে না।
       </li>
 <br/>
        <li>
        <span class='font-bold   dark:text-neutral-200 tracking-wider'>রিটার্নের কারণ:</span> 
        
প্রোডাক্ট রিটার্ন করার আগে অবশ্যই আমাদের জানাতে হবে কেন তারা রিটার্ন করতে চান। নিচের ক্ষেত্রে ফ্রি রিটার্ন প্রযোজ্য হবে:
   <ul>
      <li>1. ভুল প্রোডাক্ট ডেলিভারি</li>
      <li>2. ভিন্ন রঙ বা ভিন্ন সাইজ ডেলিভারি</li>
     </ul>
তবে, যদি ব্যক্তিগত কারণে (যেমন: মাইন্ড চেঞ্জ) রিটার্ন করতে চান, সেক্ষেত্রে ডেলিভারি চার্জ, প্যাকেজিং, লজিস্টিক্স এবং ড্যামেজ রিস্ক বাবদ প্রতি পার্সেলের জন্য ২০০ টাকা রিটার্ন ফি প্রযোজ্য হবে।
       </li>
 <br/>
             <li>
               <span class='font-bold   dark:text-neutral-200 tracking-wider'>রিফান্ড:</span> 
প্রোডাক্ট রিটার্ন আসার পর আমাদের টিম তা চেক করবে। যদি পণ্য অরিজিনাল ও সেলেবল কন্ডিশনে থাকে, তাহলে রিটার্ন রিসিভ করার ৭২ ঘণ্টার মধ্যে রিফান্ড প্রক্রিয়া সম্পন্ন করা হবে। রিফান্ড সেই মাধ্যমেই প্রদান করা হবে, যেটি ব্যবহার করে কাস্টমার পেমেন্ট করেছিলেন।
       </li>

      </ul>  `,
  },
];


export const metadata: Metadata = {
  title: "Terms & Conditions - Hassle-Free Shopping Experience",
  description:
    "Read TechBDT's Terms and Conditions to understand our policies on delivery, payment processes, product returns, and refunds. Our goal is to provide a secure and transparent shopping experience for all customers.",
  robots: {
    index: true,   // Allow search engines to index this page
    follow: true,  // Allow search engines to follow links
  },
  keywords: [
    "Terms and Conditions",
    "TechBDT",
    "E-commerce Policies",
    "Product Delivery",
    "Payment Process",
    "Return and Refund Policy",
    "Secure Shopping",
    "E-commerce Terms",
    "Online Shopping Rules",
  ],
  authors: [{ name: "TechBDT", url: "https://techbdt.com" }],
  openGraph: {
    title: "Terms & Conditions - TechBDT | Hassle-Free Shopping Experience",
    description:
      "Explore the detailed Terms and Conditions for TechBDT.com. Learn about delivery, payment policies, and our approach to customer service and returns.",
    url: "https://techbdt.com/terms-conditions",
    siteName: "TechBDT",
    images: [
      {
        url: "https://techbdt.com/og-image-terms-conditions.jpg",
        width: 800,
        height: 600,
        alt: "TechBDT Terms & Conditions - E-commerce Policies",
      },
    ],
    locale: "en_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | TechBDT - Hassle-Free Shopping Experience",
    description:
      "Check out TechBDT's Terms and Conditions page for comprehensive details on our policies regarding product delivery, returns, refunds, and payments.",
    images: ["https://techbdt.com/twitter-image-terms-conditions.jpg"],
  },
};

const TermsConditionsPage = ({}) => {
  return (
    <div className={`nc-PageContact overflow-hidden`}>
     
      <div className='mb-10'>
        <h2 className='my-12 flex items-center text-xl leading-[115%] md:text-3xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
          Terms & Conditions
        </h2>
        <div className='container max-w-7xl mx-auto'>
          <div className=' grid grid-cols-1 '>
            <div className=' space-y-8'>
              {info.map((item, index) => (
                <div key={index}>
                  <h3 className='uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider'>
                    {item.title}
                  </h3>
                  <span
                    className='block mt-2 text-neutral-500 dark:text-neutral-400'
                    dangerouslySetInnerHTML={{
                      __html: item.desc,
                    }}>
                    {/* {item.desc} */}
                  </span>
                </div>
              ))}
              <div>
                <h3 className='uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider'>
                  🌏 যোগাযোগ
                </h3>
                <SocialsList className='mt-2' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditionsPage;
