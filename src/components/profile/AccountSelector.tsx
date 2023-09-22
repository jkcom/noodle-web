import { trpcReact } from "@/client";
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
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        {accountsQuery.data?.map((a) => (
          <SelectItem value="pineapple">{a.name}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
