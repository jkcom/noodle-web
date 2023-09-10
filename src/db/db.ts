import { drizzle } from "drizzle-orm/vercel-postgres";

import { createPool } from "@vercel/postgres";
import { schema } from "./schema";

const pool = createPool({
  connectionString: import.meta.env.POSTGRES_URL,
});

// Connect to Vercel Postgres
export const db = drizzle(pool, {
  schema,
});
