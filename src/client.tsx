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

createRoot(container).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
