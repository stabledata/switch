import { Hono } from "hono";
import { createHandlers, applyContext, Dependencies } from '../surface.app.ctx.js';
import { errorHandler } from './error.handlers.js';

export class PingError extends Error {}

export const pingRouteHandler = (inject: Partial<Dependencies>) => {
  const get = createHandlers(applyContext(inject), (c) => {
    c.var.logger.info("👋🏼 ping from surface app");
    return c.json({ message: "pong" });
  });

  const erroredHandler = createHandlers(applyContext(inject), () => {
    throw new PingError("ping error");
  });

  return new Hono()
    .get("", ...get)
    .get("/err", ...erroredHandler)
    .onError(errorHandler(inject));
};
