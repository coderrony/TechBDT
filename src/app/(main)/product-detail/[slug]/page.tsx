import { notFound } from "next/navigation";

import ProductDetailComponent from "../ProductDetailComponent";
import { Metadata } from "next";
import { getProductBySlug } from "@/queries/products";

type ProductDetailProps = {
  params: {
    slug: string;
  };
};

// Metadata Function
export async function generateMetadata({
  params: { slug },
}: ProductDetailProps): Promise<Metadata> {
  const product = await getProductBySlug(slug) ;

  if (!product) {
    return {
      title: "Product not found | TechBDT",
      description: "The product you are looking for does not exist.",
      openGraph: {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/product-detail/${slug}`,
        title: "Product not found | TechBDT",
        description: "The product you are looking for does not exist.",
        images: [
          {
            url: "/opengraph-image.png",
            width: 1200,
            height: 630,
            alt: "TechBDT Default Image",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Product not found | TechBDT",
        description: "The product you are looking for does not exist.",
        images: ["/opengraph-image.png"],
      },
    };
  }

  return {
    title: `${product.name} | TechBDT`,
    description: product.description,
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/product-detail/${slug}`,
      type: "article",
      title: `${product.name} | TechBDT`,
      description: product.description,
      images: [
        {
          url: product?.thumbnail || "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@techbdt",
      title: `${product.name} | TechBDT`,
      description: product.description,
      images: [product?.thumbnail || "/opengraph-image.png"],
    },
  };
}

// Main Component
async function ProductDetailPage({ params: { slug } }: ProductDetailProps) {
  try {
    // Fetch product by Slug
    const product = await getProductBySlug(slug);

    
    
    // // If no product is found, trigger a 404 page
    if (!product) {
      notFound();
    }

    return (
      <div>
     
        {/* Render product details */}
        <ProductDetailComponent productInfo={product} />
      </div>
    );
  } catch (error: any) {
    notFound();
  }
}

export default ProductDetailPage;
