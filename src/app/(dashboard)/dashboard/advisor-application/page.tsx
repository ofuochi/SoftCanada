import { redirect } from "next/navigation";
import { getRoles } from "@/lib/abilities";
import auth0 from "@/lib/auth0";
import AdvisorApplication from "@/components/dashboard/advisor/advisor-application";

export default async function AdvisorApplicationWrapper() {
  const session = await auth0.getSession();
  const user = session?.user;

  if (!user) {
    redirect("/api/auth/login");
  }
  const userRoles = getRoles(user);

  if (userRoles.length > 0) {
    redirect("/dashboard");
  }

  return <AdvisorApplication />;
}

