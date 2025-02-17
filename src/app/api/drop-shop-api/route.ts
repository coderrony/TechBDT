import { replaceMongoIdInArray } from '@/lib/convertData';
import { connectDB } from '@/services/mongo';
import { NextResponse } from 'next/server';
import { DropShop } from '@/model/drop-shop-model';

export const GET = async (req: any) => {
  try {
    // Connect to the database
    await connectDB();

    const dropShop = (await DropShop.find({}).lean()) as any[];
    if (dropShop) {
      return NextResponse.json(
        {
          res_data: replaceMongoIdInArray(dropShop),
          message: 'fetched successfully',
          status: 200,
        },
        { status: 200 },
      );
    }
  } catch (err: any) {
    // console.error('Error fetching user:', err);
    return NextResponse.json({ message: err.message, status: 500 });
  }
};
