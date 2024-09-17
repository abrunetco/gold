import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
      api: path.resolve(__dirname, "./src/api"),
      components: path.resolve(__dirname, "./src/components"),
      assets: path.resolve(__dirname, "./src/assets"),
      routes: path.resolve(__dirname, "./src/routes"),
      views: path.resolve(__dirname, "./src/views"),
      variables: path.resolve(__dirname, "./src/variables"),
      providers: path.resolve(__dirname, "./src/providers"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      utils: path.resolve(__dirname, "./src/utils"),
    },
  },
});
