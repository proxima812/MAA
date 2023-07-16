import rss, { pagesGlobToRssItems } from "@astrojs/rss";
import { seo_settings_pages } from "~/data/SEOSettings";
import { website_settings } from "~/data/consts";

export async function get() {
 let items = await pagesGlobToRssItems(import.meta.glob("./articles/*.mdx"));
 return rss({
  title: website_settings.website_name,
  description: seo_settings_pages.page_index.description,
  site: website_settings.website_link,
  items: items,
 });
}
