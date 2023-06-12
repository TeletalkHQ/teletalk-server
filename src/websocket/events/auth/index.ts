import { authHandlers } from "~/websocket/events/auth/handlers";
import { authRoutes } from "~/websocket/events/auth/routes";

const authEvents = {
  handlers: authHandlers,
  routes: authRoutes,
};

export { authEvents };
