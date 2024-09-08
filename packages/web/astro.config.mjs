import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercelStatic from "@astrojs/vercel/static";
// import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import compressor from "astro-compressor";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  // https://docs.astro.build/en/guides/images/#authorizing-remote-images
  image: {
    domains: ["images.unsplash.com"],
  },
  trailingSlash: "ignore",
  // i18n: {
  //   defaultLocale: "fa",
  //   locales: ["fa"],
  //   fallback: {
  //     fa: "fa",
  //   },
  //   routing: {
  //     prefixDefaultLocale: false,
  //   },
  // },
  prefetch: true,
  integrations: [
    tailwind(),
    react(),
    sitemap({
      i18n: {
        defaultLocale: "fa", // All urls that don't contain `fr` after `https://screwfast.uk/` will be treated as default locale, i.e. `en`
        locales: {
          fa: "fa",
        },
      },
    }),
    // partytown({
    //   // Example: Add dataLayer.push as a forwarding-event.
    //   config: {
    //     debug: true,
    //     forward: ['dataLayer.push'],
    //   },
    // }),
    compressor({
      gzip: false,
      brotli: true,
    }),
  ],
  output: "static",
  experimental: {
    clientPrerender: true,
    directRenderScript: true,
  },
  adapter: vercelStatic(),
});
