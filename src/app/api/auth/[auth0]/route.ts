import auth0 from "@/lib/auth0";
import { NextRequest, NextResponse } from "next/server";
import { UserRoleKey } from "@/lib/abilities";
import { jwtDecode } from "jwt-decode";

// GET /api/auth/login
export async function GET(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const subPath = pathname.replace("/api/auth/", "");

  // const logoutUrl = [
  //   `${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout?`,
  //   `client_id=${process.env.AUTH0_CLIENT_ID}`,
  //   `&returnTo=${process.env.AUTH0_BASE_URL}`,
  // ].join("");

  // console.log(logoutUrl);

  // switch (subPath) {
  //   case "login":
  //     return await auth0.startInteractiveLogin({ returnTo: "/" });

  //   case "logout":
  //     return NextResponse.redirect(logoutUrl);

  //   default:
  //     return NextResponse.json({ error: "Not found" }, { status: 404 });
  // }
}

// POST /api/auth/update-session
export async function POST(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const subPath = pathname.replace("/api/auth/", "");

  if (subPath !== "update-session") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const session = await auth0.getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const decoded = jwtDecode(session.tokenSet.accessToken!) as any;

  // Merge in new role from access token
  await auth0.updateSession({
    ...session,
    user: {
      ...session.user,
      [UserRoleKey]: decoded[UserRoleKey],
    },
  });

  return NextResponse.json(null, { status: 200 });
}
