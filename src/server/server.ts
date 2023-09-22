import { db } from "@/db/db";
import { AccountUser } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { validateAccountName } from "./auth/check-account-name";
import { createNewAccount } from "./auth/create-new-account";
import { isAutorized } from "./middleware";
import { trpc } from "./trpc";

export const publicProcedure = trpc.procedure;
export const authorizedProcedure = publicProcedure.use(isAutorized);
export const appRouter = trpc.router({
  /**
   * Auth
   */

  // validate new account name
  checkAccountName: authorizedProcedure
    .input(z.object({ accountName: z.string() }))
    .query((opts) => validateAccountName(opts.input.accountName)),

  // create new account
  createNewAccount: authorizedProcedure
    .input(z.object({ accountName: z.string() }))
    .mutation((opts) =>
      createNewAccount(opts.input.accountName, opts.ctx.user)
    ),

  // get user accounts
  usersAccounts: authorizedProcedure.query(async (opts) => {
    const accountUsers = await db.query.AccountUser.findMany({
      where: eq(AccountUser.userId, opts.ctx.user.id),
      with: {
        account: true,
      },
    });
    return accountUsers.map((au) => au.account);
  }),

  /**
   * Testing
   */
  helloWorld: publicProcedure
    .input(z.object({ message: z.string(), noAttempts: z.number() }))
    .query((opts) => {
      return {
        user: opts.ctx.user,
        someVal: 123,
        trueFalse: false,
        value:
          "World " +
          opts.input.message +
          ` (${opts.ctx.user?.name || "User not logged in"})`,
      };
    }),
});

export type AppRouter = typeof appRouter;
