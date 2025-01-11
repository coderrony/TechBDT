'use client';
import Label from '@/components/Label/Label';
import React, {
  FC,

  useEffect,
  useState,
  useTransition,
} from 'react';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import Input from '@/shared/Input/Input';

import Textarea from '@/shared/Textarea/Textarea';
import { useForm, useFieldArray } from 'react-hook-form';
import Image from 'next/image';
// import useAuth from '@/hooks/useAuth';
import SelectValue from '@/components/SelectValue';
import { divisionsData } from '../_data/divisions';
import {
  DistrictType,
  DivisionType,
  UnionType,
  UpzilaType,
} from '../_data/locationTypes';
import { districtsData } from '../_data/districts';
import { upazilasData } from '../_data/upazilas';
import { unionsData } from '../_data/unions';
import { default_avatar, notify_duration } from '@/data/defaultValue';
import LoadingIndicator from '@/components/LoadingIndicator';
import toast from 'react-hot-toast';
import NotifyAlert from '@/components/NotifyToaster';
import { delay } from '@/utils/delay';
// import { otpRequestProcess, updateAccount } from '@/queries/users';
import { useRouter } from 'next/navigation';
// import { otpSend } from '@/queries/otp-send';
import useAuthData from '@/hooks/useAuthData';
import axios from 'axios';
import { updateAccount } from '@/queries/users';

interface AccountInfoProps {
  className?: string;
}

type FormValues = {
  additional_mobile: { value: string }[];
  otp:string;
  avatar: File | null;
  full_name: string;
  phone:string | null;
  division: string;
  district: string;
  upzila: string;
  union: string;
  address: string;
};


