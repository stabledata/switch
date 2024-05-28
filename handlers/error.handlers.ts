import hono from "hono";
import { PingError } from './ping.handler.js';
import { logger } from '../logger/logger.js';
import { Dependencies } from '../surface.app.ctx.js';

export const errorHandler =
  (injections: Partial<Dependencies>): hono.ErrorHandler =>
  (err, c): Response => {
    const { error } = injections.logger ?? logger;
    const { text, json } = c;

    if (err instanceof PingError) {
      error(`some kind of error happened: ${err}`);
      return text("oh noes", 418);
    }
    // unknown error
    error(`unhandled service error type: ${err}`);
    return json({}, 500);
  };
