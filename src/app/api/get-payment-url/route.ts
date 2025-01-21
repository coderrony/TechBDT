import axios from 'axios';

import { NextResponse } from 'next/server';

export const POST = async (req: any) => {
  const data = await req.json();
  console.log("data in post ",data);
  // console.log(process.env.NEXT_PUBLIC_SITE_URL);
  // console.log(process.env.NEXT_PUBLIC_UDDOKTAPAY_API_KEY);
  
  try {
    const response = await axios.post(`${process.env.UDDOKTAPAY_BASE_URL!}/checkout-v2`,
      data,
      {
        headers: {
          accept: 'application/json',
          'RT-UDDOKTAPAY-API-KEY': process.env.UDDOKTAPAY_API_KEY!,
          'content-type': 'application/json',
        },
      },
    );

    // console.log('response in get-payment-url ', response);

    if(response.data.status) {
      return NextResponse.json(
        {
          res_data: response.data,
          message: 'Successfully get payment url',
          status: 200,
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        res_data: response.data,
        message: 'Error for getting payment',
        status: 500,
      },

    );
  } catch (err: any) {
    // console.log("err ",err)
    return NextResponse.json({ message: err.message, status: 500 });
  }
};
