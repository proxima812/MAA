import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";
import { website_settings } from "./src/data/consts.ts";

// https://astro.build/config
export default defineConfig({
 site: `${website_settings.website_link}`,
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
   filter: (page) => page !== `${website_settings.website_link}/admin`,
  }),
  mdx(),
  robotsTxt({
   sitemap: [
    `${website_settings.website_link}/sitemap-index.xml`,
    `${website_settings.website_link}/sitemap-0.xml`,
   ],
  }),
  react(),
 ],
});
