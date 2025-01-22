'use client';

import { useContext } from 'react';
import { AuthContext } from '@/context';


const useAuthData = () => {
  return useContext(AuthContext);  
  // {
  //   authData,
  //   isFetchingAuthData,
  //   isErrorAuthData,
  //   refetchAuthData,
  // }
};

export default useAuthData;
