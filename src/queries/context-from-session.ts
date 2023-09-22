import { getSessionUser } from "@/firebase/get-session-user";
import type { AstroGlobal } from "astro";
import { getContext } from "./get-context";

export const contextFromSession = async (Astro: AstroGlobal) => {
  const accountCookie = Astro.cookies.get("account")?.value;
  const accountId = accountCookie ? parseInt(accountCookie) : undefined;
  const sessionCookie = Astro.cookies.get("session")?.value;

  // firebase user
  const firebaseUser = sessionCookie
    ? await getSessionUser(sessionCookie)
    : null;
  console.log("got here", firebaseUser);

  if (!firebaseUser) {
    return {};
  } else {
    return await getContext(firebaseUser, accountId);
  }
};
