import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow requests to /waitlist, API routes, Next.js static files/images, and assets with extensions
  if (
    pathname.startsWith("/waitlist") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Redirect all other paths to /waitlist
  return NextResponse.redirect(new URL("/waitlist", request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     * - waitlist
     */
    "/((?!api|_next/static|_next/image|favicon.ico|waitlist).*)",
  ],
};
