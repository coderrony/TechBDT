'use client';
// import { getUserById } from '@/queries/users';
import { useSession } from 'next-auth/react';
import { useMutation, useQuery } from '@tanstack/react-query';
// import { createAddToCart, deleteCart, updateCart } from '@/queries/addToCart';
// import { queryClient } from '@/lib/react-query';
import axios from 'axios';
import { queryClient } from '@/lib/react-query';

const useAuthData = () => {
  const { data: session } = useSession();
// console.log("useAuthData session ",session);

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
        // console.log("useAuthData result ",result.data);
        
        if (result.data.status === 200) {
          return result.data.user; // Access user data from result.data
        } else {
          // throw new Error('Failed to fetch user data');
          return null
        }
      }
    },
    enabled: !!session?.user?.id, // Only fetch when user ID exists
    // staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    staleTime: 0, // Cache data for 0 minutes
    retry: 1, // Retry once if the query fails
  });

    // user address mutation
    // const {
    //   mutate: userAddress,
    //   isPending: isAddressPending,
    //   isError: isAddressError,
    //   isSuccess: isAddressSuccess,
    // } = useMutation({
    //   mutationFn: async ({
    //     cartId,
    //     userId,
    //     quantity,
    //   }: {
    //     cartId: string;
    //     userId: string;
    //     quantity: number;
    //   }) => {
    //     const result = (await axios.patch('/api/add-to-cart', {
    //       data: { cartId, userId, quantity },
    //     })) as any;
  
    //     if (result.data.status !== 200) {
    //       // throw new Error(result.message);
    //       return null
    //     }
    //     return result;
    //   },
    //   onSuccess: () => {
    //     queryClient.invalidateQueries({
    //       queryKey: ['cart'],
    //     });
    //   },
    // });

 
  const authDataFetch = { 
    authData: authData ?? null,
    isFetchingAuthData,
    isErrorAuthData,
    refetchAuthData,
  }
 

  return {authDataFetch};
};

export default useAuthData;
