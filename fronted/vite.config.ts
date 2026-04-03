import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import type { Plugin } from "vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

/** Chrome DevTools probes this URL; respond before React Router to avoid dev console noise. */
function chromeDevtoolsWellKnown(): Plugin {
  return {
    name: "chrome-devtools-well-known",
    enforce: "pre",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = req.url?.split("?")[0] ?? "";
        if (
          path === "/.well-known/appspecific/com.chrome.devtools.json"
        ) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          res.end("{}");
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [chromeDevtoolsWellKnown(), tailwindcss(), reactRouter(), tsconfigPaths()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