const AccountInfo: FC<AccountInfoProps> = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const { authDataFetch:{authData}, fetchMe } = useAuthData() as any;

  console.log("authData ",authData);
  

  const [divisions, setDivisions] = useState<DivisionType[]>([]);
  const [selectedDivision, setSelectedDivision] = useState<string>('');

  const [districts, setDistricts] = useState<DistrictType[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');

  const [upzilas, setUpzilas] = useState<UpzilaType[]>([]);
  const [selectedUpzila, setSelectedUpzila] = useState<string>('');

  const [unions, setUnions] = useState<UnionType[]>([]);
  const [selectedUnion, setSelectedUnion] = useState<string>('');

  const [isPending, startTransition] = useTransition();
  const [otp, setOtp] = useState<string>('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [formInfo, setFormInfo] = useState<null | FormData>(null);
  const router = useRouter()


  const {
    register,
    handleSubmit,
    reset,
    control, // Extract control from useForm
    setError,
    formState: { errors },
  } = useForm<FormValues>();

  const {
    fields: additionalMobileFields,
    append: appendAdditionalMobile,
    remove: removeAdditionalMobile,
  } = useFieldArray({ control, name: 'additional_mobile' });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // Create image preview
    }
  };

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value; // Gets the selected division ID
    const selectedId = e.target.selectedOptions[0].getAttribute('data-id'); // Gets the selected division name

    if (selectedId) {
      handleDistrict(selectedId);
      setSelectedDivision(selectedName);
    }
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    const selectedId = e.target.selectedOptions[0].getAttribute('data-id'); // Gets the selected division name

    // console.log('Selected ID:', selectedId);
    if (selectedId) {
      handleUpzila(selectedId);
      setSelectedDistrict(selectedName);
    }
  };

  const handleUpzilaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    const selectedId = e.target.selectedOptions[0].getAttribute('data-id'); // Gets the selected division name

    // console.log('Selected ID:', selectedId);
    if (selectedId) {
      handleUnion(selectedId);
      setSelectedUpzila(selectedName);
    }
  };

  const handleUnionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    const selectedId = e.target.selectedOptions[0].getAttribute('data-id'); // Gets the selected division name

    // console.log('Selected ID:', selectedId);
    if (selectedId) {
      setSelectedUnion(selectedName);
    }
  };

  const handleDistrict = (divisionId: string) => {
    const districts = districtsData.filter(
      district => district.division_id === divisionId,
    ) as DistrictType[];
    // console.log('Districts:', districts);
    if (districts.length > 0) {
      setDistricts(districts);
    } else {
      setDistricts([]);
    }
  };

  const handleUpzila = (districtId: string) => {
    const upzilas = upazilasData.filter(
      upzila => upzila.district_id === districtId,
    ) as UpzilaType[];
    // console.log('upzilas:', upzilas);
    if (upzilas.length > 0) {
      setUpzilas(upzilas);
    } else {
      setUpzilas([]);
    }
  };

  const handleUnion = (upzilaId: string) => {
    const unions = unionsData.filter(
      union => union.upazilla_id === upzilaId,
    ) as UnionType[];

    if (unions.length > 0) {
      setUnions(unions);
    } else {
      setUnions([]);
    }
  };
  
  // first time load divisions
  useEffect(() => {
    if (authData?.address?.mobile?.length > 0) {
      authData?.address?.mobile.forEach((mobile: string) =>
        appendAdditionalMobile({ value: mobile }),
      );
    }
    // console.log('render 1');
    const loadDivisions = () => {
      // console.log('render 2');
      setDivisions(divisionsData);
      const division_selected = authData?.address?.division;
      const district_selected = authData?.address?.district;
      const upzila_selected = authData?.address?.upzila;
      const union_selected = authData?.address?.union;

      if (division_selected) {
        const divisionId = divisionsData.find(
          division => division.name === division_selected,
        )?.id as string;
        
        handleDistrict(divisionId);
        setSelectedDivision(division_selected);
      }

      if (district_selected) {
        const districtId = districtsData.find(
          district => district.name === district_selected,
        )?.id as string;
        handleUpzila(districtId);
        setSelectedDistrict(district_selected);
      }

      if (upzila_selected) {
        const upzilaId = upazilasData.find(
          upzila => upzila.name === upzila_selected,
        )?.id as string;
        handleUnion(upzilaId);
        setSelectedUpzila(upzila_selected);
      }

      if (union_selected) {
        setSelectedUnion(union_selected);
      }
    };

    loadDivisions();
  }, [JSON.stringify(authData?.address)]);
 
  const onSubmit = (data: any) => {

    const formData = new FormData();
    const payload = {
      additional_mobile: (data.additional_mobile || []).map(
        (item: any) => item.value,
      ),
    };
    formData.append('user_id', authData?.id);
    if(data.avatar.length > 0){ 
      formData.append('avatar', data.avatar[0]);
    }
    formData.append('full_name', data.full_name);
    formData.append('additional_mobile', JSON.stringify(payload));
    formData.append('division', data.division);
    formData.append('district', data.district);
    formData.append('upzila', data.upzila);
    formData.append('union', data.union);
    formData.append('address', data.address);
    // console.log('payload', payload);

    startTransition(async () => {
      if (data.phone) {
        // const result = await otpRequestProcess(data.phone, true) as any;
        const res = await axios.post(`/api/otp-send`, { phone:data.phone,isRegistration:true } ) as any;
        const result = res.data;
        // console.log('result ', result);
        if (result.status === 200) {
          setOtp(result.otp);
          // await otpSend(data.phone, result.otp);
          notifyToast(
            false,
            'OTP Verification',
            `${result?.message} To ${data.phone}`,
          );
          formData.append('phone', data.phone);
          setFormInfo(formData);
          setIsOtpVerified(true);
        }

        if (result.status === 400) {
          notifyToast(true, 'Error', result?.message);
          setError('phone', {
            type: 'manual',
            message: 'phone number already exists.',
          });
        }
      } else {
        // without phone
        const response = await updateAccount(formData);
        // console.log("response ",response);
        
      }
    });
  };

  const handleOtpSubmit = async (data: any) => {
    // console.log('otp data ', data);
    startTransition(async () => {
       
       if(otp !== data.otp) {
        await delay(2000);
        notifyToast(true, 'Error', 'OTP is not valid');
        setError('otp', {
          type: 'manual',
          message: 'OTP is not valid',
        });
        return;
      }

   
     const result =  await updateAccount(formInfo);
    //  console.log("result ",result);
     
     if(result.status === 200){ 
      notifyToast(false, 'Account Address',result.message);
     }else{ 
      notifyToast(true, 'Error!',result.message);
     }
    //  await fetchMe()
      router.refresh()

    })
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
      {
        position: 'top-right',
        id: 'nc-product-notify',
        duration: notify_duration,
      },
    );
  };
  if (isPending) return <LoadingIndicator />;

  return (
    <div className={`nc-AccountPage `}>
      <div className='space-y-10 sm:space-y-12'>
        {/* HEADING */}
        <h2 className='text-2xl sm:text-3xl font-semibold'>
          Account infomation
        </h2>

        {isOtpVerified ? (
          <form
            className='grid grid-cols-1 gap-6 mx-auto max-w-sm lg:max-w-md'
            onSubmit={handleSubmit(handleOtpSubmit)}>
            <label className='block'>
              <span className='text-sm text-green-700'>
                We’ve sent a One-Time Password (OTP).
                <br />
                Please enter the OTP below to verify your account.
              </span>

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

              {errors.otp && typeof errors.otp.message === 'string' && (
                <p className='text-red-600 text-xs ml-2'>
                  {errors.otp.message}
                </p>
              )}
            </label>
            <ButtonPrimary type='submit' disabled={isPending}>
              Verify
            </ButtonPrimary>
          </form>
        ) : (
          
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col md:flex-row'>
            <div className='flex-shrink-0 flex items-start'>
              {/* AVATAR */}
              <div className='relative rounded-full overflow-hidden flex'>
                <Image
                  src={preview ?? authData?.profilePicture ?? default_avatar}
                  alt='avatar'
                  width={128}
                  height={128}
                  className='w-32 h-32 rounded-full object-cover z-0'
                />
                <div className='absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer'>
                  <svg
                    width='30'
                    height='30'
                    viewBox='0 0 30 30'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125'
                      stroke='currentColor'
                      strokeWidth={1.5}
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>

                  <span className='mt-1 text-xs'>Change Image</span>
                </div>
                <input
                  type='file'
                  className='absolute inset-0 opacity-0 cursor-pointer'
                  {...register('avatar')}
                  name='avatar'
                  onChange={handleImageChange} // Handle file input change
                />
              </div>
            </div>
            <div className='flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6'>
              {/* Full Name field */}
              <div>
                <Label>Full name</Label>
                <Input
                  type='text'
                  className='mt-1.5'
                  defaultValue={authData?.full_name}
                  {...register('full_name', {
                    required: 'Full Name Field is Required!',
                    minLength: {
                      value: 4,
                      message: ' must be at least 4 characters',
                    },
                  })}
                  name='full_name'
                />
                {errors.full_name &&
                  typeof errors.full_name.message === 'string' && (
                    <p className='text-red-600 text-xs ml-2'>
                      {errors.full_name.message}
                    </p>
                  )}
              </div>

              {/* phone */}
              <div>
                <Label>Phone number</Label>
                <div className='mt-1.5 flex'>
                  <span className='inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm'>
                    <i className='text-2xl las la-phone-volume'></i>
                  </span>
                  {authData?.phone ? (
                    <Input
                      type='number'
                      className='!rounded-l-none'
                      defaultValue={authData?.phone}
                      disabled={true}
                    />
                  ) : (
                    <Input
                      type='number'
                      className='!rounded-l-none'
                      placeholder='Your phone number'
                      {...register('phone', {
                        required: 'Phone Field is Required!',
                        minLength: {
                          value: 11,
                          message: 'Phone number must be 11 digits',
                        },
                        pattern: {
                          value: /^01[3-9]\d{8}$/,
                          message:
                            'Invalid phone number! It must start with 01',
                        },
                      })}
                      name='phone'
                    />
                  )}
                </div>
                {errors.phone && typeof errors.phone.message === 'string' && (
                  <p className='text-red-600 text-xs ml-2'>
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Additional Mobile */}
              <div className='space-y-2'>
                <Label>Additional Phone:</Label>
                {additionalMobileFields.map((field, index) => (
                  <>
                    <div key={field.id} className='flex gap-2'>
                      <Input
                        type='number'
                        placeholder='Enter Mobile Number'
                        {...register(
                          `additional_mobile.${index}.value` as const,
                          {
                            required: 'Additional Mobile is required',
                            minLength: {
                              value: 11,
                              message: 'Mobile number must be 11 digits',
                            },
                            pattern: {
                              value: /^01[3-9]\d{8}$/,
                              message:
                                'Invalid Mobile number! It must start with 01',
                            },
                          },
                        )}
                      />
                      <button
                        type='button'
                        className='bg-red-500 text-white p-1 mx-2 rounded'
                        onClick={() => removeAdditionalMobile(index)}>
                        Remove
                      </button>
                    </div>

                    {errors?.additional_mobile?.[index]?.value && (
                      <p className='text-red-600 text-xs ml-2'>
                        {errors?.additional_mobile[index]?.value?.message}
                      </p>
                    )}


                  </>
                ))}
                <button
                  type='button'
                  className='bg-blue-500 text-white p-1 mx-2  rounded'
                  onClick={() => appendAdditionalMobile({ value: '' })}>
                  Add Phone Number
                </button>
              </div>

              {/* Division */}
              <div>
                <Label>Select Division</Label>
                <SelectValue
                  value={selectedDivision}
                  className='mt-1.5'
                  {...register('division', {
                    required: 'Division Field is Required!',
                  })}
                  onChange={handleDivisionChange} // Add onChange
                >
                  <option value=''>Select Division</option>
                  {divisions.map(division => (
                    <option
                      value={division.name}
                      key={division.id}
                      data-id={division.id}>
                      {division.name}
                    </option>
                  ))}
                </SelectValue>
                {errors.division &&
                  typeof errors.division.message === 'string' && (
                    <p className='text-red-600 text-xs ml-2'>
                      {errors.division.message}
                    </p>
                  )}
              </div>

              {/* District */}
              <div>
                <Label>Select District</Label>
                <SelectValue
                  value={selectedDistrict}
                  className='mt-1.5'
                  {...register('district', {
                    required: 'District Field is Required!',
                  })}
                  onChange={handleDistrictChange} // Add onChange
                >
                  <option value=''>Select District</option>
                  {districts.map(district => (
                    <option
                      value={district.name}
                      key={district.id}
                      data-id={district.id}>
                      {district.name}
                    </option>
                  ))}
                </SelectValue>
                {errors.district &&
                  typeof errors.district.message === 'string' && (
                    <p className='text-red-600 text-xs ml-2'>
                      {errors.district.message}
                    </p>
                  )}
              </div>

              {/* upzilas */}
              <div>
                <Label>Select Upzila</Label>
                <SelectValue
                  value={selectedUpzila}
                  className='mt-1.5'
                  {...register('upzila', {
                    required: 'Upzila Field is Required!',
                  })}
                  onChange={handleUpzilaChange} // Add onChange
                >
                  <option value=''>Select Upzila</option>
                  {upzilas.map(upzila => (
                    <option
                      value={upzila.name}
                      key={upzila.id}
                      data-id={upzila.id}>
                      {upzila.name}
                    </option>
                  ))}
                </SelectValue>
                {errors.upzila && typeof errors.upzila.message === 'string' && (
                  <p className='text-red-600 text-xs ml-2'>
                    {errors.upzila.message}
                  </p>
                )}
              </div>

              {/* Unions */}
              <div>
                <Label>Select Union</Label>
                <SelectValue
                  value={selectedUnion}
                  className='mt-1.5'
                  {...register('union', {
                    required: 'Unions Field is Required!',
                  })}
                  onChange={handleUnionChange} // Add onChange
                >
                  <option value=''>Select Union</option>
                  {unions.map(union => (
                    <option
                      value={union.name}
                      key={union.id}
                      data-id={union.id}>
                      {union.name}
                    </option>
                  ))}
                </SelectValue>
                {errors.union && typeof errors.union.message === 'string' && (
                  <p className='text-red-600 text-xs ml-2'>
                    {errors.union.message}
                  </p>
                )}
              </div>

              {/* address */}
              <div>
                <Label>Address</Label>
                <Textarea
                  className='mt-1.5'
                  defaultValue={authData?.address?.address}
                  {...register('address', {
                    required: 'Address Field is Required!',
                  })}
                  name='address'
                />
                {errors.address &&
                  typeof errors.address.message === 'string' && (
                    <p className='text-red-600 text-xs ml-2'>
                      {errors.address.message}
                    </p>
                  )}
              </div>

              <div className='pt-2'>
                <ButtonPrimary>Update account</ButtonPrimary>
              </div>
            </div>
          </div>
        </form>

        )}

       
      </div>
    </div>
  );
};

export default AccountInfo;
