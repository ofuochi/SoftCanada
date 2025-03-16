import { initAuth0 } from "@auth0/nextjs-auth0";

export default initAuth0({
  secret: process.env.AUTH0_CLIENT_SECRET,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  authorizationParams: {
    scope: "openid profile email offline_access", // Include `offline_access` for refresh tokens
  },
  session: {
    rolling: true, // Automatically refresh the session before it expires
    absoluteDuration: false, // Disable absolute session expiration
  },
});

