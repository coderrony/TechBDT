



import { Document } from "mongoose";
import mongoose from "mongoose";

export interface MongoDocumentWithId extends Document {
  _id: string;  // _id is expected to be a string after conversion
}

// Recursive function to replace ObjectIds within an object or array
const convertObjectIdToString = (value: any): any => {
  if (value instanceof mongoose.Types.ObjectId) {
    return value.toString();
  }
  if (Array.isArray(value)) {
    return value.map((item) => convertObjectIdToString(item));
  }
  if (value && typeof value === "object") {
    return Object.entries(value).reduce((acc, [key, val]) => {
      acc[key] = convertObjectIdToString(val);
      return acc;
    }, {} as any);
  }
  return value;
};

// export const replaceMongoIdInObject = (obj: MongoDocumentWithId) => {

//   // Create a shallow copy of the object
//   const updatedObj = { ...obj, id: obj._id.toString() } as any;

//   // Remove the _id property
//   delete (updatedObj as any)._id; // Type assertion to bypass TypeScript restriction
//   delete (updatedObj as any).__v; // Type assertion to bypass TypeScript restriction

//   if (updatedObj.createdAt instanceof Date) {
//     updatedObj.createdAt = updatedObj.createdAt.toISOString();
//   }
//   if (updatedObj.updatedAt instanceof Date) {
//     updatedObj.updatedAt = updatedObj.updatedAt.toISOString();
//   }
//   return convertObjectIdToString(updatedObj);
// };

export const replaceMongoIdInObject = (obj: MongoDocumentWithId) => {

  // Create a shallow copy of the object
  const updatedObj = { ...obj, id: obj._id.toString() } as any;

  // Remove the _id property
  delete (updatedObj as any)._id; // Type assertion to bypass TypeScript restriction
  delete (updatedObj as any).__v; // Type assertion to bypass TypeScript restriction

  if (updatedObj.createdAt instanceof Date) {
    updatedObj.createdAt = updatedObj.createdAt.toISOString();
  }
  if (updatedObj.updatedAt instanceof Date) {
    updatedObj.updatedAt = updatedObj.updatedAt.toISOString();
  }
  return convertObjectIdToString(updatedObj);
};

export const replaceMongoIdInArray = (array: MongoDocumentWithId[]) => {
  return array.map((item) => replaceMongoIdInObject(item));
};
// export const replaceMongoIdInArray = (arr: any[] = []) => {
//   if (!Array.isArray(arr)) return []; // Safeguard against non-array values
//   return arr.map(item => {
//     return {
//       ...item,
//       id: item._id || item.id, // Assuming the presence of _id or id field
//     };
//   });
// };
