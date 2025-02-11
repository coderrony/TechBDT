'use client';

import { useContext } from 'react';
import { AuthContext } from '@/context';


const useAuthData = () => {
  return useContext(AuthContext);  

};

export default useAuthData;
