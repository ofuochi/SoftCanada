import "../globals.css";

import Footer from "@/components/landing/footer/Footer";
import Navbar from "@/components/landing/Navbar";
import auth0 from "@/lib/auth0";
import theme from "@/theme/theme.config";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { Metadata } from "next";
import localFont from "next/font/local";
import React from "react";
import { Auth0Provider } from "@auth0/nextjs-auth0";
import { ErrorProvider } from "@/contexts/ErrorContext";

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
  const session = await auth0.getSession();

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Auth0Provider user={session?.user}>
          <AntdRegistry>
            <ConfigProvider theme={theme}>
              <>
                <Navbar />
                <main className="relative min-h-screen bg-white pt-16 font-dm_sans">
                  <ErrorProvider>{children}</ErrorProvider>
                </main>
                <Footer />
              </>
            </ConfigProvider>
          </AntdRegistry>
        </Auth0Provider>
      </body>
    </html>
  );
}

