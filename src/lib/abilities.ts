import { User } from "@auth0/nextjs-auth0/types";
import { AbilityBuilder, createMongoAbility } from "@casl/ability";

export type UserRoles =
  | "career_advisor"
  | "immigration_advisor"
  | "real_estate_agent"
  | "finance_advisor"
  | "study_advisor"
  | "admin"
  | "guest";
export const UserRoleKey = "https://softcanada/roles";

export type AppAbility = ReturnType<typeof createMongoAbility>;

export const defineAbilityFor = (roles: UserRoles[] = []) => {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

  if (roles.includes("admin")) {
    can("manage", "all");
  } else if (roles.includes("career_advisor")) {
    can("manage", "applications");
    can("read", "profile");
  } else {
    can("read", "publicContent"); // Default role (guest) can read public content
  }

  return build();
};
export const getRoleDescription = (user?: User) => {
  const roles = getRoles(user);
  switch (roles[0]) {
    case "admin":
      return "Admin";
    case "career_advisor":
      return "Career Advisor";
    case "real_estate_agent":
      return "Real Estate Agent";
    case "immigration_advisor":
      return "Immigration Advisor";
    default:
      return "Guest";
  }
};

export const getRoles = (user?: User) =>
  (user?.[UserRoleKey] || ["guest"]) as UserRoles[];
