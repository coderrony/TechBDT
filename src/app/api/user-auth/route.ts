
import { replaceMongoIdInObject } from '@/lib/convertData';
import { User } from '@/model/user-model';
import cloudinary from '@/services/cloudinary';

import { connectDB } from '@/services/mongo';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: any) => {
  try {
    // Extract the ID from the query parameters
    const id = req.nextUrl.searchParams.get('id');


    if (!id) {
      return NextResponse.json({
        message: 'You are not authenticated!',
        status: 400,
      });
    }

    // Connect to the database
    await connectDB();

    // Find the user by ID, exclude the password field, and return a plain JS object
    const user = (await User.findById(id).select('-password').lean()) as any;

    if (!user) {
      return NextResponse.json({ message: 'User not found!', status: 404 });
    }

    // Return the user data after replacing the MongoDB ID
    return NextResponse.json(
      {
        user: replaceMongoIdInObject(user),
        message: 'User fetched successfully',
        status: 200,
      },
      { status: 200 },
    );
  } catch (err: any) {
    // console.error('Error fetching user:', err);
    return NextResponse.json({ message: err.message, status: 500 });
  }
};

export async function PATCH(request: NextRequest) {
  try {
    const formData = (await request.formData()) as any;

    const full_name = formData.get('full_name') as string;
    const phone = formData.get('phone') as string;
    const avatar = formData.get('avatar') as File;
    const user_id = formData.get('user_id') as string;
    const payloadString = formData.get('additional_mobile') as string;
    const division = formData.get('division') as string;
    const district = formData.get('district') as string;
    const upzila = formData.get('upzila') as string;
    const union = formData.get('union') as string;
    const house = formData.get('house') as string;
    const addressId = formData.get('addressId') as string | boolean;

    let payload = JSON.parse(payloadString);

    await connectDB();

    const user = (await User.findById(user_id)) as any;

    if (!user) {
      return NextResponse.json({ message: 'Unauthorized User', status: 400 });
    }

    const shipping_address = {
      division: division,
      district: district,
      upzila: upzila,
      union: union,
      house: house,
      mobile: payload.additional_mobile,
    };

    user.full_name = full_name;
    if (avatar) {

      const fileBuffer = await avatar.arrayBuffer();
      const base64String = `data:${avatar.type};base64,${Buffer.from(
        fileBuffer,
      ).toString('base64')}`;

      const uploadResult = await cloudinary.uploader.upload(base64String, {
        folder: `profile-picture/${full_name}${user_id}`,
        transformation: [
          {
            quality: 'auto',
            fetch_format: 'auto',
          },
        ],
      });

      user.profilePicture = uploadResult.secure_url;
    }

    if (addressId) {
  

      // update address
      const address = user.address.find(
        (address: any) => address._id == addressId,
      );
      address.division = division;
      address.district = district;
      address.upzila = upzila;
      address.union = union;
      address.house = house;
      address.mobile = payload.additional_mobile;
    } else {
      // new user with address
      if (phone) user.phone = phone;

      user.address.push(shipping_address);
    }
    await user.save();

    return NextResponse.json(
      { message: 'User updated successfully', status: 200 },
      { status: 200 },
    );
  } catch (err: any) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { addressId, userId } = await request.json();
  

    if (!addressId || !userId) {
      return NextResponse.json({
        message: 'You are not Authentication',
        status: 404,
      });
    }

    await connectDB();

    const user = (await User.findById(userId)) as any;

    if (!user) {
      return NextResponse.json({ message: 'Not Authenticate', status: 404 });
    }

    // Filter out the user with the specified addressId from the address array
    const updateUserAddress = user.address.filter(
      (address: any) => address._id.toString() !== addressId,
    );

    // Check if the address was found and removed
    if (updateUserAddress.length === user.address.length) {
      return NextResponse.json({ message: 'Address Not Found', status: 404 });
    }
    user.address = updateUserAddress;
    await user.save();

    return NextResponse.json(
      { message: 'Address  Deleted', status: 200 },
      { status: 200 },
    );
  } catch (err: any) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}
