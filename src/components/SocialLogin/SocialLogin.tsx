"use client"
import { FC } from 'react';
import facebookSvg from '@/images/Facebook.svg';

import googleSvg from '@/images/Google.svg';
import Image from 'next/image';


import { signIn ,signOut} from "next-auth/react"


interface SocialLoginProps {
  className?: string;
}


const loginSocials = [
  {
    name: 'Continue with Facebook',
    value: 'facebook' as const,  // 'facebook' is now a constant literal type
    icon: facebookSvg,
  },
  {
    name: 'Continue with Google',
    value: 'google' as const,  // 'google' is now a constant literal type
    icon: googleSvg,
  },
];

const SocialLogin: FC<SocialLoginProps> = () => {

  
  const handleSocialAuth = async (provider: 'google' | 'facebook') => {
   
    signIn(provider as string,{ redirectTo: "/"})
 
  };

  return (
    <>
      <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSocialAuth(item.value as 'google' | 'facebook')}
                className=" flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <Image
                  sizes="40px"
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </button>
            ))}
  
          </div>
          <button  onClick={() =>
                signOut({ callbackUrl: process.env.NEXT_PUBLIC_SITE_URL })
              }>Logout</button>
    </>
  );
};

export default SocialLogin;
