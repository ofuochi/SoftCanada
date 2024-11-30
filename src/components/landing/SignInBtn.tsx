import { signIn } from "../../auth";

export default function SignInBtn() {
  return (
    <form action={() => signIn("auth0")}>
      <button type="submit">Sign In</button>
    </form>
  );
}
