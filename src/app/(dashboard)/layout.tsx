import "../globals.css";

import { auth } from "@/auth";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Soft Canada",
  applicationName: "Soft Canada",
  keywords: ["immigration", "grants", "canada", "real-estate", "career"],
  description: "Easily navigate your Canadian journey with Soft Canada.",
};

export default async function LandingLayout({
  children,
}: React.PropsWithChildren) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider session={session}>
          <AntdRegistry>
            <DashboardLayout>{children}</DashboardLayout>
          </AntdRegistry>
        </SessionProvider>
      </body>
    </html>
  );
}
