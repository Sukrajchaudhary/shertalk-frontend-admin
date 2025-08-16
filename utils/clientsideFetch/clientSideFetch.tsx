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
    const getLoginUserToken = await axios.post("/api/getUserToken");
    if (!getLoginUserToken?.data?.Xtoken) return;
    handleLoading && handleLoading(true);
    if (debug) {
      console.log(
        "request sent to URL:",
        `${process.env.NEXT_PUBLIC_BASE_URL}${url}`
      );
    }

    const requestOptions: RequestInit = {
      method: method.toUpperCase(),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getLoginUserToken?.data?.Xtoken}`,
      },
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}${url}`,
      requestOptions
    ); // Fixed typo in the URL
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
    if (axios.isAxiosError(error)) {
      if (toast !== "skip") {
        toast({
          title: "Oops !",
          description: error?.response?.data?.message || error.message,
          variant: "destructive",
        });
      }
    } else {
      if (toast !== "skip") {
        toast({
          title: "Unexpected Error",
          description: `${error}`,
          variant: "destructive",
        });
      }
    }
  } finally {
    handleLoading && handleLoading(false);
  }
};

export { clientSideFetch };
