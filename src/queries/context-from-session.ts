import { getSessionUser } from "@/firebase/get-session-user";
import { getAccountContext, type AccountContext } from "./get-context";

export const contextFromSession = async (
  session: string,
  accountId?: number
): Promise<AccountContext> => {
  // firebase user
  const firebaseUser = session ? await getSessionUser(session) : null;
  console.log('fb session', firebaseUser);
  

  if (!firebaseUser) {
    return {
      userLoggedIn: false,
    };
  } else {
    return await getAccountContext(firebaseUser, accountId);
  }
};
