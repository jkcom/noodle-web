import { trpcReact } from "@/client";
import { setAccount } from "@/utils/set-account";
import { useForm } from "react-hook-form";
import { useAccountContext } from "../island-clients";
import { FormField, FormItem } from "../ui/form";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { withIsland } from "../use-island";

export const AccountSelector = withIsland(() => {
  const accountsQuery = trpcReact.usersAccounts.useQuery();

  const form = useForm();
  const context = useAccountContext();

  return (
    <FormField
      control={form.control}
      name="account"
      render={(optoins) => (
        <FormItem>
          <Label>{"Account"}</Label>
          <Select
            value={context.account?.id.toString()}
            onValueChange={async (value) => {
              await setAccount(value);
              location.href = "/profile";
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              {accountsQuery.data?.map((a) => (
                <SelectItem key={a.id} value={a.id.toString()}>
                  {a.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
});
