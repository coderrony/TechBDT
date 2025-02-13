import mongoose from 'mongoose';
import { replaceMongoIdInArray } from '@/lib/convertData';
import { Order } from '@/model/order-model';
import { connectDB } from '@/services/mongo';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: any) => {
  try {
    await connectDB(); // Ensure database connection

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const status = searchParams.get('statusQuery');
    const searchTerm = searchParams.get('searchTerm');

    const query: any = {};

    // Validate if searchTerm is a valid ObjectId
    if (searchTerm) {
      if (mongoose.Types.ObjectId.isValid(searchTerm)) {
        query.$or = [
          { _id: new mongoose.Types.ObjectId(searchTerm) },
          { phone: searchTerm },
        ];
      } else {
        query.phone = searchTerm;
      }
    }

    // Apply status filter if provided
    if (status) {
      query.status = status;
    }

    // If no searchTerm or status, fetch newest orders
    if (!searchTerm && !status) {
      query.createdAt = { $exists: true };
    }

    // Fetch orders with pagination
    const orders = (await Order.find(query)
      .sort({ createdAt: -1 }) // Sort by newest
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()) as any[];

    return NextResponse.json({
      success: true,
      data: replaceMongoIdInArray(orders),
      status: 200,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
};

export async function PATCH(request: NextRequest) {
  const formData = await request.formData();
  // const name = formData.get('name') as string;
  const mobile = [];
  const status = formData.get('status');
  const division = formData.get('division');
  const district = formData.get('district');
  const upzila = formData.get('upzila');
  const union = formData.get('union');
  const house = formData.get('house');
  const mobileNumbers = formData.get('mobileNumbers');
  const orderId = formData.get('orderId');

  if (Number(mobileNumbers) > 0) {
    for (let i = 0; i < Number(mobileNumbers); i++) {
      mobile.push(formData.get(`mobile-${i}`));
    }
  }

  try {
    await connectDB();
    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json({ message: 'Order Not Found', status: 404 });
    }

    order.status = status;
    order.shipping_address = {
      division,
      district,
      upzila,
      union,
      house,
      mobile,
    };
    await order.save();

    return NextResponse.json(
      { message: 'Order update Successfully', status: 200 },
      { status: 200 },
    );
  } catch (err: any) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}
