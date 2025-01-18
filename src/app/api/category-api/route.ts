import { replaceMongoIdInArray } from '@/lib/convertData';
import { Category } from '@/model/category-model';
import { SubCategory } from '@/model/sub-category-model';
import { connectDB } from '@/services/mongo';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';


export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const name = formData.get('name') as string;

  try {
    await connectDB();

    const category = await Category.create({ name });

    if (category) {
      revalidatePath('/'); // আপনার UI path এখানে দিন
      return NextResponse.json(
        { message: 'Category Create Successfully', status: 200 },
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

export const GET = async (req: any) => {

  try {
    // Connect to the database
    await connectDB();

    const categoriesWithSubCategories = (await Category.find({})
      .populate({
        path: 'sub_categories',
        model: SubCategory,
      })
      .lean()) as any[];

    if (categoriesWithSubCategories) {
      return NextResponse.json(
        {
          res_data: replaceMongoIdInArray(categoriesWithSubCategories),
          message: 'fetched successfully',
          status: 200,
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json({ message: 'Failed to fetch', status: 500 });
    }
  } catch (err: any) {
    // console.error('Error fetching user:', err);
    return NextResponse.json({ message: err.message, status: 500 });
  }
};
