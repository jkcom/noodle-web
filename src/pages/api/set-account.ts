import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
  const body = await request?.json();
  console.log(body);

  cookies.set("account", body.account, {
    path: "/",
  });

  return new Response(JSON.stringify({ succes: true }));
};
