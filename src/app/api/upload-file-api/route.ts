import cloudinary from "@/services/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();

    const path = formData.get("path") as string;
    const file = formData.get("file") as File;
    const gallery = formData.getAll("gallery") as File[];

    // console.log("path ", path);
    // console.log("file ", file);
    // console.log("gallery ", gallery);

    if (gallery.length > 0) {
   
      const imageGalleryUrls: string[] = [];

      for (const image of gallery) {
        const fileBuffer = await image.arrayBuffer();
        const base64String = `data:${image.type};base64,${Buffer.from(
          fileBuffer
        ).toString("base64")}`;

        const uploadResult = await cloudinary.uploader.upload(base64String, {
          folder: path,
          transformation: [
            {
              quality: "auto",
              fetch_format: "auto",
            },
          ],
        });

        imageGalleryUrls.push(uploadResult.secure_url);
      }

      // Return the array of URLs properly
      return NextResponse.json(
        {
          message: "Multiple file upload successful",
          res_data: imageGalleryUrls, // This ensures the array is returned correctly
          status: 200,
        },
        { status: 200 }
      );
    } else {
      const fileBuffer = await file.arrayBuffer();
      const base64String = `data:${file.type};base64,${Buffer.from(
        fileBuffer
      ).toString("base64")}`;
      const uploadResult = await cloudinary.uploader.upload(base64String, {
        folder: path,
        transformation: [
          {
            quality: "auto",
            fetch_format: "auto",
          },
        ],
      });

      return NextResponse.json(
        {
          message: "File upload successful",
          res_data: uploadResult.secure_url,
          status: 200,
        },
        { status: 200 }
      );
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
};
