import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import partytown from "@astrojs/partytown";
import icon from "astro-icon";

const portfolioRedirects = {
  "/portfolio/technical/0kkq5ibsyqh/dpg": "/portfolio/technical/dpg",
  "/portfolio/technical/17cwki-czb8/arkadia": "/portfolio/technical/arkadia",
  "/portfolio/technical/2-k6cvudqi6/alta-movie": "/portfolio/technical/alta-movie",
  "/portfolio/technical/39_zh2td2ob/concorso-capodaglio": "/portfolio/technical/concorso-capodaglio",
  "/portfolio/technical/bgnzvfxluzbj/ait-fase-1": "/portfolio/technical/ait-fase-1",
  "/portfolio/technical/d57w8txs0xrl/il-maestro": "/portfolio/technical/il-maestro",
  "/portfolio/technical/jn40gpo0x5c/showroom-ml-auto": "/portfolio/technical/showroom-ml-auto",
  "/portfolio/technical/maddj/mad-about-events": "/portfolio/technical/mad-about-events",
  "/portfolio/technical/xo4sds39iw0/abbicuradite-unigum": "/portfolio/technical/abbicuradite-unigum",
  "/portfolio/technical/yp066az8hg/cartelloni-valdarno-v2": "/portfolio/technical/cartelloni-valdarno-v2",
  "/portfolio/creative/283d80fjdur/pentolino-dell-oste": "/portfolio/creative/pentolino-dell-oste",
  "/portfolio/creative/4y-jpfsl70ty/ascg-logo": "/portfolio/creative/ascg-logo",
  "/portfolio/creative/lfuokxldh0/seth-ep-covers": "/portfolio/creative/seth-ep-covers",
  "/portfolio/creative/ysrs7a3m1c3/upkmae": "/portfolio/creative/upkmae",
};

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
      iconDir: "src/assets/svg",
    }),
  ],
  image: {
    domains: ["cdn.sanity.io"],
  },
  i18n: {
    locales: ["it", "en"],
    defaultLocale: "it",
    routing: {
      prefixDefaultLocale: false,
      fallbackType: "rewrite",
    },
    fallback: {
      en: "it",
    },
  },
  redirects: portfolioRedirects,
  // output: 'server',
});
