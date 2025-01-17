import { Category } from '@/model/category-model';
import { connectDB } from '@/services/mongo';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const name = formData.get('name') as string;

  console.log("post category name ",name);
  
  try {
    await connectDB();
   
  const category = await Category.create({name});

  if(category){ 
    return NextResponse.json(
      { message: 'Category Create Successfully', status: 200 },
      { status: 200 },
    );
  }else{ 
    return NextResponse.json({ message:"fail to Crate Category!", status: 500 });
  }

  } catch (err: any) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
};