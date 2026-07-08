import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AppProviders } from "../lib/app-store";
import { Header } from "../components/site/Header";
import { Footer } from "../components/site/Footer";
import { AnnouncementBar } from "../components/site/AnnouncementBar";
import { MobileBottomNav } from "../components/site/MobileBottomNav";
import { BookingModal } from "../components/site/BookingModal";
import { Toaster } from "../components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="editorial-eyebrow">404</p>
        <h1 className="mt-3 font-serif text-5xl">Style not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This page slipped out of the appointment book. Let's get you back to something beautiful.
        </p>
        <div className="mt-8">
          <Link to="/" className="inline-flex items-center justify-center rounded-full bg-primary px-6 h-11 text-xs uppercase tracking-widest font-semibold text-primary-foreground">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-2xl">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong. Try again or head home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-primary px-6 h-11 text-xs uppercase tracking-widest font-semibold text-primary-foreground"
          >Try again</button>
          <a href="/" className="rounded-full border border-border px-6 h-11 grid place-items-center text-xs uppercase tracking-widest font-semibold">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "The Braid Expo — Premium Braiding Salon & Beauty Destination" },
      { name: "description", content: "Book premium braids, shop beauty essentials, and join a modern braiding house rooted in 90s Black beauty culture." },
      { name: "theme-color", content: "#FCF7F2" },
      { property: "og:title", content: "The Braid Expo — Braids, Beauty, Booth Rental" },
      { property: "og:description", content: "Premium knotless, boho, stitch and loc styles. Booking, shop, and booth rental — all in one editorial destination." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "The Braid Expo" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,700&family=Inter:wght@400;500;600;700&family=Great+Vibes&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  if (typeof window !== "undefined" && (window as unknown as { __TBE_CLIENT_ONLY__?: boolean }).__TBE_CLIENT_ONLY__) {
    // Client-only static build (GitHub Pages): rendering <html>/<body> into
    // #root corrupts React 19's singleton element handling and hard-freezes
    // the page on trusted focus events (facebook/react#35480).
    return (
      <>
        <HeadContent />
        {children}
      </>
    );
  }

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AppProviders>
        <div className="min-h-screen flex flex-col pb-16 lg:pb-0">
          <AnnouncementBar />
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
        <MobileBottomNav />
        <BookingModal />
        <Toaster />
      </AppProviders>
    </QueryClientProvider>
  );
}
