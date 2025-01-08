"use client"
import { QueryClient } from '@tanstack/react-query';

// export const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: 1, // Retry once on failure
//       refetchOnWindowFocus: false, // Avoid refetching when window gains focus
//       staleTime: 5 * 60 * 1000, // Cache for 5 minutes
//     },
//   },
// });

export const queryClient = new QueryClient();
