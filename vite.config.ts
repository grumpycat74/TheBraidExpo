// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Site is hosted at https://grumpycat74.github.io/TheBraidExpo/
  vite: { base: "/TheBraidExpo/" },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Client-only bootstrap (src/client.tsx) — skips SSR hydration so the
    // static GitHub Pages build can start without server-rendered data.
    client: { entry: "client" },
    // Build as a client-only single-page app so the site can be hosted on GitHub Pages.
    spa: {
      enabled: true,
      // Render the SPA shell from the GitHub Pages subpath so the router matches it,
      // and write it straight to index.html in the build output.
      maskPath: "/TheBraidExpo/",
      prerender: { outputPath: "/index.html", crawlLinks: false },
    },
  },
});
