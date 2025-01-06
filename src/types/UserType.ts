import { Document } from "mongoose";

// export interface UserType  {
//   id?: string;
//   full_name: string;
//   provider: string;
//   role: string;
//   password?: string;
//   email?: string;
//   phone?: string;
//   profilePicture?: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }




// new 


export interface UserType {
  id:string;
  full_name: string; // Required
  provider: string; // Required
  password?: string | null; // Optional, default is null
  email?: string | null; // Optional, default is null
  phone?: string | null; // Optional, default is null
  role?: 'admin' | 'seller' | 'customer'; // Enum with default 'customer'
  profilePicture: string; // Default URL provided
  createdAt?: Date; // Automatically handled by timestamps
  updatedAt?: Date; // Automatically handled by timestamps
}
