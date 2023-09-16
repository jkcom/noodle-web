import type { inferAsyncReturnType } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export async function createContext({
  req,
  resHeaders,
}: FetchCreateContextFnOptions) {
  const user = { userId: "" };
  return { req, resHeaders, user };
}

export type Context = inferAsyncReturnType<typeof createContext>;
