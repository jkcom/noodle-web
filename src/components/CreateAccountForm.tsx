import { trpcReact } from "@/client";

export const CreateAccountForm = () => {
  const { data } = trpcReact.helloWorld.useQuery({
    message: "hello world",
    noAttempts: 1,
  });

  return (
    <>
      <h1>{"hello " + data}</h1>
      <input type="text" placeholder="@username" />
    </>
  );
};
