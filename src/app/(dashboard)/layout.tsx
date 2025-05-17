import "../globals.css";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import auth0 from "@/lib/auth0";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Auth0Provider } from "@auth0/nextjs-auth0";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Soft Canada",
  applicationName: "Soft Canada",
  keywords: ["immigration", "grants", "canada", "real-estate", "career"],
  description: "Easily navigate your Canadian journey with Soft Canada.",
};

export default async function LandingLayout({
  children,
}: React.PropsWithChildren) {
  const session = await auth0.getSession();

  const user = session?.user;

  // Check if user is logged in
  if (!user) {
    // Redirect to homepage if not logged in
    redirect("/");
  }

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Auth0Provider user={session?.user}>
          <AntdRegistry>
            <DashboardLayout>{children}</DashboardLayout>
          </AntdRegistry>
        </Auth0Provider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
      </body>
    </html>
  );
}
