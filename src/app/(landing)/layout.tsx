import "../globals.css";

import theme from "@/theme/theme.config";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { Metadata } from "next";
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

export default function LandingLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AntdRegistry>
          <ConfigProvider theme={theme}>{children}</ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
