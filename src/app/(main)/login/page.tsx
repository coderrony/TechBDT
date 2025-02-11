'use client';
import React, { FC } from 'react';
import facebookSvg from '@/images/Facebook.svg';
import googleSvg from '@/images/Google.svg';
import Input from '@/shared/Input/Input';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import Image from 'next/image';
import Link from 'next/link';
import SocialLogin from '@/components/SocialLogin/SocialLogin';
import { useForm } from 'react-hook-form';
import PasswordInput from '@/components/PasswordInput/PasswordInput';

import { signIn } from "next-auth/react";
import NotifyToaster from '@/components/NotifyToaster';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const PageLogin = () => {
  const {
    register,
    handleSubmit,
    // watch,
    // setError,
    formState: { errors },
  } = useForm();
  const route = useRouter()

  const handleLogin = async (data: any) => {
    // console.log("data ",data)
    try {

      const res = await signIn("credentials", {
        ...data,
        isLogin: true,
        redirect: false,
      });
      // console.log("res ",res);
      
     // Check if login was successful
     if (res && res.error) {
      notifyToast(true, 'Authentication Error', 'Incorrect Credentials');
    } else if (res && res.ok) {
      notifyToast(false, 'Success', 'You are logged in!');
      // Redirect user or perform further actions
      route.push("/")
    }
    } catch (error : any) {
      notifyToast(true, 'Authentication Error', error.message);
      console.error('Error during login:', error);
    }
  };
  const notifyToast = (isError: boolean, title: string, message: string) => {
    toast.custom(
      t => (
        <NotifyToaster
          show={t.visible}
          isError={isError}
          title={title}
          message={message}
        />
      ),
      { position: 'top-right', id: 'nc-product-notify', duration: 3000 },
    );
  };
  return (
    <div className={`nc-PageLogin`} data-nc-id='PageLogin'>
      <div className='container mb-24 lg:mb-32'>
        <h2 className='my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
          Login
        </h2>
        <div className='max-w-md mx-auto space-y-6'>
          <SocialLogin />
          {/* OR */}
          <div className='relative text-center'>
            <span className='relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900'>
              OR
            </span>
            <div className='absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800'></div>
          </div>
          {/* FORM */}
          <form
            className='grid grid-cols-1 gap-4'
            onSubmit={handleSubmit(handleLogin)}>
            <div className='h-20'>
              <span>Phone Number</span>
              <Input
                type='number'
                placeholder='Your phone number'
                {...register('phone', {
                  required: 'Phone Field is Required!',
                  minLength: {
                    value: 11,
                    message: 'Phone number must be 11 digits',
                  },
                  pattern: {
                    value: /^01[3-9]\d{8}$/,
                    message: 'Invalid phone number! It must start with 01',
                  },
                })}
                name='phone'
              />

              {errors.phone && typeof errors.phone.message === 'string' && (
                <p className='text-red-600 text-xs ml-2'>
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className='h-20 relative'>
              <PasswordInput
                register={register}
                name={'password'}
                inputLabel={'Password'}
              />

              {errors.password &&
                typeof errors.password.message === 'string' && (
                  <p className='text-red-600 text-xs ml-2'>
                    {errors.password.message}
                  </p>
                )}

              <Link
                href='/forgot-pass'
                className='text-sm text-green-600 absolute right-0 top-0'>
                Forgot password?
              </Link>
            </div>

            <ButtonPrimary type='submit'>Continue</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className='block text-center text-neutral-700 dark:text-neutral-300'>
            New user? {` `}
            <Link className='text-green-600' href='/signup'>
              Create an account
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
