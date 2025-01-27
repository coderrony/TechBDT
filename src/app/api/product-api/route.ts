import { Product } from "@/model/product-model";
import { connectDB } from "@/services/mongo";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export const GET = async (req: any) => {
  try {
    const { searchParams } = new URL(req.url);

    // Pagination and search term
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const cursor = searchParams.get("cursor");
    const searchTerm = searchParams.get("searchTerm");

    console.log("searchParams ",searchParams);
    

    // Prepare filters
    const filters: Record<string, any> = {};
    searchParams.forEach((value, key) => {
      // Handle array filters like categories[], colors[], sizes[]
      if (key.endsWith("[]")) {
        const filterKey = key.slice(0, -2); // Remove "[]" from key
        if (!filters[filterKey]) filters[filterKey] = [];
        filters[filterKey].push(value);
      } else if (!["limit", "cursor", "searchTerm"].includes(key)) {
        filters[key] = value;
      }
    });

    console.log("Processed Filters:", filters);

    // Connect to the database
    await connectDB();

    // Build query
    let query: Record<string, any> = {};

    // Cursor-based pagination
    if (cursor) {
      query._id = { $gt: new ObjectId(cursor) };
    }

    // Dynamic filters
    if (filters.categories?.length) {
      query.category = { $in: filters.categories }; // Handle multiple categories
    }
    if (filters.subCategories?.length) {
      query.sub_category = { $in: filters.subCategories }; // Handle multiple subCategories
    }
    if (filters.colors?.length) {
      query.colors = { $in: filters.colors }; // Handle multiple colors
    }
    if (filters.sizes?.length) {
      query.sizes = { $in: filters.sizes }; // Handle multiple sizes
    }
    if (filters.priceRange.length > 0) {
      query.price = {
        ...(filters.priceRange[0] ? { $gte: parseFloat(filters.priceRange[0]) } : {}),
        ...(filters.priceRange[1] ? { $lte: parseFloat(filters.priceRange[1]) } : {}),
      };
    }
    if (searchTerm) {
      query.name = { $regex: searchTerm, $options: "i" }; // Case-insensitive search
    }

    console.log("Query Object:", query);

    // Fetch data
    const data = await Product.find(query).sort({ _id: 1 }).limit(limit);

    console.log("data ",data);
    

    return NextResponse.json({
      res_data: {
        data,
        nextCursor: data.length > 0 ? data[data.length - 1]._id : null,
      },
      message: "Products retrieved successfully",
      status: 200,
    });
  } catch (err: any) {
    console.error("Error in GET /api/product-api:", err.message);
    return NextResponse.json({ message: err.message, status: 500 });
  }
};
