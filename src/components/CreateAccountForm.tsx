import { trpcReact } from "@/client";

export const CreateAccountForm = () => {
  const { data } = trpcReact.helloWorld.useQuery();
  console.log(data);

  return (
    <>
      <h1>{"hello " + data}</h1>
      <input type="text" placeholder="@username" />
    </>
  );
};
