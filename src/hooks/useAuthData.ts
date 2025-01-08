'use client';
import { getUserById } from '@/queries/users';
import { useSession } from 'next-auth/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createAddToCart, deleteCart, updateCart } from '@/queries/addToCart';
import { queryClient } from '@/lib/react-query';
import { connectDB } from '@/services/mongo';

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
        await connectDB()
        const result = await getUserById(session.user.id);

        if (result.status === 200) {
          return result.user; // Return user data
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

   // Add product to cart mutation
   const {
    mutate: addToCart,
    isPending: isAdding,
    isError: isAddError,
    isSuccess: isAddSuccess,
  } = useMutation({
    mutationFn: async (addToCartData: any) => {
      await connectDB()
      const result = await createAddToCart(addToCartData);
      console.log("result ",result);
      
      if (result.status !== 200) {
        throw new Error(result.message);
      }
      return result;
    },
    // onSuccess: () => {
    //   console.log('Product added to cart successfully');
    //   refetchAuthData(); // Refetch user data to update cart
    // },
    onSuccess: () => {
      console.log('Product added to cart successfully');
      // refetchAuthData();
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (error: any) => {
      console.error('Failed to add product to cart:', error.message);
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
    mutationFn: async ({ cartId, userId }: { cartId: string; userId: string }) => {
      await connectDB()
      const result = await deleteCart(cartId, userId);
      if (result.status !== 200) {
        throw new Error(result.message);
      }
      return result;
    },
    onSuccess: () => {
      console.log('Product removed from cart successfully');
      // refetch(); // Refetch user data after removing product
      queryClient.invalidateQueries({
        queryKey: ["user"],
      
      });
    },
    onError: (error: any) => {
      console.error('Failed to remove product from cart:', error.message);
    },
  });


     // Update cart item quantity mutation
     const {
      mutate: updateCartItem,
      isPending: isUpdating,
      isError: isUpdateError,
      isSuccess: isUpdateSuccess,
    } = useMutation({
      mutationFn: async ({ cartId, quantity }: { cartId: string; quantity: number }) => {
        await connectDB()
        const result = await updateCart(cartId, quantity);
        if (result.status !== 200) {
          throw new Error(result.message);
        }
        return result;
      },
      onSuccess: () => {
        console.log('Cart item quantity updated successfully');
        refetchAuthData();// Refetch user data to update cart
      },
      onError: (error: any) => {
        console.error('Failed to update cart item quantity:', error.message);
      },
    });
  


    // Function to trigger add to cart mutation
    const handleAddToCart = (productData: any) => {
      if (authData) {
        addToCart({
          ...productData,
          user: authData.id, // Ensure user ID is included
        });
      }
    };
  

  // Function to trigger mutation
  const handleRemoveFromCart = (cartId: string) => {
    if (authData?.id) {
      removeFromCart({ cartId, userId: authData.id });
    }
  };


  // Function to trigger update cart mutation
  const handleUpdateToCart = (cartId: string, quantity: number) => {
     updateCartItem({ cartId, quantity });
  };

  const authDataFetch = { 
    authData: authData ?? null,
    isFetchingAuthData,
    isErrorAuthData,
    refetchAuthData,

  }
  const cartAdd = { 
    isAdding,
    isAddError,
    isAddSuccess,
    handleAddToCart,
  }
  const cartDelete = { 
    isRemoving,
    isRemoveError,
    isRemoveSuccess,
    handleRemoveFromCart,
  }

  const cartUpdate = { 
    isUpdating,
    isUpdateError,
    isUpdateSuccess,
    handleUpdateToCart,
  }

  return {authDataFetch ,cartAdd, cartDelete,cartUpdate };
};

export default useAuthData;
