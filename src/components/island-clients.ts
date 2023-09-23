import { trpcReact } from "@/client";
import type { AccountContext } from "@/queries/get-context";
import { QueryClient } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React from "react";

export const accountContext = React.createContext({} as AccountContext);
export const useAccountContext = () => React.useContext(accountContext);

export const queryClient = new QueryClient();
export const trpcClient = trpcReact.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
    }),
  ],
});
