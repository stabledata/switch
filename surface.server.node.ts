import { serve } from "@hono/node-server";
import app from './surface.app.js';
import { logger } from './logger/logger.js';

const port = Number(process.env.PORT || 4000);
const host = process.env.HOST || "localhost";

serve({ ...app, port }, () => {
  logger.info(`Surface production server stared on http://${host}:${port}`);
});
