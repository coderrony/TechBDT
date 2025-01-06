import { getCategoriesWithSubCategories } from "@/queries/categories";
import ManageTabs, { TabsType } from "../_components/ManageTabs";

import AddProduct from "./_components/AddProduct";
import ProductPreview from "./_components/ProductPreview";
import { notFound } from "next/navigation";
import { getDropShops } from "@/queries/dropshop";
import { DropShopType } from "@/types/DropShopType";
import { CategoryAndSubType } from "@/types/CategoryType";


async function ProductsPage() {
   const categoriesData = await getCategoriesWithSubCategories() as CategoryAndSubType[] || [];
   const dropshops = await getDropShops() as DropShopType[];
   
  //  console.log("dropshops ",dropshops);
   
  
    // console.log("product ",product[0]);
    
  //  console.log(" dropshops ",dropshops)
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