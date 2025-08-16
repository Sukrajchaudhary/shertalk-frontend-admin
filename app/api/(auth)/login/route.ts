"use server";
import { addDays } from "date-fns";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const body = await request.json();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login/admin/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (res.ok) {
      const refreshToken = data.refresh;
      console.log("refreshToken", refreshToken);
      const accessToken = data.access;
      const userDetails = data.details;
      const expiresAt = data.ExpiresAt
        ? new Date(data.ExpiresAt + " UTC")
        : addDays(new Date(), 3);
      const cookieStore = await cookies();
      if (refreshToken) {
        cookieStore.set({
          name: "xcsrf-rt",
          value: refreshToken,
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
          path: "/",
          expires: expiresAt,
        });
      }
      if (accessToken) {
        cookieStore.set({
          name: "xcsrf-at",
          value: accessToken,
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
          path: "/",
          expires: expiresAt,
        });
      }
      cookieStore.set({
        name: "X-User-ID",
        value: userDetails.id.toString(),
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        expires: expiresAt,
      });
      cookieStore.set({
        name: "isLoggedIn",
        value: "true",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        expires: expiresAt,
      });
      cookieStore.set({
        name: "currentUser",
        value: userDetails.username,
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        expires: expiresAt,
      });
      if (userDetails.email) {
        cookieStore.set({
          name: "userEmail",
          value: userDetails.email,
          httpOnly: false,
          secure: process.env.NODE_ENV === "production",
          path: "/",
          expires: expiresAt,
        });
      }
      cookieStore.set({
        name: "userRole",
        value: userDetails.role,
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        expires: expiresAt,
      });
      const fullName =
        `${userDetails.first_name} ${userDetails.last_name}`.trim();
      if (fullName) {
        cookieStore.set({
          name: "userFullName",
          value: fullName,
          httpOnly: false,
          secure: process.env.NODE_ENV === "production",
          path: "/",
          expires: expiresAt,
        });
      }
      cookieStore.set({
        name: "tokenExpiresAt",
        value: expiresAt.toISOString(),
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        expires: expiresAt,
      });
      return NextResponse.json(data);
    } else {
      return NextResponse.json(data, { status: res.status });
    }
  } catch (error) {
    const cookieStore = await cookies();
    const authCookies = [
      "xcsrf-rt",
      "xcsrf-at",
      "X-User-ID",
      "isLoggedIn",
      "currentUser",
      "userEmail",
      "userRole",
      "userFullName",
      "tokenExpiresAt",
    ];

    authCookies.forEach((cookieName) => {
      cookieStore.delete({ name: cookieName });
    });
    return NextResponse.json(
      { error: "Server error during login" },
      { status: 500 }
    );
  }
}
