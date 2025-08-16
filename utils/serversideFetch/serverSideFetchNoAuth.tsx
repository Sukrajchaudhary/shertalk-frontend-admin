const serverSideFetchNoAuth = async ({
  url,
  method = 'get',
  body,
  debug = false,
  rawResponse = false,
}: {
  url: string;
  method?: 'get' | 'post' | 'put' | 'delete' | 'patch';
  body?: Record<string, any> | null;
  debug?: boolean;
  rawResponse?: boolean;
}) => {
  const fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${url}`;

  try {
    if (debug) {
      console.log('Request sent to URL:', fullUrl);
    }

    const res = await fetch(fullUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // 🔥 disables Next.js caching
      ...(body && { body: JSON.stringify(body) }),
    });

    const data = await res.json();

    if (rawResponse || debug) {
      console.log('Raw Response:', data);
    }

    return {
      status: res.status,
      data,
    };
  } catch (error: any) {
    if (debug) {
      console.error('Unexpected Fetching error', error);
    }

    return {
      status: 500,
      message: error?.message || 'Unexpected error',
    };
  }
};

export { serverSideFetchNoAuth };
