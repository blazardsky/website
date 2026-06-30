import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import partytown from "@astrojs/partytown";
import icon from "astro-icon";

const portfolioRedirects = {
  "/portfolio/technical/0kkq5ibsyqh/dpg": "/portfolio/technical/dpg",
  "/en/portfolio/technical/0kkq5ibsyqh/dpg": "/en/portfolio/technical/dpg",
  "/portfolio/technical/17cwki-czb8/arkadia": "/portfolio/technical/arkadia",
  "/en/portfolio/technical/17cwki-czb8/arkadia":
    "/en/portfolio/technical/arkadia",
  "/portfolio/technical/2-k6cvudqi6/alta-movie":
    "/portfolio/technical/alta-movie",
  "/en/portfolio/technical/2-k6cvudqi6/alta-movie":
    "/en/portfolio/technical/alta-movie",
  "/portfolio/technical/39_zh2td2ob/concorso-capodaglio":
    "/portfolio/technical/concorso-capodaglio",
  "/en/portfolio/technical/39_zh2td2ob/concorso-capodaglio":
    "/en/portfolio/technical/concorso-capodaglio",
  "/portfolio/technical/bgnzvfxluzbj/ait-fase-1":
    "/portfolio/technical/ait-fase-1",
  "/en/portfolio/technical/bgnzvfxluzbj/ait-fase-1":
    "/en/portfolio/technical/ait-fase-1",
  "/portfolio/technical/d57w8txs0xrl/il-maestro":
    "/portfolio/technical/il-maestro",
  "/en/portfolio/technical/d57w8txs0xrl/il-maestro":
    "/en/portfolio/technical/il-maestro",
  "/portfolio/technical/jn40gpo0x5c/showroom-ml-auto":
    "/portfolio/technical/showroom-ml-auto",
  "/en/portfolio/technical/jn40gpo0x5c/showroom-ml-auto":
    "/en/portfolio/technical/showroom-ml-auto",
  "/portfolio/technical/maddj/mad-about-events":
    "/portfolio/technical/mad-about-events",
  "/en/portfolio/technical/maddj/mad-about-events":
    "/en/portfolio/technical/mad-about-events",
  "/portfolio/technical/xo4sds39iw0/abbicuradite-unigum":
    "/portfolio/technical/abbicuradite-unigum",
  "/en/portfolio/technical/xo4sds39iw0/abbicuradite-unigum":
    "/en/portfolio/technical/abbicuradite-unigum",
  "/portfolio/technical/yp066az8hg/cartelloni-valdarno-v2":
    "/portfolio/technical/cartelloni-valdarno-v2",
  "/en/portfolio/technical/yp066az8hg/cartelloni-valdarno-v2":
    "/en/portfolio/technical/cartelloni-valdarno-v2",
  "/portfolio/creative/283d80fjdur/pentolino-dell-oste":
    "/portfolio/creative/pentolino-dell-oste",
  "/en/portfolio/creative/283d80fjdur/pentolino-dell-oste":
    "/en/portfolio/creative/pentolino-dell-oste",
  "/portfolio/creative/4y-jpfsl70ty/ascg-logo": "/portfolio/creative/ascg-logo",
  "/en/portfolio/creative/4y-jpfsl70ty/ascg-logo":
    "/en/portfolio/creative/ascg-logo",
  "/portfolio/creative/lfuokxldh0/seth-ep-covers":
    "/portfolio/creative/seth-ep-covers",
  "/en/portfolio/creative/lfuokxldh0/seth-ep-covers":
    "/en/portfolio/creative/seth-ep-covers",
  "/portfolio/creative/ysrs7a3m1c3/upkmae": "/portfolio/creative/upkmae",
  "/en/portfolio/creative/ysrs7a3m1c3/upkmae":
    "/en/portfolio/creative/upkmae",
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
      iconDir: "src/svg",
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
