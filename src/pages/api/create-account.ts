import type { CreateAccountResponse } from "@/api/use-create-account";

export async function POST({ params, request }) {
  const response: CreateAccountResponse = {
    accountId: "123",
  };

  return new Response(JSON.stringify(response));
}
