import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/docs/",
  outDir: "./.vitepress/dist/docs",
  title: "Document Tracker App",
  description: "A document tracking app",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "Home", link: "/" }],

    sidebar: [
      {
        items: [
          { text: "Getting Started", link: "/getting-started" },
          { text: "Requirements", link: "/requirements" },
          { text: "Existing Endpoints", link: "/endpoints" },
        ],
      },
    ],
  },
});
