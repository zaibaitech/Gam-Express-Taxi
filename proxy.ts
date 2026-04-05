import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  const isLogin = pathname === "/admin/login";
  const hasAuth = request.cookies.get("admin_auth")?.value === "1";

  if (!hasAuth && !isLogin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (hasAuth && isLogin) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
