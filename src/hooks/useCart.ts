"use client"
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
import axios from 'axios';

import useAuthData from './useAuthData';


const useCart = () => {
  const { authData } = useAuthData() as any;

 
 
  // Fetch user data using React Query
  const {
    data: cartData,
    isLoading: isFetchingCart,
    error: isErrorCart,
    refetch: refetchCart,
  } = useQuery({
    queryKey: ['cart', authData?.id], // Query key
    queryFn: async () => {
      if (authData?.id) {
        const result = (await axios.get(`/api/add-to-cart`, {
          params: { id: authData?.id },
        })) as any;
    

        if (result.data.status === 200) {
          return result.data.cart;
        } else {
          // throw new Error('Failed to fetch user data');
          return []
        }
      }
    },
    enabled: !!authData?.id, // Only fetch when user ID exists
    retry: 1, // Retry once if the query fails
    // staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });

  // Add product to cart mutation
  const {
    mutate: addToCart,
    isPending: isAdding,
    isError: isAddError,
    isSuccess: isAddSuccess,
  } = useMutation({
    mutationFn: async (addToCartData: any) => {
      const result = (await axios.post(
        '/api/add-to-cart',
        addToCartData,
      )) as any;


      if (result.data.status !== 200) {
        // throw new Error(result.message);
        return null
      }
      return result;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
    },
  });

  // Remove product from cart mutation
  const {
    mutate: removeFromCart,
    isPending: isRemoving,
    isError: isRemoveError,
    isSuccess: isRemoveSuccess,
    reset,
  } = useMutation({
    mutationFn: async ({
      cartId,
      userId,
    }: {
      cartId: string;
      userId: string;
    }) => {
      const result = (await axios.delete('/api/add-to-cart', {
        data: { cartId, userId },
      })) as any;
    
      if (result.data.status !== 200) {
        // throw new Error(result.message);
        return null
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
    },
  });

  // Update cart item quantity mutation
  const {
    mutate: updateCartQuantity,
    isPending: isUpdating,
    isError: isUpdateError,
    isSuccess: isUpdateSuccess,
  } = useMutation({
    mutationFn: async ({
      cartId,
      userId,
      quantity,
    }: {
      cartId: string;
      userId: string;
      quantity: number;
    }) => {
      const result = (await axios.patch('/api/add-to-cart', {
        data: { cartId, userId, quantity },
      })) as any;

      if (result.data.status !== 200) {
        // throw new Error(result.message);
        return null
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
    },
  });

  // Function to trigger add to cart mutation
  const handleAddToCart = (productData: any) => {
    if (authData?.id) {
      addToCart({
        ...productData,
        user: authData?.id, // Ensure user ID is included
      });
    }
  };

  // Function to trigger product remove in cart mutation
  const handleRemoveFromCart = (cartId: string) => {
    if (authData) {
      removeFromCart({ cartId, userId: authData.id });
    }
  };

  // Function to trigger update cart mutation
  const handleUpdateToCartQuantity = (cartId: string, quantity: number) => {
    if (authData) {
      updateCartQuantity({ cartId, userId: authData?.id, quantity });
    }
  };

  const cartDataFetch = {
    cartData: cartData ?? null,
    isFetchingCart,
    isErrorCart,
    refetchCart,
  };

  const cartAdd = {
    isAdding,
    isAddError,
    isAddSuccess,
    handleAddToCart,
  };

  const cartDelete = {
    isRemoving,
    isRemoveError,
    isRemoveSuccess,
    handleRemoveFromCart,
  };

  const cartUpdate = {
    isUpdating,
    isUpdateError,
    isUpdateSuccess,
    handleUpdateToCartQuantity,
  };

  return { cartAdd, cartDataFetch, cartDelete, cartUpdate };
};

export default useCart;
