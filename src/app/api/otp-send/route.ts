import { User } from '@/model/user-model';
import { connectDB } from '@/services/mongo';
import axios from 'axios';
import { NextResponse } from 'next/server';

export const GET = async (req: any) => {
  const phone = req.nextUrl.searchParams.get('phone');
  const isRegistration = req.nextUrl.searchParams.get('isRegistration');

  console.log('phone ', phone);
  console.log('isRegistration ', isRegistration);

  try {
    await connectDB();
    const existingUser = await User.findOne({ phone }).lean();

    // register request phone number already exists
    if (isRegistration === 'true' && existingUser) {
      return NextResponse.json(
        {
          message: 'An account with this phone number already exists',
          status: 400,
        },
        { status: 400 },
      );
    }

    //  forget password request phone number not exists
    if (isRegistration === 'false' && !existingUser) {
      return NextResponse.json(
        {
          message: 'An account with this phone number Not exists',
          status: 400,
        },
        { status: 400 },
      );
    }

    // get random 4 digit otp
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const message = encodeURIComponent(
      `(TechBDT.com) Please use code ${otp} to verify your phone number`
    );

    const apiUrl = `http://bulksmsbd.net/api/smsapi?api_key=${process.env.BULKSMSBD_API_KEY}&senderid=${process.env.BULKSMSBD_SENDER_ID}&type=text&number=${phone}&message=${message}`;

    // Use axios GET request with params
    const response = await axios.get(apiUrl);

    console.log('SMS API Response:', response.data);

    return NextResponse.json(
      { message: 'OTP Sent Successfully', status: 200, otp },
      { status: 200 },
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message, status: 500 },
      { status: 500 },
    );
  }
};
