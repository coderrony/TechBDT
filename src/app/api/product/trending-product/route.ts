import { NextResponse } from 'next/server';

import { connectDB } from '@/services/mongo';
import { Product } from '@/model/product-model';
import { replaceMongoIdInArray } from '@/lib/convertData';

export async function GET(req:any) {
  const size = req.nextUrl.searchParams.get('size') ;
 
  try {
    connectDB()

    // Randomly 16 products fetch with aggregation
    const products = await Product
      .aggregate([
        { $sample: { size:Number(size) } }, // Randomly select 16 products
        // { $project: { _id: 1, name: 1, thumbnail: 1, price: 1 } } // Optimize response size
      ]) as any;

      // console.log("products ",products);
  

    return NextResponse.json({ products:replaceMongoIdInArray(products) });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}



// export async function GET() {
//   try {
//     await connectDB()

//     // Fetch 16 random products
//     const products = await Product
//       .aggregate([
//         { $sample: { size: 16 } }, 
//         { $project: { _id: 1, name: 1, thumbnail: 1, price: 1 } }
//       ])
   

//     return NextResponse.json({ products });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
//   }
// }
