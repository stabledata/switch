import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { DehydrateRouter } from "@tanstack/react-router-server/client";
import type { RouterContext } from "../../surface.router.js";
import { Header } from "../header.js";
import { DarkModeProvider } from "../../switch/theme/dark-mode-provider.js";
import { Toaster } from "../../switch/components/ui/toaster.js";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: () => <>Root Not Found</>,
  errorComponent: () => <>Root Error</>,
  loader: ({ context }) => {
    return context;
  },
});

function RootComponent() {
  return (
    <DarkModeProvider>
      <div className="background-base background-gradient min-h-[100vh] w-full pb-10">
        <Header />
        <Outlet />
        <DehydrateRouter />
        <Toaster />
      </div>
    </DarkModeProvider>
  );
}
