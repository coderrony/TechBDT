
import { createContext } from 'react';

// Define the type for the AuthContext value
interface AuthContextType {
  authData: any;
  isFetchingAuthData: boolean;
  isErrorAuthData: Error | null;
  refetchAuthData: (options?: any) => Promise<any>;
}

// Initialize the context with a default value (can be null or a default object)
export const AuthContext = createContext<AuthContextType | null>(null);

export const ProductCacheContext = createContext<any>(null);
