import { trpcReact } from "@/client";
import { setAccount } from "@/utils/set-account";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const AccountSelector = () => {
  const accountsQuery = trpcReact.usersAccounts.useQuery();

  return (
    <Select
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
  );
};
