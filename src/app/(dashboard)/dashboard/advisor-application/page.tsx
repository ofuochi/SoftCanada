import AdvisorApplication from "@/components/dashboard/advisor/advisor-application";
import { getRoles } from "@/lib/abilities";
import auth0 from "@/lib/auth0";
import { redirect } from "next/navigation";

export default async function AdvisorApplicationWrapper() {
  const session = await auth0.getSession();
  const user = session!.user;

  const userRoles = getRoles(user);

  if (userRoles.length > 0) return redirect("/dashboard/advisor");

  return <AdvisorApplication />;
}

