'use client';
import axios from 'axios';

const clientSideFetchNoAuth = async ({
  url,
  method = 'get',
  body,
  debug = false,
  rawResponse = false,
  toast,
  handleLoading,
}: {
  url: string;
  method?: 'get' | 'post' | 'put' | 'delete' | 'patch';
  body?: Record<string, any> | null;
  debug?: boolean;
  rawResponse?: boolean;
  toast: any | 'skip';
  handleLoading?: (status: boolean) => void;
}) => {
  try {
    handleLoading && handleLoading(true);

    const requestOptions: RequestInit = {
      method: method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      requestOptions.body = JSON.stringify(body);
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, requestOptions);

    const data = await res.json();

    if (res.ok) {
      return {
        status: 200,
        data: data,
      };
    } else {
      toast !== 'skip' &&
        toast({
          description: data.error ? data.error : 'Unexpected Error',
          variant: 'destructive',
        });
        
    }
    return res.json()
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast !== 'skip' &&
        toast({
          description: error.response?.data?.message || error.message,
          variant: 'destructive',
        });
    } else {
      toast !== 'skip' &&
        toast({
          title: `Unexpected Error`,
          description: `${error}`,
          variant: 'destructive',
        });
    }
  } finally {
    handleLoading && handleLoading(false);
  }
};

export { clientSideFetchNoAuth };
