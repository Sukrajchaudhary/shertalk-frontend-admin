"use client";
import axios from "axios";

const clientSideFetch = async ({
  url,
  method = "get",
  body,
  debug = false,
  rawResponse = false,
  toast,
  handleLoading,
}: {
  url: string;
  method?: "get" | "post" | "put" | "delete" | "patch";
  body?: Record<string, any> | null;
  debug?: boolean;
  rawResponse?: boolean;
  toast: any;
  handleLoading?: (status: boolean) => void;
}) => {
  try {
    // Get user token
    const getToken = async () => {
      try {
        const response = await fetch("/api/getauthtoken");
        if (!response.ok) {
          return null; 
        }
        const data = await response.json();
        return data|| null;
      } catch (error) {
        return null;
      }
    };

    const token = await getToken();
    if (!token?.accessToken) return;
    console.log("access token", token);
    handleLoading && handleLoading(true);

    const requestOptions: RequestInit = {
      method: method.toUpperCase(),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.accessToken}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}${url}`,
      requestOptions
    );

    const data = await res.json();

    if (res.ok) {
      return {
        status: 200,
        data: data,
      };
    } else {
      if (toast !== "skip") {
        toast({
          title: "Oops !",
          description: data?.error || "Unexpected Error",
          variant: "destructive",
        });
      }
      return {
        status: res.status,
        data: data,
      };
    }
  } catch (error) {
    if (toast !== "skip") {
      toast({
        title: "Unexpected Error",
        description: `${error}`,
        variant: "destructive",
      });
    }
  } finally {
    handleLoading && handleLoading(false);
  }
};

export { clientSideFetch };
