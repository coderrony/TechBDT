"use client"
import { getUserById } from "@/queries/users";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";



const useAuth = () => {
  const { data: session } = useSession();

  // Fetch user data using React Query
  // const { data: userData, isLoading, error, refetch:fetchMe } = useQuery({
  //   queryKey: ["user", session?.user?.id], // Query key
  //   queryFn: async () => {
  //     if (session?.user?.id){ 
  //       const result = await getUserById(session.user.id);

  //       if (result.status === 200) {
  //         return result.user; // Return user data
  //       } else {
  //         throw new Error("Failed to fetch user data");
  //       }
  //     }
     
  //   },
  //   enabled: !!session?.user?.id, // Only fetch when user ID exists
  //   staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  //   retry: 1, // Retry once if the query fails
 
  // });

  // Re-fetch user data when session changes
  // useEffect(() => {
  //   if (session?.user?.id) {
  //     fetchMe();
  //   }
  // }, [session?.user?.id, fetchMe]);



  // console.log("userData ",userData);
  // console.log("session ",session);
  
  
  return { userData:null,  fetchMe:()=> {} };
};

export default useAuth;
