import { replaceMongoIdInObject } from '@/lib/convertData';
import { User } from '@/model/user-model';
import { connectDB } from '@/services/mongo';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req:any) => {
  try {
    // Extract the ID from the query parameters
    const id = req.nextUrl.searchParams.get('id');
  //  console.log("id ",id);
   
    if (!id) {
      return NextResponse.json(
        { message: 'You are not authenticated!', status: 400 },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectDB();

    // Find the user by ID, exclude the password field, and return a plain JS object
    const user = await User.findById(id).select('-password').lean() as any;

    if (!user) {
      return NextResponse.json(
        { message: 'User not found!', status: 404 },
        { status: 404 }
      );
    }

    // Return the user data after replacing the MongoDB ID
    return NextResponse.json(
      { user: replaceMongoIdInObject(user), message: 'User fetched successfully', status: 200 },
      { status: 200 }
    );
  } catch (err:any) {
    // console.error('Error fetching user:', err);
    return NextResponse.json(
      { message: err.message, status: 500 },
      { status: 500 }
    );
  }
};


export const POST = async (request: NextRequest) => {
  const data = await request.json();

  console.log("data user api post route ",data);
  

  try {
    await connectDB();
 
      return NextResponse.json(
        { message: 'Add To Cart', status: 200 },
        { status: 200 },
      );
    
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message, status: 500 },
      { status: 500 },
    );
  }
};