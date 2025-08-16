"use server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("X-User-ID")?.value || null;
    const isLoggedIn = cookieStore.get("isLoggedIn")?.value === "true";
    const currentUser = cookieStore.get("currentUser")?.value || null;
    const userEmail = cookieStore.get("userEmail")?.value || null;
    const userRole = cookieStore.get("userRole")?.value || null;
    const userFullName = cookieStore.get("userFullName")?.value || null;    
    const responseData = {
      isLoginedStatus: isLoggedIn,
      profileInfo: {
        username: currentUser || "",
        email: userEmail || "",
        profileUrl: "",
        id: userId ? parseInt(userId) : undefined,
        first_name: userFullName ? userFullName.split(" ")[0] : "",
        last_name: userFullName ? userFullName.split(" ").slice(1).join(" ") : "",
        role: userRole || "",
        phone_number: null
      }
    };

    return NextResponse.json(responseData);
  } catch (error) {
    return NextResponse.json(
      { error: "Server error while retrieving user data" },
      { status: 500 }
    );
  }
}
