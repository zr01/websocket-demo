import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  define: {
    global: {},
    process: { env: {} },
  },
  resolve: {
    alias: [
      {
        find: "@app",
        replacement: path.join(__dirname, "./src"),
      },
      {
        find: "eventsource",
        replacement:
          "./node_modules/sockjs-client/lib/transport/browser/eventsource.js",
      },
      {
        find: "events",
        replacement: "./node_modules/sockjs-client/lib/event/emitter.js",
      },
      {
        find: "crypto",
        replacement: "./node_modules/sockjs-client/lib/utils/browser-crypto.js",
      },
    ],
  },
});
