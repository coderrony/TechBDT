"use client";


import { FC, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '@/context';

interface AuthProviderProps {
  className?: string;
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { data: session } = useSession();

  // Fetch user data using React Query
  const {
    data: authData,
    isLoading: isFetchingAuthData,
    error: isErrorAuthData,
    refetch: refetchAuthData,
  } = useQuery({
    queryKey: ['user', session?.user?.id], // Query key
    queryFn: async () => {
      if (session?.user?.id) {
        const result = await axios.get(`/api/user-auth`, {
          params: { id: session?.user?.id },
        });

        if (result.data.status === 200) {
          return result.data.user; // Return user data
        } else {
          return null;
        }
      }
    },
    enabled: !!session?.user?.id, // Only fetch when user ID exists
    staleTime: 0, // No cache
    retry: 1, // Retry once if the query fails
  });

  // Provide the auth data to the context
  return (
    <AuthContext.Provider
      value={{
        authData,
        isFetchingAuthData,
        isErrorAuthData,
        refetchAuthData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
