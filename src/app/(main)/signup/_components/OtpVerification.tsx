'use client';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import Input from '@/shared/Input/Input';
import { FC, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { UserDataType } from './Signup';

import toast from 'react-hot-toast';
import NotifyToaster from '@/components/NotifyToaster';
import LoadingIndicator from '@/components/LoadingIndicator';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { delay } from '@/utils/delay';

import { newUserCreate } from '@/queries/users';

interface OtpVerificationProps {
  className?: string;
  user: UserDataType;
  otp: string;
}

const OtpVerification: FC<OtpVerificationProps> = ({ user, otp }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const onSubmit = async (data: any) => {
    const clientOtp = data.otp;
    const password = user.password;
    const full_name = user.full_name;
    const phone = user.phone;

    startTransition(async () => {
      try {
        if (!user.phone || !otp || !clientOtp) {
          notifyToast(
            true,
            'Error OTP Verification',
            'Phone number and OTP are required',
          );
        }

        // check otp
        if (otp !== clientOtp) {
          await delay(2000);
          notifyToast(true, 'Error OTP Verification', 'Invalid OTP');
        }

        if (otp === clientOtp) {
          // new user create
          const result:any = await newUserCreate({
            full_name: full_name,
            provider: 'phone',
            phone: phone,
            password: password,
          } as any);

    

          if (result) {
            await signIn('credentials', {
              ...result,
              isLogin: false,
              redirect: false, // Use `redirect: false` to handle the response manually
            });

            notifyToast(false, 'Account Created', "User authenticated successfully");
            router.push('/');
          }
        }
      } catch (err: any) {
        notifyToast(true, 'Error during OTP verification', err.message);
      }
    });
  };

  const loadingIndicator = () => {
    return <LoadingIndicator />;
  };

  return (
    <form className='grid grid-cols-1 gap-6' onSubmit={handleSubmit(onSubmit)}>
      <label className='block'>
        <span className='text-sm text-green-700'>
          We’ve sent a One-Time Password (OTP) To {user.phone}.
          <br />
          Please enter the OTP below to verify your account.
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
              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '');
            }}
            className='mt-1'
          />
        )}

        {errors.otp && typeof errors.otp.message === 'string' && (
          <p className='text-red-600 text-xs ml-2'>{errors.otp.message}</p>
        )}
      </label>
      <ButtonPrimary type='submit' disabled={isPending}>
        Signup
      </ButtonPrimary>
    </form>
  );
};

export default OtpVerification;
