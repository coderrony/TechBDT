import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

interface PaginationResponse {
  res_data: {
    data: any[];
    nextCursor: string | null;
  };
}

export function usePaginatedItems(
  searchTerm: string,
  filters: Record<string, any>
) {
  return useInfiniteQuery<PaginationResponse, Error>({
    queryKey: ["items", searchTerm, filters], // Cache updates when searchTerm or filters change
    queryFn: async ({ pageParam = null }) => {
      const { data } = await axios.get("/api/product-api", {
        params: {
          cursor: pageParam,
          limit: 10,
          searchTerm,
          ...filters,
        },
      });
      return data;
    },
    getNextPageParam: (lastPage) => lastPage.res_data.nextCursor || null, // Determines next page cursor
    initialPageParam: null, // Adds the initial page parameter (default is null)
  });
}
