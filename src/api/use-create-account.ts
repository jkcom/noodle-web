import { z } from "zod";
import { useFetch } from "./use-fetch";

const CreateAccountRequest = z.object({
  name: z.string(),
});

export type CreateAccountRequest = z.infer<typeof CreateAccountRequest>;

const CreateAccountResponse = z.object({
  accountId: z.string(),
});

export type CreateAccountResponse = z.infer<typeof CreateAccountResponse>;

export const useCreateAccount = () => {
  const fetch = useFetch({ endpoint: "/api/create-account" });
  return {
    ...fetch,
    mutate: async (body: CreateAccountRequest) => fetch.fetch(body),
  };
};
