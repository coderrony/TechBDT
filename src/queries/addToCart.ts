'use server';

import { AddToCart } from '@/model/add-to-cart-model';
import { User } from '@/model/user-model';
import { auth } from '@/auth';
// import { getUserByPhoneOrEmail } from './users';



export const createAddToCart = async (addToCartData: any) => {

  try {
    const session = await auth();
    if(!session?.user){
      return {
        status: 500,
        message: `User Not Authenticate`,
      };
      // redirect("/login")
    }
    // session user added to addToCartData
    addToCartData["user"] = session.user.id;
    
    // console.log('addToCartData', addToCartData);
      
    const {  quantity, ...rest} = addToCartData;

    const queryData = {user:session.user.id, ...rest}
    // console.log('queryData ', queryData);

    const cartItem = await AddToCart.findOne(queryData);

    // console.log('cartItem ', cartItem);
    if(cartItem){
      cartItem.quantity += addToCartData.quantity;
      await cartItem.save();
      return {
        status: 200,
        message: 'Quantity Update',
      };
    }else{ 
      const addToCart = await AddToCart.create(addToCartData);
      // console.log('addToCart ', addToCart);
      await User.findByIdAndUpdate(
        addToCartData.user,
        { $push: { cart: addToCart._id } },
        { new: true },
      );
      return {
        status: 200,
        message: 'Add To Cart',
      };
    }
    

  } catch (error: any) {
    //  throw new Error(`cart not created: ${error.message}`);
    return {
      status: 500,
      message: `cart not created: ${error.message}`,
    };
  }
};


// export const deleteCart = async(cartId:string,userId:string)=>{ 
//   try {
//     const cart = await AddToCart.findByIdAndDelete(cartId);
//     console.log("deleteCart ", cart);
    
//     return {
//       status: 200,
//       message: 'Cart Deleted',
//     };
//   } catch (error: any) {
//     return {
//       status: 500,
//       message: `cart not deleted: ${error.message}`,
//     };
//   }
// }


export const deleteCart = async (cartId: string, userId: string) => {
  try {
    // Delete the cart from the AddToCart collection
    const cart = await AddToCart.findByIdAndDelete(cartId);
    if (!cart) {
      return {
        status: 404,
        message: 'Cart not found',
      };
    }

    // Remove the cart reference from the user's cart array
    await User.findByIdAndUpdate(
      userId,
      { $pull: { cart: cartId } }, // Pull removes the cartId from the cart array
      { new: true }
    );

    console.log('deleteCart', cart);

    return {
      status: 200,
      message: 'Cart Deleted',
    };
  } catch (error: any) {
    return {
      status: 500,
      message: `Cart not deleted: ${error.message}`,
    };
  }
};


export const updateCart = async (cartId: string, quantity: number) => {
  try {
    const cartItem = await AddToCart.findById(cartId);
    if (cartItem) {
      cartItem.quantity = quantity;
      await cartItem.save();

      return {
        status: 200,
        message: 'Quantity Update',
      };
    }else{ 
      return {
        status: 500,
        message: 'Cart not found',
      };
    }
  } catch (err :any) {
    return{
      status: 500,
      message: `Cart not updated: ${err.message}`,
    }
  }
};