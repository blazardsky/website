import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import partytown from "@astrojs/partytown";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://nicc-olo.com",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    partytown(),
    icon({
      iconDir: "src/svg",
    }),
  ],
  image: {
    domains: ["fmzwhatqbs.microcms.io", "cdn.sanity.io"],
  },
  // output: 'server',
});
