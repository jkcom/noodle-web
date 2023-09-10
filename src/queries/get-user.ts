import type { AstroGlobal } from "astro";
import { eq } from "drizzle-orm";
import { db } from "../db/db";
import { User, type InsertUser } from "../db/schema";
import { getSessionUser } from "../firebase/get-session-user";

export const getUser = async (Astro: AstroGlobal): Promise<InsertUser | null | undefined> => {
  const sessionUser = await getSessionUser(Astro);

  if (!sessionUser) {
    return null;
  }

  const user = await db.query.User.findFirst({
    where: eq(User.firebaseId, sessionUser.uid),
  });

  if (user) {
    return user
  }

  if (!user && sessionUser) {
    try {
      await db.insert(User).values({
        email: sessionUser.email || "",
        firebaseId: sessionUser.uid,
        image: sessionUser.picture,
        name: sessionUser.name || "",
      });

      const newUser = await db.query.User.findFirst({
        where: eq(User.firebaseId, sessionUser.uid),
      });

      return newUser;
      
    } catch (error) {
      console.error(error);
      return null
    }
  }

};
