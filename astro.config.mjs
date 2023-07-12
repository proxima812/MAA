import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";
import { WEBSITE_URL } from "./consts";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
 site: `${WEBSITE_URL}`,
 experimental: { assets: true },
 compressHTML: true,
 integrations: [
  tailwind({
   applyBaseStyles: false,
  }),
  partytown({
   config: {
    debug: false,
   },
  }),
  sitemap({
   filter: (page) => page !== `${WEBSITE_URL}/admin`,
  }),
  mdx(),
  robotsTxt({
   sitemap: [`${WEBSITE_URL}/sitemap-index.xml`, `${WEBSITE_URL}/sitemap-0.xml`],
  }),
  react(),
 ],
});
