import { Product } from "@/model/product-model";
import { connectDB } from "@/services/mongo";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import cloudinary from "@/services/cloudinary";

export const POST = async (request: NextRequest) => {
  try {
    await connectDB();

    const formData = await request.formData();
    const name = formData.get('name') as string;
    const category = formData.get('category');
    const sub_category = formData.get('sub_category');
    const price = Number(formData.get('price')) || 0;
    const sku = formData.get('sku') as string;
    const status = formData.get('status') as string;
    const discount = Number(formData.get('discount')) || 0;
    const description = formData.get('description') as string;
    const dropShop = formData.get('dropshop') as string;

    const BN_contentRaw = formData.get('BN_content');
    const EN_contentRaw = formData.get('EN_content');
    const payloadString = formData.get('payload') as any;

    let payload = payloadString ? JSON.parse(payloadString) : {};
    const BN_content = BN_contentRaw ? JSON.parse(BN_contentRaw as string) : {};
    const EN_content = EN_contentRaw ? JSON.parse(EN_contentRaw as string) : {};

    const slug = slugify(name, { lower: true, strict: true });

    // Cloudinary Upload Function
    const uploadToCloudinary = async (file: File, folder: string) => {
      const fileBuffer = await file.arrayBuffer();
      const base64String = `data:${file.type};base64,${Buffer.from(fileBuffer).toString('base64')}`;
      const uploadResult = await cloudinary.uploader.upload(base64String, {
        folder: folder,
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      });
      return uploadResult.secure_url;
    };

    // ✅ Upload Thumbnail
    let thumbnailUrl = "";
    const thumbnail = formData.get('thumbnail') as File;
    if (thumbnail) {
      // thumbnailUrl = await uploadToCloudinary(thumbnail, `products/${name}/thumbnail`);
      thumbnailUrl = await uploadToCloudinary(thumbnail, `product-image/${name.replaceAll(' ', '-')}/thumbnail`);
    }

    // ✅ Upload Gallery Images
    const gallery = formData.getAll('gallery') as File[];
    let galleryUrls: string[] = [];
    if (gallery.length > 0) {
      // const uploadPromises = gallery.map((file) => uploadToCloudinary(file, `products/${name}/gallery`));
      const uploadPromises = gallery.map((file) => uploadToCloudinary(file, `product-image/${name.replaceAll(' ', '-')}/image_gallery`));
      galleryUrls = await Promise.all(uploadPromises);
    }

    // ✅ Product Data Object
    const product_data: any = {
      name,
      slug,
      price,
      sku,
      status,
      discount,
      description,
      thumbnail: thumbnailUrl, // Uploaded thumbnail URL
      images_gallery: galleryUrls, // Uploaded gallery images URLs
      dropShop,
      BN_content,
      EN_content,
    };

    if (category) product_data['category'] = category;
    if (sub_category) product_data['sub_category'] = sub_category;
    if (payload.sizes?.length > 0) product_data['sizes'] = payload.sizes;
    if (payload.colors?.length > 0) product_data['colors'] = payload.colors;
    if (payload.variants?.length > 0) product_data['variants'] = payload.variants;

    // ✅ Save Product to Database
    const product = await Product.create(product_data);

    if (product) {
      return NextResponse.json({ message: 'Product Created successfully!', status: 200 });
    } else {
      return NextResponse.json({ message: 'Error: Failed to Create Product', status: 500 });
    }

  } catch (err: any) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
};
