import { initTRPC } from "@trpc/server";
import type { Context } from "./context";
export const t = initTRPC.context<Context>().create();

export const middleware = t.middleware;
export const publicProcedure = t.procedure;

export const appRouter = t.router({
  helloWorld: publicProcedure.query((opts) => {
    return " World!";
  }),
});

export type AppRouter = typeof appRouter;
