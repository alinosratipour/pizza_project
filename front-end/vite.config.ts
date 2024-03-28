import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

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
  ],

  server: {
    host: true,
    port: 3000,
  },
});
