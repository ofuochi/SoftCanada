// lib/auth0.ts
import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { jwtDecode } from "jwt-decode";
import { UserRoleKey } from "@/lib/abilities";
import { NextResponse } from "next/server";

export default new Auth0Client({
  async beforeSessionSaved(session, idToken) {
    const decoded = jwtDecode(idToken!) as any;
    return {
      ...session,
      user: {
        ...session.user,
        [UserRoleKey]: decoded[UserRoleKey],
      },
      refreshToken: session.refreshToken,
    };
  },
  async onCallback(error, context, session) {
    if (error) {
      return NextResponse.redirect(
        new URL(`/error?error=${error.message}`, process.env.APP_BASE_URL)
      );
    }
    const returnTo = context.returnTo || "/dashboard";
    return NextResponse.redirect(new URL(returnTo, process.env.APP_BASE_URL));
  },
  authorizationParameters: {
    scope: "openid profile email offline_access",
    audience: process.env.AUTH0_AUDIENCE,
    prompt: "consent",
  },
  session: {
    rolling: true, // Automatically refresh the session before it expires
    absoluteDuration: 60 * 60 * 24 * 7, // Set the session duration to 7 days
    inactivityDuration: 60 * 60 * 24 * 7, // Set the session timeout to 7 days
  },
});
