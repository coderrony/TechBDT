import { replaceMongoIdInArray } from '@/lib/convertData';
import { Category } from '@/model/category-model';
import { SubCategory } from '@/model/sub-category-model';
import { connectDB } from '@/services/mongo';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import slugify from 'slugify';
import cloudinary from '@/services/cloudinary';
import { Product } from '@/model/product-model';

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const name = formData.get('name') as string;
  const category_id = formData.get('category_id');
  const sub_category_id = formData.get('sub_category_id');
  const price = formData.get('price');
  const sku = formData.get('sku') as string;
  const status = formData.get('status') as string;
  const discount = formData.get('discount');
  const description = formData.get('description') as string;
  const thumbnail = formData.get('thumbnail') as string;
  // const image_gallery = formData.getAll('image_gallery') as File[];
  const images_gallery = formData.getAll('image_gallery') as any;
  const dropShop = formData.get('dropshop') as string;

  const BN_contentRaw = formData.get('BN_content');
  const EN_contentRaw = formData.get('EN_content');
  const payloadString = formData.get('payload') as string;

  let payload = JSON.parse(payloadString);
  const BN_content = BN_contentRaw ? JSON.parse(BN_contentRaw as string) : {};
  const EN_content = EN_contentRaw ? JSON.parse(EN_contentRaw as string) : {};
  const slug = slugify(name, { lower: true, strict: true });

  console.log(price);
  console.log(discount);
  console.log("thumbnail ",thumbnail);
  console.log("image_gallery ",images_gallery);
  console.log("images_gallery parse ",JSON.parse(images_gallery));
  console.log(payload);
  // console.log(BN_content);
  // console.log(BN_content);
  
  try {
    await connectDB();

    const product_data = {
      name,
      slug,
      price,
      sku,
      status,
      discount,
      description,
      thumbnail,
      images_gallery:JSON.parse(images_gallery),
      dropShop,
      BN_content,
      EN_content,
    } as any;

    if (category_id) {
      product_data['category'] = category_id;
    }
    if (sub_category_id) {
      product_data['sub_category'] = sub_category_id;
    }

    if (payload.sizes.length > 0) {
      product_data['sizes'] = payload.sizes;
    }
    if (payload.colors.length > 0) {
      product_data['colors'] = payload.colors;
    }
    if (payload.variants.length > 0) {
      product_data['variants'] = payload.variants;
    }

    // image gallery url store
    // const imageGalleryUrls: string[] = [];

    // thumbnail image upload process
    // if (thumbnail_img) {
    //   const fileBuffer = await thumbnail_img.arrayBuffer();
    //   const base64String = `data:${thumbnail_img.type};base64,${Buffer.from(
    //     fileBuffer,
    //   ).toString('base64')}`;
    //   const uploadResult = await cloudinary.uploader.upload(base64String, {
    //     folder: `product-image/${slug}/thumbnail`,
    //     transformation: [
    //       {
    //         quality: 'auto',
    //         fetch_format: 'auto',
    //       },
    //     ],
    //   });
    //   product_data['thumbnail'] = uploadResult.secure_url;
    // }

    //image gallery upload process
    // for (const image of image_gallery) {
    //   const fileBuffer = await image.arrayBuffer();
    //   const base64String = `data:${image.type};base64,${Buffer.from(
    //     fileBuffer,
    //   ).toString('base64')}`;
    //   const uploadResult = await cloudinary.uploader.upload(base64String, {
    //     folder: `product-image/${slug}/image_gallery`,
    //     transformation: [
    //       {
    //         quality: 'auto',
    //         fetch_format: 'auto',
    //       },
    //     ],
    //   });
    //   imageGalleryUrls.push(uploadResult.secure_url);
    // }

    // product_data['images_gallery'] = imageGalleryUrls;

    //  product create process
    const product = await Product.create(product_data);

    if (product) {
      return NextResponse.json(
        {
          message: 'Product Create successfully!',
          status: 200,
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json({
        message: 'File to Create Product',
        status: 500,
      });
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
};
