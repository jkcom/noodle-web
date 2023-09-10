import { getAuth, type DecodedIdToken } from "firebase-admin/auth";
import { app } from "./server";

import type { AstroGlobal } from "astro";

export const getSessionUser = async (Astro: AstroGlobal): Promise<DecodedIdToken | null> => {
  const auth = getAuth(app);
  let decodedCookie;

  if (Astro.cookies.has("session")) {
    const sessionCookie = Astro.cookies.get("session")?.value;
    if (sessionCookie) {
      decodedCookie = await auth.verifySessionCookie(sessionCookie);
      return decodedCookie;
    }
  }

  return null;
};
