'use client';

import NcInputNumber from '@/components/NcInputNumber';
import useAuthData from '@/hooks/useAuthData';
import useDebounce from '@/hooks/useDebounce';


import { FC } from 'react';

interface QuantityBtnProps {
  className?: string;
  defaultValue: number;
  cartId: string;
}

const QuantityBtn: FC<QuantityBtnProps> = ({ defaultValue = 1, cartId }) => {

  const {cartUpdate:{handleUpdateToCart}} = useAuthData() as any;

  const debounce = useDebounce(async value => {
    try {
      const cart =  handleUpdateToCart(cartId, value);
   
      
    } catch (err: any) {
      throw new Error(err.message);
    }
  }, 500);

  return <NcInputNumber defaultValue={defaultValue} debounce={debounce} />;
};

export default QuantityBtn;
