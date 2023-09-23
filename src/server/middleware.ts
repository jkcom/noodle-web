import { TRPCError } from "@trpc/server";

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
