import { trpcReact } from "@/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { CreateAccountForm } from "./CreateAccountForm";
import { AccountSelector } from "./profile/AccountSelector";

interface IslandProps {
  componentKey: "create-account-form" | "account-selector";
}

export function Island(props: IslandProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpcReact.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:4321/api/trpc",

          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              // authorization: getAuthCookie(),
            };
          },
        }),
      ],
    })
  );

  return (
    <trpcReact.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {(() => {
          switch (props.componentKey) {
            case "create-account-form":
              return <CreateAccountForm />;
            case "account-selector":
              return <AccountSelector />;
          }
        })()}
      </QueryClientProvider>
    </trpcReact.Provider>
  );
}
