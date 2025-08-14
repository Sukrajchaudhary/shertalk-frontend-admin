"use client"
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useQuery } from "@tanstack/react-query";

export interface Profileinfo {
  username: string;
  email: string;
  profileUrl: string;
}

interface AuthTypes {
  isLoginedStatus: boolean;
  profileInfo: Profileinfo;
}

// API function to fetch auth data
const fetchAuthToken = async (): Promise<{
  isLoginedStatus: boolean;
  profileInfo: Profileinfo;
}> => {
  try {
    const response = await fetch("/gettoken", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      isLoginedStatus: data.isLoginedStatus || false,
      profileInfo: {
        username: data.profileInfo?.username || "",
        email: data.profileInfo?.email || "",
        profileUrl: data.profileInfo?.profileUrl || "",
      },
    };
  } catch (error) {
    console.error("Auth API error:", error);
    throw error;
  }
};

const authContext = createContext<AuthTypes>({
  isLoginedStatus: false,
  profileInfo: {
    username: "",
    email: "",
    profileUrl: "",
  },
});

const useAuthContext = () => {
  return useContext(authContext);
};

interface AuthProviderProps {
  children: ReactNode;
  enableQuery?: boolean;
}

const AuthProvider = ({ children, enableQuery = true }: AuthProviderProps) => {
  const [isLoginedStatus, setIsLoginedStatus] = useState<boolean>(false);
  const [profileInfo, setProfileInfo] = useState<Profileinfo>({
    username: "",
    email: "",
    profileUrl: "",
  });

  // React Query
  const {
    data: queryData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["auth", "token"],
    queryFn: fetchAuthToken,
    enabled: enableQuery,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  // Update state when query succeeds
  useEffect(() => {
    if (queryData) {
      setIsLoginedStatus(queryData.isLoginedStatus);
      setProfileInfo(queryData.profileInfo);
    }
  }, [queryData]);

  const contextValue: AuthTypes = {
    isLoginedStatus,
    profileInfo,
  };

  return (
    <authContext.Provider value={contextValue}>{children}</authContext.Provider>
  );
};

export { AuthProvider, useAuthContext };
