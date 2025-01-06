import { FC } from 'react';
import { CategoryAndSubType } from '@/types/CategoryType';
import NavigationItem from './NavigationItem';



interface NavigationProps {
  className?: string;
  allCategory: CategoryAndSubType[];

}

const Navigation: FC<NavigationProps> = ({ allCategory }) => {

  return (
    <ul className='nc-Navigation flex items-center'>
      {allCategory.map(item => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}
    </ul>
  );
};

export default Navigation;
