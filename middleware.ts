import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Get cookies for authentication check
  const accessToken = request.cookies.get('xcsrf-at')?.value
  const refreshToken = request.cookies.get('xcsrf-rt')?.value
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true'
  const isAuthenticated = accessToken !== undefined && refreshToken !== undefined && isLoggedIn

  // Define protected routes
  const isDashboardPage = pathname.startsWith('/dashboard')
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/auth')

  // Redirect unauthenticated users from /dashboard/* to /login
  if (isDashboardPage && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect authenticated users from /login/* to /dashboard
  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except static files, images, and favicons
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
