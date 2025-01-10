'use client';
import React, { FC, useState, useTransition } from 'react';
import Input from '@/shared/Input/Input';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import Link from 'next/link';
import SocialLogin from '@/components/SocialLogin/SocialLogin';
import { useForm } from 'react-hook-form';
import PasswordInput from '@/components/PasswordInput/PasswordInput';
import OtpVerification from './OtpVerification';
import LoadingIndicator from '@/components/LoadingIndicator';
import NotifyAlert from '@/components/NotifyToaster';
import toast from 'react-hot-toast';
import { otpRequestProcess } from '@/queries/users';
import { otpSend } from '@/queries/otp-send';
import { notify_duration } from '@/data/defaultValue';
import axios from 'axios';

interface SignupProps {
  className?: string;
}

export interface UserDataType {
  full_name: string;
  phone: string;
  password: string;
}

const Signup: FC<SignupProps> = () => {
  const [verificationOTP, setVerificationOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [isPending, startTransition] = useTransition();
  const [userData, setUserData] = useState<UserDataType | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const passwordValue = watch('password');

  const handleSignup = async (event: any) => {
    setUserData(event);
   console.log("event ",event);
   
    startTransition(async () => {
      try {
       
        const result = await axios.get(`/api/otp-send`, { params: { phone:event.phone,isRegistration:true } }) as any;
        // const result = (await otpRequestProcess(event.phone, true)) as any;
      
        console.log("result ",result?.data);
        
       
        // if (result?.data.status === 400) {
        //   notifyToast(true, 'Error', result?.data?.message);
        //   setError('phone', {
        //     type: 'manual',
        //     message: 'phone number already exists.',
        //   });
        // }
        // if (result?.data.status === 500) {
        //   notifyToast(true, 'Error', result?.data?.message);
        // }
        // if (result?.data.status === 200) {
       
        //   await otpSend(event.phone, result?.data.otp);
        //   setVerificationOTP(true);
        //   setOtp(result?.data.otp);
        //   notifyToast(
        //     false,
        //     'OTP Verification',
        //     `${result?.data?.message} To ${event.phone}`,
        //   );
        // }


      } catch (err: any) {
        notifyToast(true, 'Error', err.message); 
      }
    });
  };




  const loadingIndicator = () => {
    return <LoadingIndicator />;
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

  return (
    <div className='nc-PageSignUp' data-nc-id='PageSignUp'>
      <div className='container mb-24 lg:mb-32'>
        <h2 className='my-16 text-center text-3xl md:text-5xl font-semibold'>
          Signup
        </h2>
        <div className='max-w-md mx-auto space-y-6'>
          <SocialLogin />
          <div className='relative text-center'>
            <span className='relative z-10 inline-block px-4 bg-white'>OR</span>
            <div className='absolute left-0 w-full top-1/2 -translate-y-1/2 border'></div>
          </div>

          {verificationOTP ? (
            userData !== null && <OtpVerification user={userData} otp={otp}/>
          ) : isPending ? (
            loadingIndicator()
          ) : (
            <form className='grid ' onSubmit={handleSubmit(handleSignup)}>
              <div className='h-20 '>
                <label className='block'>
                  <span>Full Name</span>
                  <Input
                    type='text'
                    placeholder='Your full name'
                    {...register('full_name', {
                      required: 'Full Name Field is Required!',
                      minLength: {
                        value: 3,
                        message: 'Full Name must be at least 3 characters',
                      },
                    })}
                    name='full_name'
                  />
                </label>

                {errors.full_name &&
                  typeof errors.full_name.message === 'string' && (
                    <p className='text-red-600 text-xs ml-2'>
                      {errors.full_name.message}
                    </p>
                  )}
              </div>
{/* Phone Number */}
              <div className='h-20 '>
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
{/* password */}
              <div className='h-20'>
                <PasswordInput
                  register={register}
                  name={'password'}
                  inputLabel={'Password'}
                />{' '}
                {/* Pass the `register` function here */}
                {errors.password &&
                  typeof errors.password.message === 'string' && (
                    <p className='text-red-600 text-xs ml-2'>
                      {errors.password.message}
                    </p>
                  )}
              </div>
{/* confirm password */}
              <div className='h-20'>
                <PasswordInput
                  register={register}
                  name={'confirm_password'}
                  inputLabel={'Confirm Password'}
                  passwordValue={passwordValue}
                />{' '}
                {/* Pass the `register` function here */}
                {errors.confirm_password &&
                  typeof errors.confirm_password.message === 'string' && (
                    <p className='text-red-600 text-xs ml-2'>
                      {errors.confirm_password.message}
                    </p>
                  )}
              </div>

              <ButtonPrimary
                className='mt-4'
                type='submit'
                disabled={isPending}>
                Continue
              </ButtonPrimary>
            </form>
          )}

          <span className='block text-center'>
            Already have an account?{' '}
            <Link className='text-green-600' href='/login'>
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;