import { replaceMongoIdInObject } from '@/lib/convertData';
import { User } from '@/model/user-model';

import { connectDB } from '@/services/mongo';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req:any) => {
  try {
    // Extract the ID from the query parameters
    const id = req.nextUrl.searchParams.get('id');
   console.log("user auth id ",id);
   
    if (!id) {
      return NextResponse.json(
        { message: 'You are not authenticated!', status: 400 },
      );
    }

    // Connect to the database
    await connectDB();

    // Find the user by ID, exclude the password field, and return a plain JS object
    const user = await User.findById(id).select('-password').lean() as any;

    if (!user) {
      return NextResponse.json(
        { message: 'User not found!', status: 404 },
       
      );
    }

    // Return the user data after replacing the MongoDB ID
    return NextResponse.json(
      { user: replaceMongoIdInObject(user), message: 'User fetched successfully', status: 200 },
      { status: 200 }
    );
  } catch (err:any) {
    // console.error('Error fetching user:', err);
    return NextResponse.json(
      { message: err.message, status: 500 },
 
    );
  }
};


// export const POST = async (request: NextRequest) => {
//   const {password, ...rest} = await request.json();

//   let createUser = {...rest}
//   console.log("rest ",rest)
//   if(password){ 
//     createUser["password"] = await bcrypt.hash(password, 5);
//   }
  
//   console.log("data user api post route ",rest);
//   console.log("createUser ",createUser);
  
 
//   try {
//     await connectDB();
//     const user = await User.create(createUser);
//     console.log("user in user-auth post ",user);
    
//         const userData: FrontendUserType = {
//           id: user._id.toString(),
//           full_name: user.full_name,
//           provider: user.provider,
//           profilePicture: user.profilePicture,
//           role: user.role,
//         };
//         if (user?.email) {
//           userData['email'] = user.email;
//         }
//         if (user?.phone) {
//           userData['phone'] = user.phone;
//         }
    
//       return NextResponse.json(
//         { message: 'User authenticated successfully', status: 200,user:userData },
//         { status: 200 },
//       );
    
//   } catch (err: any) {
//     return NextResponse.json(
//       { message: err.message, status: 500 },
  
//     );
//   }
// };