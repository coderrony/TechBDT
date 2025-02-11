'use client';
import React, { useState, useTransition } from 'react';
import Input from '@/shared/Input/Input';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import LoadingIndicator from '@/components/LoadingIndicator';
import NotifyAlert from '@/components/NotifyToaster';
import toast from 'react-hot-toast';
import ChangePassword from './_components/ChangePassword';

import axios from 'axios';
import { notify_duration } from '@/data/defaultValue';

const PageForgotPass = ({}) => {
  const [verificationOTP, setVerificationOTP] = useState(false);
    const [otp, setOtp] = useState("");
  const [isPending, startTransition] = useTransition();
  const [phoneNumber,setPhoneNumber] = useState<string | null>(null)
  const {
    register,
    handleSubmit,

    setError,
    formState: { errors },
  } = useForm();

  const phoneOtpHandle = async (event: any) => {
    console.log(event);
    setPhoneNumber(event.phone)
    startTransition(async () => {
      try {
   
        // const result = await otpRequestProcess(event.phone, false) as any;
        const res = await axios.post(`/api/otp-send`, { phone:event.phone,isRegistration:false } ) as any;
        const result = res.data;
        console.log("result ",result);
        
        if (result.status === 200) {
          // await otpSend(event.phone, result.otp);
          setVerificationOTP(true);
          setOtp(result.otp);
          notifyToast(
            false,
            'OTP Verification',
            `${result?.message} To ${event.phone}`,
          );
        }

        if (result.status === 400) {
          notifyToast(true, 'Error', result?.message);
          setError('phone', {
            type: 'manual',
            message: 'Phone Number Not Exists!',
          });
        }
      } catch (error: any) {
        notifyToast(true, 'Error', error.message);
      }
    });
  };

  const notifyToast = (isError: boolean, title: string, message: string) => {
    toast.custom(
      t => (
        <NotifyAlert
          show={t.visible}
          isError={isError}
          title={title}
          message={message}
        />
      ),
      { position: 'top-right', id: 'nc-product-notify', duration: notify_duration },
    );
  };

  const loadingIndicator = () => {
    return <LoadingIndicator />;
  };

  return (
    <div className='container mb-24 lg:mb-32'>
      <header className='text-center max-w-2xl mx-auto  mb-7 sm:mb-8 lg:mb-10'>
        <h2 className='mt-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
          Forgot password
        </h2>
        <span className='block text-sm mt-4 text-neutral-700 sm:text-base dark:text-neutral-200'>
          Welcome to our Community
        </span>
      </header>

      <div className='max-w-md mx-auto space-y-6'>
        {/* FORM */}
        {isPending ? (
          loadingIndicator()
        ) : verificationOTP ? (
          <ChangePassword phoneNumber={phoneNumber} otp={otp} />
        ) : (
          <form
            className='grid grid-cols-1 gap-6'
            onSubmit={handleSubmit(phoneOtpHandle)}>
            <label className='block'>
              <span className='text-neutral-800 dark:text-neutral-200'>
                Phone Number
              </span>
              <Input
                className='mt-1'
                type='number'
                placeholder='Your phone number'
                {...register('phone', {
                  required: 'Phone Field is Required!',

                  pattern: {
                    value: /^01[3-9]\d{8}$/,
                    message:
                      'Invalid phone number! It must start with 01 and 11 digits',
                  },
                })}
                name='phone'
              />
              {errors.phone && typeof errors.phone.message === 'string' && (
                <p className='text-red-600 text-xs ml-2'>
                  {errors.phone.message}
                </p>
              )}
            </label>
            <ButtonPrimary type='submit'>Continue</ButtonPrimary>
          </form>
        )}

        {/* ==== */}
        <span className='block text-center text-neutral-700 dark:text-neutral-300'>
          Go back for {` `}
          <Link href='/login' className='text-green-600'>
            Sign in
          </Link>
          {` / `}
          <Link href='/signup' className='text-green-600'>
            Sign up
          </Link>
        </span>
      </div>
    </div>
  );
};

export default PageForgotPass;
