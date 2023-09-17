import { useState } from "react";

interface Options {
  endpoint: string;
}

export const useFetch = (options: Options) => {
  const [data, setData] = useState(null);

  return {
    data,
    fetch: async (body: any) => {
      const response = await fetch(options.endpoint, {
        method: "POST",
        body: JSON.stringify(body),
      });

      const json = await response.json();
      setData(json);
    },
  };
};
