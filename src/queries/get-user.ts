import { AccountUser } from "@/db/tables/AccountUser";
import type { AstroGlobal } from "astro";
import { eq } from "drizzle-orm";
import { db } from "../db/db";
import { User, type InsertUser } from "../db/tables/User";
import { getSessionUser } from "../firebase/get-session-user";



export const getUser = async (Astro: AstroGlobal): Promise<InsertUser | null | undefined> => {
  const sessionUser = await getSessionUser(Astro);

  if (!sessionUser) {
    return null;
  }

  const user = await db.query.User.findFirst({
    where: eq(User.firebaseId, sessionUser.uid),
  });
  
  // check account
  console.log(user);
  
  if (user) {
    
    const ac = await db.query.AccountUser.findMany({
      where: eq(AccountUser.userId, user.id)
    })

    console.log(ac);
    
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
