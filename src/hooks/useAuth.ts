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
        const response = await fetch(`/api/get-user?id=${session?.user?.id}`, {
          method: "GET",
        });
        if (!response.ok) {
          console.error(`HTTP Error: ${response.status}`);
          throw new Error("Failed to fetch user data.");
        }
        const data = await response.json();
        console.log("data", data);
        if (data.status === 200) {
          setGlobalState("userData", data?.user);
        } else {
          setGlobalState("userData", null);
        }
      }
    } catch (err: any) {
      console.error(`Error in useAuth hook: ${err.message}`);
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
