

 // import { auth } from '@/auth';
 import { replaceMongoIdInObject } from '@/lib/convertData';
 import { AddToCart } from '@/model/add-to-cart-model';
 import { Product } from '@/model/product-model';
 import { Address } from '@/model/user-address-models';
 import { User } from '@/model/user-model';
 import { connectDB } from '@/services/mongo';
 
 import { NextResponse } from 'next/server';
 // import { revalidatePath } from "next/cache";
 export const GET = async (req: any) => {
   try {
     const { searchParams } = new URL(req.url);
     const id = searchParams.get('id'); // Extracting 'id' from query parameters
     console.log("id in route ",id);
     
   
     if (!id) {
       return new NextResponse(
         JSON.stringify({
           message: 'You are not authenticated!',
           status: 400,
         }),
         { status: 400 },
       );
     }
 
     await connectDB();
 
     const user = (await User.findById(id)
       .populate({
         path: 'cart',
         model: AddToCart,
         populate: {
           path: 'product',
           model: Product,
         },
       }).populate({
         path: 'address',
         model: Address,
       })
       .select('-password')
       .lean()) as any;
 
    
     // revalidatePath('/');
     return new NextResponse(
      JSON.stringify({
        user: replaceMongoIdInObject(user),
        message: 'User fetched successfully',
        status: 200,
      }),
      { status: 200 },
    );
    
   } catch (err: any) {
     return new NextResponse(
       JSON.stringify({
         message: err.message,
         status: 400,
       }),
       { status: 400 },
     );
   }
 };
 