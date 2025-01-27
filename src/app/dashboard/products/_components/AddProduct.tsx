'use client';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import Input from '@/shared/Input/Input';
import Image from 'next/image';
import { FC, useState, useTransition } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import imgIcon from '@/images/icons/photo.png';
import galleryIcon from '@/images/icons/gallery.png';
import Textarea from '@/shared/Textarea/Textarea';
import Label from '@/components/Label/Label';
import SelectValue from '@/components/SelectValue';
import { CategoryAndSubType } from '@/types/CategoryType';
import LoadingIndicator from '@/components/LoadingIndicator';
import { DropShopType } from '@/types/DropShopType';
import { replaceMongoIdInArray } from '@/lib/convertData';
// import { createProduct } from '@/queries/products';
import axios from 'axios';
import { createProduct } from '@/queries/products';
// import { uploadFileByCloudinary } from '@/lib/cloudinaryFileUpload';
// import cloudinary from '@/services/cloudinary';

interface AddProductProps {
  className?: string;
  categoriesData: CategoryAndSubType[];
  dropshops: DropShopType[];
}

const AddProduct: FC<AddProductProps> = ({ categoriesData, dropshops }) => {
  const [subCategories, setSubCategories] = useState<
    CategoryAndSubType['sub_categories']
  >([]);
  const [isPending, startTransition] = useTransition();
  const [preview, setPreview] = useState<string | null>(null); // State for image preview
  const [imageGalleryPreview, setImageGalleryPreview] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    control, // Extract control from useForm
    formState: { errors },
  } = useForm();

  const {
    fields: sizeFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({ control, name: 'sizes' });

  const {
    fields: colorFields,
    append: appendColor,
    remove: removeColor,
  } = useFieldArray({ control, name: 'colors' });

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({ control, name: 'variants' });


  
const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedCategoryId = e.target.selectedOptions[0].getAttribute('data-id'); // Get `data-id`

  const selectedCategory = categoriesData.find(
    category => category.id === selectedCategoryId, // Find category by ID
  );

  const subCategories = selectedCategory?.sub_categories || [];

  setSubCategories(subCategories); // Update subcategories
  setSubCategories(replaceMongoIdInArray(subCategories as any[])); // Type cast
};

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // Create image preview
    }
  };

  const handleImageGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const newPreviews = files.map(file => URL.createObjectURL(file));

    setImageGalleryPreview(prev => [...prev, ...newPreviews]);
  };

  const handleProduct = async (data: any) => {
    const payload = {
      sizes: (data.sizes || []).map((item: any) => item.value),
      colors: (data.colors || []).map((item: any) => item.value),
      variants: (data.variants || []).map((item: any) => item.value),
    };

    console.log('data ', data);

    const formData = new FormData();
    const signalFileFormData = new FormData();
    const multipleFileFormData = new FormData();

    const bnContentJson = JSON.parse(data.BN_content); // Convert string to JSON
    const enContentJson = JSON.parse(data.EN_content); // Convert string to JSON

    // Array.from(data.image_gallery as File[]).forEach(file => {
    //   formData.append('image_gallery', file);
    // });
    Array.from(data.image_gallery as File[]).forEach(file => {
      multipleFileFormData.append('gallery', file);
    });

    formData.append('name', data.name);
    formData.append('dropshop', data.dropshop);
    formData.append('category', data.category);
    formData.append('sub_category', data.sub_category);
    formData.append('price', data.price);
    formData.append('sku', data.sku);
    formData.append('status', data.status);
    formData.append('discount', data.discount);
    formData.append('description', data.description);
    // formData.append('thumbnail', data.thumbnail[0]);
    formData.append('BN_content', JSON.stringify(bnContentJson));
    formData.append('EN_content', JSON.stringify(enContentJson));
    formData.append('payload', JSON.stringify(payload));

    startTransition(async () => {
      try {
        //

        if (data?.thumbnail[0]) {
          signalFileFormData.append(
            'path',
            `product-image/${data.name.replaceAll(' ', '-')}/thumbnail`,
          );
          signalFileFormData.append('file', data.thumbnail[0]);
          const uploadFileResult = (await axios.post(
            '/api/upload-file-api',
            signalFileFormData,
          )) as any;
 
          formData.append('thumbnail', uploadFileResult.data.res_data);
        }
      

        if (data?.image_gallery?.length > 0) {
          multipleFileFormData.append(
            'path',
            `product-image/${data.name.replaceAll(' ', '-')}/image_gallery`,
          );

          const uploadGalleryResult = (await axios.post(
            '/api/upload-file-api',
            multipleFileFormData,
          )) as any;

          formData.append(
            'image_gallery',
            JSON.stringify(uploadGalleryResult.data.res_data),
          );
        }

        const result = await createProduct(formData);
        // const result = await axios.post('/api/product-api', formData) as any;

        console.log('result ', result);

        if (result?.status === 200) {
          reset();
          alert(result?.message);
        }
        if (result?.status === 500) {
          alert(result?.message);
        }
        setPreview(null);
        setImageGalleryPreview([]);
      } catch (err: any) {
        alert(`Error Occur ${err?.message}`);
        console.log(err.message);
        setPreview(null);
        setImageGalleryPreview([]);
      }
    });
  
  
  };

  if (isPending) return <LoadingIndicator />;

  // console.log("categoriesData ",categoriesData);
  
  return (
    <div className='container mt-6'>
      <h2 className='my-5 text-center text-1xl md:text-3xl font-semibold'>
        Add Product
      </h2>
      <div className='mx-auto lg:mx-32 space-y-6'>
        <form className='grid space-y-2' onSubmit={handleSubmit(handleProduct)}>
          {/* Dropshop Select */}
          <div className='h-20'>
            <Label>Select Dropshop</Label>
            <SelectValue
              className='mt-1.5'
              {...register('dropshop', {
                required: 'Dropshop Field is Required!',
              })}
              onChange={handleCategoryChange} // Add onChange
            >
              <option value=''>Select dropshop</option>
              {dropshops.map(item => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </SelectValue>
            {errors.dropshop && typeof errors.dropshop.message === 'string' && (
              <p className='text-red-600 text-xs ml-2'>
                {errors.dropshop.message}
              </p>
            )}
          </div>
          {/* Category Select */}
          <div className='h-20'>
            <Label>Select Category</Label>
            <SelectValue
              className='mt-1.5'
              {...register('category')}
              onChange={handleCategoryChange} // Add onChange
            >
              <option value=''>Select Category</option>
              {categoriesData.map(item => (
                <option value={item.name} key={item.id} data-id={item.id}>
                  {item.name}
                </option>
              ))}
            </SelectValue>
          </div>

          {/* Sub Category Select */}
          <div className='h-20'>
            <Label>Select Sub Category</Label>
            <SelectValue className='mt-1.5' {...register('sub_category')}>
              <option value=''>Select Sub Category</option>
              {subCategories?.map(sub => (
                <option value={sub.name} key={sub.id} >
                  {sub.name}
                </option>
              ))}
            </SelectValue>
          </div>

          <div className='h-20'>
            <Label>Product Name</Label>
            <Input
              type='text'
              placeholder='Product Name'
              {...register('name', {
                required: 'Name Field is Required!',
                minLength: {
                  value: 4,
                  message: ' must be at least 4 characters',
                },
              })}
            />
            {errors.name && typeof errors.name.message === 'string' && (
              <p className='text-red-600 text-xs ml-2'>{errors.name.message}</p>
            )}
          </div>

          {/* price */}
          <div className='h-20 '>
            <Label>Price</Label>
            <Input
              type='number'
              placeholder='Price'
              {...register('price', {
                required: 'Price Field is Required!',
              })}
            />
            {errors.price && typeof errors.price.message === 'string' && (
              <p className='text-red-600 text-xs ml-2'>
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Sku */}
          <div className='h-20 '>
            <Label>Sku</Label>
            <Input
              type='text'
              placeholder='sku'
              {...register('sku', {
                required: 'Sku Field is Required!',
              })}
            />
            {errors.sku && typeof errors.sku.message === 'string' && (
              <p className='text-red-600 text-xs ml-2'>{errors.sku.message}</p>
            )}
          </div>

          {/* discount */}
          <div className='h-20 '>
            <Label>Discount</Label>
            <Input
              type='number'
              placeholder='Discount'
              {...register('discount', {
                required: 'discount Field is Required!',
              })}
            />
            {errors.discount && typeof errors.discount.message === 'string' && (
              <p className='text-red-600 text-xs ml-2'>
                {errors.discount.message}
              </p>
            )}
          </div>
          {/* description */}
          <div className=''>
            <Label>Description</Label>
            <Textarea
              placeholder='Description'
              {...register('description', {
                required: 'Description Field is Required!',
              })}
            />
            {errors.description &&
              typeof errors.description.message === 'string' && (
                <p className='text-red-600 text-xs ml-2'>
                  {errors.description.message}
                </p>
              )}
          </div>

          {/* BN Json Content */}
          <div className=''>
            <Label>BN Json Content</Label>
            <Textarea
              placeholder='Json BN Content'
              {...register('BN_content', {
                required: 'BN Content Field is Required! by Json Format',
                validate: value => {
                  try {
                    JSON.parse(value); // Validates if the input is valid JSON
                    return true;
                  } catch (err) {
                    return 'Invalid JSON format';
                  }
                },
              })}
            />
            {errors.BN_content && (
              <p className='text-red-600 text-xs ml-2'>
                {typeof errors.BN_content.message === 'string'
                  ? errors.BN_content.message
                  : ''}
              </p>
            )}
          </div>

          {/* EN Json Content */}
          <div className=''>
            <Label>EN Json Content</Label>
            <Textarea
              placeholder='Json EN Content'
              {...register('EN_content', {
                required: 'EN Content Field is Required! by Json Format',
                validate: value => {
                  try {
                    JSON.parse(value); // Validates if the input is valid JSON
                    return true;
                  } catch (err) {
                    return 'Invalid JSON format';
                  }
                },
              })}
            />
            {errors.EN_content && (
              <p className='text-red-600 text-xs ml-2'>
                {typeof errors.EN_content.message === 'string'
                  ? errors.EN_content.message
                  : ''}
              </p>
            )}
          </div>
          <div className='h-20'>
            <Label>
              Product Status Like (e.g: New in | Limited Edition | Stock Out |
              Best Sales )
            </Label>
            <Input
              type='text'
              placeholder='Product Status'
              {...register('status', {
                required: 'Status Field is Required!',
                minLength: {
                  value: 4,
                  message: ' must be at least 4 characters',
                },
              })}
            />
            {errors.status && typeof errors.status.message === 'string' && (
              <p className='text-red-600 text-xs ml-2'>
                {errors.status.message}
              </p>
            )}
          </div>

          {/* Sizes */}
          <div className='space-y-2'>
            <Label>Sizes</Label>
            {sizeFields.map((field, index) => (
              <div key={field.id} className='flex gap-2'>
                <Input
                  type='text'
                  placeholder='Enter size'
                  {...register(`sizes.${index}.value` as const, {
                    required: 'Size is required',
                  })}
                />
                <button
                  type='button'
                  className='bg-red-500 text-white p-1 mx-2 rounded'
                  onClick={() => removeSize(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button
              type='button'
              className='bg-blue-500 text-white p-1 mx-2  rounded'
              onClick={() => appendSize({ value: '' })}>
              Add Size
            </button>
          </div>

          {/* Colors */}
          <div className='space-y-2'>
            <Label>Colors</Label>
            {colorFields.map((field, index) => (
              <div key={field.id} className='flex gap-2'>
                <Input
                  type='text'
                  placeholder='Enter color'
                  {...register(`colors.${index}.value` as const, {
                    required: 'Color is required',
                  })}
                />
                <button
                  type='button'
                  className='bg-red-500 text-white p-1 mx-2 rounded'
                  onClick={() => removeColor(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button
              type='button'
              className='bg-blue-500 text-white mx-2 p-1 rounded'
              onClick={() => appendColor({ value: '' })}>
              Add Color
            </button>
          </div>

          {/* Variants */}
          <div className='space-y-2'>
            <Label>Variants</Label>
            {variantFields.map((field, index) => (
              <div key={field.id} className='flex gap-2'>
                <Input
                  type='text'
                  placeholder='Enter Variant'
                  {...register(`variants.${index}.value` as const, {
                    required: 'Variant is required',
                  })}
                />
                <button
                  type='button'
                  className='bg-red-500 text-white p-1 mx-2 rounded'
                  onClick={() => removeVariant(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button
              type='button'
              className='bg-blue-500 text-white mx-2 p-1 rounded'
              onClick={() => appendVariant({ value: '' })}>
              Add Variant
            </button>
          </div>

          {/*  Thumbnail */}
          <div className=''>
            <Label>Thumbnail</Label>
            <div className='relative rounded-full overflow-hidden flex '>
              <Image
                src={imgIcon} // Use preview or fallback image
                alt='Thumbnail'
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
                <span className='mt-1 text-xs'>Add Thumbnail</span>
              </div>
              <input
                type='file'
                className='absolute inset-0 opacity-0 cursor-pointer'
                {...register('thumbnail', {
                  required: 'Thumbnail Field is Required!',
                })}
                name='thumbnail'
                onChange={handleImageChange} // Handle file input change
              />
            </div>
            {errors.thumbnail &&
              typeof errors.thumbnail.message === 'string' && (
                <p className='text-red-600 text-xs ml-2'>
                  {errors.thumbnail.message}
                </p>
              )}

            {preview && (
              <div className='relative w-32 h-32'>
                <Image
                  src={preview || imgIcon} // Use preview or fallback image
                  alt='Thumbnail Image'
                  fill
                  className='object-contain w-full h-full rounded-md'
                />
              </div>
            )}
          </div>

          {/*  Image Gallery */}
          <div className=''>
            <Label>Image Gallery</Label>
            <div className='relative rounded-full overflow-hidden flex '>
              <Image
                src={galleryIcon}
                alt='Image Gallery'
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
                <span className='mt-1 text-xs'>Add Images</span>
              </div>
              <input
                type='file'
                multiple
                accept='image/*'
                className='absolute inset-0 opacity-0 cursor-pointer'
                {...register('image_gallery', {
                  required: 'Images Gallery Field is Required!',
                })}
                name='image_gallery'
                onChange={handleImageGalleryChange} // Handle file input change
              />
            </div>
            {errors.image_gallery &&
              typeof errors.image_gallery.message === 'string' && (
                <p className='text-red-600 text-xs ml-2'>
                  {errors.image_gallery.message}
                </p>
              )}

            {/* Image Previews */}
            <div className='flex space-x-4 mt-4'>
              {imageGalleryPreview.map((url, index) => (
                <div key={index} className='relative w-32 h-32'>
                  <Image
                    fill
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className='object-contain w-full h-full rounded-md'
                  />
                </div>
              ))}
            </div>
          </div>

          <ButtonPrimary className='mt-4' type='submit'>
            Submit
          </ButtonPrimary>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
