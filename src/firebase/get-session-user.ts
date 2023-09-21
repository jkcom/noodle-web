import { getAuth, type DecodedIdToken } from "firebase-admin/auth";
import { app } from "./server";

const auth = getAuth(app);

export const getSessionUser = async (sessionCookie: string): Promise<DecodedIdToken | null> => {
  if (sessionCookie) {
    const decodedCookie = await auth.verifySessionCookie(sessionCookie);
    return decodedCookie;
  } else {
    return null;
  }
};

export const getIdTokenUser = async (idToken: string): Promise<DecodedIdToken | null> => {
  if (idToken) {
    const decodedIdToken = await auth.verifyIdToken(idToken);
    return decodedIdToken;
  } else {
    return null;
  }
};
