import axios from 'axios';

import { NextResponse } from 'next/server';

export const POST = async (req: any) => {
  const data = await req.json();

  try {
    const response = await axios.post(
      `${process.env.UDDOKTAPAY_BASE_URL!}/checkout-v2`,
      data,
      {
        headers: {
          accept: 'application/json',
          'RT-UDDOKTAPAY-API-KEY': process.env.UDDOKTAPAY_API_KEY!,
          'content-type': 'application/json',
        },
      },
    );

    if (response.data.status) {
      return NextResponse.json(
        {
          res_data: response.data,
          message: 'Successfully get payment url',
          status: 200,
        },
        { status: 200 },
      );
    }

    return NextResponse.json({
      res_data: response.data,
      message: 'Error for getting payment',
      status: 500,
    });
  } catch (err: any) {
    console.log('err ', err);
    return NextResponse.json({ message: err.message, status: 500 });
  }
};
