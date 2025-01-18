
import { TabsType } from "../_components/ManageTabs";

import dynamic from "next/dynamic";
import { auth } from '@/auth';
const ManageTabs = dynamic(() => import('../_components/ManageTabs'), { ssr: true });
const AddProduct = dynamic(() => import('./_components/AddProduct'), { ssr: true });
const ProductPreview = dynamic(() => import('./_components/ProductPreview'), { ssr: true });

async function ProductsPage() {
    const session = await auth();

    const [categoriesData,dropshops ] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/category-api`, {
        cache: 'no-store', // Fetch fresh data
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch categories');
          }
          return res.json();
        })
        .then((data) => data.res_data),

        fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/drop-shop-api?id=${session?.user?.id}`, {
          cache: 'no-store', // Fetch fresh data
        },)
          .then((res) => {
            if (!res.ok) {
              throw new Error('Failed to fetch DropShop');
            }
            return res.json();
          })
          .then((data) => data.res_data),
    ]);


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