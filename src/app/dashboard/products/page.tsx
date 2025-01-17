
import ManageTabs, { TabsType } from "../_components/ManageTabs";
import AddProduct from "./_components/AddProduct";
import ProductPreview from "./_components/ProductPreview";
import { notFound } from "next/navigation";
import { getDropShops } from "@/queries/dropshop";
import { DropShopType } from "@/types/DropShopType";


async function ProductsPage() {
   const categoriesData = await  fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/category-api`, {
    cache: 'no-store', // Fetch fresh data
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Failed to fetch categories');
      }
      return res.json();
    })
    .then((data) => data.res_data)

   const dropshops = await getDropShops() as DropShopType[];
   
   if(!dropshops) notFound()
  

  const tabs: TabsType[] = [
    {
      id: 'add_product',
      label: 'Add Products',
      content: <AddProduct categoriesData={categoriesData} dropshops={dropshops} />,
    },
    {
      id: 'product_preview',
      label: 'Product Preview',
      content: <ProductPreview />,
    },
   
  ];
  return (
    <div className="w-full">
     <ManageTabs tabs={tabs}/>
    </div>
  );
}

export default ProductsPage;