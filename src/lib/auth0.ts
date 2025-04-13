import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { NextResponse } from "next/server";

export default new Auth0Client({
  async beforeSessionSaved(session) {
    delete session.tokenSet.idToken;
    return session;
  },
  async onCallback(error, context) {
    if (error) {
      return NextResponse.redirect(
        new URL(`/error?error=${error.message}`, process.env.APP_BASE_URL)
      );
    }
    const returnTo = context.returnTo || "/dashboard/advisor";
    return NextResponse.redirect(new URL(returnTo, process.env.APP_BASE_URL));
  },
  authorizationParameters: {
    scope: "openid profile email offline_access",
    audience: process.env.AUTH0_AUDIENCE,
  },
  session: {
    inactivityDuration: 60 * 60 * 24, // 1 day
    absoluteDuration: 60 * 60 * 24 * 7, // 7 days
  },
});

