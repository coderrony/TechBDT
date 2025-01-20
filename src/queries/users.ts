'use server';
// import { auth } from '@/auth';
// import { uploadFileByCloudinary } from '@/lib/cloudinaryFileUpload';
import { replaceMongoIdInObject } from '@/lib/convertData';
// import { AddToCart } from '@/model/add-to-cart-model';
// import { Product } from '@/model/product-model';
// import { Address } from '@/model/user-address-models';
import { User } from '@/model/user-model';
import { connectDB } from '@/services/mongo';
// import { otpSender } from "@/services/bulksmsbd";
import { UserType } from '@/types/UserType';
// import { delay } from '@/utils/delay';
import bcrypt from 'bcrypt';
// import { otpSend } from "./otp-send";
// import { storeOtpInRedis } from "./redisQuery";

export interface FrontendUserType {
  id: string;
  full_name: string;
  provider: string;
  profilePicture: string;
  role: string;
  email?: string;
  phone?: string;
}

export async function newUserCreate(data: UserType) {
  await connectDB();
  try {
    const {password, ...rest} = data;
    console.log("data ",data);
    
      let createUser = {...rest} as any;
      console.log("rest ",rest)
      if(password){ 
        createUser["password"] = await bcrypt.hash(password, 5);
      }
      
    // Implement this function to add a user to your database
    const user = await User.create(createUser);

    // console.log("newUserCreate user" ,user);

    const userData: FrontendUserType = {
      id: user._id.toString(),
      full_name: user.full_name,
      provider: user.provider,
      profilePicture: user.profilePicture,
      role: user.role,
    };
    if (user?.email) {
      userData['email'] = user.email;
    }
    if (user?.phone) {
      userData['phone'] = user.phone;
    }

    return userData;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getUserByEmail(email: string) {
  await connectDB();
  const user = await User.findOne({ email: email }).select('-password').lean();
  // console.log("queries/users 1 ",user);

  if (user === null) {
    return null;
  }

  return replaceMongoIdInObject(user as any);
}

export async function getUserById(userId: string) {
  await connectDB();
  const user = await User.findById(userId).select('-password').lean();
  // console.log("queries/users 1 ",user);

  if (!user) {
    return null;
  }

  return replaceMongoIdInObject(user as any);
}


// export async function getUserById(id: string) {
//   await connectDB()
//   try {

//     const user = (await User.findById(id)
//     .populate({
//       path: 'cart',
//       model: AddToCart,
//       populate: {
//         path: 'product',
//         model: Product,
//       },
//     }).populate({
//       path: 'address',
//       model: Address,
//     })
//     .select('-password')
//     .lean()) as any;

//     return {
//       user: replaceMongoIdInObject(user),
//       message: 'User fetched successfully',
//       status: 200,
//     }
//   } catch (err:any) {
//     return  {
//       message: err.message,
//       status: 400,
//     }
//   }
// }



export async function passwordUpdate(phone: string, newPassword: string) {
  // console.log('phone ', phone);
  // console.log('newPassword ', newPassword);
  await connectDB();
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 5);

    // MongoDB  user password update
    const result = await User.updateOne(
      { phone },
      { password: hashedPassword },
    );

    // console.log("passwordUpdate result ",result);

    // no user found with this phone number
    if (result.matchedCount === 0) {
      return { status: 500, message: 'User not found with this phone number.' };
    }

    return { status: 200, message: 'Password updated successfully.' };
  } catch (err) {
    // console.error("Error updating password:", err);
    return { status: 500, message: 'Failed to update password.' };
  }
}

// export async function otpRequestProcess(phone: string, isRegister: boolean) {
//   await connectDB();
//   try {
//     // const existingUser = await getUserByPhone(phone);
//     const existingUser = await User.findOne({ phone }).lean();

//     // register request phone number already exists
//     if (isRegister && existingUser) {
//       return {
//         status: 400,
//         message: 'An account with this phone number already exists',
//       };
//     }

//     //  forget password request phone number not exists
//     if (!isRegister && !existingUser) {
//       return {
//         status: 400,
//         message: 'An account with this phone number Not exists',
//       };
//     }

