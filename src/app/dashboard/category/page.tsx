

import ManageTabs, { TabsType } from "../_components/ManageTabs";
import AddCategories from "./_components/AddCategory";
import SubCategories from "./_components/SubCategories";
import CategoryPreview from "./_components/CategoryPreview";

import { notFound } from 'next/navigation';


async function CategoryPage() {
  

  const categoryWithSub = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/category-api`, {
    cache: 'no-store', // Fetch fresh data
  })
  .then((res) => {
    if (!res.ok) {
      throw new Error('Failed to fetch categories');
    }
    return res.json();
  })
  .then((data) => data.res_data)
  // console.log("categoryWithSub ",categoryWithSub);
  
  
 

    const tabs: TabsType[] = [
      {
        id: 'category',
        label: 'Category',
        content: <AddCategories />,
      },
      {
        id: 'sub-category',
        label: 'Sub category',
        content: <SubCategories categoriesData ={categoryWithSub}/>,
    
      },
     
    ];
  return (
    <div className="w-full">

     <ManageTabs tabs={tabs}/>
    </div>
  );
}

export default CategoryPage;