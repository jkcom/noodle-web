import { getUserFromIdToken, getUserFromSession } from "@/queries/get-user";
import type { inferAsyncReturnType } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export async function createContext({
  req,
  resHeaders,
}: FetchCreateContextFnOptions) {
  let user;
  try {
    if (req.headers.get("cookie")) {
      const cookies = parseCookie(req.headers.get("cookie") || "") as {
        session: string | undefined;
      };
      user = cookies.session ? await getUserFromSession(cookies.session) : null;
    }

    if (!user) {
      const authHeader = req.headers.get("Authorization");
      if (authHeader) {
        user = await getUserFromIdToken(authHeader);
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    return { req, resHeaders, user };
  }
}

export type Context = inferAsyncReturnType<typeof createContext>;

const parseCookie = (str: string) =>
  str
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc: any, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});
