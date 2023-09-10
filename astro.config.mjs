import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

import compressor from "astro-compressor";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [react(), compressor()],
  adapter: vercel()
});