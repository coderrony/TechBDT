import { CategoryAndSubType } from '@/types/CategoryType';
import { FC } from 'react';

interface CategoryPreviewProps {
  className?: string;
  categoriesData: CategoryAndSubType[];
}

const CategoryPreview: FC<CategoryPreviewProps> = ({categoriesData}) => {
  return (
  
    <div className='container mt-5'>
      <h2 className='text-center text-2xl font-semibold'>
        Category And Sub Category Preview
      </h2>
      <div className='max-w-md mx-auto space-y-6'>
        <h2>Contain</h2>
      </div>

  </div>
  );
};

export default CategoryPreview;