import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  server: {
    cors: true,
    port: 3002,
    host: "todos",
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "cert/key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "cert/cert.pem")),
    },
  },
  plugins: [vue(), vueDevTools(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
