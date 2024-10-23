import { defineConfig } from 'astro/config';
//import sanity from "@sanity/astro";
import react from "@astrojs/react";
//import vercel from '@astrojs/vercel/static';
import partytown from "@astrojs/partytown";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: 'https://nicc-olo.com',
  integrations: [
    // sanity(), 
    react(), 
    partytown(), 
    tailwind(), 
    icon({
      iconDir: "src/svg",
    })
  ],
  image: {
    domains: ["fmzwhatqbs.microcms.io", "cdn.sanity.io"],
  }
  // adapter: vercel({
  //   webAnalytics: {
  //     enabled: true,
  //   },
  // }),
  // output: 'server',
});