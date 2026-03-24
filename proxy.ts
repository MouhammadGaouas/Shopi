import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  const role = session?.user.role ;
  
  // check if user is in a auth page
  const isAuthPage =
    request.nextUrl.pathname.startsWith("/sign-in") ||
    request.nextUrl.pathname.startsWith("/sign-up");

  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");

  console.log("Session:", session, "Path:", request.nextUrl.pathname);

  //if user in dashboard and not authenticated
  if (!session && isDashboard)
    return NextResponse.redirect(new URL("/sign-in", request.url));

  //if user is authenticated and in  auth page
  if (session && isAuthPage && session.user.role === "ADMIN")
      return NextResponse.redirect(new URL("/dashboard" , request.url))
  else return NextResponse.redirect(new URL("/", request.url))

  
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/sign-up"],
};
