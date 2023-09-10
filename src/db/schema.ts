import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const User = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    firebaseId: text("firebaseId").notNull(),
    image: text("image").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(users.email),
      firebaseIdx: uniqueIndex("firebaseIdx").on(users.firebaseId),
    };
  }
);

export type SelectUser = InferSelectModel<typeof User>;
export type InsertUser = InferInsertModel<typeof User>;
