import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const useCart = () => {
  const { data: session } = useSession();

  // Fetch user data using React Query
  const {
    data: cartData,
    isLoading: isFetchingCart,
    error: isErrorCart,
    refetch: refetchCart,
  } = useQuery({
    queryKey: ['cart', session?.user?.id], // Query key
    queryFn: async () => {
      if (session?.user?.id) {
        const result = (await axios.get(`/api/add-to-cart`, {
          params: { id: session?.user?.id },
        })) as any;
     console.log("get result ",result.data);

        if (result.data.status === 200) {
          return result.data.cart;
        } else {
          // throw new Error('Failed to fetch user data');
          return []
        }
      }
    },
    enabled: !!session?.user?.id, // Only fetch when user ID exists
    retry: 1, // Retry once if the query fails
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
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

      console.log("post result ",result.data);
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
      console.log("delete result ",result.data);
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
      console.log("patch result ",result.data);
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
    if (session?.user?.id) {
      addToCart({
        ...productData,
        user: session?.user?.id, // Ensure user ID is included
      });
    }
  };

  // Function to trigger product remove in cart mutation
  const handleRemoveFromCart = (cartId: string) => {
    if (session?.user) {
      removeFromCart({ cartId, userId: session?.user?.id });
    }
  };

  // Function to trigger update cart mutation
  const handleUpdateToCartQuantity = (cartId: string, quantity: number) => {
    if (session?.user) {
      updateCartQuantity({ cartId, userId: session?.user?.id, quantity });
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
