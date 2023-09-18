import { getAuth, type DecodedIdToken } from "firebase-admin/auth";
import { app } from "./server";


export const getSessionUser = async (sessionCookie: string): Promise<DecodedIdToken | null> => {
  const auth = getAuth(app);
  if (sessionCookie) {
    const decodedCookie = await auth.verifySessionCookie(sessionCookie);
    return decodedCookie;
  } else {
    return null;
  }
};
