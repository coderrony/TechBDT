import { Category } from '@/model/category-model';
import { SubCategory } from '@/model/sub-category-model';
import { connectDB } from '@/services/mongo';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import cloudinary from '@/services/cloudinary';

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const file = formData.get('file') as File;

 
    // save data in category schema
    const data: any = { name, category };

    if (file) {
      const fileBuffer = await file.arrayBuffer();
      const base64String = `data:${file.type};base64,${Buffer.from(
        fileBuffer,
      ).toString('base64')}`;
      const uploadResult = await cloudinary.uploader.upload(base64String, {
        folder: `sub-categories-images/${name}`,
        transformation: [
          {
            quality: 'auto',
            fetch_format: 'auto',
          },
        ],
      });

      data['image_url'] = uploadResult.secure_url;
  
    }

    await connectDB();

    const subCategory = await SubCategory.create(data);
   

    if (subCategory) {
      // Add Category to the sub category
      await Category.findByIdAndUpdate(
        category,
        { $push: { sub_categories: subCategory._id } },
        { new: true },
      );
      revalidatePath('/');
      return NextResponse.json(
        { message: 'Sub Category Create Successfully', status: 200 },
        { status: 200 },
      );
    } else {
      return NextResponse.json({
        message: 'fail to Crate Category!',
        status: 500,
      });
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
};
