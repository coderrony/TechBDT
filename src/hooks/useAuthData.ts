'use client';
// import { getUserById } from '@/queries/users';
import { useSession } from 'next-auth/react';
import { useMutation, useQuery } from '@tanstack/react-query';
// import { createAddToCart, deleteCart, updateCart } from '@/queries/addToCart';
// import { queryClient } from '@/lib/react-query';
import axios from 'axios';

const useAuthData = () => {
  const { data: session } = useSession();

  // Fetch user data using React Query
  const {
    data: authData,
    isLoading:isFetchingAuthData,
    error:isErrorAuthData,
    refetch:refetchAuthData,
  } = useQuery({
    queryKey: ['user', session?.user?.id], // Query key
    queryFn: async () => {
      if (session?.user?.id) {
        const result = await axios.get(`/api/user-auth`, { params: { id: session?.user?.id } }) as any;
        // console.log("result ",result);
        
        if (result.status === 200) {
          return result.data.user; // Access user data from result.data
        } else {
          throw new Error('Failed to fetch user data');
        }
      }
    },
    enabled: !!session?.user?.id, // Only fetch when user ID exists
    // staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    staleTime: 0, // Cache data for 0 minutes
    retry: 1, // Retry once if the query fails
  });

 
  const authDataFetch = { 
    authData: authData ?? null,
    isFetchingAuthData,
    isErrorAuthData,
    refetchAuthData,
  }
 

  return {authDataFetch};
};

export default useAuthData;
