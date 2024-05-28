import { Hono } from "hono";
import type { Dependencies } from './surface.app.ctx.js';

import { handleStaticAssets } from './handlers/assets.service.js';
import { pingRouteHandler } from './handlers/ping.handler.js';
import { viewRouteHandler } from './handlers/view.handler.js';
import { errorHandler } from './handlers/error.handlers.js';

import dotenv from "dotenv";
dotenv.config();

export const app = (inject: Partial<Dependencies> = {}) => {
  return (
    new Hono()
      .use("/assets/*", handleStaticAssets(inject))

      // ping example (healthcheck)
      .route("/ping", pingRouteHandler(inject))

      // views
      .route("/*", viewRouteHandler(inject))

      // handle errors
      .onError(errorHandler(inject))
  );
};

// export the app type for for RPC
export type AppType = ReturnType<typeof app>;

// hono vite dev server middleware needs a default export
const ha = app();
export default ha;
