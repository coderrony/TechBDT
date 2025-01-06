

import ManageTabs, { TabsType } from "../_components/ManageTabs";
import AddCategories from "./_components/AddCategory";
import SubCategories from "./_components/SubCategories";
import CategoryPreview from "./_components/CategoryPreview";

import { notFound } from 'next/navigation';
import { getCategoriesWithSubCategories } from "@/queries/categories";

async function CategoryPage() {
  

  const categoryWithSub = await getCategoriesWithSubCategories() || []
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