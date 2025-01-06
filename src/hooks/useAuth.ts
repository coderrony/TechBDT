"use client";
import { useSession } from "next-auth/react";
import { useEffect, useCallback } from "react";
import { createGlobalState } from "react-hooks-global-state";

// Create global state
const { useGlobalState, setGlobalState } = createGlobalState({
  userData: null, // Holds user data
});

const useAuth = () => {
  const [userData] = useGlobalState("userData"); // Access global state
  const { data: session } = useSession();

  console.log("useAuth userData", userData);
  console.log("useAuth session", session);
 
  // Memoized fetch function
  const fetchMe = useCallback(async () => {
    try {
      if (session?.user?.id) {
        console.log("Fetching user data...1111111111111111111111111111");
        
        const response = await fetch(`/api/get-user?id=${session?.user?.id}`, {
          method: "GET",
        });

        const data = await response.json();
        console.log("data", data);

        if (data.status === 200) {
          setGlobalState("userData", data?.user);
        } else {
          setGlobalState("userData", null);
        }
      }
    } catch (err: any) {
      console.log(`Error in useAuth hook: ${err.message}`);
      throw new Error(err.message);
    }
  }, [session?.user?.id]);

  useEffect(() => {
    if (session?.user) {
      fetchMe();
      //
    }
  }, [fetchMe]);

  return { userData, fetchMe };
};

export default useAuth;
