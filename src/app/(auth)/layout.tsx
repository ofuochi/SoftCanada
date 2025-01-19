import "../globals.css";

import { Metadata } from "next";
import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import theme from "@/theme/theme.config";

export const metadata: Metadata = {
  title: "Soft Canada",
  description: "Easily navigate your Canadian journey with Soft Canada.",
};
export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <AntdRegistry>
          <ConfigProvider theme={theme}>{children}</ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
