import {
  TinaNodeBackend,
  LocalBackendAuthProvider,
  BackendAuthProvider,
} from "@tinacms/datalayer";

import { NextApiRequest, NextApiResponse } from "next";
import auth0 from "@/lib/auth0";
import { IncomingMessage, ServerResponse } from "http";
import { dbConnection } from "@/lib/db-conn";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const CustomBackendAuth = (): BackendAuthProvider => ({
  isAuthorized: async (req: IncomingMessage, _: ServerResponse) => {
    // const token = req.headers.authorization;
    // validate the token here
    const session = await auth0.getSession();
    if (!session)
      return {
        isAuthorized: false,
        errorMessage: "Unauthorized",
        errorCode: 401,
      };

    return {
      isAuthorized: true,
    };
  },
});

const handler = TinaNodeBackend({
  authProvider: isLocal ? LocalBackendAuthProvider() : CustomBackendAuth(),
  databaseClient: dbConnection,
});

export default (req: NextApiRequest, res: NextApiResponse) => handler(req, res);

