import { db } from "@/db/db";
import { Account, AccountUser, type DeepUser } from "@/db/schema";

export const createNewAccount = async (accountName: string, user: DeepUser) => {
  const account = (
    await db
      .insert(Account)
      .values({
        name: accountName,
      })
      .returning()
  )[0];

  await db
    .insert(AccountUser)
    .values({
      accountId: account.id,
      userId: user.id,
      role: "owner",
    })
    .returning();

  return {accountId: account.id};
};
