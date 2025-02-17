"use client"
import ManageTabs, { TabsType } from "../_components/ManageTabs";


import AddProduct from "./_components/AddProduct";
import ProductPreview from "./_components/ProductPreview";


 function ProductsPage() {
 

  const tabs: TabsType[] = [
    {
      id: 'add_product',
      label: 'Add Products',
      content: <AddProduct  />,
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