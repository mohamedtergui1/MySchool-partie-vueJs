import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

// Define only the necessary environment variables
const { VUE_APP_API_URL } = process.env;

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  define: {
    // Expose only the necessary environment variables
    "process.env.VUE_APP_API_URL": JSON.stringify(VUE_APP_API_URL),
  },
});
