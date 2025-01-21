import "../globals.css";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { SessionProvider } from "@/contexts/SessionContext";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { getSession } from "@auth0/nextjs-auth0";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soft Canada",
  applicationName: "Soft Canada",
  keywords: ["immigration", "grants", "canada", "real-estate", "career"],
  description: "Easily navigate your Canadian journey with Soft Canada.",
};

export default async function LandingLayout({
  children,
}: React.PropsWithChildren) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <UserProvider user={session?.user}>
          <SessionProvider session={{ ...session }}>
            <AntdRegistry>
              <DashboardLayout>{children}</DashboardLayout>
            </AntdRegistry>
          </SessionProvider>
        </UserProvider>
      </body>
    </html>
  );
}

