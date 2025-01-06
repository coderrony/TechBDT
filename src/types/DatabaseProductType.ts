

export interface DateBaseProductType {
  id?: string; // string for the primary key
  name: string; // Product name is required
  price: number; // Product price (integer)
  description: string; // Product description (text)
  thumbnail: string; // Thumbnail URL or path
  product_role?: string; // product role can be 'active' or 'inactive' (enum-like)
  category_id: string | null; // Category ID is nullable
  sub_category_id: string | null; // Sub-category ID is nullable
  stock: number | null; // Stock quantity is nullable
  discount: number | null; // Discount percentage is nullable
  created_at: string; // Timestamp (ISO 8601 format)
}
