import { replaceMongoIdInObject } from '@/lib/convertData';
import { AddToCart } from '@/model/add-to-cart-model';
import { connectDB } from '@/services/mongo';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: any) => {
  try {
    // Extract the ID from the query parameters
    const userId = req.nextUrl.searchParams.get('id');

    if (!userId) {
      return NextResponse.json(
        { message: 'You are not authenticated!', status: 400 },
        { status: 400 },
      );
    }

    // Connect to the database
    await connectDB();

    const cart = (await AddToCart.findOne({ user: userId })
      .populate('products.product', 'name slug thumbnail price ') // Populate product with selected fields
      .lean()) as any; // Convert the result to a plain JS object

    if (!cart) {
      return NextResponse.json(
        { message: 'Cart not found!', status: 404 },
        { status: 404 },
      );
    }

    // Return the cart data after replacing the MongoDB ID
    return NextResponse.json(
      {
        cart: replaceMongoIdInObject(cart),
        message: 'Cart fetched successfully',
        status: 200,
      },
      { status: 200 },
    );
  } catch (err: any) {
    // console.error('Error fetching user:', err);
    return NextResponse.json(
      { message: err.message, status: 500 },
      { status: 500 },
    );
  }
};

export const POST = async (request: NextRequest) => {
  const { user, ...queryData } = await request.json();

  try {
    await connectDB();
    const cart = await AddToCart.findOne({ user });
    // console.log('cart ', cart);

    if (!cart) {
      // If no cart exists, create a new one
      const newCart = new AddToCart({
        user: user,
        products: [queryData],
      });

      await newCart.save();
      return NextResponse.json(
        { message: 'Add To Cart', status: 200 },
        { status: 200 },
      );
    } else {
      // check that product is already in the cart
      const productExists = cart.products.find(
        (product: any) =>
          product?.product.toString() === queryData?.product &&
          product?.size === queryData?.size &&
          product?.color === queryData?.color,
      );

      if (productExists) {
        productExists.quantity += queryData.quantity;
      } else {
        cart.products.push(queryData);
      }
      await cart.save();
      return NextResponse.json(
        { message: 'Add To Cart', status: 200 },
        { status: 200 },
      );
    }
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message, status: 500 },
      { status: 500 },
    );
  }
};

export async function DELETE(request: NextRequest) {
  try {
    const { cartId, userId } = await request.json();

    if (!cartId || !userId) {
      return NextResponse.json(
        { message: 'You are not Authentication', status: 404 },
        { status: 404 },
      );
    }

    await connectDB();

    const cart = await AddToCart.findOne({ user: userId });

    if (!cart) {
      return NextResponse.json(
        { message: 'Not Authenticate', status: 404 },
        { status: 404 },
      );
    }

    // Filter out the product with the specified cartId from the products array
    const updateCart = cart.products.filter(
      (product: any) => product._id.toString() !== cartId,
    );

    // Check if the Cart was found and removed
    if (updateCart.length === cart.products.length) {
      return NextResponse.json(
        { message: 'Cart Not Found', status: 404 },
        { status: 404 },
      );
    }
    cart.products = updateCart;
    await cart.save();

    return NextResponse.json(
      { message: 'Cart Deleted', status: 200 },
      { status: 200 },
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message, status: 500 },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const {
      data: { cartId, userId, quantity },
    } = await request.json();

    if (!cartId || !userId || !quantity) {
      return NextResponse.json(
        { message: 'You are not Authentication', status: 404 },
        { status: 404 },
      );
    }

    await connectDB();

    const cart = await AddToCart.findOne({ user: userId });
    if (!cart) {
      return NextResponse.json(
        { message: 'Not Authenticate', status: 404 },
        { status: 404 },
      );
    }

    const productExists = cart.products.find(
      (product: any) => product._id.toString() === cartId,
    );

    if (!productExists) {
      return NextResponse.json(
        { message: 'Product not found in cart', status: 404 },
        { status: 404 },
      );
    }

    productExists.quantity = quantity;
    await cart.save();

    return NextResponse.json(
      { message: 'Quantity Update', status: 200 },
      { status: 200 },
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message, status: 500 },
      { status: 500 },
    );
  }
}
