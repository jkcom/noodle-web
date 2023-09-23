import { contextFromSession } from "@/queries/context-from-session";
import type { AccountContext } from "@/queries/get-context";
import type { AstroCookies } from "astro";

// `context` and `next` are automatically typed
export const getContextFromCookies = async (
  cookies: AstroCookies
): Promise<AccountContext> => {
  const accountId = cookies.get("account")?.value;
  const session = cookies.get("session")?.value;

  if (session) {
    return await contextFromSession(
      session,
      accountId ? parseInt(accountId) : undefined
    );
  } else {
    return {
      userLoggedIn: false,
    };
  }
};
