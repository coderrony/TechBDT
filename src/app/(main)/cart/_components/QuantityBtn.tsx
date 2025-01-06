'use client';

import NcInputNumber from '@/components/NcInputNumber';
import useAuth from '@/hooks/useAuth';
import useDebounce from '@/hooks/useDebounce';
import { updateCart } from '@/queries/addToCart';

import { FC } from 'react';

interface QuantityBtnProps {
  className?: string;
  defaultValue: number;
  cartId: string;
}

const QuantityBtn: FC<QuantityBtnProps> = ({ defaultValue = 1, cartId }) => {
  const { fetchMe } = useAuth();
  const debounce = useDebounce(async value => {
    try {
      const cart = await updateCart(cartId, value);
      if (cart.status === 200) {
        fetchMe();
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }, 500);

  return <NcInputNumber defaultValue={defaultValue} debounce={debounce} />;
};

export default QuantityBtn;
