"use client";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { useQuery } from "@tanstack/react-query";

export interface Profileinfo {
  username: string;
  email: string;
  profileUrl: string;
  id?: number;
  first_name?: string;
  last_name?: string;
  role?: string;
  phone_number?: string | null;
}

interface AuthTypes {
  isLoginedStatus: boolean;
  profileInfo: Profileinfo;
  setIsLoginedStatus: Dispatch<SetStateAction<boolean>>;
  setProfileInfo: Dispatch<SetStateAction<Profileinfo>>;
  isLoading: boolean;
  error: any;
}
// API function to fetch auth data from existing endpoint
const fetchAuthToken = async (): Promise<{
  isLoginedStatus: boolean;
  profileInfo: Profileinfo;
}> => {
  try {
    const response = await fetch("/api/getauthtoken", {
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
        id: data.profileInfo?.id,
        first_name: data.profileInfo?.first_name || "",
        last_name: data.profileInfo?.last_name || "",
        role: data.profileInfo?.role || "",
        phone_number: data.profileInfo?.phone_number,
      },
    };
  } catch (error) {
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
  setIsLoginedStatus: () => {},
  setProfileInfo: () => {},
  isLoading: false,
  error: null,
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
  const {
    data: queryData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["token"],
    queryFn: fetchAuthToken,
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
    setIsLoginedStatus,
    setProfileInfo,
    isLoading,
    error,
  };

  return (
    <authContext.Provider value={contextValue}>{children}</authContext.Provider>
  );
};

export { AuthProvider, useAuthContext };
