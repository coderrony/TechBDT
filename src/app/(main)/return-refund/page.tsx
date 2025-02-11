import React from 'react';
import SocialsList from '@/shared/SocialsList/SocialsList';

const info = [



  {
    title: 'অর্ডার বাতিলকরণ',
    desc: `
    <ul>
        <li>1. পণ্য শিপিংয়ের আগে অর্ডার বাতিল করা যাবে। </li>
        <li>2. পণ্য শিপিংয়ের পর বাতিল করা যাবে না। </li>
      </ul>  `,
  },
  {
    title: ' রিটার্ন নীতি',
    desc: `
    <ul>
        <li>1. ভুল, ত্রুটিপূর্ণ বা ক্ষতিগ্রস্ত পণ্য পেলে ডেলিভারির ২৪ ঘণ্টার মধ্যে আমাদের জানান।</li>
        <li>2. রিটার্নের জন্য পণ্য অবশ্যই অরিজিনাল অবস্থায় এবং সম্পূর্ণ প্যাকেজিং সহ থাকতে হবে।</li>
        <li>3. যদি ব্যক্তিগত কারণে (যেমন: মাইন্ড চেঞ্জ) রিটার্ন করতে চান, সেক্ষেত্রে ডেলিভারি চার্জ, প্যাকেজিং, লজিস্টিক্স এবং ড্যামেজ রিস্ক বাবদ প্রতি পার্সেলের জন্য ২০০ টাকা রিটার্ন ফি প্রযোজ্য হবে।</li>
        <li>4. ফুল আনবক্সিং ভিডিও ছাড়া রিটার্ন গ্রহণযোগ্য হবে না।</li>
      </ul>  `,
  },
  {
    title: 'রিফান্ড নীতি',
    desc: `
    <ul>
        <li>1. রিটার্নকৃত পণ্য চেক করার পর ৭২ ঘণ্টার মধ্যে রিফান্ড প্রক্রিয়া শুরু হবে।</li>
        <li>2. রিফান্ড একই পেমেন্ট মাধ্যমে প্রদান করা হবে।</li>
     
      </ul>  `,
  },
];

const ReturnRefundPage = ({}) => {
  return (
    <div className={`nc-PageContact overflow-hidden`}>
     
      <div className='mb-10'>
        <h2 className='my-12 flex items-center text-xl leading-[115%] md:text-3xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
        Cancellation || Return & Refund
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

export default ReturnRefundPage;