//     // get random 4 digit otp
//     const otp = Math.floor(1000 + Math.random() * 9000).toString();

//     return { status: 200, message: 'OTP Sent Successfully', otp };
//   } catch (error: any) {
//     // throw new Error(error.message);
//     return {
//       status: 500,
//       message: error.message,
//     };
//   }
// }

// export async function accountRegistration(formData: any) {
//   const phone = formData.get('phone') as string;
//   const otp = formData.get('otp') as string;
//   const clientOtp = formData.get('client_otp') as string;
//   const full_name = formData.get('full_name') as string;
//   const password = formData.get('password') as string;
//   await connectDB();
//   try {
//     if (!phone || !otp || !clientOtp) {
//       return {
//         status: 400,
//         message: 'Phone number and OTP are required',
//       };
//     }
//     // check otp
//     if (otp !== clientOtp) {
//       await delay(2000);
//       return {
//         status: 400,
//         message: 'Invalid OTP',
//       };
//     }
//     // new user create
//     const passwordHash = await bcrypt.hash(password, 5);
//     const newUser = await newUserCreate({
//       full_name: full_name,
//       provider: 'phone',
//       phone: phone,
//       password: passwordHash,
//     } as any);

//     console.log('newUser ', newUser);

//     return {
//       status: 200,
//       message: 'User authenticated successfully',
//       newUser: newUser,
//     };
//   } catch (error: any) {
//     return {
//       status: 500,
//       message: error.message,
//     };
//   }
// }


// export async function updateAccount(formData: any) {
//   // console.log('updateAccount ', formData);
//   await connectDB()
//   const full_name = formData.get('full_name') as string;
//   const phone = formData.get('phone') as string;
//   const avatar = formData.get('avatar') as File;
//   const user_id = formData.get('user_id') as string;
//   const payloadString = formData.get('additional_mobile') as string;
//   const division = formData.get('division') as string;
//   const district = formData.get('district') as string;
//   const upzila = formData.get('upzila') as string;
//   const union = formData.get('union') as string;
//   const address = formData.get('address') as string;

//   let payload = JSON.parse(payloadString);

//   // console.log("user_id ",user_id);
//   // console.log("avatar ",avatar);
//   // console.log("avatar type",typeof avatar);
//   // console.log("phone ",phone);
//   // console.log("payloadString ",payloadString);
//   try{
    
//   // Step 1: Prepare user data for update
//   const user_data: any = { full_name };
//   if (phone) user_data['phone'] = phone;

//   if (avatar) {
//     const profile_picture = await uploadFileByCloudinary(
//       avatar,
//       `profile-picture/${full_name}`,
//     );
//     user_data['profilePicture'] = profile_picture.secure_url;
//   }

//   // Step 2: Update User model
//   const updatedUser = await User.findByIdAndUpdate(user_id, user_data, {
//     new: true,
//     runValidators: true,
//   });

//   // Step 3: Prepare address data
//   const user_address: any = {
//     user: user_id,
//     division,
//     district,
//     upzila,
//     union,
//     address,
//     mobile:payload.additional_mobile,
//   };


//   // Step 4: Check if address already exists for the user
//   const existingAddress = await Address.findOne({ user: user_id });
//   // console.log("existingAddress ",existingAddress);

//   let addressDoc;
//   if (existingAddress) {
//     // Update existing address
//     addressDoc = await Address.findByIdAndUpdate(existingAddress._id, user_address, {
//       new: true,
//       runValidators: true,
//     });
//   } else {
//     // Create new address
//     addressDoc = new Address(user_address);
//     await addressDoc.save();

//     // Step 5: Push new address to user's address array
//     // updatedUser.address.push(addressDoc._id);
//     updatedUser.address = addressDoc._id;
//     await updatedUser.save();
//   }

//   // console.log('User updated:', updatedUser);
//   // console.log('Address updated/created:', addressDoc);

//   return {
//     status:200,
//     message:"User updated successfully",
//   }

//   }catch(err:any){ 
//     return {
//       status:400,
//       message:err.message,
//     }
//   }
// }
