import { trpcReact } from "@/client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const CreateAccountForm = () => {
  const [accountName, setAccountName] = useState("");

  const { data } = trpcReact.checkAccountName.useQuery(
    {
      accountName,
    },
    {
      enabled: accountName !== "",
    }
  );

  const createNewAccountMutation = trpcReact.createNewAccount.useMutation();

  return (
    <form
      className="w-full max-w-sm"
      onSubmit={(e) => {
        e.preventDefault();
        createNewAccountMutation.mutate({
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
};
