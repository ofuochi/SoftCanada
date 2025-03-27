import { redirect } from "next/navigation";
import { getSession } from "@auth0/nextjs-auth0";
import { getRoles } from "@/lib/abilities";
import AdvisorApplication from "@/components/dashboard/advisor/AdvisorApplication";

export default async function AdvisorApplicationWrapper() {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/api/auth/login");
  }
  const userRoles = getRoles(user);

  // if (userRoles?.[0] === "career_advisor") {
  //   redirect("/dashboard");
  // }

  return <AdvisorApplication />;
}

