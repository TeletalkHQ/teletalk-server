import { userHandlers } from "@/websocket/events/user/handlers";
import { userRoutes } from "@/websocket/events/user/routes";

const userEvents = {
  userHandlers,
  userRoutes,
};

export { userEvents };
