import {
  relations,
  type InferInsertModel,
  type InferSelectModel,
} from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

/**
 *  User
 */

export const User = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    firebaseId: text("firebaseId").notNull(),
    image: text("image"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(users.email),
      firebaseIdx: uniqueIndex("firebaseIdx").on(users.firebaseId),
    };
  }
);

export const UserRelations = relations(User, ({ many }) => ({
  accountUsers: many(AccountUser),
}));

export type SelectUser = InferSelectModel<typeof User>;
export type DeepUser = SelectUser & { accountUsers?: DeepAccountUser[] };
export type InsertUser = InferInsertModel<typeof User>;

/**
 * Account
 */

export const Account = pgTable(
  "accounts",
  {
    id: serial("id").primaryKey(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    name: text("name").notNull(),
  },
  (accounts) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(accounts.name),
    };
  }
);

export const AccountRelations = relations(Account, ({ many }) => ({
  accountUsers: many(AccountUser),
}));

export type SelectAccount = InferSelectModel<typeof Account>;
export type DeepAccount = InferSelectModel<typeof Account> & {
  accountUsers?: DeepAccount[];
};
export type InsertAccount = InferInsertModel<typeof Account>;

/**
 * Account role
 */

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
    fields: [AccountUser.accountId],
    references: [Account.id],
  }),
}));

export type SelectAccountUser = InferSelectModel<typeof AccountUser>;
export type DeepAccountUser = InferSelectModel<typeof AccountUser> & {
  user?: DeepUser;
  account?: DeepAccount;
};
export type InsertAccountUser = InferInsertModel<typeof AccountUser>;
