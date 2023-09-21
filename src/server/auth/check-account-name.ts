import { db } from "@/db/db";
import { Account } from "@/db/schema";
import { eq } from "drizzle-orm";

const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

type AccountNameValidation = {
  ok: boolean;
  error?: "charaters" | "already-exists";
  message?: string;
};

export const validateAccountName = async (
  accountName: string
): Promise<AccountNameValidation> => {
  const accounts = await db
    .select()
    .from(Account)
    .where(eq(Account.name, accountName));

  if (accounts.length) {
    return {
      ok: false,
      error: "already-exists",
      message: "An account with that username already exists.",
    };
  }

  const isValidUsername = usernameRegex.test(accountName);
  if (!isValidUsername) {
    return {
      ok: false,
      error: "charaters",
      message: "You can only use normal charaters and numbers.",
    };
  }

  return {
    ok: true,
  };
};
