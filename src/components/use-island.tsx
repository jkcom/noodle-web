import { trpcReact } from "@/client";
import type { AccountContext } from "@/queries/get-context";
import { QueryClientProvider } from "@tanstack/react-query";
import type { ComponentType } from "react";
import { accountContext, queryClient, trpcClient } from "./island-clients";

interface Base {
  context: AccountContext;
}

export const withIsland = <TProps extends Base>(
  Component: ComponentType<TProps>
) => {
  return (props: TProps) => {
    return (
      <accountContext.Provider value={props.context}>
        <trpcReact.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <Component {...props} />
          </QueryClientProvider>
        </trpcReact.Provider>
      </accountContext.Provider>
    );
  };
};
