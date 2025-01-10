'use client';

import NcInputNumber from '@/components/NcInputNumber';
// import useAuthData from '@/hooks/useAuthData';
import useCart from '@/hooks/useCart';
import useDebounce from '@/hooks/useDebounce';


import { FC } from 'react';

interface QuantityBtnProps {
  className?: string;
  defaultValue: number;
  cartId: string;
}

const QuantityBtn: FC<QuantityBtnProps> = ({ defaultValue = 1, cartId }) => {

  // const {cartUpdate:{handleUpdateToCart}} = useAuthData() as any;
  const {cartUpdate:{handleUpdateToCartQuantity}} = useCart() as any;

  const debounce = useDebounce(async value => {
    try {
      const cart =  handleUpdateToCartQuantity(cartId, value);
   
      
    } catch (err: any) {
      throw new Error(err.message);
    }
  }, 300);

  return <NcInputNumber defaultValue={defaultValue} debounce={debounce} />;
};

export default QuantityBtn;
