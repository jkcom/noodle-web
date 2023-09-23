import { getSessionUser } from "@/firebase/get-session-user";
import { getAccountContext } from "./get-context";

export const contextFromSession = async (
  session: string,
  accountId: number
) => {
  // firebase user
  const firebaseUser = session ? await getSessionUser(session) : null;

  if (!firebaseUser) {
    return {};
  } else {
    return await getAccountContext(firebaseUser, accountId);
  }
};
