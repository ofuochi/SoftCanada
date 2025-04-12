import { NextResponse, type NextRequest } from "next/server";
import auth0 from "@/lib/auth0";
import { LOGIN_PATH, LOGOUT_PATH } from "./constants/paths";

export async function middleware(request: NextRequest) {
  const authRes = await auth0.middleware(request);
  const { pathname } = request.nextUrl;

  if (pathname === LOGOUT_PATH) {
    const logoutUrl = [
      `${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout?`,
      `client_id=${process.env.AUTH0_CLIENT_ID}`,
      `&returnTo=${encodeURIComponent(
        `${process.env.APP_BASE_URL}/auth/logout`
      )}`,
    ].join("");

    return NextResponse.redirect(logoutUrl);
  }

  // Let Auth0-related routes proceed
  if (request.nextUrl.pathname.startsWith("/auth")) return authRes;

  const session = await auth0.getSession(request);
  if (session) return authRes;

  const callbackUrl = request.nextUrl.pathname + request.nextUrl.search;
  const loginUrl = new URL(LOGIN_PATH, request.url);
  loginUrl.searchParams.set("returnTo", callbackUrl);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*", "/admin/:path*"],
};
