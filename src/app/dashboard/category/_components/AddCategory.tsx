'use client';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import Input from '@/shared/Input/Input';
import Image from 'next/image';
import { FC, useTransition, useState } from 'react';
import { useForm } from 'react-hook-form';

import imgIcon from '@/images/icons/photo.png';

import LoadingIndicator from '@/components/LoadingIndicator';
// import { default_category } from '@/data/defaultValue';
import { createCategory } from '@/queries/categories';

interface AddCategoriesProps {
  className?: string;
}

interface CategoriesFormData {
  name: string;
  image: FileList;

}

const AddCategories: FC<AddCategoriesProps> = () => {
  const [isPending, startTransition] = useTransition();
  const [preview, setPreview] = useState<string | null>(null); // State for image preview
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoriesFormData>();

  const handleCategory = async (event: CategoriesFormData) => {
    const formData = new FormData();
    console.log('Category data: ', event);
      formData.append('name', event.name);
    if (event?.image?.length > 0) {
      formData.append('file', event.image[0]);
    }


    startTransition(async () => {
      try {
    
        const result = await createCategory(formData)
        console.log("result ",result);
        
        if (result.status === 200) {
          reset();
          setPreview(null)
          alert(result.message);
        }
      } catch (err: any) {
        alert(`Error Occur ${err?.message}`);
        console.log(err.message);
      }
    });
  
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // Create image preview
    }
  };

  if (isPending) return <LoadingIndicator />;

  return (
    <div className='nc-PageSignUp container mt-6' data-nc-id='PageSignUp'>
      <div className='container mb-10 lg:mb-20'>
        <h2 className='my-8 text-center text-3xl md:text-5xl font-semibold'>
          Category Add
        </h2>
        <div className='max-w-md mx-auto space-y-6'>
          <form className='grid ' onSubmit={handleSubmit(handleCategory)}>
            <div className='h-20 mb-2'>
              <label className='block'>
                <span>Category Name</span>
                <Input
                  type='text'
                  placeholder='Category Name'
                  {...register('name', {
                    required: 'Name Field is Required!',
                    minLength: {
                      value: 3,
                      message: 'Name must be at least 3 characters',
                    },
                  })}
                  name='name'
                />
              </label>
              {errors.name && typeof errors.name.message === 'string' && (
                <p className='text-red-600 text-xs ml-2'>
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className='h-20'>
              <div className='relative rounded-full overflow-hidden flex'>
                <Image
                  src={preview || imgIcon} // Use preview or fallback image
                  alt='Category Image'
                  width={50}
                  height={50}
                  className='w-16 h-16 rounded  object-contain z-0'
                />
                <div className='absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer'>
                  <svg
                    width='20'
                    height='20'
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
                  <span className='mt-1 text-xs'>Add Image</span>
                </div>
                <input
                  type='file'
                  className='absolute inset-0 opacity-0 cursor-pointer'
                  {...register('image')}
                  name='image'
                  onChange={handleImageChange} // Handle file input change
                />
              </div>
            </div>

    

            <ButtonPrimary className='mt-4' type='submit'>
              Submit
            </ButtonPrimary>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategories;
