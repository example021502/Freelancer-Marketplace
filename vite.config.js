import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5170,
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      ".ngrok-free.app", // allows all subdomains
    ],
  },
});
