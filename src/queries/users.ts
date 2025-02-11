'use server';

import { replaceMongoIdInObject } from '@/lib/convertData';

import { User } from '@/model/user-model';
import { connectDB } from '@/services/mongo';

import { UserType } from '@/types/UserType';

import bcrypt from 'bcrypt';


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

    
      let createUser = {...rest} as any;
  
      if(password){ 
        createUser["password"] = await bcrypt.hash(password, 5);
      }
      
    // Implement this function to add a user to your database
    const user = await User.create(createUser);

   

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
 

  if (user === null) {
    return null;
  }

  return replaceMongoIdInObject(user as any);
}

export async function getUserById(userId: string) {
  await connectDB();
  const user = await User.findById(userId).select('-password').lean();
 

  if (!user) {
    return null;
  }

  return replaceMongoIdInObject(user as any);
}




export async function passwordUpdate(phone: string, newPassword: string) {

  await connectDB();
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 5);

    // MongoDB  user password update
    const result = await User.updateOne(
      { phone },
      { password: hashedPassword },
    );

    

    // no user found with this phone number
    if (result.matchedCount === 0) {
      return { status: 500, message: 'User not found with this phone number.' };
    }

    return { status: 200, message: 'Password updated successfully.' };
  } catch (err) {

    return { status: 500, message: 'Failed to update password.' };
  }
}
