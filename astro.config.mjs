import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";
import compressor from "astro-compressor";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [react(), compressor(), tailwind({ applyBaseStyles: false })],
  adapter: vercel({
    edgeMiddleware: true,
  }),
});
