import { AbstractAuthProvider } from "tinacms";
import { FC } from "react";
import { Auth0Provider, getAccessToken } from "@auth0/nextjs-auth0";
import { LOGOUT_PATH } from "./constants/paths";
import { UserRoleKey, UserRoles } from "./lib/abilities";

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
    const session = await getAccessToken();
    return !!session;
  }

  async getToken(): Promise<TokenObj> {
    const session = await getAccessToken();
    if (!session) throw new Error("No session found");

    return {
      id_token: session || "",
      access_token: session || "",
      refresh_token: session.refreshToken || "",
    };
  }

  async getUser() {
    return getAccessToken();
  }

  async logout() {
    window.location.href = `${process.env.NEXT_PUBLIC_AUTH0_BASE_URL}${LOGOUT_PATH}`;
  }

  async authorize(): Promise<boolean> {
    try {
      const response = await fetch("/auth/profile");
      if (!response.ok) return false;

      const user = await response.json();
      if (!user) return false;

      const roles = user[UserRoleKey] as UserRoles[];
      return roles.includes("admin");
    } catch (e) {
      return false;
    }
  }

  getSessionProvider() {
    return Auth0Provider as FC;
  }
}

