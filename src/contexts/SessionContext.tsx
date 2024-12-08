"use client";

import React, { createContext, useContext } from "react";

type SessionContextType = {
  idToken?: string;
  accessToken?: string;
  accessTokenScope?: string;
  accessTokenExpiresAt?: number;
  refreshToken?: string;
};
const SessionContext = createContext<SessionContextType | null>(null);

export const SessionProvider = ({
  children,
  session,
}: React.PropsWithChildren<{ session: SessionContextType | null }>) => (
  <SessionContext.Provider value={session}>{children}</SessionContext.Provider>
);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error(
      "useAccessToken must be used within an AccessTokenProvider"
    );
  }
  return context;
};
