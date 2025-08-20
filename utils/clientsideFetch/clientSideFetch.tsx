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
  body?: Record<string, any> | FormData | null;
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
    handleLoading && handleLoading(true);

    // Prepare headers
    const headers: HeadersInit = {
      Authorization: `Bearer ${token.accessToken}`,
    };
    
    // Don't set Content-Type for FormData (browser will set it with boundary)
    if (!(body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }
    
    const requestOptions: RequestInit = {
      method: method.toUpperCase(),
      headers,
      // Don't stringify FormData
      body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}${url}`,
      requestOptions
    );

    const data = await res.json();

    // Log the response for debugging
    console.log(`API Response (${url}):`, {
      status: res.status,
      data: data
    });
    
    if (res.ok) {
      return {
        status: 200,
        data: data,
      };
    } else {
      // Log the error details
      console.error(`API Error (${url}):`, {
        status: res.status,
        data: data,
        requestBody: body
      });
      
      if (toast !== "skip") {
        toast({
          title: "Oops !",
          description: data?.error || data?.detail || "Unexpected Error",
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
