"use client"

import {useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useCategory = () => {
  // Fetch Category data using React Query
  const {
    data: categoryData,
    isLoading: isFetchingCategory,
    error: isErrorCategory,
    refetch: refetchCategory,
  } = useQuery({
    queryKey: ['category'], // Query key
    queryFn: async () => {
      try {
        const result = await axios.get(`/api/category-api`);

        console.log("useCategory result ", result.data);

        if (result?.data?.status === 200) {
          return result.data.res_data; // Access category data
        } else {
          throw new Error(result?.data?.message || 'Failed to fetch category data');
        }
      } catch (error) {
        console.error('Error fetching category data:', error);
        // Return an empty array or default value in case of error
        return [];
      }
    },
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    retry: 1, // Retry once if the query fails
  });

  const categoryDataFetch = {
    categoryData: categoryData ?? [],
    isFetchingCategory,
    isErrorCategory,
    refetchCategory,
  };

  return { categoryDataFetch };
};

export default useCategory;
