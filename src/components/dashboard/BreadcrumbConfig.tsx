import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import Link from "next/link";

const baseBreadcrumb: BreadcrumbItemType[] = [
  { title: <Link href="/dashboard">Home</Link> },
];

export const breadcrumbConfig: Record<string, BreadcrumbItemType[]> = {
  "/dashboard": [...baseBreadcrumb, { title: "Dashboard" }],
  "/dashboard/settings": [...baseBreadcrumb, { title: "Settings" }],
  "/dashboard/career/resumes": [
    ...baseBreadcrumb,
    { title: "Career" },
    { title: "Resumes" },
  ],
  "/dashboard/career/jobs": [
    ...baseBreadcrumb,
    { title: "Career" },
    { title: "Jobs" },
  ],
  "/dashboard/career/career-advisor": [
    ...baseBreadcrumb,
    { title: "Advisor" },
    { title: "Advisors" },
  ],
};

