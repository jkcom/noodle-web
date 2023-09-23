import { TRPCError } from "@trpc/server";
import type { AstroGlobal } from "astro";

import type { AccountContext } from "@/queries/get-context";
import { trpc } from "./trpc";

export const middleware = trpc.middleware;
export const isAutorized = middleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const getLocals = (Astro: AstroGlobal) =>
  Astro.locals as { context: AccountContext };
