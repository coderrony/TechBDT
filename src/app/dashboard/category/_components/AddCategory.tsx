'use client';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import Input from '@/shared/Input/Input';
import Image from 'next/image';
import { FC, useTransition, useState } from 'react';
import { useForm } from 'react-hook-form';

import imgIcon from '@/images/icons/photo.png';

import LoadingIndicator from '@/components/LoadingIndicator';
import axios from 'axios';
// import { default_category } from '@/data/defaultValue';
// import { createCategory } from '@/queries/categories';

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

    startTransition(async () => {
      try {
    
        const result = await axios.post('/api/category-api', formData) as any;
        console.log("result ",result);
        
        if (result.data.status === 200) {
          reset();
          setPreview(null)
          alert(result.data.message);
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
