import { initTRPC } from "@trpc/server";
import { z } from "zod";
import type { Context } from "./context";
export const t = initTRPC.context<Context>().create();

export const middleware = t.middleware;
export const publicProcedure = t.procedure;

export const appRouter = t.router({
  helloWorld: publicProcedure
    .input(z.object({ message: z.string(), noAttempts: z.number() }))
    .query((opts) => {
      return "World " + opts.input.message;
    }),
});

export type AppRouter = typeof appRouter;
