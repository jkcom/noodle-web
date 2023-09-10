import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { AccountUser } from "./AccountUser";

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

export type SelectUser = InferSelectModel<typeof Account>;
export type InsertUser = InferInsertModel<typeof Account>;
