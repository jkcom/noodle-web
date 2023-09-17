import type { AppRouter } from "@/server/server";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";

const trpcReact = createTRPCReact<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/api/trpc",
    }),
  ],
});

export { trpcReact };
