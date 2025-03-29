import { handleLogin, handleLogout } from "@auth0/nextjs-auth0";
import { AbstractAuthProvider } from "tinacms";
import { UserProfile, useUser } from "@auth0/nextjs-auth0/client";

import auth0 from "./lib/auth0";
import { getRoles } from "./lib/abilities";
import { SessionProvider } from "./contexts/SessionContext";
import { FC } from "react";

type TokenObj = {
  id_token: string;
  access_token: string;
  refresh_token: string;
};

export class TinaAuth extends AbstractAuthProvider {
  constructor() {
    super();
  }

  async authenticate() {
    // return handleLogin({
    //   returnTo: "/dashboard",
    //   authorizationParams: { audience: process.env.AUTH0_AUDIENCE },
    // });
  }

  async getToken(): Promise<TokenObj> {
    // const session = await auth0.getSession();
    // if (!session) throw new Error("No session found");

    // return {
    //   id_token: session.idToken || "",
    //   access_token: session.accessToken || "",
    //   refresh_token: session.refreshToken || "",
    // };

    return {
      id_token: "",
      access_token: "",
      refresh_token: "",
    };
  }

  async getUser() {
    return true;
    // return true;
    // return auth0.getSession();
  }

  async logout() {
    // const returnTo = [
    //   `${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout?`,
    //   `client_id=${process.env.AUTH0_CLIENT_ID}`,
    //   `&returnTo=${process.env.AUTH0_BASE_URL}`,
    // ].join("");
    // handleLogout({ returnTo });
  }

  async authorize(context?: any): Promise<boolean> {
    return true;
    // const session = await auth0.getSession(context?.req, context?.res);
    // if (!session) return false;

    // return getRoles(session?.user).includes("admin");
  }

  getSessionProvider() {
    return SessionProvider as FC;
  }
}
