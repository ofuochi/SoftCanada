import {AbstractAuthProvider} from "tinacms";
import {FC} from "react";
import {Auth0Provider, getAccessToken} from "@auth0/nextjs-auth0";
import {jwtDecode} from "jwt-decode";
import {LOGOUT_PATH} from "./constants/paths";

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
      id_token: session.idToken || "",
      access_token: session.accessToken || "",
      refresh_token: session.refreshToken || "",
    };
  }

  async getUser() {
    return getAccessToken();
  }

  async logout() {
    window.location.href = `${process.env.NEXT_PUBLIC_AUTH0_BASE_URL}/${LOGOUT_PATH}`;
  }

  async authorize(context?: any): Promise<boolean> {
    const session = await getAccessToken();
    if (!session) return false;

    try {
      const user = jwtDecode(session) as any;
      // return getRoles(user).includes("admin");
      return true; // TODO: uncomment the above line and remove this line
    } catch {
      return false;
    }
  }

  getSessionProvider() {
    return Auth0Provider as FC;
  }
}
