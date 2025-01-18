import { replaceMongoIdInArray } from '@/lib/convertData';
import { connectDB } from '@/services/mongo';
import { NextResponse } from 'next/server';
import { DropShop } from '@/model/drop-shop-model';
import { getUserById } from '@/queries/users';

export const GET = async (req:any) => {
  const userId = req.nextUrl.searchParams.get('id');
  console.log("userId ",userId);
  
  if (!userId) {
    return NextResponse.json({
      message: 'You are not authenticated!',
      status: 400,
    });
  }


  try {
    // Connect to the database
    await connectDB();
    
    const user = await getUserById(userId)
    console.log(user);

    if(user?.role === 'admin'){ 
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
    }
    

    return NextResponse.json({ message: 'Something went wrong',res_data:[], status: 500 });
  
  } catch (err: any) {
    // console.error('Error fetching user:', err);
    return NextResponse.json({ message: err.message, status: 500 });
  }
};


