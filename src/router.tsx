import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    // Serve under the GitHub Pages subpath (e.g. /TheBraidExpo/) in the browser.
    // During the build's prerender step the server requests "/", so skip the
    // basepath there or the prerenderer gets a 404 and no index.html is written.
    basepath: import.meta.env.SSR ? "/" : import.meta.env.BASE_URL,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
