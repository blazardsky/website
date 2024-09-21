import { defineConfig } from 'astro/config';
//import sanity from "@sanity/astro";
import react from "@astrojs/react";
//import vercel from '@astrojs/vercel/static';
import partytown from "@astrojs/partytown";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
  // sanity(), 
    react(), 
    partytown(), 
    tailwind()
  ],
  // adapter: vercel({
  //   webAnalytics: {
  //     enabled: true,
  //   },
  // }),
  // output: 'server',
});