import { db } from "@/db/db";
import { Account, AccountUser, User, type SelectAccount, type SelectAccountUser, type SelectUser } from "@/db/schema";

import { eq } from "drizzle-orm";
import type { DecodedIdToken } from "firebase-admin/auth";

export type AccountContext = {
  user?: SelectUser;
  account?: SelectAccount;
  accountUser?: SelectAccountUser;
}

export const getAccountContext = async (
  firebaseUser: DecodedIdToken,
  accountId: number
): Promise<AccountContext> => {
  const user = await db.query.User.findFirst({
    where: eq(User.firebaseId, firebaseUser.uid),
  });

  // User does not exist - create user + account
  if (!user) {
    // create user
    const user = (
      await db
        .insert(User)
        .values({
          email: firebaseUser.email || "",
          firebaseId: firebaseUser.uid,
          image: firebaseUser.picture,
          name: firebaseUser.name || "",
        })
        .returning()
    ).pop();

    // create account
    const account = (
      await db
        .insert(Account)
        .values({
          name: "",
        })
        .returning()
    ).pop();

    // create account user
    if (user && account) {
      const accountUser = (
        await db
          .insert(AccountUser)
          .values({
            userId: user?.id,
            accountId: account.id,
            role: "owner",
          })
          .returning()
      ).pop();

      return {
        user,
        account,
        accountUser,
      };
    } else {
      return {};
    }
  }

  const joined = await db
    .selectDistinct()
    .from(Account)
    .where(eq(Account.id, accountId))
    .leftJoin(AccountUser, eq(AccountUser.accountId, accountId));

  return {
    user,
    account: joined[0].accounts,
    accountUser: joined[0].account_users,
  };
};
