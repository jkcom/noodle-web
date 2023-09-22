import { User, type DeepUser } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { DecodedIdToken } from "firebase-admin/auth";
import { db } from "../db/db";
import { getIdTokenUser, getSessionUser } from "../firebase/get-session-user";

export const getUserFromIdToken = async (
  idToken: string | undefined
): Promise<DeepUser | null | undefined> => {
  if (!idToken) {
    return null;
  }

  const decodedIdToken = await getIdTokenUser(idToken);

  if (!decodedIdToken) {
    return null;
  } else {
    return await getUserFromFirebaseId(decodedIdToken);
  }
};

export const getUserFromSession = async (
  sessionCookie: string | undefined
): Promise<DeepUser | null | undefined> => {
  const sessionUser = sessionCookie
    ? await getSessionUser(sessionCookie)
    : null;

  if (!sessionUser) {
    return null;
  } else {
    return await getUserFromFirebaseId(sessionUser);
  }
};

export const getUserFromFirebaseId = async (
  firebaseUser: DecodedIdToken
): Promise<DeepUser | undefined> => {
  const user = await db.query.User.findFirst({
    with: {
      accountUsers: {
        with: {
          account: true,
        },
      },
    },
    where: eq(User.firebaseId, firebaseUser.uid),
  });

  // check account
  if (user) {
    return user;
  }

  if (!user && firebaseUser) {
    try {
      await db.insert(User).values({
        email: firebaseUser.email || "",
        firebaseId: firebaseUser.uid,
        image: firebaseUser.picture,
        name: firebaseUser.name || "",
      });

      const newUser = await db.query.User.findFirst({
        with: {
          accountUsers: {
            with: {
              account: true,
            },
          },
        },
        where: eq(User.firebaseId, firebaseUser.uid),
      });

      if (newUser) {
        return newUser;
      }
    } catch (error) {
      console.error(error);
    }
  }
};
