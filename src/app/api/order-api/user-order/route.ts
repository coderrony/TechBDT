import { replaceMongoIdInArray } from '@/lib/convertData';
import { AddToCart } from '@/model/add-to-cart-model';
import { Order } from '@/model/order-model';
import { Product } from '@/model/product-model';
import { connectDB } from '@/services/mongo';
import axios from 'axios';

import { NextResponse } from 'next/server';

export const GET = async (req: any) => {
  try {
    // Extract the ID from the query parameters
    const userId = req.nextUrl.searchParams.get('id');

    if (!userId) {
      return NextResponse.json({
        message: 'You are not authenticated!',
        status: 400,
      });
    }
    await connectDB()

    const orders = (await Order.find({ user: userId })
      .sort({ _id: -1 })
      .limit(5)
      .lean()) as any;

  
    if (!orders) {
      return NextResponse.json({ message: 'Orders not found!', status: 404 });
    }

    // Return the cart data after replacing the MongoDB ID
    return NextResponse.json(
      {
        orders: replaceMongoIdInArray(orders),
        message: 'Orders fetched successfully',
        status: 200,
      },
      { status: 200 },
    );
  } catch (err: any) {
    // console.error('Error fetching user:', err);
    return NextResponse.json({ message: err.message, status: 500 });
  }
};

export const POST = async (req: any) => {
  const data = await req.json();


  try {
    const response = await axios.post(
      `${process.env.UDDOKTAPAY_BASE_URL!}/verify-payment`,
      data,
      {
        headers: {
          accept: 'application/json',
          'RT-UDDOKTAPAY-API-KEY': process.env.UDDOKTAPAY_API_KEY!,
          'content-type': 'application/json',
        },
      },
    );

    const result = response.data;
   

    if (result.status === 'COMPLETED' || result.status === 'PENDING') {
      await connectDB();
      const amount = Number(result.amount);
      const {
        user_id,
        full_name,
        delivery_type,
        phone,
        shipping_cost,
        subtotal,
        shipping_address,
      } = result.metadata;
      // const cart = await AddToCart.findOne({ user:user_id });

      const isExistOrder = (await Order.findOne({
        user: user_id,
        transaction_id: result.transaction_id,
        // sender_number: result.sender_number,
      })) as any;

  
      if (isExistOrder) {
        return NextResponse.json({
          message: 'Order already exist',
          status: 409,
        });
      } else {
        const cart = (await AddToCart.findOne({ user: user_id })
          .populate({
            path: 'products.product',
            model: Product,
            select: 'name slug price sku quantity dropShop color size',
          })
          .lean()) as any;



        const products = cart.products.map((item: any) => {
          return {
            product_name: item.product.name,
            slug: item.product.slug,
            price: item.product.price,
            sku: item.product.sku,
            dropShop: item.product.dropShop,
            quantity: item.quantity,

            ...(item.color ? { color: item.color } : {}), // Include `color` only if it has a value
            ...(item.size ? { size: item.size } : {}),
          };
        });

   

        const order = new Order({
          user: user_id,
          full_name,
          delivery_type,
          phone,
          shipping_cost,
          payment_method: result.payment_method,

          subtotal,
          paid: amount,
          due_payment:
            subtotal + shipping_cost === amount
              ? 0
              : subtotal + shipping_cost - amount,
          transaction_id: result.transaction_id,
          invoice_id: result.invoice_id,
          sender_number: result.sender_number,
          date: result.date,
          status: result.status === 'PENDING' ? 'PENDING' : 'PROCESSING',
          shipping_address,
          products,
        });
        await order.save();
        return NextResponse.json(
          {
            message: 'Successfully Place Order',
            status: result.status === 'PENDING' ? 200 : 202,
          },
          { status: 200 },
        );
      }
    }
    return NextResponse.json({ message: 'Request Failed', status: 500 });
  } catch (err: any) {
   
    return NextResponse.json({ message: err.message, status: 500 });
  }
};
