import { User, type DeepUser } from "@/db/schema";
import type { AstroGlobal } from "astro";
import { eq } from "drizzle-orm";
import { db } from "../db/db";
import { getSessionUser } from "../firebase/get-session-user";

export const getUser = async (Astro: AstroGlobal): Promise<DeepUser | null | undefined> => {
  const sessionUser = await getSessionUser(Astro);

  if (!sessionUser) {
    return null;
  }
  const user = await db.query.User.findFirst({
    with: {
      accountUsers: {
        with: {
          account: true,
        },
      },
    },
    where: eq(User.firebaseId, sessionUser.uid),
  });

  // check account
  if (user) {
    return user;
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
        with: {
          accountUsers: {
            with: {
              account: true,
            },
          },
        },
        where: eq(User.firebaseId, sessionUser.uid),
      });

      if (newUser) {
        return newUser;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
};
