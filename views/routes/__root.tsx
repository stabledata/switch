import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { DehydrateRouter } from "@tanstack/react-router-server/client";
import type { RouterContext } from "../../surface.router";
import { Header } from "../header";

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
    <div className="background-base background-gradient min-h-[100vh] w-full pb-10 dark">
      <Header />
      <Outlet />
      <DehydrateRouter />
    </div>
  );
}
