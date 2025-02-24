'use client';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';

import Input from '@/shared/Input/Input';
import { FC, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import toast from 'react-hot-toast';
import NotifyToaster from '@/components/NotifyToaster';
import LoadingIndicator from '@/components/LoadingIndicator';
import { useRouter } from 'next/navigation';
import PasswordInput from '@/components/PasswordInput/PasswordInput';
import { passwordUpdate } from '@/queries/users';
import { delay } from '@/utils/delay';

interface ChangePasswordProps {
  className?: string;
  phoneNumber: string | null;
  otp: string;
}

const ChangePassword: FC<ChangePasswordProps> = ({ phoneNumber, otp }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const passwordValue = watch('password');
  const loadingIndicator = () => {
    return <LoadingIndicator />;
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

  // otp verification
  const confirmOtpHandle = async (data: any) => {
    startTransition(async () => {
      await delay(2000);
      if (data.otp !== otp) {
        notifyToast(true, 'Error', 'OTP does not match');
        return;
      }
      if (data.otp === otp) {
        notifyToast(false, 'Success', 'OTP Verified Successfully');
        setIsOtpVerified(true);
      }
    });
  };

  // confirm password
  const confirmPasswordHandle = async (data: any) => {
    if (phoneNumber !== null) {
      startTransition(async () => {
        try {
          const result = await passwordUpdate(phoneNumber, data.password);

          if (result.status === 500) {
            notifyToast(true, 'Error', result?.message);
            return;
          }

          if (result.status === 200) {
            router.push('/login');
            notifyToast(false, 'Success', result?.message);
          }
        } catch (error: any) {
          notifyToast(true, 'Error', error.message);
        }
      });
    } else {
      notifyToast(true, 'Error', 'Phone Number Required');
    }
  };

  const otpVerificationForm = () => {
    return (
      <form
        className='grid grid-cols-1 gap-6'
        onSubmit={handleSubmit(confirmOtpHandle)}>
        <label className='block'>
          {/* <span className='text-sm text-green-700'>
            We’ve sent a One-Time Password (OTP) TO {phoneNumber}
            <br />
            Please enter the OTP below to verify your account.
          </span> */}

          <span className='text-sm text-green-700'>
          আমরা একটি ওয়ান-টাইম পাসওয়ার্ড (OTP) {phoneNumber} নম্বরে পাঠিয়েছি।  
          <br />
          আপনার অ্যাকাউন্ট যাচাইয়ের জন্য নিচে OTP টি প্রবেশ করুন। OTP পৌঁছাতে ২–৩ মিনিট সময় লাগতে পারে।
        </span>
          {isPending ? (
            loadingIndicator()
          ) : (
            <Input
              type='text' // Keeps control over input
              placeholder='Enter 4-digit OTP'
              {...register('otp', {
                required: 'OTP field is required!',
                pattern: {
                  value: /^\d{4}$/, // Regex to ensure exactly 4 digits
                  message: 'OTP must be exactly 4 numeric digits.',
                },
              })}
              maxLength={4} // Limits input to 4 characters
              onInput={e => {
                // Restrict non-numeric characters dynamically
                e.currentTarget.value = e.currentTarget.value.replace(
                  /\D/g,
                  '',
                );
              }}
              className='mt-1'
            />
          )}

          {errors.otp && typeof errors.otp.message === 'string' && (
            <p className='text-red-600 text-xs ml-2'>{errors.otp.message}</p>
          )}
        </label>
        <ButtonPrimary type='submit' disabled={isPending}>
          Verify
        </ButtonPrimary>
      </form>
    );
  };

  const passwordChangeForm = () => {
    return (
      <form
        className='grid grid-cols-1 gap-6'
        onSubmit={handleSubmit(confirmPasswordHandle)}>
        <label className='block'>
          <span className='text-sm text-green-700'>Confirm your password</span>
          {isPending ? (
            loadingIndicator()
          ) : (
            <>
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
            </>
          )}

          {errors.otp && typeof errors.otp.message === 'string' && (
            <p className='text-red-600 text-xs ml-2'>{errors.otp.message}</p>
          )}
        </label>
        <ButtonPrimary type='submit' disabled={isPending}>
          Verify
        </ButtonPrimary>
      </form>
    );
  };

  return (
    <div>{isOtpVerified ? passwordChangeForm() : otpVerificationForm()}</div>
  );
};

export default ChangePassword;
