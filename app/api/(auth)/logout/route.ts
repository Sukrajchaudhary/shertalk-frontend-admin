"use server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  try {
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
      cookieStore.delete({
        name: cookieName,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    });

    return NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Server error during logout" },
      { status: 500 }
    );
  }
}
