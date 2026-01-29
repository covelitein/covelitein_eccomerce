import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Secret for JWT (same as in your next-auth configuration)
const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // List of private routes
  const protectedRoutes = [
    "/dashboard",
    "/orders",
    "/products",
    "/profile",
    "/wishlist",
    "/checkout",
    "/manage-products",
    "/manage-orders",
    "/manage-categories",
  ];

  // Check if the requested route is protected
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    // Attempt to retrieve the session token
    const session = await getToken({req: request, secret});

    if (!session) {
      // Redirect unauthenticated users to the login page
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname); // Preserve the intended destination
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Apply the middleware to the specified routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/orders/:path*",
    "/products/:path*",
    "/profile/:path*",
    "/wishlist/:path*",
    "/checkout/:path*",
    "/manage-products/:path*",
    "/manage-orders/:path*",
    "/manage-categories/:path*",
  ],
};
