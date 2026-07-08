// Client-only entry for static hosting (GitHub Pages).
// The default TanStack Start client entry tries to hydrate server-rendered
// data that a static host never produces ("Invariant failed"), so instead
// we render the app from scratch in the browser.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";

const router = getRouter();

const container =
  document.getElementById("root") ??
  (() => {
    const el = document.createElement("div");
    el.id = "root";
    document.body.appendChild(el);
    return el;
  })();

// Signal the root route to skip the <html>/<body> document shell. Rendering
// document tags into #root corrupts React 19 singleton handling and freezes
// the page on trusted focus events (facebook/react#35480).
(window as unknown as { __TBE_CLIENT_ONLY__?: boolean }).__TBE_CLIENT_ONLY__ = true;

createRoot(container).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
