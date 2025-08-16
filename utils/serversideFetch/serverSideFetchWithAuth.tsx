import { cookies } from "next/headers";
const serverSideFetchWithAuth = async ({
  url,
  method = "get",
  body,
  debug = false,
  rawResponse = false,
}: {
  url: string;
  method?: "get" | "post" | "put" | "delete" | "patch";
  body?: Record<string, any> | null;
  debug?: boolean;
  rawResponse?: boolean;
}) => {
  const fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${url}`;
  const cookieStore = await cookies();
  const token = cookieStore.get("xcsrf-at")?.value;

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const res = await fetch(fullUrl, {
      method,
      headers,
      cache: "no-store",
      ...(body && { body: JSON.stringify(body) }),
    });

    const data = await res.json();
    return {
      status: res.status,
      data,
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error?.message || "Unexpected error",
    };
  }
};

export { serverSideFetchWithAuth };
