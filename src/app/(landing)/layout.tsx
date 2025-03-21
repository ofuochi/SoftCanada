import "../globals.css";

import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import theme from "@/theme/theme.config";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ConfigProvider } from "antd";
import { Metadata } from "next";
import { getSession } from "@auth0/nextjs-auth0";
import localFont from "next/font/local";
import React from "react";

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
  const session = await getSession();

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <UserProvider user={session?.user}>
          <AntdRegistry>
            <ConfigProvider theme={theme}>
              <>
                <Navbar />
                <main className="relative min-h-screen bg-white pt-16 font-dm_sans">
                  {children}
                  <Footer />
                </main>
              </>
            </ConfigProvider>
          </AntdRegistry>
        </UserProvider>
      </body>
    </html>
  );
}

