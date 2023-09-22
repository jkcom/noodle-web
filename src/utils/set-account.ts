export const setAccount = async (accountId: number | string) => {
  await fetch("/api/set-account", {
    method: "POST",
    body: JSON.stringify({
      account: accountId.toString(),
    }),
  });
};
