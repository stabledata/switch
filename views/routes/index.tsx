import { createFileRoute } from "@tanstack/react-router";
import App from "../home.js";

export const Route = createFileRoute("/")({
  component: App,
});
