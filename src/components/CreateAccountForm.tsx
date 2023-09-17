import { useCreateAccount } from "@/api/use-create-account";
import { Button } from "./ui/button";

type Data = {
  data: string[];
};

export const CreateAccountForm = () => {
  const createAccount = useCreateAccount();

  const submit = () => {
    createAccount.mutate({
      name: "test",
    });
  };

  return (
    <>
      <span>{JSON.stringify(createAccount.data)}</span>
      <Button onClick={() => submit()}>{"Create"}</Button>
    </>
  );
};
