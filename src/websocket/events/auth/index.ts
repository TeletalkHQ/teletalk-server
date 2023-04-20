import { authHandlers } from "@/websocket/events/auth/handlers";
import { authRouter } from "@/websocket/events/auth/router";
import { authRoutes } from "@/websocket/events/auth/routes";

const authEvents = {
  authHandlers,
  authRouter,
  authRoutes,
};

export { authEvents };
