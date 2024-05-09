import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePluginAssets } from "vite-plugin-assets";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          "jsx-control-statements",
          ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }],
        ],
      },
    }),
    VitePluginAssets({
      // Add the plugin to handle static assets
      include: ["uploads/**"], // Specify the directory to include
      copyTo: "assets", // Specify the output directory
    }),
  ],

  server: {
    host: true,
    port: 3000,
  },
});
