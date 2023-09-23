import { trpcReact } from "@/client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { withIsland } from "./use-island";

export const CreateAccountForm = withIsland(() => {
  const [accountName, setAccountName] = useState("");

  const { data } = trpcReact.checkAccountName.useQuery(
    {
      accountName,
    },
    {
      enabled: accountName !== "",
    }
  );

  const createNewAccountMutation = trpcReact.createNewAccount.useMutation({
    onSuccess: async (data, variables, context) => {
      await fetch("/api/set-account", {
        method: "POST",
        body: JSON.stringify({
          account: data.accountId.toString(),
        }),
      });
      location.href = "/";
    },
  });

  return (
    <form
      className="w-full max-w-sm"
      onSubmit={async (e) => {
        e.preventDefault();
        const data = await createNewAccountMutation.mutate({
          accountName,
        });
      }}
    >
      <Label htmlFor="username">{"Choose username"}</Label>
      <Input
        id="username"
        onChange={(e) => setAccountName(e.target.value)}
        type="text"
        placeholder="@username"
      />
      {accountName !== "" && data && (
        <small>{data.ok ? "Great username!" : data.message}</small>
      )}
      <div>
        <Button type="submit" disabled={data?.ok !== true}>
          {"Create"}
        </Button>
      </div>
    </form>
  );
});
