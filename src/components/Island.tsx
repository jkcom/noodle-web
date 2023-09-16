import { trpcReact } from "@/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { CreateAccountForm } from "./CreateAccountForm";

interface IslandProps {
  componentKey: "create-account-form";
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
          }
        })()}
      </QueryClientProvider>
    </trpcReact.Provider>
  );
}
