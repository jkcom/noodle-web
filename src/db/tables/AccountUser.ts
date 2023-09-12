import { relations } from "drizzle-orm";

import { integer, pgEnum, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { Account } from "./Account";
import { User } from "./User";

export const accountRole = pgEnum("accountRole", ["owner", "admin", "editor"]);

export const AccountUser = pgTable(
  "account_users",
  {
    role: accountRole("role"),
    userId: integer("userId")
      .notNull()
      .references(() => User.id),
    accountId: integer("accountId")
      .notNull()
      .references(() => Account.id),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.accountId),
  })
);

export const UserAccountRelations = relations(AccountUser, ({ one }) => ({
  user: one(User, {
    fields: [AccountUser.userId],
    references: [User.id],
  }),
  account: one(Account, {
    fields: [AccountUser.userId],
    references: [Account.id],
  }),
}));
