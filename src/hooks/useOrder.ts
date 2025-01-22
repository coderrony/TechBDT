'use client';

import {  useQuery } from '@tanstack/react-query';

import axios from 'axios';
import useAuthData from './useAuthData';


const useOrder = () => {
  const { authData } = useAuthData() as any;
// console.log("useOrder session ",session);

  // Fetch user data using React Query
  const {
    data: ordersData,
    isLoading:isFetchingOrders,
    error:isErrorOrders,
    refetch:refetchOrders,
  } = useQuery({
    queryKey: ['orders', authData?.id], // Query key
    queryFn: async () => {
      if (authData?.id) {
        const result = await axios.get(`/api/order-api`, { params: { id: authData?.id } }) as any;
        // console.log("useOrder result ",result.data);
        
        if (result.data.status === 200) {
          return result.data.orders; // Access user data from result.data
        } else {
          // throw new Error('Failed to fetch user data');
          return null
        }
      }
    },
    enabled: !!authData?.id, // Only fetch when user ID exists
    // staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    staleTime: 0, // Cache data for 0 minutes
    retry: 1, // Retry once if the query fails
  });


 
  const orderDataFetch = { 
    orderData: ordersData ?? [],
    isFetchingOrders,
    isErrorOrders,
    refetchOrders,
  }
 

  return {orderDataFetch};
};

export default useOrder;
