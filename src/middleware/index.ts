import { contextFromSession } from "@/queries/context-from-session";
import { defineMiddleware } from "astro:middleware";

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(async (context, next) => {
  const accountId = context.cookies.get("account")?.value;
  const session = context.cookies.get("session")?.value;

  if (session && accountId) {
    (context.locals as any)["context"] = await contextFromSession(
      session,
      parseInt(accountId)
    );
  } else {
    (context.locals as any)["context"] = {};
  }

  return next();
});
